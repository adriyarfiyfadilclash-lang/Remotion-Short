import React from "react";
import { useCurrentFrame } from "remotion";

type Props={text:string;x?:number;y?:number;width?:number;fontSize?:number;color?:string;delay?:number;charsPerFrame?:number;prefix?:string;uppercase?:boolean};

/** Types a caption character-by-character, suitable for documentary notes. */
export const TypewriterCaption:React.FC<Props>=({text,x=0,y=0,width=700,fontSize=24,color="#e9e1d2",delay=0,charsPerFrame=.8,prefix="— ",uppercase=false})=>{
 const f=Math.max(0,useCurrentFrame()-delay); const count=Math.min(text.length,Math.floor(f*charsPerFrame));
 const shown=text.slice(0,count);
 return <div style={{position:"absolute",left:x,top:y,width,fontFamily:"Arial,sans-serif",fontSize,color,lineHeight:1.35,letterSpacing:1,textTransform:uppercase?"uppercase":"none"}}>
  <span style={{color:"#ef6b4a",fontWeight:900}}>{prefix}</span>{shown}<span style={{opacity:f%1<.5?1:0,color:"#ef6b4a"}}>▍</span>
 </div>;
};
