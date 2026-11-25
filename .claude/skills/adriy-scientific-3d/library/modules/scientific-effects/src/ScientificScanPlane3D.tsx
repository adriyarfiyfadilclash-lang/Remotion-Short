import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  width?: number;
  depth?: number;
  position?: [number, number, number];
  color?: string;
  opacity?: number;
  startY?: number;
  endY?: number;
  startFrame?: number;
  duration?: number;
  vertical?: boolean;
};

/** Moving translucent scan sheet, suitable for conceptual cross-section reveals. */
export const ScientificScanPlane3D: React.FC<Props> = ({
  width = 3,
  depth = 3,
  position = [0, 0, 0],
  color = "#59d9ff",
  opacity = 0.22,
  startY = -1.8,
  endY = 1.8,
  startFrame = 0,
  duration = 90,
  vertical = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sine),
  });
  const y = startY + (endY - startY) * p;
  return (
    <group position={[position[0], position[1] + y, position[2]]} rotation={vertical ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
      <mesh>
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} side={2} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[width, 0.018]} />
        <meshBasicMaterial color={color} transparent opacity={Math.min(1, opacity * 3)} />
      </mesh>
    </group>
  );
};
