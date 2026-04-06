# TODOS

## P3 — Content Security Policy Header

**What:** Add a CSP header restricting script-src to `goatcounter.com` and self.

**Why:** GoatCounter is loaded from a third-party domain. If that domain were ever compromised, it could inject arbitrary scripts into the site. A CSP header locks this down. Currently blocked because GitHub Pages doesn't support custom HTTP headers.

**How to apply:** Migrate hosting from GitHub Pages to Netlify or Cloudflare Pages (both free tiers, support `_headers` file or `netlify.toml` for header config). The Jekyll build output is the same — only the host changes.

**Effort:** S with CC+gstack (~30 min including DNS cutover)

**Depends on:** GoatCounter must already be in place (the CSP needs to explicitly allow it)

**Added:** 2026-04-06

---

## ~~P2 — Blog Post Featured Images~~ DONE

**Fixed:** 2026-04-06 — Wrapped the `.blog-image` div in `{% if post.image %}` so cards without images show as clean text cards instead of grey placeholder boxes. When a post has a `image:` frontmatter key, the image renders normally.
