// Komponen gaya ADRIY Mixed Media, diadaptasi dari pustaka di .claude/skills/adriy-mixed-media/library
// (PaperLayer, CollageCard, PhotoCutout, DepthStack, FloatingMedia, tipografi & efek kolase).
// Tekstur kertas, grain, dan tepi sobek dibuat dengan filter SVG; "foto" berupa ilustrasi duotone/halftone buatan sendiri.
import React from "react";
import { continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { tangan: "Caveat", serif: "Playfair Display", poster: "Anton", sans: FONT };
export const C = {
  kertas: "#F3EBDD", krem: "#E9DCC4", kraft: "#C9A574", tinta: "#1C1917", merah: "#D7263D", biru: "#1B4E9B",
  kuning: "#F7C948", hijau: "#2F7D4F", toska: "#2A9D8F", pink: "#F28FAD", abu: "#57534E",
};

// muat font kolase dari public/font
if (typeof document !== "undefined") {
  const t = delayRender("font kolase");
  Promise.all(
    [
      [F.tangan, "caveat-700", "700", "normal"],
      [F.serif, "playfair-900", "900", "normal"],
      [F.serif, "playfair-700-italic", "700", "italic"],
      [F.poster, "anton-400", "400", "normal"],
    ].map(([fam, file, w, st]) =>
      new FontFace(fam, `url(${staticFile(`font/${file}.woff2`)}) format("woff2")`, { weight: w, style: st }).load().then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  ).then(() => continueRender(t)).catch(() => continueRender(t));
}

export const usePop = (tunda: number) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - tunda, fps, config: { damping: 12, mass: 0.8 } });
};

// Definisi filter global (dipasang sekali per adegan)
export const FilterKolase: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id="seratKertas" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="n" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.22 0" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
      <filter id="sobek" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" seed="9" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="16" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sobekHalus" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="3" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="capKasar">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="2" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.55" result="m" />
        <feComposite in="SourceGraphic" in2="m" operator="in" />
      </filter>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="7" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

// Latar kertas/dinding bertekstur
export const LatarKertas: React.FC<{ warna: string; garis?: boolean }> = ({ warna, garis }) => (
  <div style={{ position: "absolute", inset: 0, background: warna }}>
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <rect width={W} height={H} fill="#000" filter="url(#seratKertas)" />
      {garis && Array.from({ length: 48 }, (_, i) => <line key={i} x1={0} y1={40 + i * 40} x2={W} y2={40 + i * 40} stroke="#9FB7D6" strokeWidth={1.5} opacity={0.35} />)}
    </svg>
  </div>
);

// Butiran film di seluruh layar
export const Grain: React.FC<{ o?: number }> = ({ o = 0.16 }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", opacity: o, pointerEvents: "none" }}>
    <rect width={W} height={H} filter="url(#grain)" />
  </svg>
);

// Sobekan kertas: bentuk bertepi sobek + serat + bayangan, isi HTML di atasnya
export const Sobekan: React.FC<{
  x: number; y: number; w: number; h: number; warna: string; rot?: number; children?: React.ReactNode; tunda?: number; halus?: boolean; bayang?: number; z?: number;
}> = ({ x, y, w, h, warna, rot = 0, children, tunda = 0, halus, bayang = 1, z }) => {
  const s = usePop(tunda);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `rotate(${rot}deg) scale(${0.9 + 0.1 * s})`, opacity: Math.min(1, s * 1.6), zIndex: z, filter: `drop-shadow(0 ${10 * bayang}px ${14 * bayang}px rgba(28,25,23,0.28))` }}>
      <svg width={w} height={h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <g filter={halus ? "url(#sobekHalus)" : "url(#sobek)"}>
          <rect x={4} y={4} width={w - 8} height={h - 8} fill={warna} />
          <rect x={4} y={4} width={w - 8} height={h - 8} fill="#000" filter="url(#seratKertas)" />
        </g>
      </svg>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
};

// Selotip semi-transparan dengan ujung bergerigi
export const Selotip: React.FC<{ x: number; y: number; w?: number; rot?: number; warna?: string }> = ({ x, y, w = 160, rot = 0, warna = "rgba(247,201,72,0.6)" }) => (
  <div
    style={{
      position: "absolute", left: x, top: y, width: w, height: 46, background: warna, transform: `rotate(${rot}deg)`, zIndex: 20,
      clipPath: "polygon(0% 8%,3% 0%,6% 10%,9% 0%,12% 8%,15% 0%,85% 0%,88% 9%,91% 0%,94% 8%,97% 0%,100% 10%,100% 92%,97% 100%,94% 90%,91% 100%,88% 92%,85% 100%,15% 100%,12% 91%,9% 100%,6% 90%,3% 100%,0% 92%)",
      boxShadow: "inset 0 0 0 100px rgba(255,255,255,0.15)",
    }}
  />
);

