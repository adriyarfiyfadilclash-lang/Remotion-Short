import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  src: string;
  delay?: number;
  duration?: number;
  caption?: string;
  accent?: string;
};

/** Reveals an archival image with a restrained editorial entrance. */
export const DocumentaryPhotoReveal: React.FC<Props> = ({
  src, delay = 0, duration = 24, caption, accent = "#d5b36a",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const clip = interpolate(p, [0, 1], [100, 0]);
  const y = interpolate(p, [0, 1], [24, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: "82%", height: "76%", position: "relative", overflow: "hidden",
        clipPath: `inset(0 ${clip}% 0 0)`, transform: `translateY(${y}px)`,
        boxShadow: "0 24px 70px rgba(0,0,0,.35)", background: "#17191d",
      }}>
        <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,.18)" }} />
      </div>
      {caption ? <div style={{
        position: "absolute", bottom: "7%", left: "9%", color: "white",
        fontFamily: "Arial, sans-serif", fontSize: 22, letterSpacing: 1.2,
        borderLeft: `3px solid ${accent}`, paddingLeft: 14, opacity: p,
      }}>{caption}</div> : null}
    </AbsoluteFill>
  );
};
