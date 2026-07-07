import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

const features = [
  { icon: "⚽", title: "Browse Turfs", text: "Explore venues, photos & pricing" },
  { icon: "📅", title: "Pick a Slot", text: "Real-time availability by date & time" },
  { icon: "💳", title: "Pay Online", text: "Secure checkout with Razorpay & Stripe" },
  { icon: "✅", title: "Instant Booking", text: "Confirmation the moment you pay" },
];

const FeatureCard: React.FC<{ index: number; icon: string; title: string; text: string }> = ({
  index,
  icon,
  title,
  text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - index * 8,
    fps,
    config: { damping: 200 },
  });
  const y = interpolate(enter, [0, 1], [60, 0]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity: enter,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid rgba(74,222,128,0.25)`,
        borderRadius: 24,
        padding: "34px 30px",
        width: 360,
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 34, fontWeight: 700, color: theme.text }}>{title}</div>
      <div style={{ fontSize: 22, color: theme.textMuted, marginTop: 8, lineHeight: 1.4 }}>
        {text}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headingIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bg}, ${theme.bgDeep})`,
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
          marginBottom: 50,
        }}
      >
        How it <span style={{ color: theme.green }}>works</span>
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {features.map((f, i) => (
          <FeatureCard key={f.title} index={i} {...f} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
