import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 200 } });
  const logoScale = interpolate(logoIn, [0, 1], [0.6, 1]);

  const titleIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleIn, [0, 1], [40, 0]);

  const subIn = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 35%, ${theme.bg}, ${theme.bgDeep})`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fontFamily,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 200,
          height: 200,
          objectFit: "contain",
          transform: `scale(${logoScale})`,
          opacity: logoIn,
          marginBottom: 30,
          filter: "drop-shadow(0 12px 40px rgba(34,197,94,0.45))",
        }}
      />
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleIn,
          fontSize: 110,
          fontWeight: 800,
          color: theme.text,
          letterSpacing: -2,
        }}
      >
        Turf<span style={{ color: theme.green }}>Booking</span>
      </div>
      <div
        style={{
          opacity: subIn,
          fontSize: 38,
          color: theme.textMuted,
          marginTop: 16,
          fontWeight: 500,
        }}
      >
        Book your game. Anytime. Anywhere.
      </div>
    </AbsoluteFill>
  );
};
