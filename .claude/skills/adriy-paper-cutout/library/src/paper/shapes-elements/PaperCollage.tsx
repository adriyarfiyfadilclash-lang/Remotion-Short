import React from "react";

export type PaperCollageItem = {
  id: string;
  src?: string;
  color?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  caption?: string;
};

type Props = { items: PaperCollageItem[]; style?: React.CSSProperties };

export const PaperCollage: React.FC<Props> = ({ items, style }) => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "visible", ...style }}>
    {items.map((item) => (
      <div key={item.id} style={{ position: "absolute", left: item.x, top: item.y, width: item.width, height: item.height, zIndex: item.zIndex ?? 1, transform: `rotate(${item.rotation ?? 0}deg)`, background: item.src ? undefined : (item.color ?? "#E8B85B"), boxShadow: "3px 6px 3px rgba(35,25,15,.2)", border: "1px solid rgba(70,48,25,.15)", overflow: "hidden" }}>
        {item.src ? <img src={item.src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
        {item.caption ? <div style={{ position: "absolute", left: 8, right: 8, bottom: 7, fontFamily: "Georgia, serif", fontSize: 14, color: "#2F2A24" }}>{item.caption}</div> : null}
      </div>
    ))}
  </div>
);
