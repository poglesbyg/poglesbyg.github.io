// This site no longer uses a service worker. The previous one cached main.css
// and main.js cache-first, which served stale assets to returning visitors.
//
// Deleting this file wouldn't remove it: browsers that registered the old
// worker keep running it from their own copy. Instead, browsers re-fetch this
// URL to check for updates, find this version, install it, and it clears every
// cache and unregisters itself. It has no fetch handler, so from the moment it
// activates every request goes to the network.
//
// Safe to delete once old registrations have had time to cycle out (2027).
self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
            .then(function () { return self.registration.unregister(); })
    );
});
