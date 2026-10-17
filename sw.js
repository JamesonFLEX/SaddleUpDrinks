/* Saddle Up Drinks — offline support. Bump VERSION whenever you upload changed files. */
var VERSION = "saddleup-v7";
var CORE = ["./", "index.html", "logo.webp", "hero.webp", "fancy-ash.webp", "bartending.webp", "bubbly.webp",
  "saddle-up-bar.webp", "slushy.webp", "coffee.webp", "decor.webp", "why-licensed.webp", "why-alcohol.webp",
  "why-seamless.webp", "why-inclusive.webp", "favicon.ico", "favicon-32.png", "apple-touch-icon.png",
  "icon-192.png", "icon-512.png", "site.webmanifest"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;                       // quote submissions always go straight out
  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;

  // Pages: try the network first so updates show, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put("index.html", copy); }); return res;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }

  // Images, icons, fonts: serve the saved copy instantly, refresh it in the background.
  e.respondWith(caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res && (res.ok || res.type === "opaque")) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  }));
});
