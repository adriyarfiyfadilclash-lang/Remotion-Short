import React from "react";
export type PlanetRotation3DProps={frame?:number;speed?:number;axisTilt?:number;initialRotation?:number;children:React.ReactNode};
/** Memutar model planet pada sumbu dengan kemiringan yang dapat diatur. */
export const PlanetRotation3D:React.FC<PlanetRotation3DProps>=({frame=0,speed=.01,axisTilt=0,initialRotation=0,children})=><group rotation={[0,initialRotation+frame*speed,axisTilt]}>{children}</group>;