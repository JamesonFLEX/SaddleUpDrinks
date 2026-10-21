/* Saddle Up Drinks — speed + offline.
   Pages: network first (always fresh), saved copy only when offline.
   Photos, logo, fonts: served instantly from the saved copy (their URLs change with every update),
   fetched once and kept. Only real images/fonts are ever saved. Bump VERSION when you upload changes. */
var VERSION = "saddleup-v28";
var CORE = ["index.html", "logo.webp?v=21"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE).catch(function () {}); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function okFor(res, req) {
  if (!res) return false;
  if (res.type === "opaque") return req.destination === "font" || req.destination === "style";
  if (!res.ok) return false;
  var ct = res.headers.get("content-type") || "";
  if (req.destination === "image") return ct.indexOf("image/") === 0;
  if (req.destination === "font") return /font|octet/.test(ct);
  if (req.destination === "style") return ct.indexOf("text/css") === 0;
  return false;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;                       // quote requests always go straight out
  var url = new URL(req.url);
  var same = url.origin === self.location.origin;
  var gfont = /^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!same && !gfont) return;                            // Formspree, social links: untouched

  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put("index.html", copy); }); }
      return res;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }

  var cacheable = req.destination === "image" || req.destination === "font" || (gfont && req.destination === "style");
  if (!cacheable) return;
  e.respondWith(caches.match(req).then(function (hit) {
    if (hit) return hit;
    return fetch(req).then(function (res) {
      if (okFor(res, req)) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    });
  }));
});
