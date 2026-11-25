import React from "react";
import { Composition } from "remotion";
import { LuxuryProductFilm } from "./LuxuryProductFilm";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="LuxuryProductFilm"
      component={LuxuryProductFilm}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
