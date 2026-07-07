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

const shots = [
  { src: "screen-home.png", label: "Home" },
  { src: "screen-turfs.png", label: "Turf Listings" },
  { src: "screen-booking.png", label: "Booking" },
];

const Shot: React.FC<{ index: number; src: string; label: string }> = ({
  index,
  src,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - index * 12,
    fps,
    config: { damping: 200, mass: 0.8 },
  });
  const y = interpolate(enter, [0, 1], [80, 0]);
  const rotate = interpolate(index, [0, 2], [-4, 4]);

  return (
    <div
      style={{
        transform: `translateY(${y}px) rotate(${rotate}deg)`,
        opacity: enter,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(74,222,128,0.3)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
        background: "#000",
        width: 460,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 18px",
          fontSize: 24,
          fontWeight: 600,
          color: theme.text,
          background: "linear-gradient(transparent, rgba(4,18,10,0.9))",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const ScreenshotsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headingIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${theme.bgDeep}, ${theme.bg})`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fontFamily,
      }}
    >
      <div
        style={{
          opacity: headingIn,
          fontSize: 56,
          fontWeight: 800,
          color: theme.text,
          marginBottom: 40,
        }}
      >
        A <span style={{ color: theme.green }}>seamless</span> experience
      </div>
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        {shots.map((s, i) => (
          <Shot key={s.src} index={i} {...s} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
