import React from "react";

type AssetProps = {
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
  accentColor?: string;
  opacity?: number;
  style?: React.CSSProperties;
};

const Wrap: React.FC<AssetProps & { children: React.ReactNode }> = ({
  x=0, y=0, scale=1, opacity=1, style, children,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} style={style}>
    {children}
  </g>
);

export const GununganAsset: React.FC<AssetProps> = ({
  x=0,y=0,scale=1,color="#050505",accentColor="#d4b477",opacity=1,
}) => (
  <svg viewBox="0 0 300 420" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M150 12 C130 58 92 82 86 130 C42 155 43 210 68 239
        C44 284 77 335 119 346 C124 374 139 394 150 408
        C161 394 176 374 181 346 C223 335 256 284 232 239
        C257 210 258 155 214 130 C208 82 170 58 150 12Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M150 43 C126 88 111 107 110 147 C80 173 91 213 112 236
        C91 274 119 310 145 320 L150 374 L155 320 C181 310 209 274 188 236
        C209 213 220 173 190 147 C189 107 174 88 150 43Z"
        fill="none" stroke={accentColor} strokeWidth="3"/>
      <g fill="none" stroke={accentColor} strokeWidth="3">
        <path d="M150 72 Q111 113 150 145 Q189 113 150 72Z"/>
        <path d="M95 177 Q150 143 205 177 M91 246 Q150 211 209 246"/>
        <path d="M112 292 Q150 267 188 292"/>
        <circle cx="150" cy="203" r="19"/>
        <path d="M150 184 V222 M131 203 H169"/>
      </g>
    </Wrap>
  </svg>
);

export const KeratonAsset: React.FC<AssetProps> = ({
  x=0,y=0,scale=1,color="#080807",accentColor="#c8a568",opacity=1,
}) => (
  <svg viewBox="0 0 620 360" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M35 330 V150 L95 105 L155 150 V330Z M465 330 V150 L525 105 L585 150 V330Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M155 330 V105 L220 62 L285 105 V330 M335 330 V105 L400 62 L465 105 V330"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M230 330 V190 Q310 80 390 190 V330Z" fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M15 150 L95 88 L175 150 M135 105 L220 45 L305 105 M315 105 L400 45 L485 105 M445 150 L525 88 L605 150"
        fill="none" stroke={accentColor} strokeWidth="7" strokeLinejoin="round"/>
      <g fill="none" stroke={accentColor} strokeWidth="4">
        <path d="M70 180 H120 V260 H70Z M500 180 H550 V260 H500Z"/>
        <path d="M185 140 H255 V220 H185Z M365 140 H435 V220 H365Z"/>
        <path d="M265 245 Q310 180 355 245"/>
        <path d="M25 330 H595"/>
      </g>
      <g fill={accentColor}>
        <circle cx="95" cy="95" r="7"/><circle cx="220" cy="50" r="7"/>
        <circle cx="400" cy="50" r="7"/><circle cx="525" cy="95" r="7"/>
      </g>
    </Wrap>
  </svg>
);

export const CandiAsset: React.FC<AssetProps> = ({
  x=0,y=0,scale=1,color="#090807",accentColor="#c9a56b",opacity=1,
}) => (
  <svg viewBox="0 0 420 460" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M55 420 H365 L340 390 H80Z M85 390 H335 L315 355 H105Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M115 355 V220 L145 190 V145 L175 115 V75 L210 25 L245 75 V115 L275 145 V190 L305 220 V355Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M145 355 V260 Q210 190 275 260 V355Z" fill="none" stroke={accentColor} strokeWidth="5"/>
      <path d="M175 145 H245 M145 190 H275 M115 220 H305 M90 390 H330"
        stroke={accentColor} strokeWidth="4" fill="none"/>
      <g fill="none" stroke={accentColor} strokeWidth="3">
        <path d="M185 95 Q210 65 235 95 M170 160 Q210 130 250 160"/>
        <path d="M130 235 H160 V275 H130Z M260 235 H290 V275 H260Z"/>
        <path d="M180 310 Q210 270 240 310"/>
      </g>
    </Wrap>
  </svg>
);

export const NusantaraShipAsset: React.FC<AssetProps> = ({
  x=0,y=0,scale=1,color="#070706",accentColor="#c9a66c",opacity=1,
}) => (
  <svg viewBox="0 0 560 360" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M35 250 Q280 315 525 250 L465 320 Q280 355 95 320Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <path d="M280 40 V270 M280 55 L125 205 H280Z M295 75 L455 205 H295Z"
        fill={color} stroke={accentColor} strokeWidth="5" strokeLinejoin="round"/>
      <path d="M280 45 V260" stroke={accentColor} strokeWidth="6"/>
      <path d="M125 205 H455 M85 275 Q280 310 475 275"
        fill="none" stroke={accentColor} strokeWidth="4"/>
      <g fill="none" stroke={accentColor} strokeWidth="3">
        <path d="M150 275 L170 305 M220 285 L230 315 M300 290 L300 320 M380 285 L370 315"/>
        <path d="M110 215 Q280 240 450 215"/>
      </g>
      <path d="M280 18 L265 43 H295Z" fill={accentColor}/>
    </Wrap>
  </svg>
);

