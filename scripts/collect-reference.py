"""Collect publicly served visual assets from the inspected reference inventory."""
import json, pathlib, urllib.request, concurrent.futures, re
root=pathlib.Path(__file__).resolve().parent.parent
j=json.load(open(root/'artifacts/reference-decoded.json'))
def clean(v):
 if v==[0]: return None
 if isinstance(v,dict): return {k:clean(x) for k,x in v.items() if k not in ['popupOptions','trackEvent']}
 if isinstance(v,list): return [clean(x) for x in v]
 return v
j=clean(j)
def urls(v):
 if isinstance(v,str) and v.startswith('https://cdn.calendlycms.com/'): yield v
 elif isinstance(v,dict):
  for x in v.values(): yield from urls(x)
 elif isinstance(v,list):
  for x in v: yield from urls(x)
assets=set(urls(j))|set(j['fonts'])|set(j['styles'])
def download(url):
 name=url.rsplit('/',1)[-1].split('?')[0]
 folder='fonts' if name.endswith('.woff2') else 'media'
 path=root/'public'/folder/name
 if not path.exists():
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=60) as r: path.write_bytes(r.read())
 return url,'/'+folder+'/'+name
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 results=dict(pool.map(download,assets))
def localize(v):
 if isinstance(v,str): return results.get(v,v)
 if isinstance(v,dict): return {k:localize(x) for k,x in v.items()}
 if isinstance(v,list): return [localize(x) for x in v]
 return v
(root/'data/homepage.json').write_text(json.dumps(localize(j['islands']),ensure_ascii=False,indent=2))
(root/'data/asset-manifest.json').write_text(json.dumps(results,indent=2))
print('Collected',len(results),'assets')
