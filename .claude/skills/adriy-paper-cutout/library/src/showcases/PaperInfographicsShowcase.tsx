import React from "react";
import {AbsoluteFill} from "remotion";
import {PaperBarChart,PaperDonutChart,PaperTimeline,PaperProgressSteps,PaperComparison,PaperStatCard} from "../paper/infographics";

export const PaperInfographicsShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#F5EBDD",padding:60,fontFamily:"Georgia,serif",color:"#40382F"}}>
  <div style={{fontSize:42,fontWeight:700}}>Data dalam Potongan Kertas</div>
  <div style={{position:"absolute",left:60,top:135}}><PaperBarChart width={500} height={250} data={[{label:"Jan",value:42},{label:"Feb",value:67},{label:"Mar",value:53},{label:"Apr",value:86}]}/></div>
  <div style={{position:"absolute",left:650,top:140}}><PaperDonutChart size={230} data={[{label:"A",value:45,color:"#D77F69"},{label:"B",value:30,color:"#73978B"},{label:"C",value:25,color:"#E4B85E"}]}/></div>
  <div style={{position:"absolute",left:60,top:420}}><PaperTimeline width={850} events={[{time:"2000",title:"Awal"},{time:"2010",title:"Perkembangan"},{time:"2020",title:"Inovasi"}]}/></div>
  <div style={{position:"absolute",left:70,top:650}}><PaperProgressSteps width={800} steps={[{title:"Riset"},{title:"Desain"},{title:"Produksi"},{title:"Evaluasi"}]}/></div>
  <div style={{position:"absolute",right:70,top:650}}><PaperStatCard label="Pertumbuhan" value="78%" note="Contoh indikator" color="#E7C77E"/></div>
 </AbsoluteFill>
);
