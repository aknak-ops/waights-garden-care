const CACHE_NAME = 'wgc-cache-v2';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/main.js',
  './manifest.json',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(URLS_TO_CACHE)));
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(resp=>{
      return resp || fetch(e.request);
    })
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    ))
  );
});

