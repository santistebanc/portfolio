import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { createHub } from './hub.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
export function startServer({ port = 4310, home, publicDir = path.resolve(here, '../../public'), hub = createHub({ home, publicDir }), timer = true } = {}) {
  const token = randomBytes(32).toString('hex');
  const actions = ['capture', 'dismissNote', 'propose', 'review', 'generate', 'edit', 'reconcile', 'archiveDraft', 'approve', 'revoke', 'restoreDraft', 'restoreProfile', 'configure', 'scan', 'publish'];
  const server = http.createServer(async (req, res) => {
    const actualPort = server.address().port;
    const allowedHosts = ['127.0.0.1:' + actualPort, 'localhost:' + actualPort];
    const origin = req.headers.origin;
    const safeOrigin = !origin || allowedHosts.some((h) => origin === 'http://' + h);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    function json(status, data) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); }
    if (!allowedHosts.includes(req.headers.host) || !safeOrigin) return json(403, { error: 'This dashboard accepts same-origin loopback requests only.' });
    const url = new URL(req.url, 'http://127.0.0.1');
    try {
      if (req.method === 'GET' && url.pathname === '/api/state') return json(200, { ...hub.view(), token });
      if (req.method === 'GET' && url.pathname === '/api/agent-packet') return json(200, hub.agentPacket());
      if (req.method === 'GET' && url.pathname === '/api/target') return json(200, await hub.inspectTarget(url.searchParams.get('id')));
      if (req.method === 'GET' && url.pathname === '/api/export') {
        const result = await hub.exportRelease(url.searchParams.get('id'), url.searchParams.get('format') || 'md');
        res.writeHead(200, { 'Content-Type': result.mime, 'Content-Disposition': 'attachment; filename="' + result.filename + '"' }); return res.end(result.bytes);
      }
      if (req.method === 'POST' && url.pathname.startsWith('/api/')) {
        const submitted = String(req.headers['x-career-token'] || '');
        if (submitted.length !== token.length || !timingSafeEqual(Buffer.from(submitted), Buffer.from(token))) return json(403, { error: 'Refresh the dashboard before making changes.' });
        if (!String(req.headers['content-type']).startsWith('application/json')) return json(415, { error: 'JSON requests required' });
        let raw = '', size = 0;
        for await (const chunk of req) { size += chunk.length; if (size > 1024 * 1024) throw new Error('Request too large'); raw += chunk.toString('utf8'); }
        const { revision, ...input } = JSON.parse(raw);
        const action = url.pathname.slice('/api/'.length);
        if (!actions.includes(action)) return json(404, { error: 'Unknown action' });
        const result = await (action === 'scan' ? hub.scan(revision) : hub[action](input, revision));
        return json(200, { result });
      }
      if (req.method !== 'GET') return json(405, { error: 'Method not allowed' });
      const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
      const root = path.join(here, 'dist'), file = path.resolve(root, relative);
      if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return json(404, { error: 'Page not found. Run npm run career:build if needed.' });
      const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.woff2': 'font/woff2' };
      if (!types[path.extname(file)]) return json(404, { error: 'File type not served' });
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] }); res.end(fs.readFileSync(file));
    } catch (e) { json(400, { error: e.message }); }
  });
  let lastScan = Date.now(), busy = false;
  const interval = timer ? setInterval(() => {
    if (busy) return;
    try {
      const state = hub.view(), minutes = state.settings.scanMinutes;
      if (!minutes || Date.now() - lastScan < minutes * 60000) return;
      busy = true; hub.scan(state.revision); lastScan = Date.now();
    } catch (e) { console.error('Career repository scan:', e.message); lastScan = Date.now(); }
    finally { busy = false; }
  }, 30000) : null;
  interval?.unref(); server.on('close', () => clearInterval(interval));
  server.listen(port, '127.0.0.1');
  return server;
}
