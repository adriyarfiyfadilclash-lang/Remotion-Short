import React from "react";
import { Audio } from "remotion";

export type SoundLayer = {
  src: string;
  volume?: number;
  loop?: boolean;
  startFrom?: number;
  playbackRate?: number;
};

type Props = { layers: SoundLayer[] };

/** Stack several ambience layers, e.g. wind + room tone + distant machinery. */
export const DocumentarySoundscape: React.FC<Props> = ({ layers }) => (
  <>
    {layers.map((layer, index) => (
      <Audio
        key={index}
        src={layer.src}
        volume={layer.volume ?? 0.2}
        loop={layer.loop ?? true}
        startFrom={layer.startFrom ?? 0}
        playbackRate={layer.playbackRate ?? 1}
      />
    ))}
  </>
);
