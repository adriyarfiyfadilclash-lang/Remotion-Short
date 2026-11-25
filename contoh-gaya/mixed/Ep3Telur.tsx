// EP 03 — SAINS: Isi Sebutir Telur (konsep: diagram, potongan objek) + perbandingan dua kertas.
// Warna dominan: krem, kuning, toska, hitam.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, Cap, F, FilterKolase, GarisGambar, Grain, HurufPop, LatarKertas, Selotip, Sobekan, Tulisan, usePhotoDrop } from "./pustaka";

// Potongan telur gaya ilustrasi buku pengetahuan
const PotonganTelur: React.FC = () => {
  const g = usePhotoDrop(14, -3, 7);
  const tinta = C.hitam;
  return (
    <div style={{ position: "absolute", left: 70, top: 470, width: 560, height: 760, transform: g.transform, opacity: g.opacity, zIndex: 8, filter: `drop-shadow(0 ${22 * g.bayang}px ${26 * g.bayang}px rgba(37,37,37,0.32))` }}>
      <svg viewBox="-280 -380 560 760" width={560} height={760}>
        <defs>
          <radialGradient id="kuningT" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#FFE58A" />
            <stop offset="0.7" stopColor={C.kuning} />
            <stop offset="1" stopColor="#D9A21E" />
          </radialGradient>
          <clipPath id="isiTelur"><path d="M 0 -330 C 170 -330, 245 -110, 245 60 C 245 240, 140 345, 0 345 C -140 345, -245 240, -245 60 C -245 -110, -170 -330, 0 -330 Z" /></clipPath>
        </defs>
        {/* cangkang berbintik (tebal, garis potong) */}
        <path d="M 0 -360 C 190 -360, 272 -120, 272 60 C 272 260, 155 372, 0 372 C -155 372, -272 260, -272 60 C -272 -120, -190 -360, 0 -360 Z" fill="#F3ECE0" stroke={tinta} strokeWidth={5} />
        <path d="M 0 -360 C 190 -360, 272 -120, 272 60 C 272 260, 155 372, 0 372 C -155 372, -272 260, -272 60 C -272 -120, -190 -360, 0 -360 Z" fill="url(#bintik)" opacity={0.18} />
        {/* membran */}
        <path d="M 0 -330 C 170 -330, 245 -110, 245 60 C 245 240, 140 345, 0 345 C -140 345, -245 240, -245 60 C -245 -110, -170 -330, 0 -330 Z" fill="#EAF4F1" stroke={tinta} strokeWidth={3} />
        <g clipPath="url(#isiTelur)">
          {/* kantung udara di ujung tumpul (atas) */}
          <path d="M -150 -260 C -80 -220, 80 -220, 150 -260 L 150 -400 L -150 -400 Z" fill="#FFFFFF" stroke={tinta} strokeWidth={3} />
          <path d="M -150 -260 C -80 -220, 80 -220, 150 -260" fill="none" stroke={tinta} strokeWidth={3} strokeDasharray="8 6" />
          {/* putih telur kental & encer */}
          <ellipse cx={0} cy={70} rx={205} ry={250} fill={C.toska} opacity={0.28} stroke={tinta} strokeWidth={2.5} strokeDasharray="10 7" />
          <ellipse cx={0} cy={70} rx={205} ry={250} fill="url(#arsir)" opacity={0.08} />
        </g>
        {/* kalaza (tali terpilin) */}
        {[-1, 1].map((s) => (
          <path key={s} d={`M ${s * 100} 60 C ${s * 130} 30, ${s * 140} 90, ${s * 170} 60 C ${s * 195} 36, ${s * 200} 92, ${s * 225} 66`} fill="none" stroke="#F3ECE0" strokeWidth={14} strokeLinecap="round" />
        ))}
        {[-1, 1].map((s) => (
          <path key={`g${s}`} d={`M ${s * 100} 60 C ${s * 130} 30, ${s * 140} 90, ${s * 170} 60 C ${s * 195} 36, ${s * 200} 92, ${s * 225} 66`} fill="none" stroke={tinta} strokeWidth={2.5} strokeLinecap="round" />
        ))}
        {/* kuning telur dengan cincin lapisan */}
        <circle cx={0} cy={60} r={112} fill="url(#kuningT)" stroke={tinta} strokeWidth={4} />
        {[88, 64, 40].map((r) => <circle key={r} cx={0} cy={60} r={r} fill="none" stroke="#C98E14" strokeWidth={2} opacity={0.6} />)}
        <path d="M 30 60 A 112 112 0 0 1 -40 165 A 112 112 0 0 0 100 100 Z" fill="url(#arsirRapat)" opacity={0.18} />
        {/* bakal embrio (germinal disc) */}
        <ellipse cx={-38} cy={-38} rx={18} ry={11} fill="#FFFDF5" stroke={tinta} strokeWidth={2} />
        <path d="M -60 20 C -60 -10, -40 -30, -10 -36" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
      </svg>
    </div>
  );
};

