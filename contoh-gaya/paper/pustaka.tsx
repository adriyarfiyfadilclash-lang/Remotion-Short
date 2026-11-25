// Komponen gaya ADRIY Paper Cutout, diadaptasi dari pustaka di .claude/skills/adriy-paper-cutout/library
// (PaperLayer, PaperStack, PaperDrop, PaperGrain, PaperShadow, PaperRoughEdge, PaperLetterByLetter).
// Arah: seni kertas yang terlihat seperti difoto (diorama kirigami) — bukan kartun:
// banyak lapisan, bayangan makin dalam untuk lapisan belakang, serat kertas nyata, tepi potongan bercahaya.
import React from "react";
import { continueRender, delayRender, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { serif: "Playfair Display", poster: "Anton", tangan: "Caveat", sans: FONT };

// Palet pustaka Paper Cutout (krem, mustard, terakota, sage, biru kusam) + turunan gelap/terang
export const K = {
  krem: "#F8F1DF", krem2: "#E8DCC3", coklat: "#40382F", mustard: "#E8B85B", terakota: "#D77F69", sage: "#73978B", biru: "#5E7FA3",
  tinta: "#342F28",
};

if (typeof document !== "undefined") {
  const t = delayRender("font paper");
  Promise.all(
    [["Playfair Display", "playfair-900", "900", "normal"], ["Playfair Display", "playfair-700-italic", "700", "italic"], ["Anton", "anton-400", "400", "normal"], ["Caveat", "caveat-700", "700", "normal"]].map(([fam, file, w, st]) =>
      new FontFace(fam, `url(${staticFile(`font/${file}.woff2`)}) format("woff2")`, { weight: w, style: st }).load().then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  ).then(() => continueRender(t)).catch(() => continueRender(t));
}

// Filter: serat kertas + tepi potongan tidak rata + bayangan sesuai kedalaman (1 = dekat, 4 = jauh di belakang)
export const FilterKertas: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      {[1, 2, 3, 4].map((d) => (
        <filter key={d} id={`lapis${d}`} x="-35%" y="-35%" width="170%" height="180%">
          {/* tepi potongan sedikit bergerigi */}
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed={d * 3} result="g" />
          <feDisplacementMap in="SourceGraphic" in2="g" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="pot" />
          {/* serat kertas */}
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed={d * 7} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.16 0" result="serat" />
          <feComposite in="serat" in2="pot" operator="in" result="seratPot" />
          <feMerge result="kertas"><feMergeNode in="pot" /><feMergeNode in="seratPot" /></feMerge>
          {/* bayangan: kontak tajam + bayangan lembut, makin jauh makin besar */}
          <feDropShadow in="kertas" dx={1.2 * d} dy={3 * d} stdDeviation={1.4 * d} floodColor="#1E1710" floodOpacity={0.32} result="b1" />
          <feDropShadow in="b1" dx={2 * d} dy={7 * d} stdDeviation={6 * d} floodColor="#1E1710" floodOpacity={0.22} />
        </filter>
      ))}
      <radialGradient id="pendar">
        <stop offset="0" stopColor="#FFF3C0" stopOpacity="0.55" />
        <stop offset="0.45" stopColor="#FFE9A6" stopOpacity="0.18" />
        <stop offset="1" stopColor="#FFE9A6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="pendarToska">
        <stop offset="0" stopColor="#B8F2EA" stopOpacity="0.45" />
        <stop offset="1" stopColor="#B8F2EA" stopOpacity="0" />
      </radialGradient>
      <filter id="lapisTeks" x="-5%" y="-10%" width="110%" height="130%">
        <feDropShadow dx="2" dy="5" stdDeviation="2.5" floodColor="#1E1710" floodOpacity="0.35" />
      </filter>
      <filter id="grainKertas">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="11" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

// Masuk ala kertas: naik dari bawah dengan sedikit putaran, memantul pelan
export const usePaperPop = (tunda: number) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - tunda, fps, config: { damping: 13, mass: 0.8, stiffness: 95 } });
};

