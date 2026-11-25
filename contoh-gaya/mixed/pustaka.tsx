// Komponen gaya ADRIY Mixed Media, diadaptasi dari pustaka di .claude/skills/adriy-mixed-media/library
// (PaperLayer, CollageCard, PhotoCutout, DepthStack, FloatingMedia, tipografi & efek kolase).
// Tekstur kertas, grain, dan tepi sobek dibuat dengan filter SVG; "foto" berupa ilustrasi duotone/halftone buatan sendiri.
import React from "react";
import { Img, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { tangan: "Caveat", serif: "Playfair Display", poster: "Anton", sans: FONT };
// Palet Mixed Media Documentary — pilih 3–4 warna dominan per episode, jangan semua sekaligus
export const C = {
  krem: "#D5C1A1", coklat: "#38271F", kertas: "#E9E0D0", merah: "#D92743", kuning: "#F2C94C", toska: "#65BFB2", hitam: "#252525",
  // turunan (bayangan & teks sekunder)
  tinta: "#252525", abu: "#6B5E52", kraft: "#B89B72", krem2: "#F3ECE0",
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
      <pattern id="arsir" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <line x1="0" y1="0" x2="0" y2="7" stroke="#252525" strokeWidth="1.6" />
      </pattern>
      <pattern id="arsirRapat" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <line x1="0" y1="0" x2="0" y2="4.5" stroke="#252525" strokeWidth="1.5" />
      </pattern>
      <pattern id="arsirSilang" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <path d="M0 0 V6 M0 0 H6" stroke="#252525" strokeWidth="1.3" />
      </pattern>
      <pattern id="bintik" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" fill="#252525" />
        <circle cx="4.5" cy="4.5" r="0.8" fill="#252525" />
      </pattern>
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
  x: number; y: number; w: number; h: number; warna: string; rot?: number; children?: React.ReactNode; tunda?: number; halus?: boolean; bayang?: number; z?: number; dari?: "kiri" | "kanan" | "bawah";
}> = ({ x, y, w, h, warna, rot = 0, children, tunda = 0, halus, bayang = 1, z, dari = "kiri" }) => {
  const g = usePaperReveal(tunda, dari, x + y);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `${g.transform} rotate(${rot}deg)`, opacity: g.opacity, zIndex: z, filter: `drop-shadow(0 ${10 * bayang}px ${14 * bayang}px rgba(37,37,37,0.28))` }}>
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
export const Selotip: React.FC<{ x: number; y: number; w?: number; rot?: number; warna?: string; tunda?: number }> = ({ x, y, w = 160, rot = 0, warna = "rgba(247,201,72,0.6)", tunda = 0 }) => {
  const f = useCurrentFrame();
  const t = Math.min(1, Math.max(0, (f - tunda) / 6));
  return (
  <div
    style={{
      position: "absolute", left: x, top: y, width: w * (0.3 + 0.7 * t), height: 46, opacity: t, background: warna, transform: `rotate(${rot}deg)`, zIndex: 20,
      clipPath: "polygon(0% 8%,3% 0%,6% 10%,9% 0%,12% 8%,15% 0%,85% 0%,88% 9%,91% 0%,94% 8%,97% 0%,100% 10%,100% 92%,97% 100%,94% 90%,91% 100%,88% 92%,85% 100%,15% 100%,12% 91%,9% 100%,6% 90%,3% 100%,0% 92%)",
      boxShadow: "inset 0 0 0 100px rgba(255,255,255,0.15)",
    }}
  />
  );
};

