import React from "react";
import { Composition } from "remotion";
import { ContohExploded } from "./Komposisi";

export const RootExploded: React.FC = () => (
  <Composition id="ContohExploded" component={ContohExploded} width={1080} height={1920} fps={30} durationInFrames={330} />
);
