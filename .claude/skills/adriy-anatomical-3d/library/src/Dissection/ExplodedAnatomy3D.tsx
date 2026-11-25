import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere, Cylinder } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

export type ExplodedAnatomy3DProps = GroupProps & {
  progress?: number;
  spacing?: number;
  showSkin?: boolean;
  showMuscles?: boolean;
  showSkeleton?: boolean;
};

/** Tampilan lapisan torso yang terpisah; bentuk disederhanakan untuk demonstrasi konsep. */
export const ExplodedAnatomy3D: React.FC<ExplodedAnatomy3DProps> = ({
  progress, spacing=0.7, showSkin=true, showMuscles=true, showSkeleton=true, ...props
}) => {
  const frame = useCurrentFrame();
  const p = progress === undefined ? Math.max(0,Math.min(1,frame/60)) : Math.max(0,Math.min(1,progress));
  const mat = (color:string) => <meshStandardMaterial color={color} roughness={0.68}/>;
  return <group {...props}>
    {showSkin && <group position={[0,0,spacing*p]}>
      <Capsule args={[0.36,0.58,8,24]} position={[0,0.9,0]}>{mat("#d5a08e")}</Capsule>
      <Sphere args={[0.22,24,18]} position={[0,1.62,0]}>{mat("#d5a08e")}</Sphere>
    </group>}
    {showMuscles && <group position={[0,0,0]}>
      <Capsule args={[0.29,0.48,8,24]} position={[0,0.9,0]}>{mat("#a74742")}</Capsule>
      <Sphere args={[0.17,20,16]} position={[-0.22,1.2,0]}>{mat("#a74742")}</Sphere>
      <Sphere args={[0.17,20,16]} position={[0.22,1.2,0]}>{mat("#a74742")}</Sphere>
    </group>}
    {showSkeleton && <group position={[0,0,-spacing*p]}>
      <Cylinder args={[0.045,0.045,0.88,12]} position={[0,0.9,0]}>{mat("#eee2c9")}</Cylinder>
      {[-1,1].map(s=><Capsule key={s} args={[0.045,0.32,6,12]} position={[s*0.16,0.92,0]} rotation={[0,0,s*0.5]}>{mat("#eee2c9")}</Capsule>)}
      <Sphere args={[0.14,20,16]} position={[0,1.62,0]}>{mat("#eee2c9")}</Sphere>
    </group>}
  </group>;
};
