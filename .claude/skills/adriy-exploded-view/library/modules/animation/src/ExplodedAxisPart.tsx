import React from "react";
import { ExplodedPart } from "./ExplodedPart";

type Props = {
  children: React.ReactNode;
  progress?: number;
  assembledPosition?: [number, number, number];
  distance?: number;
  axis?: "x" | "y" | "z";
  direction?: 1 | -1;
  delay?: number;
  duration?: number;
};

/** Separates a part along one selected axis. */
export const ExplodedAxisPart: React.FC<Props> = ({
  children, progress, assembledPosition = [0, 0, 0], distance = 1.5, axis = "y", direction = 1, delay = 0, duration = 1,
}) => {
  const offset: [number, number, number] = axis === "x"
    ? [distance * direction, 0, 0]
    : axis === "y" ? [0, distance * direction, 0] : [0, 0, distance * direction];
  return <ExplodedPart progress={progress} assembledPosition={assembledPosition} explodedOffset={offset} delay={delay} duration={duration}>{children}</ExplodedPart>;
};
