# Quartz local build

This repository uses Quartz **4.5.0** to render the existing Obsidian Vault without moving or duplicating its source Markdown. Quartz is pinned to 4.5.0 because it is the newest stable tag compatible with the current Node.js 20 environment; later 4.5.x releases require Node.js 22.

## Requirements

- Node.js 20 or newer (the initial integration was validated with Node.js 20.20.2)
- npm 9.3.1 or newer

## Content mapping

Quartz requires a `content/` directory. The entries in `content/` are symbolic links to the Vault's existing top-level content directories, and `content/index.md` points to `00-Index/Home.md`. The original directories remain the source of truth for Obsidian and Quartz; do not replace the links with copied notes or move the Vault into `content/`.

## Build locally

```sh
npm ci
npx quartz build
```

The generated site is written to `public/`, which is intentionally ignored by Git.

## GitHub Pages deployment

Pushes to `main` and manual runs of the **Deploy Quartz to GitHub Pages** workflow build
the site with Node.js 20 and publish only `public/` through GitHub Pages. The configured
`baseUrl` includes the repository name because this is a project site served from
`https://sagivba.github.io/Vienna-2026-tour-guide/` rather than the domain root.

In the GitHub repository, select **Settings → Pages → Build and deployment → Source →
GitHub Actions** before the first deployment. No custom domain or repository secret is
required.
