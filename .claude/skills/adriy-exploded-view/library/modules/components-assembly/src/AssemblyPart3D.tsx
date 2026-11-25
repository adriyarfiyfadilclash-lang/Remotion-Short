import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type Vector3 = [number, number, number];

type Props = {
  children: React.ReactNode;
  position?: Vector3;
  explodedPosition?: Vector3;
  rotation?: Vector3;
  explodedRotation?: Vector3;
  scale?: number;
  startFrame?: number;
  duration?: number;
  progress?: number;
};

/** A reusable assembly piece that moves between assembled and exploded positions. */
export const AssemblyPart3D: React.FC<Props> = ({
  children,
  position = [0, 0, 0],
  explodedPosition = position,
  rotation = [0, 0, 0],
  explodedRotation = rotation,
  scale = 1,
  startFrame = 0,
  duration = 30,
  progress,
}) => {
  const frame = useCurrentFrame();
  const animated = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const p = progress === undefined ? animated : Math.max(0, Math.min(1, progress));
  const mix = (a: number, b: number) => a + (b - a) * p;

  return (
    <group
      position={[
        mix(position[0], explodedPosition[0]),
        mix(position[1], explodedPosition[1]),
        mix(position[2], explodedPosition[2]),
      ]}
      rotation={[
        mix(rotation[0], explodedRotation[0]),
        mix(rotation[1], explodedRotation[1]),
        mix(rotation[2], explodedRotation[2]),
      ]}
      scale={scale}
    >
      {children}
    </group>
  );
};
