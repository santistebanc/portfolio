import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { defaultHome, readStore, updateStore } from '../../.agents/skills/career-profile-builder/scripts/store.mjs';
import { patchRecords, confirm, validate } from '../../.agents/skills/career-profile-builder/scripts/model.mjs';

export const channels = {
  'cv-frontend': 'Frontend developer', 'cv-fullstack': 'Fullstack developer',
  'cv-product': 'Product engineer', 'cv-ai': 'Software developer · AI-assisted product development',
  portfolio: 'Portfolio', github: 'GitHub profile README', linkedin: 'LinkedIn profile sections',
};
const now = () => new Date().toISOString();
const uid = (prefix) => prefix + '_' + randomUUID();
const hash = (value) => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex');
const need = (ok, message) => { if (!ok) throw new Error(message); };
const text = (value, name, max = 50000) => {
  need(typeof value === 'string' && value.trim().length > 0 && value.length <= max, name + ' is required (maximum ' + max + ' characters)');
  return value.trim();
};
export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sourceHash = (r) => hash(r);
const blank = () => ({ schemaVersion: 1, revision: 0, notes: [], proposals: [], drafts: [], releases: [], revocations: [], publications: [], repositories: [], settings: { scanMinutes: 0 }, events: [] });

function save(file, data) {
  const temp = file + '.' + randomUUID() + '.tmp';
  const fd = fs.openSync(temp, 'wx', 0o600);
  try { fs.writeFileSync(fd, JSON.stringify(data, null, 2) + '\n'); fs.fsyncSync(fd); }
  finally { fs.closeSync(fd); }
  try { fs.renameSync(temp, file); } finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
}

function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', timeout: 15000, maxBuffer: 2 * 1024 * 1024, windowsHide: true }).trim();
}
function repoSnapshot(root) {
  const absolute = fs.realpathSync(root);
  const top = fs.realpathSync(git(absolute, ['rev-parse', '--show-toplevel']));
  need(top.toLowerCase() === absolute.toLowerCase(), 'Choose the repository root');
  const commit = git(absolute, ['rev-parse', 'HEAD']);
  const files = git(absolute, ['ls-tree', '-r', '--name-only', commit]).split('\n');
  // Only committed, explicitly known manifests. Never read environment or credential files.
  const manifests = files.filter((p) => /(^|\/)package\.json$/.test(p) && !/(^|\/)(node_modules|vendor|dist)\//.test(p)).slice(0, 40);
  const dependencies = new Set();
  for (const file of manifests) {
    const raw = git(absolute, ['show', commit + ':' + file]);
    need(raw.length <= 256000, 'Manifest too large: ' + file);
    try {
      const pkg = JSON.parse(raw);
      Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }).forEach((d) => dependencies.add(d));
    } catch (e) { if (e instanceof SyntaxError) continue; throw e; }
  }
  return { root: absolute, commit, manifests, dependencies: [...dependencies].sort(), at: now() };
}

function eligible(profile) {
  return profile.records.filter((r) => r.type === 'claim' && r.confirmation === 'confirmed' && r.answerState === 'provided' && !r.conflict);
}
function draftSources(profile, claimIds) {
  const allowed = new Map(eligible(profile).map((r) => [r.id, r]));
  const ids = [...new Set(claimIds || [])];
  need(ids.length > 0 && ids.length <= 150 && ids.every((id) => allowed.has(id)), 'Choose confirmed, provided claims without conflicts');
  const tracked = new Set([...ids, 'profile']);
  for (const id of ids) {
    const subject = profile.records.find((r) => r.id === allowed.get(id).subjectId);
    tracked.add(subject.id); if (subject.contextId) tracked.add(subject.contextId);
  }
  const sourceRecords = [...tracked].map((id) => structuredClone(profile.records.find((r) => r.id === id)));
  return { claimIds: ids, sourceRecords, sources: Object.fromEntries(sourceRecords.map((record) => [record.id, sourceHash(record)])), profileRevision: profile.revision };
}
function labelFor(profile, claim) {
  const subject = profile.records.find((r) => r.id === claim.subjectId);
  const context = subject?.type === 'story' ? profile.records.find((r) => r.id === subject.contextId) : subject;
  return context?.label || 'Profile';
}
function renderBody(profile, channel, claimIds, spec) {
  const claims = claimIds.map((id) => profile.records.find((r) => r.id === id));
  const groups = new Map();
  for (const claim of claims) {
    const label = labelFor(profile, claim);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(claim.visibility === 'anonymized' ? claim.publicText : claim.statement);
  }
  const name = profile.records.find((r) => r.id === 'profile').name || 'Career profile';
  const blocks = [...groups].map(([label, statements]) => '## ' + label + '\n\n' + statements.map((s) => '- ' + s).join('\n'));
  if (channel === 'linkedin') return '# ' + name + '\n\n## Headline\n\n' + (spec.headline || 'Frontend development | React | TypeScript') + '\n\n## About\n\n' + (spec.summary || 'REVIEW: write a short introduction using the facts below.') + '\n\n' + blocks.join('\n\n');
  return '# ' + name + '\n\n' + (channel.startsWith('cv-') ? channels[channel] + '\n\n' : '') + (spec.summary ? spec.summary + '\n\n' : '') + blocks.join('\n\n') + '\n';
}

