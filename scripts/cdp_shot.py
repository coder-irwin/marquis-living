"""Minimal Chrome DevTools Protocol driver: scroll to fractions of page height
and screenshot. Usage: python cdp_shot.py <url> <out_prefix> <frac1> <frac2> ...
Requires Chrome already running with --remote-debugging-port=9222."""
import sys, json, socket, base64, os, struct, time, urllib.request

PORT = 9222

def ws_connect(ws_url):
    # ws://host:port/path
    assert ws_url.startswith("ws://")
    rest = ws_url[5:]
    hostport, path = rest.split("/", 1)
    host, port = hostport.split(":")
    s = socket.create_connection((host, int(port)))
    key = base64.b64encode(os.urandom(16)).decode()
    req = (f"GET /{path} HTTP/1.1\r\nHost: {hostport}\r\n"
           "Upgrade: websocket\r\nConnection: Upgrade\r\n"
           f"Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n")
    s.send(req.encode())
    # read handshake response
    data = b""
    while b"\r\n\r\n" not in data:
        data += s.recv(4096)
    return s

def send(s, msg):
    payload = json.dumps(msg).encode()
    header = b"\x81"  # FIN + text
    n = len(payload)
    mask = os.urandom(4)
    if n < 126:
        header += struct.pack("B", 0x80 | n)
    elif n < 65536:
        header += struct.pack("B", 0x80 | 126) + struct.pack(">H", n)
    else:
        header += struct.pack("B", 0x80 | 127) + struct.pack(">Q", n)
    header += mask
    masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
    s.send(header + masked)

def recv(s):
    def rd(n):
        b = b""
        while len(b) < n:
            chunk = s.recv(n - len(b))
            if not chunk: raise IOError("closed")
            b += chunk
        return b
    b0, b1 = rd(2)
    ln = b1 & 0x7F
    if ln == 126: ln = struct.unpack(">H", rd(2))[0]
    elif ln == 127: ln = struct.unpack(">Q", rd(8))[0]
    return json.loads(rd(ln).decode())

def call(s, mid, method, params=None):
    send(s, {"id": mid, "method": method, "params": params or {}})
    while True:
        m = recv(s)
        if m.get("id") == mid:
            return m

def main():
    url, prefix = sys.argv[1], sys.argv[2]
    fracs = [float(x) for x in sys.argv[3:]] or [0.0]
    targets = json.loads(urllib.request.urlopen(f"http://localhost:{PORT}/json").read())
    page = next(t for t in targets if t["type"] == "page")
    s = ws_connect(page["webSocketDebuggerUrl"])
    mid = 0
    def c(method, params=None):
        nonlocal mid; mid += 1; return call(s, mid, method, params)
    c("Page.enable"); c("Runtime.enable")
    c("Page.navigate", {"url": url})
    time.sleep(6)  # load + frame preload
    for i, f in enumerate(fracs):
        c("Runtime.evaluate", {"expression":
            f"window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * {f});"})
        time.sleep(1.6)
        r = c("Page.captureScreenshot", {"format": "png"})
        out = f"{prefix}_{i}.png"
        with open(out, "wb") as fp:
            fp.write(base64.b64decode(r["result"]["data"]))
        print(f"saved {out} at frac {f}")
    s.close()

if __name__ == "__main__":
    main()
