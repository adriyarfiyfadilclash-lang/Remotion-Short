import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Layer = { src: string; depth: number; fit?: "cover" | "contain"; opacity?: number };
type Props = { layers: Layer[]; moveX?: number; moveY?: number; zoom?: number };

/**
 * Layered 2.5D parallax. Supply transparent PNG layers for best separation.
 * This is a 2D compositing technique, not a true 3D scene.
 */
export const DocumentaryParallax: React.FC<Props> = ({
  layers, moveX = 28, moveY = 10, zoom = 1.04,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#101216" }}>
      {layers.map((layer, index) => {
        const factor = layer.depth;
        return <img key={index} src={layer.src} style={{
          position: "absolute", inset: "-5%", width: "110%", height: "110%",
          objectFit: layer.fit ?? "cover", opacity: layer.opacity ?? 1,
          transform: `translate(${(p - .5) * moveX * factor}px, ${(p - .5) * moveY * factor}px) scale(${1 + (zoom - 1) * p * factor})`,
        }} />;
      })}
    </AbsoluteFill>
  );
};
