import React from "react";
import { Audio, Sequence, useCurrentFrame, interpolate } from "remotion";

type Props = {
  src: string;
  from: number;
  to: number;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

/** Audio segment that starts at `from` and fades out before `to`. */
export const DocumentaryAudioFade: React.FC<Props> = ({
  src, from, to, volume = 0.5, fadeIn = 12, fadeOut = 18, loop = false,
}) => (
  <Sequence from={from} durationInFrames={Math.max(1, to - from)}>
    <AudioFadeTrack src={src} duration={Math.max(1, to - from)} volume={volume}
      fadeIn={fadeIn} fadeOut={fadeOut} loop={loop} />
  </Sequence>
);

const AudioFadeTrack: React.FC<{
  src: string; duration: number; volume: number; fadeIn: number; fadeOut: number; loop: boolean;
}> = ({ src, duration, volume, fadeIn, fadeOut, loop }) => {
  const frame = useCurrentFrame();
  const up = interpolate(frame, [0, Math.max(1, fadeIn)], [0, volume], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const down = interpolate(frame, [Math.max(0, duration - fadeOut), duration], [volume, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <Audio src={src} loop={loop} volume={Math.min(up, down)} />;
};
