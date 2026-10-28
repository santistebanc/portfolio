import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { once } from 'node:events';
import { createHub } from './hub.mjs';
import { startServer } from './server.mjs';
import { initStore, readStore, updateStore } from '../../.agents/skills/career-profile-builder/scripts/store.mjs';
import { patchRecords, confirm, summary, validate } from '../../.agents/skills/career-profile-builder/scripts/model.mjs';

function fixture(t, options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'career-desk-test-'));
  t.after(() => { assert.ok(path.resolve(root).startsWith(path.join(os.tmpdir(), 'career-desk-test-'))); fs.rmSync(root, { recursive: true, force: true }); });
  const home = path.join(root, 'private'), publicDir = path.join(root, 'public'); fs.mkdirSync(publicDir);
  initStore(home);
  updateStore(home, 0, 'Fixture facts', (doc, at) => {
    patchRecords(doc, [
      { id: 'profile', name: 'Example candidate' },
      { id: 'project', type: 'context', label: 'Project Cedar', category: 'personal' },
      { id: 'private_evidence', type: 'evidence', label: 'Private interview', kind: 'self-report', locator: 'NEVER_EXPORT_THIS_PRIVATE_NOTE', availability: 'described' },
      { id: 'frontend', type: 'claim', subjectId: 'project', field: 'work', statement: 'Built accessible React interfaces.', source: { kind: 'self-report', reference: 'Private interview' }, evidenceIds: ['private_evidence'] },
      { id: 'withheld', type: 'claim', subjectId: 'profile', field: 'salary', statement: 'SALARY_MUST_STAY_PRIVATE', answerState: 'withheld', source: { kind: 'self-report', reference: 'Private interview' } },
      { id: 'unreviewed', type: 'claim', subjectId: 'profile', field: 'claim', statement: 'UNVERIFIED_SCALE', source: { kind: 'inference', reference: 'Repository' } },
    ], at); confirm(doc, 'frontend', at); confirm(doc, 'withheld', at);
  });
  const hub = createHub({ home, publicDir, ...options });
  const call = (action, input = {}) => hub[action](input, hub.view().revision);
  const draft = (channel = 'portfolio') => call('generate', { channel, profileRevision: readStore(home).revision, claimIds: ['frontend'] });
  const release = (channel = 'portfolio') => { const d = draft(channel); return call('approve', { id: d.id, contentHash: hub.hash(d.body) }); };
  return { root, home, publicDir, hub, call, draft, release };
}

test('notes and proposals survive restart; accepting corrects one fact and retains the old account', (t) => {
  const f = fixture(t), note = f.call('capture', { text: 'I improved keyboard navigation.', source: 'Conversation' });
  const proposal = f.call('propose', { noteId: note.id, claimId: 'frontend', statement: 'Improved keyboard navigation in React interfaces.', source: 'Conversation', profileRevision: 1 });
  assert.equal(createHub({ home: f.home }).view().proposals[0].id, proposal.id);
  f.call('review', { id: proposal.id, decision: 'accept' });
  const profile = readStore(f.home);
  assert.equal(profile.records.filter((r) => r.id === 'frontend').length, 1);
  assert.equal(profile.records.find((r) => r.id === 'frontend').statement, 'Improved keyboard navigation in React interfaces.');
  assert.equal(profile.records.find((r) => r.id === 'frontend').confirmation, 'confirmed');
  assert.equal(profile.history.at(-1).records.find((r) => r.id === 'frontend').before.statement, 'Built accessible React interfaces.');
  assert.equal(f.hub.view().notes[0].status, 'reviewed');
});

test('stale dashboard revisions and conflicting corrections cannot overwrite later work', (t) => {
  const f = fixture(t), original = f.hub.view().revision;
  f.call('capture', { text: 'Saved first' });
  assert.throws(() => f.hub.capture({ text: 'Stale write' }, original), /changed/);
  const p = f.call('propose', { claimId: 'frontend', statement: 'Earlier wording', profileRevision: 1 });
  updateStore(f.home, 1, 'Concurrent interview correction', (doc, at) => patchRecords(doc, [{ id: 'frontend', statement: 'Newer wording' }], at));
  assert.throws(() => f.call('review', { id: p.id, decision: 'accept' }), /Claim changed/);
  assert.equal(readStore(f.home).records.find((r) => r.id === 'frontend').statement, 'Newer wording');
});

