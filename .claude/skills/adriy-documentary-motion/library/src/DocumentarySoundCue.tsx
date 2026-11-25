import React from "react";
import { Audio, Sequence, useCurrentFrame, interpolate } from "remotion";

type Props = {
  src: string;
  at: number;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  duration?: number;
};

/** One-shot sound effect aligned to a chosen frame. */
export const DocumentarySoundCue: React.FC<Props> = ({
  src, at, volume = 0.65, fadeIn = 2, fadeOut = 8, duration = 30,
}) => (
  <Sequence from={at} durationInFrames={duration}>
    <CueTrack src={src} volume={volume} fadeIn={fadeIn} fadeOut={fadeOut} duration={duration} />
  </Sequence>
);

const CueTrack: React.FC<Omit<Props, "at">> = ({
  src, volume = 0.65, fadeIn = 2, fadeOut = 8, duration = 30,
}) => {
  const frame = useCurrentFrame();
  const up = interpolate(frame, [0, Math.max(1, fadeIn)], [0, volume], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const down = interpolate(frame, [Math.max(0, duration - fadeOut), duration], [volume, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <Audio src={src} volume={Math.min(up, down)} />;
};
