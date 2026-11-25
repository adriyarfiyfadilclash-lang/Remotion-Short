import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PerspectiveCamera } from "@react-three/drei";

/** Slow drifting camera for wide galaxy and nebula establishing shots. */
export type DeepSpaceCameraProps = {
  center?: [number, number, number];
  distance?: number;
  drift?: number;
  fov?: number;
  startFrame?: number;
  durationInFrames?: number;
};
export const DeepSpaceCamera: React.FC<DeepSpaceCameraProps> = ({
  center = [0, 0, 0], distance = 24, drift = 2.2, fov = 55,
  startFrame = 0, durationInFrames = 240,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sine),
  });
  return <PerspectiveCamera makeDefault position={[
    center[0] + Math.sin(p * Math.PI * 2) * drift,
    center[1] + Math.sin(p * Math.PI) * drift * 0.35,
    center[2] + distance + Math.cos(p * Math.PI * 2) * drift * 0.5,
  ]} fov={fov} />;
};
