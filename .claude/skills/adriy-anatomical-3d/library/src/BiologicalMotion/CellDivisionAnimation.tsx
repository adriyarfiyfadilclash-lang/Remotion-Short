import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Sphere } from "@react-three/drei";

export type CellDivisionAnimationProps = GroupProps & {
  cycleFrames?: number;
  cellColor?: string;
  nucleusColor?: string;
};

/** Urutan visual mitosis empat fase ringkas; bukan simulasi biologi sel yang lengkap. */
export const CellDivisionAnimation: React.FC<CellDivisionAnimationProps> = ({
  cycleFrames=120, cellColor="#e7a9a0", nucleusColor="#8b5a9b", ...props
}) => {
  const frame=useCurrentFrame();
  const phase=(frame%Math.max(1,cycleFrames))/Math.max(1,cycleFrames);
  const split=Math.max(0,Math.min(1,(phase-0.5)*2));
  return <group {...props}>
    {phase<0.5 ? <>
      <Sphere args={[0.55,32,24]} scale={[1,1,0.72]}>
        <meshPhysicalMaterial color={cellColor} roughness={0.5} transparent opacity={0.82}/>
      </Sphere>
      <Sphere args={[0.2,24,18]}>
        <meshStandardMaterial color={nucleusColor}/>
      </Sphere>
    </> : <>
      <Sphere args={[0.42,32,24]} position={[-0.35*split,0,0]} scale={[1,1,0.72]}>
        <meshPhysicalMaterial color={cellColor} roughness={0.5} transparent opacity={0.82}/>
      </Sphere>
      <Sphere args={[0.42,32,24]} position={[0.35*split,0,0]} scale={[1,1,0.72]}>
        <meshPhysicalMaterial color={cellColor} roughness={0.5} transparent opacity={0.82}/>
      </Sphere>
      <Sphere args={[0.12,20,16]} position={[-0.35*split,0,0.04]}>
        <meshStandardMaterial color={nucleusColor}/>
      </Sphere>
      <Sphere args={[0.12,20,16]} position={[0.35*split,0,0.04]}>
        <meshStandardMaterial color={nucleusColor}/>
      </Sphere>
    </>}
  </group>;
};
