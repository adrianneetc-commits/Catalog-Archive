import http from 'http';
import { exec } from 'child_process';
import crypto from 'crypto';

const HOST = '127.0.0.1';
const PORT = 8765;
const TOKEN = crypto.randomBytes(16).toString('hex');

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  if (req.method === 'POST' && req.url === '/run') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try {
        parsed = JSON.parse(body || '{}');
      } catch (e) {
        parsed = {};
      }

      if (parsed.token !== TOKEN) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'bad token' }));
      }

      const command = parsed.command || '';
      exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
        const payload = {
          stdout: stdout || '',
          stderr: stderr || (error ? error.message : ''),
          exit_code: error ? (error.code ?? -1) : 0
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
      });
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, HOST, () => {
  console.log(`cmdvault runner listening on http://${HOST}:${PORT}`);
  console.log(`token: ${TOKEN}`);
  console.log("Paste this token into cmdvault's Runner settings, then hit Connect.");
  console.log('Ctrl+C to stop.');
});