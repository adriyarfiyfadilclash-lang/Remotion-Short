import React from "react";
import {Composition} from "remotion";
import {PaperCutoutShowreel} from "./PaperCutoutShowreel";
import {PaperAnimationShowcase} from "./showcases/PaperAnimationShowcase";
import {PaperTransitionShowcase} from "./showcases/PaperTransitionShowcase";
import {PaperTypographyShowcase} from "./showcases/PaperTypographyShowcase";
import {PaperShapesShowcase} from "./showcases/PaperShapesShowcase";
import {PaperInfographicsShowcase} from "./showcases/PaperInfographicsShowcase";
import {PaperTextureEffectsShowcase} from "./showcases/PaperTextureEffectsShowcase";

export const RemotionRoot:React.FC=()=>(
 <>
  <Composition id="PaperCutoutShowreel" component={PaperCutoutShowreel} durationInFrames={1080} fps={30} width={1920} height={1080}/>
  <Composition id="PaperAnimationShowcase" component={PaperAnimationShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
  <Composition id="PaperTransitionShowcase" component={PaperTransitionShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
  <Composition id="PaperTypographyShowcase" component={PaperTypographyShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
  <Composition id="PaperShapesShowcase" component={PaperShapesShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
  <Composition id="PaperInfographicsShowcase" component={PaperInfographicsShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
  <Composition id="PaperTextureEffectsShowcase" component={PaperTextureEffectsShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
 </>
);
