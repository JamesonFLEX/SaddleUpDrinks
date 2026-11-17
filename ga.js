/* Google Analytics 4 for saddleupdrinks.com
   Lead events: generate_lead (quote form sent), call_click, email_click,
   social_click, review_click, form_start. Ad features are off. */
(function () {
  var ID = "G-XXXXXXXXXX";
  if (!/^G-[A-Z0-9]{6,}$/.test(ID) || ID === "G-XXXXXXXXXX") return;
  if (!/(^|\.)saddleupdrinks\.com$/.test(location.hostname)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  function ev(name, params) { try { gtag("event", name, params || {}); } catch (e) {} }

  if (/\/thank-you(\.html)?$/.test(location.pathname)) ev("generate_lead", { form_name: "quote_request" });

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    var where = { link_location: (a.closest("header,footer,section,nav,.mcta,.sticky") || {}).className || "page", page_path: location.pathname };
    if (h.indexOf("tel:") === 0) ev("call_click", where);
    else if (h.indexOf("mailto:") === 0) ev("email_click", where);
    else if (/instagram\.com|facebook\.com|yelp\./.test(h)) { where.network = (h.match(/instagram|facebook|yelp/) || [""])[0]; ev("social_click", where); }
    else if (/g\.page|google\.com\/maps|maps\.app\.goo\.gl/.test(h)) ev("review_click", where);
  }, true);

  var started = false;
  document.addEventListener("click", function (e) {
    if (started || !e.target.closest || !e.target.closest(".book .fun")) return;
    started = true; ev("form_start", { form_name: "quote_request" });
  }, true);
})();
