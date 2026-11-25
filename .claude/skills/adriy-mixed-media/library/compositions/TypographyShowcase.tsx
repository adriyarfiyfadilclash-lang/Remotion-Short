import React from "react";
import { AbsoluteFill } from "remotion";
import { EditorialTitle, KineticWord, HandwrittenNote, VerticalSideNote, ArchiveLabel, CutoutLetter, TypewriterCaption } from "../src";
export const MixedMediaTypographyShowcase:React.FC=()=> <AbsoluteFill style={{background:"#1b2025",overflow:"hidden"}}>
 <ArchiveLabel x={100} y={90} text="CATATAN VISUAL" subtext="ADRIY / 2026"/>
 <EditorialTitle x={100} y={210} text="GAGASAN MENJADI CERITA" width={1000} fontSize={82}/>
 <TypewriterCaption x={110} y={410} text="Setiap lapisan punya peran dalam membangun makna." delay={15}/>
 <CutoutLetter x={1180} y={180} text="IDE!" fontSize={140}/>
 <KineticWord x={1190} y={410} text="BERGERAK" fontSize={48}/>
 <HandwrittenNote x={1100} y={560} text="Catatan kecil di tepi cerita." color="#e9e1d2"/>
 <VerticalSideNote x={1770} y={170} text="MIXED MEDIA / TYPE" height={480}/>
</AbsoluteFill>;
