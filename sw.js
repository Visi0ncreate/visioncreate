/* Cache plików statycznych. Podbij numer wersji przy większych zmianach. */
var V="vc-v2";
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=="GET")return;
 var ok=u.origin===location.origin||u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
 if(!ok)return;
 if(r.mode==="navigate"){ /* HTML: najpierw sieć, w razie braku internetu kopia */
  e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(V).then(function(h){h.put(r,c)});return res}).catch(function(){return caches.match(r)}));
  return}
 /* reszta: z pamięci, odświeżana w tle */
 e.respondWith(caches.open(V).then(function(h){return h.match(r).then(function(hit){
  var net=fetch(r).then(function(res){if(res&&(res.status===200||res.type==="opaque"))h.put(r,res.clone());return res}).catch(function(){return hit});
  return hit||net})}))});
