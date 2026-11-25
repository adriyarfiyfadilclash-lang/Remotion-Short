import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import * as THREE from "three";

export type StarLightRigProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  intensity?: number;
  pulseAmount?: number;
  pulsePeriod?: number;
  distance?: number;
};

/** Animated key light with a subtle deterministic stellar pulse. */
export const StarLightRig: React.FC<StarLightRigProps> = ({
  position = [5, 7, 8], color = "#d9ecff", intensity = 3.2,
  pulseAmount = 0.12, pulsePeriod = 90, distance = 100,
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 - pulseAmount + pulseAmount * (0.5 + 0.5 * Math.sin((frame / Math.max(1, pulsePeriod)) * Math.PI * 2));
  return <>
    <ambientLight intensity={0.18} />
    <pointLight position={position} color={color} intensity={intensity * pulse} distance={distance} decay={2} />
  </>;
};