test('a failed cross-store write recovers its intent and can be reviewed once without duplication', (t) => {
  const f = fixture(t), p = f.call('propose', { statement: 'A newly reviewed experience.', profileRevision: 1 });
  const lock = path.join(f.home, '.write.lock'); fs.writeFileSync(lock, JSON.stringify({ pid: process.pid }));
  assert.throws(() => f.call('review', { id: p.id, decision: 'accept' }), /lock/);
  fs.unlinkSync(lock);
  const restarted = createHub({ home: f.home });
  assert.equal(restarted.view().proposals[0].status, 'pending');
  restarted.review({ id: p.id, decision: 'accept' }, restarted.view().revision);
  assert.equal(readStore(f.home).records.filter((r) => r.id === p.claimId).length, 1);
});

test('outputs contain only selected reviewed facts; approval binds exact content and source', async (t) => {
  const f = fixture(t);
  for (const claimId of ['withheld', 'unreviewed']) assert.throws(() => f.call('generate', { channel: 'portfolio', profileRevision: 1, claimIds: [claimId] }), /confirmed/);
  const d = f.draft();
  assert.throws(() => f.call('approve', { id: d.id, contentHash: 'wrong' }), /Content changed/);
  const r = f.call('approve', { id: d.id, contentHash: f.hub.hash(d.body) });
  const html = (await f.hub.exportRelease(r.id, 'html')).bytes.toString();
  assert.match(html, /Built accessible React interfaces/);
  assert.doesNotMatch(html, /NEVER_EXPORT|SALARY_MUST|UNVERIFIED_SCALE|Private interview/);
  f.call('edit', { id: d.id, body: '# A revised draft' });
  assert.equal(f.hub.view().drafts[0].status, 'draft');
  assert.equal((await f.hub.exportRelease(r.id)).bytes.toString(), r.body);
  updateStore(f.home, 1, 'Correct source', (doc, at) => patchRecords(doc, [{ id: 'frontend', statement: 'Corrected source fact.' }], at));
  assert.equal(f.hub.view().drafts[0].fresh, false);
  assert.throws(() => f.call('approve', { id: d.id, contentHash: f.hub.hash('# A revised draft') }), /Source facts changed/);
  await assert.rejects(f.call('publish', { id: r.id, contentHash: r.contentHash, expectedRemote: null }), /Source facts changed/);
});

test('publication is explicit and detects out-of-band file edits; HTML remains inert', async (t) => {
  const f = fixture(t), d = f.draft();
  f.call('edit', { id: d.id, body: '# Candidate\n<script>alert(1)</script>' });
  const r = f.call('approve', { id: d.id, contentHash: f.hub.hash('# Candidate\n<script>alert(1)</script>') });
  assert.deepEqual(fs.readdirSync(f.publicDir), []);
  const receipt = await f.call('publish', { id: r.id, contentHash: r.contentHash, expectedRemote: null });
  assert.equal(receipt.status, 'published-locally');
  const file = path.join(f.publicDir, 'career/portfolio.html'), html = fs.readFileSync(file, 'utf8');
  assert.match(html, /&lt;script&gt;/); assert.doesNotMatch(html, /<script>/);
  fs.writeFileSync(file, 'Someone changed this after inspection');
  await assert.rejects(f.call('publish', { id: r.id, contentHash: r.contentHash, expectedRemote: receipt.after }), /changed/);
  assert.equal(fs.readFileSync(file, 'utf8'), 'Someone changed this after inspection');
  assert.equal(f.hub.view().publications.at(-1).status, 'failed-or-unverified');
});

test('profile rollback adds a revision and can itself be undone, including added and removed records', (t) => {
  const f = fixture(t);
  const p = f.call('propose', { statement: 'New personal experience.', profileRevision: 1 });
  f.call('review', { id: p.id, decision: 'accept' });
  assert.equal(readStore(f.home).revision, 2);
  f.call('restoreProfile', { targetRevision: 1, profileRevision: 2 });
  let profile = readStore(f.home);
  assert.equal(profile.revision, 3); assert.equal(profile.history.length, 3);
  assert.equal(profile.records.find((r) => r.id === p.claimId), undefined);
  assert.equal(profile.history.at(-1).records.find((r) => r.id === p.claimId).after, null);
  assert.doesNotThrow(() => summary(profile, 'project'));
  f.call('restoreProfile', { targetRevision: 2, profileRevision: 3 });
  profile = readStore(f.home); assert.equal(profile.revision, 4);
  assert.equal(profile.records.find((r) => r.id === p.claimId).statement, 'New personal experience.'); validate(profile);
});

