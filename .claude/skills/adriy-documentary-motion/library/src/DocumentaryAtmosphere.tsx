import React from "react";
import { AbsoluteFill } from "remotion";

type Props = { opacity?: number; color?: string; direction?: "horizontal" | "vertical" };

/** Soft atmospheric haze gradient to add depth to landscapes and archival shots. */
export const DocumentaryAtmosphere: React.FC<Props> = ({
  opacity = 0.14, color = "#aeb8c2", direction = "horizontal",
}) => <AbsoluteFill style={{
  pointerEvents: "none", opacity, mixBlendMode: "screen",
  background: direction === "horizontal"
    ? `linear-gradient(90deg, transparent, ${color} 50%, transparent)`
    : `linear-gradient(0deg, transparent, ${color} 50%, transparent)`,
  filter: "blur(34px)",
}} />;
