## Stack

- **Astro 7.x** with MDX + Sitemap integrations
- **TypeScript** (strict mode, `strictNullChecks`)
- **Node >= 22.12.0**, npm (lockfile present)
- **Deployment**: `npm run deploy` → builds then publishes `dist/` to GitHub Pages via `gh-pages`

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run deploy` | Build + push `dist/` to GitHub Pages |

Run dev server in background: `astro dev --background` (manage with `astro dev stop/status/logs`).

## Site config

- **URL**: `https://northernhiwisen.dpdns.org`
- **Base path**: `/my-blog` — all routes are prefixed; internal links must account for this
- **CNAME**: `public/CNAME` points to the custom domain
- **Cloudflare adapter** (`@astrojs/cloudflare`) is installed as devDependency — present for potential Cloudflare Pages use, but current deploy goes through `gh-pages`

## Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx`. Frontmatter schema (`src/content.config.ts`):

```yaml
title: string        # required
description: string  # required
pubDate: date        # required — e.g. 'Jul 08 2022'
updatedDate: date    # optional
heroImage: image     # optional — path relative to the post file
```

- **Slug = filename** (no extension). `first-post.md` → `/blog/first-post/`
- Hero images are imported relative to the post: `../../assets/blog-placeholder-3.jpg`
- Posts sorted by `pubDate` descending on the blog index

## Architecture

- `src/pages/` — file-based routing. `index.astro` (home), `about.astro`, `blog/index.astro` (post list), `blog/[...slug].astro` (single post), `rss.xml.js`
- `src/layouts/BlogPost.astro` — wraps every blog post; owns `<html>`, `<head>` via `BaseHead`, and the post chrome
- `src/components/` — `BaseHead` (global metadata, OG/RSS/sitemap links, font preload), `Header`, `Footer`, `FormattedDate` (en-us locale), `HeaderLink` (active-state aware)
- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION` shared across pages and RSS
- `src/styles/global.css` — design tokens (`--accent`, `--gray-*`, etc.) and base styles; body font is Atkinson (self-hosted via `fontProviders.local()`)
- `src/assets/` — placeholder images and Atkinson font files (`.woff`)

## Conventions

- Edit site-wide metadata (title, description) in `src/consts.ts`, not inline
- Date formatting is hardcoded to `en-us` in `FormattedDate.astro` — change there if locale shifts
- `CLAUDE.md` is a symlink to `AGENTS.md` — edit this file only
