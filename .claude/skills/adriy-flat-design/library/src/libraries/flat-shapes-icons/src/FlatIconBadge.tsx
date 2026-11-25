import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type IconName="check"|"plus"|"close"|"play"|"pause"|"star"|"info"|"search";
type Props={name:IconName;size?:number;color?:string;background?:string;duration?:number;label?:string};
const paths:Record<IconName,React.ReactNode>={
 check:<path d="M5 12.5 10 17l9-10"/>,
 plus:<path d="M12 5v14M5 12h14"/>,
 close:<path d="m6 6 12 12M18 6 6 18"/>,
 play:<path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none"/>,
 pause:<path d="M8 5v14M16 5v14"/>,
 star:<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>,
 info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/></>,
 search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>
};
export const FlatIconBadge:React.FC<Props>=({name,size=88,color="#FFFFFF",background="#2563EB",duration=16,label})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.3))});
 return <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:10,transform:`scale(${p})`}}>
  <div style={{width:size,height:size,borderRadius:"28%",backgroundColor:background,display:"grid",placeItems:"center"}}>
   <svg width={size*.52} height={size*.52} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
  </div>
  {label&&<span style={{fontFamily:"Arial,sans-serif",fontWeight:700,fontSize:size*.2,color:"#1F2937"}}>{label}</span>}
 </div>;
};
