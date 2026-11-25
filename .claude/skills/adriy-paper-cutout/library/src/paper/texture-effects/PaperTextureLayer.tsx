import React from "react";
import {PaperGrain} from "./PaperGrain";
import {PaperFiber} from "./PaperFiber";

type Props={grain?:boolean;fiber?:boolean;grainOpacity?:number;fiberOpacity?:number;seed?:number;style?:React.CSSProperties};
export const PaperTextureLayer:React.FC<Props>=({grain=true,fiber=true,grainOpacity=.12,fiberOpacity=.1,seed=1,style})=>(
 <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",...style}}>
  {grain?<PaperGrain opacity={grainOpacity} seed={seed}/>:null}
  {fiber?<PaperFiber opacity={fiberOpacity} seed={seed+1}/>:null}
 </div>
);
