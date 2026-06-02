const CACHE = 'mapa-podrozy-v1';
const STATIC = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.svg',
    './icon-512.svg',
    'https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/css/jsvectormap.min.css',
    'https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/js/jsvectormap.min.js',
    'https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/maps/world.js'
];

// Instalacja – zakeszuj zasoby statyczne
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE).then(function(cache) {
            return cache.addAll(STATIC);
        })
    );
    self.skipWaiting();
});

// Aktywacja – usuń stare cache
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE; })
                    .map(function(k) { return caches.delete(k); })
            );
        })
    );
    self.clients.claim();
});

// Fetch – strategia:
//   dane.json  → network-first (zawsze świeże dane, fallback z cache)
//   reszta     → cache-first  (szybko, działa offline)
self.addEventListener('fetch', function(e) {
    var url = e.request.url;

    if (url.endsWith('dane.json')) {
        // Network-first dla danych
        e.respondWith(
            fetch(e.request)
                .then(function(resp) {
                    var clone = resp.clone();
                    caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
                    return resp;
                })
                .catch(function() {
                    return caches.match(e.request);
                })
        );
    } else {
        // Cache-first dla wszystkich pozostałych zasobów
        e.respondWith(
            caches.match(e.request).then(function(cached) {
                return cached || fetch(e.request).then(function(resp) {
                    var clone = resp.clone();
                    caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
                    return resp;
                });
            })
        );
    }
});
