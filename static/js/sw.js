const CACHE_NAME = 'periodipal-v2';
const urlsToCache = [
  '/',
  '/static/css/style.css',
  '/static/js/app.js',
  '/static/js/spinwheel.js',
  '/static/js/sw.js',
  '/minigame',
  '/minigame-matching',
  '/minigame-quiz',
  '/minigame-sorting',
  '/static/img/icon-192.png',
  '/static/img/icon-512.png',
  // Add all images used in lessons and games:
  '/static/img/puberty.jpg',
  '/static/img/reproductive_system.jpg',
  '/static/img/menstrual_cycle.jpg',
  '/static/img/pms.jpg',
  '/static/img/tracking.jpg',
  '/static/img/hygiene.jpg',
  // Add both .jpg and .png for these images to avoid 404 errors
  '/static/img/disposal.jpg',
  '/static/img/disposal.png',
  '/static/img/myths.png',
  '/static/img/support.jpg',
  '/static/img/support.png',
  '/static/img/nutrition.jpg',
  '/static/img/nutrition.png'
  // Add more as needed
];

console.log('Attempting to cache the following files:');
urlsToCache.forEach(url => console.log(url));
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache).catch(err => {
        console.error('Cache addAll failed:', err);
      }))
  );
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});