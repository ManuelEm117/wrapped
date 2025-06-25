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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => caches.delete(key))
    ))
  );
});
