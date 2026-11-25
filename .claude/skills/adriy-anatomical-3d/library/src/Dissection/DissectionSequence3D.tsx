import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { LayerReveal3D } from "./LayerReveal3D";
import { ExplodedAnatomy3D } from "./ExplodedAnatomy3D";
import { AnatomicalCutaway3D } from "./AnatomicalCutaway3D";

export type DissectionSequence3DProps = GroupProps & {
  stageDuration?: number;
  mode?: "layers" | "cutaway";
};

/** Urutan demonstrasi: lapisan luar bergeser, kemudian tampilan bagian dalam muncul. */
export const DissectionSequence3D: React.FC<DissectionSequence3DProps> = ({
  stageDuration=45, mode="layers", ...props
}) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0,Math.min(1,frame/(stageDuration*2)));
  return <group {...props}>
    {mode==="layers" ? <ExplodedAnatomy3D progress={progress} spacing={0.8}/> :
      <LayerReveal3D startFrame={0} durationInFrames={stageDuration} direction="forward" distance={0.7}>
        <AnatomicalCutaway3D/>
      </LayerReveal3D>}
  </group>;
};
