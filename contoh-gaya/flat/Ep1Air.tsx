// EP 01 — Siklus Air (Flat 2.5D): pemandangan penuh layar berlapis depan/tengah/belakang,
// perspektif atmosfer, gradasi lembut, bayangan bertingkat, kaca pembesar molekul, diagram siklus mini.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";
import { KacaPembesar, P, PinLabel, TeksEkstrusi, W } from "./pustaka";

const AwanGrad: React.FC<{ x: number; y: number; s?: number; hujan?: boolean; id: string }> = ({ x, y, s = 1, hujan, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id={`awan-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={hujan ? "#A5B4CB" : "#FFFFFF"} />
        <stop offset="1" stopColor={hujan ? "#64748B" : "#D6E4F2"} />
      </linearGradient>
    </defs>
    <ellipse cx={10} cy={58} rx={150} ry={14} fill="#0F172A" opacity={0.08} filter="url(#blur8)" />
    {[[-80, 10, 46], [-30, -24, 62], [40, -36, 70], [100, 0, 50], [-120, 26, 32]].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#awan-${id})`} />
    ))}
    <rect x={-150} y={10} width={300} height={44} rx={22} fill={`url(#awan-${id})`} />
    {/* sorot atas */}
    <path d="M -60 -60 A 62 62 0 0 1 6 -78" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={hujan ? 0.25 : 0.9} />
    <path d="M -140 44 Q 0 58 148 44" fill="none" stroke={hujan ? "#475569" : "#BFD3E8"} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
  </g>
);

const PohonDaun: React.FC<{ x: number; y: number; s: number; jauh?: number }> = ({ x, y, s, jauh = 0 }) => {
  const kabut = (c: string) => c; // warna tetap, kabut lewat opacity lapisan
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - jauh * 0.35}>
      <ellipse cx={18} cy={6} rx={60} ry={12} fill="#14532D" opacity={0.25} />
      <path d="M -6 0 L -4 -60 L 4 -60 L 8 0 Z" fill="#7C2D12" />
      <path d="M 2 0 L 4 -60 L 8 -60 L 8 0 Z" fill="#5B1E0B" />
      <path d="M -2 -40 L -26 -62" stroke="#7C2D12" strokeWidth={6} strokeLinecap="round" />
      {[[-26, -80, 40, "#16A34A"], [24, -86, 44, "#15803D"], [0, -112, 48, "#22C55E"], [-30, -110, 30, "#4ADE80"], [30, -122, 30, "#16A34A"]].map(([cx, cy, r, c], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r={r as number} fill={kabut(c as string)} />
      ))}
      <circle cx={-12} cy={-126} r={14} fill="#86EFAC" opacity={0.8} />
      <circle cx={26} cy={-70} r={34} fill="#14532D" opacity={0.18} />
    </g>
  );
};

const Cemara: React.FC<{ x: number; y: number; s: number; warna?: [string, string] }> = ({ x, y, s, warna = ["#15803D", "#166534"] }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-4} y={-14} width={8} height={20} fill="#5B1E0B" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <polygon points={`0,${-110 + i * 28} ${-34 + i * -4},${-40 + i * 16} ${34 + i * 4},${-40 + i * 16}`} fill={warna[0]} />
        <polygon points={`0,${-110 + i * 28} 0,${-40 + i * 16} ${34 + i * 4},${-40 + i * 16}`} fill={warna[1]} />
      </g>
    ))}
  </g>
);

