// EP 1 — Sejarah Kamera: papan kolase dengan judul huruf potongan, 4 polaroid dihubungkan benang merah,
// catatan tulisan tangan, guntingan koran, cap, dan selotip.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, Cap, F, FilterKolase, Grain, HurufPotong, LatarKertas, Polaroid, Selotip, Sobekan, Tulisan, halftone } from "./pustaka";

const Latar: React.FC<{ a: string; b: string; children: React.ReactNode }> = ({ a, b, children }) => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
    <defs>
      <radialGradient id={`g${a}`} cx="0.5" cy="0.35" r="0.8">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </radialGradient>
    </defs>
    <rect width={200} height={200} fill={`url(#g${a})`} />
    {children}
  </svg>
);

// 1839: kamera kotak kayu di atas tripod
const FotoDagerotip = () => (
  <Latar a="#E6CFA4" b="#8C6239">
    <rect x={0} y={150} width={200} height={50} fill="#6B4A2B" opacity={0.5} />
    <path d="M 100 120 L 60 196 M 100 120 L 140 196 M 100 120 L 104 196" stroke="#3E2A17" strokeWidth={6} strokeLinecap="round" />
    <rect x={54} y={66} width={92} height={60} rx={4} fill="#A0703F" />
    <rect x={54} y={66} width={92} height={10} fill="#C08A52" />
    <rect x={120} y={66} width={26} height={60} fill="#7A522C" />
    {[70, 86, 102].map((x) => <line key={x} x1={x} y1={76} x2={x} y2={126} stroke="#7A522C" strokeWidth={2} />)}
    <rect x={30} y={82} width={26} height={28} rx={3} fill="#C9A23A" />
    <rect x={22} y={86} width={10} height={20} rx={2} fill="#E3C46B" />
    <circle cx={24} cy={96} r={6} fill="#2B2B2B" />
    <circle cx={22} cy={94} r={2} fill="#fff" opacity={0.7} />
    <rect x={146} y={70} width={14} height={14} fill="#3E2A17" />
  </Latar>
);

// 1888: kamera kotak kulit genggam
const FotoKotak = () => (
  <Latar a="#9ED8CF" b="#2A7F75">
    <ellipse cx={100} cy={170} rx={70} ry={10} fill="#123" opacity={0.25} />
    <rect x={44} y={58} width={112} height={100} rx={8} fill="#3A2A20" />
    <rect x={44} y={58} width={112} height={14} rx={6} fill="#5A4130" />
    <rect x={130} y={58} width={26} height={100} fill="#2A1E17" />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={50} y1={84 + i * 12} x2={128} y2={84 + i * 12} stroke="#4B372A" strokeWidth={2} />)}
    <circle cx={86} cy={110} r={24} fill="#1A1A1A" />
    <circle cx={86} cy={110} r={16} fill="#2E4F6E" />
    <circle cx={80} cy={104} r={5} fill="#fff" opacity={0.6} />
    <rect x={70} y={44} width={34} height={16} rx={4} fill="#5A4130" />
    <rect x={140} y={74} width={10} height={20} rx={2} fill="#C9A23A" />
  </Latar>
);

// 1975: purwarupa kamera digital + kaset
const FotoDigital = () => (
  <Latar a="#FBE3A0" b="#D99A2B">
    <ellipse cx={100} cy={176} rx={80} ry={10} fill="#5A3A0A" opacity={0.25} />
    <rect x={30} y={76} width={140} height={90} rx={6} fill="#8A8F96" />
    <rect x={30} y={76} width={140} height={14} fill="#B8BDC4" />
    <rect x={120} y={76} width={50} height={90} fill="#6E737A" />
    <rect x={48} y={100} width={46} height={30} rx={3} fill="#2B2F35" />
    <rect x={52} y={104} width={38} height={22} fill="#D9E2EC" />
    <rect x={58} y={108} width={26} height={14} rx={7} fill="#6E737A" />
    <circle cx={146} cy={106} r={22} fill="#1A1A1A" />
    <circle cx={146} cy={106} r={13} fill="#3B5878" />
    <circle cx={141} cy={101} r={4} fill="#fff" opacity={0.6} />
    {[0, 1, 2].map((i) => <rect key={i} x={42 + i * 14} y={146} width={8} height={10} rx={2} fill="#D7263D" opacity={0.8 - i * 0.2} />)}
    <rect x={40} y={52} width={60} height={22} rx={3} fill="#3A3A3A" />
    <text x={70} y={68} textAnchor="middle" fontSize={11} fill="#F7C948" fontFamily="monospace">0,01 MP</text>
  </Latar>
);

// 2000: ponsel lipat berkamera
const FotoPonsel = () => (
  <Latar a="#F7B8CB" b="#B23A63">
    <ellipse cx={100} cy={180} rx={56} ry={8} fill="#4A0F24" opacity={0.3} />
    <g transform="rotate(-10 100 110)">
      <rect x={68} y={20} width={64} height={78} rx={12} fill="#C9D3DB" />
      <rect x={76} y={30} width={48} height={50} rx={4} fill="#1B4E9B" />
      <rect x={80} y={34} width={40} height={42} fill="#7FB3E8" />
      <circle cx={100} cy={88} r={4} fill="#57534E" />
      <rect x={66} y={100} width={68} height={80} rx={12} fill="#A9B4BE" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={76 + (i % 3) * 17} y={112 + Math.floor(i / 3) * 15} width={13} height={9} rx={3} fill="#E9EEF2" />)}
      <circle cx={118} cy={30} r={7} fill="#1A1A1A" />
      <circle cx={116} cy={28} r={2} fill="#fff" />
    </g>
  </Latar>
);

