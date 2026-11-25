// EP 02 — Gunung Api: diorama kertas yang dipotong separuh (cutaway) — lapisan batuan, saluran, dapur magma.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Benang, F, FilterKertas, Grain, JudulKertas, K, Lapis, LatarKarton, Tag, W, usePaperPop } from "./pustaka";

// kerucut gunung (stratovolcano) dengan puncak terpotong di (540, 760)
const kerucut = (puncakY: number, kakiY: number, lebar: number, kawah = 70) =>
  `M ${540 - lebar} ${kakiY} C ${540 - lebar * 0.6} ${kakiY - 60}, ${540 - kawah - 40} ${puncakY + 80}, ${540 - kawah} ${puncakY} L ${540 + kawah} ${puncakY} C ${540 + kawah + 40} ${puncakY + 80}, ${540 + lebar * 0.6} ${kakiY - 60}, ${540 + lebar} ${kakiY} Z`;

export const Ep2Gunung: React.FC = () => {
  const f = useCurrentFrame();
  const asap = usePaperPop(28);
  const denyut = 0.5 + 0.5 * Math.sin(f / 7);
  const LAPISAN = ["#7A6A58", "#9A8670", "#6B5B4B", "#A58F75", "#83705C", "#5E4F41"];
  return (
    <AbsoluteFill>
      <FilterKertas />
      <LatarKarton warna="#EAD9BD" cahaya="rgba(255,236,200,0.6)" />
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="magma" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor="#FFD36E" />
            <stop offset="0.45" stopColor="#F28A3C" />
            <stop offset="1" stopColor="#B83A22" />
          </radialGradient>
          <linearGradient id="saluran" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#F28A3C" />
            <stop offset="1" stopColor="#FFD36E" />
          </linearGradient>
          <clipPath id="potong"><rect x={540} y={0} width={600} height={1920} /></clipPath>
        </defs>

        {/* langit sore & gunung jauh */}
        <Lapis dalam={4} warna="#E9C9A0" d="M -20 760 C 140 700, 240 720, 330 660 C 420 600, 520 640, 600 600 C 720 560, 860 640, 1100 600 L 1100 1960 L -20 1960 Z" tunda={2} sorot="#F6E3C6" />
        <Lapis dalam={3} warna="#C9A783" d="M -20 860 L 120 720 L 210 800 L 330 690 L 450 830 L 640 860 L 780 740 L 900 820 L 1100 760 L 1100 1960 L -20 1960 Z" tunda={4} sorot="#E2C6A4" />

        {/* awan abu letusan: tumpukan lingkaran kertas */}
        <g opacity={Math.min(1, asap * 1.5)} transform={`translate(${540 * 0.3} ${230 + (1 - asap) * 200}) scale(0.7)`}>
          {[[540, 520, 110, "#8E8478"], [440, 450, 90, "#A39A8D"], [650, 440, 100, "#9A9084"], [540, 360, 120, "#B4AB9E"], [400, 330, 80, "#C4BCB0"], [690, 320, 90, "#BDB4A7"], [560, 250, 90, "#D2CABE"]].map(([x, y, r, c], i) => (
            <Lapis key={i} dalam={(i < 2 ? 2 : 3) as 2 | 3} warna={c as string} d={`M ${x} ${y} m -${r} 0 a ${r} ${r} 0 1 0 ${(r as number) * 2} 0 a ${r} ${r} 0 1 0 -${(r as number) * 2} 0`} tunda={28 + i * 2} geser={60} sorot="#E4DED4" />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M ${430 + (i * 37) % 230} ${480 + ((i * 53) % 120)} l 8 -14 l 8 14 Z`} fill="#3A322A" opacity={0.7} transform={`translate(0 ${-((f * 1.5 + i * 20) % 80)})`} />
          ))}
        </g>

        {/* gunung utama: badan luar (kiri) */}
        <Lapis dalam={2} warna="#8C7A64" d={kerucut(760, 1500, 520)} tunda={10} geser={260} sorot="#B9A68C">
          <path d={kerucut(760, 1500, 520)} fill="none" />
        </Lapis>
        {/* hutan & aliran lava di lereng kiri */}
        <Lapis dalam={1} warna="#6E8A5F" d="M 20 1500 C 80 1400, 160 1380, 240 1330 C 300 1300, 330 1340, 360 1310 L 360 1500 Z" tunda={20} sorot="#9BB58A" />
        <Lapis dalam={1} warna="#E2683A" d="M 470 770 C 440 900, 470 960, 420 1060 C 390 1120, 410 1180, 360 1260 L 330 1250 C 380 1170, 360 1110, 392 1050 C 440 960, 410 900, 448 770 Z" tunda={22} sorot="#FFB37A" />

        {/* sisi kanan dipotong: lapisan batuan (lava & abu berselang) */}
        <g clipPath="url(#potong)">
          {LAPISAN.map((c, i) => (
            <Lapis key={i} dalam={1} warna={c} d={kerucut(760 + i * 120, 1500 + i * 40, 520 - i * 60, 70 + i * 6)} tunda={14 + i * 2} geser={80} sorot="#C8B49A" />
          ))}
          {/* kerak di bawah */}
          <Lapis dalam={1} warna="#4A3E33" d="M 540 1500 L 1100 1500 L 1100 1960 L 540 1960 Z" tunda={24} />
        </g>
        {/* tanah di bawah kiri */}
        <Lapis dalam={1} warna="#5B4C3F" d="M -20 1500 L 540 1500 L 540 1960 L -20 1960 Z" tunda={24} />

        {/* dapur magma + saluran + kawah */}
        <g filter="url(#lapis1)">
          <path d="M 520 1580 C 400 1580, 360 1680, 420 1740 C 480 1800, 700 1800, 760 1730 C 820 1660, 760 1570, 640 1580 Z" fill="url(#magma)" />
          <path d="M 534 1590 L 530 1200 C 528 1050, 536 900, 530 770 L 554 770 C 552 900, 560 1050, 558 1200 L 566 1590 Z" fill="url(#saluran)" />
          <path d="M 540 1300 C 600 1290, 660 1300, 700 1320 L 700 1340 C 660 1326, 600 1318, 552 1324 Z" fill="url(#saluran)" />
        </g>
        <ellipse cx={600} cy={1690} rx={150} ry={70} fill="#FFE3A0" opacity={0.25 + 0.25 * denyut} />
        {/* tepi potongan (garis putih tipis ala kertas tebal) */}
        <line x1={540} y1={760} x2={540} y2={1960} stroke="#F8F1DF" strokeWidth={4} opacity={0.8} />
      </svg>

      {/* label bernomor */}
      <Benang d="M 548 800 C 640 760, 700 700, 770 690" tunda={44} />
      <Tag x={760} y={640} n={1} judul="Kawah" isi="lubang di puncak" lebar={260} rot={2} tunda={44} aksen={K.terakota} />
      <Benang d="M 556 1100 C 680 1080, 740 1030, 800 1000" tunda={48} />
      <Tag x={780} y={930} n={2} judul="Saluran magma" isi="jalan naik ke permukaan" lebar={270} rot={-2} tunda={48} aksen={K.terakota} />
      <Benang d="M 860 1250 C 900 1270, 920 1280, 940 1300" tunda={52} />
      <Tag x={760} y={1230} n={3} judul="Lapisan lava & abu" isi="tumpukan letusan lama" lebar={290} rot={1.5} tunda={52} aksen={K.mustard} />
      <Benang d="M 700 1700 C 780 1680, 820 1640, 860 1620" tunda={56} />
      <Tag x={740} y={1560} n={4} judul="Dapur magma" isi="batuan cair ±700–1.200 °C" lebar={300} rot={-1.5} tunda={56} aksen={K.terakota} />
      <Benang d="M 400 1150 C 300 1180, 220 1220, 170 1260" tunda={60} />
      <Tag x={40} y={1240} n={5} judul="Aliran lava" isi="mengalir di lereng" lebar={260} rot={-2} tunda={60} aksen={K.terakota} />

      {/* judul */}
      <div style={{ position: "absolute", left: 60, top: 70, zIndex: 25 }}>
        <div style={{ display: "inline-block", background: K.coklat, color: K.krem, fontFamily: F.poster, fontSize: 28, letterSpacing: 4, padding: "6px 18px", filter: "drop-shadow(2px 4px 2px rgba(30,23,16,0.4))" }}>DIORAMA KERTAS · BUMI</div>
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 52, color: K.coklat, marginTop: 18 }}>Isi perut</div>
        <JudulKertas teks="GUNUNG API" ukuran={124} warna={K.terakota} tunda={4} style={{ marginTop: 2 }} />
      </div>
      <div style={{ position: "absolute", left: 40, top: 1700, width: 420, zIndex: 25, transform: `rotate(-2deg) translateY(${(1 - usePaperPop(64)) * 60}px)`, opacity: Math.min(1, usePaperPop(64) * 2), filter: "drop-shadow(2px 5px 3px rgba(30,23,16,0.4))" }}>
        <div style={{ background: K.mustard, padding: "16px 22px" }}>
          <div style={{ fontFamily: F.poster, fontSize: 54, color: K.coklat, lineHeight: 1 }}>±127</div>
          <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: K.coklat, lineHeight: 1.05 }}>gunung api aktif ada di Indonesia</div>
        </div>
      </div>
      <div style={{ position: "absolute", right: 40, bottom: 30, fontFamily: F.sans, fontSize: 19, color: "#E8DCC3", zIndex: 25 }}>Sumber: PVMBG, USGS · ilustrasi potongan</div>
      <Grain />
    </AbsoluteFill>
  );
};
