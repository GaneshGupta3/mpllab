const CACHE_NAME = 'shopease-cache-v1';
const urlsToCache = [
  'index.html',
  'shop.html',
  'deals.html',
  'contact.html',
  'style.css',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(name => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
      }))
    )
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
