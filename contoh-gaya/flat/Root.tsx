import React from "react";
import { Composition } from "remotion";
import { ContohFlat } from "./Komposisi";

export const RootFlat: React.FC = () => (
  <Composition id="ContohFlat" component={ContohFlat} width={1080} height={1920} fps={30} durationInFrames={330} />
);
