// EP 2 — Perjalanan Kopi: latar gelap cokelat, jalur sobekan kertas diagonal berisi 5 tahap,
// stiker cangkir besar, kartu label biji Arabika vs Robusta, cap & coretan.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, Cap, F, FilterKolase, Grain, LatarKertas, PanahTangan, Selotip, Sobekan, Tulisan, halftone, usePop } from "./pustaka";

const Ceri = () => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <path d="M 60 18 C 50 30, 40 34, 26 34" stroke="#2F7D4F" strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={30} cy={30} rx={18} ry={9} fill="#3FA06A" transform="rotate(-25 30 30)" />
    {[[46, 62, "#C8102E"], [72, 58, "#E23B3B"], [60, 84, "#A30D24"], [84, 82, "#D7263D"]].map(([x, y, c], i) => (
      <g key={i}>
        <circle cx={x as number} cy={y as number} r={16} fill={c as string} />
        <circle cx={(x as number) - 5} cy={(y as number) - 5} r={5} fill="#fff" opacity={0.55} />
      </g>
    ))}
  </svg>
);
const Jemur = () => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <circle cx={92} cy={24} r={14} fill="#F7C948" />
    <rect x={10} y={70} width={100} height={30} rx={4} fill="#8C6239" />
    {Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx={20 + (i % 9) * 10} cy={78 + Math.floor(i / 9) * 12} rx={5} ry={3.5} fill={i % 2 ? "#6B3E1E" : "#8A5328"} />)}
  </svg>
);
const Sangrai = () => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <path d="M 20 60 L 100 60 L 92 96 L 28 96 Z" fill="#2B2B2B" />
    <rect x={98} y={64} width={18} height={8} rx={4} fill="#57534E" />
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={36 + (i % 5) * 12} cy={58 - Math.floor(i / 5) * 8} rx={6} ry={4} fill="#3B2314" />)}
    {[0, 1, 2].map((i) => <path key={i} d={`M ${40 + i * 18} 40 q 6 -8 0 -16 q -6 -8 0 -16`} stroke="#E9DCC4" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />)}
  </svg>
);
const Giling = () => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <rect x={34} y={50} width={52} height={56} rx={6} fill="#A0703F" />
    <path d="M 30 50 L 90 50 L 80 30 L 40 30 Z" fill="#C0C7CE" />
    <rect x={56} y={14} width={8} height={18} fill="#57534E" />
    <path d="M 60 16 L 96 16" stroke="#57534E" strokeWidth={6} strokeLinecap="round" />
    <circle cx={98} cy={16} r={6} fill="#3B2314" />
    <rect x={44} y={80} width={32} height={16} rx={3} fill="#3B2314" />
  </svg>
);
const Seduh = () => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <path d="M 30 30 L 90 30 L 72 66 L 48 66 Z" fill="#E9EEF2" />
    <path d="M 36 36 L 84 36 L 70 60 L 50 60 Z" fill="#6B3E1E" />
    <rect x={40} y={70} width={40} height={34} rx={6} fill="#F3EBDD" opacity={0.7} />
    <rect x={44} y={84} width={32} height={18} rx={4} fill="#4A2A15" />
    {[0, 1, 2].map((i) => <circle key={i} cx={60} cy={68 + i * 5} r={2} fill="#4A2A15" />)}
  </svg>
);

const LANGKAH: { n: number; j: string; t: string; ikon: React.ReactNode; warna: string; x: number; y: number; rot: number }[] = [
  { n: 1, j: "Petik ceri", t: "biji ada di dalam buah merah", ikon: <Ceri />, warna: "#F3EBDD", x: 60, y: 560, rot: -4 },
  { n: 2, j: "Jemur", t: "dikeringkan berhari-hari", ikon: <Jemur />, warna: "#E9DCC4", x: 430, y: 690, rot: 3 },
  { n: 3, j: "Sangrai", t: "hijau → cokelat, aroma muncul", ikon: <Sangrai />, warna: "#F7C948", x: 120, y: 870, rot: 2 },
  { n: 4, j: "Giling", t: "halus atau kasar sesuai cara seduh", ikon: <Giling />, warna: "#F3EBDD", x: 500, y: 1010, rot: -3 },
  { n: 5, j: "Seduh", t: "air panas mengekstrak rasa", ikon: <Seduh />, warna: "#9ED8CF", x: 90, y: 1170, rot: -2 },
];

