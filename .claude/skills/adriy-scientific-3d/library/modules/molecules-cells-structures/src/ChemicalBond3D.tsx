import React, { useMemo } from "react";
import * as THREE from "three";

type Props = {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
  color?: string;
  segments?: number;
};

/** Cylindrical bond between two atom coordinates. */
export const ChemicalBond3D: React.FC<Props> = ({
  start,
  end,
  radius = 0.045,
  color = "#b7c9d5",
  segments = 16,
}) => {
  const geometry = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(b, a);
    const length = direction.length();
    const geo = new THREE.CylinderGeometry(radius, radius, Math.max(length, 0.0001), segments);
    geo.translate(0, length / 2, 0);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 0, 0);
    return { geo, midpoint: a.clone().add(b).multiplyScalar(0.5), quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()) };
  }, [start[0], start[1], start[2], end[0], end[1], end[2], radius, segments]);

  return (
    <mesh position={geometry.midpoint} quaternion={geometry.quaternion}>
      <cylinderGeometry args={[radius, radius, new THREE.Vector3(...start).distanceTo(new THREE.Vector3(...end)), segments]} />
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.08} />
    </mesh>
  );
};
