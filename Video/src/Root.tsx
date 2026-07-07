import React from "react";
import { Composition } from "remotion";
import { TurfPromo, TURF_PROMO_DURATION } from "./TurfPromo";
import { Montage } from "./Montage/Montage";
import {
  FPS,
  HEIGHT,
  montageDurationInFrames,
  WIDTH,
} from "./Montage/clips";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TurfPromo"
        component={TurfPromo}
        durationInFrames={TURF_PROMO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Montage"
        component={Montage}
        durationInFrames={montageDurationInFrames()}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
