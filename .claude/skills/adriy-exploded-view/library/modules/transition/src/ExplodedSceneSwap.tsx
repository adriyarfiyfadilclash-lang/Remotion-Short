import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  startFrame?: number;
  duration?: number;
  separation?: number;
};

/** Swaps two scene groups by pushing the old scene outward and drawing the new one inward. */
export const ExplodedSceneSwap: React.FC<Props> = ({ outgoing, incoming, startFrame = 0, duration = 45, separation = 2.4 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  const oldX = -separation * p;
  const newX = separation * (1 - p);
  const oldScale = 1 - 0.12 * p;
  const newScale = 0.88 + 0.12 * p;
  return (
    <>
      <group position={[oldX, 0, 0]} scale={oldScale}>{outgoing}</group>
      <group position={[newX, 0, 0]} scale={newScale}>{incoming}</group>
    </>
  );
};
