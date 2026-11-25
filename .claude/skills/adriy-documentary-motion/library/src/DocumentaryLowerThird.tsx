import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  name: string;
  role?: string;
  delay?: number;
  duration?: number;
  accent?: string;
};

/** Name-and-role lower third for interview subjects and expert identification. */
export const DocumentaryLowerThird: React.FC<Props> = ({
  name, role, delay = 0, duration = 22, accent = "#c7a66a",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", left: 72, bottom: 86, display: "flex", alignItems: "stretch",
      gap: 18, opacity: p, transform: `translateX(${(1-p)*-24}px)`, color: "#f5f3ed" }}>
      <div style={{ width: 4, background: accent }} />
      <div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 27, fontWeight: 700, letterSpacing: .5 }}>{name}</div>
        {role ? <div style={{ marginTop: 7, fontFamily: "Arial, sans-serif", fontSize: 17,
          letterSpacing: 1.2, color: "rgba(245,243,237,.72)" }}>{role}</div> : null}
      </div>
    </div>
  );
};
