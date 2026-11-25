import React from "react";
import { AssemblyPart3D, Vector3 } from "./AssemblyPart3D";

type Props = {
  children: React.ReactNode;
  assembledAt?: Vector3;
  separatedBy?: Vector3;
  rotation?: Vector3;
  separatedRotation?: Vector3;
  scale?: number;
  startFrame?: number;
  duration?: number;
  progress?: number;
};

/** Semantic wrapper for a named piece in an exploded assembly. */
export const ExplodedComponent3D: React.FC<Props> = ({
  children,
  assembledAt = [0, 0, 0],
  separatedBy = [0, 0, 0],
  rotation = [0, 0, 0],
  separatedRotation = rotation,
  scale = 1,
  startFrame = 0,
  duration = 30,
  progress,
}) => {
  const target: Vector3 = [
    assembledAt[0] + separatedBy[0],
    assembledAt[1] + separatedBy[1],
    assembledAt[2] + separatedBy[2],
  ];
  return (
    <AssemblyPart3D
      position={assembledAt}
      explodedPosition={target}
      rotation={rotation}
      explodedRotation={separatedRotation}
      scale={scale}
      startFrame={startFrame}
      duration={duration}
      progress={progress}
    >
      {children}
    </AssemblyPart3D>
  );
};
