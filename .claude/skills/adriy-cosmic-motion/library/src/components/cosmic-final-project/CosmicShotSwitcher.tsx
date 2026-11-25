import React from "react";
import {Sequence} from "remotion";
export type CosmicShot={id:string;from:number;durationInFrames:number;content:React.ReactNode};
export type CosmicShotSwitcherProps={shots:CosmicShot[]};
/** Renders a list of timed shots; each shot is isolated on the Remotion timeline. */
export const CosmicShotSwitcher:React.FC<CosmicShotSwitcherProps>=({shots})=><>{shots.map(shot=><Sequence key={shot.id} from={shot.from} durationInFrames={shot.durationInFrames}>{shot.content}</Sequence>)}</>;

