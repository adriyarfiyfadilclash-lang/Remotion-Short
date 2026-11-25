import React from "react";
import { Composition } from "remotion";
import { ContohCosmic } from "./Komposisi";

export const RootCosmic: React.FC = () => (
  <Composition id="ContohCosmic" component={ContohCosmic} width={1080} height={1920} fps={30} durationInFrames={330} />
);
