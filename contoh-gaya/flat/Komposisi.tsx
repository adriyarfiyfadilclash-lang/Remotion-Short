// Contoh gaya ADRIY Flat Design 9:16: (1) explainer bergambar Siklus Air, (2) infografik Komposisi Udara,
// (3) tips langkah Hemat Listrik. Ilustrasi vektor SVG datar dengan bayangan dua nada.
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";
import { BarProgres, JudulFlat, KepalaFlat, Lencana, LatarFlat, P, Pop, Sumber, W, usePop } from "./pustaka";

// ======================= 1. SIKLUS AIR =======================
const Awan: React.FC<{ x: number; y: number; s?: number; gelap?: boolean }> = ({ x, y, s = 1, gelap }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={22} rx={110} ry={20} fill={gelap ? "#64748B" : "#CBD5E1"} opacity={0.5} />
    <circle cx={-55} cy={0} r={38} fill={gelap ? "#94A3B8" : "#FFFFFF"} />
    <circle cx={0} cy={-22} r={52} fill={gelap ? "#94A3B8" : "#FFFFFF"} />
    <circle cx={55} cy={-2} r={40} fill={gelap ? "#94A3B8" : "#FFFFFF"} />
    <rect x={-92} y={0} width={186} height={38} rx={19} fill={gelap ? "#94A3B8" : "#FFFFFF"} />
    <path d="M -92 19 A 19 19 0 0 0 -73 38 L 75 38 A 19 19 0 0 0 94 19 Z" fill={gelap ? "#7B8BA3" : "#E2E8F0"} />
  </g>
);

const Pohon: React.FC<{ x: number; y: number; s?: number; jenis?: "bulat" | "cemara" }> = ({ x, y, s = 1, jenis = "bulat" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-10} width={12} height={40} rx={3} fill="#92400E" />
    {jenis === "bulat" ? (
      <>
        <circle cx={0} cy={-40} r={34} fill="#22C55E" />
        <path d="M 0 -74 A 34 34 0 0 1 0 -6 Z" fill="#16A34A" />
      </>
    ) : (
      <>
        <polygon points="0,-90 -32,-10 32,-10" fill="#22C55E" />
        <polygon points="0,-90 0,-10 32,-10" fill="#15803D" />
      </>
    )}
  </g>
);

const Panah: React.FC<{ d: string; warna: string; panjang: number; tunda: number }> = ({ d, warna, panjang, tunda }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [tunda, tunda + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <g>
      <path d={d} fill="none" stroke={warna} strokeWidth={14} strokeLinecap="round" strokeDasharray={`${panjang}`} strokeDashoffset={panjang * (1 - p)} markerEnd={p > 0.95 ? `url(#ujung-${warna.slice(1)})` : undefined} />
    </g>
  );
};

