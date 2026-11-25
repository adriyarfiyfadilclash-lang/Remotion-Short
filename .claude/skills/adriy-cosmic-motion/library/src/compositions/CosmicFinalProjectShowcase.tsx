import React from "react";
import {AbsoluteFill,useCurrentFrame,interpolate} from "remotion";
import {Canvas} from "@react-three/fiber";
import {Stars} from "@react-three/drei";
import {SolarSystemAnimation,AsteroidFieldAnimation,CometPassAnimation,BlackHoleAccretionAnimation,SupernovaSequenceAnimation,CosmicJourneyAnimation} from "../components/cosmic-animation";
import {CinematicSpaceLighting} from "../components/camera-lighting";
import {CosmicHUDOverlay,CosmicTitleSequence,CosmicEndCredits,CosmicTimelineMarker} from "../components/cosmic-final-project";
export const CosmicFinalProjectShowcase:React.FC=()=>{
const f=useCurrentFrame(),end=interpolate(f,[210,240],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
return <AbsoluteFill style={{background:"#020713",color:"#fff",fontFamily:"Arial,sans-serif"}}>
<Canvas gl={{antialias:true}} camera={{position:[0,2,24],fov:52}}><color attach="background" args={["#020713"]}/><fog attach="fog" args={["#020713",24,100]}/><Stars radius={100} depth={70} count={2100} factor={3.7} saturation={.45} fade speed={.25}/><AsteroidFieldAnimation count={75} speed={.07} seed={81}/><SolarSystemAnimation orbitRadii={[2.4,3.7,5.1,6.8]} planetSizes={[.18,.26,.35,.3]}/><CometPassAnimation from={[-12,7,-4]} to={[12,-5,-4]} startFrame={30} durationInFrames={135}/><BlackHoleAccretionAnimation position={[7,1,-10]} diskRadius={2.4}/><SupernovaSequenceAnimation position={[-7,-2,-11]} startFrame={95} durationInFrames={95} maxRadius={4}/><CosmicJourneyAnimation start={[0,2,25]} end={[0,1,-8]} durationInFrames={240} arcHeight={2.2}/><CinematicSpaceLighting keyIntensity={1.6} fillIntensity={.55} rimIntensity={1.05}/></Canvas>
<CosmicHUDOverlay chapter="COSMIC FINAL PROJECT" detail="ADRIY COSMIC MOTION / STAGE 08"/>
<CosmicTitleSequence title="THE COSMOS" subtitle="Sebuah perjalanan melintasi alam semesta" startFrame={4} durationInFrames={78}/>
<CosmicTimelineMarker atFrame={90} label="SEQUENCE 02 / STELLAR EVENTS" top={70}/>
<div style={{opacity:end}}><CosmicEndCredits startFrame={210} durationInFrames={30}/></div>
</AbsoluteFill>;
};
