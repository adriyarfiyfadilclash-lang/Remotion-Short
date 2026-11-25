import React from "react";

export type AnatomicalTitleCardProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  accent?: string;
  align?: "left" | "center";
};

/** Kartu judul pembuka atau penutup video anatomi. */
export const AnatomicalTitleCard: React.FC<AnatomicalTitleCardProps> = ({
  title, eyebrow = "ADRIY.PROJECT", subtitle, accent = "#79cde5", align = "center",
}) => (
  <div style={{
    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: align === "center" ? "center" : "flex-start",
    textAlign: align, padding: "8%", boxSizing: "border-box",
    background: "linear-gradient(90deg, rgba(5,14,22,.88), rgba(5,14,22,.18))",
    color: "#f2f8fb", fontFamily: "Arial,sans-serif", pointerEvents: "none",
  }}>
    <div style={{fontSize:13,fontWeight:700,letterSpacing:5,color:accent}}>{eyebrow}</div>
    <div style={{fontSize:54,fontWeight:900,lineHeight:1.08,marginTop:18,maxWidth:1050}}>{title}</div>
    {subtitle && <div style={{fontSize:19,color:"#c4d5df",marginTop:18,maxWidth:760,lineHeight:1.5}}>{subtitle}</div>}
  </div>
);
