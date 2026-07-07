const CACHE_NAME = 'ghotet-cache-v1';
const urlsToCache = [
  '/',                        // main page
  '/index.html',              // terminal page
  '/sys_check.html',          // system check
  '/main.js',
  '/sys_check.js',
  '/utils.js',
  '/menuUtils.js',
  '/styles.css',
  '/sys_manifest.json',
  //'/icons/icon-192.png'
  //'/icons/icon-512.png'
];

// Install event - cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
