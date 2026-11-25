import React from "react";
import { Composition } from "remotion";
import { ContohExploded } from "./Komposisi";
import { DURASI_TUR, TurMotor } from "./Tur";

export const RootExploded: React.FC = () => (
  <>
    <Composition id="ContohExploded" component={ContohExploded} width={1080} height={1920} fps={30} durationInFrames={330} />
    <Composition id="TurMotor" component={TurMotor} width={1080} height={1920} fps={30} durationInFrames={DURASI_TUR} />
  </>
);
