import React from "react";
import { Composition } from "remotion";
import { Scientific3DFinalShowcase } from "./Scientific3DFinalShowcase";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Scientific3DFinalProject"
    component={Scientific3DFinalShowcase}
    durationInFrames={450}
    fps={30}
    width={1920}
    height={1080}
  />
);
