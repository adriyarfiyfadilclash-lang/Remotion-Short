import React, { useLayoutEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { useThree } from "@react-three/fiber";

type Props = { radius?: number; height?: number; startAngle?: number; endAngle?: number; target?: [number, number, number] };

/** Orbits the camera around a fixed target over the composition duration. */
export const CameraOrbit3D: React.FC<Props> = ({ radius = 6, height = 1.2, startAngle = -0.8, endAngle = Math.PI * 1.2, target = [0, 0, 0] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { camera } = useThree();
  const angle = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [startAngle, endAngle], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  useLayoutEffect(() => {
    camera.position.set(Math.sin(angle) * radius + target[0], height + target[1], Math.cos(angle) * radius + target[2]);
    camera.lookAt(...target);
  }, [camera, angle, radius, height, target]);
  return null;
};
