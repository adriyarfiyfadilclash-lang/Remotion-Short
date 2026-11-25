import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  title: string;
  kicker?: string;
  delay?: number;
  duration?: number;
  accent?: string;
  align?: "left" | "center";
};

/** Editorial documentary title with restrained rise, fade and accent rule. */
export const DocumentaryTitleReveal: React.FC<Props> = ({
  title, kicker, delay = 0, duration = 28, accent = "#c7a66a", align = "left",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(p, [0, 1], [26, 0]);
  const textAlign = align;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: align === "center" ? "center" : "flex-start",
      padding: "0 9%", color: "#f4f1e9" }}>
      <div style={{ opacity: p, transform: `translateY(${y}px)`, textAlign }}>
        {kicker ? <div style={{ fontFamily: "Arial, sans-serif", fontSize: 16, letterSpacing: 5,
          textTransform: "uppercase", color: accent, marginBottom: 22 }}>{kicker}</div> : null}
        <div style={{ width: 58, height: 3, background: accent, margin: align === "center" ? "0 auto 24px" : "0 0 24px" }} />
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 76,
          lineHeight: 1.06, fontWeight: 400, maxWidth: 1250 }}>{title}</div>
      </div>
    </AbsoluteFill>
  );
};
