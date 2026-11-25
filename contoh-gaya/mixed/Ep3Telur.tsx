// EP 03 — SAINS: Isi Sebutir Telur. Arsip asli: poster sekolah abad ke-19 karya Pietro De Vescovi
// (Museo di Anatomia comparata G. B. Grassi, domain publik) + pin bernomor gaya museum + legenda.
// Warna dominan: krem, kuning, toska, hitam.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Arsip, C, Cap, F, FilterKolase, Grain, HurufPop, LatarKertas, PinMuseum, Selotip, Sobekan, Tulisan } from "./pustaka";

// poster 1280×865 ditampilkan lebar 960 → skala 0,75, kiri-atas gambar (60, 470)
const S = 960 / 1280;
const P = (ox: number, oy: number) => ({ x: 60 + ox * S, y: 470 + oy * S });

const BAGIAN = [
  { n: 1, t: "Cangkang & membran", s: "lapisan luar berpori", titik: P(1075, 430) },
  { n: 2, t: "Kantung udara", s: "di ujung tumpul", titik: P(262, 360) },
  { n: 3, t: "Putih telur", s: "albumen", titik: P(860, 250) },
  { n: 4, t: "Kalaza", s: "tali penahan kuning", titik: P(975, 470) },
  { n: 5, t: "Kuning telur", s: "berlapis-lapis", titik: P(500, 470) },
  { n: 6, t: "Bakal embrio", s: "cakram di atas kuning", titik: P(640, 262) },
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
    <Tulisan x={620} y={290} teks={"dari poster kelas\nbiologi abad ke-19"} ukuran={46} warna={C.coklat} rot={-5} lebar={420} tunda={18} />

    <Arsip src="arsip/telur-poster-sekolah.jpg" x={60} y={470} w={960} rasio={1280 / 865} tunda={12} rot={0} bingkai={18} warnaBingkai="#F3ECE0" keterangan="Potongan telur ayam" kredit="Pietro De Vescovi, abad ke-19 · domain publik" filter="contrast(1.04) saturate(0.95)" />
    <Selotip x={70} y={446} w={140} rot={-8} tunda={20} warna="rgba(255,255,255,0.55)" />
    <Selotip x={870} y={446} w={140} rot={8} tunda={22} warna="rgba(255,255,255,0.55)" />
    {BAGIAN.map((b, i) => <PinMuseum key={b.n} x={b.titik.x} y={b.titik.y} n={b.n} tunda={36 + i * 4} warna={i % 2 ? C.toska : C.kuning} />)}

    {/* legenda museum */}
    <Sobekan x={50} y={1210} w={980} h={250} warna="#F7F3EA" rot={-0.8} tunda={30} dari="bawah" halus>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px 18px", padding: "26px 30px" }}>
        {BAGIAN.map((b, i) => (
          <div key={b.n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 17, background: i % 2 ? C.toska : C.kuning, border: `3px solid ${C.hitam}`, fontFamily: F.poster, fontSize: 20, display: "grid", placeItems: "center", color: C.hitam }}>{b.n}</div>
            <div>
              <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 25, color: C.hitam, lineHeight: 1.05 }}>{b.t}</div>
              <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 25, color: C.coklat, lineHeight: 1.05 }}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>
    </Sobekan>

    {/* perbandingan dua kertas */}
    {[
      { x: 50, rot: -2, warna: "#F7F3EA", judul: "PUTIH TELUR", isi: ["± 90% air", "lebih dari separuh protein telur"], aksen: C.toska, dari: "kiri" as const },
      { x: 550, rot: 2, warna: "#FBEFC2", judul: "KUNING TELUR", isi: ["hampir semua lemaknya", "vitamin A, D, E di sini"], aksen: C.kuning, dari: "kanan" as const },
    ].map((k, i) => (
      <Sobekan key={k.judul} x={k.x} y={1500} w={480} h={270} warna={k.warna} rot={k.rot} tunda={40 + i * 6} dari={k.dari}>
        <div style={{ padding: "22px 30px" }}>
          <div style={{ display: "inline-block", background: k.aksen, padding: "4px 14px", fontFamily: F.poster, fontSize: 36, color: C.hitam, letterSpacing: 2 }}>{k.judul}</div>
          {k.isi.map((t) => (
            <div key={t} style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 31, color: C.hitam, marginTop: 14, lineHeight: 1.1 }}>— {t}</div>
          ))}
        </div>
      </Sobekan>
    ))}
    <div style={{ position: "absolute", left: 512, top: 1610, width: 56, height: 56, borderRadius: 28, background: C.hitam, color: C.kertas, fontFamily: F.poster, fontSize: 28, display: "grid", placeItems: "center", zIndex: 20 }}>VS</div>
    <Cap x={985} y={1835} r={62} teks="• FAKTA SAINS •" tengah="✓" warna={C.hitam} rot={-8} tunda={64} />
    <div style={{ position: "absolute", left: 60, bottom: 50, fontFamily: F.sans, fontSize: 20, color: C.abu }}>Sumber: USDA FoodData Central · arsip: Wikimedia Commons</div>
    <Grain o={0.12} />
  </AbsoluteFill>
);
