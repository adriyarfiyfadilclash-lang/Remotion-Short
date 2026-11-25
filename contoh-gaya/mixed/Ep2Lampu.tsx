// EP 02 — PENEMUAN: Lampu Pijar. Arsip asli: gambar paten Edison No. 223.898, 1880
// (U.S. National Archives, domain publik). Warna dominan: kertas, hitam, kuning, toska.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Arsip, C, Cap, F, FilterKolase, GarisGambar, Grain, HurufPop, LatarKertas, Selotip, Sobekan, usePhotoDrop } from "./pustaka";

// gambar paten 960×1391 ditampilkan lebar 660 → skala 0,6875, kiri-atas gambar (70, 440)
const S = 660 / 960;
const P = (ox: number, oy: number) => ({ x: 70 + ox * S, y: 440 + oy * S });

const LABEL = [
  { n: 1, t: "Bola kaca hampa udara", titik: P(560, 445), y: 700 },
  { n: 2, t: "Filamen karbon", titik: P(515, 520), y: 830 },
  { n: 3, t: "Kawat platina", titik: P(520, 640), y: 960 },
  { n: 4, t: "Detail penjepit", titik: P(535, 880), y: 1090 },
  { n: 5, t: "Tanda tangan Edison", titik: P(665, 1065), y: 1230 },
];

const Catatan: React.FC = () => {
  const g = usePhotoDrop(24, 5, 5);
  return (
    <div style={{ position: "absolute", left: 760, top: 440, width: 270, transform: g.transform, opacity: g.opacity, zIndex: 18 }}>
      <div style={{ background: C.kuning, padding: "22px 22px 26px", boxShadow: `0 ${18 * g.bayang}px ${24 * g.bayang}px rgba(37,37,37,0.3)`, clipPath: "polygon(0 0,100% 0,100% 88%,88% 100%,0 100%)" }}>
        <div style={{ fontFamily: F.poster, fontSize: 56, color: C.hitam, lineHeight: 1 }}>1879</div>
        <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 32, color: C.hitam, lineHeight: 1.05, marginTop: 6 }}>Lampu uji Edison menyala lebih dari 13 jam</div>
      </div>
    </div>
  );
};

export const Ep2Lampu: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna={C.kertas} />

    <Sobekan x={60} y={60} w={600} h={70} warna={C.toska} rot={-1.5} halus>
      <div style={{ padding: "9px 24px", fontFamily: F.poster, fontSize: 34, color: C.hitam, letterSpacing: 4 }}>DOKUMENTER · PENEMUAN #02</div>
    </Sobekan>
    <div style={{ position: "absolute", left: 64, top: 160, fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 56, color: C.hitam }}>Dokumen paten</div>
    <HurufPop teks="LAMPU PIJAR" tunda={4} style={{ position: "absolute", left: 60, top: 228, fontFamily: F.poster, fontSize: 150, color: C.hitam, lineHeight: 1, letterSpacing: 2 }} />

    <Arsip src="arsip/edison-paten-1880.jpg" x={70} y={440} w={660} rasio={960 / 1391} tunda={12} rot={0} bingkai={16} warnaBingkai="#E9E0D0" keterangan="Paten AS No. 223.898" kredit="U.S. National Archives · domain publik" filter="contrast(1.06)" />
    <Selotip x={90} y={418} w={130} rot={-8} tunda={20} warna="rgba(255,255,255,0.6)" />
    <Catatan />

    {/* lingkaran pada nomor paten */}
    <GarisGambar d={`M ${P(330, 175).x} ${P(330, 175).y} C ${P(330, 140).x} ${P(330, 140).y}, ${P(720, 135).x} ${P(720, 135).y}, ${P(730, 175).x} ${P(730, 175).y} C ${P(740, 215).x} ${P(740, 215).y}, ${P(320, 220).x} ${P(320, 220).y}, ${P(340, 170).x} ${P(340, 170).y}`} tunda={36} warna={C.merah} tebal={4} />

    {LABEL.map((l, i) => (
      <React.Fragment key={l.n}>
        <GarisGambar d={`M ${l.titik.x} ${l.titik.y} C ${l.titik.x + 90} ${l.titik.y}, 730 ${l.y + 20}, 770 ${l.y + 20}`} tunda={44 + i * 4} lama={14} warna={C.hitam} tebal={3} />
        <div style={{ position: "absolute", left: l.titik.x - 8, top: l.titik.y - 8, width: 16, height: 16, borderRadius: 8, background: C.toska, border: `3px solid ${C.hitam}`, zIndex: 32 }} />
        <div style={{ position: "absolute", left: 780, top: l.y, display: "flex", gap: 10, alignItems: "flex-start", zIndex: 31, width: 270 }}>
          <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 18, background: C.toska, color: C.hitam, fontFamily: F.poster, fontSize: 22, display: "grid", placeItems: "center", border: `3px solid ${C.hitam}` }}>{l.n}</div>
          <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 28, color: C.hitam, lineHeight: 1.1 }}>{l.t}</div>
        </div>
      </React.Fragment>
    ))}

    <Sobekan x={40} y={1530} w={720} h={240} warna={C.toska} rot={-2} tunda={34} dari="bawah">
      <div style={{ padding: "24px 34px" }}>
        <div style={{ fontFamily: F.poster, fontSize: 64, color: C.hitam, lineHeight: 1 }}>KARBON → TUNGSTEN</div>
        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 28, color: C.hitam, lineHeight: 1.25, marginTop: 10 }}>Lampu Edison 1880 memakai filamen karbon. Filamen tungsten baru umum sekitar 1910-an.</div>
      </div>
    </Sobekan>
    <Cap x={900} y={1650} r={105} teks="• DIPATENKAN •" tengah="1880" warna={C.hitam} rot={8} tunda={62} />
    <div style={{ position: "absolute", left: 60, bottom: 40, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: U.S. Patent 223,898; Britannica · arsip: Wikimedia Commons</div>
    <Grain o={0.12} />
  </AbsoluteFill>
);