const IlustrasiAir: React.FC = () => {
  const f = useCurrentFrame();
  const ombak = (f * 1.2) % 80;
  const lencana = (n: number, x: number, y: number, warna: string, tunda: number) => {
    const s = usePop(tunda);
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <circle r={34} fill={warna} stroke="#fff" strokeWidth={6} />
        <text y={13} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="#fff">{n}</text>
      </g>
    );
  };
  return (
    <svg width={960} height={900} viewBox="0 0 960 900">
      <defs>
        {[P.oranye, P.biru, P.ungu, P.hijau].map((c) => (
          <marker key={c} id={`ujung-${c.slice(1)}`} markerUnits="userSpaceOnUse" markerWidth="40" markerHeight="40" refX="14" refY="20" orient="auto">
            <path d="M0,4 L36,20 L0,36 L8,20 Z" fill={c} />
          </marker>
        ))}
        <clipPath id="kartu"><rect width={960} height={900} rx={40} /></clipPath>
      </defs>
      <g clipPath="url(#kartu)">
        <rect width={960} height={900} fill="#BAE6FD" />
        <rect y={520} width={960} height={380} fill="#A7F3D0" opacity={0.4} />
        {/* matahari */}
        <g transform="translate(150 140)">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={-6} y={-112 - 6 * Math.sin(f / 8 + i)} width={12} height={34} rx={6} fill={P.kuning} transform={`rotate(${i * 30 + f * 0.4})`} />
          ))}
          <circle r={70} fill={P.stabilo} />
          <circle r={56} fill={P.kuning} />
          <path d="M 0 -56 A 56 56 0 0 1 0 56 Z" fill="#D97706" opacity={0.35} />
        </g>
        <Awan x={560} y={130} s={0.9} />
        <Awan x={800} y={250} s={1.1} gelap />
        {/* hujan */}
        {Array.from({ length: 14 }, (_, i) => {
          const x = 720 + (i % 7) * 26 + (i > 6 ? 13 : 0);
          const y = 310 + ((f * 7 + i * 37) % 170);
          return <rect key={i} x={x} y={y} width={7} height={26} rx={3.5} fill={P.biru} opacity={0.85} />;
        })}
        {/* gunung belakang bersalju */}
        <polygon points="520,600 700,330 880,600" fill="#64748B" />
        <polygon points="700,330 880,600 700,600" fill="#475569" />
        <polygon points="700,330 655,398 680,390 700,410 722,388 745,398" fill="#FFFFFF" />
        <polygon points="760,600 900,400 1040,600" fill="#64748B" />
        <polygon points="900,400 1040,600 900,600" fill="#475569" />
        <polygon points="900,400 868,446 890,440 905,456 925,440 932,446" fill="#FFFFFF" />
        {/* bukit depan */}
        <path d="M 300 640 Q 560 470 960 600 L 960 900 L 300 900 Z" fill="#22C55E" />
        <path d="M 620 560 Q 800 540 960 600 L 960 900 L 680 900 Z" fill="#16A34A" />
        {/* sungai berkelok ke laut */}
        <path d="M 760 600 C 700 660, 760 700, 640 740 S 470 780, 380 830" fill="none" stroke="#3B82F6" strokeWidth={34} strokeLinecap="round" />
        <path d="M 760 600 C 700 660, 760 700, 640 740 S 470 780, 380 830" fill="none" stroke="#93C5FD" strokeWidth={8} strokeLinecap="round" strokeDasharray="30 40" strokeDashoffset={-f * 3} />
        {/* laut */}
        <path d="M 0 610 L 420 610 Q 380 720 470 900 L 0 900 Z" fill={P.biru} />
        <path d="M 0 610 L 420 610 Q 400 660 410 700 L 0 700 Z" fill="#3B82F6" />
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M ${-80 + ombak} ${650 + r * 60} q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} fill="none" stroke="#93C5FD" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
        ))}
        {/* uap naik dari laut */}
        {[80, 170, 260].map((x, i) => {
          const y = 590 - ((f * 2 + i * 50) % 150);
          return <path key={x} d={`M ${x} ${y} q 14 -18 0 -36 q -14 -18 0 -36`} fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.9 - ((f * 2 + i * 50) % 150) / 200} />;
        })}
        {/* rumah & pohon */}
        <g transform="translate(560 640)">
          <rect x={-60} y={-50} width={120} height={80} fill="#FFFFFF" />
          <rect x={0} y={-50} width={60} height={80} fill="#E2E8F0" />
          <polygon points="-75,-48 0,-110 75,-48" fill={P.oranye} />
          <polygon points="0,-110 75,-48 0,-48" fill="#EA580C" />
          <rect x={-18} y={-10} width={36} height={40} rx={4} fill={P.navy} />
          <rect x={-48} y={-36} width={24} height={20} rx={3} fill="#BAE6FD" />
        </g>
        <Pohon x={430} y={650} s={1.1} />
        <Pohon x={680} y={660} s={0.9} jenis="cemara" />
        <Pohon x={860} y={680} s={1.2} jenis="cemara" />
        <Pohon x={900} y={760} s={0.9} />
        {/* panah siklus */}
        <Panah d="M 200 520 C 220 330, 380 200, 470 160" warna={P.oranye} panjang={420} tunda={20} />
        <Panah d="M 650 120 C 700 120, 740 150, 760 180" warna={P.ungu} panjang={160} tunda={30} />
        <Panah d="M 905 330 C 925 390, 920 450, 880 520" warna={P.biru} panjang={220} tunda={40} />
        <Panah d="M 360 820 C 300 800, 260 760, 250 720" warna={P.hijau} panjang={140} tunda={50} />
        {lencana(1, 230, 380, P.oranye, 26)}
        {lencana(2, 720, 70, P.ungu, 36)}
        {lencana(3, 850, 430, P.biru, 46)}
        {lencana(4, 300, 860, P.hijau, 56)}
      </g>
    </svg>
  );
};

