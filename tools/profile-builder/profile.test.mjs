import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createProfile, transact, patchRecords, confirm, nextQuestion, answer, skip, revisit, validate, ask, summary } from '../../.agents/skills/career-profile-builder/scripts/model.mjs';
import { initStore, readStore, updateStore, profilePath, unlockStore } from '../../.agents/skills/career-profile-builder/scripts/store.mjs';

const cli = fileURLToPath(new URL('../../.agents/skills/career-profile-builder/scripts/profile.mjs', import.meta.url));
function store(t) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'career-profile-test-'));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  return home;
}
function patch(doc, upsert) { return transact(doc, 'Fictional fixture', (d, at) => patchRecords(d, upsert, at)); }
function claim(id, subjectId, statement, extra = {}) {
  return { id, type: 'claim', subjectId, field: 'outcome', statement, source: { kind: 'self-report', reference: 'fictional fixture' }, ...extra };
}
function fixture() {
  return patch(createProfile(), [
    { id: 'ctx1', type: 'context', label: 'Volunteer group', category: 'volunteering' },
    { id: 'ctx2', type: 'context', label: 'Personal project', category: 'personal' },
    { id: 'story1', type: 'story', label: 'Checklist', contextId: 'ctx1' },
    { id: 'story2', type: 'story', label: 'Garden tracker', contextId: 'ctx2' },
    { id: 'doc1', type: 'evidence', label: 'Reported coordinator feedback', kind: 'feedback', availability: 'described' },
    claim('claim1', 'story1', 'Coordinator reused the checklist', { evidenceIds: ['doc1'] }),
    claim('claim2', 'story2', 'Used by my family'),
    { id: 'skill1', type: 'skill', label: 'Documentation', claimIds: ['claim1'] },
  ]);
}
function respond(doc, text, state) {
  let q;
  doc = transact(doc, 'Ask next', (d) => { q = d.session.currentQuestion || nextQuestion(d); d.session.currentQuestion = q; });
  return transact(doc, 'Answer next', (d, at) => answer(d, { questionId: q.id, text, state }, at));
}

test('initialization is private by default and never overwrites existing data', (t) => {
  const home = store(t);
  const doc = initStore(home);
  assert.equal(doc.revision, 0);
  assert.equal(doc.records.length, 1);
  assert.equal(doc.records[0].visibility, 'private');
  assert.throws(() => initStore(home), /never overwrites/);
  assert.deepEqual(readStore(home), doc);
  if (process.platform !== 'win32') assert.equal(fs.statSync(profilePath(home)).mode & 0o777, 0o600);
});

test('stale writers cannot overwrite newer records', (t) => {
  const home = store(t); initStore(home);
  updateStore(home, 0, 'Set a name', (d, at) => patchRecords(d, [{ id: 'profile', name: 'Fictional person' }], at));
  const saved = fs.readFileSync(profilePath(home), 'utf8');
  assert.throws(() => updateStore(home, 0, 'Stale name', (d) => { d.records[0].name = 'Wrong'; }), /Revision conflict/);
  assert.equal(fs.readFileSync(profilePath(home), 'utf8'), saved);
  assert.equal(fs.existsSync(path.join(home, '.write.lock')), false);
});

test('invalid relationships and unsupported metric precision leave the last good file intact', (t) => {
  const home = store(t); initStore(home);
  const saved = fs.readFileSync(profilePath(home), 'utf8');
  assert.throws(() => updateStore(home, 0, 'Invalid import', (d, at) => patchRecords(d, [claim('bad', 'missing', 'A claim')], at)), /subject/);
  assert.throws(() => updateStore(home, 0, 'Unsupported metric', (d, at) => patchRecords(d, [claim('bad', 'profile', 'Time savings unknown', { metric: { kind: 'measured', value: null, unit: 'hours', basis: 'No measurements' } })], at)), /numeric/);
  assert.equal(fs.readFileSync(profilePath(home), 'utf8'), saved);
  assert.deepEqual(fs.readdirSync(home), ['profile.json']);
});