const LABEL = [
  { n: 1, t: "Kantung udara", s: "di ujung tumpul", garis: "M 470 580 C 560 570, 660 580, 730 590", y: 570 },
  { n: 2, t: "Membran", s: "dua lapis tipis", garis: "M 580 700 C 640 700, 690 705, 730 705", y: 690 },
  { n: 3, t: "Cangkang", s: "ribuan pori kecil", garis: "M 615 840 C 660 838, 700 836, 730 836", y: 820 },
  { n: 4, t: "Kalaza", s: "tali penahan kuning", garis: "M 566 905 C 620 930, 690 960, 730 966", y: 950 },
  { n: 5, t: "Kuning telur", s: "sumber lemak & vitamin", garis: "M 440 990 C 560 1060, 660 1090, 730 1096", y: 1080 },
  { n: 6, t: "Putih telur", s: "albumen", garis: "M 400 1120 C 520 1180, 640 1210, 730 1216", y: 1200 },
];

export const Ep3Telur: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna={C.krem} />

    <Sobekan x={60} y={60} w={460} h={70} warna={C.hitam} rot={-1.5} halus>
      <div style={{ padding: "9px 24px", fontFamily: F.poster, fontSize: 34, color: C.kuning, letterSpacing: 4 }}>DOKUMENTER · SAINS #03</div>
    </Sobekan>
    <div style={{ position: "absolute", left: 64, top: 170, fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 64, color: C.hitam }}>Isi sebutir</div>
    <HurufPop teks="TELUR" tunda={4} style={{ position: "absolute", left: 56, top: 236, fontFamily: F.poster, fontSize: 200, color: C.hitam, lineHeight: 1, letterSpacing: 4 }} />
    <Tulisan tunda={18} x={650} y={300} teks={"dibelah\nuntuk kamu ✂"} ukuran={50} warna={C.coklat} rot={-6} lebar={320} />

    <PotonganTelur />

    {/* daftar bagian di kolom kanan, garis tergambar ke potongan */}
    {LABEL.map((l, i) => (
      <React.Fragment key={l.n}>
        <GarisGambar d={l.garis} tunda={40 + i * 4} lama={14} warna={C.hitam} tebal={3} />
        <div style={{ position: "absolute", left: 740, top: l.y, zIndex: 31, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 19, background: C.kuning, border: `3px solid ${C.hitam}`, fontFamily: F.poster, fontSize: 22, display: "grid", placeItems: "center", color: C.hitam }}>{l.n}</div>
          <div>
            <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 30, color: C.hitam, lineHeight: 1 }}>{l.t}</div>
            <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 28, color: C.coklat, lineHeight: 1 }}>{l.s}</div>
          </div>
        </div>
      </React.Fragment>
    ))}

    {/* perbandingan dua kertas */}
    {[
      { x: 50, rot: -2, warna: "#F7F3EA", judul: "PUTIH TELUR", isi: ["± 90% air", "lebih dari separuh protein telur"], aksen: C.toska, dari: "kiri" as const },
      { x: 550, rot: 2, warna: "#FBEFC2", judul: "KUNING TELUR", isi: ["hampir semua lemaknya", "vitamin A, D, E di sini"], aksen: C.kuning, dari: "kanan" as const },
    ].map((k, i) => (
      <Sobekan key={k.judul} x={k.x} y={1380} w={480} h={330} warna={k.warna} rot={k.rot} tunda={30 + i * 6} dari={k.dari}>
        <div style={{ padding: "26px 32px" }}>
          <div style={{ display: "inline-block", background: k.aksen, padding: "4px 14px", fontFamily: F.poster, fontSize: 38, color: C.hitam, letterSpacing: 2 }}>{k.judul}</div>
          {k.isi.map((t) => (
            <div key={t} style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 34, color: C.hitam, marginTop: 18, lineHeight: 1.1 }}>— {t}</div>
          ))}
        </div>
      </Sobekan>
    ))}
    <Selotip tunda={38} x={210} y={1364} w={120} rot={-6} warna="rgba(255,255,255,0.55)" />
    <Selotip tunda={44} x={730} y={1366} w={120} rot={7} warna="rgba(255,255,255,0.55)" />
    <div style={{ position: "absolute", left: 512, top: 1500, width: 56, height: 56, borderRadius: 28, background: C.hitam, color: C.kertas, fontFamily: F.poster, fontSize: 28, display: "grid", placeItems: "center", zIndex: 20 }}>VS</div>
    <Cap x={900} y={1790} r={84} teks="• FAKTA SAINS •" tengah="✓" warna={C.hitam} rot={-8} tunda={64} />
    <div style={{ position: "absolute", left: 60, bottom: 50, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: USDA FoodData Central · ilustrasi editorial</div>
    <Grain o={0.12} />
  </AbsoluteFill>
);
