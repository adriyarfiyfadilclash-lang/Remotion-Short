import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Point = { x: number; y: number };
type WayangRodProps = {
  start: Point; end: Point; color?: string; width?: number; opacity?: number;
};

export const WayangRod: React.FC<WayangRodProps> = ({
  start, end, color = "#21180f", width = 5, opacity = 1,
}) => (
  <line x1={start.x} y1={start.y} x2={end.x} y2={end.y}
    stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
);

type WayangArmProps = {
  side?: "left" | "right";
  shoulder?: Point;
  elbow?: Point;
  hand?: Point;
  rod?: boolean;
  skin?: string;
  lineWidth?: number;
};

export const WayangArm: React.FC<WayangArmProps> = ({
  side = "right", shoulder = { x: 0, y: 0 }, elbow = { x: 0, y: 40 },
  hand = { x: 12, y: 75 }, rod = true, skin = "#080808", lineWidth = 13,
}) => {
  const sign = side === "left" ? -1 : 1;
  // Coordinates are supplied in the puppet's local SVG space; preserve their side.
  const s = shoulder;
  const e = elbow;
  const h = hand;
  return (
    <g>
      <path d={`M ${s.x} ${s.y} Q ${e.x - sign * 7} ${e.y - 8} ${e.x} ${e.y} L ${h.x} ${h.y}`}
        fill="none" stroke={skin} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" />
      {rod && <WayangRod start={{ x: h.x, y: h.y + 2 }} end={{ x: h.x + sign * 8, y: h.y + 102 }} width={3} />}
      <circle cx={h.x} cy={h.y} r={7} fill={skin} />
    </g>
  );
};

type PuppetProps = {
  x?: number; y?: number; scale?: number; rotation?: number;
  showRods?: boolean; showOrnaments?: boolean; silhouette?: string;
  armLeftAngle?: number; armRightAngle?: number;
};