test('evidence corrections invalidate related claims, stories and skills, keeping other contexts confirmed', () => {
  let doc = fixture();
  doc = transact(doc, 'Review both episodes', (d, at) => { confirm(d, 'story1', at); confirm(d, 'story2', at); confirm(d, 'skill1', at); });
  const before = structuredClone(doc.records.find((r) => r.id === 'doc1'));
  doc = patch(doc, [{ id: 'doc1', availability: 'unavailable' }]);
  for (const id of ['claim1', 'story1', 'skill1']) assert.equal(doc.records.find((r) => r.id === id).confirmation, 'draft');
  for (const id of ['claim2', 'story2']) assert.equal(doc.records.find((r) => r.id === id).confirmation, 'confirmed');
  const change = doc.history.at(-1).records.find((r) => r.id === 'doc1');
  assert.deepEqual(change.before, before);
  assert.equal(change.after.availability, 'unavailable');
});

test('conflicting statements cannot be confirmed, and corrections retain the prior assertion', () => {
  let doc = patch(fixture(), [{ id: 'claim1', conflict: 'Old CV says a different intake' }]);
  assert.throws(() => transact(doc, 'Confirm prematurely', (d, at) => confirm(d, 'story1', at)), /Resolve conflicts/);
  doc = patch(doc, [{ id: 'claim1', statement: 'Coordinator used it in a later intake; date uncertain', conflict: null }]);
  assert.equal(doc.history.at(-1).records.find((r) => r.id === 'claim1').before.statement, 'Coordinator reused the checklist');
  assert.equal(doc.records.find((r) => r.id === 'claim1').confirmation, 'draft');
});

test('partial dates preserve uncertainty and reject impossible calendars or invented ongoing status', () => {
  let doc = patch(createProfile(), [claim('dates', 'profile', 'About autumn 2024', { dates: { start: '2024', end: null, ongoing: null, approximate: true } })]);
  assert.equal(doc.records.find((r) => r.id === 'dates').dates.ongoing, null);
  assert.doesNotThrow(() => patch(doc, [{ id: 'dates', dates: { start: '2024-02-29', end: '2024', ongoing: false, approximate: false } }]));
  for (const dates of [
    { start: '2023-02-29', end: null, ongoing: null, approximate: false },
    { start: '2025', end: '2024', ongoing: false, approximate: false },
    { start: '2024', end: '2025', ongoing: true, approximate: false },
  ]) assert.throws(() => patch(doc, [{ id: 'dates', dates }]));
});

test('cyclic calculations and dangling evidence or skill references are rejected', () => {
  assert.throws(() => patch(createProfile(), [claim('a', 'profile', 'A', { dependsOn: ['b'] }), claim('b', 'profile', 'B', { dependsOn: ['a'] })]), /Cyclic/);
  assert.throws(() => patch(createProfile(), [claim('a', 'profile', 'A', { evidenceIds: ['missing'] })]), /evidence/);
  assert.throws(() => patch(createProfile(), [{ id: 'skill', type: 'skill', label: 'React', claimIds: ['missing'] }]), /skill claim/);
});

test('pause and resume retain exactly the pending question; unknown is not zero or a confirmed fact', () => {
  let doc = createProfile();
  doc = transact(doc, 'Ask', (d) => { d.session.currentQuestion = nextQuestion(d); });
  const question = structuredClone(doc.session.currentQuestion);
  doc = transact(doc, 'Pause', (d) => { d.session.status = 'paused'; });
  assert.throws(() => nextQuestion(doc), /paused/);
  doc = transact(doc, 'Resume', (d) => { d.session.status = 'active'; });
  assert.deepEqual(nextQuestion(doc), question);
  doc = transact(doc, 'Unknown target', (d, at) => answer(d, { questionId: question.id, text: 'I am undecided', state: 'unknown' }, at));
  const saved = doc.records.find((r) => r.type === 'claim');
  assert.equal(saved.answerState, 'unknown');
  assert.equal(saved.metric, null);
  assert.equal(saved.confirmation, 'draft');
  assert.equal(doc.session.answers[0].text, 'I am undecided');
  assert.notEqual(nextQuestion(doc).id, question.id);
});

