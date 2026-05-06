const CACHE_NAME = 'survival-tool-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 대기하지 않고 즉시 설치
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // 즉시 제어권 획득
});
