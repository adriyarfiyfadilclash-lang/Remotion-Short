import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type BaseProps = {
  text?: string;
  color?: string;
  accentColor?: string;
  durationInFrames?: number;
  style?: React.CSSProperties;
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const Flourish: React.FC<{ color: string; flip?: boolean }> = ({ color, flip = false }) => (
  <svg viewBox="0 0 420 70" width="100%" height="100%" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
    <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <path d="M8 36 C65 2 110 5 145 34 C170 55 196 56 210 35 C224 14 250 15 274 35 C310 65 350 64 412 32" />
      <path d="M24 36 C56 20 79 20 103 35 M317 36 C344 19 372 20 397 33" />
      <path d="M145 34 C155 10 183 5 210 35 C237 65 265 59 274 35" />
      <path d="M205 35 C196 20 198 10 210 5 C222 10 224 20 215 35" />
    </g>
    <g fill={color}>
      <circle cx="8" cy="36" r="3"/><circle cx="412" cy="32" r="3"/>
      <path d="M210 2 L216 12 L210 20 L204 12Z"/>
    </g>
  </svg>
);

export const NusantaraTitle: React.FC<BaseProps> = ({
  text = "KERAJAAN NUSANTARA", color = "#20150d", accentColor = "#b18a4f",
  durationInFrames = 45, style,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, durationInFrames * .35, durationInFrames], [0, 1, 1], clamp);
  const y = interpolate(frame, [0, durationInFrames], [28, 0], clamp);
  const scale = interpolate(frame, [0, durationInFrames], [.96, 1], clamp);
  return (
    <div style={{ width:"100%", textAlign:"center", opacity, transform:`translateY(${y}px) scale(${scale})`, ...style }}>
      <div style={{ height:54, maxWidth:500, margin:"0 auto 12px" }}><Flourish color={accentColor}/></div>
      <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontWeight:700,
        letterSpacing:5, fontSize:48, color, textShadow:"0 1px 0 rgba(255,255,255,.35)" }}>{text}</div>
      <div style={{ height:44, maxWidth:500, margin:"12px auto 0" }}><Flourish color={accentColor} flip/></div>
    </div>
  );
};

export const AksaraReveal: React.FC<BaseProps> = ({
  text = "Jejak Peradaban", color = "#17100a", accentColor = "#a47b43",
  durationInFrames = 60, style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], clamp);
  const width = `${p * 100}%`;
  const opacity = interpolate(frame, [0, 8, durationInFrames], [0, 1, 1], clamp);
  return (
    <div style={{ position:"relative", display:"inline-block", overflow:"hidden", opacity, ...style }}>
      <div style={{ fontFamily:"'Palatino Linotype', 'Book Antiqua', Georgia, serif", fontStyle:"italic",
        fontSize:42, color, letterSpacing:1.2, whiteSpace:"nowrap" }}>{text}</div>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width, overflow:"hidden", whiteSpace:"nowrap",
        color:accentColor, borderRight:`2px solid ${accentColor}` }}>
        <span style={{ fontFamily:"'Palatino Linotype', 'Book Antiqua', Georgia, serif", fontStyle:"italic",
          fontSize:42, letterSpacing:1.2 }}>{text}</span>
      </div>
    </div>
  );
};

export const RoyalNameplate: React.FC<BaseProps> = ({
  text = "MAJAPAHIT", color = "#f2dfb8", accentColor = "#bd9454", style,
}) => (
  <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", minWidth:360,
    padding:"18px 42px", color, background:"linear-gradient(180deg,#392515,#1b110a)",
    border:`2px solid ${accentColor}`, outline:`1px solid ${accentColor}`, outlineOffset:5,
    boxShadow:"0 8px 22px rgba(0,0,0,.25)", ...style }}>
    <span style={{ fontFamily:"Georgia,serif", fontSize:34, fontWeight:700, letterSpacing:6 }}>{text}</span>
  </div>
);

