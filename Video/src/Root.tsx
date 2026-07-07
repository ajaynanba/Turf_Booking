import React from "react";
import { Composition } from "remotion";
import { TurfPromo, TURF_PROMO_DURATION } from "./TurfPromo";

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
    </>
  );
};
