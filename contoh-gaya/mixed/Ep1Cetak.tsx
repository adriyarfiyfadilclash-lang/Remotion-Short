// EP 01 — SEJARAH: Mesin Cetak. Arsip asli: gravir kayu Jost Amman (1568, domain publik)
// + foto huruf logam (Willi Heidelbach, CC BY 2.5). Warna dominan: krem, cokelat, merah, hitam.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Arsip, C, Cap, F, FilterKolase, GarisGambar, Grain, HurufPop, LatarKertas, Selotip, Sobekan, Tulisan } from "./pustaka";

// gravir 754×972 ditampilkan lebar 600 → skala 0,7958, sudut kiri-atas gambar (90, 460)
const S = 600 / 754;
const P = (ox: number, oy: number) => ({ x: 90 + ox * S, y: 460 + oy * S });

const LABEL = [
  { n: 1, t: "Rangka & ulir penekan", s: "ditekan untuk mencetak", titik: P(560, 250), y: 900 },
  { n: 2, t: "Pencetak menarik tuas", s: "satu halaman per tarikan", titik: P(300, 470), y: 1030 },
  { n: 3, t: "Lembar tercetak", s: "ditumpuk untuk dijilid", titik: P(170, 820), y: 1160 },
];

export const Ep1Cetak: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna={C.krem} />

    <Sobekan x={60} y={60} w={500} h={70} warna={C.coklat} rot={-1.5} halus>
      <div style={{ padding: "9px 24px", fontFamily: F.poster, fontSize: 34, color: C.kertas, letterSpacing: 4 }}>DOKUMENTER · SEJARAH #01</div>
    </Sobekan>
    <HurufPop teks="Mesin Cetak" tunda={4} style={{ position: "absolute", left: 60, top: 160, fontFamily: F.serif, fontWeight: 900, fontSize: 132, color: C.hitam, lineHeight: 1 }} />
    <div style={{ position: "absolute", left: 66, top: 310 }}>
      <HurufPop teks="yang mengubah cara dunia membaca" tunda={14} jeda={0.7} style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 52, color: C.merah }} />
    </div>

    {/* arsip utama: gravir 1568 */}
    <Arsip src="arsip/amman-percetakan-1568.png" x={90} y={460} w={600} rasio={754 / 972} tunda={16} keterangan="Bengkel cetak, 1568" kredit="Gravir Jost Amman · domain publik" filter="sepia(0.35) contrast(1.08)" />
    <Selotip x={110} y={430} w={140} rot={-12} tunda={24} warna="rgba(242,201,76,0.55)" />
    <Selotip x={560} y={428} w={140} rot={10} tunda={26} warna="rgba(242,201,76,0.55)" />

    {/* foto pendukung: huruf logam */}
    <Arsip src="arsip/huruf-logam.jpg" x={740} y={470} w={270} rasio={1} tunda={24} rot={5} bingkai={16} warnaBingkai="#FBF8F1" filter="sepia(0.3) contrast(1.05) saturate(0.7)" />
    <Tulisan x={738} y={780} teks="huruf logam, disusun terbalik" ukuran={34} rot={3} lebar={290} tunda={34} />
    <div style={{ position: "absolute", left: 740, top: 856, fontFamily: F.sans, fontSize: 16, color: C.abu, zIndex: 31 }}>Foto: Willi Heidelbach, CC BY 2.5</div>

    {/* anotasi */}
    {LABEL.map((l, i) => (
      <React.Fragment key={l.n}>
        <GarisGambar d={`M ${l.titik.x} ${l.titik.y} C ${l.titik.x + 120} ${l.titik.y}, 690 ${l.y + 22}, 742 ${l.y + 22}`} tunda={42 + i * 5} lama={16} warna={C.merah} tebal={4} />
        <div style={{ position: "absolute", left: l.titik.x - 9, top: l.titik.y - 9, width: 18, height: 18, borderRadius: 9, background: C.merah, border: "3px solid #F3ECE0", zIndex: 32, opacity: 1 }} />
        <div style={{ position: "absolute", left: 750, top: l.y - 14, width: 290, zIndex: 31 }}>
          <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 29, color: C.hitam, lineHeight: 1.05 }}>{l.t}</div>
          <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 29, color: C.merah, lineHeight: 1.05, marginTop: 4 }}>{l.s}</div>
        </div>
      </React.Fragment>
    ))}

    {/* guntingan koran */}
    <Sobekan x={60} y={1400} w={620} h={360} warna={C.kertas} rot={-1.5} tunda={28} dari="kiri">
      <div style={{ padding: "28px 36px", fontFamily: F.serif }}>
        <div style={{ fontFamily: F.poster, fontSize: 22, letterSpacing: 4, color: C.merah }}>MAINZ, ± 1450</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: C.hitam, lineHeight: 1.05, marginTop: 8 }}>Buku tak lagi harus disalin tangan</div>
        <div style={{ height: 3, background: C.hitam, margin: "14px 0" }} />
        <div style={{ fontSize: 23, lineHeight: 1.4, color: "#3A332D" }}>Johannes Gutenberg memadukan huruf logam yang dapat disusun ulang dengan mesin tekan. Buku bisa dicetak jauh lebih cepat.</div>
      </div>
    </Sobekan>
    <Cap x={860} y={1560} r={118} teks="• ALKITAB GUTENBERG •" tengah="1455" tunda={60} rot={-10} />
    <Tulisan x={780} y={1700} teks="buku cetak besar pertama di Eropa" ukuran={32} warna={C.coklat} rot={-3} lebar={260} tunda={66} />
    <div style={{ position: "absolute", left: 60, bottom: 50, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: Encyclopaedia Britannica · arsip: Wikimedia Commons</div>
    <Grain />
  </AbsoluteFill>
);
