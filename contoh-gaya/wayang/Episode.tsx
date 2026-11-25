// Contoh gaya ADRIY Indonesian Wayang (9:16): pertunjukan wayang kulit dengan figur asli (foto domain publik).
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { F, Judul, KELIR, Kepala, Ornamen, Panggung, Plakat, Sumber, W, WK, Wayang, usePop } from "./pustaka";

const R = { semar: 900 / 1093, gareng: 900 / 1185, petruk: 900 / 1114, bagong: 900 / 1170, gunungan: 757 / 1200, dasamuka: 900 / 1147, arjuna: 900 / 1064 };

const KartuFakta: React.FC<{ y: number; judul: string; isi: string; tunda: number }> = ({ y, judul, isi, tunda }) => {
  const p = usePop(tunda);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: y, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 30}px)`, textAlign: "center" }}>
      <div style={{ fontFamily: F.poster, fontSize: 24, letterSpacing: 6, color: WK.emas }}>{judul}</div>
      <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 32, color: WK.kelir, lineHeight: 1.3, marginTop: 8 }}>{isi}</div>
    </div>
  );
};

// ---------- EP 01: Punakawan ----------
const PUNA = [
  { k: "semar", nama: "Semar", isi: "pengasuh bijak, jelmaan dewa Sanghyang Ismaya", x: 205 },
  { k: "gareng", nama: "Gareng", isi: "kaki pincang, tangan ceko, setia", x: 425 },
  { k: "petruk", nama: "Petruk", isi: "hidung & tubuh serba panjang, jenaka", x: 655 },
  { k: "bagong", nama: "Bagong", isi: "bungsu, polos & ceplas-ceplos", x: 875 },
] as const;

export const Ep1Punakawan: React.FC = () => (
  <AbsoluteFill style={{ background: WK.malam }}>
    <Panggung>
      {PUNA.map((p, i) => (
        <Wayang key={p.k} src={`arsip/wayang/${p.k}.png`} x={p.x} tinggi={590} rasio={R[p.k]} tunda={10 + i * 6} z={5 + i} />
      ))}
    </Panggung>
    <Kepala teks="PANGGUNG WAYANG · EP 01" />
    <Judul kecil="Kenalan dengan" besar="PUNAKAWAN" />
    {PUNA.map((p, i) => (
      <Plakat key={p.k} x={20 + i * 262} y={1560} lebar={252} nama={p.nama} isi={p.isi} tunda={40 + i * 4} />
    ))}
    <Ornamen y={1730} />
    <KartuFakta y={1770} judul="KHAS NUSANTARA" isi="Punakawan tidak ada dalam Mahabharata versi India." tunda={58} />
    <Sumber teks="Wayang: Album Wayang Kulit Banjar (2002), domain publik · wayang diakui UNESCO (2003)" />
  </AbsoluteFill>
);

// ---------- EP 02: Gunungan ----------
const G = { tinggi: 960 };
const gl = G.tinggi * R.gunungan;
const gx = (u: number) => KELIR.lampuX - gl / 2 + u * gl;
const gy = (v: number) => KELIR.bawah + 10 - G.tinggi + v * G.tinggi;

const LabelEmas: React.FC<{ dari: { x: number; y: number }; ke: { x: number; y: number }; tunda: number }> = ({ dari, ke, tunda }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (f - tunda) / 14));
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0, zIndex: 19, pointerEvents: "none" }}>
      <path d={`M ${dari.x} ${dari.y} L ${ke.x} ${ke.y}`} stroke={WK.emasTerang} strokeWidth={3} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      <circle cx={dari.x} cy={dari.y} r={9 * p} fill={WK.emasTerang} stroke={WK.malam} strokeWidth={3} />
    </svg>
  );
};

export const Ep2Gunungan: React.FC = () => (
  <AbsoluteFill style={{ background: WK.malam }}>
    <Panggung>
      <Wayang src="arsip/wayang/gunungan.png" x={KELIR.lampuX} tinggi={G.tinggi} rasio={R.gunungan} tunda={10} goyang={0.6} />
    </Panggung>
    <Kepala teks="PANGGUNG WAYANG · EP 02" />
    <Judul kecil="Makna di balik" besar="GUNUNGAN" />
    <LabelEmas dari={{ x: gx(0.5), y: gy(0.05) }} ke={{ x: 280, y: 560 }} tunda={36} />
    <Plakat x={40} y={510} lebar={240} nama="Puncak" isi="meruncing seperti gunung" tunda={36} align="left" />
    <LabelEmas dari={{ x: gx(0.5), y: gy(0.2) }} ke={{ x: 800, y: 700 }} tunda={40} />
    <Plakat x={800} y={650} lebar={240} nama="Pohon hayat" isi="lambang kehidupan" tunda={40} align="left" />
    <LabelEmas dari={{ x: gx(0.47), y: gy(0.37) }} ke={{ x: 280, y: 920 }} tunda={44} />
    <Plakat x={40} y={870} lebar={240} nama="Wajah Kala" isi="raksasa penjaga" tunda={44} align="left" />
    <LabelEmas dari={{ x: gx(0.2), y: gy(0.68) }} ke={{ x: 280, y: 1200 }} tunda={48} />
    <Plakat x={40} y={1150} lebar={240} nama="Hewan penjaga" isi="di kiri & kanan" tunda={48} align="left" />
    <LabelEmas dari={{ x: gx(0.5), y: gy(0.8) }} ke={{ x: 800, y: 1220 }} tunda={52} />
    <Plakat x={800} y={1170} lebar={240} nama="Gapura" isi="pintu menuju dunia" tunda={52} align="left" />
    <KartuFakta y={1560} judul="KAYON · POHON KEHIDUPAN" isi="Ditancapkan di tengah kelir saat pembukaan dan penutup, lalu dikibaskan sebagai tanda pergantian adegan." tunda={58} />
    <Ornamen y={1800} />
    <Sumber teks="Gunungan: Album Wayang Kulit Banjar (2002), domain publik" />
  </AbsoluteFill>
);

// ---------- EP 03: Arjunawijaya vs Dasamuka ----------
export const Ep3Duel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: WK.malam }}>
      <Panggung>
        <Wayang src="arsip/wayang/dasamuka.png" x={335} tinggi={740} rasio={R.dasamuka} tunda={10} />
        <Wayang src="arsip/wayang/arjunawijaya.png" x={770} tinggi={740} rasio={R.arjuna} tunda={18} />
      </Panggung>
      <Kepala teks="PANGGUNG WAYANG · EP 03" />
      <Judul kecil="Kisah dari Majapahit" besar="ARJUNAWIJAYA" ukuran={104} />
      <Plakat x={40} y={1560} lebar={470} nama="Dasamuka (Rahwana)" isi="raja raksasa Alengka, “bermuka sepuluh”" tunda={42} align="left" />
      <Plakat x={570} y={1560} lebar={470} nama="Arjunawijaya" isi="raja Maespati yang mengalahkan Dasamuka" tunda={46} align="left" />
      <Ornamen y={1700} />
      <KartuFakta y={1735} judul="KAKAWIN ARJUNAWIJAYA" isi="Ditulis Mpu Tantular pada abad ke-14, masa Majapahit." tunda={56} />
      <Sumber teks="Wayang: Album Wayang Kulit Banjar (2002), domain publik" />
    </AbsoluteFill>
  );
};

export const ContohWayang: React.FC = () => (
  <AbsoluteFill style={{ background: WK.malam }}>
    <Sequence durationInFrames={110}><Ep1Punakawan /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Gunungan /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Duel /></Sequence>
  </AbsoluteFill>
);
