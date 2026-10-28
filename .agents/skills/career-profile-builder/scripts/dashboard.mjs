import { main } from '../../../../tools/career-dashboard/cli.mjs';
main().catch((e) => { console.error(e.message); process.exitCode = 1; });
