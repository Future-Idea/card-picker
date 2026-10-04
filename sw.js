const CACHE_NAME = 'card-picker-v2';
const FILES_TO_CACHE = ['index.html', 'manifest.json', 'icon-180.png', 'icon-512.png'];
self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (evt) => {
  if(evt.request.method !== 'GET') return;
  evt.respondWith(caches.match(evt.request).then((r) => r || fetch(evt.request)));
});
