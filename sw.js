self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('wrapped-cache').then((cache) => {
      return cache.addAll([
        '/wrapped/',
        '/wrapped/index.html',
        '/wrapped/style.css',
        '/wrapped/scripts.js',
        '/wrapped/icon-192.png',
        '/wrapped/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
