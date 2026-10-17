# poglesbyg.github.io

Source for [poglesbyg.github.io](https://poglesbyg.github.io), Paul Greenwood's site: [writing](https://poglesbyg.github.io/blog) about results that did or didn't survive a second check, and [projects](https://poglesbyg.github.io/projects).

A small Jekyll site with one stylesheet and one short script. No build step beyond Jekyll, no frameworks, no icon fonts.

## Run it locally

The Pages workflow builds with `actions/jekyll-build-pages`, so the most faithful preview runs that same container:

```bash
docker run --rm -v "$PWD":/github/workspace \
  -e INPUT_SOURCE=. -e INPUT_DESTINATION=./_site -e GITHUB_WORKSPACE=/github/workspace \
  ghcr.io/actions/jekyll-build-pages:v1.0.13
python3 -m http.server -d _site 4000
```

The Gemfile pins Jekyll 4, but the workflow builds with Jekyll 3.10 through the `github-pages` gem, so `bundle exec jekyll serve` isn't an exact preview.

Pushing to `main` deploys.

## Writing a post

Add `_posts/YYYY-MM-DD-slug.md` with `title`, `date`, and a one-paragraph `description`. The description is what shows on the Writing page, in the RSS feed, and in link previews. The homepage, feed, and sitemap pick the post up automatically.

## Layout

| Path | What it is |
|---|---|
| `index.md`, `projects.md`, `blog.md`, `contact.md` | The four pages |
| `_posts/` | Posts, published at `/blog/YYYY/MM/DD/slug/` |
| `_layouts/default.html` | Header, footer, and `<head>` (via `jekyll-seo-tag`) |
| `_layouts/post.html` | Post title, date, and body |
| `assets/css/main.css` | All styles |
| `assets/js/main.js` | The theme toggle |
| `stillpoint/` | Support and privacy pages for the Stillpoint Mac app, styled separately |
