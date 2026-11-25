import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  radius?: number;
  height?: number;
  startAngle?: number;
  endAngle?: number;
  startFrame?: number;
  duration?: number;
  target?: [number, number, number];
  fov?: number;
};

/** Creates a smooth orbit camera around the assembly center. */
export const CameraOrbitMove3D: React.FC<Props> = ({
  children,
  radius = 6,
  height = 2.2,
  startAngle = -0.7,
  endAngle = 1.2,
  startFrame = 0,
  duration = 90,
  target = [0, 0, 0],
  fov = 42,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const angle = startAngle + (endAngle - startAngle) * p;
  const x = target[0] + Math.sin(angle) * radius;
  const z = target[2] + Math.cos(angle) * radius;
  return (
    <>
      <perspectiveCamera makeDefault position={[x, target[1] + height, z]} fov={fov} />
      <group>{children}</group>
    </>
  );
};
