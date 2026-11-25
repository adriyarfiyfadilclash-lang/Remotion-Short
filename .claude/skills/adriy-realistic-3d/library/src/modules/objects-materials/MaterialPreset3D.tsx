import React from "react";
import type { Side } from "three";

export type MaterialPresetName = "matte" | "plastic" | "metal" | "gold" | "chrome" | "rubber" | "ceramic" | "glass";

type Props = {
  preset?: MaterialPresetName;
  color?: string;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
  side?: Side;
};

const presets: Record<MaterialPresetName, {roughness:number;metalness:number;clearcoat:number;transmission:number}> = {
  matte:{roughness:.82,metalness:0,clearcoat:0,transmission:0},
  plastic:{roughness:.28,metalness:0,clearcoat:.8,transmission:0},
  metal:{roughness:.32,metalness:.85,clearcoat:.25,transmission:0},
  gold:{roughness:.22,metalness:1,clearcoat:.8,transmission:0},
  chrome:{roughness:.08,metalness:1,clearcoat:1,transmission:0},
  rubber:{roughness:.96,metalness:0,clearcoat:0,transmission:0},
  ceramic:{roughness:.18,metalness:0,clearcoat:1,transmission:0},
  glass:{roughness:.08,metalness:0,clearcoat:1,transmission:.92},
};

export const MaterialPreset3D: React.FC<Props> = ({
  preset="plastic", color="#A8BACB", roughness, metalness, opacity=1, transparent=false
}) => {
  const p=presets[preset];
  return <meshPhysicalMaterial
    color={color}
    roughness={roughness ?? p.roughness}
    metalness={metalness ?? p.metalness}
    clearcoat={p.clearcoat}
    transmission={p.transmission}
    thickness={preset === "glass" ? 0.8 : 0}
    ior={preset === "glass" ? 1.46 : 1.5}
    opacity={opacity}
    transparent={transparent || opacity<1 || preset==="glass"}
  />;
};
