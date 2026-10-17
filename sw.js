/* Saddle Up Drinks — app/offline support.
   Network first for everything, so visitors always get the live files.
   The saved copy is only used when there's no internet. Bump VERSION when you upload changes. */
var VERSION = "saddleup-v13";

self.addEventListener("install", function (e) {
  // Save the page for offline use, but never let a failed download block the update.
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.add("index.html").catch(function () {}); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  // Throw away every older saved copy (this clears any bad photos saved before).
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function good(res, wantImage) {
  if (!res || !res.ok || res.type === "opaque") return false;
  if (!wantImage) return true;
  var ct = res.headers.get("content-type") || "";
  return ct.indexOf("image/") === 0;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;                 // quote submissions go straight out
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;  // fonts, Formspree, etc. untouched
  var isPage = req.mode === "navigate";
  var isImage = req.destination === "image";

  e.respondWith(fetch(req).then(function (res) {
    if (good(res, isImage)) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put(isPage ? "index.html" : req, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(isPage ? "index.html" : req).then(function (hit) {
      return hit || Response.error();
    });
  }));
});