// Satu lapisan kertas: path SVG dengan sorot tepi atas (bagian potongan yang kena cahaya)
export const Lapis: React.FC<{ d: string; warna: string; dalam?: 1 | 2 | 3 | 4; tunda?: number; sorot?: string; geser?: number; children?: React.ReactNode }> = ({ d, warna, dalam = 2, tunda = 0, sorot, geser = 120, children }) => {
  const p = usePaperPop(tunda);
  return (
    <g filter={`url(#lapis${dalam})`} transform={`translate(0 ${(1 - p) * geser})`} opacity={Math.min(1, p * 2)}>
      <path d={d} fill={warna} />
      {sorot && <path d={d} fill="none" stroke={sorot} strokeWidth={3} strokeOpacity={0.7} transform="translate(0 1.5)" />}
      {children}
    </g>
  );
};

// Latar: karton bertekstur dengan cahaya samping (vignette)
export const LatarKarton: React.FC<{ warna: string; cahaya?: string }> = ({ warna, cahaya = "rgba(255,250,235,0.55)" }) => (
  <div style={{ position: "absolute", inset: 0, background: warna }}>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 18%, ${cahaya}, transparent 60%)` }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(30,23,16,0.35))" }} />
  </div>
);

export const Grain: React.FC<{ o?: number }> = ({ o = 0.14 }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", opacity: o, pointerEvents: "none" }}>
    <rect width={W} height={H} filter="url(#grainKertas)" />
  </svg>
);

// Huruf potongan kertas: tiap huruf muncul berurutan, terangkat dengan bayangan
export const JudulKertas: React.FC<{ teks: string; ukuran: number; warna: string; tunda?: number; font?: string; style?: React.CSSProperties; jarak?: number }> = ({ teks, ukuran, warna, tunda = 0, font = F.poster, style, jarak = 2 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", whiteSpace: "pre", filter: "drop-shadow(2px 5px 3px rgba(30,23,16,0.38)) drop-shadow(4px 12px 10px rgba(30,23,16,0.18))", ...style }}>
      {teks.split("").map((h, i) => {
        const s = spring({ frame: f - tunda - i * 1.5, fps, config: { damping: 11, mass: 0.5 } });
        const r = (Math.sin(i * 12.9898) * 43758.5453) % 1;
        return (
          <span key={i} style={{ display: "inline-block", fontFamily: font, fontWeight: 900, fontSize: ukuran, lineHeight: 1, color: warna, letterSpacing: jarak, transform: `translateY(${(1 - s) * 50}px) rotate(${r * 3}deg)`, opacity: Math.min(1, s * 2) }}>{h}</span>
        );
      })}
    </div>
  );
};

// Label kertas kecil yang digantung dengan paku/benang
export const Tag: React.FC<{ x: number; y: number; judul: string; isi?: string; warna?: string; teks?: string; rot?: number; tunda?: number; lebar?: number; n?: number; aksen?: string }> = ({ x, y, judul, isi, warna = K.krem, teks = K.tinta, rot = 0, tunda = 0, lebar = 300, n, aksen = K.terakota }) => {
  const p = usePaperPop(tunda);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: lebar, transform: `translateY(${(1 - p) * 40}px) rotate(${rot * p}deg)`, opacity: Math.min(1, p * 2), zIndex: 20, filter: "drop-shadow(2px 4px 2px rgba(30,23,16,0.35)) drop-shadow(3px 10px 10px rgba(30,23,16,0.2))" }}>
      <div style={{ background: warna, padding: "14px 18px 16px", borderRadius: 4, position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: -8, width: 16, height: 16, marginLeft: -8, borderRadius: 8, background: aksen, boxShadow: "inset -2px -3px 0 rgba(0,0,0,0.2)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {n !== undefined && <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 17, background: aksen, color: K.krem, fontFamily: F.poster, fontSize: 20, display: "grid", placeItems: "center" }}>{n}</div>}
          <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 28, color: teks, lineHeight: 1.05 }}>{judul}</div>
        </div>
        {isi && <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 28, color: teks, opacity: 0.85, marginTop: 4, lineHeight: 1.05 }}>{isi}</div>}
      </div>
    </div>
  );
};

// Benang/garis penunjuk dari kertas ke objek
export const Benang: React.FC<{ d: string; warna?: string; tunda?: number }> = ({ d, warna = K.tinta, tunda = 0 }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (f - tunda) / 14));
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 19 }}>
      <path d={d} fill="none" stroke={warna} strokeWidth={2.5} strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - p} opacity={0.75} />
    </svg>
  );
};
