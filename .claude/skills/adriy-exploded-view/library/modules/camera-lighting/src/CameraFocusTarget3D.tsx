import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  children?: React.ReactNode;
  from: [number, number, number];
  to: [number, number, number];
  startFrame?: number;
  duration?: number;
  visible?: boolean;
};

/** Invisible target helper for camera/light aiming and layout reference. */
export const CameraFocusTarget3D: React.FC<Props> = ({
  children,
  from,
  to,
  startFrame = 0,
  duration = 30,
  visible = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const position: [number, number, number] = [
    from[0] + (to[0] - from[0]) * p,
    from[1] + (to[1] - from[1]) * p,
    from[2] + (to[2] - from[2]) * p,
  ];
  return (
    <group position={position}>
      {visible ? (
        <mesh>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ffcc66" />
        </mesh>
      ) : null}
      {children}
    </group>
  );
};
