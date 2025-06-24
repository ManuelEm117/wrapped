self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('wrapped-cache').then((cache) => {
      return cache.addAll([
        '/wrapped/',
        '/wrapped/index.html',
        '/wrapped/style.css',
        '/wrapped/scripts.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
