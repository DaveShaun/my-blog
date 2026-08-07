# Northernhiwisen's Blog

Personal blog and portfolio built with Astro, featuring a Matrix terminal-inspired aesthetic.

## Features

- **Matrix terminal theme** — Green-on-black monospace with glow effects, scanline overlay, and digital rain animation
- **Portfolio layout** — Homepage showcases expertise, exploration areas, and recent outputs
- **Blog** — Technical articles and notes with Markdown/MDX support
- **Novel** — Creative writing section with password protection
- **RSS Feed** — `/rss.xml`
- **Sitemap** — Auto-generated
- **SEO** — Open Graph meta tags, canonical URLs

## Tech Stack

- **Astro 7.x** with MDX + Sitemap integrations
- **TypeScript** (strict mode)
- **GitHub Actions** for CI/CD

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview built site locally |

## Project Structure

```
├── .github/workflows/    # GitHub Actions deploy config
├── public/               # Static assets (CNAME, favicon, verification files)
├── src/
│   ├── assets/           # Images and fonts
│   ├── components/       # Reusable components
│   ├── content/
│   │   ├── blog/         # Blog posts
│   │   └── novel/        # Novel posts (encrypted)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   └── styles/           # Global CSS
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Deployment

Push to `main` branch triggers GitHub Actions workflow for automatic build and deploy to GitHub Pages.
