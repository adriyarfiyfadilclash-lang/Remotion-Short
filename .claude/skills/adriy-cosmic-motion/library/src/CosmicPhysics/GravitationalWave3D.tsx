import React from "react";
import {Line} from "@react-three/drei";
export type GravitationalWave3DProps={frame?:number;radius?:number;amplitude?:number;frequency?:number;waveCount?:number;color?:string};
/** Gelombang gravitasi digambarkan sebagai cincin yang berdenyut secara periodik. */
export const GravitationalWave3D:React.FC<GravitationalWave3DProps>=({frame=0,radius=1.3,amplitude=.22,frequency=.08,waveCount=5,color="#a88df2"})=>{
 return <group>{Array.from({length:waveCount},(_,i)=>{const r=radius+i*.38+Math.sin(frame*frequency-i*.7)*amplitude;const p:[number,number,number][]=[];for(let j=0;j<=100;j++){const a=j/100*Math.PI*2;p.push([Math.cos(a)*r,Math.sin(a*2+frame*.025)*amplitude*.2,Math.sin(a)*r]);}return <Line key={i} points={p} color={color} lineWidth={1.5} transparent opacity={.72-i*.08}/>;})}</group>;
};