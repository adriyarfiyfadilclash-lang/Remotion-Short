import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PaperTitle, PaperLetterByLetter, PaperLowerThird, PaperQuoteCard, PaperWordHighlight, PaperParagraph } from "../paper/typography";

const Center:React.FC<{children:React.ReactNode}>=({children})=><AbsoluteFill style={{background:"#E9E1D2",justifyContent:"center",alignItems:"center",padding:70}}>{children}</AbsoluteFill>;

export const PaperTypographyShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={55}><Center><PaperTitle text="CERITA BESAR" /></Center></Sequence>
 <Sequence from={55} durationInFrames={55}><Center><PaperLetterByLetter text="FAKTA MENARIK" /></Center></Sequence>
 <Sequence from={110} durationInFrames={55}><AbsoluteFill style={{background:"#E9E1D2",justifyContent:"flex-end",padding:80}}><PaperLowerThird name="ADRIY PROJECT" role="Sains • Sejarah • Teknologi"/></AbsoluteFill></Sequence>
 <Sequence from={165} durationInFrames={55}><Center><PaperQuoteCard quote="Hal kecil bisa membuka pemahaman yang jauh lebih besar." author="ADRIY PROJECT"/></Center></Sequence>
 <Sequence from={220} durationInFrames={55}><Center><PaperWordHighlight before="INI BAGIAN YANG " word="PENTING" after="!" /></Center></Sequence>
 <Sequence from={275} durationInFrames={55}><Center><PaperParagraph text="Setiap lapisan kertas punya peran. Ketika disusun dengan tepat, potongan sederhana bisa berubah menjadi cerita visual yang menarik."/></Center></Sequence>
</AbsoluteFill>;
