// Keeps the page on the phone so the home-screen app opens offline. A new build has a new cache name.
var C = 'iamc273-202611151344-52595c54';
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll([new Request('./', { cache: 'reload' }), new Request('icon-180.png', { cache: 'reload' })]); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) {
    if (r) return r;
    if (e.request.mode !== 'navigate') return fetch(e.request);
    return caches.match('./').then(function (x) { return x || fetch(e.request); });
  }));
});
