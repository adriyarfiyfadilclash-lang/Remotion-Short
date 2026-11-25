import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  start?: [number, number, number];
  end?: [number, number, number];
  startFrame?: number;
  duration?: number;
  fov?: number;
  target?: [number, number, number];
};

/** Camera dolly: smoothly moves the viewpoint closer to or farther from the object. */
export const ExplodedDolly3D: React.FC<Props> = ({
  children,
  start = [0, 1.8, 8],
  end = [0, 1.2, 4.8],
  startFrame = 0,
  duration = 48,
  fov = 40,
  target = [0, 0, 0],
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const mix = (a: number, b: number) => a + (b - a) * p;
  return (
    <>
      <perspectiveCamera
        makeDefault
        position={[mix(start[0], end[0]), mix(start[1], end[1]), mix(start[2], end[2])]}
        fov={fov}
      />
      <group position={target}>{children}</group>
    </>
  );
};
