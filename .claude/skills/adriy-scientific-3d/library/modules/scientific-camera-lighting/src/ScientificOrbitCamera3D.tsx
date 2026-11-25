import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

type Props = {
  target?: [number, number, number];
  radius?: number;
  height?: number;
  startAngle?: number;
  radiansPerFrame?: number;
  startFrame?: number;
};

/** Deterministic orbital camera path around a scientific subject. */
export const ScientificOrbitCamera3D: React.FC<Props> = ({
  target = [0, 0, 0],
  radius = 6,
  height = 1.2,
  startAngle = 0,
  radiansPerFrame = 0.012,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const lookTarget = useMemo(() => new THREE.Vector3(...target), [target[0], target[1], target[2]]);
  const angle = startAngle + Math.max(0, frame - startFrame) * radiansPerFrame;

  camera.position.set(
    target[0] + Math.cos(angle) * radius,
    target[1] + height,
    target[2] + Math.sin(angle) * radius,
  );
  camera.lookAt(lookTarget);
  return null;
};
