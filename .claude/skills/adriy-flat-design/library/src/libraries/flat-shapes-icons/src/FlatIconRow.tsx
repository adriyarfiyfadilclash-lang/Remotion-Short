import React from "react";
import { FlatIconBadge } from "./FlatIconBadge";

type Item={name:"check"|"plus"|"close"|"play"|"pause"|"star"|"info"|"search";label:string;color?:string;background?:string};
type Props={items:Item[];size?:number;gap?:number};
export const FlatIconRow:React.FC<Props>=({items,size=76,gap=28})=><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap,flexWrap:"wrap"}}>
 {items.map((item,i)=><FlatIconBadge key={`${item.name}-${i}`} name={item.name} label={item.label} size={size} color={item.color} background={item.background}/>)}
</div>;
