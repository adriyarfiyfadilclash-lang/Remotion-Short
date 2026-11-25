import React from "react";
import { Composition } from "remotion";
import { DocumentaryFilm } from "./DocumentaryFilm";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DocumentaryFilm"
    component={DocumentaryFilm}
    durationInFrames={1200}
    fps={30}
    width={1920}
    height={1080}
  />
);
