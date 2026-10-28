import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function checkPublic(root) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public-files.json'), 'utf8'));
  const required = manifest.required, optional = manifest.optional;
  if (!Array.isArray(required) || !Array.isArray(optional)) throw new Error('Invalid public file allowlist');
  const allowed = new Set([...required, ...optional]);
  if (allowed.size !== required.length + optional.length) throw new Error('Duplicate public file entry');
  for (const name of allowed) {
    if (typeof name !== 'string' || name.startsWith('/') || name.includes('\\') || name.split('/').some((part) => !part || part === '.' || part === '..')) throw new Error('Invalid public file path');
    if (/jobcenter|almedia|baobab|kelea|(?:profile|dashboard)\.json|private|packet/i.test(name)) throw new Error('Private or obsolete file is not publishable: ' + name);
  }
  const actual = new Set();
  function walk(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name), name = prefix + entry.name;
      if (entry.isSymbolicLink()) throw new Error('Public files must not redirect outside the checkout: ' + name);
      if (entry.isDirectory()) walk(file, name + '/');
      else {
        if (!entry.isFile() || !allowed.has(name)) throw new Error('Unreviewed file in public/: ' + name);
        actual.add(name);
      }
    }
  }
  walk(path.join(root, 'public'));
  for (const file of required) if (!actual.has(file)) throw new Error('Missing public file: ' + file);
  return actual.size;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Checked ' + checkPublic(fileURLToPath(new URL('../', import.meta.url))) + ' explicitly allowed public files'); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
