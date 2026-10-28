import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const channels = ['portfolio', 'cv-frontend', 'cv-fullstack', 'cv-product', 'cv-ai', 'cv-german'];
export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const need = (value, message) => { if (!value) throw new Error(message); };
function exactKeys(value, keys) {
  return value && typeof value === 'object' && !Array.isArray(value) &&
    Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

export function readBundle(directory) {
  const root = fs.realpathSync(directory);
  const read = (name, maximum) => {
    const file = path.join(root, name), stat = fs.lstatSync(file);
    need(stat.isFile() && !stat.isSymbolicLink() && stat.size <= maximum, 'Invalid or oversized release file: ' + name);
    return fs.readFileSync(file);
  };
  const manifest = JSON.parse(read('release.json', 10000).toString('utf8'));
  need(exactKeys(manifest, ['schemaVersion', 'channel', 'approvedAt', 'contentHash', 'files']), 'Unexpected release fields');
  need(manifest.schemaVersion === 1 && channels.includes(manifest.channel), 'Unsupported release format or channel');
  need(typeof manifest.approvedAt === 'string' && Number.isFinite(Date.parse(manifest.approvedAt)), 'Invalid approval date');
  need(/^[a-f0-9]{64}$/.test(manifest.contentHash), 'Invalid approved-text hash');
  const expected = manifest.channel === 'portfolio' ? ['body.md'] : ['body.md', 'document.pdf'];
  need(Array.isArray(manifest.files) && manifest.files.length === expected.length, 'Unexpected release files');
  const names = manifest.files.map((file) => file?.name);
  need(new Set(names).size === names.length && expected.every((name) => names.includes(name)), 'Release file allowlist mismatch');
  need(fs.readdirSync(root).sort().join('\0') === ['release.json', ...expected].sort().join('\0'), 'Bundle contains unapproved extra files');
  const files = new Map();
  for (const entry of manifest.files) {
    need(exactKeys(entry, ['name', 'sha256', 'size']), 'Unexpected file metadata');
    const bytes = read(entry.name, entry.name === 'body.md' ? 1000000 : 10000000);
    need(bytes.length === entry.size && digest(bytes) === entry.sha256, 'File integrity check failed: ' + entry.name);
    files.set(entry.name, bytes);
  }
  need(digest(files.get('body.md')) === manifest.contentHash, 'Approved wording hash mismatch');
  if (files.has('document.pdf')) need(files.get('document.pdf').subarray(0, 5).equals(Buffer.from('%PDF-')), 'Invalid PDF');
  return { manifest, files };
}

const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function importBundle(directory, { root, expectedCurrent, apply = false } = {}) {
  const bundle = readBundle(directory), publicRoot = path.join(root, 'public');
  const isProfile = bundle.manifest.channel === 'portfolio';
  const relative = isProfile ? 'career/portfolio.html' : bundle.manifest.channel === 'cv-german' ? 'Carlos_Santisteban_CV_DE.pdf' : 'Carlos_Santisteban_CV.pdf';
  const target = path.join(publicRoot, relative);
  // Directory ancestors may not redirect publication through a symlink/junction.
  const resolvedPublic = fs.realpathSync(publicRoot);
  need(path.resolve(publicRoot).toLowerCase() === resolvedPublic.toLowerCase(), 'Public directory must not redirect outside the checkout');
  const parent = path.dirname(target);
  if (fs.existsSync(parent)) need(fs.realpathSync(parent).toLowerCase() === path.resolve(parent).toLowerCase(), 'Publication directory must not be a symlink');
  if (fs.existsSync(target)) need(!fs.lstatSync(target).isSymbolicLink(), 'Publication target must not be a symlink');
  const current = fs.existsSync(target) ? digest(fs.readFileSync(target)) : 'missing';
  const body = bundle.files.get('body.md').toString('utf8');
  const html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Career profile</title><style>body{font:16px/1.6 system-ui;max-width:800px;margin:40px auto;padding:0 24px}p{white-space:pre-wrap}</style><main>' +
    body.split('\n').map((line) => line.startsWith('# ') ? '<h1>' + escapeHtml(line.slice(2)) + '</h1>' : line.startsWith('## ') ? '<h2>' + escapeHtml(line.slice(3)) + '</h2>' : '<p>' + escapeHtml(line) + '</p>').join('') + '</main></html>';
  const bytes = isProfile ? Buffer.from(html) : bundle.files.get('document.pdf');
  const result = { channel: bundle.manifest.channel, target: relative, current, next: digest(bytes), applied: apply };
  if (!apply) return result;
  need(expectedCurrent === current, 'Target changed or no expected hash supplied. Run without --apply and review first.');
  fs.mkdirSync(parent, { recursive: true });
  const temporary = target + '.' + randomUUID() + '.tmp';
  try {
    fs.writeFileSync(temporary, bytes, { flag: 'wx' });
    need((fs.existsSync(target) ? digest(fs.readFileSync(target)) : 'missing') === current, 'Target changed during import');
    fs.renameSync(temporary, target);
  } finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), index = args.indexOf('--expected-current');
    need(args[0] && !args[0].startsWith('--'), 'Usage: npm run import:career -- BUNDLE_DIRECTORY [--apply --expected-current HASH_OR_missing]');
    console.log(JSON.stringify(importBundle(args[0], { root: fileURLToPath(new URL('../', import.meta.url)), apply: args.includes('--apply'), expectedCurrent: index < 0 ? undefined : args[index + 1] }), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
