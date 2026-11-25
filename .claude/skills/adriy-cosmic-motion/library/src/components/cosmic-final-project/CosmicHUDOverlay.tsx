import React from "react";
import {useCurrentFrame} from "remotion";
export type CosmicHUDOverlayProps={chapter?:string;detail?:string;showFrameCounter?:boolean;accent?:string};
/** Minimal science-documentary HUD overlay with optional frame counter. */
export const CosmicHUDOverlay:React.FC<CosmicHUDOverlayProps>=({chapter="DEEP SPACE",detail="VISUAL EXPLORATION",showFrameCounter=true,accent="#79d9ff"})=>{
const f=useCurrentFrame();
return <div style={{position:"absolute",inset:0,padding:30,boxSizing:"border-box",display:"flex",justifyContent:"space-between",alignItems:"flex-start",pointerEvents:"none",fontFamily:"Arial,sans-serif",color:accent}}>
<div style={{borderLeft:`2px solid ${accent}`,paddingLeft:12}}><div style={{fontSize:11,fontWeight:800,letterSpacing:3}}>{chapter}</div><div style={{fontSize:9,letterSpacing:2,opacity:.7,marginTop:5}}>{detail}</div></div>
{showFrameCounter?<div style={{fontSize:10,letterSpacing:2,opacity:.75}}>FRAME {String(f).padStart(4,"0")}</div>:null}
</div>;
};
