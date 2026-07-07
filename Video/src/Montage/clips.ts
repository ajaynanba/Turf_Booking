// ─────────────────────────────────────────────────────────────
// Tenkasi trip montage — configure your clips here.
//
// 1. Drop your video files into  Video/public/clips/
// 2. List them below in the order you want them to play.
// 3. Preview with `npm run dev`, render with `npm run montage`.
// ─────────────────────────────────────────────────────────────

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// How long the crossfade between two clips lasts, in frames.
export const TRANSITION_DURATION = 18;

// Optional background music placed in Video/public/ (e.g. "music.mp3").
// Set to null for no music.
export const MUSIC: string | null = null;

// Optional title card shown at the very start (set to null to skip).
export const TITLE: { text: string; subtitle?: string } | null = {
  text: "Tenkasi",
  subtitle: "2026",
};

export type MontageClip = {
  /** Path relative to Video/public, e.g. "clips/waterfall.mp4" */
  src: string;
  /** How long this clip stays on screen, in seconds. */
  durationInSeconds: number;
  /** Skip this many seconds into the source clip before showing it. */
  startFromSeconds?: number;
  /** Speed multiplier (1 = normal, 2 = 2x fast, 0.5 = slow-mo). */
  playbackRate?: number;
  /** Optional caption overlaid on the clip. */
  caption?: string;
};

// ⬇️  Replace these with your real Tenkasi clips.
export const clips: MontageClip[] = [
  // { src: "clips/courtallam-falls.mp4", durationInSeconds: 3.5, startFromSeconds: 2, caption: "Courtallam Falls" },
  // { src: "clips/temple.mp4",           durationInSeconds: 3,   caption: "Kutralanathar Temple" },
  // { src: "clips/hills-drive.mp4",      durationInSeconds: 4,   playbackRate: 1.5 },
];

/** Total composition length in frames, accounting for transition overlaps. */
export const montageDurationInFrames = (): number => {
  if (clips.length === 0) return 5 * FPS; // placeholder length
  const clipFrames = clips.reduce(
    (sum, c) => sum + Math.round(c.durationInSeconds * FPS),
    0,
  );
  const titleFrames = TITLE ? Math.round(2.5 * FPS) : 0;
  const overlaps = (clips.length - 1 + (TITLE ? 1 : 0)) * TRANSITION_DURATION;
  return Math.max(FPS, titleFrames + clipFrames - overlaps);
};
