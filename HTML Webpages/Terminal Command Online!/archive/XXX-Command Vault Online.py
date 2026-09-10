#!/usr/bin/env python3
"""
cmdvault local runner

Lets the cmdvault HTML page execute commands on THIS machine, by having
the page send them to a tiny local server instead of running them itself
(no webpage can execute shell commands directly - that's a browser
security boundary, not a missing feature).

Security notes:
- Binds to 127.0.0.1 ONLY. Nothing outside your machine can reach it.
- Requires a random token (printed below) that you paste into the app
  once, so a random other tab/site on your machine can't quietly submit
  commands to it.
- It will run whatever text you saved as a "command" in cmdvault, exactly
  as if you typed it into your own terminal. Don't paste in commands you
  don't understand, and don't leave this running when you're not using it
  (Ctrl+C stops it).

Usage:
    python3 cmdvault-runner.py
"""
import http.server
import json
import secrets
import socketserver
import subprocess
import sys

HOST = "127.0.0.1"
PORT = 8765
TOKEN = secrets.token_hex(16)


class Handler(http.server.BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path == "/ping":
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": True}).encode())
        else:
            self.send_response(404)
            self._cors()
            self.end_headers()

    def do_POST(self):
        if self.path != "/run":
            self.send_response(404)
            self._cors()
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            body = {}

        if body.get("token") != TOKEN:
            self.send_response(401)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "bad token"}).encode())
            return

        command = body.get("command", "")
        try:
            result = subprocess.run(
                command, shell=True, capture_output=True, text=True, timeout=60
            )
            payload = {
                "stdout": result.stdout,
                "stderr": result.stderr,
                "exit_code": result.returncode,
            }
        except subprocess.TimeoutExpired:
            payload = {"stdout": "", "stderr": "command timed out after 60s", "exit_code": -1}
        except Exception as e:
            payload = {"stdout": "", "stderr": str(e), "exit_code": -1}

        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def log_message(self, format, *args):
        pass  # keep the console quiet


if __name__ == "__main__":
    print(f"cmdvault runner listening on http://{HOST}:{PORT}")
    print(f"token: {TOKEN}")
    print("Paste this token into cmdvault's Runner settings, then hit Connect.")
    print("Ctrl+C to stop.")
    with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped.")
            sys.exit(0)