export function createHub({ home = defaultHome(), publicDir, github = defaultGithub } = {}) {
  fs.mkdirSync(home, { recursive: true, mode: 0o700 });
  const file = path.join(home, 'dashboard.json'), lock = path.join(home, '.dashboard.lock');
  const load = () => {
    if (!fs.existsSync(file)) return blank();
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    need(data.schemaVersion === 1 && Array.isArray(data.events), 'Unsupported dashboard store');
    return { ...blank(), ...data };
  };
  function event(data, type, detail) {
    data.revision += 1;
    data.events.push({ id: uid('event'), revision: data.revision, at: now(), type, ...detail });
  }
  function locked(operation) {
    let fd;
    try { fd = fs.openSync(lock, 'wx', 0o600); }
    catch (e) { if (e.code === 'EEXIST') throw new Error('Dashboard is busy. Retry; do not remove an active writer lock.'); throw e; }
    try {
      fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, at: now() })); fs.fsyncSync(fd);
      const data = load();
      // Complete an interrupted two-store transaction using the profile's durable audit entry.
      let recovered = false;
      for (const p of data.proposals.filter((p) => p.status === 'applying')) {
        const done = readStore(home).history.some((h) => h.reason === 'Dashboard proposal ' + p.id);
        p.status = done ? 'accepted' : 'pending';
        event(data, 'proposal.recovered', { proposalId: p.id, status: p.status });
        recovered = true;
      }
      if (recovered) save(file, data);
      const result = operation(data);
      save(file, data);
      return result;
    } finally { fs.closeSync(fd); fs.unlinkSync(lock); }
  }
  function mutate(expected, type, operation) {
    return locked((data) => {
      need(Number.isSafeInteger(expected) && data.revision === expected, 'Dashboard changed. Refresh and reconcile before retrying.');
      const result = operation(data);
      event(data, type, {});
      return result;
    });
  }
  function freshness(draft, profile = readStore(home)) {
    return Object.entries(draft.sources).every(([id, fingerprint]) => sourceHash(profile.records.find((r) => r.id === id) || null) === fingerprint);
  }
  function view() {
    const data = load(), profile = readStore(home);
    const records = profile.records;
    const revoked = new Set(data.revocations.map((r) => r.releaseId));
    const latest = new Map(data.releases.filter((r) => !revoked.has(r.id)).map((r) => [r.channel, r]));
    const contentUpdates = [...latest.values()].map((r) => ({
      releaseId: r.id, channel: r.channel,
      changes: Object.keys(r.sources).filter((id) => sourceHash(records.find((s) => s.id === id) || null) !== r.sources[id])
        .map((id) => ({ id, before: r.sourceRecords?.find((s) => s.id === id) || null, after: records.find((s) => s.id === id) || null }))
        .concat(eligible(profile).filter((s) => !r.claimIds.includes(s.id) && s.confirmedAt > r.approvedAt)
          .map((s) => ({ id: s.id, before: null, after: s, kind: 'new-fact' }))),
    })).filter((u) => u.changes.length);
    return {
      ...data, home, publicDir: publicDir || null, channels,
      profile: { revision: profile.revision, name: records.find((r) => r.id === 'profile').name, records,
        history: profile.history.map((h) => ({ revision: h.revision, at: h.at, reason: h.reason, changes: h.records.length })) },
      drafts: data.drafts.map((d) => ({ ...d, fresh: freshness(d, profile) })),
      releases: data.releases.map((r) => ({ ...r, revoked: revoked.has(r.id) })),
      contentUpdates,
      capabilities: { github: 'GitHub CLI authentication required; README publishing supported', linkedin: 'Manual apply; no profile-edit API connection configured', automation: 'Committed package manifest evidence; AI interpretation through agent capture/import' },
    };
  }
  function capture(input, revision) {
    return mutate(revision, 'note.captured', (data) => {
      const note = { id: uid('note'), text: text(input.text, 'Note'), source: text(input.source || 'Manual note', 'Source', 2000), at: now(), status: 'pending' };
      data.notes.push(note); return note;
    });
  }
  function dismissNote(input, revision) {
    return mutate(revision, 'note.archived', (data) => {
      const note = data.notes.find((n) => n.id === input.id);
      need(note?.status === 'pending', 'Note is not pending'); note.status = 'archived'; return note;
    });
  }
  function propose(input, revision) {
    return mutate(revision, 'proposal.created', (data) => {
      const profile = readStore(home);
      need(profile.revision === input.profileRevision, 'Profile changed. Refresh before proposing a correction.');
      const existing = input.claimId ? profile.records.find((r) => r.id === input.claimId && r.type === 'claim') : null;
      need(!input.claimId || existing, 'Unknown claim');
      const subjectId = existing?.subjectId || input.subjectId || 'profile';
      need(profile.records.some((r) => r.id === subjectId && ['profile', 'context', 'story'].includes(r.type)), 'Unknown subject');
      if (input.noteId) need(data.notes.some((n) => n.id === input.noteId), 'Unknown note');
      const proposal = { id: uid('proposal'), claimId: existing?.id || uid('claim'), subjectId,
        field: text(input.field || existing?.field || 'experience', 'Field', 200), statement: text(input.statement, 'Statement'),
        source: { kind: input.sourceKind || 'self-report', reference: text(input.source || 'Manual dashboard entry', 'Source', 4000) },
        noteId: input.noteId || null, before: existing || null, base: existing ? sourceHash(existing) : null,
        profileRevision: profile.revision, status: 'pending', at: now() };
      need(['self-report', 'document', 'inference', 'calculation'].includes(proposal.source.kind), 'Invalid source kind');
      need(proposal.source.kind !== 'calculation', 'Use the interview CLI for calculations with explicit dependencies');
      data.proposals.push(proposal); return proposal;
    });
  }
  function review(input, revision) {
    return mutate(revision, 'proposal.reviewed', (data) => {
      const p = data.proposals.find((p) => p.id === input.id);
      need(p?.status === 'pending', 'Proposal is not pending');
      need(['accept', 'reject'].includes(input.decision), 'Choose accept or reject');
      if (input.decision === 'reject') { p.status = 'rejected'; p.reviewedAt = now(); return p; }
      const profile = readStore(home), current = profile.records.find((r) => r.id === p.claimId);
      need((current ? sourceHash(current) : null) === p.base, 'Claim changed. Reconcile the proposal first.');
      need(profile.records.some((r) => r.id === p.subjectId), 'Proposal subject no longer exists');
      p.status = 'applying'; event(data, 'proposal.applying', { proposalId: p.id }); save(file, data);
      const result = updateStore(home, profile.revision, 'Dashboard proposal ' + p.id, (doc, at) => {
        patchRecords(doc, [{ id: p.claimId, type: 'claim', subjectId: p.subjectId, field: p.field, statement: p.statement,
          source: p.source, answerState: 'provided', conflict: null,
          ...(current && current.statement !== p.statement ? { metric: null, dates: null } : {}),
        }], at);
        confirm(doc, p.claimId, at);
      });
      p.status = 'accepted'; p.reviewedAt = now(); p.appliedRevision = result.revision;
      if (p.noteId) data.notes.find((n) => n.id === p.noteId).status = 'reviewed';
      return p;
    });
  }
  function generate(input, revision) {
    return mutate(revision, 'draft.generated', (data) => {
      need(channels[input.channel], 'Unknown destination');
      const profile = readStore(home);
      need(profile.revision === input.profileRevision, 'Profile changed. Refresh before generating.');
      const selected = draftSources(profile, input.claimIds);
      const spec = { summary: String(input.summary || '').slice(0, 10000), headline: String(input.headline || '').slice(0, 220), instructions: String(input.instructions || '').slice(0, 10000) };
      const draft = { id: uid('draft'), channel: input.channel, ...selected,
        spec, body: renderBody(profile, input.channel, selected.claimIds, spec), version: 1, status: 'draft', at: now() };
      data.drafts.push(draft); return draft;
    });
  }
  function edit(input, revision) {
    return mutate(revision, 'draft.edited', (data) => {
      const draft = data.drafts.find((d) => d.id === input.id);
      need(draft, 'Unknown draft');
      // Never overwrite a release: editing creates an auditable content version and revokes approval.
      event(data, 'draft.previous', { draftId: draft.id, version: draft.version, body: draft.body });
      draft.body = text(input.body, 'Content', 200000); draft.version++; draft.status = 'draft'; delete draft.releaseId;
      return draft;
    });
  }
  function reconcile(input, revision) {
    return mutate(revision, 'draft.sources-reconciled', (data) => {
      const draft = data.drafts.find((d) => d.id === input.id), profile = readStore(home);
      need(draft, 'Unknown draft'); need(profile.revision === input.profileRevision, 'Profile changed. Refresh before reconciling.');
      const selected = draftSources(profile, input.claimIds);
      event(data, 'draft.previous-sources', { draftId: draft.id, version: draft.version, sources: draft.sources, sourceRecords: draft.sourceRecords });
      Object.assign(draft, selected); draft.version++; draft.status = 'draft'; delete draft.releaseId;
      return draft;
    });
  }
  function archiveDraft(input, revision) {
    return mutate(revision, 'draft.archive-changed', (data) => {
      const draft = data.drafts.find((d) => d.id === input.id); need(draft, 'Unknown draft');
      need(typeof input.archived === 'boolean', 'Choose archive or restore');
      draft.status = input.archived ? 'archived' : 'draft'; delete draft.releaseId; draft.version++; return draft;
    });
  }
  function revoke(input, revision) {
    return mutate(revision, 'release.revoked', (data) => {
      need(data.releases.some((r) => r.id === input.id), 'Unknown release');
      need(!data.revocations.some((r) => r.releaseId === input.id), 'Approval already revoked');
      const receipt = { releaseId: input.id, at: now(), reason: text(input.reason || 'User revoked publication approval', 'Reason', 2000) };
      data.revocations.push(receipt);
      for (const draft of data.drafts.filter((d) => d.releaseId === input.id)) { draft.status = 'draft'; delete draft.releaseId; }
      return receipt;
    });
  }
  function approve(input, revision) {
    return mutate(revision, 'release.approved', (data) => {
      const draft = data.drafts.find((d) => d.id === input.id);
      need(draft?.status === 'draft', 'Choose an unapproved draft');
      need(input.contentHash === hash(draft.body), 'Content changed. Review the exact content again.');
      need(freshness(draft), 'Source facts changed. Generate a fresh draft and reconcile the wording.');
      need(!draft.body.includes('REVIEW:'), 'Complete the marked review section before approval');
      const release = { ...structuredClone(draft), id: uid('release'), draftId: draft.id, contentHash: hash(draft.body), approvedAt: now(), status: 'approved' };
      data.releases.push(release); draft.status = 'approved'; draft.releaseId = release.id; return release;
    });
  }
  function restoreDraft(input, revision) {
    return mutate(revision, 'draft.restored', (data) => {
      const release = data.releases.find((r) => r.id === input.id);
      need(release, 'Unknown release');
      const draft = { ...structuredClone(release), id: uid('draft'), restoredFrom: release.id, at: now(), status: 'draft', version: 1 };
      delete draft.approvedAt; delete draft.contentHash; delete draft.releaseId;
      data.drafts.push(draft); return draft;
    });
  }
  function restoreProfile(input, revision) {
    return mutate(revision, 'profile.restored', (data) => {
      const profile = readStore(home);
      need(input.profileRevision === profile.revision, 'Profile changed. Refresh before restoring.');
      need(Number.isSafeInteger(input.targetRevision) && input.targetRevision >= 0 && input.targetRevision < profile.revision, 'Choose an earlier revision');
      const historical = structuredClone(profile);
      for (const h of [...profile.history].reverse().filter((h) => h.revision > input.targetRevision)) {
        for (const change of h.records) {
          historical.records = historical.records.filter((r) => r.id !== change.id);
          if (change.before) historical.records.push(change.before);
        }
        historical.session = h.sessionBefore;
      }
      const result = updateStore(home, profile.revision, 'Restore profile revision ' + input.targetRevision, (doc) => {
        doc.records = historical.records;
        doc.session = historical.session;
      });
      validate(result); return { revision: result.revision };
    });
  }
  function configure(input, revision) {
    return mutate(revision, 'settings.updated', (data) => {
      if (input.scanMinutes !== undefined) {
        need(Number.isInteger(input.scanMinutes) && (input.scanMinutes === 0 || input.scanMinutes >= 5 && input.scanMinutes <= 1440), 'Scan interval must be 0 or 5–1440 minutes');
        data.settings.scanMinutes = input.scanMinutes;
      }
      if (input.githubUser !== undefined) {
        need(/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(input.githubUser), 'Invalid GitHub username');
        data.settings.githubUser = input.githubUser;
      }
      if (input.repository) {
        const snap = repoSnapshot(text(input.repository, 'Repository path', 2000));
        need(!data.repositories.some((r) => r.root.toLowerCase() === snap.root.toLowerCase()), 'Repository already monitored');
        data.repositories.push({ id: uid('repo'), name: path.basename(snap.root), ...snap, enabled: true, lastError: null });
      }
      if (input.repositoryId) {
        const repo = data.repositories.find((r) => r.id === input.repositoryId); need(repo, 'Unknown repository');
        need(typeof input.enabled === 'boolean', 'Choose enabled or disabled'); repo.enabled = input.enabled;
      }
      return data.settings;
    });
  }
  function scan(revision) {
    return mutate(revision, 'repositories.scanned', (data) => {
      const results = [];
      for (const repo of data.repositories.filter((r) => r.enabled)) {
        try {
          const snap = repoSnapshot(repo.root);
          if (snap.commit !== repo.commit) {
            const previous = repo.commit;
            const added = snap.dependencies.filter((d) => !repo.dependencies.includes(d));
            const removed = repo.dependencies.filter((d) => !snap.dependencies.includes(d));
            const safePath = (p) => /\.(tsx?|jsx?|mjs|cjs|py|rs|md)$/.test(p) && !/(secret|credential|token|private|\.env)/i.test(p);
            let paths = [];
            try { paths = git(repo.root, ['diff', '--name-only', previous, snap.commit, '--']).split('\n').filter(safePath).slice(0, 80); } catch { /* history rewritten: checkpoint only */ }
            const note = { id: uid('note'), text: repo.name + ': committed source changed from ' + previous + ' to ' + snap.commit + '.\nDependencies added: ' + (added.join(', ') || 'none') + '. Removed: ' + (removed.join(', ') || 'none') + '.\nSource paths: ' + (paths.join(', ') || 'none sampled') + '.\nEvidence of repository contents only. Ask what the person did and learned before adding a skill claim.',
              source: repo.root + ' @ ' + snap.commit, repositoryId: repo.id, commit: snap.commit, previous, at: now(), status: 'pending' };
            data.notes.push(note); results.push(note);
          }
          Object.assign(repo, snap, { lastError: null });
        } catch (e) { repo.lastError = e.message.split('\n')[0]; results.push({ repositoryId: repo.id, error: repo.lastError }); }
      }
      return results;
    });
  }
  function agentPacket() {
    const state = view();
    return { instructions: 'Review pending evidence with the person. Preserve attribution: repository dependencies are not proficiency. Return one proposal per distinct fact, correct an existing claimId rather than duplicating. Draft outputs may improve wording but must cite selected claim IDs and preserve dates, uncertainty and authorship. Never publish. Use the dashboard CLI capture/propose/edit commands; use fresh revisions. Other threads can use the installed career-profile-builder skill.',
      dashboardRevision: state.revision, profileRevision: state.profile.revision, notes: state.notes.filter((n) => n.status === 'pending'), proposals: state.proposals.filter((p) => p.status === 'pending'),
      claims: state.profile.records.filter((r) => r.type === 'claim').map(({ id, subjectId, field, statement, confirmation, source, conflict }) => ({ id, subjectId, field, statement, confirmation, source, conflict })),
      drafts: state.drafts.filter((d) => d.status === 'draft') };
  }
  function releaseById(id, forPublication = false) {
    const data = load(), release = data.releases.find((r) => r.id === id);
    need(release, 'Unknown approved release'); need(hash(release.body) === release.contentHash, 'Release integrity check failed');
    need(!forPublication || !data.revocations.some((r) => r.releaseId === id), 'Publication approval was revoked');
    return release;
  }
  function exportRelease(id, format = 'md') { return artifact(releaseById(id), format); }
  async function publish(input, revision) {
    const release = releaseById(input.id, true);
    need(freshness(release), 'Source facts changed since approval. Reconcile before publishing.');
    need(input.contentHash === release.contentHash, 'Review the exact release before publishing');
    const snapshot = load(); need(snapshot.revision === revision, 'Dashboard changed. Refresh before publishing.');
    if (release.channel === 'linkedin') {
      need(input.manualApplied === true, 'Apply the LinkedIn sections yourself, then mark them applied');
      return mutate(revision, 'publication.manual-applied', (data) => {
        const receipt = { id: uid('publication'), releaseId: release.id, channel: release.channel, at: now(), status: 'manually-applied', verification: 'User report; external profile not verified' };
        data.publications.push(receipt); return receipt;
      });
    }
    const attempt = mutate(revision, 'publication.started', (data) => {
      const attempt = { id: uid('publication'), releaseId: release.id, channel: release.channel, at: now(), status: 'preparing' };
      data.publications.push(attempt); return attempt;
    });
    try {
      let target, before, after, status;
      if (release.channel === 'github') {
        const user = snapshot.settings.githubUser; need(user, 'Configure your GitHub username first');
        const result = await github({ user, body: release.body, expectedRemote: input.expectedRemote, inspectOnly: input.inspectOnly });
        target = result.target; before = result.before; after = result.after; status = 'published';
      } else {
        need(publicDir, 'Public output directory is not configured');
        const format = release.channel.startsWith('cv-') ? 'pdf' : 'html';
        const output = await artifact(release, format);
        releaseById(release.id, true);
        need(freshness(release), 'Source facts changed while preparing the artifact. Reconcile before publishing.');
        const directory = path.join(publicDir, 'career'); fs.mkdirSync(directory, { recursive: true });
        // Resolve existing ancestors to prevent writing through a symlink outside the public root.
        need(fs.realpathSync(directory).toLowerCase() === path.join(fs.realpathSync(publicDir), 'career').toLowerCase(), 'Public career directory must not be a symlink');
        target = path.join(directory, release.channel + '.' + format);
        need(!fs.existsSync(target) || !fs.lstatSync(target).isSymbolicLink(), 'Publication target must not be a symlink');
        before = fs.existsSync(target) ? hash(fs.readFileSync(target)) : null;
        need(input.expectedRemote === before, 'Published file changed. Refresh its fingerprint before replacing it.');
        const temp = target + '.' + randomUUID() + '.tmp'; fs.writeFileSync(temp, output.bytes); fs.renameSync(temp, target);
        after = hash(output.bytes); status = 'published-locally';
      }
      return locked((data) => {
        const receipt = data.publications.find((p) => p.id === attempt.id);
        Object.assign(receipt, { status, target, before, after, completedAt: now() });
        event(data, 'publication.completed', { publicationId: receipt.id }); return receipt;
      });
    } catch (e) {
      locked((data) => { const receipt = data.publications.find((p) => p.id === attempt.id); receipt.status = 'failed-or-unverified'; receipt.error = e.message; event(data, 'publication.failed', { publicationId: receipt.id }); });
      throw e;
    }
  }
  async function inspectTarget(id) {
    const release = releaseById(id), data = load();
    if (release.channel === 'github') return github({ user: data.settings.githubUser, inspectOnly: true });
    if (release.channel === 'linkedin') return { manual: true, fingerprint: null, target: 'LinkedIn profile' };
    const target = path.join(publicDir || '', 'career', release.channel + (release.channel.startsWith('cv-') ? '.pdf' : '.html'));
    return { fingerprint: fs.existsSync(target) ? hash(fs.readFileSync(target)) : null, target };
  }
  if (load().proposals.some((p) => p.status === 'applying')) locked(() => {});
  return { view, capture, dismissNote, propose, review, generate, edit, reconcile, archiveDraft, approve, revoke, restoreDraft, restoreProfile, configure, scan, agentPacket, exportRelease, publish, inspectTarget, hash };
}