const Rumah: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={40} cy={8} rx={150} ry={20} fill="#14532D" opacity={0.28} />
    {/* sisi samping (2.5D) */}
    <polygon points="60,0 140,-30 140,-120 60,-90" fill="#CBD5E1" />
    <polygon points="60,-90 140,-120 150,-118 70,-86" fill="#94A3B8" />
    <polygon points="140,-30 140,-120 100,-170 60,-140" fill="#E2E8F0" opacity={0} />
    {/* depan */}
    <rect x={-80} y={-90} width={140} height={90} fill="#F8FAFC" />
    <rect x={-80} y={-20} width={140} height={20} fill="#E2E8F0" />
    {/* atap */}
    <polygon points="-96,-86 -10,-160 76,-86" fill="#EA580C" />
    <polygon points="-10,-160 76,-86 156,-116 70,-190" fill="#F97316" />
    <polygon points="-10,-160 70,-190 156,-116 152,-112 66,-182 -10,-152" fill="#FDBA74" opacity={0.8} />
    <rect x={100} y={-196} width={18} height={40} fill="#9A3412" />
    {/* asap tipis */}
    <path d="M 109 -205 q 12 -14 0 -28 q -12 -14 0 -28" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
    {/* pintu & jendela menyala */}
    <rect x={-22} y={-62} width={34} height={62} rx={4} fill="#7C2D12" />
    <circle cx={4} cy={-30} r={3} fill="#FDE047" />
    <rect x={-66} y={-70} width={34} height={30} rx={4} fill="#FDE68A" />
    <path d="M -49 -70 L -49 -40 M -66 -55 L -32 -55" stroke="#F59E0B" strokeWidth={3} />
    <polygon points="86,-78 120,-90 120,-62 86,-50" fill="#FDE68A" />
    {/* pagar */}
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={-150 + i * 14} y={-24} width={6} height={30} rx={2} fill="#FEF3C7" />
    ))}
    <rect x={-152} y={-14} width={96} height={5} fill="#FDE68A" />
  </g>
);

