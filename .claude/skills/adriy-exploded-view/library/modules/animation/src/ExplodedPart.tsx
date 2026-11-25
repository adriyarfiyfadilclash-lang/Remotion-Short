import React from "react";
import { interpolate } from "remotion";

type Vec3 = [number, number, number];
type Props = {
  children: React.ReactNode;
  progress?: number;
  assembledPosition?: Vec3;
  explodedOffset?: Vec3;
  assembledRotation?: Vec3;
  explodedRotation?: Vec3;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  opacity?: boolean;
};

/** A single component that travels from its assembled pose to its exploded pose. */
export const ExplodedPart: React.FC<Props> = ({
  children, progress = 0, assembledPosition = [0, 0, 0], explodedOffset = [0, 1, 0],
  assembledRotation = [0, 0, 0], explodedRotation = [0, 0, 0],
  delay = 0, duration = 1, scaleFrom = 1, opacity = false,
}) => {
  const p = interpolate(progress, [delay, Math.min(1, delay + duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const position: Vec3 = [
    assembledPosition[0] + explodedOffset[0] * p,
    assembledPosition[1] + explodedOffset[1] * p,
    assembledPosition[2] + explodedOffset[2] * p,
  ];
  const rotation: Vec3 = [
    assembledRotation[0] + (explodedRotation[0] - assembledRotation[0]) * p,
    assembledRotation[1] + (explodedRotation[1] - assembledRotation[1]) * p,
    assembledRotation[2] + (explodedRotation[2] - assembledRotation[2]) * p,
  ];
  const scale = scaleFrom + (1 - scaleFrom) * p;
  return <group position={position} rotation={rotation} scale={scale}>{children}</group>;
};
