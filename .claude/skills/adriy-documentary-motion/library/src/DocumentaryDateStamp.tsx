import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = { date: string; location?: string; delay?: number; accent?: string };

/** Compact date/location stamp for timelines, archival shots and place introductions. */
export const DocumentaryDateStamp: React.FC<Props> = ({
  date, location, delay = 0, accent = "#c7a66a",
}) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 58, left: 70, opacity, color: "#f4f1e9",
      fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 17, letterSpacing: 3, color: accent, textTransform: "uppercase" }}>{date}</div>
      {location ? <div style={{ fontSize: 13, letterSpacing: 2, color: "rgba(244,241,233,.75)",
        textTransform: "uppercase" }}>{location}</div> : null}
    </div>
  );
};