export const Ep1Air: React.FC = () => {
  const f = useCurrentFrame();
  const ombak = (f * 1.4) % 90;
  return (
    <AbsoluteFill>
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="blur8"><feGaussianBlur stdDeviation="8" /></filter>
          <filter id="blur20"><feGaussianBlur stdDeviation="20" /></filter>
          <linearGradient id="langit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38BDF8" />
            <stop offset="0.45" stopColor="#7DD3FC" />
            <stop offset="0.75" stopColor="#E0F2FE" />
          </linearGradient>
          <radialGradient id="sinar" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FEF9C3" stopOpacity="1" />
            <stop offset="0.35" stopColor="#FDE047" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="intiMatahari" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#FEF08A" />
            <stop offset="0.6" stopColor="#FACC15" />
            <stop offset="1" stopColor="#F59E0B" />
          </radialGradient>
          <linearGradient id="gunungJauh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="gunungTengah" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#64748B" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="bukit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4ADE80" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id="bukitDepan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22C55E" />
            <stop offset="1" stopColor="#14532D" />
          </linearGradient>
          <linearGradient id="laut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#60A5FA" />
            <stop offset="0.5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="sungai" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#93C5FD" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="hujan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1D4ED8" stopOpacity="0" />
            <stop offset="1" stopColor="#1D4ED8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="uap" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <pattern id="rumput" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 4 22 l 3 -9 M 12 24 l 2 -11 M 20 22 l -2 -8" stroke="#14532D" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
          </pattern>
          <pattern id="sawah" width="40" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="40" height="7" fill="#86EFAC" opacity="0.35" />
          </pattern>
        </defs>

        {/* LANGIT + matahari bercahaya */}
        <rect width={1080} height={1520} fill="url(#langit)" />
        <circle cx={850} cy={420} r={260} fill="url(#sinar)" />
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={846} y={260 - 8 * Math.sin(f / 9 + i)} width={8} height={40} rx={4} fill="#FDE047" opacity={0.7} transform={`rotate(${i * 22.5 + f * 0.3} 850 420)`} />
        ))}
        <circle cx={850} cy={420} r={92} fill="url(#intiMatahari)" />
        <circle cx={820} cy={392} r={24} fill="#FFFBEB" opacity={0.7} />

        {/* AWAN (tengah & jauh) */}
        <g opacity={0.65}><AwanGrad id="a1" x={180} y={560} s={0.55} /></g>
        <AwanGrad id="a2" x={560} y={660} s={0.9} />
        <AwanGrad id="a3" x={870} y={720} s={0.85} hujan />
        {/* hujan miring */}
        {Array.from({ length: 22 }, (_, i) => {
          const x = 760 + (i % 11) * 22 + (i > 10 ? 11 : 0);
          const y = 790 + ((f * 9 + i * 41) % 200);
          return <rect key={i} x={x} y={y} width={5} height={42} rx={2.5} fill="url(#hujan)" transform={`rotate(12 ${x} ${y})`} />;
        })}

        {/* PEGUNUNGAN JAUH (pucat = perspektif atmosfer) */}
        <path d="M -20 1000 L 120 900 L 220 960 L 360 850 L 470 950 L 560 900 L 700 990 L 1100 990 L 1100 1060 L -20 1060 Z" fill="url(#gunungJauh)" opacity={0.75} />
        {/* gunung tengah bersalju dengan sisi gelap */}
        <polygon points="560,1060 780,780 1000,1060" fill="url(#gunungTengah)" />
        <polygon points="780,780 1000,1060 790,1060 820,960" fill="#475569" opacity={0.55} />
        <polygon points="780,780 742,836 764,830 782,850 800,830 826,842" fill="#F8FAFC" />
        <polygon points="780,780 826,842 800,830 790,836" fill="#CBD5E1" />
        <polygon points="880,1060 1010,880 1120,1060" fill="url(#gunungTengah)" />
        <polygon points="1010,880 1120,1060 1020,1060" fill="#475569" opacity={0.5} />
        <polygon points="1010,880 984,918 1000,914 1012,928 1028,914 1040,920" fill="#F8FAFC" />
        {/* kabut lembah */}
        <ellipse cx={760} cy={1060} rx={420} ry={40} fill="#fff" opacity={0.45} filter="url(#blur20)" />

        {/* BUKIT TENGAH bersawah */}
        <path d="M 330 1130 Q 600 960 1100 1050 L 1100 1520 L 330 1520 Z" fill="url(#bukit)" />
        <path d="M 330 1130 Q 600 960 1100 1050 L 1100 1520 L 330 1520 Z" fill="url(#sawah)" />
        <path d="M 360 1120 Q 600 975 1090 1050" fill="none" stroke="#BBF7D0" strokeWidth={6} opacity={0.8} />
        <g opacity={0.8}>
          <Cemara x={640} y={1060} s={0.55} warna={["#16A34A", "#15803D"]} />
          <Cemara x={690} y={1050} s={0.45} warna={["#16A34A", "#15803D"]} />
          <Cemara x={1030} y={1060} s={0.5} warna={["#16A34A", "#15803D"]} />
        </g>

        {/* SUNGAI berkelok dengan pantulan */}
        <path d="M 820 1040 C 760 1100, 860 1150, 720 1200 S 520 1260, 420 1330" fill="none" stroke="url(#sungai)" strokeWidth={46} strokeLinecap="round" />
        <path d="M 820 1040 C 760 1100, 860 1150, 720 1200 S 520 1260, 420 1330" fill="none" stroke="#DBEAFE" strokeWidth={6} strokeLinecap="round" strokeDasharray="24 46" strokeDashoffset={-f * 3} />

        {/* LAUT berlapis + kilau */}
        <path d="M 0 1090 L 470 1090 Q 400 1200 470 1520 L 0 1520 Z" fill="url(#laut)" />
        <path d="M 0 1090 L 470 1090 Q 440 1120 430 1150 L 0 1150 Z" fill="#93C5FD" opacity={0.5} />
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M ${-90 + ombak + r * 20} ${1140 + r * 58} q 22 -14 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0`} fill="none" stroke="#BFDBFE" strokeWidth={5} strokeLinecap="round" opacity={0.85 - r * 0.15} />
        ))}
        {[[120, 1120], [300, 1170], [200, 1250]].map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y - 10} l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 z`} fill="#fff" opacity={0.5 + 0.5 * Math.sin(f / 5 + i * 2)} />
        ))}
        {/* perahu kecil */}
        <g transform="translate(250 1205)">
          <ellipse cx={0} cy={22} rx={60} ry={8} fill="#1E3A8A" opacity={0.45} />
          <path d="M -54 0 L 54 0 L 36 20 L -36 20 Z" fill="#F97316" />
          <path d="M -54 0 L 54 0 L 50 6 L -50 6 Z" fill="#FDBA74" />
          <rect x={-3} y={-70} width={6} height={70} fill="#7C2D12" />
          <polygon points="4,-66 4,-8 46,-8" fill="#F8FAFC" />
          <polygon points="-4,-56 -4,-8 -36,-8" fill="#E2E8F0" />
        </g>

        {/* UAP naik (pita bergradasi) */}
        {[90, 190, 300, 390].map((x, i) => {
          const t = (f * 1.6 + i * 40) % 160;
          return <path key={x} d={`M ${x} ${1080 - t} q 18 -26 0 -52 q -18 -26 0 -52 q 18 -26 0 -52`} fill="none" stroke="url(#uap)" strokeWidth={14} strokeLinecap="round" opacity={1 - t / 200} />;
        })}

        {/* PANAH SIKLUS bergaya gerak (gradasi + titik ekor) */}
        <defs>
          {[["oranye", P.oranye], ["ungu", P.ungu], ["biru", P.biru], ["hijau", P.hijau]].map(([n, c]) => (
            <marker key={n} id={`m-${n}`} markerUnits="userSpaceOnUse" markerWidth="46" markerHeight="46" refX="16" refY="23" orient="auto">
              <path d="M0,4 L42,23 L0,42 L10,23 Z" fill={c} />
            </marker>
          ))}
        </defs>
        <path d="M 380 1050 C 380 900, 420 790, 470 730" fill="none" stroke={P.oranye} strokeWidth={14} strokeLinecap="round" markerEnd="url(#m-oranye)" />
        <path d="M 670 620 C 730 600, 770 630, 790 660" fill="none" stroke={P.ungu} strokeWidth={14} strokeLinecap="round" markerEnd="url(#m-ungu)" />
        <path d="M 1010 790 C 1040 860, 1030 920, 990 980" fill="none" stroke={P.biru} strokeWidth={14} strokeLinecap="round" markerEnd="url(#m-biru)" />
        <path d="M 470 1320 C 410 1320, 360 1290, 340 1250" fill="none" stroke={P.hijau} strokeWidth={14} strokeLinecap="round" markerEnd="url(#m-hijau)" />
        {[[380, 1050, P.oranye], [670, 620, P.ungu], [1010, 790, P.biru], [470, 1320, P.hijau]].map(([x, y, c], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r={9} fill={c as string} />
            <circle cx={x as number} cy={y as number} r={18} fill="none" stroke={c as string} strokeWidth={3} opacity={0.4} />
          </g>
        ))}

        {/* LATAR DEPAN: bukit gelap, rumah, pohon besar, rumput */}
        <path d="M 520 1400 Q 760 1250 1100 1300 L 1100 1500 L 520 1500 Z" fill="url(#bukitDepan)" />
        <path d="M 520 1400 Q 760 1250 1100 1300 L 1100 1500 L 520 1500 Z" fill="url(#rumput)" />
        <Rumah x={700} y={1350} s={0.9} />
        <PohonDaun x={980} y={1390} s={1.25} />
        <PohonDaun x={560} y={1420} s={0.9} />
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M ${540 + i * 32} 1440 q 4 -26 10 -34 M ${548 + i * 32} 1440 q -2 -20 -8 -28`} stroke="#14532D" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.5} />
        ))}
      </svg>

      {/* JUDUL kinetik di langit */}
      <div style={{ position: "absolute", left: 60, top: 150, fontFamily: FONT }}>
        <div style={{ display: "inline-block", background: "#0F172A", color: "#fff", fontSize: 26, fontWeight: 700, padding: "8px 18px", borderRadius: 999, letterSpacing: 1 }}>
          SAINS SEHARI-HARI · EP 01
        </div>
        <div style={{ marginTop: 22, fontSize: 52, fontWeight: 800, color: "#0C4A6E" }}>Ke mana perginya</div>
        <TeksEkstrusi teks="AIR HUJAN?" ukuran={112} warna="#FFFFFF" sisi="#1D4ED8" lapis={10} font={FONT} style={{ marginTop: 6 }} />
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 70 - i * 18, height: 8, borderRadius: 4, background: "#fff", opacity: 0.8 - i * 0.25 }} />
          ))}
        </div>
      </div>

      {/* PENANDA bernomor di atas pemandangan */}
      <PinLabel x={385} y={960} kiri={60} atas={720} n={1} warna={P.oranye} judul="Penguapan" isi="Panas matahari mengubah air laut jadi uap." lebar={300} font={FONT} tunda={20} />
      <PinLabel x={690} y={610} kiri={640} atas={470} n={2} warna={P.ungu} judul="Pengembunan" isi="Uap mendingin lalu menjadi awan." lebar={300} font={FONT} tunda={26} />
      <PinLabel x={1000} y={860} kiri={760} atas={990} n={3} warna={P.biru} judul="Hujan" isi="Titik air jatuh ke gunung & darat." lebar={280} font={FONT} tunda={32} />
      <PinLabel x={540} y={1280} kiri={430} atas={1050} n={4} warna={P.hijau} judul="Pengumpulan" isi="Sungai membawa air kembali ke laut." lebar={300} font={FONT} tunda={38} />
      {/* KACA PEMBESAR: molekul air yang menguap */}
      <KacaPembesar x={190} y={1290} r={125} dari={{ x: 300, y: 1150 }} label="Diperbesar: molekul air" font={FONT} tunda={44}>
        <svg width={250} height={250} viewBox="-135 -135 270 270">
          <rect x={-135} y={-135} width={270} height={270} fill="#DBEAFE" />
          <rect x={-135} y={40} width={270} height={100} fill="#3B82F6" />
          <path d={`M -135 40 q 22 -10 45 0 t 45 0 t 45 0 t 45 0 t 45 0 t 45 0`} fill="none" stroke="#BFDBFE" strokeWidth={5} />
          {[[-60, 80, 0], [10, 95, 1], [70, 70, 2], [-20, -10, 3], [50, -50, 4], [-70, -70, 5]].map(([x, y, i]) => {
            const naik = i >= 3;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${i * 40})`} opacity={naik ? 0.95 : 0.7}>
                <line x1={0} y1={0} x2={-16} y2={12} stroke="#94A3B8" strokeWidth={5} />
                <line x1={0} y1={0} x2={16} y2={12} stroke="#94A3B8" strokeWidth={5} />
                <circle r={15} fill="#EF4444" />
                <circle cx={-5} cy={-5} r={5} fill="#FCA5A5" />
                <circle cx={-18} cy={14} r={9} fill="#fff" stroke="#CBD5E1" strokeWidth={2} />
                <circle cx={18} cy={14} r={9} fill="#fff" stroke="#CBD5E1" strokeWidth={2} />
              </g>
            );
          })}
          {[[-20, 20], [50, -15], [-70, -35]].map(([x, y], i) => (
            <path key={i} d={`M ${x} ${y} l 0 -26 m -8 8 l 8 -8 l 8 8`} stroke={P.oranye} strokeWidth={4} fill="none" strokeLinecap="round" />
          ))}
          <text x={0} y={128} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={18} fill="#fff">H₂O</text>
        </svg>
      </KacaPembesar>

      {/* PANEL BAWAH: diagram siklus mini + fakta */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1480, bottom: 0, background: "#fff", borderRadius: "48px 48px 0 0", boxShadow: "0 -16px 40px rgba(15,23,42,0.12)", padding: "40px 60px", display: "flex", gap: 34, fontFamily: FONT }}>
        <svg width={250} height={250} viewBox="-125 -125 250 250" style={{ flexShrink: 0 }}>
          {[P.oranye, P.ungu, P.biru, P.hijau].map((c, i) => {
            const a0 = (i * Math.PI) / 2 - Math.PI / 2 + 0.12, a1 = a0 + Math.PI / 2 - 0.24, r = 92;
            return (
              <g key={c}>
                <path d={`M ${Math.cos(a0) * r} ${Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r}`} fill="none" stroke={c} strokeWidth={26} strokeLinecap="round" />
                <circle cx={Math.cos(a0 + 0.62) * 92} cy={Math.sin(a0 + 0.62) * 92} r={20} fill="#fff" />
                <text x={Math.cos(a0 + 0.62) * 92} y={Math.sin(a0 + 0.62) * 92 + 8} textAnchor="middle" fontWeight={800} fontSize={22} fill={c}>{i + 1}</text>
              </g>
            );
          })}
          <circle r={52} fill="#EFF6FF" />
          <path d="M 0 -30 C 18 -6, 24 6, 24 16 A 24 24 0 0 1 -24 16 C -24 6, -18 -6, 0 -30 Z" fill="#3B82F6" />
          <ellipse cx={-8} cy={10} rx={6} ry={10} fill="#BFDBFE" />
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: P.biru, letterSpacing: 3 }}>SIKLUS TANPA HENTI</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: P.navy, lineHeight: 1.15, marginTop: 8 }}>
            Air yang sama terus <span style={{ background: "linear-gradient(transparent 55%, #FDE047 55%)" }}>berputar</span> selama jutaan tahun.
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
            {[["≈ 97%", "air Bumi ada di laut"], ["4", "tahap utama"]].map(([a, b]) => (
              <div key={b} style={{ flex: 1, background: "#F1F5F9", borderRadius: 18, padding: "14px 16px" }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: P.navy }}>{a}</div>
                <div style={{ fontSize: 20, color: P.abu }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 36, fontFamily: FONT, fontSize: 21, color: P.abu }}>Sumber: USGS Water Science School · ilustrasi disederhanakan</div>
    </AbsoluteFill>
  );
};