const Cangkir: React.FC = () => {
  const f = useCurrentFrame();
  const s = usePop(30);
  return (
    <svg width={460} height={460} viewBox="-230 -230 460 460" style={{ position: "absolute", left: 600, top: 1170, transform: `rotate(-6deg) scale(${s})`, filter: "drop-shadow(0 20px 22px rgba(0,0,0,0.45))", zIndex: 12 }}>
      {/* garis putih tebal = stiker potongan */}
      <g stroke="#fff" strokeWidth={22} strokeLinejoin="round">
        <ellipse cx={0} cy={120} rx={190} ry={42} fill="#fff" />
        <path d="M -140 -20 L 140 -20 L 112 120 L -112 120 Z" fill="#fff" />
        <path d="M 130 10 C 210 10, 210 90, 116 96" fill="none" />
      </g>
      <ellipse cx={0} cy={120} rx={190} ry={42} fill="#E9DCC4" />
      <ellipse cx={0} cy={116} rx={150} ry={30} fill="#D6C7AC" />
      <path d="M -140 -20 L 140 -20 L 112 120 L -112 120 Z" fill="#D7263D" />
      <path d="M 40 -20 L 140 -20 L 112 120 L 30 120 Z" fill="#A51D2F" />
      <path d="M -120 20 L 126 20" stroke="#F7C948" strokeWidth={10} />
      <path d="M 130 10 C 200 10, 200 86, 116 92" fill="none" stroke="#A51D2F" strokeWidth={18} strokeLinecap="round" />
      <ellipse cx={0} cy={-20} rx={140} ry={30} fill="#F3EBDD" />
      <ellipse cx={0} cy={-18} rx={124} ry={22} fill="#4A2A15" />
      <ellipse cx={-30} cy={-22} rx={40} ry={8} fill="#7A4A2A" opacity={0.7} />
      <path d="M -10 -24 c 20 -10 40 4 20 10 c -18 6 -36 -4 -20 -10" fill="#E9DCC4" opacity={0.8} />
      {[-50, 0, 50].map((x, i) => (
        <path key={x} d={`M ${x} -60 q 18 -26 0 -52 q -18 -26 0 -52`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.75 - ((f + i * 10) % 30) / 90} />
      ))}
      <text x={-70} y={80} fontFamily={F.poster} fontSize={46} fill="#F3EBDD">KOPI</text>
    </svg>
  );
};

