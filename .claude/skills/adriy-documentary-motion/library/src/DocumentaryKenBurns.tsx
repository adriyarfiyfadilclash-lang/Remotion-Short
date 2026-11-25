import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  src: string;
  startScale?: number;
  endScale?: number;
  direction?: "left" | "right" | "up" | "down";
  durationInFrames?: number;
  overlay?: string;
  imageFit?: "cover" | "contain";
};

/** Slow documentary-style image movement. Place inside a Remotion scene. */
export const DocumentaryKenBurns: React.FC<Props> = ({
  src, startScale = 1.04, endScale = 1.16, direction = "left",
  durationInFrames, overlay = "rgba(8, 10, 14, 0.16)", imageFit = "cover",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames: sceneDuration } = useVideoConfig();
  const duration = durationInFrames ?? sceneDuration;
  const progress = interpolate(frame, [0, Math.max(1, duration - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const drift = 2.2 * progress;
  const x = direction === "left" ? drift : direction === "right" ? -drift : 0;
  const y = direction === "up" ? drift : direction === "down" ? -drift : 0;
  const scale = interpolate(progress, [0, 1], [startScale, endScale]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#101216" }}>
      <img src={src} style={{
        width: "100%", height: "100%", objectFit: imageFit,
        transform: `translate(${x}%, ${y}%) scale(${scale})`,
        transformOrigin: "center center",
      }} />
      <AbsoluteFill style={{ background: overlay }} />
    </AbsoluteFill>
  );
};
