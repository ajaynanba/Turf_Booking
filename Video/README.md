# Turf Booking — Promo Video (Remotion)

A [Remotion](https://www.remotion.dev/) project that renders a short promotional
video for the Online Turf Booking App. Built as an alternative to the interactive
`npx create-video@latest` scaffold, pre-wired with a composition tailored to this
app.

## Composition

`TurfPromo` — 1920×1080, 30fps, ~15s. Four scenes:

1. **Title** – logo + tagline reveal
2. **How it works** – the booking flow in four steps
3. **Screenshots** – app screens pulled from the frontend
4. **Call to action** – "Book Now"

Scene durations live in `src/TurfPromo/index.tsx`; shared colors/fonts in
`src/TurfPromo/theme.ts`. Screenshots used by the video are in `public/`
(copied from `Frontend/public` and `Frontend/src/images`).

## Getting started

```bash
cd Video
npm install
npm run dev      # opens Remotion Studio to preview & edit live
```

## Render to MP4

```bash
npm run build    # -> out/turf-promo.mp4
# or directly:
npx remotion render TurfPromo out/turf-promo.mp4
```

On the first render Remotion downloads a headless Chromium. In a sandbox where
that download is blocked, point it at an existing Chromium headless-shell:

```bash
npx remotion render TurfPromo out/turf-promo.mp4 \
  --browser-executable=/path/to/chrome-headless-shell
```

## Structure

```
Video/
├── remotion.config.ts        # render config
├── src/
│   ├── index.ts              # registerRoot
│   ├── Root.tsx              # <Composition> registry
│   └── TurfPromo/
│       ├── index.tsx         # scene sequencing (Series)
│       ├── theme.ts          # colors & fonts
│       ├── TitleScene.tsx
│       ├── FeaturesScene.tsx
│       ├── ScreenshotsScene.tsx
│       └── CTAScene.tsx
└── public/                   # static images used in the video
```
