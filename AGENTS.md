## Stack

- **Astro 7.x** with MDX + Sitemap integrations
- **TypeScript** (strict mode, `strictNullChecks`)
- **Node >= 22.12.0**, npm (lockfile present)
- **Deployment**: GitHub Actions (push to `main` triggers deploy)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview built site locally |

Run dev server in background: `astro dev --background` (manage with `astro dev stop/status/logs`).

## Site config

- **URL**: `https://northernhiwisen.dpdns.org`
- **Base path**: `/` — served from domain root via custom domain; do NOT set to `/my-blog`
- **CNAME**: `public/CNAME` points to the custom domain
- **GitHub Actions**: `.github/workflows/deploy.yml` handles build + deploy

## Content

### Blog
Posts in `src/content/blog/` as `.md` or `.mdx`. Schema: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`.

### Novel
Posts in `src/content/novel/` as `.md` or `.mdx`. Schema: `title`, `description`, `pubDate`, `ciphertext` (encrypted content).

- **Slug = filename** (no extension). `first-post.md` → `/blog/first-post/`
- Posts sorted by `pubDate` descending

## Architecture

- `src/pages/` — file-based routing. `index.astro` (home), `about.astro`, `blog/index.astro` (post list), `blog/[...slug].astro` (single post), `novel/index.astro`, `novel/[...slug].astro`, `rss.xml.js`
- `src/layouts/BlogPost.astro` — wraps every blog post; owns `<html>`, `<head>` via `BaseHead`
- `src/components/` — `BaseHead`, `Header`, `Footer`, `FormattedDate` (en-us locale), `HeaderLink`
- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`
- `src/styles/global.css` — design tokens and base styles

## Conventions

- Edit site-wide metadata (title, description) in `src/consts.ts`, not inline
- Date formatting is hardcoded to `en-us` in `FormattedDate.astro`
- `CLAUDE.md` is a symlink to `AGENTS.md` — edit this file only
- Matrix rain animation only appears on homepage (`src/pages/index.astro`) — not on blog/novel/about pages
- `.nojekyll` file must be in `dist/` root for GitHub Pages (not auto-generated)
- Novel content is encrypted — use `scripts/encrypt-novel.mjs` to generate ciphertext
- WeChat verification file: `public/27e19b3094290387249198d8fada1807.txt`
