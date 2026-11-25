import React from "react";
import { Composition } from "remotion";
import { FlatAnimationShowcase } from "./libraries/flat-animation/examples/FlatAnimationShowcase";
import { FlatTransitionShowcase } from "./libraries/flat-transition/examples/FlatTransitionShowcase";
import { FlatTypographyShowcase } from "./libraries/flat-typography/examples/FlatTypographyShowcase";
import { FlatShapesIconsShowcase } from "./libraries/flat-shapes-icons/examples/FlatShapesIconsShowcase";
import { FlatInfographicsShowcase } from "./libraries/flat-infographics/examples/FlatInfographicsShowcase";
import { FlatEffectsMotionShowcase } from "./libraries/flat-effects-motion/examples/FlatEffectsMotionShowcase";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="FlatAnimationShowcase"
      component={FlatAnimationShowcase}
      durationInFrames={420}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FlatTransitionShowcase"
      component={FlatTransitionShowcase}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FlatTypographyShowcase"
      component={FlatTypographyShowcase}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FlatShapesIconsShowcase"
      component={FlatShapesIconsShowcase}
      durationInFrames={330}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FlatInfographicsShowcase"
      component={FlatInfographicsShowcase}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="FlatEffectsMotionShowcase"
      component={FlatEffectsMotionShowcase}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
