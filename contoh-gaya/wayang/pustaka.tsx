// Komponen gaya ADRIY Indonesian Wayang, diadaptasi dari pustaka di .claude/skills/adriy-indonesian-wayang/library
// (kelir, blencong/lampu minyak, bayangan, gunungan, tipografi). Figur wayang memakai FOTO WAYANG ASLI
// berstatus domain publik (Album Wayang Kulit Banjar, 2002) yang latarnya dihapus — lihat public/arsip/SUMBER.md.
import React from "react";
import { Img, continueRender, delayRender, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { serif: "Playfair Display", poster: "Anton", sans: FONT };
export const WK = {
  malam: "#140C08", kayu: "#3B2014", marun: "#7A1F1A", emas: "#D9A441", emasTerang: "#F3D08A", kelir: "#EFE3C8", pisang: "#8FA36A",
};

if (typeof document !== "undefined") {
  const t = delayRender("font wayang");
  Promise.all(
    [["Playfair Display", "playfair-900", "900", "normal"], ["Playfair Display", "playfair-700-italic", "700", "italic"], ["Anton", "anton-400", "400", "normal"]].map(([fam, file, w, st]) =>
      new FontFace(fam, `url(${staticFile(`font/${file}.woff2`)}) format("woff2")`, { weight: w, style: st }).load().then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  ).then(() => continueRender(t)).catch(() => continueRender(t));
}

export const usePop = (tunda: number, damping = 12) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - tunda, fps, config: { damping, mass: 0.9, stiffness: 90 } });
};

// Nyala blencong yang berkedip halus (deterministik)
export const useNyala = () => {
  const f = useCurrentFrame();
  return 0.88 + 0.06 * Math.sin(f / 3.1) + 0.04 * Math.sin(f / 1.7 + 1) + 0.02 * Math.sin(f / 0.9);
};

export const KELIR = { atas: 430, bawah: 1470, kiri: 30, kanan: 1050, lampuX: 540, lampuY: 410 };

// Panggung: malam, kelir yang disinari blencong, gawangan kayu di atas, batang pisang di bawah
export const Panggung: React.FC<{ children?: React.ReactNode; depan?: React.ReactNode }> = ({ children, depan }) => {
  const n = useNyala();
  const { atas, bawah, kiri, kanan, lampuX, lampuY } = KELIR;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%, #2A1810, ${WK.malam} 70%)` }} />
      {/* kelir */}
      <div style={{ position: "absolute", left: kiri, top: atas, width: kanan - kiri, height: bawah - atas, background: WK.kelir, overflow: "hidden", boxShadow: "0 0 80px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at ${lampuX - kiri}px 60px, rgba(255,214,150,${0.55 * n}), rgba(255,190,110,${0.18 * n}) 45%, rgba(40,20,10,0.55) 100%)` }} />
        {/* serat kain */}
        <svg width={kanan - kiri} height={bawah - atas} style={{ position: "absolute", inset: 0, opacity: 0.18, mixBlendMode: "multiply" }}>
          <filter id="kain"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.05" numOctaves="2" seed="5" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#kain)" />
        </svg>
        {/* pinggir kelir merah (plisir) */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: WK.marun }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 18, background: WK.marun }} />
      </div>
      {children}
      {/* gawangan kayu berukir */}
      <div style={{ position: "absolute", left: 0, right: 0, top: atas - 34, height: 46, background: `linear-gradient(180deg, #6B3A22, ${WK.kayu})`, boxShadow: "0 8px 18px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 8, height: 4, background: WK.emas, opacity: 0.8 }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, height: 2, background: WK.emas, opacity: 0.6 }} />
        <svg width={W} height={46} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 27 }, (_, i) => <path key={i} d={`M ${i * 40 + 6} 30 q 14 -16 28 0`} stroke={WK.emas} strokeWidth={2} fill="none" opacity={0.7} />)}
        </svg>
      </div>
      {/* batang pisang (tempat wayang ditancapkan) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: bawah - 30, height: 64, borderRadius: 32, background: "linear-gradient(180deg, #C9D3A0 0%, #8FA36A 45%, #55663D 100%)", boxShadow: "0 12px 24px rgba(0,0,0,0.6)" }}>
        <svg width={W} height={64} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
          {Array.from({ length: 40 }, (_, i) => <line key={i} x1={i * 28} y1={6} x2={i * 28 + 14} y2={58} stroke="#3E4A2A" strokeWidth={1.5} />)}
        </svg>
      </div>
      {depan}
      {/* blencong: lampu minyak kuningan berbentuk burung */}
      <svg width={300} height={260} viewBox="-150 -200 300 260" style={{ position: "absolute", left: lampuX - 150, top: lampuY - 200, overflow: "visible" }}>
        <defs>
          <radialGradient id="cahayaApi">
            <stop offset="0" stopColor="#FFF2C4" stopOpacity={0.95 * n} />
            <stop offset="0.25" stopColor="#FFC56B" stopOpacity={0.5 * n} />
            <stop offset="1" stopColor="#FF9A3C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kuningan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3D08A" />
            <stop offset="0.5" stopColor="#B98A3E" />
            <stop offset="1" stopColor="#6B4A1E" />
          </linearGradient>
        </defs>
        <circle cx={0} cy={0} r={170 * n} fill="url(#cahayaApi)" />
        <path d="M -70 -10 C -60 -60, 50 -70, 80 -30 C 96 -10, 60 10, 20 6 L -40 6 C -60 6, -74 2, -70 -10 Z" fill="url(#kuningan)" stroke="#4A3015" strokeWidth={2} />
        <path d="M 80 -30 C 96 -50, 110 -48, 112 -36 C 104 -36, 96 -30, 90 -22 Z" fill="url(#kuningan)" />
        <path d="M -60 -40 C -90 -90, -40 -110, -20 -70 C -40 -80, -56 -64, -48 -44 Z" fill="url(#kuningan)" />
        <circle cx={96} cy={-38} r={3} fill="#2A1A10" />
        <path d="M -20 -70 C -24 -90, -6 -96, 0 -70" fill="url(#kuningan)" />
        {/* api */}
        <path d={`M 104 ${-34} C ${100 - 4 * n} ${-60 - 8 * n}, ${120 + 4 * n} ${-70 - 10 * n}, 112 ${-34} Z`} fill="#FFE29A" transform="translate(-4 0)" />
        <path d={`M 104 ${-34} C 102 ${-50 - 6 * n}, 114 ${-56 - 6 * n}, 110 ${-34} Z`} fill="#FFFFFF" transform="translate(-4 0)" />
      </svg>
    </>
  );
};