// Polaroid dengan "foto" ilustrasi + keterangan tulisan tangan
export const Polaroid: React.FC<{ x: number; y: number; w: number; rot?: number; foto: React.ReactNode; teks: string; tunda?: number }> = ({ x, y, w, rot = 0, foto, teks, tunda = 0 }) => {
  const g = usePhotoDrop(tunda, rot, x);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: g.transform, opacity: g.opacity, background: "#FBF8F1", padding: `${w * 0.06}px ${w * 0.06}px ${w * 0.2}px`, boxShadow: "0 16px 26px rgba(28,25,23,0.32), 0 2px 0 rgba(28,25,23,0.1)", boxSizing: "border-box" }}>
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
  const st = useStampImpact(tunda);
  const id = `busur-${teks.length}-${r}`;
  return (
    <svg width={r * 2 + 20} height={r * 2 + 20} viewBox={`${-r - 10} ${-r - 10} ${r * 2 + 20} ${r * 2 + 20}`} style={{ position: "absolute", left: x - r - 10 + st.getar, top: y - r - 10, transform: `rotate(${rot}deg) scale(${st.skala})`, opacity: st.opacity, zIndex: 25 }}>
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

export const Tulisan: React.FC<{ x: number; y: number; teks: string; ukuran?: number; warna?: string; rot?: number; lebar?: number; z?: number; tunda?: number }> = ({ x, y, teks, ukuran = 44, warna = C.tinta, rot = 0, lebar, z = 31, tunda = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: lebar, clipPath: `inset(0 ${100 - Math.min(100, Math.max(0, (useCurrentFrame() - tunda) * 6))}% 0 0)`, fontFamily: F.tangan, fontWeight: 700, fontSize: ukuran, color: warna, transform: `rotate(${rot}deg)`, lineHeight: 1.05, zIndex: z }}>{teks}</div>
);

// Pola halftone untuk mengisi bidang
export const halftone = (warna: string, ukuran = 8) => ({
  backgroundImage: `radial-gradient(${warna} ${ukuran * 0.22}px, transparent ${ukuran * 0.26}px)`,
  backgroundSize: `${ukuran}px ${ukuran}px`,
});

// =================== LIMA GERAKAN DASAR ===================
const acak = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// 01 Paper Reveal: kertas masuk dari samping dengan goyangan tidak beraturan lalu mapan
export const usePaperReveal = (tunda: number, dari: "kiri" | "kanan" | "bawah" = "kiri", seed = 1) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - tunda, fps, config: { damping: 15, mass: 0.9, stiffness: 90 } });
  const sisa = 1 - p;
  const goyang = sisa * Math.sin((f - tunda) * 0.7 + seed) * 7;
  const jarak = 1300 * sisa;
  const x = dari === "kiri" ? -jarak : dari === "kanan" ? jarak : 0;
  const y = dari === "bawah" ? jarak : sisa * 40 * Math.sin(seed + (f - tunda) * 0.4);
  return { transform: `translate(${x}px, ${y}px) rotate(${goyang}deg)`, opacity: p > 0.01 ? 1 : 0 };
};

// 02 Photo Drop: foto jatuh dari atas, berputar sedikit, memantul, berhenti
export const usePhotoDrop = (tunda: number, rotAkhir = 0, seed = 1) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - tunda, fps, config: { damping: 9, mass: 1, stiffness: 110 } });
  const putar = rotAkhir + (1 - p) * (18 + acak(seed) * 14) * (seed % 2 ? 1 : -1);
  return {
    transform: `translateY(${-(1 - p) * 900}px) rotate(${putar}deg) scale(${1 + (1 - Math.min(1, p)) * 0.18})`,
    opacity: f >= tunda ? 1 : 0,
    bayang: Math.min(1, p),
  };
};

// 03 Draw Animation: garis, panah, lingkaran tergambar bertahap
export const GarisGambar: React.FC<{ d: string; tunda: number; lama?: number; warna?: string; tebal?: number; panah?: boolean; z?: number }> = ({ d, tunda, lama = 20, warna = C.merah, tebal = 5, panah, z = 30 }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (f - tunda) / lama));
  const e = 1 - Math.pow(1 - p, 3);
  const id = `ujung-${Math.round(acak(d.length + tunda) * 1e6)}`;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: z }}>
      <defs>
        <marker id={id} markerUnits="userSpaceOnUse" markerWidth="40" markerHeight="40" refX="20" refY="20" orient="auto">
          <path d="M 4 8 L 22 20 L 4 32" fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - e} markerEnd={panah && p >= 1 ? `url(#${id})` : undefined} opacity={p > 0 ? 1 : 0} />
    </svg>
  );
};

