import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = { text: string; delay?: number; maxWidth?: number; background?: string };

/** Readable subtitle block with optional translucent backing. */
export const DocumentarySubtitle: React.FC<Props> = ({
  text, delay = 0, maxWidth = 1500, background = "rgba(0,0,0,.48)",
}) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [0, 8, 50, 58], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: "50%", bottom: 52, transform: "translateX(-50%)",
      maxWidth, width: "84%", textAlign: "center", opacity, color: "#fff",
      fontFamily: "Arial, sans-serif", fontSize: 27, lineHeight: 1.35,
      background, padding: "12px 22px", borderRadius: 3, boxSizing: "border-box" }}>
      {text}
    </div>
  );
};
