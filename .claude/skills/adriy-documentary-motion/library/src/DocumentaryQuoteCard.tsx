import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

type Props = { quote: string; attribution?: string; delay?: number; accent?: string };

/** Pull quote treatment for testimony, primary sources and key statements. */
export const DocumentaryQuoteCard: React.FC<Props> = ({
  quote, attribution, delay = 0, accent = "#c7a66a",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", left: "10%", right: "10%", top: "50%",
      transform: `translateY(calc(-50% + ${(1-p)*18}px))`, opacity: p, color: "#f5f1e8" }}>
      <div style={{ color: accent, fontFamily: "Georgia, serif", fontSize: 92, lineHeight: .7 }}>“</div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 48, lineHeight: 1.25, maxWidth: 1400 }}>{quote}</div>
      {attribution ? <div style={{ marginTop: 28, fontFamily: "Arial, sans-serif", fontSize: 17,
        letterSpacing: 2, color: "rgba(245,241,232,.7)", textTransform: "uppercase" }}>— {attribution}</div> : null}
    </div>
  );
};
