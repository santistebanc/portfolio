import fs from 'node:fs';
import path from 'node:path';
import { createHub } from './hub.mjs';
import { startServer } from './server.mjs';

export async function main(args = process.argv.slice(2)) {
  const command = args[0] || 'help';
  const flag = (key) => { const i = args.indexOf('--' + key); return i < 0 ? undefined : args[i + 1]; };
  if (command === 'help') {
    console.log(`Career desk — private local review and publication control
Commands: serve | status | packet | capture | dismissNote | propose | review | generate | edit
          reconcile | archiveDraft | approve | revoke
          restoreDraft | restoreProfile | configure | scan | target | export | publish
Options: --home PRIVATE_DIRECTORY --revision DASHBOARD_REVISION --input UTF8_JSON_FILE
serve: --port 4310
target/export: --id RELEASE_ID; export also --format md|html|json|pdf --out PRIVATE_FILE
Mutations require the current dashboard revision. propose/generate/restoreProfile also
need profileRevision in JSON. Read status first. Never place input or packet files in public/.
See tools/career-dashboard/README.md for JSON examples.`); return;
  }
  const home = flag('home'), hub = createHub({ home, publicDir: path.resolve(import.meta.dirname, '../../public') });
  if (command === 'serve') {
    hub.view();
    const port = Number(flag('port') || 4310);
    if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Choose a port from 1024 to 65535');
    const server = startServer({ port, hub });
    server.once('listening', () => console.log('Career desk: http://127.0.0.1:' + server.address().port + '\nProfile data: ' + hub.view().home + '\nRepository scans run only while this process is running.'));
    server.on('error', (e) => { console.error(e.message); process.exitCode = 1; }); return;
  }
  if (command === 'status') {
    const state = hub.view();
    console.log(JSON.stringify({ revision: state.revision, profileRevision: state.profile.revision, name: state.profile.name, home: state.home,
      pendingNotes: state.notes.filter((n) => n.status === 'pending').length, pendingProposals: state.proposals.filter((p) => p.status === 'pending').length,
      drafts: state.drafts.map(({ id, channel, status, fresh }) => ({ id, channel, status, fresh })),
      releases: state.releases.map(({ id, channel, contentHash }) => ({ id, channel, contentHash })) }, null, 2)); return;
  }
  if (command === 'packet') {
    const output = JSON.stringify(hub.agentPacket(), null, 2);
    if (flag('out')) fs.writeFileSync(flag('out'), output, { flag: 'wx', mode: 0o600 }); else console.log(output); return;
  }
  if (command === 'target') { console.log(JSON.stringify(await hub.inspectTarget(flag('id')), null, 2)); return; }
  if (command === 'export') {
    const result = await hub.exportRelease(flag('id'), flag('format') || 'md');
    if (!flag('out')) throw new Error('Export requires --out PRIVATE_FILE');
    fs.writeFileSync(flag('out'), result.bytes, { flag: 'wx', mode: 0o600 }); console.log('Saved ' + flag('out')); return;
  }
  const commands = ['capture', 'dismissNote', 'propose', 'review', 'generate', 'edit', 'reconcile', 'archiveDraft', 'approve', 'revoke', 'restoreDraft', 'restoreProfile', 'configure', 'scan', 'publish'];
  if (!commands.includes(command)) throw new Error('Unknown command. Use help.');
  const revision = Number(flag('revision'));
  const input = flag('input') ? JSON.parse(fs.readFileSync(flag('input'), 'utf8').replace(/^\uFEFF/, '')) : {};
  const result = await (command === 'scan' ? hub.scan(revision) : hub[command](input, revision));
  console.log(JSON.stringify({ result, revision: hub.view().revision }, null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) main().catch((e) => { console.error(e.message); process.exitCode = 1; });