// Polaroid dengan "foto" ilustrasi + keterangan tulisan tangan
export const Polaroid: React.FC<{ x: number; y: number; w: number; rot?: number; foto: React.ReactNode; teks: string; tunda?: number }> = ({ x, y, w, rot = 0, foto, teks, tunda = 0 }) => {
  const s = usePop(tunda);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `rotate(${rot}deg) scale(${s})`, background: "#FBF8F1", padding: `${w * 0.06}px ${w * 0.06}px ${w * 0.2}px`, boxShadow: "0 16px 26px rgba(28,25,23,0.32), 0 2px 0 rgba(28,25,23,0.1)", boxSizing: "border-box" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1", overflow: "hidden" }}>
        {foto}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(28,25,23,0.22) 1.2px, transparent 1.6px)", backgroundSize: "6px 6px", mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, transparent 55%, rgba(28,25,23,0.35))" }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: w * 0.03, textAlign: "center", fontFamily: F.tangan, fontWeight: 700, fontSize: w * 0.12, color: C.tinta }}>{teks}</div>
    </div>
  );
};

// Cap tinta melingkar
export const Cap: React.FC<{ x: number; y: number; r: number; teks: string; tengah: string; warna?: string; rot?: number; tunda?: number }> = ({ x, y, r, teks, tengah, warna = C.merah, rot = -12, tunda = 0 }) => {
  const s = usePop(tunda);
  const id = `busur-${teks.length}-${r}`;
  return (
    <svg width={r * 2 + 20} height={r * 2 + 20} viewBox={`${-r - 10} ${-r - 10} ${r * 2 + 20} ${r * 2 + 20}`} style={{ position: "absolute", left: x - r - 10, top: y - r - 10, transform: `rotate(${rot}deg) scale(${1.4 - 0.4 * s})`, opacity: Math.min(1, s * 1.5) * 0.9, zIndex: 25 }}>
      <g filter="url(#capKasar)">
        <circle r={r} fill="none" stroke={warna} strokeWidth={6} />
        <circle r={r - 14} fill="none" stroke={warna} strokeWidth={2.5} />
        <path id={id} d={`M ${-r + 30} 0 A ${r - 30} ${r - 30} 0 1 1 ${r - 30} 0`} fill="none" />
        <text fontFamily={F.poster} fontSize={r * 0.26} fill={warna} letterSpacing={3}>
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{teks}</textPath>
        </text>
        <text y={r * 0.28} textAnchor="middle" fontFamily={F.poster} fontSize={r * 0.5} fill={warna}>{tengah}</text>
      </g>
    </svg>
  );
};

// Huruf potongan ala surat kaleng: tiap huruf di potongan kertas berbeda
export const HurufPotong: React.FC<{ teks: string; ukuran: number; tunda?: number; palet?: [string, string, string][] }> = ({ teks, ukuran, tunda = 0, palet }) => {
  const f = useCurrentFrame();
  const pal: [string, string, string][] = palet ?? [
    ["#1C1917", "#F3EBDD", F.poster], ["#D7263D", "#FFFFFF", F.serif], ["#F7C948", "#1C1917", F.poster], ["#FFFFFF", "#1C1917", F.serif],
    ["#1B4E9B", "#FFFFFF", F.poster], ["#E9DCC4", "#D7263D", F.serif], ["#2A9D8F", "#FFFFFF", F.poster],
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {teks.split("").map((h, i) => {
        if (h === " ") return <div key={i} style={{ width: ukuran * 0.3 }} />;
        const [bg, fg, fam] = pal[(i * 3 + teks.length) % pal.length];
        const muncul = Math.min(1, Math.max(0, (f - tunda - i * 2) / 6));
        const rot = ((i * 37) % 11) - 5;
        return (
          <div key={i} style={{ background: bg, color: fg, fontFamily: fam, fontWeight: 900, fontSize: ukuran * (fam === F.serif ? 0.92 : 1), lineHeight: 1, padding: `${ukuran * 0.06}px ${ukuran * 0.1}px ${ukuran * 0.02}px`, transform: `rotate(${rot}deg) scale(${muncul})`, boxShadow: "0 6px 10px rgba(28,25,23,0.3)", fontStyle: i % 4 === 1 ? "italic" : "normal" }}>
            {h}
          </div>
        );
      })}
    </div>
  );
};

// Coretan spidol: panah melengkung & lingkaran tangan
export const PanahTangan: React.FC<{ d: string; warna?: string; tebal?: number; ujung?: [number, number, number] }> = ({ d, warna = C.merah, tebal = 6, ujung }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}>
    <path d={d} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeLinejoin="round" />
    {ujung && (
      <path d={`M ${ujung[0]} ${ujung[1]} l -26 -10 M ${ujung[0]} ${ujung[1]} l -14 22`} transform={`rotate(${ujung[2]} ${ujung[0]} ${ujung[1]})`} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" />
    )}
  </svg>
);

export const Tulisan: React.FC<{ x: number; y: number; teks: string; ukuran?: number; warna?: string; rot?: number; lebar?: number; z?: number }> = ({ x, y, teks, ukuran = 44, warna = C.tinta, rot = 0, lebar, z = 31 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: lebar, fontFamily: F.tangan, fontWeight: 700, fontSize: ukuran, color: warna, transform: `rotate(${rot}deg)`, lineHeight: 1.05, zIndex: z }}>{teks}</div>
);

// Pola halftone untuk mengisi bidang
export const halftone = (warna: string, ukuran = 8) => ({
  backgroundImage: `radial-gradient(${warna} ${ukuran * 0.22}px, transparent ${ukuran * 0.26}px)`,
  backgroundSize: `${ukuran}px ${ukuran}px`,
});
