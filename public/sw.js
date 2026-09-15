const CACHE = 'denzel-v1';
const OFFLINE = '/offline.html';

const PRECACHE = [
  '/',
  '/offline.html',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/manifest.json',
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fall back to cache, fall back to offline page
self.addEventListener('fetch', e => {
  // Only handle GET requests for same-origin navigation + assets
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // For navigation requests (page loads), network-first with offline fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match(OFFLINE))
    );
    return;
  }

  // For same-origin assets: network-first, cache on success
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
