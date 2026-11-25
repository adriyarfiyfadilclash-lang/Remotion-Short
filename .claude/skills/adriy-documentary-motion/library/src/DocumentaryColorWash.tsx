import React from "react";
import { AbsoluteFill } from "remotion";

type Props = { color?: string; opacity?: number; blendMode?: React.CSSProperties["mixBlendMode"] };

/** Adds a subtle tonal wash to unify mixed archival footage and still images. */
export const DocumentaryColorWash: React.FC<Props> = ({
  color = "#27313a", opacity = 0.16, blendMode = "multiply",
}) => <AbsoluteFill style={{
  pointerEvents: "none", background: color, opacity, mixBlendMode: blendMode,
}} />;
