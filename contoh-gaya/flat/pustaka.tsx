// Komponen gaya ADRIY Flat Design, diadaptasi dari pustaka di .claude/skills/adriy-flat-design/library:
// FlatTitleReveal, FlatHighlightWord, FlatIconBadge, FlatStatCard, FlatDonutChart, FlatProgressSteps,
// FlatDotGrid, FlatPop, FlatStagger, FlatLowerThird. Format 9:16 dan ukuran teks untuk HP.
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const W = 1080, H = 1920;
export const P = {
  biru: "#2563EB", navy: "#0F172A", hijau: "#16A34A", ungu: "#7C3AED", oranye: "#F97316", kuning: "#F59E0B",
  stabilo: "#FDE047", abu: "#64748B", terang: "#F8FAFC", latar: "#EEF3FB", pink: "#DB2777", cyan: "#0891B2", garis: "#E2E8F0",
};

// FlatPop: muncul membal
export const usePop = (tunda: number) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - tunda, fps, config: { damping: 11, mass: 0.7 } });
};
export const Pop: React.FC<{ tunda: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ tunda, children, style }) => {
  const s = usePop(tunda);
  return <div style={{ ...style, transform: `${style?.transform ?? ""} scale(${s})`, opacity: Math.min(1, s * 1.5) }}>{children}</div>;
};

export const LatarFlat: React.FC<{ warna?: string }> = ({ warna = P.latar }) => (
  <div style={{ position: "absolute", inset: 0, background: warna }}>
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
      <defs>
        <pattern id="titik" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#CBD5E1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#titik)" />
    </svg>
  </div>
);

// Kepala: label seri + nomor episode
export const KepalaFlat: React.FC<{ seri: string; ep: string; font: string; warna: string }> = ({ seri, ep, font, warna }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top: 64, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: font }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: warna, display: "grid", placeItems: "center" }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff" }} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: P.navy, letterSpacing: 1 }}>{seri}</div>
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", background: P.navy, padding: "8px 18px", borderRadius: 999 }}>{ep}</div>
  </div>
);

// FlatTitleReveal + FlatHighlightWord: kata kunci diberi stabilo yang tergores
export const JudulFlat: React.FC<{ atas: string; sorot: string; bawah?: string; sub: string; top: number; font: string; warnaSorot?: string }> = ({ atas, sorot, bawah, sub, top, font, warnaSorot = P.stabilo }) => {
  const f = useCurrentFrame();
  const naik = interpolate(f, [0, 18], [40, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const o = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const gores = interpolate(f, [14, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, fontFamily: font, opacity: o, transform: `translateY(${naik}px)` }}>
      <div style={{ fontSize: 88, lineHeight: 1.08, fontWeight: 800, color: P.navy, letterSpacing: -1 }}>
        {atas}{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ position: "absolute", left: -8, right: -8, bottom: 6, height: 38, background: warnaSorot, borderRadius: 8, transformOrigin: "left", transform: `scaleX(${gores}) rotate(-1deg)` }} />
          <span style={{ position: "relative" }}>{sorot}</span>
        </span>
        {bawah ? ` ${bawah}` : ""}
      </div>
      <div style={{ marginTop: 18, fontSize: 38, color: P.abu, fontWeight: 500 }}>{sub}</div>
    </div>
  );
};

// FlatIconBadge: lingkaran bernomor
export const Lencana: React.FC<{ n: string | number; warna: string; ukuran?: number; font: string }> = ({ n, warna, ukuran = 64, font }) => (
  <div style={{ width: ukuran, height: ukuran, borderRadius: ukuran / 2, background: warna, color: "#fff", display: "grid", placeItems: "center", fontFamily: font, fontWeight: 800, fontSize: ukuran * 0.46, boxShadow: `0 6px 0 rgba(15,23,42,0.18)` }}>{n}</div>
);

// FlatLowerThird: sumber/catatan
export const Sumber: React.FC<{ teks: string; font: string }> = ({ teks, font }) => (
  <div style={{ position: "absolute", left: 60, right: 60, bottom: 50, display: "flex", alignItems: "center", gap: 14, fontFamily: font }}>
    <div style={{ width: 8, height: 36, borderRadius: 4, background: P.biru }} />
    <div style={{ fontSize: 24, color: P.abu, fontWeight: 500 }}>{teks}</div>
  </div>
);

export const BarProgres: React.FC<{ aktif: number; total: number }> = ({ aktif, total }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top: 140, display: "flex", gap: 10 }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i <= aktif ? P.biru : "#CBD5E1" }} />
    ))}
  </div>
);