const LANGKAH_AIR = [
  { n: 1, w: P.oranye, j: "Penguapan", t: "Panas matahari mengubah air laut jadi uap." },
  { n: 2, w: P.ungu, j: "Pengembunan", t: "Uap mendingin di atas, membentuk awan." },
  { n: 3, w: P.biru, j: "Hujan", t: "Titik air menggumpal lalu jatuh." },
  { n: 4, w: P.hijau, j: "Pengumpulan", t: "Air mengalir lewat sungai kembali ke laut." },
];

const AdeganAir: React.FC = () => (
  <AbsoluteFill>
    <LatarFlat />
    <KepalaFlat seri="Sains Sehari-hari" ep="EP 01" font={FONT} warna={P.biru} />
    <BarProgres aktif={0} total={3} />
    <JudulFlat atas="Ke mana air hujan" sorot="pergi?" sub="Siklus air dalam 4 langkah" top={200} font={FONT} />
    <Pop tunda={8} style={{ position: "absolute", left: 60, top: 470, borderRadius: 40, boxShadow: "0 14px 0 rgba(15,23,42,0.08)" }}>
      <IlustrasiAir />
    </Pop>
    <div style={{ position: "absolute", left: 60, right: 60, top: 1400, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      {LANGKAH_AIR.map((l, i) => (
        <Pop key={l.n} tunda={60 + i * 5}>
          <div style={{ display: "flex", gap: 16, background: "#fff", borderRadius: 24, padding: "20px 20px", boxShadow: "0 6px 0 rgba(15,23,42,0.06)", height: 160, boxSizing: "border-box" }}>
            <Lencana n={l.n} warna={l.w} ukuran={56} font={FONT} />
            <div style={{ fontFamily: FONT }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: P.navy }}>{l.j}</div>
              <div style={{ fontSize: 24, color: P.abu, marginTop: 4, lineHeight: 1.3 }}>{l.t}</div>
            </div>
          </div>
        </Pop>
      ))}
    </div>
    <Sumber teks="Ilustrasi sederhana · siklus air terjadi terus-menerus" font={FONT} />
  </AbsoluteFill>
);

// ======================= 2. KOMPOSISI UDARA =======================
const GAS = [
  { nama: "Nitrogen", rumus: "N₂", persen: 78.08, w: P.biru },
  { nama: "Oksigen", rumus: "O₂", persen: 20.95, w: P.hijau },
  { nama: "Argon", rumus: "Ar", persen: 0.93, w: P.oranye },
  { nama: "Gas lain (termasuk CO₂)", rumus: "+", persen: 0.04, w: P.pink },
];

const Donat: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [10, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const R = 230, T = 92, K = 2 * Math.PI * R;
  let mulai = 0;
  return (
    <svg width={500} height={500} viewBox="-280 -280 560 560">
      <circle r={R} fill="none" stroke="#E2E8F0" strokeWidth={T} />
      {GAS.map((g) => {
        const porsi = Math.max(g.persen / 100, 0.004);
        const el = (
          <circle key={g.nama} r={R} fill="none" stroke={g.w} strokeWidth={T} strokeDasharray={`${K * porsi * p} ${K}`} strokeDashoffset={-K * mulai * p} transform="rotate(-90)" />
        );
        mulai += porsi;
        return el;
      })}
      <circle r={R - T / 2 - 8} fill="#fff" />
      <circle r={R - T / 2 - 8} fill="none" stroke="#E2E8F0" strokeWidth={4} />
      <text y={-30} textAnchor="middle" fontFamily={FONT} fontSize={30} fontWeight={700} fill={P.abu}>UDARA KERING</text>
      <text y={50} textAnchor="middle" fontFamily={FONT} fontSize={92} fontWeight={800} fill={P.navy}>100%</text>
    </svg>
  );
};

const Molekul: React.FC<{ rumus: string; w: string }> = ({ rumus, w }) => (
  <svg width={74} height={74} viewBox="-37 -37 74 74">
    {rumus === "Ar" ? (
      <circle r={24} fill={w} />
    ) : rumus === "+" ? (
      <>
        <circle cx={-12} cy={8} r={12} fill={w} />
        <circle cx={12} cy={-10} r={10} fill={w} opacity={0.7} />
        <circle cx={14} cy={14} r={7} fill={w} opacity={0.5} />
      </>
    ) : (
      <>
        <rect x={-14} y={-5} width={28} height={10} rx={5} fill="#CBD5E1" />
        <circle cx={-15} r={17} fill={w} />
        <circle cx={15} r={17} fill={w} />
        <path d="M -15 -17 A 17 17 0 0 1 -15 17 Z" fill="#0F172A" opacity={0.15} />
        <path d="M 15 -17 A 17 17 0 0 1 15 17 Z" fill="#0F172A" opacity={0.15} />
      </>
    )}
  </svg>
);

const Waffle: React.FC = () => {
  const f = useCurrentFrame();
  const warna = (i: number) => (i < 78 ? P.biru : i < 99 ? P.hijau : P.oranye);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 7 }}>
      {Array.from({ length: 100 }, (_, i) => {
        const s = interpolate(f, [40 + i * 0.5, 50 + i * 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <div key={i} style={{ aspectRatio: "1", borderRadius: 8, background: warna(i), transform: `scale(${s})` }} />;
      })}
    </div>
  );
};