test('earlier approved content restores as a reviewable draft; PDF export is real', async (t) => {
  const f = fixture(t), r = f.release('cv-frontend');
  const restored = f.call('restoreDraft', { id: r.id });
  assert.equal(restored.status, 'draft'); assert.equal(restored.body, r.body); assert.notEqual(restored.id, r.id);
  const result = await f.hub.exportRelease(r.id, 'pdf');
  assert.equal(result.bytes.subarray(0, 5).toString(), '%PDF-'); assert.ok(result.bytes.length > 1000);
});

test('context changes produce source diffs and invalidate dependent release approval', (t) => {
  const f = fixture(t), r = f.release();
  updateStore(f.home, 1, 'Rename the project', (doc, at) => patchRecords(doc, [{ id: 'project', label: 'Project Maple' }], at));
  const update = f.hub.view().contentUpdates.find((u) => u.releaseId === r.id);
  const change = update.changes.find((c) => c.id === 'project');
  assert.equal(change.before.label, 'Project Cedar'); assert.equal(change.after.label, 'Project Maple');
  assert.equal(f.hub.view().drafts[0].fresh, false);
});

test('explicit source reconciliation preserves edited wording, clears approval and leaves prior releases immutable', (t) => {
  const f = fixture(t), r = f.release();
  updateStore(f.home, 1, 'Correct and review the source', (doc, at) => {
    patchRecords(doc, [{ id: 'frontend', statement: 'Built keyboard-accessible React interfaces.' }], at); confirm(doc, 'frontend', at);
  });
  assert.throws(() => f.call('reconcile', { id: r.draftId, claimIds: ['frontend'], profileRevision: 1 }), /Profile changed/);
  const reconciled = f.call('reconcile', { id: r.draftId, claimIds: ['frontend'], profileRevision: 2 });
  assert.equal(reconciled.body, r.body); assert.equal(reconciled.status, 'draft'); assert.equal(reconciled.version, 2);
  assert.equal(reconciled.sourceRecords.find((s) => s.id === 'frontend').statement, 'Built keyboard-accessible React interfaces.');
  assert.equal(f.hub.view().drafts[0].fresh, true);
  assert.equal(f.hub.view().releases[0].sourceRecords.find((s) => s.id === 'frontend').statement, 'Built accessible React interfaces.');
});

test('GitHub publishing uses explicit approval, target inspection and remote preconditions', async (t) => {
  let remote = { fingerprint: 'sha-original', body: '# Existing README' }, writes = 0;
  const f = fixture(t, { github: async ({ user, body, expectedRemote, inspectOnly }) => {
    assert.equal(user, 'candidate'); if (inspectOnly) return { ...remote, target: 'https://github.com/candidate/candidate' };
    assert.equal(expectedRemote, remote.fingerprint); writes++;
    const before = { ...remote }; remote = { fingerprint: 'sha-updated', body };
    return { target: 'https://github.com/candidate/candidate', before, after: remote.fingerprint };
  } });
  f.call('configure', { githubUser: 'candidate' }); const r = f.release('github');
  assert.equal(writes, 0);
  const target = await f.hub.inspectTarget(r.id); assert.equal(target.body, '# Existing README');
  const receipt = await f.call('publish', { id: r.id, contentHash: r.contentHash, expectedRemote: target.fingerprint });
  assert.equal(writes, 1); assert.equal(receipt.before.body, '# Existing README'); assert.equal(receipt.after, 'sha-updated');
});

test('draft rejection is reversible and revoking approval prevents publication without erasing history', async (t) => {
  const f = fixture(t), r = f.release();
  f.call('archiveDraft', { id: r.draftId, archived: true }); assert.equal(f.hub.view().drafts[0].status, 'archived');
  f.call('archiveDraft', { id: r.draftId, archived: false }); assert.equal(f.hub.view().drafts[0].status, 'draft');
  f.call('revoke', { id: r.id });
  assert.equal(f.hub.view().releases[0].revoked, true);
  assert.equal((await f.hub.exportRelease(r.id)).bytes.toString(), r.body);
  await assert.rejects(f.call('publish', { id: r.id, contentHash: r.contentHash, expectedRemote: null }), /revoked/);
  assert.equal(f.hub.view().publications.length, 0);
});

