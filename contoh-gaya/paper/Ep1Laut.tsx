// EP 01 — Lapisan Laut: diorama kertas vertikal dari permukaan sampai Palung Mariana.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { F, FilterKertas, Grain, JudulKertas, K, Lapis, LatarKarton, Tag, W, usePaperPop } from "./pustaka";

// pita bergelombang dari y atas sampai bawah layar
const gelombang = (y: number, amp: number, pj: number, fase = 0) => {
  let d = `M -20 ${y}`;
  for (let x = -20; x <= W + 40; x += pj / 2) {
    const i = Math.round((x + 20) / (pj / 2));
    d += ` Q ${x + pj / 4} ${y + (i % 2 ? amp : -amp) + Math.sin(fase + i) * 4} ${x + pj / 2} ${y}`;
  }
  return d + ` L ${W + 40} 1960 L -20 1960 Z`;
};

const ZONA = [
  { y: 560, warna: "#7FB7C9", sorot: "#C9E6EE", nama: "Zona Cahaya", m: "0–200 m", isi: "cukup cahaya untuk fotosintesis" },
  { y: 820, warna: "#4E8BA6", sorot: "#93C3D4", nama: "Zona Senja", m: "200–1.000 m", isi: "remang, banyak hewan berpendar" },
  { y: 1090, warna: "#2F5F7F", sorot: "#5E8FAD", nama: "Zona Tengah Malam", m: "1.000–4.000 m", isi: "gelap total, ±4 °C" },
  { y: 1370, warna: "#203F59", sorot: "#3E6683", nama: "Zona Abisal", m: "4.000–6.000 m", isi: "dasar laut dalam, sangat dingin" },
  { y: 1640, warna: "#14273A", sorot: "#2C4A63", nama: "Zona Hadal", m: "6.000–±11.000 m", isi: "palung terdalam di Bumi" },
];

const Ikan: React.FC<{ x: number; y: number; s: number; warna: string; balik?: boolean }> = ({ x, y, s, warna, balik }) => (
  <g transform={`translate(${x} ${y}) scale(${balik ? -s : s} ${s})`} filter="url(#lapis1)">
    <path d="M -40 0 C -20 -22, 20 -22, 36 0 C 20 22, -20 22, -40 0 Z M 34 0 L 58 -18 L 52 0 L 58 18 Z" fill={warna} />
    <path d="M -10 -14 C 0 -8, 0 8, -10 14" fill="none" stroke="#000" strokeOpacity={0.15} strokeWidth={3} />
    <circle cx={-24} cy={-4} r={4} fill="#1E1710" />
  </g>
);