export const WayangPuppet: React.FC<PuppetProps> = ({
  x = 0, y = 0, scale = 1, rotation = 0, showRods = true,
  showOrnaments = true, silhouette = "#050505", armLeftAngle = -8, armRightAngle = 12,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotation})`} fill={silhouette}>
    {/* Main body and traditional elongated profile */}
    <path d="M-13 -145 C-30 -134 -34 -111 -29 -87 L-24 -48
      C-38 -28 -42 4 -36 36 L-29 83 L-15 83 L-10 37
      L0 61 L10 37 L15 83 L29 83 L36 36 C42 4 38 -28 24 -48
      L29 -87 C34 -111 30 -134 13 -145 Z" />
    {/* Head, crown and nose profile */}
    <path d="M-12 -151 C-23 -166 -19 -190 -4 -198 C8 -204 20 -192 18 -177
      L29 -169 L17 -164 C21 -151 13 -143 0 -141 Z" />
    <path d="M-15 -195 L-21 -220 L-8 -211 L-3 -235 L8 -211 L20 -222 L15 -195 Z" />
    <path d="M17 -178 L37 -170 L18 -166 Z" />
    {/* Shoulder ornaments */}
    <path d="M-29 -112 L-48 -124 L-42 -103 L-55 -94 L-27 -91 Z" />
    <path d="M29 -112 L48 -124 L42 -103 L55 -94 L27 -91 Z" />
    {/* Decorative cutout-like engraving details */}
    {showOrnaments && (
      <g fill="none" stroke="#f0e4c9" strokeWidth="2.1" opacity=".92">
        <path d="M-13 -183 Q-2 -190 10 -181 M-14 -175 Q0 -168 14 -175" />
        <path d="M-20 -128 Q0 -112 20 -128 M-22 -117 Q0 -101 22 -117" />
        <path d="M-22 -77 Q0 -62 22 -77 M-26 -55 Q0 -40 26 -55" />
        <path d="M-17 -25 Q0 -10 17 -25 M-19 2 Q0 18 19 2" />
        <circle cx="0" cy="-91" r="7" />
        <path d="M-8 28 L-15 67 M8 28 L15 67" />
      </g>
    )}
    {/* Arms rotate from shoulders */}
    <g transform={`rotate(${armLeftAngle} -25 -108)`}>
      <WayangArm side="left" shoulder={{x:-25,y:-108}} elbow={{x:-48,y:-79}} hand={{x:-52,y:-47}} rod={showRods} skin={silhouette} lineWidth={10} />
    </g>
    <g transform={`rotate(${armRightAngle} 25 -108)`}>
      <WayangArm side="right" shoulder={{x:25,y:-108}} elbow={{x:48,y:-79}} hand={{x:52,y:-47}} rod={showRods} skin={silhouette} lineWidth={10} />
    </g>
    {/* Gapit: central support rod */}
    {showRods && <WayangRod start={{x:0,y:45}} end={{x:0,y:190}} width={6} />}
  </g>
);

type WayangRigProps = {
  children?: React.ReactNode;
  x?: number; y?: number; scale?: number; showRods?: boolean;
  showOrnaments?: boolean; armLeftAngle?: number; armRightAngle?: number;
  rotation?: number;
};

export const WayangRig: React.FC<WayangRigProps> = ({
  children, x = 0, y = 0, scale = 1, showRods = true, showOrnaments = true,
  armLeftAngle = -8, armRightAngle = 12, rotation = 0,
}) => (
  <svg viewBox="-180 -250 360 500" width="100%" height="100%" style={{overflow:"visible"}}>
    {children}
    <WayangPuppet x={x} y={y} scale={scale} rotation={rotation} showRods={showRods}
      showOrnaments={showOrnaments} armLeftAngle={armLeftAngle} armRightAngle={armRightAngle} />
  </svg>
);

type MotionProps = PuppetProps & { durationInFrames?: number; children?: React.ReactNode };

export const WayangWalk: React.FC<MotionProps> = ({
  durationInFrames, x = 0, y = 0, scale = 1, showRods = true, showOrnaments = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = durationInFrames ?? fps * 3;
  const phase = (frame % duration) / duration;
  const bob = Math.sin(phase * Math.PI * 4) * 5;
  const sway = Math.sin(phase * Math.PI * 2) * 5;
  return <WayangRig x={x + sway} y={y + bob} scale={scale} showRods={showRods}
    showOrnaments={showOrnaments} armLeftAngle={-18 + Math.sin(phase* Math.PI*4)*12}
    armRightAngle={18 - Math.sin(phase*Math.PI*4)*12} />;
};

type GestureProps = PuppetProps & {
  gesture?: "point" | "greet" | "speak" | "neutral";
  durationInFrames?: number;
};

export const WayangGesture: React.FC<GestureProps> = ({
  gesture = "point", durationInFrames, x = 0, y = 0, scale = 1,
  showRods = true, showOrnaments = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = durationInFrames ?? fps * 2;
  const t = (frame % duration) / duration;
  const wave = Math.sin(t * Math.PI * 2);
  const right = gesture === "point" ? -58 + wave * 3
    : gesture === "greet" ? -35 + wave * 32
    : gesture === "speak" ? 8 + wave * 17 : 12;
  const left = gesture === "speak" ? -8 - wave * 8 : -8;
  return <WayangRig x={x} y={y} scale={scale} showRods={showRods}
    showOrnaments={showOrnaments} armLeftAngle={left} armRightAngle={right} />;
};

type BattleProps = PuppetProps & {
  intensity?: number; durationInFrames?: number;
};

export const WayangBattlePose: React.FC<BattleProps> = ({
  intensity = 1, durationInFrames, x = 0, y = 0, scale = 1,
  showRods = true, showOrnaments = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = durationInFrames ?? fps * 1.6;
  const hit = Math.sin((frame / duration) * Math.PI * 2);
  const recoil = interpolate(hit, [-1, 1], [-8, 12]) * intensity;
  return <WayangRig x={x + recoil * .35} y={y} scale={scale}
    rotation={hit * 2 * intensity} showRods={showRods} showOrnaments={showOrnaments}
    armLeftAngle={-48 + hit * 12} armRightAngle={-65 - hit * 15} />;
};

// Simple stage backdrop for the showcase; keep the puppet silhouette dominant.
export const WayangStage: React.FC<{ children?: React.ReactNode; warmLight?: boolean }> = ({
  children, warmLight = true,
}) => (
  <AbsoluteFill style={{
    background: "radial-gradient(ellipse at 50% 44%, #fff9e9 0%, #f1e5c9 68%, #d4bd91 100%)",
    overflow: "hidden",
  }}>
    {warmLight && <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 45%, rgba(255,190,91,.22), transparent 58%)",
      mixBlendMode: "screen",
    }} />}
    {children}
  </AbsoluteFill>
);