const AdeganUdara: React.FC = () => (
  <AbsoluteFill>
    <LatarFlat />
    <KepalaFlat seri="Sains Sehari-hari" ep="EP 02" font={FONT} warna={P.hijau} />
    <BarProgres aktif={1} total={3} />
    <JudulFlat atas="Udara yang kamu hirup" sorot="bukan" bawah="cuma oksigen" sub="Isi udara kering di sekitar kita" top={200} font={FONT} warnaSorot="#BBF7D0" />
    <Pop tunda={6} style={{ position: "absolute", left: 290, top: 600, width: 500, height: 500 }}>
      <Donat />
    </Pop>
    <div style={{ position: "absolute", left: 60, right: 60, top: 1130, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {GAS.map((g, i) => (
        <Pop key={g.nama} tunda={50 + i * 5}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 24, padding: "16px 18px", boxShadow: "0 6px 0 rgba(15,23,42,0.06)", borderTop: `8px solid ${g.w}` }}>
            <Molekul rumus={g.rumus} w={g.w} />
            <div style={{ fontFamily: FONT }}>
              <div style={{ fontSize: 46, fontWeight: 800, color: P.navy, lineHeight: 1 }}>
                {g.persen.toLocaleString("id-ID")}
                <span style={{ fontSize: 28 }}>%</span>
              </div>
              <div style={{ fontSize: 23, color: P.abu, marginTop: 6, lineHeight: 1.2 }}>{g.nama}</div>
            </div>
          </div>
        </Pop>
      ))}
    </div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 1420, background: "#fff", borderRadius: 28, padding: "22px 26px", boxShadow: "0 6px 0 rgba(15,23,42,0.06)", fontFamily: FONT }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: P.navy, marginBottom: 16 }}>
        Dari setiap <span style={{ background: P.stabilo, padding: "0 6px", borderRadius: 6 }}>100 molekul</span> udara:
      </div>
      <Waffle />
      <div style={{ display: "flex", gap: 22, marginTop: 14, fontSize: 22, color: P.abu, fontWeight: 600 }}>
        <span><b style={{ color: P.biru }}>■</b> 78 nitrogen</span>
        <span><b style={{ color: P.hijau }}>■</b> 21 oksigen</span>
        <span><b style={{ color: P.oranye }}>■</b> 1 argon & lainnya</span>
      </div>
    </div>
    <Sumber teks="Sumber: NASA & NOAA · persentase volume udara kering" font={FONT} />
  </AbsoluteFill>
);

