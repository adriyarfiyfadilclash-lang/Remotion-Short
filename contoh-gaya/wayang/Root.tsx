import React from "react";
import { Composition } from "remotion";
import { ContohWayang } from "./Episode";

export const RootWayang: React.FC = () => (
  <Composition id="ContohWayang" component={ContohWayang} width={1080} height={1920} fps={30} durationInFrames={330} />
);
