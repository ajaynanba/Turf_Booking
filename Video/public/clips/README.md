# Montage clips

Drop your Tenkasi trip video files in this folder (e.g. `courtallam-falls.mp4`),
then reference them from `src/Montage/clips.ts`:

```ts
export const clips: MontageClip[] = [
  { src: "clips/courtallam-falls.mp4", durationInSeconds: 3.5, startFromSeconds: 2, caption: "Courtallam Falls" },
  { src: "clips/temple.mp4",           durationInSeconds: 3 },
  { src: "clips/hills-drive.mp4",      durationInSeconds: 4, playbackRate: 1.5 },
];
```

`src` is the path relative to `public/`. Supported by Remotion's `OffthreadVideo`:
MP4/MOV/WebM. Add music by putting a file in `public/` and setting `MUSIC` in
`clips.ts`.
