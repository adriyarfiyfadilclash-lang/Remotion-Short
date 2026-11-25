import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type CommonProps = {
  children?: React.ReactNode;
  durationInFrames?: number;
  color?: string;
  backgroundColor?: string;
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const Gunungan: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const scale = interpolate(progress, [0, .5, 1], [.15, 1.12, .15], clamp);
  const opacity = interpolate(progress, [0, .12, .82, 1], [0, 1, 1, 0], clamp);
  return (
    <svg viewBox="0 0 500 700" width="100%" height="100%" style={{ overflow: "visible" }}>
      <g transform={`translate(250 350) scale(${scale}) translate(-250 -350)`} opacity={opacity}>
        <path d="M250 25 C220 90 170 120 155 190 C95 210 85 285 105 340
          C65 390 95 465 150 490 C155 565 205 620 250 675
          C295 620 345 565 350 490 C405 465 435 390 395 340
          C415 285 405 210 345 190 C330 120 280 90 250 25Z"
          fill={color} stroke="#c49a5a" strokeWidth="8"/>
        <path d="M250 80 C225 145 190 175 185 230 C140 260 145 320 175 350
          C145 410 185 465 225 480 L250 615 L275 480 C315 465 355 410 325 350
          C355 320 360 260 315 230 C310 175 275 145 250 80Z"
          fill="none" stroke="#d9b879" strokeWidth="5"/>
        <g fill="none" stroke="#d9b879" strokeWidth="4">
          <path d="M250 115 Q205 170 250 215 Q295 170 250 115Z"/>
          <path d="M175 265 Q250 220 325 265 M160 365 Q250 315 340 365"/>
          <path d="M175 430 Q250 390 325 430 M210 500 Q250 470 290 500"/>
          <circle cx="250" cy="290" r="34"/>
          <path d="M250 255 L250 325 M215 290 L285 290"/>
        </g>
      </g>
    </svg>
  );
};

const Base: React.FC<CommonProps & { render: (p: number) => React.ReactNode }> = ({
  children, durationInFrames, backgroundColor = "#f4ead5", render,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = durationInFrames ?? fps * 2;
  const p = Math.min(1, Math.max(0, frame / Math.max(1, duration)));
  return (
    <AbsoluteFill style={{ backgroundColor, overflow: "hidden" }}>
      {children}
      {render(p)}
    </AbsoluteFill>
  );
};

export const GununganWipeTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#090807", backgroundColor,
}) => (
  <Base durationInFrames={durationInFrames} backgroundColor={backgroundColor} render={(p) => (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ width: "70%", height: "115%", transform: `translateY(${interpolate(p,[0,.5,1],[115,0,-115],clamp)}%)` }}>
        <Gunungan progress={p} color={color} />
      </div>
    </AbsoluteFill>
  )}>{children}</Base>
);

export const KelirRevealTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#100d09", backgroundColor = "#f4ead5",
}) => (
  <Base durationInFrames={durationInFrames} backgroundColor={backgroundColor} render={(p) => {
    const width = interpolate(p, [0, 1], [100, 0], clamp);
    return <AbsoluteFill style={{ backgroundColor: color, clipPath: `inset(0 ${width}% 0 0)`, pointerEvents:"none" }} />;
  }}>{children}</Base>
);

export const WayangShadowPassTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#050505",
}) => (
  <Base durationInFrames={durationInFrames} render={(p) => {
    const x = interpolate(p, [0, 1], [-120, 120], clamp);
    return <AbsoluteFill style={{ pointerEvents:"none" }}>
      <div style={{ position:"absolute", top:"8%", left:`${x}%`, width:"38%", height:"84%",
        background:color, clipPath:"polygon(50% 0,65% 18%,100% 28%,74% 45%,94% 70%,58% 100%,35% 78%,0 62%,28% 40%,8% 18%)",
        filter:"drop-shadow(18px 8px 10px rgba(0,0,0,.18))" }} />
    </AbsoluteFill>;
  }}>{children}</Base>
);

export const OilLampFadeTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#f3b75e",
}) => (
  <Base durationInFrames={durationInFrames} backgroundColor="#100b06" render={(p) => {
    const glow = Math.sin(p * Math.PI);
    const opacity = interpolate(p, [0,.18,.5,.82,1], [0,.9,.18,.9,0], clamp);
    return <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 48%, rgba(255,190,95,${.18 + glow*.28}), rgba(12,8,4,.96))`,
      opacity, mixBlendMode:"screen", pointerEvents:"none" }}>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 50%, ${color}55, transparent 55%)` }} />
    </AbsoluteFill>;
  }}>{children}</Base>
);

export const BatikCurtainTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#17100b",
}) => (
  <Base durationInFrames={durationInFrames} render={(p) => {
    const shift = interpolate(p, [0,1], [0,105], clamp);
    const panel = (side: "left"|"right") => ({
      position:"absolute" as const, top:0, bottom:0, width:"52%",
      [side]: `${interpolate(p,[0,1],[0, side==="left" ? -55 : -55],clamp)}%`,
      transform: `translateX(${side==="left" ? -shift : shift}%)`,
      backgroundColor:color,
      backgroundImage:"repeating-linear-gradient(90deg, transparent 0 22px, rgba(207,166,94,.22) 23px 25px), repeating-linear-gradient(0deg, transparent 0 48px, rgba(207,166,94,.16) 49px 51px)",
      borderLeft:"2px solid #b98b4b", borderRight:"2px solid #b98b4b",
    });
    return <AbsoluteFill style={{ pointerEvents:"none" }}>
      <div style={panel("left")} />
      <div style={panel("right")} />
    </AbsoluteFill>;
  }}>{children}</Base>
);

export const KeratonArchTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#090807",
}) => (
  <Base durationInFrames={durationInFrames} render={(p) => {
    const inset = interpolate(p, [0,.5,1], [0,22,100], clamp);
    return <AbsoluteFill style={{ pointerEvents:"none", background:color,
      clipPath:`polygon(0 0,100% 0,100% 100%,0 100%,0 0)`,
      maskImage:`radial-gradient(ellipse ${100-inset*.8}% ${100-inset*.65}% at 50% 50%, transparent 0 48%, black 50%)`,
      opacity: interpolate(p,[0,.1,.9,1],[1,1,1,0],clamp) }} />;
  }}>{children}</Base>
);

export const WayangChapterTransition: React.FC<CommonProps> = ({
  children, durationInFrames, color = "#080706", backgroundColor = "#f4ead5",
}) => (
  <Base durationInFrames={durationInFrames} backgroundColor={backgroundColor} render={(p) => {
    const opacity = interpolate(p,[0,.15,.85,1],[0,1,1,0],clamp);
    const scale = interpolate(p,[0,.5,1],[.72,1,.72],clamp);
    return <AbsoluteFill style={{ alignItems:"center", justifyContent:"center", background:"rgba(12,8,4,.94)",
      opacity, pointerEvents:"none" }}>
      <div style={{ width:300, height:420, transform:`scale(${scale})` }}>
        <Gunungan progress={.5} color={color} />
      </div>
      <div style={{ position:"absolute", bottom:"14%", color:"#e5c58e", fontFamily:"serif",
        letterSpacing:8, fontSize:24 }}>BABAK BERIKUTNYA</div>
    </AbsoluteFill>;
  }}>{children}</Base>
);
