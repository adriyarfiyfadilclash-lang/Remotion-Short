import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={children?:React.ReactNode;x?:number;y?:number;width?:number;height?:number;depth?:number;moveX?:number;moveY?:number;delay?:number;duration?:number;scale?:number;rotate?:number};

/** Places a collage layer at a simulated depth with a subtle parallax drift. */
export const ParallaxLayer:React.FC<Props>=({children,x=0,y=0,width="100%" as unknown as number,height="100%" as unknown as number,depth=1,moveX=32,moveY=12,delay=0,duration=120,scale=1,rotate=0})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const factor=Math.max(-3,Math.min(3,depth));
 return <div style={{position:"absolute",left:x,top:y,width,height,transform:`translate(${moveX*p*factor}px,${moveY*p*factor}px) scale(${scale}) rotate(${rotate}deg)`,transformOrigin:"center"}}>
  {children}
 </div>;
};
