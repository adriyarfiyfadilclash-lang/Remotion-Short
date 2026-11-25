import React from "react";
import { AbsoluteFill } from "remotion";
import {
  GununganAsset, KeratonAsset, CandiAsset, NusantaraShipAsset,
  TraditionalWeaponAsset, RoyalBannerAsset, HistoricalVillageAsset,
} from "../src/index";

const Tile: React.FC<{title:string; children:React.ReactNode}> = ({title,children}) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    border:"1px solid rgba(174,137,80,.55)",background:"rgba(246,235,211,.78)",padding:14,gap:8}}>
    <div style={{fontFamily:"Georgia,serif",fontSize:18,color:"#4a321b",letterSpacing:2}}>{title}</div>
    <div style={{width:"100%",height:220}}>{children}</div>
  </div>
);

export const NusantaraAssetsShowcase: React.FC = () => (
  <AbsoluteFill style={{background:"radial-gradient(ellipse,#fff9eb,#e1cfaa)",padding:55,
    display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"1fr 1fr",gap:18}}>
    <Tile title="GUNUNGAN"><GununganAsset/></Tile>
    <Tile title="KERATON"><KeratonAsset/></Tile>
    <Tile title="CANDI"><CandiAsset/></Tile>
    <Tile title="KAPAL NUSANTARA"><NusantaraShipAsset/></Tile>
    <Tile title="SENJATA"><TraditionalWeaponAsset weapon="keris"/></Tile>
    <Tile title="PANJI KERAJAAN"><RoyalBannerAsset/></Tile>
    <Tile title="PERKAMPUNGAN"><HistoricalVillageAsset/></Tile>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",
      color:"#6e4d28",fontSize:24,textAlign:"center",letterSpacing:3}}>
      ASET VISUAL<br/>SEJARAH NUSANTARA
    </div>
  </AbsoluteFill>
);
