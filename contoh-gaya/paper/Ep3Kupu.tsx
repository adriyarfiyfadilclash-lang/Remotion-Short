// EP 03 — Metamorfosis Kupu-kupu: daun kertas besar berlapis, empat tahap melingkar, panah kertas.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { F, FilterKertas, Grain, JudulKertas, K, Lapis, LatarKarton, Tag, W, usePaperPop } from "./pustaka";

const Daun: React.FC<{ x: number; y: number; s: number; rot: number; warna: string; urat: string; tunda: number; dalam?: 1 | 2 | 3 | 4 }> = ({ x, y, s, rot, warna, urat, tunda, dalam = 2 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Lapis dalam={dalam} warna={warna} d="M 0 -200 C 120 -150, 140 60, 0 200 C -140 60, -120 -150, 0 -200 Z" tunda={tunda} geser={80} sorot="#BFD6A8">
      <path d="M 0 -190 L 0 190" stroke={urat} strokeWidth={6} />
      {[-120, -60, 0, 60, 120].map((yy) => (
        <path key={yy} d={`M 0 ${yy} C 40 ${yy - 30}, 70 ${yy - 40}, 90 ${yy - 70} M 0 ${yy} C -40 ${yy - 30}, -70 ${yy - 40}, -90 ${yy - 70}`} stroke={urat} strokeWidth={4} fill="none" />
      ))}
    </Lapis>
  </g>
);

const Telur = () => (
  <g filter="url(#lapis1)">
    {[[0, 0], [26, -6], [50, 4], [14, 22], [40, 26]].map(([x, y], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={13} ry={16} fill="#F3E6C2" />
        <ellipse cx={x - 4} cy={y - 5} rx={4} ry={5} fill="#fff" opacity={0.8} />
      </g>
    ))}
  </g>
);

const Ulat: React.FC<{ f: number }> = ({ f }) => (
  <g filter="url(#lapis1)">
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i} transform={`translate(${i * 30} ${Math.sin(i * 0.9 + f / 8) * 8})`}>
        <circle r={22} fill={i % 2 ? "#7FA05F" : "#94B56F"} />
        <path d="M -14 -6 C -6 -16, 6 -16, 14 -6" stroke="#2F2A22" strokeWidth={5} fill="none" />
        <circle cx={0} cy={10} r={4} fill={K.mustard} />
      </g>
    ))}
    <circle cx={258} cy={-6} r={26} fill="#5E7F4C" />
    <circle cx={266} cy={-12} r={5} fill="#1E1710" />
    <path d="M 252 -30 l -6 -20 M 266 -30 l 6 -20" stroke="#2F2A22" strokeWidth={4} />
  </g>
);

const Kepompong = () => (
  <g filter="url(#lapis1)">
    <path d="M 0 -120 L 0 -70" stroke="#5B4C3F" strokeWidth={4} />
    <path d="M 0 -70 C 40 -60, 46 20, 20 70 C 10 90, -10 90, -20 70 C -46 20, -40 -60, 0 -70 Z" fill="#9DB48A" />
    <path d="M 0 -60 C 24 -40, 26 20, 6 66" stroke="#D9C27A" strokeWidth={4} fill="none" />
    {[-30, -6, 18, 42].map((yy) => <path key={yy} d={`M -26 ${yy} C -8 ${yy + 8}, 12 ${yy + 8}, 28 ${yy}`} stroke="#7E9670" strokeWidth={3} fill="none" />)}
    <circle cx={-8} cy={-40} r={4} fill="#E8B85B" />
    <circle cx={10} cy={-30} r={4} fill="#E8B85B" />
  </g>
);

const Kupu: React.FC<{ f: number }> = ({ f }) => {
  const kepak = 0.75 + 0.25 * Math.sin(f / 5);
  const sayap = (sisi: 1 | -1) => (
    <g transform={`scale(${sisi * kepak} 1)`}>
      <path d="M 0 -10 C 40 -120, 170 -140, 170 -50 C 170 0, 90 10, 0 0 Z" fill={K.terakota} />
      <path d="M 0 4 C 70 10, 140 40, 120 100 C 100 150, 30 100, 0 14 Z" fill="#E8956A" />
      <path d="M 20 -20 C 60 -90, 140 -110, 150 -60" stroke={K.coklat} strokeWidth={10} fill="none" />
      <circle cx={130} cy={-80} r={12} fill={K.krem} />
      <circle cx={150} cy={-50} r={9} fill={K.krem} />
      <circle cx={90} cy={80} r={10} fill={K.mustard} />
      <path d="M 0 -10 C 40 -120, 170 -140, 170 -50" stroke={K.coklat} strokeWidth={8} fill="none" />
    </g>
  );
  return (
    <g filter="url(#lapis1)">
      {sayap(1)}
      {sayap(-1)}
      <path d="M 0 -40 C 12 -20, 12 90, 0 110 C -12 90, -12 -20, 0 -40 Z" fill={K.coklat} />
      <path d="M -4 -40 C -20 -80, -30 -90, -40 -96 M 4 -40 C 20 -80, 30 -90, 40 -96" stroke={K.coklat} strokeWidth={4} fill="none" />
      <circle cx={-40} cy={-96} r={5} fill={K.coklat} />
      <circle cx={40} cy={-96} r={5} fill={K.coklat} />
    </g>
  );
};

const PanahKertas: React.FC<{ d: string; tunda: number }> = ({ d, tunda }) => (
  <Lapis dalam={1} warna={K.krem} d={d} tunda={tunda} geser={30} sorot="#fff" />
);

