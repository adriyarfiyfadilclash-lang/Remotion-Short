import React from "react";
import { Composition } from "remotion";
import { WayangFinalShowcase } from "./WayangFinalShowcase";
import { WayangAnimationShowcase } from "../showcases/WayangAnimationShowcase";
import { WayangTransitionShowcase } from "../showcases/WayangTransitionShowcase";
import { HistoricalCalligraphyShowcase } from "../showcases/HistoricalCalligraphyShowcase";
import { NusantaraAssetsShowcase } from "../showcases/NusantaraAssetsShowcase";
import { WayangCameraLightingShowcase } from "../showcases/WayangCameraLightingShowcase";
import { WayangEffectsShowcase } from "../showcases/WayangEffectsShowcase";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="WayangFinalShowcase" component={WayangFinalShowcase} durationInFrames={930} fps={30} width={1920} height={1080}/>
    <Composition id="WayangAnimationLibrary" component={WayangAnimationShowcase} durationInFrames={390} fps={30} width={1920} height={1080}/>
    <Composition id="WayangTransitionLibrary" component={WayangTransitionShowcase} durationInFrames={630} fps={30} width={1920} height={1080}/>
    <Composition id="HistoricalCalligraphyLibrary" component={HistoricalCalligraphyShowcase} durationInFrames={525} fps={30} width={1920} height={1080}/>
    <Composition id="NusantaraAssetsLibrary" component={NusantaraAssetsShowcase} durationInFrames={150} fps={30} width={1920} height={1080}/>
    <Composition id="WayangCameraLightingLibrary" component={WayangCameraLightingShowcase} durationInFrames={150} fps={30} width={1920} height={1080}/>
    <Composition id="WayangEffectsLibrary" component={WayangEffectsShowcase} durationInFrames={525} fps={30} width={1920} height={1080}/>
  </>
);
