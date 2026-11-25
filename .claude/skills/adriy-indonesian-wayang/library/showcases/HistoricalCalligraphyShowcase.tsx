import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  CalligraphyPanel, NusantaraTitle, AksaraReveal, RoyalNameplate,
  InscriptionText, ManuscriptCaption, DateSeal, ChapterHeading,
} from "../src/index";

const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const index = Math.floor(frame / 75) % 7;
  const center: React.CSSProperties = { display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%" };
  const scenes = [
    <NusantaraTitle text="KERAJAAN SRIWIJAYA" />,
    <AksaraReveal text="Jejak Peradaban Nusantara" />,
    <RoyalNameplate text="MAJAPAHIT" />,
    <InscriptionText text="SRI MAHARAJA JAYANEGARA" />,
    <ManuscriptCaption text="Dari pesisir hingga pedalaman, jalur perdagangan menghubungkan berbagai kerajaan Nusantara." />,
    <DateSeal text="1293 M" />,
    <ChapterHeading text="BABAK I — AWAL MULA" />,
  ];
  return (
    <CalligraphyPanel>
      <AbsoluteFill style={center}>
        <div style={{position:"absolute",top:55,fontFamily:"Georgia,serif",fontSize:18,
          color:"#87643a",letterSpacing:7}}>ADRIY.PROJECT • HISTORICAL CALLIGRAPHY</div>
        {scenes[index]}
        <div style={{position:"absolute",bottom:55,fontFamily:"Georgia,serif",fontSize:15,
          color:"#98784c",letterSpacing:3}}>NASKAH • PRASASTI • WARISAN NUSANTARA</div>
      </AbsoluteFill>
    </CalligraphyPanel>
  );
};

export const HistoricalCalligraphyShowcase: React.FC = () => <Showcase />;
