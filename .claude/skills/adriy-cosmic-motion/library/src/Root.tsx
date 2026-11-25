import { CosmicFinalProjectShowcase } from "./compositions/CosmicFinalProjectShowcase";
import React from "react";
import {Composition} from "remotion";
import {CosmicCoreShowcase} from "./showcase/CosmicCoreShowcase";
import {PlanetarySystemsShowcase} from "./showcase/PlanetarySystemsShowcase";
import {DeepSpaceGalaxyShowcase} from "./showcase/DeepSpaceGalaxyShowcase";
import {CosmicPhysicsShowcase} from "./showcase/CosmicPhysicsShowcase";
import {SpaceCameraLightingShowcase} from "./compositions/SpaceCameraLightingShowcase";
import {CosmicEffectsLabelsShowcase} from "./compositions/CosmicEffectsLabelsShowcase";
import {CosmicAnimationShowcase} from "./compositions/CosmicAnimationShowcase";
export const RemotionRoot:React.FC=()=> <>
  <Composition id="CosmicCoreShowcase" component={CosmicCoreShowcase} durationInFrames={210} fps={30} width={1920} height={1080}/>
  <Composition id="PlanetarySystemsShowcase" component={PlanetarySystemsShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="DeepSpaceGalaxyShowcase" component={DeepSpaceGalaxyShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="CosmicPhysicsShowcase" component={CosmicPhysicsShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="SpaceCameraLightingShowcase" component={SpaceCameraLightingShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="CosmicEffectsLabelsShowcase" component={CosmicEffectsLabelsShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="CosmicAnimationShowcase" component={CosmicAnimationShowcase} durationInFrames={240} fps={30} width={1920} height={1080}/>

      <Composition id="CosmicFinalProjectShowcase" component={CosmicFinalProjectShowcase} durationInFrames={240} fps={30} width={1920} height={1080} />
</>;
