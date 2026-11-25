import React from "react";
import { Composition } from "remotion";
import { Realistic3DAnimationShowcase } from "./showcases/Realistic3DAnimationShowcase";
import { Realistic3DTransitionShowcase } from "./showcases/Realistic3DTransitionShowcase";
import { Realistic3DTypographyShowcase } from "./showcases/Realistic3DTypographyShowcase";
import { Realistic3DObjectsMaterialsShowcase } from "./showcases/Realistic3DObjectsMaterialsShowcase";
import { CameraLightingShowcase } from "./showcases/CameraLightingShowcase";
import { EnvironmentFXShowcase } from "./showcases/EnvironmentFXShowcase";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Realistic3D-Animation" component={Realistic3DAnimationShowcase} durationInFrames={180} fps={30} width={1920} height={1080} />
    <Composition id="Realistic3D-Transitions" component={Realistic3DTransitionShowcase} durationInFrames={360} fps={30} width={1920} height={1080} />
    <Composition id="Realistic3D-Typography" component={Realistic3DTypographyShowcase} durationInFrames={180} fps={30} width={1920} height={1080} />
    <Composition id="Realistic3D-Objects-Materials" component={Realistic3DObjectsMaterialsShowcase} durationInFrames={180} fps={30} width={1920} height={1080} />
    <Composition id="Realistic3D-Camera-Lighting" component={CameraLightingShowcase} durationInFrames={180} fps={30} width={1920} height={1080} />
    <Composition id="Realistic3D-Environment-FX" component={EnvironmentFXShowcase} durationInFrames={180} fps={30} width={1920} height={1080} />
  </>
);
