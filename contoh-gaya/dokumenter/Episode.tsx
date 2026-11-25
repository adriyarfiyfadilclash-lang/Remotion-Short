// Contoh gaya ADRIY Documentary Motion (9:16): tiga komposisi sinematik dengan arsip domain publik.
import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { AngkaBesar, Bingkai, CapTanggal, D, EfekFilm, F, JudulBab, KenBurns, Kredit, Kutipan, LowerThird, Subtitle } from "./pustaka";

// EP 01 — Krakatau 1883: litograf layar penuh, push-in pelan ke kolom letusan
export const Ep1Krakatau: React.FC = () => (
  <AbsoluteFill style={{ background: D.hitam }}>
    <KenBurns src="arsip/krakatau-1883-litograf.jpg" dari={{ s: 1.0, x: 0, y: 0 }} ke={{ s: 1.07, x: 20, y: 30 }} lama={110} grade="sepia(0.2) contrast(1.12) saturate(0.95) brightness(0.92)" posisi="40% 50%" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.85) 0%, rgba(11,10,9,0.1) 34%, rgba(11,10,9,0) 55%, rgba(11,10,9,0.85) 100%)" }} />
    <EfekFilm leak="rgba(255,120,40,0.3)" />
    <Bingkai kode="ARSIP · BAB 01" />
    <JudulBab bab="BAB 01 · SELAT SUNDA" judul="Ledakan yang Terdengar Ribuan Kilometer" top={110} />
    <CapTanggal x={60} y={560} tanggal="27 · 08 · 1883" lokasi="KRAKATAU, HINDIA BELANDA" tunda={30} />
    <AngkaBesar x={60} y={1150} angka="±4.800" satuan="KM" ket="jarak terjauh bunyi ledakan tercatat — hingga Pulau Rodrigues di Samudra Hindia" tunda={44} />
    <Subtitle teks="Gelombang tekanannya terekam barometer di seluruh dunia." tunda={56} bottom={150} />
    <Kredit teks="Litograf Parker & Coward, 1888 · domain publik · sumber: Royal Society, Smithsonian GVP" />
  </AbsoluteFill>
);

// EP 02 — Borobudur 1874: foto utama di separuh atas (pan), foto stupa sebagai reveal, lower third fotografer
const FotoReveal: React.FC<{ src: string; tunda: number }> = ({ src, tunda }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [tunda, tunda + 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 60, top: 1040, width: 960, height: 520, overflow: "hidden", clipPath: `inset(0 ${100 - p * 100}% 0 0)`, boxShadow: "0 20px 60px rgba(0,0,0,0.8)", border: "2px solid rgba(201,165,92,0.5)" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.35) contrast(1.05)", transform: `scale(${1.12 - p * 0.06})` }} />
    </div>
  );
};

export const Ep2Borobudur: React.FC = () => (
  <AbsoluteFill style={{ background: D.hitam }}>
    <KenBurns src="arsip/borobudur-kinsbergen-1874.jpg" dari={{ s: 1.25, x: 120, y: 0 }} ke={{ s: 1.25, x: -120, y: 0 }} lama={110} grade="sepia(0.55) contrast(1.1) brightness(0.95)" style={{ bottom: 900 }} posisi="50% 50%" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1020, background: "linear-gradient(180deg, rgba(11,10,9,0.9) 0%, rgba(11,10,9,0.05) 40%, rgba(11,10,9,0.1) 70%, rgba(11,10,9,1) 100%)" }} />
    <FotoReveal src="arsip/borobudur-stupa-1874.jpg" tunda={30} />
    <EfekFilm leak="rgba(255,190,110,0.22)" />
    <Bingkai kode="ARSIP · BAB 02" />
    <JudulBab bab="BAB 02 · MAGELANG" judul="Borobudur Sebelum Dipugar" sub="dipotret Isidore van Kinsbergen, 1874" top={110} />
    <LowerThird x={60} y={880} nama="Isidore van Kinsbergen" ket="Fotografer · memotret candi-candi Jawa abad ke-19" tunda={22} />
    <CapTanggal x={60} y={1600} tanggal="1907 – 1911" lokasi="PEMUGARAN PERTAMA · THEODOR VAN ERP" tunda={48} />
    <Subtitle teks="Dibangun sekitar abad ke-9, kini Warisan Dunia UNESCO sejak 1991." tunda={62} bottom={120} />
    <Kredit teks="Foto: Isidore van Kinsbergen, 1874 (KITLV) · domain publik" />
  </AbsoluteFill>
);

// EP 03 — Apollo 11: foto NASA layar penuh, pull-out, kutipan di atas
export const Ep3Apollo: React.FC = () => (
  <AbsoluteFill style={{ background: D.hitam }}>
    <KenBurns src="arsip/apollo11-aldrin-1969.jpg" dari={{ s: 1.12, x: 0, y: 40 }} ke={{ s: 1.02, x: 0, y: 20 }} lama={110} grade="contrast(1.1) saturate(0.8) brightness(0.95)" posisi="50% 0%" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.7) 0%, rgba(11,10,9,0) 14%, rgba(11,10,9,0) 50%, rgba(11,10,9,0.75) 68%, rgba(11,10,9,0.95) 100%)" }} />
    <EfekFilm leak="rgba(140,180,255,0.16)" />
    <Bingkai kode="ARSIP · BAB 03" />
    <CapTanggal x={60} y={100} tanggal="21 · 07 · 1969" lokasi="LAUT KETENANGAN, BULAN · 02.56 UTC" tunda={4} />
    <Kutipan teks="Satu langkah kecil bagi manusia, satu lompatan raksasa bagi umat manusia." oleh="NEIL ARMSTRONG" top={1180} tunda={24} />
    <CapTanggal x={-9999} y={1380} tanggal="21 · 07 · 1969" lokasi="LAUT KETENANGAN, BULAN · 02.56 UTC" tunda={34} />
    <LowerThird x={60} y={1560} nama="Buzz Aldrin" ket="Pilot modul bulan · difoto oleh Neil Armstrong" tunda={50} />
    <Subtitle teks="Kamera ada di tangan Armstrong, jadi sebagian besar foto memperlihatkan Aldrin." tunda={64} bottom={120} />
    <Kredit teks="Foto: NASA, 1969 · domain publik" />
  </AbsoluteFill>
);

export const ContohDokumenter: React.FC = () => (
  <AbsoluteFill style={{ background: D.hitam }}>
    <Sequence durationInFrames={110}><Ep1Krakatau /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Borobudur /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Apollo /></Sequence>
  </AbsoluteFill>
);
