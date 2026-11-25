import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  count?: number;
  radius?: number;
  color?: string;
  pointSize?: number;
  position?: [number, number, number];
  drift?: number;
  seed?: number;
};

/** Deterministic ambient particle cloud for scientific environments. */
export const ScientificParticleField3D: React.FC<Props> = ({
  count = 240,
  radius = 3,
  color = "#75d9f5",
  pointSize = 0.035,
  position = [0, 0, 0],
  drift = 0.12,
  seed = 17,
}) => {
  const frame = useCurrentFrame();
  const positions = useMemo(() => {
    let state = seed >>> 0;
    const random = () => {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 4294967296;
    };
    const data = new Float32Array(Math.max(1, count) * 3);
    for (let i = 0; i < Math.max(1, count); i++) {
      const u = random() * 2 - 1;
      const a = random() * Math.PI * 2;
      const r = radius * Math.cbrt(random());
      const planar = Math.sqrt(1 - u * u);
      data[i * 3] = r * planar * Math.cos(a);
      data[i * 3 + 1] = r * u;
      data[i * 3 + 2] = r * planar * Math.sin(a);
    }
    return data;
  }, [count, radius, seed]);
  const opacity = interpolate(Math.sin(frame * 0.045) * 0.5 + 0.5, [0, 1], [0.48, 0.95]);
  return (
    <group position={position} rotation={[0, frame * drift * 0.01, 0]}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={pointSize}
          sizeAttenuation
          depthWrite={false}
          opacity={opacity}
        />
      </Points>
    </group>
  );
};
