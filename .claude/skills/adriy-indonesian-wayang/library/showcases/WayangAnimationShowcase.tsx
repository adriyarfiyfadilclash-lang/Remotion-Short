import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame, interpolate } from "remotion";
import { WayangStage, WayangRig, WayangWalk, WayangGesture, WayangBattlePose } from "../src/index";

const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 340, 380], [0, 1, 1, 0], { extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  return (
    <WayangStage>
      <AbsoluteFill style={{alignItems:"center", justifyContent:"center"}}>
        <div style={{position:"absolute",top:55,fontSize:30,letterSpacing:7,color:"#6d4a24",fontFamily:"serif"}}>
          WAYANG KULIT • NUSANTARA
        </div>
        <div style={{width:620,height:650,opacity}}>
          {frame < 100 ? <WayangRig x={0} y={5} scale={1.35} /> :
           frame < 190 ? <WayangWalk x={0} y={5} scale={1.35} /> :
           frame < 280 ? <WayangGesture gesture="greet" x={0} y={5} scale={1.35} /> :
           <WayangBattlePose x={0} y={5} scale={1.35} />}
        </div>
        <div style={{position:"absolute",bottom:65,fontSize:20,color:"#79552c",fontFamily:"serif",letterSpacing:2}}>
          SILUET • UKIRAN • GAPIT • TUDING
        </div>
      </AbsoluteFill>
    </WayangStage>
  );
};

export const WayangAnimationShowcase: React.FC = () => <Showcase />;