test('newly reviewed facts become destination update suggestions without changing any approved content', async (t) => {
  const f = fixture(t), r = f.release();
  await new Promise((resolve) => setTimeout(resolve, 5));
  const proposal = f.call('propose', { statement: 'Designed an offline review queue.', profileRevision: 1 });
  f.call('review', { id: proposal.id, decision: 'accept' });
  const update = f.hub.view().contentUpdates.find((u) => u.releaseId === r.id);
  assert.equal(update.changes.find((c) => c.id === proposal.claimId).kind, 'new-fact');
  assert.equal(f.hub.view().releases[0].body, r.body); assert.equal(f.hub.view().publications.length, 0);
});

test('LinkedIn receipts describe a manual application, never an API publication', async (t) => {
  const f = fixture(t), d = f.draft('linkedin');
  assert.throws(() => f.call('approve', { id: d.id, contentHash: f.hub.hash(d.body) }), /review section/);
  f.call('edit', { id: d.id, body: '# Example candidate\n## Headline\nFrontend developer\n## About\nBuilt accessible React interfaces.' });
  const body = f.hub.view().drafts[0].body, r = f.call('approve', { id: d.id, contentHash: f.hub.hash(body) });
  await assert.rejects(f.call('publish', { id: r.id, contentHash: r.contentHash }), /Apply.*yourself/);
  const receipt = await f.call('publish', { id: r.id, contentHash: r.contentHash, manualApplied: true });
  assert.equal(receipt.status, 'manually-applied'); assert.match(receipt.verification, /not verified/);
});

test('repository scanning checkpoints commits and deduplicates dependency evidence without claiming proficiency', (t) => {
  const f = fixture(t), repo = path.join(f.root, 'project'); fs.mkdirSync(repo);
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', windowsHide: true });
  git('init', '-q'); git('config', 'user.name', 'Fixture'); git('config', 'user.email', 'fixture@example.invalid');
  fs.writeFileSync(path.join(repo, 'package.json'), JSON.stringify({ dependencies: { react: '19' } }));
  fs.writeFileSync(path.join(repo, '.env'), 'SECRET_DO_NOT_READ');
  git('add', '.'); git('commit', '-qm', 'Initial checkpoint');
  f.call('configure', { repository: repo }); assert.equal(f.hub.view().notes.length, 0);
  fs.writeFileSync(path.join(repo, 'package.json'), JSON.stringify({ dependencies: { react: '19', hono: '4' } }));
  git('add', '.'); git('commit', '-qm', 'Add API dependency');
  f.hub.scan(f.hub.view().revision); f.hub.scan(f.hub.view().revision);
  const notes = f.hub.view().notes; assert.equal(notes.length, 1); assert.match(notes[0].text, /hono/);
  assert.match(notes[0].text, /before adding a skill claim/); assert.doesNotMatch(JSON.stringify(notes), /SECRET_DO_NOT_READ/);
  assert.equal(readStore(f.home).revision, 1);
});

test('loopback API rejects cross-origin and tokenless mutations; private data is never served as a static file', async (t) => {
  const f = fixture(t), server = startServer({ port: 0, hub: f.hub, timer: false });
  await once(server, 'listening'); t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = 'http://127.0.0.1:' + server.address().port;
  const response = await fetch(url + '/api/state'); assert.equal(response.status, 200);
  const state = await response.json();
  const denied = await fetch(url + '/api/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: 'Blocked', revision: 0 }) });
  assert.equal(denied.status, 403);
  assert.equal((await fetch(url + '/api/state', { headers: { Origin: 'https://hostile.example' } })).status, 403);
  const accepted = await fetch(url + '/api/capture', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Career-Token': state.token }, body: JSON.stringify({ text: 'Saved through HTTP', revision: 0 }) });
  assert.equal(accepted.status, 200);
  assert.equal((await fetch(url + '/profile.json')).status, 404);
  assert.equal((await fetch(url + '/../private/profile.json')).status, 404);
});
