import React from "react";

type Props = {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  offsetY?: number;
  color?: string;
  style?: React.CSSProperties;
};

export const LuxuryAmbientShadow: React.FC<Props> = ({
  children,
  blur = 34,
  opacity = 0.42,
  offsetY = 22,
  color = "#000000",
  style,
}) => (
  <div
    style={{
      filter: `drop-shadow(0 ${offsetY}px ${blur}px ${color}${Math.round(Math.max(0, Math.min(1, opacity)) * 255).toString(16).padStart(2, "0")})`,
      ...style,
    }}
  >
    {children}
  </div>
);
