# Saddle Up Drinks — saddleupdrinks.com

Upload every file in this folder to the root of the GitHub repository (no folders).

- `index.html` — the whole site: spinning logo, scroll effects, offerings and booking funnel
- `*.webp` — the logo and photos used on the page
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` — tab and home-screen icons
- `og-image.jpg` — preview image shown when the link is shared
- `CNAME` — points GitHub Pages at saddleupdrinks.com
- `robots.txt`, `sitemap.xml` — help Google index the site
- `404.html` — "page not found" screen
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Settings to finish in index.html
- Quote form: find `formEndpoint: ''` and paste the Formspree link between the quotes.
- Social links: find `var SOCIAL=` and paste the Instagram, Facebook and TikTok profile links between the quotes.

## DNS (Wix: Domains → saddleupdrinks.com → Manage DNS Records)
- A records for @: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- CNAME for www: jamesonflex.github.io

## Installable app
- `site.webmanifest`, `sw.js` and the `icon-maskable-*` files make the site installable as a phone app.
- Android/Chrome shows an "Install on this phone" button in the footer; iPhone shows a tip to use Share → Add to Home Screen.
- After uploading changed files, open `sw.js` and bump `VERSION` (e.g. `saddleup-v2`) so installed phones pick up the update.
