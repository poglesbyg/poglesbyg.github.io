# TODOS

## P3 — Content Security Policy Header

**What:** Add a CSP header restricting script-src to `goatcounter.com` and self.

**Why:** GoatCounter is loaded from a third-party domain. If that domain were ever compromised, it could inject arbitrary scripts into the site. A CSP header locks this down. Currently blocked because GitHub Pages doesn't support custom HTTP headers.

**How to apply:** Migrate hosting from GitHub Pages to Netlify or Cloudflare Pages (both free tiers, support `_headers` file or `netlify.toml` for header config). The Jekyll build output is the same — only the host changes.

**Effort:** S with CC+gstack (~30 min including DNS cutover)

**Depends on:** GoatCounter must already be in place (the CSP needs to explicitly allow it)

**Added:** 2026-04-06

---

## P2 — Blog Post Featured Images

**What:** Blog listing shows grey placeholder squares — `<img>` elements with no `src` because posts don't have `featured_image` frontmatter.

**Why:** The placeholders look like broken images, which undercuts credibility on the blog page. Low effort fix but requires a content decision: either add images to existing posts, or suppress the placeholder element entirely when no image is set.

**How to apply (code fix):** In `blog.md` (or wherever the blog listing loop is), wrap the image element in `{% if post.image %}...{% endif %}`. Without a content decision, suppression is cleaner than a broken placeholder.

**Effort:** XS with CC+gstack (~5 min)

**Depends on:** Nothing. Can ship now.

**Added:** 2026-04-06 (FINDING-007 from /design-review)