export const InscriptionText: React.FC<BaseProps> = ({
  text = "SRI MAHARAJA", color = "#3b2918", accentColor = "#a67b43",
  durationInFrames = 50, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], clamp);
  const chars = Math.max(0, Math.floor(text.length * progress));
  return (
    <div style={{ display:"inline-block", padding:"16px 24px", background:"#e7d6b4",
      border:"1px solid #a98a5d", boxShadow:"inset 0 0 20px rgba(92,59,24,.16)",
      fontFamily:"Georgia,serif", fontSize:30, letterSpacing:3, color, ...style }}>
      <div style={{fontSize:11,letterSpacing:5,color:accentColor,marginBottom:8}}>PRASASTI • CATATAN SEJARAH</div>
      {text.slice(0, chars)}
      <span style={{opacity: frame % Math.max(1, Math.round(fps/2)) < fps/4 ? 1 : 0, color:accentColor}}>▍</span>
    </div>
  );
};

export const ManuscriptCaption: React.FC<BaseProps> = ({
  text = "Catatan perjalanan dari masa ke masa.", color = "#392b1b",
  accentColor = "#9a7545", style,
}) => (
  <div style={{ display:"inline-block", maxWidth:760, padding:"18px 26px",
    background:"linear-gradient(135deg,rgba(245,231,199,.96),rgba(222,202,163,.94))",
    borderLeft:`5px solid ${accentColor}`, color, fontFamily:"Georgia,serif",
    fontSize:25, lineHeight:1.55, fontStyle:"italic",
    boxShadow:"0 5px 18px rgba(45,27,10,.16)", ...style }}>
    {text}
  </div>
);

export const DateSeal: React.FC<BaseProps> = ({
  text = "1293 M", color = "#20150d", accentColor = "#a77b3e", durationInFrames = 35, style,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames * .7, durationInFrames], [1.7, .94, 1], clamp);
  const opacity = interpolate(frame, [0, 5, durationInFrames], [0, 1, 1], clamp);
  return (
    <div style={{ width:142, height:142, border:`3px double ${accentColor}`, borderRadius:"50%",
      display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center",
      color, opacity, transform:`rotate(-8deg) scale(${scale})`,
      background:"radial-gradient(circle,#ead8b4,#c9ad7d)", boxShadow:"0 4px 12px rgba(0,0,0,.2)", ...style }}>
      <div style={{border:`1px solid ${accentColor}`,borderRadius:"50%",width:112,height:112,
        display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",
        fontWeight:700,fontSize:25,letterSpacing:1}}>{text}</div>
    </div>
  );
};

export const ChapterHeading: React.FC<BaseProps> = ({
  text = "BABAK I — AWAL MULA", color = "#f1dfbd", accentColor = "#c29a5c",
  durationInFrames = 40, style,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const reveal = interpolate(frame, [0, durationInFrames], [0, width], clamp);
  return (
    <div style={{ width:"100%", color, textAlign:"center", fontFamily:"Georgia,serif", ...style }}>
      <div style={{ width:reveal, height:2, background:accentColor, margin:"0 auto 15px" }}/>
      <div style={{ fontSize:35, letterSpacing:4, fontWeight:700 }}>{text}</div>
      <div style={{ fontSize:13, letterSpacing:6, color:accentColor, marginTop:12 }}>SEJARAH • NUSANTARA • WARISAN</div>
    </div>
  );
};

export const CalligraphyPanel: React.FC<{ children?: React.ReactNode; background?: string }> = ({
  children, background = "#e8d7b4",
}) => (
  <AbsoluteFill style={{ background, backgroundImage:
    "radial-gradient(ellipse at 20% 20%,rgba(255,255,255,.35),transparent 45%), repeating-linear-gradient(0deg,transparent 0 5px,rgba(90,61,28,.025) 6px 7px)",
    justifyContent:"center", alignItems:"center", overflow:"hidden" }}>
    {children}
  </AbsoluteFill>
);
