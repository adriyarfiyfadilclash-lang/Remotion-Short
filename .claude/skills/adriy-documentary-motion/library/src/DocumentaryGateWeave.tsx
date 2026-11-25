import React from "react";
import { AbsoluteFill } from "remotion";

type Props = { opacity?: number; thickness?: number; color?: string };

/** Fine film-gate edge texture. Keep subtle; avoid heavy fake scratches. */
export const DocumentaryGateWeave: React.FC<Props> = ({
  opacity = 0.1, thickness = 2, color = "#d8d0c2",
}) => <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: thickness,
    background: color, filter: "blur(1px)" }} />
  <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: thickness,
    background: color, filter: "blur(1px)" }} />
</AbsoluteFill>;