// ======================= 3. HEMAT LISTRIK =======================
const Ikon: React.FC<{ jenis: string }> = ({ jenis }) => {
  const f = useCurrentFrame();
  return (
    <svg width={110} height={110} viewBox="-55 -55 110 110">
      {jenis === "colokan" && (
        <>
          <rect x={-22} y={-30} width={44} height={40} rx={10} fill="#fff" />
          <rect x={0} y={-30} width={22} height={40} rx={0} fill="#E2E8F0" />
          <rect x={-14} y={-46} width={8} height={18} rx={3} fill="#CBD5E1" />
          <rect x={6} y={-46} width={8} height={18} rx={3} fill="#CBD5E1" />
          <path d="M 0 10 C 0 30, -24 30, -24 48" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
          <circle cx={26} cy={-34} r={12} fill={P.stabilo} />
          <path d="M 22 -40 L 28 -34 L 24 -34 L 30 -27" fill="none" stroke={P.navy} strokeWidth={3} />
        </>
      )}
      {jenis === "ac" && (
        <>
          <rect x={-44} y={-30} width={88} height={40} rx={10} fill="#fff" />
          <rect x={-44} y={-2} width={88} height={12} rx={0} fill="#E2E8F0" />
          <rect x={-34} y={0} width={68} height={5} rx={2.5} fill="#94A3B8" />
          <circle cx={30} cy={-18} r={4} fill={P.hijau} />
          {[-24, 0, 24].map((x, i) => (
            <path key={x} d={`M ${x} ${18 + ((f + i * 6) % 18)} q 6 6 0 12`} fill="none" stroke="#BAE6FD" strokeWidth={5} strokeLinecap="round" />
          ))}
          <text x={0} y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={16} fill={P.cyan}>25°</text>
        </>
      )}
      {jenis === "lampu" && (
        <>
          <circle cy={-10} r={30} fill={P.stabilo} />
          <path d="M 0 -40 A 30 30 0 0 1 0 20 Z" fill={P.kuning} />
          <rect x={-14} y={20} width={28} height={10} rx={3} fill="#CBD5E1" />
          <rect x={-12} y={32} width={24} height={8} rx={3} fill="#94A3B8" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={-3} y={-62} width={6} height={12} rx={3} fill="#fff" transform={`rotate(${-60 + i * 30} 0 -10)`} />
          ))}
          <text y={-2} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={15} fill={P.navy}>LED</text>
        </>
      )}
      {jenis === "kulkas" && (
        <>
          <rect x={-26} y={-46} width={52} height={92} rx={10} fill="#fff" />
          <rect x={0} y={-46} width={26} height={92} rx={0} fill="#E2E8F0" />
          <rect x={-26} y={-12} width={52} height={4} fill="#CBD5E1" />
          <rect x={-18} y={-36} width={5} height={16} rx={2.5} fill="#94A3B8" />
          <rect x={-18} y={0} width={5} height={22} rx={2.5} fill="#94A3B8" />
          <circle cx={30} cy={-30} r={14} fill={P.oranye} />
          <rect x={28} y={-38} width={4} height={10} rx={2} fill="#fff" />
          <circle cx={30} cy={-24} r={2.5} fill="#fff" />
        </>
      )}
      {jenis === "saklar" && (
        <>
          <rect x={-30} y={-44} width={60} height={88} rx={14} fill="#fff" />
          <rect x={0} y={-44} width={30} height={88} rx={0} fill="#E2E8F0" opacity={0.6} />
          <rect x={-14} y={-26} width={28} height={52} rx={8} fill="#CBD5E1" />
          <rect x={-14} y={0} width={28} height={26} rx={8} fill={P.navy} />
          <text y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12} fill={P.abu}>ON</text>
          <text y={19} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={12} fill="#fff">OFF</text>
        </>
      )}
    </svg>
  );
};

const TIPS = [
  { ikon: "colokan", w: P.ungu, j: "Cabut charger yang tidak dipakai", t: "Perangkat yang tercolok tetap menyedot daya siaga." },
  { ikon: "ac", w: P.cyan, j: "Atur AC di sekitar 25 °C", t: "Setiap derajat lebih dingin, kerja AC makin berat." },
  { ikon: "lampu", w: P.kuning, j: "Ganti ke lampu LED", t: "Terangnya sama, listriknya jauh lebih sedikit." },
  { ikon: "kulkas", w: P.oranye, j: "Jangan lama membuka kulkas", t: "Udara dingin keluar, mesin bekerja ulang." },
  { ikon: "saklar", w: P.hijau, j: "Matikan lampu saat keluar ruangan", t: "Kebiasaan kecil, hemat tiap bulan." },
];

