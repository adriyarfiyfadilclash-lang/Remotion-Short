import React from "react";
import { Audio, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type DuckRange = { from: number; to: number; level?: number };
type Props = {
  src: string;
  volume?: number;
  duckTo?: number;
  duckRanges: DuckRange[];
  fadeIn?: number;
  fadeOut?: number;
  loop?: boolean;
};

/**
 * Background music/ambience with manually authored duck ranges.
 * Add one range for each narration passage to lower the bed under speech.
 */
export const DocumentaryDuckedBed: React.FC<Props> = ({
  src, volume = 0.24, duckTo = 0.08, duckRanges, fadeIn = 24, fadeOut = 40, loop = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeUp = interpolate(frame, [0, Math.max(1, fadeIn)], [0, volume], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeDown = interpolate(frame,
    [Math.max(0, durationInFrames - fadeOut), durationInFrames], [volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const duck = duckRanges.reduce((level, range) => {
    const edge = 8;
    const inLevel = interpolate(frame,
      [range.from - edge, range.from, range.to, range.to + edge],
      [volume, range.level ?? duckTo, range.level ?? duckTo, volume],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return Math.min(level, inLevel);
  }, volume);
  return <Audio src={src} loop={loop} volume={Math.min(fadeUp, fadeDown, duck)} />;
};
