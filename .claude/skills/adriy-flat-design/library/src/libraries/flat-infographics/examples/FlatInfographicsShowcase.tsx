import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatBarChart, FlatDonutChart, FlatTimeline, FlatProgressSteps, FlatComparison, FlatStatCard } from "../src";

const Frame:React.FC<{children:React.ReactNode;title:string}>=({children,title})=><AbsoluteFill style={{background:"#F1F5F9",padding:70,justifyContent:"center",gap:30,fontFamily:"Arial,sans-serif"}}>
 <div style={{fontSize:38,fontWeight:900,color:"#0F172A"}}>{title}</div>{children}
</AbsoluteFill>;

export const FlatInfographicsShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={75}><Frame title="PERTUMBUHAN PRODUKSI"><FlatBarChart data={[{label:"Jan",value:42},{label:"Feb",value:58,color:"#F97316"},{label:"Mar",value:76},{label:"Apr",value:91,color:"#16A34A"}]}/></Frame></Sequence>
 <Sequence from={75} durationInFrames={75}><Frame title="KOMPOSISI DATA"><div style={{display:"flex",justifyContent:"center"}}><FlatDonutChart data={[{label:"A",value:45,color:"#2563EB"},{label:"B",value:30,color:"#F97316"},{label:"C",value:25,color:"#16A34A"}]}/></div></Frame></Sequence>
 <Sequence from={150} durationInFrames={75}><Frame title="GARIS WAKTU"><FlatTimeline orientation="horizontal" items={[{time:"08.00",title:"Mulai"},{time:"10.00",title:"Proses"},{time:"12.00",title:"Evaluasi"},{time:"14.00",title:"Selesai"}]}/></Frame></Sequence>
 <Sequence from={225} durationInFrames={75}><Frame title="TAHAPAN PROSES"><FlatProgressSteps steps={["Riset","Desain","Produksi","Evaluasi"]} activeIndex={2}/></Frame></Sequence>
 <Sequence from={300} durationInFrames={75}><Frame title="PERBANDINGAN"><FlatComparison left={{title:"METODE A",value:"75%",details:["Lebih cepat","Biaya lebih rendah"],color:"#2563EB"}} right={{title:"METODE B",value:"92%",details:["Lebih akurat","Perlu waktu lebih lama"],color:"#F97316"}}/></Frame></Sequence>
 <Sequence from={375} durationInFrames={75}><Frame title="RINGKASAN DATA"><div style={{display:"flex",gap:20,justifyContent:"center"}}><FlatStatCard label="Total produksi" value="1.250 ton" change="+12% bulan ini"/><FlatStatCard label="Efisiensi" value="94,5%" change="+3,2%" color="#16A34A"/></div></Frame></Sequence>
</AbsoluteFill>;
