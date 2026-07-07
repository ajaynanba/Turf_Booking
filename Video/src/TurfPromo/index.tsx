import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { TitleScene } from "./TitleScene";
import { FeaturesScene } from "./FeaturesScene";
import { ScreenshotsScene } from "./ScreenshotsScene";
import { CTAScene } from "./CTAScene";

// Scene lengths in frames (30fps) -> ~15s total.
export const TITLE_DURATION = 90;
export const FEATURES_DURATION = 120;
export const SCREENSHOTS_DURATION = 150;
export const CTA_DURATION = 90;
export const TURF_PROMO_DURATION =
  TITLE_DURATION + FEATURES_DURATION + SCREENSHOTS_DURATION + CTA_DURATION;

export const TurfPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#04120a" }}>
      <Series>
        <Series.Sequence durationInFrames={TITLE_DURATION}>
          <TitleScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FEATURES_DURATION}>
          <FeaturesScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCREENSHOTS_DURATION}>
          <ScreenshotsScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CTA_DURATION}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
