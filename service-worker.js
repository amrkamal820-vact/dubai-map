const CACHE_NAME = "dubai-map-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./player.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  // Leaflet assets are from CDN, left out of pre-cache to avoid CORS issues.
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(() => caches.match("./index.html")))
  );
});
