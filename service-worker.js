const CACHE_NAME = "tree-census-cache";
const urlsToCache = [
    "/",
    "/index.html",
    "/main.js",
    "/manifest.json",
    "/styles.css",
    "/script.js",
    "/icon-192x192.png",
    "/icon-512x512.png"
];

// Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache:', CACHE_NAME);
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cache response if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});
