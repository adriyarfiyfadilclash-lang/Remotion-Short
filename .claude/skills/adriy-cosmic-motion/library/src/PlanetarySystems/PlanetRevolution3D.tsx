import React from "react";
export type PlanetRevolution3DProps={frame?:number;orbitRadius?:number;semiMinorAxis?:number;speed?:number;phase?:number;inclination?:number;children:React.ReactNode};
/** Memindahkan objek mengelilingi titik pusat; posisi dihitung langsung dari frame. */
export const PlanetRevolution3D:React.FC<PlanetRevolution3DProps>=({frame=0,orbitRadius=2,semiMinorAxis, speed=.01,phase=0,inclination=0,children})=>{
 const a=phase+frame*speed,b=semiMinorAxis??orbitRadius;
 return <group position={[orbitRadius*Math.cos(a),b*Math.sin(a)*Math.sin(inclination),b*Math.sin(a)*Math.cos(inclination)]}>{children}</group>;
};