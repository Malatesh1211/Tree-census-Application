const CACHE_NAME = "tree-census-cache";
const urlsToCache = [
    "index.html",
    "main.js",
    "manifest.json",
    "style.css",
    "app.js",
    "icon-192x192.png",
    "icon-512x512.png"
];

// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open('tree-census-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.js',
                '/styles.css',
                '/script.js',
                '/icon-192x192.png',
                '/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

