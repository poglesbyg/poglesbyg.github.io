---
layout: null
---
// CACHE_NAME is stamped with the build time by Jekyll, so every deploy lands a
// new cache and the activate handler below drops the previous one. Without that
// the asset fetch handler is cache-first against a name nobody bumps, and a
// precached main.css or main.js is served to returning visitors forever.
// layout: null above is required — _config.yml defaults every file with front
// matter to the `default` layout, which would wrap this script in HTML.
const CACHE_NAME = 'portfolio-{{ site.time | date: "%Y%m%d%H%M%S" }}';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/images/paul-greenwood-headshot.jpeg',
  '/404.html'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache', CACHE_NAME);
        // addAll goes through the HTTP cache, which would let a just-bumped
        // cache refill with the same stale bytes; force revalidation instead.
        return Promise.all(
          urlsToCache.map(url => cache.add(new Request(url, { cache: 'reload' })))
        );
      })
      .catch(err => {
        console.error('Cache addAll failed:', err);
        // Rethrow to prevent service worker activation with incomplete cache
        throw err;
      })
  );
});

// Fetch resources from cache when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests (HTML pages), use network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/404.html');
        })
    );
    return;
  }

  // For other requests (CSS, JS, images), use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Don't cache non-successful responses or opaque responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Don't cache redirects
          if (response.redirected) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // For failed requests, try to return from cache
        return caches.match(event.request);
      })
  );
});

// Clean up old caches and claim clients
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});