export const Ep1Kamera: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna="#D9C3A0" />
    {/* lembar kertas bergaris di belakang (kedalaman) */}
    <Sobekan x={-40} y={520} w={700} h={980} warna="#F7F3EA" rot={-4} bayang={0.6}>
      <svg width={700} height={980} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 24 }, (_, i) => <line key={i} x1={20} y1={60 + i * 38} x2={680} y2={60 + i * 38} stroke="#9FB7D6" strokeWidth={2} opacity={0.6} />)}
        <line x1={90} y1={10} x2={90} y2={970} stroke="#E88A9A" strokeWidth={3} opacity={0.7} />
      </svg>
    </Sobekan>
    <Sobekan x={560} y={980} w={560} h={420} warna="#F7C948" rot={6} bayang={0.6} />

    {/* kepala */}
    <Sobekan x={50} y={56} w={520} h={76} warna={C.tinta} rot={-2} halus>
      <div style={{ padding: "10px 26px", fontFamily: F.poster, fontSize: 38, color: "#F3EBDD", letterSpacing: 4 }}>KOLASE · SEJARAH #01</div>
    </Sobekan>
    {/* judul huruf potongan + kata serif miring */}
    <div style={{ position: "absolute", left: 60, top: 170 }}>
      <HurufPotong teks="SEJARAH" ukuran={110} tunda={0} />
    </div>
    <Sobekan x={380} y={300} w={640} h={160} warna="#FBF8F1" rot={-3} halus tunda={6}>
      <div style={{ padding: "6px 30px", fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 116, color: C.merah, lineHeight: 1.1 }}>kamera</div>
    </Sobekan>
    <Selotip x={850} y={286} w={150} rot={18} />
    <Tulisan x={70} y={472} teks="dari kotak kayu ke saku kamu →" ukuran={50} rot={-2} />

    {/* benang merah penghubung */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none" }}>
      <path d="M 250 640 C 420 700, 620 640, 780 700 C 900 760, 520 1010, 300 1060 C 180 1100, 560 1240, 800 1150" fill="none" stroke={C.merah} strokeWidth={5} strokeLinecap="round" />
      {[[250, 640], [780, 700], [300, 1060], [800, 1150]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={14} fill={C.merah} />
          <circle cx={x - 4} cy={y - 4} r={5} fill="#FCA5A5" />
        </g>
      ))}
    </svg>

    {/* polaroid berurutan */}
    <Polaroid x={90} y={600} w={330} rot={-6} foto={<FotoDagerotip />} teks="1839" tunda={10} />
    <Selotip x={180} y={584} w={140} rot={-8} warna="rgba(255,255,255,0.55)" />
    <Polaroid x={640} y={660} w={330} rot={5} foto={<FotoKotak />} teks="1888" tunda={16} />
    <Selotip x={730} y={644} w={140} rot={6} warna="rgba(255,255,255,0.55)" />
    <Polaroid x={140} y={1020} w={330} rot={4} foto={<FotoDigital />} teks="1975" tunda={22} />
    <Selotip x={230} y={1004} w={140} rot={3} warna="rgba(255,255,255,0.55)" />
    <Polaroid x={640} y={1110} w={330} rot={-5} foto={<FotoPonsel />} teks="2000" tunda={28} />
    <Selotip x={730} y={1094} w={140} rot={-4} warna="rgba(255,255,255,0.55)" />

    {/* catatan tangan per tahun */}
    <Tulisan x={440} y={900} teks={"Dagerotip diumumkan\ndi Prancis"} ukuran={38} rot={-3} lebar={250} />
    <Tulisan x={710} y={1015} teks="film isi 100 foto!" ukuran={40} warna={C.biru} rot={4} />
    <Tulisan x={160} y={1418} teks="0,01 MP · 23 detik/foto" ukuran={38} warna={C.merah} rot={-3} lebar={420} />
    <Tulisan x={760} y={1525} teks="ponsel pertama berkamera" ukuran={36} rot={-3} lebar={300} />

    {/* guntingan koran */}
    <Sobekan x={60} y={1500} w={640} h={330} warna="#ECE6D8" rot={-2} tunda={34}>
      <div style={{ padding: "26px 34px", fontFamily: F.serif }}>
        <div style={{ fontSize: 18, letterSpacing: 4, color: C.abu, fontFamily: F.poster }}>HARIAN KOLASE · ARSIP</div>
        <div style={{ fontSize: 44, fontWeight: 900, color: C.tinta, lineHeight: 1.05, marginTop: 8 }}>Foto tertua butuh paparan berjam-jam</div>
        <div style={{ display: "flex", gap: 18, marginTop: 14 }}>
          <div style={{ flex: 1, fontSize: 20, lineHeight: 1.35, color: "#44403C" }}>Foto tertua yang masih ada dibuat sekitar 1826–1827. Pelatnya harus terkena cahaya sangat lama.</div>
          <div style={{ width: 160, height: 120, ...halftone("#44403C", 7), backgroundColor: "#D6CCB8" }} />
        </div>
      </div>
    </Sobekan>
    <Selotip x={40} y={1490} w={130} rot={-30} />
    <Cap x={880} y={1720} r={110} teks="• FAKTA SEJARAH •" tengah="ASLI" tunda={40} />
    <Grain />
  </AbsoluteFill>
);
