import React from "react";
import { Composition } from "remotion";
import { ContohPaper } from "./Komposisi";

export const RootPaper: React.FC = () => (
  <Composition id="ContohPaper" component={ContohPaper} width={1080} height={1920} fps={30} durationInFrames={330} />
);