test('adaptive follow-ups resume safely and do not move the guided cursor', () => {
  let doc = fixture();
  const step = doc.session.step;
  doc = transact(doc, 'Follow up', (d) => ask(d, { subjectId: 'story1', field: 'decision', text: 'Which alternative did you consider?' }));
  const q = doc.session.currentQuestion;
  doc = transact(doc, 'Defer', (d) => skip(d));
  doc = transact(doc, 'Revisit', (d) => revisit(d, q.id));
  doc = transact(doc, 'Answer', (d, at) => answer(d, { questionId: q.id, text: 'I do not recall', state: 'unknown' }, at));
  assert.equal(doc.session.step, step);
  assert.equal(doc.records.find((r) => r.field === 'decision').answerState, 'unknown');
  assert.equal(doc.session.deferred.length, 0);
});

test('the guided interview inventories multiple contexts, captures a qualitative story and confirms its readback', () => {
  let doc = createProfile();
  const answers = [
    'Undecided', 'Volunteer group', 'volunteering', 'Helper', 'Approximately autumn 2024', 'context',
    'Personal garden tracker', 'personal', 'Builder', '2025, finished', 'story', '1',
    'New helpers struggled with setup', 'I wrote a checklist and trialled it with two helpers',
    'Coordinator handled access and training', 'Kept instructions short after feedback',
    'Coordinator reused it; time saved was not measured', 'Feedback was verbal; artifact unavailable',
    'Try instructions earlier with new helpers', 'yes', 'done',
  ];
  for (const response of answers) doc = respond(doc, response);
  assert.equal(doc.records.filter((r) => r.type === 'context').length, 2);
  const story = doc.records.find((r) => r.type === 'story');
  assert.equal(story.confirmation, 'confirmed');
  const claims = doc.records.filter((r) => r.type === 'claim' && r.subjectId === story.id);
  assert.equal(claims.length, 7);
  assert.ok(claims.every((r) => r.visibility === 'private' && r.confirmation === 'confirmed' && r.metric === null));
  assert.equal(doc.session.status, 'paused');
  assert.equal(validate(doc), doc);
});

test('confirmation cannot be smuggled through apply and private text is never implicitly approved for publication', () => {
  assert.throws(() => patch(fixture(), [{ id: 'claim1', confirmation: 'confirmed' }]), /managed/);
  assert.throws(() => patch(fixture(), [{ id: 'claim1', visibility: 'anonymized' }]), /publicText/);
  let doc = transact(fixture(), 'Review', (d, at) => confirm(d, 'story1', at));
  assert.equal(doc.records.find((r) => r.id === 'claim1').visibility, 'private');
});

test('the terminal review can revise a claim in place without retaining unsupported numeric metadata', () => {
  let doc = patch(fixture(), [{ id: 'claim1', metric: { kind: 'scale', value: 2, unit: 'helpers', basis: 'Recollection of trial participants' } }]);
  doc = transact(doc, 'Open review', (d) => { d.session.contextId = 'ctx1'; d.session.storyId = 'story1'; d.session.step = 'review'; });
  doc = respond(doc, 'revise');
  doc = respond(doc, 'claim1');
  doc = respond(doc, 'Coordinator said they planned to reuse it; actual reuse unknown');
  assert.equal(doc.session.step, 'review');
  assert.equal(doc.session.correctionId, null);
  const corrected = doc.records.find((r) => r.id === 'claim1');
  assert.equal(corrected.metric, null);
  assert.deepEqual(corrected.evidenceIds, []);
  assert.equal(corrected.statement, 'Coordinator said they planned to reuse it; actual reuse unknown');
  assert.equal(corrected.confirmation, 'draft');
  assert.equal(doc.records.filter((r) => r.id === 'claim1').length, 1);
  assert.ok(doc.history.some((h) => h.records.some((r) => r.id === 'claim1' && r.before?.statement === 'Coordinator reused the checklist')));
  doc = respond(doc, 'yes');
  assert.equal(doc.records.find((r) => r.id === 'story1').confirmation, 'confirmed');
});