// Satu figur wayang asli, ditancapkan (naik dari batang pisang) + bayangan di kelir sesuai posisi lampu
export const Wayang: React.FC<{ src: string; x: number; tinggi: number; rasio: number; tunda: number; cermin?: boolean; goyang?: number; z?: number }> = ({ src, x, tinggi, rasio, tunda, cermin, goyang = 1, z = 5 }) => {
  const f = useCurrentFrame();
  const p = usePop(tunda, 14);
  const lebar = tinggi * rasio;
  const atas = KELIR.bawah + 10 - tinggi; // ujung gapit masuk ke batang pisang
  const geserBayang = (x - KELIR.lampuX) * 0.09;
  const ayun = Math.sin((f - tunda) / 22) * 1.2 * goyang;
  return (
    <div style={{ position: "absolute", left: x - lebar / 2, top: atas + (1 - p) * 520, width: lebar, height: tinggi, transform: `rotate(${ayun}deg)`, transformOrigin: "50% 100%", zIndex: z, opacity: p > 0.01 ? 1 : 0 }}>
      {/* bayangan di kelir */}
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: `translate(${geserBayang + 18}px, 26px) scale(${cermin ? -1.06 : 1.06}, 1.06)`, filter: "brightness(0) blur(7px)", opacity: 0.5 }} />
      {/* wayang berwarna (sisi dalang) */}
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: cermin ? "scaleX(-1)" : undefined, filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.45)) saturate(1.05) contrast(1.05)" }} />
    </div>
  );
};

// Ornamen emas (tumpal/garis ukir) sebagai pemisah
export const Ornamen: React.FC<{ y: number; lebar?: number }> = ({ y, lebar = 760 }) => (
  <svg width={lebar} height={30} viewBox={`0 0 ${lebar} 30`} style={{ position: "absolute", left: (W - lebar) / 2, top: y }}>
    <line x1={0} y1={15} x2={lebar / 2 - 40} y2={15} stroke={WK.emas} strokeWidth={2} />
    <line x1={lebar / 2 + 40} y1={15} x2={lebar} y2={15} stroke={WK.emas} strokeWidth={2} />
    <path d={`M ${lebar / 2} 2 L ${lebar / 2 + 14} 15 L ${lebar / 2} 28 L ${lebar / 2 - 14} 15 Z`} fill={WK.emas} />
    <path d={`M ${lebar / 2 - 34} 15 l 10 -8 l 10 8 l -10 8 Z M ${lebar / 2 + 14} 15 l 10 -8 l 10 8 l -10 8 Z`} fill="none" stroke={WK.emas} strokeWidth={2} />
  </svg>
);

export const Kepala: React.FC<{ teks: string }> = ({ teks }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 54, textAlign: "center", fontFamily: F.poster, fontSize: 26, letterSpacing: 8, color: WK.emas }}>{teks}</div>
);

export const Judul: React.FC<{ kecil: string; besar: string; tunda?: number; ukuran?: number }> = ({ kecil, besar, tunda = 2, ukuran = 120 }) => {
  const p = usePop(tunda);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 100, textAlign: "center", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 30}px)` }}>
      <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 46, color: WK.kelir }}>{kecil}</div>
      <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: ukuran, lineHeight: 1, letterSpacing: 4, background: `linear-gradient(180deg, ${WK.emasTerang}, ${WK.emas} 55%, #8C5E1F)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))" }}>{besar}</div>
    </div>
  );
};

// Plakat nama berbingkai emas
export const Plakat: React.FC<{ x: number; y: number; lebar: number; nama: string; isi?: string; tunda: number; align?: "center" | "left" }> = ({ x, y, lebar, nama, isi, tunda, align = "center" }) => {
  const p = usePop(tunda);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: lebar, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 24}px)`, zIndex: 20, textAlign: align }}>
      <div style={{ background: "linear-gradient(180deg, #2A1810, #1A0F0A)", border: `2px solid ${WK.emas}`, outline: "1px solid rgba(217,164,65,0.4)", outlineOffset: 4, padding: "12px 14px" }}>
        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 30, color: WK.emasTerang, lineHeight: 1.05 }}>{nama}</div>
        {isi && <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 21, color: "#E6D6B8", marginTop: 6, lineHeight: 1.25 }}>{isi}</div>}
      </div>
    </div>
  );
};

export const Sumber: React.FC<{ teks: string }> = ({ teks }) => (
  <div style={{ position: "absolute", left: 40, right: 40, bottom: 26, textAlign: "center", fontFamily: F.sans, fontSize: 18, color: "#A8906A" }}>{teks}</div>
);
