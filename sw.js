/* Cache everything on install, then serve from cache. The app never needs the
   network again, so a cache hit is always correct.
   AFTER EDITING index.html: bump CACHE below, or the phone keeps the old copy. */
const CACHE = "tenbeforework-v1";
const FILES = ["./","./index.html","./manifest.webmanifest",
               "./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
