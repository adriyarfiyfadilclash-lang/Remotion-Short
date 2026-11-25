import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type EffectProps = {
  children?: React.ReactNode;
  intensity?: number;
  color?: string;
  seed?: number;
  durationInFrames?: number;
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const seeded = (n: number) => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};

export const WayangSmokeEffect: React.FC<EffectProps & { rise?: number }> = ({
  children, intensity = 0.55, color = "#8d8170", seed = 4, rise = 1,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const puffs = Array.from({ length: 13 }, (_, i) => {
    const baseX = seeded(seed + i * 3) * width;
    const baseY = height * (0.55 + seeded(seed + i * 5) * 0.42);
    const speed = 0.35 + seeded(seed + i * 7) * 0.8;
    const phase = seeded(seed + i * 11) * Math.PI * 2;
    const y = ((baseY - frame * speed * rise * 2.2) % (height + 160) + height + 160) % (height + 160) - 80;
    const x = baseX + Math.sin(frame * 0.025 + phase) * 26;
    const r = 28 + seeded(seed + i * 13) * 75;
    const opacity = intensity * (0.12 + seeded(seed + i * 17) * 0.2);
    return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={opacity} filter="url(#smokeBlur)" />;
  });
  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs><filter id="smokeBlur"><feGaussianBlur stdDeviation="22" /></filter></defs>
          {puffs}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AncientDustEffect: React.FC<EffectProps & { count?: number }> = ({
  children, intensity = 0.7, color = "#d6b77c", seed = 9, count = 45,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const dust = Array.from({ length: count }, (_, i) => {
    const x0 = seeded(seed + i * 2) * width;
    const y0 = seeded(seed + i * 3) * height;
    const speed = 0.25 + seeded(seed + i * 5) * 0.8;
    const x = (x0 + Math.sin(frame * 0.025 + i) * 16 + width) % width;
    const y = (y0 - frame * speed + height) % height;
    const r = 0.8 + seeded(seed + i * 7) * 2.3;
    const opacity = intensity * (0.25 + 0.55 * Math.abs(Math.sin(frame * 0.06 + i)));
    return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={opacity} />;
  });
  return <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none"}}>
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">{dust}</svg>
  </AbsoluteFill></AbsoluteFill>;
};

export const WarFireEffect: React.FC<EffectProps & { x?: number; y?: number; size?: number }> = ({
  children, intensity = 0.8, color = "#e85b22", x = 50, y = 88, size = 42,
}) => {
  const frame = useCurrentFrame();
  const flicker = 0.82 + Math.abs(Math.sin(frame * 0.42)) * 0.18;
  const scaleX = 0.92 + Math.sin(frame * 0.31) * 0.1;
  return <AbsoluteFill>{children}<div style={{
    position:"absolute", left:`${x}%`, top:`${y}%`, width:`${size}%`, height:`${size*1.4}%`,
    transform:`translate(-50%,-100%) scaleX(${scaleX})`, opacity:intensity*flicker,
    pointerEvents:"none", filter:"drop-shadow(0 0 24px rgba(255,92,22,.45))",
  }}>
    <svg viewBox="0 0 300 420" width="100%" height="100%" preserveAspectRatio="none">
      <path d="M150 8 C190 86 274 135 236 250 C215 322 180 389 150 410 C112 384 65 326 62 257 C23 158 115 92 150 8Z" fill={color}/>
      <path d="M154 135 C204 208 190 279 150 350 C108 298 111 219 154 135Z" fill="#ffb347"/>
      <path d="M150 232 C174 270 164 316 150 338 C133 310 130 276 150 232Z" fill="#fff0b0"/>
    </svg>
  </div></AbsoluteFill>;
};

export const ShadowParticleEffect: React.FC<EffectProps & { count?: number }> = ({
  children, intensity = 0.65, color = "#080706", seed = 21, count = 28,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const particles = Array.from({length:count},(_,i)=>{
    const x0=seeded(seed+i*4)*width, y0=seeded(seed+i*6)*height;
    const drift=Math.sin(frame*.035+i*1.7)*34;
    const x=(x0+drift+width)%width;
    const y=(y0-frame*(.15+seeded(seed+i*9)*.45)+height)%height;
    const r=2+seeded(seed+i*11)*8;
    const op=intensity*(.12+seeded(seed+i*13)*.35);
    return <ellipse key={i} cx={x} cy={y} rx={r*1.4} ry={r*.55} fill={color} opacity={op} transform={`rotate(${(frame+i*17)%180} ${x} ${y})`}/>;
  });
  return <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none"}}>
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">{particles}</svg>
  </AbsoluteFill></AbsoluteFill>;
};

export const GoldenSparkEffect: React.FC<EffectProps & { count?: number }> = ({
  children, intensity = 0.8, color = "#f2c66d", seed = 31, count = 34,
}) => {
  const frame=useCurrentFrame();
  const {width,height}=useVideoConfig();
  const sparks=Array.from({length:count},(_,i)=>{
    const x0=seeded(seed+i*2)*width, y0=seeded(seed+i*3)*height;
    const x=x0+Math.sin(frame*.06+i)*18;
    const y=(y0-frame*(.45+seeded(seed+i*5)*1.3)+height)%height;
    const blink=.25+.75*Math.abs(Math.sin(frame*.12+i*2));
    const r=1+seeded(seed+i*7)*2.6;
    return <g key={i} opacity={intensity*blink} stroke={color} strokeWidth="1.4" fill={color}>
      <circle cx={x} cy={y} r={r}/>
      <path d={`M${x} ${y-r*3} V${y+r*3} M${x-r*3} ${y} H${x+r*3}`} />
    </g>;
  });
  return <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none"}}>
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">{sparks}</svg>
  </AbsoluteFill></AbsoluteFill>;
};

export const AtmosphericFogEffect: React.FC<EffectProps & { drift?: number }> = ({
  children, intensity = 0.38, color = "#c7c0ad", drift = 1,
}) => {
  const frame=useCurrentFrame();
  const x=50+Math.sin(frame*.012)*8*drift;
  const y=72+Math.cos(frame*.009)*4;
  return <AbsoluteFill>{children}<AbsoluteFill style={{
    pointerEvents:"none",
    background:`radial-gradient(ellipse 90% 34% at ${x}% ${y}%, ${color}${Math.round(intensity*110).toString(16).padStart(2,"0")} 0%, ${color}22 42%, transparent 75%)`,
    filter:"blur(18px)",
  }}/></AbsoluteFill>;
};

export const ParchmentTextureEffect: React.FC<EffectProps & { grain?: number }> = ({
  children, intensity = 0.28, color = "#9c7848", grain = 0.45,
}) => {
  const frame=useCurrentFrame();
  const shift=(frame%12)*.7;
  return <AbsoluteFill>{children}<AbsoluteFill style={{
    pointerEvents:"none",
    backgroundImage:
      `radial-gradient(ellipse at 18% 22%, ${color}22 0%, transparent 38%),`+
      `radial-gradient(ellipse at 82% 78%, ${color}20 0%, transparent 42%),`+
      `repeating-linear-gradient(${90+shift}deg, transparent 0 3px, ${color}0d 4px, transparent 6px)`,
    opacity:intensity*grain,
    mixBlendMode:"multiply",
  }}/></AbsoluteFill>;
};
