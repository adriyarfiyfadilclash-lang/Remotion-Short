import React from "react";
import { Composition } from "remotion";
import { ContohMixed } from "./Komposisi";

export const RootMixed: React.FC = () => (
  <Composition id="ContohMixed" component={ContohMixed} width={1080} height={1920} fps={30} durationInFrames={330} />
);
