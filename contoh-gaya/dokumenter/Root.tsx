import React from "react";
import { Composition } from "remotion";
import { ContohDokumenter } from "./Episode";

export const RootDokumenter: React.FC = () => (
  <Composition id="ContohDokumenter" component={ContohDokumenter} width={1080} height={1920} fps={30} durationInFrames={330} />
);