const UburUbur: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y + Math.sin(f / 12) * 6}) scale(${s})`} filter="url(#lapis1)">
      <circle r={90} fill="url(#pendarToska)" />
      <path d="M -40 0 C -40 -50, 40 -50, 40 0 C 30 8, -30 8, -40 0 Z" fill="#F1C9DE" />
      {[-26, -10, 8, 24].map((t, i) => (
        <path key={t} d={`M ${t} 4 q ${6 * (i % 2 ? 1 : -1)} 20 0 40 q ${-6 * (i % 2 ? 1 : -1)} 20 0 40`} fill="none" stroke="#F1C9DE" strokeWidth={5} strokeLinecap="round" />
      ))}
    </g>
  );
};

const IkanSungut: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-44} cy={-70} r={80} fill="url(#pendar)" />
    <circle cx={-44} cy={-70} r={12} fill="#FFE07A" />
    <g filter="url(#lapis1)">
      <path d="M -60 -10 C -70 -60, 40 -70, 60 -20 L 96 -44 L 90 0 L 96 40 L 60 18 C 40 60, -60 50, -60 -10 Z" fill="#3B2F2A" />
      <path d="M -60 -10 L -20 -8 L -56 10 Z" fill="#E8DCC3" />
      <path d="M 0 -50 C -20 -90, -40 -90, -44 -70" fill="none" stroke="#3B2F2A" strokeWidth={5} />
      <circle cx={-26} cy={-28} r={6} fill="#E8DCC3" />
    </g>
  </g>
);

const Paus: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} filter="url(#lapis2)">
    <path d="M -170 10 C -160 -50, 60 -60, 120 -10 L 190 -60 L 175 0 L 200 40 L 120 20 C 60 60, -160 70, -170 10 Z" fill="#3E5E78" />
    <path d="M -168 14 C -120 50, 40 54, 110 24 C 40 40, -120 40, -168 14 Z" fill="#B9CEDB" />
    <circle cx={-120} cy={-4} r={6} fill="#1E1710" />
    <path d="M -40 30 L -10 70 L 10 30 Z" fill="#2F4A61" />
  </g>
);

export const Ep1Laut: React.FC = () => {
  const f = useCurrentFrame();
  const pPenggaris = usePaperPop(40);
  const fase = f / 20;
  return (
    <AbsoluteFill>
      <FilterKertas />
      <LatarKarton warna="#E9DFC7" />
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        {/* langit: matahari kertas + awan */}
        <Lapis dalam={4} warna="#F3D98A" d="M 820 250 m -110 0 a 110 110 0 1 0 220 0 a 110 110 0 1 0 -220 0" tunda={2} sorot="#FFF1C4" />
        <Lapis dalam={3} warna="#E8B85B" d="M 820 250 m -78 0 a 78 78 0 1 0 156 0 a 78 78 0 1 0 -156 0" tunda={4} />
        <Lapis dalam={3} warna={K.krem} d="M 120 420 c 0 -40 60 -60 90 -30 c 20 -40 100 -40 110 10 c 40 -10 70 30 40 50 l -230 0 c -30 0 -30 -30 -10 -30 Z" tunda={6} sorot="#fff" />
        <Lapis dalam={3} warna={K.krem2} d="M 560 470 c 0 -30 50 -44 70 -20 c 20 -30 80 -24 84 10 c 30 -6 50 24 26 36 l -170 0 c -24 0 -22 -26 -10 -26 Z" tunda={8} />
        {/* perahu di permukaan */}
        <Lapis dalam={2} warna={K.terakota} d="M 300 548 L 500 548 L 470 590 L 330 590 Z" tunda={10} sorot="#F2B3A2" />
        <Lapis dalam={2} warna={K.krem} d="M 395 548 L 395 430 L 470 540 Z" tunda={12} sorot="#fff" />
        <Lapis dalam={2} warna="#E8DCC3" d="M 388 548 L 388 450 L 330 540 Z" tunda={12} />

        {/* zona laut, dari permukaan ke dasar (lapisan bawah = lebih dekat ke penonton) */}
        {ZONA.map((z, i) => (
          <Lapis key={z.nama} dalam={(4 - Math.min(3, i)) as 1 | 2 | 3 | 4} warna={z.warna} sorot={z.sorot} d={gelombang(z.y, 10 + i * 2, 180 - i * 10, fase + i)} tunda={10 + i * 6} geser={220} />
        ))}
        {/* dasar palung */}
        <Lapis dalam={1} warna="#0C1826" d="M -20 1960 L -20 1830 C 120 1800, 200 1850, 300 1820 L 380 1900 L 420 1960 Z M 1100 1960 L 1100 1820 C 960 1790, 860 1840, 760 1810 L 640 1900 L 620 1960 Z" tunda={42} />

        {/* penghuni tiap zona */}
        <g opacity={usePaperPop(30) > 0.1 ? 1 : 0}>
          <Ikan x={170} y={690} s={0.9} warna={K.mustard} />
          <Ikan x={240} y={740} s={0.6} warna={K.mustard} />
          <Ikan x={130} y={760} s={0.55} warna="#F0CB7B" />
          <Paus x={420} y={680} />
          <UburUbur x={260} y={950} s={0.9} />
          <UburUbur x={430} y={1010} s={0.55} />
          <IkanSungut x={330} y={1240} s={0.9} />
          {/* salju laut (partikel organik) */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={(i * 97) % 640 + 40} cy={1110 + ((i * 53 + f * 0.8) % 760)} r={2 + (i % 3)} fill="#E8DCC3" opacity={0.45} />
          ))}
          {/* kapal selam riset kecil di zona hadal */}
          <g transform="translate(360 1760)" filter="url(#lapis1)">
            <path d="M -60 0 C -60 -30, 50 -30, 60 0 C 50 26, -60 26, -60 0 Z" fill={K.mustard} />
            <circle cx={-26} cy={-2} r={10} fill="#BFE3EC" />
            <rect x={-6} y={-34} width={26} height={14} rx={4} fill={K.terakota} />
            <path d="M 60 0 L 90 -14 L 90 14 Z" fill={K.terakota} />
          </g>
          <path d="M 300 1756 L 80 1700 L 80 1820 Z" fill="url(#pendar)" />
        </g>
      </svg>

      {/* penggaris kedalaman dari pita kertas */}
      <div style={{ position: "absolute", right: 40, top: 560, width: 90, height: 1300, transform: `translateX(${(1 - pPenggaris) * 160}px)`, filter: "drop-shadow(3px 6px 4px rgba(30,23,16,0.4))", zIndex: 10 }}>
        <div style={{ position: "absolute", inset: 0, background: K.krem, borderRadius: 4 }} />
        {ZONA.map((z) => (
          <div key={z.nama} style={{ position: "absolute", left: 0, top: z.y - 560, display: "flex", alignItems: "center" }}>
            <div style={{ width: 26, height: 4, background: K.tinta }} />
            <div style={{ fontFamily: F.poster, fontSize: 20, color: K.tinta, marginLeft: 4, lineHeight: 1 }}>{z.m.split("–")[0]}</div>
          </div>
        ))}
        <div style={{ position: "absolute", left: 6, bottom: 10, fontFamily: F.poster, fontSize: 20, color: K.terakota, lineHeight: 1.05 }}>±11.000<br />m</div>
      </div>

      {/* label zona */}
      {ZONA.map((z, i) => (
        <Tag key={z.nama} x={640} y={z.y + 40} lebar={290} judul={z.nama} isi={`${z.m} · ${z.isi}`} warna={i < 2 ? K.krem : "#E8DCC3"} rot={i % 2 ? 1.5 : -1.5} tunda={46 + i * 4} aksen={[K.mustard, K.sage, K.biru, K.terakota, K.mustard][i]} />
      ))}

      {/* judul */}
      <div style={{ position: "absolute", left: 60, top: 70, zIndex: 25 }}>
        <div style={{ display: "inline-block", background: K.coklat, color: K.krem, fontFamily: F.poster, fontSize: 28, letterSpacing: 4, padding: "6px 18px", filter: "drop-shadow(2px 4px 2px rgba(30,23,16,0.4))" }}>DIORAMA KERTAS · LAUT</div>
        <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 52, color: K.coklat, marginTop: 18 }}>Menyelam sampai</div>
        <JudulKertas teks="DASAR LAUT" ukuran={124} warna={K.krem} tunda={4} style={{ marginTop: 2 }} />
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 30, fontFamily: F.sans, fontSize: 19, color: "#C9D6DF", zIndex: 25 }}>Sumber: NOAA Ocean Service · jarak antarzona tidak sesuai skala</div>
      <Grain />
    </AbsoluteFill>
  );
};