test('a live writer lock is retained and prevents competing writes', (t) => {
  const home = store(t); initStore(home);
  const lock = path.join(home, '.write.lock');
  fs.writeFileSync(lock, JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }));
  assert.throws(() => updateStore(home, 0, 'Concurrent write', () => {}), /lock/);
  assert.throws(() => unlockStore(home), /still running/);
  assert.equal(fs.existsSync(lock), true);
});

test('a corrected outcome highlights potentially stale support until the account is reviewed again', () => {
  let doc = patch(fixture(), [claim('support1', 'story1', 'Coordinator said they reused the checklist', { field: 'support' })]);
  doc = transact(doc, 'Initial readback', (d, at) => confirm(d, 'story1', at));
  doc = patch(doc, [{ id: 'claim1', statement: 'Coordinator only planned to reuse it; actual use unknown' }]);
  const review = summary(doc, 'story1');
  assert.equal(review.needsConsistencyReview, true);
  assert.equal(review.corrections.length, 1);
  assert.ok(review.corrections[0].checkRelatedClaimIds.includes('support1'));
  assert.equal(review.claims.find((r) => r.id === 'support1').confirmation, 'draft');
  // A semantic judgment stays with the person/interviewer; no silent rewrite.
  assert.equal(review.claims.find((r) => r.id === 'support1').statement, 'Coordinator said they reused the checklist');
  doc = transact(doc, 'Return to readback', (d) => { d.session.contextId = 'ctx1'; d.session.storyId = 'story1'; d.session.step = 'review'; });
  assert.match(nextQuestion(doc).text, /other saved claims/);
  doc = patch(doc, [{ id: 'support1', statement: 'Coordinator described a plan; I cannot corroborate actual reuse' }]);
  doc = respond(doc, 'yes');
  assert.equal(summary(doc, 'story1').needsConsistencyReview, false);
});

test('real CLI persists a question and rejects an answer to an obsolete question ID', (t) => {
  const home = store(t);
  function run(args) { return spawnSync(process.execPath, [cli, ...args, '--home', home], { encoding: 'utf8' }); }
  assert.equal(run(['init']).status, 0);
  const next = JSON.parse(run(['next']).stdout);
  const input = path.join(home, 'answer.json');
  fs.writeFileSync(input, JSON.stringify({ text: 'I am undecided', state: 'unknown' }));
  assert.equal(run(['answer', '--question', 'obsolete', '--input', input, '--revision', String(next.revision)]).status, 1);
  assert.equal(readStore(home).revision, next.revision);
  assert.equal(run(['answer', '--question', next.question.id, '--input', input, '--revision', String(next.revision)]).status, 0);
  assert.equal(run(['validate']).status, 0);
});

test('terminal interview can pause on its first question with the exact question persisted', (t) => {
  const home = store(t);
  const result = spawnSync(process.execPath, [cli, 'interview', '--home', home], { input: '/pause\n', encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr);
  const doc = readStore(home);
  assert.equal(doc.session.status, 'paused');
  assert.equal(doc.session.currentQuestion.field, 'direction');
  assert.equal(doc.records.filter((r) => r.type === 'claim').length, 0);
});

test('terminal EOF preserves a paused session and pending question', (t) => {
  const home = store(t);
  const result = spawnSync(process.execPath, [cli, 'interview', '--home', home], { input: '', encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr);
  const doc = readStore(home);
  assert.equal(doc.session.status, 'paused');
  assert.equal(doc.session.currentQuestion.field, 'direction');
});
