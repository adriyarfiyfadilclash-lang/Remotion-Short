import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  items: React.ReactNode[];
  gap?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  renderItem?: (item: React.ReactNode, index: number) => React.ReactNode;
};

/** Sequentially reveals a list of flat-design elements with consistent spacing. */
export const FlatStagger: React.FC<Props> = ({
  items, gap = 6, duration = 18, direction = "up", distance = 42, renderItem,
}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill>
    {items.map((item, index) => {
      const local = frame - index * gap;
      const p = interpolate(local, [0, duration], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
      });
      const x = direction === "left" ? -distance * (1-p) : direction === "right" ? distance * (1-p) : 0;
      const y = direction === "up" ? distance * (1-p) : direction === "down" ? -distance * (1-p) : 0;
      return <div key={index} style={{ position: "absolute", inset: 0, opacity: p,
        transform: `translate(${x}px, ${y}px)` }}>
        {renderItem ? renderItem(item, index) : item}
      </div>;
    })}
  </AbsoluteFill>;
};