export const Ep3Kupu: React.FC = () => {
  const f = useCurrentFrame();
  const t1 = usePaperPop(24), t2 = usePaperPop(30), t3 = usePaperPop(36), t4 = usePaperPop(42);
  return (
    <AbsoluteFill>
      <FilterKertas />
      <LatarKarton warna="#E3E2C9" cahaya="rgba(255,252,230,0.6)" />
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        {/* bunga & daun latar */}
        <Daun x={140} y={720} s={0.9} rot={-30} warna="#9DBB86" urat="#B7D0A2" tunda={2} dalam={4} />
        <Daun x={960} y={760} s={0.85} rot={35} warna="#9DBB86" urat="#B7D0A2" tunda={3} dalam={4} />
        <Daun x={130} y={1560} s={1.0} rot={-140} warna="#8AAE73" urat="#A9C696" tunda={4} dalam={3} />
        <Daun x={960} y={1540} s={1.05} rot={150} warna="#8AAE73" urat="#A9C696" tunda={5} dalam={3} />
        {/* lingkaran siklus */}
        <Lapis dalam={3} warna="#F3EBD2" d="M 540 1150 m -400 0 a 400 400 0 1 0 800 0 a 400 400 0 1 0 -800 0" tunda={6} sorot="#fff" />
        <Lapis dalam={2} warna="#E7DDBF" d="M 540 1150 m -300 0 a 300 300 0 1 0 600 0 a 300 300 0 1 0 -600 0" tunda={8} />
        {/* panah kertas melingkar */}
        <PanahKertas d="M 640 790 C 760 820, 840 900, 880 1010 L 910 990 L 896 1060 L 846 1020 L 872 1012 C 836 920, 760 850, 640 820 Z" tunda={48} />
        <PanahKertas d="M 900 1270 C 860 1390, 780 1470, 660 1510 L 670 1540 L 600 1520 L 646 1470 L 652 1494 C 760 1458, 836 1380, 870 1270 Z" tunda={50} />
        <PanahKertas d="M 440 1510 C 320 1480, 240 1400, 200 1290 L 170 1310 L 186 1240 L 236 1282 L 210 1290 C 246 1390, 320 1456, 440 1480 Z" tunda={52} />
        <PanahKertas d="M 180 1030 C 220 910, 300 830, 420 790 L 410 760 L 480 780 L 434 830 L 428 806 C 320 842, 244 920, 210 1030 Z" tunda={54} />
        {/* tengah: tulisan siklus */}
        <g opacity={Math.min(1, usePaperPop(12) * 2)}>
          <text x={540} y={1120} textAnchor="middle" fontFamily={F.serif} fontStyle="italic" fontWeight={700} fontSize={44} fill={K.coklat}>metamorfosis</text>
          <text x={540} y={1200} textAnchor="middle" fontFamily={F.poster} fontSize={76} fill={K.sage}>SEMPURNA</text>
        </g>
        {/* empat tahap */}
        <g transform={`translate(${520} ${770 - (1 - t1) * 60}) scale(${t1 * 1.6})`}>
          <Daun x={0} y={0} s={0.42} rot={80} warna="#7FA05F" urat="#9DBB86" tunda={22} dalam={1} />
          <g transform="translate(-30 -12)"><Telur /></g>
        </g>
        <g transform={`translate(${740} ${1010 - (1 - t2) * 60}) scale(${t2 * 0.62})`}><g transform="translate(-130 0)"><Ulat f={f} /></g></g>
        <g transform={`translate(${540} ${1540 - (1 - t3) * 60}) scale(${t3 * 1.15})`}>
          <path d="M -120 -120 L 120 -120" stroke="#6B5B4B" strokeWidth={14} strokeLinecap="round" filter="url(#lapis1)" />
          <Kepompong />
        </g>
        <g transform={`translate(${250} ${1150 - (1 - t4) * 60}) scale(${t4 * 0.62})`}><Kupu f={f} /></g>
      </svg>

      {/* label tahap */}
      <Tag x={640} y={600} n={1} judul="Telur" isi="diletakkan di daun" lebar={250} rot={2} tunda={56} aksen={K.mustard} />
      <Tag x={760} y={1090} n={2} judul="Ulat" isi="makan & berganti kulit" lebar={280} rot={-2} tunda={58} aksen={K.sage} />
      <Tag x={640} y={1660} n={3} judul="Kepompong" isi="tubuh disusun ulang" lebar={270} rot={1.5} tunda={60} aksen={K.biru} />
      <Tag x={40} y={1290} n={4} judul="Kupu-kupu" isi="dewasa, siap kawin" lebar={260} rot={-2} tunda={62} aksen={K.terakota} />

      {/* judul */}
      <div style={{ position: "absolute", left: 60, top: 70, zIndex: 25 }}>
        <div style={{ display: "inline-block", background: K.coklat, color: K.krem, fontFamily: F.poster, fontSize: 28, letterSpacing: 4, padding: "6px 18px", filter: "drop-shadow(2px 4px 2px rgba(30,23,16,0.4))" }}>DIORAMA KERTAS · HEWAN</div>
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 52, color: K.coklat, marginTop: 18 }}>Dari ulat jadi</div>
        <JudulKertas teks="KUPU-KUPU" ukuran={124} warna={K.terakota} tunda={4} style={{ marginTop: 2 }} />
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 30, fontFamily: F.sans, fontSize: 19, color: "#5B4C3F", zIndex: 25 }}>Sumber: Smithsonian · lama tiap tahap berbeda menurut spesies</div>
      <Grain />
    </AbsoluteFill>
  );
};
