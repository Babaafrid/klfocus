# FOCUS (CSE Student Association) — Astro Website

A modern, visually stunning, fully responsive website for the Department of Computer Science Student Body, built with Astro + TailwindCSS + Framer Motion and ready for GitHub Pages.

## ✅ Status
- **Dev Server**: Running at http://localhost:4321/klfocus/
- **Build**: Working
- **TypeScript**: Configured (see TYPESCRIPT_TROUBLESHOOTING.md if editor shows errors)

## Tech stack
- Astro (static generation)
- TailwindCSS (styling)
- React + Framer Motion (animations)

## Local development

```powershell
cd astro
npm install
npm run dev
```

Open http://localhost:4321/klfocus/ (base set for GitHub Pages). During local dev, you can also access at / but asset links use `/klfocus/` for Pages compatibility.

## Build
```powershell
npm run build
```
The static files are emitted to `astro/dist`.

## Deploy to GitHub Pages
The repository includes a GitHub Actions workflow that builds and deploys from `astro/dist` to GitHub Pages on every push to `main`.

Make sure Pages is enabled: Settings → Pages → Source: GitHub Actions.

## Assets
Assets have been copied from the static site. If you need to update them:

```powershell
# From the klfocus root directory (a:\GitHub Repo\klfocus\klfocus)
.\astro\copy-assets.ps1
# OR manually:
Copy-Item -Path "klfocus\assets\*" -Destination "astro\public\assets" -Recurse -Force
```

This preserves all image paths like `/klfocus/assets/img/...`.

## Notes
- The base path is configured as `/klfocus/` in `astro.config.ts` for project Pages.
- The navigation, sections, and links mirror the existing static site structure.
- All sections load with scroll-triggered animations, and the site uses a dark theme with accent gradients.
