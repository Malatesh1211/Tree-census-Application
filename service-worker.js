const CACHE_NAME = "tree-census-cache";
const urlsToCache = [
    "/tree/Treecensus.html",
    "/tree/manifest.json",
    "/tree/style.css",
    "/tree/app.js",
    "/tree/icons/icon-192x192.png",
    "/tree/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
