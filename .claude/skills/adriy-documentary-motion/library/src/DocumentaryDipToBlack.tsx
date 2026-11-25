import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = { children: React.ReactNode; duration?: number; midpoint?: number; black?: string };

/**
 * Dip-to-black overlay: fades down to black, then back up.
 * `midpoint` is the frame where the screen reaches full black.
 */
export const DocumentaryDipToBlack: React.FC<Props> = ({
  children, duration = 36, midpoint, black = "#050608",
}) => {
  const frame = useCurrentFrame();
  const mid = midpoint ?? duration / 2;
  const opacity = interpolate(frame, [0, mid, duration], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill style={{ backgroundColor: black, opacity, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
