import React from "react";
import { Composition } from "remotion";
import { NusantaraAssetsShowcase } from "../compositions/NusantaraAssetsShowcase";

export const RemotionRoot: React.FC = () => (
  <Composition id="NusantaraAssetsShowcase" component={NusantaraAssetsShowcase}
    durationInFrames={150} fps={30} width={1920} height={1080} />
);
