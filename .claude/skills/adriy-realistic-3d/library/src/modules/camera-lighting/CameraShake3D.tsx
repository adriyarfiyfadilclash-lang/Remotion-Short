import React, { useLayoutEffect } from "react";
import { useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";

type Props = { intensity?: number; speed?: number; seed?: number };

/** Subtle deterministic camera vibration; keep intensity low for polished footage. */
export const CameraShake3D: React.FC<Props> = ({ intensity = 0.025, speed = 0.8, seed = 1 }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();
  useLayoutEffect(() => {
    const x = Math.sin((frame + seed * 17) * speed) * intensity;
    const y = Math.cos((frame + seed * 31) * speed * 0.83) * intensity * 0.65;
    camera.position.x += x;
    camera.position.y += y;
  }, [camera, frame, intensity, speed, seed]);
  return null;
};
