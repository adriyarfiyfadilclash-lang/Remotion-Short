import React from "react";
import { Composition } from "remotion";
import { AnatomicalFinalProjectShowcase } from "./showcase/AnatomicalFinalProjectShowcase";

export const RemotionRoot: React.FC = () => (
  <Composition id="AnatomicalFinalProjectShowcase" component={AnatomicalFinalProjectShowcase}
    durationInFrames={210} fps={30} width={1920} height={1080}/>
);
