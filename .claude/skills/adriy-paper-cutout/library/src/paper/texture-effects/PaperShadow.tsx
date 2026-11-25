import React from "react";

type Props={children:React.ReactNode;depth?:number;softness?:number;opacity?:number;rotation?:number;style?:React.CSSProperties};
export const PaperShadow:React.FC<Props>=({children,depth=7,softness=2,opacity=.22,rotation=0,style})=>(
 <div style={{position:"relative",transform:`rotate(${rotation}deg)`,filter:`drop-shadow(${depth}px ${depth+2}px ${softness}px rgba(40,29,18,${opacity}))`,...style}}>{children}</div>
);
