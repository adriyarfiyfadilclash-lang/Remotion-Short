import React from "react";
import { Audio, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type Props = {
  src: string;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

/** Continuous ambience or music bed with automatic scene-length fades. */
export const DocumentaryAudioBed: React.FC<Props> = ({
  src, volume = 0.22, fadeIn = 30, fadeOut = 45, loop = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeInVolume = interpolate(frame, [0, Math.max(1, fadeIn)], [0, volume], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOutVolume = interpolate(
    frame,
    [Math.max(0, durationInFrames - fadeOut), durationInFrames],
    [volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const currentVolume = Math.min(fadeInVolume, fadeOutVolume);
  return <Audio src={src} loop={loop} volume={currentVolume} />;
};
