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

// ---------- Flat 2.5D: proyeksi isometrik & kotak tiga sisi ----------
export type Iso = { cx: number; cy: number; u: number };
export const iso = (o: Iso, x: number, y: number, z: number) => ({
  X: o.cx + (x - y) * 0.866 * o.u,
  Y: o.cy + (x + y) * 0.5 * o.u - z * o.u,
});
const pts = (o: Iso, a: [number, number, number][]) => a.map(([x, y, z]) => { const p = iso(o, x, y, z); return `${p.X},${p.Y}`; }).join(" ");

// Kotak isometrik: atas paling terang, sisi kanan sedang, sisi depan paling gelap (cahaya dari kiri atas)
export const KotakIso: React.FC<{ o: Iso; x: number; y: number; z: number; w: number; d: number; h: number; atas: string; kanan: string; depan: string; garis?: string }> = ({ o, x, y, z, w, d, h, atas, kanan, depan, garis }) => (
  <g stroke={garis} strokeWidth={garis ? 1.5 : 0} strokeLinejoin="round">
    <polygon points={pts(o, [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={kanan} />
    <polygon points={pts(o, [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={depan} />
    <polygon points={pts(o, [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={atas} />
  </g>
);

// Tipografi kinetik: huruf tebal dengan ekstrusi berlapis (kesan 2.5D) dan garis gerak
export const TeksEkstrusi: React.FC<{ teks: string; ukuran: number; warna: string; sisi: string; lapis?: number; font: string; style?: React.CSSProperties }> = ({ teks, ukuran, warna, sisi, lapis = 8, font, style }) => (
  <div style={{ position: "relative", fontFamily: font, fontWeight: 800, fontSize: ukuran, lineHeight: 1, letterSpacing: -2, whiteSpace: "nowrap", ...style }}>
    {Array.from({ length: lapis }, (_, i) => (
      <span key={i} style={{ position: "absolute", left: lapis - i, top: lapis - i, color: sisi }}>{teks}</span>
    ))}
    <span style={{ position: "relative", color: warna }}>{teks}</span>
  </div>
);

// Pin bernomor + garis penunjuk + kartu label (dipakai di atas ilustrasi)
export const PinLabel: React.FC<{ x: number; y: number; kiri: number; atas: number; n: number | string; warna: string; judul: string; isi?: string; lebar?: number; font: string; tunda?: number }> = ({ x, y, kiri: kartuKiri, atas, n, warna, judul, isi, lebar = 300, font, tunda = 0 }) => {
  const s = usePop(tunda);
  // garis menuju sisi kartu yang terdekat dengan titik
  const kiri = x < kartuKiri + lebar / 2;
  const kx = kiri ? kartuKiri + 22 : kartuKiri + lebar - 22;
  const ky = y < atas ? atas + 4 : atas + 60;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: Math.min(1, s * 1.4) }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <path d={`M ${x} ${y} L ${kx} ${y + (ky - y) * 0.5} L ${kx} ${ky}`} fill="none" stroke="#0F172A" strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" opacity={0.55} />
        <circle cx={x} cy={y} r={16} fill="#fff" />
        <circle cx={x} cy={y} r={10} fill={warna} />
      </svg>
      <div
        style={{
          position: "absolute", left: kartuKiri, top: atas, width: lebar, boxSizing: "border-box", transform: `scale(${s})`, transformOrigin: "center",
          background: "rgba(255,255,255,0.94)", borderRadius: 20, padding: "14px 18px", boxShadow: "0 10px 24px rgba(15,23,42,0.16), 0 3px 0 rgba(15,23,42,0.06)", fontFamily: font,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: warna, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 20 }}>{n}</div>
          <div style={{ fontSize: 27, fontWeight: 800, color: "#0F172A" }}>{judul}</div>
        </div>
        {isi && <div style={{ fontSize: 21, color: "#475569", marginTop: 6, lineHeight: 1.3 }}>{isi}</div>}
      </div>
    </div>
  );
};

// Kaca pembesar: lingkaran zoom dengan bingkai, pantulan, gagang, dan garis ke titik asal
export const KacaPembesar: React.FC<{ x: number; y: number; r: number; dari: { x: number; y: number }; children: React.ReactNode; label: string; font: string; tunda?: number }> = ({ x, y, r, dari, children, label, font, tunda = 0 }) => {
  const s = usePop(tunda);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: Math.min(1, s * 1.5) }}>
        <circle cx={dari.x} cy={dari.y} r={26} fill="none" stroke="#0F172A" strokeWidth={3} strokeDasharray="6 6" opacity={0.6} />
        <line x1={dari.x} y1={dari.y} x2={x} y2={y} stroke="#0F172A" strokeWidth={3} strokeDasharray="6 6" opacity={0.35} />
      </svg>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, transform: `scale(${s})` }}>
        <div style={{ position: "absolute", left: r * 1.55, top: r * 1.55, width: r * 0.9, height: r * 0.22, borderRadius: r * 0.11, background: "linear-gradient(180deg,#334155,#0F172A)", transform: "rotate(45deg)", transformOrigin: "left center" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", background: "#fff", boxShadow: "0 18px 40px rgba(15,23,42,0.28)", border: "14px solid #0F172A" }}>
          {children}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), rgba(255,255,255,0) 40%)" }} />
        </div>
        <div style={{ position: "absolute", left: "50%", top: -26, transform: "translateX(-50%)", whiteSpace: "nowrap", background: "#0F172A", color: "#fff", fontFamily: font, fontWeight: 700, fontSize: 21, padding: "6px 16px", borderRadius: 999 }}>{label}</div>
      </div>
    </div>
  );
};

// Pin bernomor langsung di atas objek (tanpa kartu) dengan cincin denyut
export const PinNomor: React.FC<{ x: number; y: number; n: number; warna: string; font: string; tunda?: number }> = ({ x, y, n, warna, font, tunda = 0 }) => {
  const s = usePop(tunda);
  const f = useCurrentFrame();
  const d = (f % 40) / 40;
  return (
    <div style={{ position: "absolute", left: x - 30, top: y - 72, width: 60, height: 80, transform: `scale(${s})`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 30 - 12 - d * 20, top: 68 - 6 - d * 10, width: 24 + d * 40, height: 12 + d * 20, borderRadius: "50%", border: `3px solid ${warna}`, opacity: 1 - d }} />
      <svg width={60} height={80} style={{ position: "absolute", inset: 0 }}>
        <path d="M 30 78 L 14 48 A 24 24 0 1 1 46 48 Z" fill={warna} stroke="#fff" strokeWidth={4} />
        <text x={30} y={40} textAnchor="middle" fontFamily={font} fontWeight={800} fontSize={26} fill="#fff">{n}</text>
      </svg>
    </div>
  );
};
