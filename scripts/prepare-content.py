import json,pathlib,re
from bs4 import BeautifulSoup
root=pathlib.Path(__file__).resolve().parent.parent
j=json.load(open(root/'data/homepage.json')); dom=json.load(open(root/'artifacts/reference-dom.json'))
def prop(name):return next(x['props'] for x in j if x['component']==name)
def txt(v):
 if isinstance(v,dict): return v.get('text','')+''.join(txt(x) for k,x in v.items() if k in ['root','children'])
 if isinstance(v,list):return ''.join(txt(x) for x in v)
 return ''
content={}
content['hero']=prop('HeroIsland');content['hero'].pop('referenceItems',None)
content['products']=prop('MultiProductHeroInteractive')['tabs']
content['workflow']=[]
for c in prop('TimelineFeatureDeck')['cards']:
 c['description']=txt(c['activeContent']['root']['children'][0]);c['steps']=c['activeContent']['root']['children'][1]['fields']['items'];del c['activeContent'];content['workflow'].append(c)
content['scheduling']=prop('StickyCarouselIsland')
content['features']=[x['props'] for x in j if x['component']=='FeatureAccordionIsland']
content['stories']=prop('UseCaseCarousel')['cards']
for c in content['stories']:c['quote']=txt(c.pop('statement'))
content['integrations']=prop('IconTilesSectionIsland')['tiles']
content['suites']=prop('CardGridIsland')['cards']
content['conversion']=prop('ConversionPanelIsland')
content['footer']=prop('GlobalFooterIsland');content['navigation']=prop('StatsigHomepageHeaderIsland')['menuLinks']
footer=BeautifulSoup(dom['footer'],'html.parser')
content['downloads']=[{'label':a.get('aria-label') or a.get_text(), 'href':a.get('href')} for a in footer.select('a') if a.find_parent('ul') and a.get('href','').startswith(('https://apps','https://play.google','https://microsoftedge','https://chromewebstore','https://addons.mozilla'))]
# Preserve the inspected, original vector artwork as standalone visual assets.
icons={}
for x in dom['icons']:
 label=x['label'];el=BeautifulSoup(x['html'],'html.parser')
 if label=='Calendly' and 'logo' not in icons:
  svgs=el.select('svg');mark=str(svgs[0]);word=str(svgs[1]);
  mark=re.sub(r'<svg[^>]*>', '<svg x="0" y="0" width="32" height="32" viewBox="0 0 32 32">',mark,count=1)
  word=re.sub(r'<svg[^>]*>', '<svg x="40" y="4" width="116.337" height="27.6973" viewBox="0 0 116.337 27.6973">',word,count=1)
  logo='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.337 32">'+mark+word+'</svg>'
  (root/'public/media/calendly-logo.svg').write_text(logo);(root/'public/media/calendly-logo-white.svg').write_text(logo.replace('#0b0d0f','#ffffff'));icons['logo']=True
 elif label.startswith('Calendly ') and label not in icons:
  svgs=el.select('svg');s=str(svgs[-1]);s=re.sub(r'<svg[^>]*>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+svgs[-1].get('viewbox','0 0 40 40')+'">',s,count=1)
  (root/('public/media/product-'+label.split()[-1].lower()+'.svg')).write_text(s);icons[label]=True
all_dom=BeautifulSoup(dom['html']+dom['footer'],'html.parser')
extra=set(e.get('src') for e in all_dom.select('[src]') if e.get('src','').startswith('/_astro/'))
(root/'data/extra-assets.json').write_text(json.dumps(list(extra)))
(root/'data/content.json').write_text(json.dumps(content,ensure_ascii=False,indent=2))
print('Prepared content and original vector marks; additional assets:',list(extra))
