import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(enter, [0, 1], [0.8, 1]);

  const pulse = 1 + 0.03 * Math.sin((frame / fps) * Math.PI * 2);

  const urlIn = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, ${theme.bg}, ${theme.bgDeep})`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fontFamily,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity: enter,
          fontSize: 90,
          fontWeight: 800,
          color: theme.text,
          textAlign: "center",
        }}
      >
        Ready to <span style={{ color: theme.green }}>play</span>?
      </div>
      <div
        style={{
          transform: `scale(${pulse})`,
          opacity: enter,
          marginTop: 40,
          padding: "22px 60px",
          borderRadius: 999,
          background: theme.green,
          color: theme.bgDeep,
          fontSize: 40,
          fontWeight: 800,
          boxShadow: "0 18px 50px rgba(34,197,94,0.5)",
        }}
      >
        Book Now →
      </div>
      <div
        style={{
          opacity: urlIn,
          marginTop: 34,
          fontSize: 28,
          color: theme.textMuted,
        }}
      >
        turf-booking-blond.vercel.app
      </div>
    </AbsoluteFill>
  );
};
