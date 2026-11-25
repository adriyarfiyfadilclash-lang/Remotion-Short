import React from "react";
import { Composition } from "remotion";
import { ContohScientific } from "./Komposisi";

export const RootScientific: React.FC = () => (
  <Composition id="ContohScientific" component={ContohScientific} width={1080} height={1920} fps={30} durationInFrames={330} />
);
