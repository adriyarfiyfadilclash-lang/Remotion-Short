import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import data from "./data.json";

const FPS = data.fps;
const total = data.adegan.reduce((a, s) => a + Math.round(s.detik * FPS), 0);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Video1"
    component={Video}
    width={data.lebar}
    height={data.tinggi}
    fps={FPS}
    durationInFrames={total}
  />
);
