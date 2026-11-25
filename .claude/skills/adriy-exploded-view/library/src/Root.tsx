import React from "react";
import { Composition } from "remotion";
import { ExplodedViewFinalShowcase } from "./ExplodedViewFinalShowcase";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ExplodedViewFinalShowcase"
      component={ExplodedViewFinalShowcase}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
