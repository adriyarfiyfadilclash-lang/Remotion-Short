import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

type Props = { number: string; title: string; description?: string; delay?: number; accent?: string };

/** Chapter card for structured long-form documentary storytelling. */
export const DocumentaryChapterHeading: React.FC<Props> = ({
  number, title, description, delay = 0, accent = "#c7a66a",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, 34], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 10%", color: "#f4f1e9", opacity: p }}>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 19, letterSpacing: 5, color: accent }}>
        BAB {number}
      </div>
      <div style={{ marginTop: 20, fontFamily: "Georgia, serif", fontSize: 78, lineHeight: 1.04 }}>
        {title}
      </div>
      {description ? <div style={{ marginTop: 22, maxWidth: 850, fontFamily: "Arial, sans-serif",
        fontSize: 23, lineHeight: 1.5, color: "rgba(244,241,233,.72)" }}>{description}</div> : null}
    </div>
  );
};
