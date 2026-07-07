import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  clips,
  FPS,
  MUSIC,
  TITLE,
  TRANSITION_DURATION,
  type MontageClip,
} from "./clips";

const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", padding: "0 0 70px 70px" }}
    >
      <div
        style={{
          opacity,
          alignSelf: "flex-start",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: 44,
          fontWeight: 700,
          color: "white",
          padding: "12px 26px",
          borderRadius: 12,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const Clip: React.FC<{ clip: MontageClip }> = ({ clip }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo
        src={staticFile(clip.src)}
        startFrom={Math.round((clip.startFromSeconds ?? 0) * FPS)}
        playbackRate={clip.playbackRate ?? 1}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {clip.caption ? <Caption text={clip.caption} /> : null}
    </AbsoluteFill>
  );
};

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [30, 0]);
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0f172a, #020617)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity: enter,
          fontSize: 130,
          fontWeight: 800,
          color: "white",
          letterSpacing: -2,
        }}
      >
        {TITLE?.text}
      </div>
      {TITLE?.subtitle ? (
        <div
          style={{
            opacity: enter,
            fontSize: 44,
            color: "#94a3b8",
            marginTop: 10,
            letterSpacing: 6,
          }}
        >
          {TITLE.subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const EmptyState: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#0f172a",
      color: "#e2e8f0",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: 80,
    }}
  >
    <div style={{ fontSize: 52, fontWeight: 700, marginBottom: 20 }}>
      No clips yet
    </div>
    <div style={{ fontSize: 30, color: "#94a3b8", maxWidth: 1100, lineHeight: 1.5 }}>
      Add your Tenkasi videos to <code>Video/public/clips/</code> and list them in{" "}
      <code>src/Montage/clips.ts</code>, then reload.
    </div>
  </AbsoluteFill>
);

export const Montage: React.FC = () => {
  const { fps } = useVideoConfig();

  if (clips.length === 0) {
    return <EmptyState />;
  }

  const transition = () =>
    fade({
      // Use a linear timing tied to the configured transition length.
    });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {MUSIC ? <Audio src={staticFile(MUSIC)} volume={0.8} /> : null}
      <TransitionSeries>
        {TITLE ? (
          <>
            <TransitionSeries.Sequence durationInFrames={Math.round(2.5 * fps)}>
              <TitleCard />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={transition()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />
          </>
        ) : null}
        {clips.map((clip, i) => (
          <React.Fragment key={`${clip.src}-${i}`}>
            <TransitionSeries.Sequence
              durationInFrames={Math.round(clip.durationInSeconds * fps)}
            >
              <Clip clip={clip} />
            </TransitionSeries.Sequence>
            {i < clips.length - 1 ? (
              <TransitionSeries.Transition
                presentation={transition()}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
              />
            ) : null}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
