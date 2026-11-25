import React from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  startZ?: number;
  endZ?: number;
  startFrame?: number;
  duration?: number;
  target?: [number, number, number];
  easing?: boolean;
};

/** Straight push-in or pull-back camera move along the camera Z axis. */
export const ScientificDollyCamera3D: React.FC<Props> = ({
  startZ = 8,
  endZ = 4,
  startFrame = 0,
  duration = 48,
  target = [0, 0, 0],
  easing = true,
}) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const z = interpolate(frame - startFrame, [0, Math.max(1, duration)], [startZ, endZ], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easing ? Easing.inOut(Easing.quad) : Easing.linear,
  });
  camera.position.z = z;
  camera.lookAt(...target);
  return null;
};
