import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PerspectiveCamera } from "@react-three/drei";

export type PlanetFocusCameraProps = {
  position?: [number, number, number];
  focusPosition?: [number, number, number];
  fov?: number;
  startFrame?: number;
  durationInFrames?: number;
  orbitRadius?: number;
  orbitTurns?: number;
};

/** Smooth push-in and optional orbit around a planet-sized subject. */
export const PlanetFocusCamera: React.FC<PlanetFocusCameraProps> = ({
  position = [0, 1.5, 16],
  focusPosition = [0, 0, 0],
  fov = 38,
  startFrame = 0,
  durationInFrames = 150,
  orbitRadius = 0,
  orbitTurns = 0.12,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const angle = p * Math.PI * 2 * orbitTurns;
  const x = position[0] + Math.sin(angle) * orbitRadius;
  const z = position[2] - p * Math.max(0, position[2] - 7) + (Math.cos(angle) - 1) * orbitRadius;
  return <PerspectiveCamera makeDefault position={[x, position[1] * (1 - p * 0.15), z]} fov={fov} />;
};