const AdeganListrik: React.FC = () => {
  const f = useCurrentFrame();
  const garis = interpolate(f, [20, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <LatarFlat />
      <KepalaFlat seri="Sains Sehari-hari" ep="EP 03" font={FONT} warna={P.oranye} />
      <BarProgres aktif={2} total={3} />
      <JudulFlat atas="5 cara" sorot="hemat listrik" bawah="di rumah" sub="Mulai hari ini, tanpa biaya" top={200} font={FONT} warnaSorot="#FED7AA" />
      <div style={{ position: "absolute", left: 122, top: 520, width: 8, height: 830 * garis, borderRadius: 4, background: "#CBD5E1" }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 470, display: "flex", flexDirection: "column", gap: 26 }}>
        {TIPS.map((t, i) => (
          <Pop key={i} tunda={24 + i * 7}>
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <Lencana n={i + 1} warna={t.w} ukuran={70} font={FONT} />
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 20, background: "#fff", borderRadius: 28, padding: "18px 22px", boxShadow: "0 7px 0 rgba(15,23,42,0.07)" }}>
                <div style={{ width: 130, height: 130, borderRadius: 26, background: t.w, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Ikon jenis={t.ikon} />
                </div>
                <div style={{ fontFamily: FONT }}>
                  <div style={{ fontSize: 33, fontWeight: 800, color: P.navy, lineHeight: 1.15 }}>{t.j}</div>
                  <div style={{ fontSize: 25, color: P.abu, marginTop: 8, lineHeight: 1.3 }}>{t.t}</div>
                </div>
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <Pop tunda={64} style={{ position: "absolute", left: 60, right: 60, top: 1450 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, background: P.navy, borderRadius: 32, padding: "26px 30px", boxShadow: "0 8px 0 rgba(15,23,42,0.18)" }}>
          <svg width={190} height={190} viewBox="-95 -95 190 190">
            <rect x={-70} y={-82} width={140} height={164} rx={22} fill="#fff" />
            <rect x={0} y={-82} width={70} height={164} rx={0} fill="#E2E8F0" />
            <rect x={-52} y={-60} width={104} height={44} rx={8} fill="#0F172A" />
            <text x={0} y={-30} textAnchor="middle" fontFamily="'DejaVu Sans Mono', monospace" fontWeight={700} fontSize={22} fill="#4ADE80">
              {String(1284 + Math.floor(f / 6)).padStart(5, "0")}
            </text>
            <text x={0} y={-2} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={13} fill={P.abu}>kWh</text>
            <circle cx={0} cy={36} r={30} fill="#CBD5E1" />
            <rect x={-3} y={10} width={6} height={28} rx={3} fill={P.navy} transform={`rotate(${f * 6} 0 36)`} />
            <circle cx={0} cy={36} r={6} fill={P.navy} />
            <circle cx={62} cy={-74} r={26} fill={P.stabilo} />
            <polygon points="66,-94 50,-70 62,-70 56,-52 74,-78 62,-78" fill={P.navy} />
          </svg>
          <div style={{ fontFamily: FONT }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: P.stabilo, letterSpacing: 2 }}>BONUS</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 6 }}>Cek meteran listrik tiap minggu</div>
            <div style={{ fontSize: 26, color: "#CBD5E1", marginTop: 8, lineHeight: 1.3 }}>Bandingkan angkanya untuk melihat hasil kebiasaan barumu.</div>
          </div>
        </div>
      </Pop>
      <Sumber teks="Tips umum hemat energi · hasil berbeda tiap rumah" font={FONT} />
    </AbsoluteFill>
  );
};

export const ContohFlat: React.FC = () => (
  <AbsoluteFill style={{ background: P.latar }}>
    <Sequence durationInFrames={110}><AdeganAir /></Sequence>
    <Sequence from={110} durationInFrames={110}><AdeganUdara /></Sequence>
    <Sequence from={220} durationInFrames={110}><AdeganListrik /></Sequence>
  </AbsoluteFill>
);
