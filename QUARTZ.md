# Quartz local build

This repository uses Quartz **4.5.0** to render the existing Obsidian Vault without moving or duplicating its source Markdown. Quartz is pinned to 4.5.0 because it is the newest stable tag compatible with the current Node.js 20 environment; later 4.5.x releases require Node.js 22.

## Requirements

- Node.js 20 or newer (the initial integration was validated with Node.js 20.20.2)
- npm 9.3.1 or newer

## Content mapping

Quartz requires a `content/` directory. The entries in `content/` are symbolic links to the Vault's existing top-level content directories, and `content/index.md` points to `00-Index/Home.md`. The original directories remain the source of truth for Obsidian and Quartz; do not replace the links with copied notes or move the Vault into `content/`.

## Build locally

```sh
npm install
npx quartz build
```

The generated site is written to `public/`, which is intentionally ignored by Git.
