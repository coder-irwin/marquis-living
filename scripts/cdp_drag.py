"""Scroll to the .ba viewer, simulate a React mousemove at a given width
fraction, screenshot. Usage: python cdp_drag.py <url> <out> <xfrac>"""
import sys, time, base64
sys.path.insert(0, __file__.rsplit("\\", 1)[0] if "\\" in __file__ else ".")
from cdp_shot import ws_connect, call
import json, urllib.request

url, out, xf = sys.argv[1], sys.argv[2], float(sys.argv[3])
targets = json.loads(urllib.request.urlopen("http://localhost:9222/json").read())
page = next(t for t in targets if t["type"] == "page")
s = ws_connect(page["webSocketDebuggerUrl"])
mid = [0]
def c(m, p=None):
    mid[0] += 1; return call(s, mid[0], m, p or {})
c("Page.enable"); c("Runtime.enable")
c("Page.navigate", {"url": url}); time.sleep(6)
# scroll .ba into center
c("Runtime.evaluate", {"expression": "document.querySelector('.ba').scrollIntoView({block:'center'});"})
time.sleep(1.2)
# dispatch a React-friendly mousemove at xfrac across the .ba
expr = f"""(()=>{{const el=document.querySelector('.ba');const r=el.getBoundingClientRect();
const x=r.left+r.width*{xf}, y=r.top+r.height*0.5;
el.dispatchEvent(new MouseEvent('mousemove',{{clientX:x,clientY:y,bubbles:true}}));
return [Math.round(x),Math.round(y)];}})()"""
print("moved to", c("Runtime.evaluate", {"expression": expr, "returnByValue": True})["result"]["result"]["value"])
time.sleep(0.5)
r = c("Page.captureScreenshot", {"format": "png"})
open(out, "wb").write(base64.b64decode(r["result"]["data"]))
print("saved", out)
s.close()
