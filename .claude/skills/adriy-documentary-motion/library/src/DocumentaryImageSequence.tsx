import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Item = { src: string; label?: string };
type Props = { items: Item[]; framesPerItem?: number; fadeFrames?: number };

/** Automatic still-image sequence with crossfades and optional archival labels. */
export const DocumentaryImageSequence: React.FC<Props> = ({
  items, framesPerItem = 90, fadeFrames = 18,
}) => {
  const frame = useCurrentFrame();
  if (!items.length) return null;
  const index = Math.min(items.length - 1, Math.floor(frame / framesPerItem));
  const local = frame - index * framesPerItem;
  const opacity = interpolate(local, [0, fadeFrames, framesPerItem - fadeFrames, framesPerItem],
    [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const item = items[index];
  return (
    <AbsoluteFill style={{ background: "#101216" }}>
      <img src={item.src} style={{ width: "100%", height: "100%", objectFit: "cover", opacity }} />
      {item.label ? <div style={{
        position: "absolute", left: 70, bottom: 92, color: "white", opacity,
        fontFamily: "Arial, sans-serif", fontSize: 24, letterSpacing: 2,
        textShadow: "0 2px 12px rgba(0,0,0,.8)",
      }}>{item.label}</div> : null}
    </AbsoluteFill>
  );
};
