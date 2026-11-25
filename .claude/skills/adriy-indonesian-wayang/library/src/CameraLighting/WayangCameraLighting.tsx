import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; intensity?: number; color?: string; x?: number; y?: number; size?: number };
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const OilLampLighting: React.FC<Props> = ({children,intensity=.7,color="#ffb84d",x=50,y=48,size=65}) => {
 const f=useCurrentFrame(), flicker=.94+Math.sin(f*.31)*.035+Math.sin(f*.77)*.02;
 const a=Math.max(0,Math.min(1,intensity*flicker));
 return <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none",background:`radial-gradient(ellipse ${size}% ${size*.72}% at ${x}% ${y}%, ${color}${Math.round(a*75).toString(16).padStart(2,"0")} 0%, ${color}22 34%, transparent 72%)`,mixBlendMode:"screen"}}/></AbsoluteFill>;
};

export const FlickeringFlame: React.FC<Props> = ({intensity=1,color="#ffb34f",x=50,y=50,size=90}) => {
 const f=useCurrentFrame(), flicker=.82+Math.abs(Math.sin(f*.48))*.18, stretch=1+Math.sin(f*.34)*.08;
 return <div style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:size,height:size*1.5,transform:`translate(-50%,-50%) scaleY(${stretch})`,opacity:intensity*flicker,pointerEvents:"none"}}>
 <svg viewBox="0 0 100 150" width="100%" height="100%"><path d="M50 5 C68 35 88 50 75 91 C69 116 59 137 50 145 C39 132 24 116 24 91 C10 58 36 34 50 5Z" fill={color}/><path d="M51 54 C66 76 62 92 50 119 C38 100 37 82 51 54Z" fill="#fff0b0"/></svg></div>;
};

export const KelirShadowLighting: React.FC<Props> = ({children,intensity=.65,color="#fff0ce",x=50,y=50,size=80}) => (
 <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none",background:`radial-gradient(ellipse ${size}% ${size}% at ${x}% ${y}%, ${color}${Math.round(intensity*95).toString(16).padStart(2,"0")} 0%, rgba(255,245,220,${intensity*.28}) 38%, rgba(20,12,5,.16) 100%)`,mixBlendMode:"screen"}}/></AbsoluteFill>
);

type CameraProps = {children?:React.ReactNode;zoom?:number;panX?:number;panY?:number;rotation?:number;durationInFrames?:number;startZoom?:number;endZoom?:number};
export const WayangCameraRig: React.FC<CameraProps> = ({children,zoom=1,panX=0,panY=0,rotation=0,durationInFrames=90,startZoom,endZoom}) => {
 const f=useCurrentFrame(), z=startZoom!==undefined&&endZoom!==undefined?interpolate(f,[0,durationInFrames],[startZoom,endZoom],clamp):zoom;
 const p=interpolate(f,[0,durationInFrames],[0,1],clamp);
 return <AbsoluteFill style={{overflow:"hidden",transform:`translate(${panX*p}px,${panY*p}px) scale(${z}) rotate(${rotation*p}deg)`,transformOrigin:"50% 50%"}}>{children}</AbsoluteFill>;
};

type ShadowProps = Props & {blur?:number;offsetX?:number;offsetY?:number};
export const ShadowDepthLayer: React.FC<ShadowProps> = ({children,intensity=.45,color="#080604",blur=12,offsetX=12,offsetY=9}) => (
 <AbsoluteFill style={{pointerEvents:"none"}}><div style={{position:"absolute",inset:0,filter:`drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${color})`,opacity:Math.max(0,Math.min(1,intensity))}}>{children}</div></AbsoluteFill>
);

type BeamProps = Props & {angle?:number;softness?:number};
export const WarmLightBeam: React.FC<BeamProps> = ({intensity=.35,color="#ffd28a",x=50,y=0,size=65,angle=0,softness=22}) => (
 <AbsoluteFill style={{pointerEvents:"none",overflow:"hidden"}}><div style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:`${size}%`,height:"130%",transform:`translateX(-50%) rotate(${angle}deg)`,transformOrigin:"top center",background:`linear-gradient(180deg, ${color}00 0%, ${color}${Math.round(intensity*80).toString(16).padStart(2,"0")} 25%, ${color}00 100%)`,filter:`blur(${softness}px)`,opacity:intensity}}/></AbsoluteFill>
);

type FocusProps = Props & {focusX?:number;focusY?:number;vignette?:number};
export const CinematicWayangFocus: React.FC<FocusProps> = ({children,intensity=.65,color="#070503",focusX=50,focusY=48,vignette=.7}) => {
 const f=useCurrentFrame(), pulse=.96+Math.sin(f*.08)*.04;
 return <AbsoluteFill>{children}<AbsoluteFill style={{pointerEvents:"none",background:`radial-gradient(ellipse 48% 42% at ${focusX}% ${focusY}%, transparent 0%, transparent 42%, ${color}${Math.round(vignette*190).toString(16).padStart(2,"0")} 100%)`,opacity:Math.min(1,intensity*pulse)}}/></AbsoluteFill>;
};