export async function artifact(release, format) {
  const filename = release.channel + '-' + release.id + '.' + format;
  if (format === 'md') return { filename, mime: 'text/markdown; charset=utf-8', bytes: Buffer.from(release.body) };
  if (format === 'json') return { filename, mime: 'application/json', bytes: Buffer.from(JSON.stringify({ channel: release.channel, body: release.body, approvedAt: release.approvedAt, contentHash: release.contentHash }, null, 2)) };
  if (format === 'html') {
    // Escape all content; the editor accepts Markdown text, never arbitrary executable HTML.
    const lines = release.body.split('\n').map((line) => line.startsWith('# ') ? '<h1>' + escapeHtml(line.slice(2)) + '</h1>' : line.startsWith('## ') ? '<h2>' + escapeHtml(line.slice(3)) + '</h2>' : '<p>' + escapeHtml(line.replace(/^- /, '')) + '</p>');
    const html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Career profile</title><style>body{font:16px/1.65 system-ui;color:#172028;max-width:850px;margin:48px auto;padding:0 24px}h1{font-size:36px}h2{font-size:22px;margin-top:40px}p{white-space:pre-wrap}@media print{body{margin:0}}</style><main>' + lines.join('') + '</main></html>';
    return { filename, mime: 'text/html; charset=utf-8', bytes: Buffer.from(html) };
  }
  if (format === 'pdf') {
    const React = await import('react'), pdf = await import('@react-pdf/renderer');
    const h = React.createElement;
    const lines = release.body.split('\n').filter((line) => line.trim());
    const doc = h(pdf.Document, { title: channels[release.channel], author: 'Career desk' }, h(pdf.Page, { size: 'A4', style: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 } },
      ...lines.map((line, i) => h(pdf.Text, { key: i, style: { fontSize: line.startsWith('# ') ? 22 : line.startsWith('## ') ? 13 : 10, marginBottom: 8, marginTop: line.startsWith('## ') ? 10 : 0 } }, line.replace(/^#{1,2} /, '').replace(/^- /, '• ')))));
    return { filename, mime: 'application/pdf', bytes: await pdf.renderToBuffer(doc) };
  }
  throw new Error('Choose md, json, html or pdf');
}

function gh(args, input) {
  return execFileSync('gh', ['api', ...args], { encoding: 'utf8', input, timeout: 30000, maxBuffer: 2 * 1024 * 1024, windowsHide: true });
}
async function defaultGithub({ user, body, expectedRemote, inspectOnly }) {
  need(typeof user === 'string' && /^[a-z\d][a-z\d-]{0,38}$/i.test(user), 'Configure GitHub username first');
  const identity = JSON.parse(gh(['user']));
  need(identity.login.toLowerCase() === user.toLowerCase(), 'GitHub CLI is signed in as a different user');
  const endpoint = 'repos/' + user + '/' + user + '/contents/README.md';
  let current;
  try { current = JSON.parse(gh([endpoint])); }
  catch (e) { throw new Error('Cannot read the existing GitHub profile README. Create the profile repository and README first, and check gh authentication.'); }
  const target = 'https://github.com/' + user + '/' + user + '/blob/' + (current.html_url?.split('/blob/')[1] || 'HEAD/README.md');
  if (inspectOnly) return { fingerprint: current.sha, target, body: Buffer.from(current.content, 'base64').toString('utf8') };
  need(expectedRemote === current.sha, 'GitHub README changed. Inspect and review the latest version before publishing.');
  const result = JSON.parse(gh(['--method', 'PUT', endpoint, '--input', '-'], JSON.stringify({ message: 'Update approved career profile', content: Buffer.from(body).toString('base64'), sha: current.sha })));
  return { target: result.content.html_url, before: { sha: current.sha, body: Buffer.from(current.content, 'base64').toString('utf8') }, after: result.content.sha };
}
