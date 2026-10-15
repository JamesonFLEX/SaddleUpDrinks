# Saddle Up Drinks — saddleupdrinks.com

One-page website and booking funnel for Saddle Up Drinks, a luxury mobile bar serving the greater Sacramento area.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The website: all design, animation and booking funnel in one file |
| `` | Photos, logo, link-preview image and app icons |
| `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` | Browser tab and phone home-screen icons |
| `og-image.jpg` | Preview image shown when the link is shared by text, Facebook, Instagram and similar apps |
| `CNAME` | Points GitHub Pages at saddleupdrinks.com |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |
| `robots.txt`, `sitemap.xml` | Help Google find and index the site |
| `404.html` | Friendly "page not found" screen that sends visitors home |

## Publish on GitHub Pages

1. Create a new repository, for example `saddleupdrinks`.
2. Upload everything in this folder to the repository root, keeping the `images` folder intact.
3. Go to **Settings → Pages**, set the source to the `main` branch and `/ (root)`, and save.
4. The custom domain field should show `saddleupdrinks.com`, read from the `CNAME` file.
5. Once DNS is connected and verified, tick **Enforce HTTPS**.

## Connect the domain (in Wix: Domains → saddleupdrinks.com → DNS records)

- **A records** for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **CNAME** for `www`: `jamesonflex.github.io`

DNS changes usually take minutes to a few hours, and can take up to 48 hours.

## Turn on lead capture

Near the bottom of `index.html`, find `formEndpoint: ''` and paste a Formspree (or similar) endpoint between the quotes. Until then, "Request my quote" opens the visitor's email app with their answers filled in, addressed to Saddleupdrinks@gmail.com.

## Test the link preview

After launch, paste `https://saddleupdrinks.com` into a text message or Facebook post to confirm the preview image shows. The Facebook Sharing Debugger can refresh a cached preview.
