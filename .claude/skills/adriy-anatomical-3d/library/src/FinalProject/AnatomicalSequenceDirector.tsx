import React from "react";

export type AnatomicalSequenceDirectorProps = {
  frame: number;
  children: React.ReactNode[];
  segmentFrames?: number[];
  loop?: boolean;
};

/** Memilih satu adegan berdasarkan rentang frame; cocok untuk urutan bab video. */
export const AnatomicalSequenceDirector: React.FC<AnatomicalSequenceDirectorProps> = ({
  frame, children, segmentFrames, loop = false,
}) => {
  const scenes = React.Children.toArray(children);
  if (!scenes.length) return null;
  const durations = segmentFrames?.length === scenes.length
    ? segmentFrames.map((n) => Math.max(1, n))
    : scenes.map(() => 45);
  const total = durations.reduce((a, b) => a + b, 0);
  const localFrame = loop ? ((frame % total) + total) % total : Math.max(0, Math.min(frame, total - 1));
  let cursor = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (localFrame < cursor + durations[i]) return <React.Fragment key={i}>{scenes[i]}</React.Fragment>;
    cursor += durations[i];
  }
  return <>{scenes[scenes.length - 1]}</>;
};
