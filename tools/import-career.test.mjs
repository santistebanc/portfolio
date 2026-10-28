import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readBundle, importBundle, digest } from './import-career.mjs';

function fixture(t, channel = 'portfolio') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-import-'));
  t.after(() => {
    assert.ok(path.resolve(root).startsWith(path.join(os.tmpdir(), 'portfolio-import-')));
    fs.rmSync(root, { recursive: true, force: true });
  });
  const input = path.join(root, 'bundle'); fs.mkdirSync(input); fs.mkdirSync(path.join(root, 'public'));
  const body = Buffer.from('# Reviewed profile\n<script>alert("private")</script>');
  const files = new Map([['body.md', body]]);
  if (channel !== 'portfolio') files.set('document.pdf', Buffer.from('%PDF-1.7\nfixture'));
  const manifest = { schemaVersion: 1, channel, approvedAt: '2026-10-28T00:00:00.000Z', contentHash: digest(body),
    files: [...files].map(([name, bytes]) => ({ name, sha256: digest(bytes), size: bytes.length })) };
  for (const [name, bytes] of files) fs.writeFileSync(path.join(input, name), bytes);
  const save = () => fs.writeFileSync(path.join(input, 'release.json'), JSON.stringify(manifest)); save();
  return { root, input, manifest, save };
}

test('import is read-only by default, escapes HTML and requires an exact destination precondition', (t) => {
  const f = fixture(t), inspect = importBundle(f.input, { root: f.root });
  const target = path.join(f.root, 'public', inspect.target);
  assert.equal(inspect.current, 'missing'); assert.equal(fs.existsSync(target), false);
  assert.throws(() => importBundle(f.input, { root: f.root, apply: true }), /expected hash/);
  importBundle(f.input, { root: f.root, apply: true, expectedCurrent: 'missing' });
  const html = fs.readFileSync(target, 'utf8'); assert.match(html, /&lt;script&gt;/); assert.doesNotMatch(html, /<script>/);
  fs.writeFileSync(target, 'Concurrent change');
  assert.throws(() => importBundle(f.input, { root: f.root, apply: true, expectedCurrent: inspect.next }), /Target changed/);
  assert.equal(fs.readFileSync(target, 'utf8'), 'Concurrent change');
});

test('private fields, extra files, tampered bytes and traversal names are rejected before publication', (t) => {
  const f = fixture(t);
  f.manifest.sourceRecords = []; f.save(); assert.throws(() => readBundle(f.input), /Unexpected release fields/);
  delete f.manifest.sourceRecords; f.save();
  fs.writeFileSync(path.join(f.input, 'private-notes.json'), '{}'); assert.throws(() => readBundle(f.input), /extra files/);
  fs.unlinkSync(path.join(f.input, 'private-notes.json'));
  fs.appendFileSync(path.join(f.input, 'body.md'), ' tampered'); assert.throws(() => readBundle(f.input), /integrity/);
  f.manifest.files[0].name = '../profile.json'; f.save(); assert.throws(() => readBundle(f.input), /allowlist/);
  assert.deepEqual(fs.readdirSync(path.join(f.root, 'public')), []);
});

test('a CV release updates only the canonical CV after its existing fingerprint is reviewed', (t) => {
  const f = fixture(t, 'cv-frontend'), target = path.join(f.root, 'public', 'Carlos_Santisteban_CV.pdf');
  fs.writeFileSync(target, 'Old public CV');
  const inspect = importBundle(f.input, { root: f.root });
  importBundle(f.input, { root: f.root, expectedCurrent: inspect.current, apply: true });
  assert.equal(fs.readFileSync(target).subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(fs.readdirSync(path.join(f.root, 'public')), ['Carlos_Santisteban_CV.pdf']);
});

test('a German CV release is rejected and leaves the public English CV unchanged', (t) => {
  const f = fixture(t, 'cv-german'), english = path.join(f.root, 'public', 'Carlos_Santisteban_CV.pdf');
  fs.writeFileSync(english, 'Existing English CV');
  assert.throws(() => importBundle(f.input, { root: f.root, apply: true, expectedCurrent: 'missing' }), /Unsupported release format or channel/);
  assert.equal(fs.readFileSync(english, 'utf8'), 'Existing English CV');
  assert.deepEqual(fs.readdirSync(path.join(f.root, 'public')), ['Carlos_Santisteban_CV.pdf']);
});
