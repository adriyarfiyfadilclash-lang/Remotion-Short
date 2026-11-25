import React from "react";
export type PlanetScaleItem={name:string;radius:number;color:string};
export type PlanetScaleComparison3DProps={items?:PlanetScaleItem[];spacing?:number;maxRadius?:number;normalize?:boolean};
/** Menyusun planet berdampingan untuk membandingkan ukuran relatif secara visual. */
const sample:PlanetScaleItem[]=[
 {name:"Planet 1",radius:.38,color:"#a9a39a"},
 {name:"Planet 2",radius:.92,color:"#d4a56e"},
 {name:"Planet 3",radius:1,color:"#438bc2"},
 {name:"Planet 4",radius:.53,color:"#b96550"},
];
export const PlanetScaleComparison3D:React.FC<PlanetScaleComparison3DProps>=({items=sample,spacing=2.8,maxRadius=1.15,normalize=false})=><group>
 {items.map((item,i)=>{const r=normalize?Math.min(maxRadius,item.radius):item.radius;return <mesh key={item.name} position={[(i-(items.length-1)/2)*spacing,0,0]}>
  <sphereGeometry args={[r,40,32]}/><meshStandardMaterial color={item.color} roughness={.78}/>
 </mesh>;})}
 </group>;
};