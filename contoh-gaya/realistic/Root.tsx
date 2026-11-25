import React from "react";
import { Composition } from "remotion";
import { ContohRealistic } from "./Episode";

export const RootRealistic: React.FC = () => (
  <Composition id="ContohRealistic" component={ContohRealistic} width={1080} height={1920} fps={30} durationInFrames={330} />
);