export const TraditionalWeaponAsset: React.FC<AssetProps & {
  weapon?: "keris" | "spear" | "sword";
}> = ({
  x=0,y=0,scale=1,color="#080807",accentColor="#c9a66c",opacity=1,weapon="keris",
}) => (
  <svg viewBox="0 0 220 460" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      {weapon === "keris" ? <>
        <path d="M110 55 C70 85 145 115 100 150 C65 185 145 210 105 245
          L120 340 L140 245 C100 210 180 185 145 150 C100 115 175 85 110 55Z"
          fill={color} stroke={accentColor} strokeWidth="4"/>
        <path d="M105 340 H145 L155 370 H95Z M110 370 V420 H140 V370Z"
          fill={color} stroke={accentColor} strokeWidth="4"/>
        <path d="M110 80 Q140 115 110 145 Q80 175 120 205 Q150 230 120 270"
          fill="none" stroke={accentColor} strokeWidth="3"/>
      </> : weapon === "spear" ? <>
        <path d="M110 15 L150 105 L110 95 L70 105Z" fill={color} stroke={accentColor} strokeWidth="4"/>
        <path d="M110 95 V435" stroke={color} strokeWidth="13"/>
        <path d="M110 95 V435" stroke={accentColor} strokeWidth="2"/>
        <path d="M82 120 H138" stroke={accentColor} strokeWidth="4"/>
      </> : <>
        <path d="M110 20 L150 105 L135 285 H85 L70 105Z" fill={color} stroke={accentColor} strokeWidth="4"/>
        <path d="M55 285 H165 L150 305 H70Z M95 305 V425 H125 V305Z"
          fill={color} stroke={accentColor} strokeWidth="4"/>
        <path d="M110 45 V275" stroke={accentColor} strokeWidth="3"/>
      </>}
    </Wrap>
  </svg>
);

export const RoyalBannerAsset: React.FC<AssetProps & {
  emblem?: "sun" | "flower" | "diamond";
}> = ({
  x=0,y=0,scale=1,color="#080807",accentColor="#c9a66c",opacity=1,emblem="sun",
}) => (
  <svg viewBox="0 0 360 420" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M55 20 V400" stroke={accentColor} strokeWidth="8"/>
      <path d="M55 35 H300 V260 L250 235 L200 260 L150 235 L100 260 L55 235Z"
        fill={color} stroke={accentColor} strokeWidth="5"/>
      <g transform="translate(178 145)" fill="none" stroke={accentColor} strokeWidth="5">
        {emblem === "sun" ? <>
          <circle r="42"/><circle r="24"/>
          {Array.from({length:12},(_,i)=><path key={i} d="M0 -55 V-72" transform={`rotate(${i*30})`}/>)}
        </> : emblem === "flower" ? <>
          {Array.from({length:8},(_,i)=><ellipse key={i} cx="0" cy="-28" rx="13" ry="28" transform={`rotate(${i*45})`}/>)}
          <circle r="12"/>
        </> : <>
          <path d="M0 -52 L45 0 L0 52 L-45 0Z"/><path d="M0 -28 L24 0 L0 28 L-24 0Z"/>
        </>}
      </g>
      <path d="M35 400 H75" stroke={accentColor} strokeWidth="8"/>
    </Wrap>
  </svg>
);

export const HistoricalVillageAsset: React.FC<AssetProps> = ({
  x=0,y=0,scale=1,color="#080807",accentColor="#c9a66c",opacity=1,
}) => (
  <svg viewBox="0 0 700 390" width="100%" height="100%" style={{overflow:"visible"}}>
    <Wrap x={x} y={y} scale={scale} opacity={opacity}>
      <path d="M0 340 Q180 315 350 340 Q520 315 700 340 V390 H0Z" fill={color}/>
      <g fill={color} stroke={accentColor} strokeWidth="4">
        <path d="M45 275 V180 L125 110 L205 180 V275Z"/>
        <path d="M250 290 V190 L330 120 L410 190 V290Z"/>
        <path d="M455 275 V180 L535 110 L615 180 V275Z"/>
      </g>
      <g fill="none" stroke={accentColor} strokeWidth="4">
        <path d="M35 180 L125 95 L215 180 M240 190 L330 105 L420 190 M445 180 L535 95 L625 180"/>
        <path d="M100 210 H150 V275 H100Z M305 225 H355 V290 H305Z M510 210 H560 V275 H510Z"/>
        <path d="M125 110 V80 M330 120 V85 M535 110 V80"/>
      </g>
      <g fill={color} stroke={accentColor} strokeWidth="4">
        <path d="M15 300 Q-10 250 20 205 Q50 170 80 205 Q110 250 85 300Z"/>
        <path d="M615 305 Q590 255 620 210 Q650 175 680 210 Q710 255 685 305Z"/>
      </g>
      <g stroke={accentColor} strokeWidth="3" fill="none">
        <path d="M48 275 V220 M650 280 V225 M0 340 H700"/>
      </g>
    </Wrap>
  </svg>
);
