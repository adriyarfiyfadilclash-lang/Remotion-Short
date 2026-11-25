// EP 01 — SEJARAH: Mesin Cetak (konsep: arsip, foto lama, koran).
// Warna dominan: krem, cokelat, merah, hitam. Satu ilustrasi utama + 3 elemen pendukung, ruang kosong lega.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, Cap, F, FilterKolase, GarisGambar, Grain, HurufPop, LatarKertas, Selotip, Sobekan, Tulisan, usePhotoDrop } from "./pustaka";

// Ilustrasi editorial mesin cetak ulir kayu (gaya buku pengetahuan: tinta + arsiran)
const MesinCetak: React.FC = () => {
  const kayu = "#9B7652", kayuGelap = "#6E5034", tinta = C.coklat;
  return (
    <svg viewBox="0 0 700 620" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="sepia" cx="0.45" cy="0.35" r="0.85">
          <stop offset="0" stopColor="#EADBC0" />
          <stop offset="0.7" stopColor="#CDB48E" />
          <stop offset="1" stopColor="#9C7E58" />
        </radialGradient>
      </defs>
      <rect width={700} height={620} fill="url(#sepia)" />
      {/* lantai & dinding */}
      <rect y={540} width={700} height={80} fill="#B39770" />
      <rect y={540} width={700} height={80} fill="url(#arsir)" opacity={0.25} />
      <line x1={0} y1={540} x2={700} y2={540} stroke={tinta} strokeWidth={3} />
      {/* bayangan mesin */}
      <ellipse cx={360} cy={556} rx={280} ry={20} fill={tinta} opacity={0.25} />
      <g stroke={tinta} strokeWidth={3} strokeLinejoin="round">
        {/* tiang kiri & kanan */}
        <rect x={168} y={70} width={46} height={480} fill={kayu} />
        <rect x={168} y={70} width={46} height={480} fill="url(#arsir)" opacity={0.3} stroke="none" />
        <rect x={486} y={70} width={46} height={480} fill={kayu} />
        <rect x={510} y={70} width={22} height={480} fill="url(#arsirRapat)" opacity={0.45} stroke="none" />
        {/* balok kepala & palang */}
        <rect x={140} y={56} width={420} height={64} rx={4} fill={kayu} />
        <rect x={140} y={96} width={420} height={24} fill="url(#arsirRapat)" opacity={0.35} stroke="none" />
        <rect x={168} y={226} width={364} height={40} fill={kayuGelap} />
        <rect x={168} y={226} width={364} height={40} fill="url(#arsir)" opacity={0.3} stroke="none" />
        {/* ulir penekan */}
        <rect x={332} y={120} width={36} height={196} fill="#B9A688" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M 332 ${128 + i * 15} L 368 ${138 + i * 15}`} fill="none" strokeWidth={2.5} />)}
        <rect x={352} y={120} width={16} height={196} fill="url(#arsirRapat)" opacity={0.4} stroke="none" />
        {/* tuas */}
        <path d="M 350 298 L 660 278" strokeWidth={14} strokeLinecap="round" stroke={tinta} />
        <path d="M 350 298 L 660 278" strokeWidth={8} strokeLinecap="round" stroke={kayu} />
        <circle cx={350} cy={300} r={16} fill="#B9A688" />
        {/* pelat penekan */}
        <rect x={262} y={318} width={176} height={30} fill="#8E8170" />
        <rect x={262} y={334} width={176} height={14} fill="url(#arsirSilang)" opacity={0.35} stroke="none" />
        {/* meja geser & kaki */}
        <rect x={96} y={378} width={540} height={34} fill={kayu} />
        <rect x={96} y={396} width={540} height={16} fill="url(#arsirRapat)" opacity={0.35} stroke="none" />
        <rect x={120} y={412} width={26} height={128} fill={kayuGelap} />
        <rect x={590} y={412} width={26} height={128} fill={kayuGelap} />
        {/* bentuk huruf logam di meja */}
        <rect x={276} y={360} width={150} height={18} fill="#5E5850" />
      </g>
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={279 + (i % 8) * 18} y={362 + Math.floor(i / 8) * 8} width={14} height={6} fill="#2E2A26" />)}
      {/* kertas tercetak */}
      <g transform="rotate(-4 520 350)">
        <rect x={452} y={318} width={130} height={60} fill="#F3ECE0" stroke={tinta} strokeWidth={2} />
        {Array.from({ length: 6 }, (_, i) => <line key={i} x1={462} y1={328 + i * 8} x2={572 - (i % 3) * 14} y2={328 + i * 8} stroke={tinta} strokeWidth={2} opacity={0.7} />)}
      </g>
      {/* bola tinta */}
      {[[176, 352], [218, 348]].map(([x, y], i) => (
        <g key={i} stroke={tinta} strokeWidth={2.5}>
          <rect x={x - 4} y={y - 46} width={8} height={36} fill={kayuGelap} />
          <ellipse cx={x} cy={y} rx={22} ry={14} fill="#4A3B30" />
          <ellipse cx={x} cy={y + 4} rx={22} ry={8} fill="url(#arsirRapat)" opacity={0.5} stroke="none" />
        </g>
      ))}
      {/* goresan cahaya jendela */}
      <path d="M 0 0 L 120 0 L 40 540 L 0 540 Z" fill="#fff" opacity={0.08} />
      <rect width={700} height={620} fill="url(#bintik)" opacity={0.07} />
    </svg>
  );
};

const FotoLama: React.FC = () => {
  const g = usePhotoDrop(16, -2, 3);
  return (
    <div style={{ position: "absolute", left: 110, top: 430, width: 860, transform: g.transform, opacity: g.opacity, zIndex: 8 }}>
      <div style={{ background: "#F3ECE0", padding: 30, boxShadow: `0 ${24 * g.bayang}px ${36 * g.bayang}px rgba(37,37,37,0.35)` }}>
        <div style={{ position: "relative", width: 800, height: 708 }}>
          <MesinCetak />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, transparent 60%, rgba(56,39,31,0.35))" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 26, color: C.abu }}>
          <span>Mesin cetak ulir kayu</span>
          <span>rekonstruksi ilustrasi</span>
        </div>
      </div>
    </div>
  );
};

export const Ep1Cetak: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna={C.krem} />

    <Sobekan x={60} y={60} w={500} h={70} warna={C.coklat} rot={-1.5} halus tunda={0}>
      <div style={{ padding: "9px 24px", fontFamily: F.poster, fontSize: 34, color: C.kertas, letterSpacing: 4 }}>DOKUMENTER · SEJARAH #01</div>
    </Sobekan>
    <HurufPop teks="Mesin Cetak" tunda={4} style={{ position: "absolute", left: 60, top: 160, fontFamily: F.serif, fontWeight: 900, fontSize: 132, color: C.hitam, lineHeight: 1 }} />
    <div style={{ position: "absolute", left: 66, top: 310 }}>
      <HurufPop teks="yang mengubah cara dunia membaca" tunda={14} jeda={0.7} style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 52, color: C.merah }} />
    </div>

    <FotoLama />
    <Selotip tunda={24} x={120} y={414} w={150} rot={-14} warna="rgba(242,201,76,0.55)" />
    <Selotip tunda={26} x={820} y={410} w={150} rot={12} warna="rgba(242,201,76,0.55)" />

    {/* anotasi tergambar */}
    <GarisGambar d="M 540 560 C 600 540, 660 610, 650 700 C 640 800, 560 830, 520 800 C 470 760, 470 620, 540 560" tunda={40} warna={C.merah} tebal={5} />
    <Tulisan tunda={44} x={700} y={520} teks="ulir penekan" ukuran={44} warna={C.merah} rot={-4} />
    <GarisGambar d="M 800 590 C 770 610, 730 630, 690 650" tunda={46} warna={C.merah} tebal={4} panah />
    <GarisGambar d="M 700 1290 C 640 1200, 580 1060, 540 905" tunda={50} warna={C.hitam} tebal={4} panah />
    <Tulisan tunda={56} x={600} y={1290} teks={"huruf logam yang\nbisa disusun ulang"} ukuran={44} rot={-2} lebar={420} />

    {/* guntingan koran */}
    <Sobekan x={60} y={1390} w={620} h={360} warna={C.kertas} rot={-1.5} tunda={28} dari="kiri">
      <div style={{ padding: "28px 36px", fontFamily: F.serif }}>
        <div style={{ fontFamily: F.poster, fontSize: 22, letterSpacing: 4, color: C.merah }}>MAINZ, ± 1450</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: C.hitam, lineHeight: 1.05, marginTop: 8 }}>Buku tak lagi harus disalin tangan</div>
        <div style={{ height: 3, background: C.hitam, margin: "14px 0" }} />
        <div style={{ fontSize: 23, lineHeight: 1.4, color: "#3A332D" }}>Johannes Gutenberg memadukan huruf logam yang dapat disusun ulang dengan mesin tekan. Buku bisa dicetak jauh lebih cepat.</div>
      </div>
    </Sobekan>
    <Cap x={860} y={1560} r={118} teks="• ALKITAB GUTENBERG •" tengah="1455" tunda={60} rot={-10} />
    <Tulisan tunda={66} x={780} y={1700} teks="buku cetak besar pertama di Eropa" ukuran={32} warna={C.coklat} rot={-3} lebar={260} />
    <div style={{ position: "absolute", left: 60, bottom: 50, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: Encyclopaedia Britannica · ilustrasi editorial</div>
    <Grain />
  </AbsoluteFill>
);
