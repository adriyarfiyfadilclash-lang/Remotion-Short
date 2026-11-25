import React from "react";

type Props = {
  children: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const Object3DGroup: React.FC<Props> = ({
  children, position=[0,0,0], rotation=[0,0,0], scale=1, visible=true,
}) => (
  <group position={position} rotation={rotation} scale={scale} visible={visible}>
    {children}
  </group>
);
