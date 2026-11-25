// EP 02 — PENEMUAN: Lampu Pijar (konsep: sketsa, kertas grafik, catatan).
// Warna dominan: kertas terang, hitam, kuning, toska.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, Cap, F, FilterKolase, GarisGambar, Grain, HurufPop, LatarKertas, Selotip, Sobekan, Tulisan, usePhotoDrop } from "./pustaka";

// Sketsa teknis bola lampu (garis tinta + arsiran + cahaya filamen)
const SketsaLampu: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none" }}>
    <defs>
      <radialGradient id="pijar" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFF6C9" stopOpacity="1" />
        <stop offset="0.35" stopColor={C.kuning} stopOpacity="0.75" />
        <stop offset="1" stopColor={C.kuning} stopOpacity="0" />
      </radialGradient>
    </defs>
    <g transform="translate(520 860)" stroke={C.hitam} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx={0} cy={-40} r={230} fill="url(#pijar)" stroke="none" />
      {/* kaca bola (garis ganda ala sketsa) */}
      <path d="M -90 250 C -100 170, -210 120, -210 -40 C -210 -190, -110 -270, 0 -270 C 110 -270, 210 -190, 210 -40 C 210 120, 100 170, 90 250" strokeWidth={5} />
      <path d="M -82 246 C -94 172, -198 122, -199 -40 C -199 -180, -104 -258, 0 -259" strokeWidth={2} opacity={0.5} />
      {/* kilau kaca */}
      <path d="M -150 -120 C -140 -190, -90 -225, -40 -235" strokeWidth={6} stroke="#fff" />
      <path d="M -160 -60 C -162 -80, -160 -95, -155 -105" strokeWidth={6} stroke="#fff" />
      {/* batang kaca & kawat penyangga */}
      <path d="M -40 250 L -30 60 L 30 60 L 40 250" strokeWidth={4} fill="#F3ECE0" />
      <path d="M -20 60 L -90 -90 M 20 60 L 90 -90" strokeWidth={4} />
      <path d="M 0 60 L 0 -40 M 0 -40 L -40 -110 M 0 -40 L 40 -110" strokeWidth={3} />
      {/* filamen spiral */}
      <path d="M -90 -90 q 10 -24 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#7A4A0F" strokeWidth={6} />
      <path d="M -90 -90 q 10 -24 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#FFF3B0" strokeWidth={2} />
      {/* leher & ulir */}
      <path d="M -92 250 L 92 250 L 86 290 L -86 290 Z" strokeWidth={4} fill="#D8D2C6" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M -86 ${296 + i * 26} C -40 ${284 + i * 26}, 40 ${284 + i * 26}, 86 ${296 + i * 26} L 86 ${314 + i * 26} C 40 ${302 + i * 26}, -40 ${302 + i * 26}, -86 ${314 + i * 26} Z`} strokeWidth={3.5} fill="#C9C2B4" />
      ))}
      <path d="M -70 426 L 70 426 L 40 470 L -40 470 Z" strokeWidth={4} fill={C.hitam} />
      <rect x={-86} y={290} width={60} height={136} fill="url(#arsirRapat)" stroke="none" opacity={0.35} />
      <ellipse cx={0} cy={478} rx={26} ry={10} strokeWidth={4} fill="#B8A57A" />
    </g>
  </svg>
);

const Catatan: React.FC = () => {
  const g = usePhotoDrop(24, 5, 5);
  return (
    <div style={{ position: "absolute", left: 720, top: 470, width: 300, transform: g.transform, opacity: g.opacity, zIndex: 18 }}>
      <div style={{ background: C.kuning, padding: "26px 24px 30px", boxShadow: `0 ${18 * g.bayang}px ${24 * g.bayang}px rgba(37,37,37,0.3)`, clipPath: "polygon(0 0,100% 0,100% 88%,88% 100%,0 100%)" }}>
        <div style={{ fontFamily: F.poster, fontSize: 64, color: C.hitam, lineHeight: 1 }}>1879</div>
        <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 36, color: C.hitam, lineHeight: 1.05, marginTop: 8 }}>Edison & tim membuat lampu pijar yang tahan lama</div>
      </div>
    </div>
  );
};

const LABEL: { n: number; teks: string; garis: string; x: number; y: number; tunda: number }[] = [
  { n: 1, teks: "kaca bola", garis: "M 690 760 C 720 780, 760 800, 800 820", x: 812, y: 800, tunda: 44 },
  { n: 2, teks: "filamen tungsten", garis: "M 560 770 C 500 720, 420 700, 370 700", x: 60, y: 670, tunda: 48 },
  { n: 3, teks: "kawat penyangga", garis: "M 450 830 C 420 860, 400 890, 375 905", x: 60, y: 880, tunda: 52 },
  { n: 4, teks: "gas lembam", garis: "M 640 980 C 700 1000, 760 1010, 800 1010", x: 812, y: 990, tunda: 56 },
  { n: 5, teks: "ulir & kontak", garis: "M 600 1200 C 680 1220, 740 1230, 800 1230", x: 812, y: 1210, tunda: 60 },
];

export const Ep2Lampu: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna={C.kertas} />

    <Sobekan x={60} y={60} w={600} h={70} warna={C.toska} rot={-1.5} halus>
      <div style={{ padding: "9px 24px", fontFamily: F.poster, fontSize: 34, color: C.hitam, letterSpacing: 4 }}>DOKUMENTER · PENEMUAN #02</div>
    </Sobekan>
    <div style={{ position: "absolute", left: 64, top: 160, fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 56, color: C.hitam }}>Cara kerja</div>
    <HurufPop teks="LAMPU PIJAR" tunda={4} style={{ position: "absolute", left: 60, top: 228, fontFamily: F.poster, fontSize: 150, color: C.hitam, lineHeight: 1, letterSpacing: 2 }} />

    {/* kertas grafik sobek */}
    <Sobekan x={50} y={430} w={980} h={1010} warna="#F7F3EA" rot={1} tunda={10} dari="kanan" bayang={0.8}>
      <svg width={980} height={1010} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 50 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 20 + 10} x2={980} y2={i * 20 + 10} stroke={C.toska} strokeWidth={i % 5 === 0 ? 1.6 : 0.8} opacity={0.45} />)}
        {Array.from({ length: 49 }, (_, i) => <line key={`v${i}`} x1={i * 20 + 10} y1={0} x2={i * 20 + 10} y2={1010} stroke={C.toska} strokeWidth={i % 5 === 0 ? 1.6 : 0.8} opacity={0.45} />)}
      </svg>
      <div style={{ position: "absolute", left: 30, bottom: 26, fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: C.abu }}>gbr. 1 — potongan bola lampu pijar</div>
    </Sobekan>
    <SketsaLampu />
    <Catatan />
    <Selotip tunda={32} x={820} y={452} w={120} rot={-10} warna="rgba(255,255,255,0.6)" />

    {/* label bernomor dengan garis tergambar */}
    {LABEL.map((l) => (
      <React.Fragment key={l.n}>
        <GarisGambar d={l.garis} tunda={l.tunda} lama={14} warna={C.hitam} tebal={3} />
        <div style={{ position: "absolute", left: l.x, top: l.y, display: "flex", alignItems: "center", gap: 10, zIndex: 31 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: C.toska, color: C.hitam, fontFamily: F.poster, fontSize: 24, display: "grid", placeItems: "center", border: `3px solid ${C.hitam}` }}>{l.n}</div>
          <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 40, color: C.hitam }}>{l.teks}</div>
        </div>
      </React.Fragment>
    ))}

    {/* strip fakta toska */}
    <Sobekan x={40} y={1500} w={700} h={270} warna={C.toska} rot={-2} tunda={34} dari="bawah">
      <div style={{ padding: "26px 36px", display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ fontFamily: F.poster, fontSize: 96, color: C.hitam, lineHeight: 1 }}>±2.500°C</div>
        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 30, color: C.hitam, lineHeight: 1.2 }}>Arus listrik memanaskan filamen hingga berpijar.</div>
      </div>
      <div style={{ position: "absolute", left: 36, bottom: 24, fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: C.hitam }}>* sebagian besar energinya jadi panas, bukan cahaya</div>
    </Sobekan>
    <Cap x={890} y={1640} r={110} teks="• US 223.898 • PATEN •" tengah="1880" warna={C.hitam} rot={8} tunda={66} />
    <div style={{ position: "absolute", left: 60, bottom: 50, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: Britannica, U.S. Patent 223,898 · ilustrasi editorial</div>
    <Grain o={0.12} />
  </AbsoluteFill>
);
