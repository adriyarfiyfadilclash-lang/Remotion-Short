import React from "react";
import { Audio, Sequence, useCurrentFrame, interpolate } from "remotion";

type Props = {
  src: string;
  startAt?: number;
  volume?: number;
  fadeIn?: number;
  fadeOutAt?: number;
  fadeOut?: number;
};

/** Narration track with optional start offset and gentle fades. */
export const DocumentaryVoiceover: React.FC<Props> = ({
  src, startAt = 0, volume = 1, fadeIn = 8, fadeOutAt, fadeOut = 12,
}) => (
  <Sequence from={startAt}>
    <VoiceTrack src={src} volume={volume} fadeIn={fadeIn} fadeOutAt={fadeOutAt} fadeOut={fadeOut} />
  </Sequence>
);

const VoiceTrack: React.FC<Omit<Props, "startAt">> = ({
  src, volume = 1, fadeIn = 8, fadeOutAt, fadeOut = 12,
}) => {
  const frame = useCurrentFrame();
  const fadeUp = interpolate(frame, [0, Math.max(1, fadeIn)], [0, volume], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeDown = fadeOutAt === undefined ? volume : interpolate(
    frame, [Math.max(0, fadeOutAt - fadeOut), fadeOutAt], [volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <Audio src={src} volume={Math.min(fadeUp, fadeDown)} />;
};