export const Ep2Kopi: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna="#3B2A20" />
    {/* bercak noda kopi */}
    {[[880, 300, 150], [150, 1420, 110]].map(([x, y, r], i) => (
      <svg key={i} width={r * 2.4} height={r * 2.4} style={{ position: "absolute", left: x - r * 1.2, top: y - r * 1.2, opacity: 0.35 }}>
        <g filter="url(#sobekHalus)">
          <circle cx={r * 1.2} cy={r * 1.2} r={r} fill="none" stroke="#7A4A2A" strokeWidth={14} />
          <circle cx={r * 1.2} cy={r * 1.2} r={r - 10} fill="#7A4A2A" opacity={0.25} />
        </g>
      </svg>
    ))}
    {/* jalur sobekan diagonal (kedalaman lapisan) */}
    <Sobekan x={-80} y={640} w={1260} h={130} warna="#C9A574" rot={-10} bayang={0.5} />
    <Sobekan x={-80} y={1020} w={1260} h={130} warna="#C9A574" rot={8} bayang={0.5} />

    {/* judul */}
    <Sobekan x={50} y={60} w={420} h={70} warna={C.kuning} rot={-3} halus>
      <div style={{ padding: "8px 22px", fontFamily: F.poster, fontSize: 36, color: C.tinta, letterSpacing: 3 }}>KOLASE · RASA #02</div>
    </Sobekan>
    <div style={{ position: "absolute", left: 60, top: 160, fontFamily: F.serif, color: "#F3EBDD" }}>
      <div style={{ fontSize: 60, fontStyle: "italic", fontWeight: 700 }}>dari</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginTop: -6 }}>
        <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9 }}>KEBUN</span>
        <span style={{ fontSize: 60, fontStyle: "italic", fontWeight: 700, paddingBottom: 12 }}>ke</span>
      </div>
    </div>
    <Sobekan x={80} y={350} w={660} h={170} warna="#F3EBDD" rot={-2} halus tunda={4}>
      <div style={{ padding: "4px 30px", fontFamily: F.poster, fontSize: 140, color: C.merah, lineHeight: 1.1, letterSpacing: 2 }}>CANGKIR</div>
    </Sobekan>
    <Selotip x={660} y={340} w={140} rot={24} warna="rgba(255,255,255,0.5)" />
    <Tulisan x={780} y={410} teks={"5 langkah\nsebelum\nkamu seruput"} ukuran={44} warna={C.kuning} rot={6} lebar={260} />

    {/* lima tahap */}
    {LANGKAH.map((l, i) => (
      <Sobekan key={l.n} x={l.x} y={l.y} w={440} h={150} warna={l.warna} rot={l.rot} tunda={10 + i * 5} halus>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px" }}>
          <div style={{ flexShrink: 0, width: 120, height: 120 }}>{l.ikon}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: C.tinta, color: "#F3EBDD", fontFamily: F.poster, fontSize: 28, display: "grid", placeItems: "center" }}>{l.n}</div>
              <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 40, color: C.tinta }}>{l.j}</div>
            </div>
            <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: "#44403C", marginTop: 4, lineHeight: 1 }}>{l.t}</div>
          </div>
        </div>
      </Sobekan>
    ))}
    <PanahTangan d="M 500 700 C 520 680, 560 690, 580 720" ujung={[580, 720, 60]} warna={C.kuning} />
    <PanahTangan d="M 470 900 C 500 930, 520 960, 540 1010" ujung={[540, 1010, 70]} warna={C.kuning} />
    <PanahTangan d="M 480 1110 C 440 1140, 400 1160, 360 1170" ujung={[360, 1170, 160]} warna={C.kuning} />

    <Cangkir />

    {/* kartu label biji: Arabika vs Robusta */}
    {[
      { x: 60, rot: -3, warna: "#F3EBDD", nama: "ARABIKA", isi: ["rasa lebih asam & wangi", "kafein lebih rendah", "tumbuh di dataran tinggi"], c: C.hijau },
      { x: 330, rot: 4, warna: "#E9DCC4", nama: "ROBUSTA", isi: ["rasa lebih pahit & tebal", "kafein ±2× Arabika", "lebih tahan hama"], c: C.merah },
    ].map((k, i) => (
      <Sobekan key={k.nama} x={k.x} y={1380} w={260} h={330} warna={k.warna} rot={k.rot} tunda={36 + i * 5}>
        <div style={{ padding: "22px 20px" }}>
          <div style={{ height: 70, ...halftone(k.c, 7), backgroundColor: "#fff", display: "grid", placeItems: "center", border: `3px solid ${k.c}` }}>
            <span style={{ fontFamily: F.poster, fontSize: 40, color: k.c, background: "#fff", padding: "0 10px" }}>{k.nama}</span>
          </div>
          {k.isi.map((t) => (
            <div key={t} style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: C.tinta, marginTop: 12, lineHeight: 1 }}>• {t}</div>
          ))}
        </div>
      </Sobekan>
    ))}
    <Selotip x={150} y={1366} w={110} rot={-6} warna="rgba(255,255,255,0.5)" />
    <Selotip x={420} y={1368} w={110} rot={8} warna="rgba(255,255,255,0.5)" />
    <Cap x={520} y={1780} r={95} teks="• INDONESIA •" tengah="5 BESAR" warna={C.kuning} rot={10} tunda={46} />
    <Tulisan x={60} y={1760} teks={"Indonesia termasuk\nproduser kopi terbesar dunia"} ukuran={36} warna="#F3EBDD" rot={-2} lebar={380} />
    <div style={{ position: "absolute", left: 640, bottom: 40, fontFamily: F.sans, fontSize: 19, color: "#C9A574" }}>Sumber: ICO · ilustrasi disederhanakan</div>
    <Grain o={0.22} />
  </AbsoluteFill>
);
