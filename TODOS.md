# TODOS

## P3 — Content Security Policy Header

**What:** Add a CSP header restricting script-src to `goatcounter.com` and self.

**Why:** GoatCounter is loaded from a third-party domain. If that domain were ever compromised, it could inject arbitrary scripts into the site. A CSP header locks this down. Currently blocked because GitHub Pages doesn't support custom HTTP headers.

**How to apply:** Migrate hosting from GitHub Pages to Netlify or Cloudflare Pages (both free tiers, support `_headers` file or `netlify.toml` for header config). The Jekyll build output is the same — only the host changes.

**Effort:** S with CC+gstack (~30 min including DNS cutover)

**Depends on:** GoatCounter must already be in place (the CSP needs to explicitly allow it)

**Added:** 2026-04-06