// 04 Typography Pop: huruf muncul satu per satu dengan sedikit pergeseran posisi
export const HurufPop: React.FC<{ teks: string; tunda: number; style: React.CSSProperties; jeda?: number; acakPosisi?: number }> = ({ teks, tunda, style, jeda = 1.6, acakPosisi = 4 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...style, display: "flex", flexWrap: "wrap", whiteSpace: "pre" }}>
      {teks.split("").map((h, i) => {
        const s = spring({ frame: f - tunda - i * jeda, fps, config: { damping: 10, mass: 0.5 } });
        const dy = (acak(i + teks.length) - 0.5) * acakPosisi;
        const r = (acak(i * 3 + 1) - 0.5) * acakPosisi * 0.6;
        return (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - s) * 40 + dy}px) rotate(${r}deg) scale(${0.6 + 0.4 * s})`, opacity: Math.min(1, s * 2) }}>{h}</span>
        );
      })}
    </div>
  );
};

// 05 Stamp Impact: cap menghantam, sedikit memantul, layar bergetar sekejap
export const useStampImpact = (tunda: number) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f - tunda;
  const p = spring({ frame: t, fps, config: { damping: 11, mass: 0.6, stiffness: 200 } });
  const getar = t > 0 && t < 8 ? Math.sin(t * 3) * (8 - t) * 0.8 : 0;
  return { skala: t < 0 ? 2.2 : Math.max(0.92, 1 + (1 - p) * 1.2), opacity: t < 0 ? 0 : Math.min(1, t / 2) * 0.92, getar };
};

// =================== ARSIP ASLI ===================
// Cetakan arsip (gravir, gambar paten, poster lama) ditempel di kertas karton dengan Photo Drop.
// Gambar dari public/arsip — lihat public/arsip/SUMBER.md untuk lisensi.
export const Arsip: React.FC<{
  src: string; x: number; y: number; w: number; rasio: number; tunda: number; rot?: number; bingkai?: number; warnaBingkai?: string;
  keterangan?: string; kredit?: string; children?: React.ReactNode; filter?: string;
}> = ({ src, x, y, w, rasio, tunda, rot = 0, bingkai = 22, warnaBingkai = "#F3ECE0", keterangan, kredit, children, filter = "sepia(0.18) contrast(1.04)" }) => {
  const g = usePhotoDrop(tunda, rot, Math.round(x + y));
  const h = w / rasio;
  return (
    <div style={{ position: "absolute", left: x - bingkai, top: y - bingkai, width: w + bingkai * 2, transform: g.transform, opacity: g.opacity, zIndex: 8 }}>
      <div style={{ background: warnaBingkai, padding: bingkai, paddingBottom: keterangan ? bingkai + 46 : bingkai, boxShadow: `0 ${22 * g.bayang}px ${34 * g.bayang}px rgba(37,37,37,0.34), 0 2px 0 rgba(37,37,37,0.12)`, position: "relative" }}>
        <div style={{ position: "relative", width: w, height: h, overflow: "hidden" }}>
          <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter, display: "block" }} />
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 60px rgba(56,39,31,0.25)" }} />
          <svg width={w} height={h} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", opacity: 0.35 }}>
            <rect width={w} height={h} fill="#000" filter="url(#seratKertas)" />
          </svg>
          {children}
        </div>
        {keterangan && (
          <div style={{ position: "absolute", left: bingkai, right: bingkai, bottom: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: F.serif }}>
            <span style={{ fontStyle: "italic", fontWeight: 700, fontSize: 24, color: "#38271F" }}>{keterangan}</span>
            {kredit && <span style={{ fontFamily: F.sans, fontSize: 17, color: "#6B5E52" }}>{kredit}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// Pin bernomor gaya museum (dipasang di atas arsip, koordinat layar)
export const PinMuseum: React.FC<{ x: number; y: number; n: number; tunda: number; warna?: string }> = ({ x, y, n, tunda, warna = C.merah }) => {
  const st = useStampImpact(tunda);
  return (
    <div style={{ position: "absolute", left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, background: warna, color: "#fff", border: "3px solid #F3ECE0", boxShadow: "0 4px 10px rgba(37,37,37,0.4)", display: "grid", placeItems: "center", fontFamily: F.poster, fontSize: 24, transform: `scale(${Math.min(st.skala, 1.6)})`, opacity: st.opacity > 0 ? 1 : 0, zIndex: 32 }}>{n}</div>
  );
};
