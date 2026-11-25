import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, interpolate } from "remotion";
import * as THREE from "three";

type Props = {
  from?: [number, number, number];
  to?: [number, number, number];
  startFrame?: number;
  duration?: number;
};

/** Animates the camera's point of attention without changing its position. */
export const ScientificFocusTarget3D: React.FC<Props> = ({
  from = [0, 0, 0],
  to = [0, 0, 0],
  startFrame = 0,
  duration = 36,
}) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const target = useMemo(() => new THREE.Vector3(), []);
  target.set(
    from[0] + (to[0] - from[0]) * p,
    from[1] + (to[1] - from[1]) * p,
    from[2] + (to[2] - from[2]) * p,
  );
  camera.lookAt(target);
  return null;
};
