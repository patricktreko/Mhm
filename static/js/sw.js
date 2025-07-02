const CACHE_NAME = 'periodipal-v2';
const urlsToCache = [
  '/',
  '/static/css/style.css',
  '/static/js/app.js',
  '/static/js/spinwheel.js',
  '/static/js/sw.js',
  '/static/img/icon-192.png',
  '/static/img/icon-512.png',
  '/static/img/puberty.jpg',
  '/static/img/reproductive_system.jpg',
  '/static/img/menstrual_cycle.jpg',
  '/static/img/pms.jpg',
  '/static/img/tracking.jpg',
  '/static/img/hygiene.jpg',
  '/static/img/disposal.jpg',
  '/static/img/disposal.png',
  '/static/img/myths.png',
  '/static/img/support.jpg',
  '/static/img/support.png',
  '/static/img/nutrition.jpg',
  '/static/img/nutrition.png',
  '/static/manifest.json',
  // Minigame routes
  '/minigame',
  '/minigame-matching',
  '/minigame-quiz',
  '/minigame-sorting',
  // Lesson routes (1-10)
  '/lesson/1',
  '/lesson/2',
  '/lesson/3',
  '/lesson/4',
  '/lesson/5',
  '/lesson/6',
  '/lesson/7',
  '/lesson/8',
  '/lesson/9',
  '/lesson/10',
  // API routes (optional, for offline API access)
  '/api/lessons',
  '/api/lesson/1',
  '/api/lesson/2',
  '/api/lesson/3',
  '/api/lesson/4',
  '/api/lesson/5',
  '/api/lesson/6',
  '/api/lesson/7',
  '/api/lesson/8',
  '/api/lesson/9',
  '/api/lesson/10'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache).catch(err => {
        console.error('Cache addAll failed:', err);
      }))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // For navigation requests, try cache first, then network
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match('/'))
    );
    return;
  }
  // For static assets, try cache first
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
