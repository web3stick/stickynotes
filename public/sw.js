const CACHE_NAME = "index-cache-v1";
const INDEX_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(INDEX_URL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url === self.location.origin + "/" || event.request.url === self.location.origin + "/index.html") {
    event.respondWith(
      caches.match(INDEX_URL).then((response) => response || fetch(event.request))
    );
  }
});
