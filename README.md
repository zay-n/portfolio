# Muhammed Zayan Sameer — Portfolio

Personal portfolio built with React, TypeScript and Vite. No UI framework; styles are plain CSS with design tokens.

## Run

```bash
npm install
npm run dev      # local development
npm run build    # type-check and build to dist/
npm run preview  # serve the production build
```

## Edit content

All text, projects, skills, awards and links live in `src/data/profile.ts`.
Add `repo` or `live` to any project there and the links appear automatically.

To replace the resume, overwrite `public/Muhammed-Zayan-Sameer-Resume.pdf`.

## Deploy

`dist/` is a static site with relative asset paths, so it works at a domain root or a sub-path
(GitHub Pages, Netlify, Vercel, Cloudflare Pages). If the final URL is not
`https://zay-n.github.io/portfolio/`, update the canonical and Open Graph URLs in `index.html`.

## Structure

- `src/components/` — one component per section, plus `NetworkCanvas` (hero visual) and `ProjectVisuals`
- `src/styles/` — `tokens.css` (colours, type, spacing), `base.css`, and one stylesheet per section
- `src/hooks/` — smooth scrolling, scroll progress and motion preferences
