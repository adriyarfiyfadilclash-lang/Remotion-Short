import React from "react";
import {AbsoluteFill, Sequence} from "remotion";
import { PaperAnimationShowcase } from "./showcases/PaperAnimationShowcase";
import { PaperTransitionShowcase } from "./showcases/PaperTransitionShowcase";
import { PaperTypographyShowcase } from "./showcases/PaperTypographyShowcase";
import { PaperShapesShowcase } from "./showcases/PaperShapesShowcase";
import { PaperInfographicsShowcase } from "./showcases/PaperInfographicsShowcase";
import { PaperTextureEffectsShowcase } from "./showcases/PaperTextureEffectsShowcase";

export const PaperCutoutShowreel:React.FC=()=>(
 <AbsoluteFill style={{backgroundColor:"#F5EBDD"}}>
      <Sequence from=0 durationInFrames={180} name="PaperAnimation"><PaperAnimationShowcase /></Sequence>
      <Sequence from=180 durationInFrames={180} name="PaperTransition"><PaperTransitionShowcase /></Sequence>
      <Sequence from=360 durationInFrames={180} name="PaperTypography"><PaperTypographyShowcase /></Sequence>
      <Sequence from=540 durationInFrames={180} name="PaperShapes"><PaperShapesShowcase /></Sequence>
      <Sequence from=720 durationInFrames={180} name="PaperInfographics"><PaperInfographicsShowcase /></Sequence>
      <Sequence from=900 durationInFrames={180} name="PaperTextureEffects"><PaperTextureEffectsShowcase /></Sequence>
 </AbsoluteFill>
);
