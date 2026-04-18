const CACHE_NAME = "index-cache-v1";
const INDEX_URL = "/";

self.addEventListener("install", (event) => {
  console.log("[SW] Installing new service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(INDEX_URL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Service worker activated");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const isIndexRequest =
    event.request.url === self.location.origin + "/" ||
    event.request.url === self.location.origin + "/index.html";

  if (isIndexRequest) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            console.log("[SW] Fetched index.html from network, updating cache");
            const responseClone = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(INDEX_URL, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          console.log("[SW] Offline, serving index.html from cache");
          return caches.match(INDEX_URL);
        }),
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[SW] Skipping waiting, activating now");
    self.skipWaiting();
  }
});
