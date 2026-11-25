import React from "react";
import { Composition } from "remotion";
import { MixedMediaFinalShowcase } from "../compositions/MixedMediaFinalShowcase";
import { MixedMediaTransitionShowcase, MixedMediaTransitionVariants } from "../compositions/TransitionShowcase";
import { MixedMediaTypographyShowcase } from "../compositions/TypographyShowcase";

export const RemotionRoot:React.FC=()=>(
 <>
  <Composition id="MixedMediaFinalShowcase" component={MixedMediaFinalShowcase} durationInFrames={450} fps={30} width={1920} height={1080}/>
  <Composition id="MixedMediaTransitionShowcase" component={MixedMediaTransitionShowcase} durationInFrames={90} fps={30} width={1920} height={1080}/>
  <Composition id="MixedMediaTransitionVariants" component={MixedMediaTransitionVariants} durationInFrames={90} fps={30} width={1920} height={1080}/>
  <Composition id="MixedMediaTypographyShowcase" component={MixedMediaTypographyShowcase} durationInFrames={180} fps={30} width={1920} height={1080}/>
 </>
);
