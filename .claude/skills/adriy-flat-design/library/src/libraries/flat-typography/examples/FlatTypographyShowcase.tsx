import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatTitleReveal, FlatKineticText, FlatLowerThird, FlatNumberCounter, FlatHighlightWord, FlatParagraphReveal } from "../src";

export const FlatTypographyShowcase:React.FC=()=> <AbsoluteFill style={{backgroundColor:"#F8FAFC"}}>
 <Sequence from={0} durationInFrames={60}><FlatTitleReveal text="IDE BESAR" accent="#2563EB"/></Sequence>
 <Sequence from={60} durationInFrames={60}><FlatKineticText text="BERGERAK DINAMIS" color="#7C3AED"/></Sequence>
 <Sequence from={120} durationInFrames={60}><FlatLowerThird name="ADRIY PROJECT" role="Fakta • Sains • Teknologi"/></Sequence>
 <Sequence from={180} durationInFrames={60}><FlatNumberCounter to={1000000} suffix="+" prefix="+" color="#16A34A"/></Sequence>
 <Sequence from={240} durationInFrames={60}><FlatHighlightWord before="INI YANG " word="MENARIK" after="!" highlight="#FDE047"/></Sequence>
 <Sequence from={300} durationInFrames={60}><FlatParagraphReveal text="Tipografi yang jelas membantu penonton memahami informasi tanpa mengalihkan perhatian dari cerita."/></Sequence>
</AbsoluteFill>;
