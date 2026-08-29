# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --watch --incremental

# Production build
bundle exec jekyll build
```

The site is hosted on GitHub Pages — pushing to `main` deploys automatically. No CI pipeline required.

## Architecture

**Jekyll 4.3.2 static site** — no Node.js build step, no CSS preprocessor framework. Everything is hand-coded vanilla JS and plain CSS.

### Key files

| File | Purpose |
|------|---------|
| `_config.yml` | Jekyll config — plugins, permalink structure, kramdown/MathJax settings |
| `assets/css/main.css` | Single stylesheet (~2085 lines). CSS custom properties at the top define the entire design system. |
| `assets/js/main.js` | Single JS file. All features are modular functions called on `DOMContentLoaded`. |
| `_layouts/default.html` | Wraps all pages — nav, footer, theme toggle, service worker registration |
| `index.md` | Homepage — uses raw HTML within Jekyll's Markdown processing |

### Content model

- **Pages**: Markdown files at root (`blog.md`, `projects.md`, `competencies.md`, etc.) with YAML front matter
- **Blog posts**: `_posts/YYYY-MM-DD-title.md` — auto-permalinked to `/blog/:year/:month/:day/:title/`
- **Layouts**: `_layouts/` — `default.html` (all pages), `post.html` (blog), `home.html` (index)

### Design system

CSS variables are defined in `:root` at the top of `main.css`:
- Primary accent: `--primary-color: #a89968` (muted taupe)
- Background: `--bg-color: #09090b` (near-black)
- Typography: `--font-heading` and `--font-mono` are both a system monospace stack
  (ui-monospace / Cascadia Code / Menlo …); only DM Sans is fetched from Google
  Fonts, for body text. Headings are deliberately mono — don't "fix" them.
- Spacing scale: `--spacing-{xs|sm|md|lg|xl|2xl|3xl}`

Dark/light theme is toggled via a `dark-theme` class on `<body>`, persisted in `localStorage`.

### JavaScript modules (in `assets/js/main.js`)

All are initialized at bottom of `DOMContentLoaded`:
- `Navigation` — mobile menu, keyboard-accessible dropdowns (Arrow keys, Escape)
- `Theme` — dark/light toggle with `prefers-color-scheme` fallback
- `initScrollReveal()` — Intersection Observer fade-in animations
- `initProjectFiltering()` — client-side category filter with fade transitions
- `initLazyLoading()` — images with `data-src` attribute

### Standalone apps

Several self-contained HTML files in root are mini-apps separate from the Jekyll site:
- `epds_app.html` — Edinburgh Postnatal Depression Scale screening tool
- `smartapp.html` / `smartlaunch.html` — SMART on FHIR app
- `app.html`, `chip-490-crud.html`, `crud_pt.html`, etc.

These have their own scripts in `scripts/` and don't share the main CSS/JS.

## Content guidelines

The site is intentionally small. Four pages are live and linked from the nav and
footer: `index.md` (home), `projects.md`, `blog.md` (titled "Writing"), and
`contact.md`. `/solutions` and `/competencies` were removed — don't add references
back to them.

The homepage is hero → Experience → Recent writing, where the last section pulls the
latest two entries from `site.posts`. Adding a post updates the homepage on its own;
nothing needs editing there.

Posts are long-form and numeric: the house style is one specific measured finding,
tables for the numbers, a section on how the numbers were produced, and an explicit
"what this is not". Match the voice of the existing posts rather than a generic blog
tone.

Current positioning: Data Scientist — Environmental & Natural Resource Systems (USDA Forest Service via Leading Solutions, LLC), with prior background in healthcare AI (FHIR, Epic, clinical NLP) at UNC Chapel Hill. Keep hero/experience copy consistent with `_config.yml`'s `description`, `tagline`, and `expertise` fields — update both together.

Key content files: `index.md`, `projects.md`, `blog.md`, `contact.md`, `_config.yml`

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
