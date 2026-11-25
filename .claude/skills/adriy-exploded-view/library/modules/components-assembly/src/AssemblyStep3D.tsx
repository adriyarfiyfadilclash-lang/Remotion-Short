import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  stepStart: number;
  stepDuration?: number;
  from?: [number, number, number];
  to?: [number, number, number];
  fade?: boolean;
  scaleFrom?: number;
};

/** Animates one assembly action during a defined frame interval. */
export const AssemblyStep3D: React.FC<Props> = ({
  children,
  stepStart,
  stepDuration = 24,
  from = [0, 0.35, 0],
  to = [0, 0, 0],
  fade = true,
  scaleFrom = 0.96,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - stepStart, [0, Math.max(1, stepDuration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = fade ? p : 1;
  return (
    <group
      position={[
        from[0] + (to[0] - from[0]) * p,
        from[1] + (to[1] - from[1]) * p,
        from[2] + (to[2] - from[2]) * p,
      ]}
      scale={scaleFrom + (1 - scaleFrom) * p}
    >
      <group>{children}</group>
      {/* Opacity is intentionally controlled by child materials for predictable R3F rendering. */}
    </group>
  );
};
