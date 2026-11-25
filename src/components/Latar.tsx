// Latar per suasana: 3 lapisan (gradien, pola tengah, butir depan) yang bergerak dengan kecepatan berbeda.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ADEGAN, adeganPada } from "../lib/waktu";

type Gaya = { atas: string; bawah: string; pola: string; butir: string; jenis: "hex" | "grid" | "gelembung" | "kilat" | "bintang" | "sel" };

export const SUASANA: Record<string, Gaya & { terang: boolean }> = {
  "studio-navy": { atas: "#0b1d3a", bawah: "#163d66", pola: "rgba(124,200,255,0.10)", butir: "rgba(255,90,110,0.35)", jenis: "hex", terang: false },
  "studio-teal": { atas: "#06343f", bawah: "#0f6c78", pola: "rgba(160,255,240,0.10)", butir: "rgba(255,120,130,0.30)", jenis: "grid", terang: false },
  "klinik-terang": { atas: "#f6fafd", bawah: "#d8e8f4", pola: "rgba(30,80,130,0.08)", butir: "rgba(214,40,57,0.18)", jenis: "sel", terang: true },
  "paru-biru": { atas: "#0c2463", bawah: "#2b5cc6", pola: "rgba(190,220,255,0.14)", butir: "rgba(200,230,255,0.45)", jenis: "gelembung", terang: false },
  "tubuh-merah": { atas: "#36091a", bawah: "#7c1832", pola: "rgba(255,170,170,0.10)", butir: "rgba(255,110,120,0.40)", jenis: "sel", terang: false },
  listrik: { atas: "#070b24", bawah: "#1f1b52", pola: "rgba(124,243,255,0.16)", butir: "rgba(124,243,255,0.45)", jenis: "kilat", terang: false },
  bumi: { atas: "#020617", bawah: "#0f1b3a", pola: "rgba(255,255,255,0.05)", butir: "rgba(255,255,255,0.8)", jenis: "bintang", terang: false },
};

// angka acak tetap (berbasis seed) agar render konsisten
const acak = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const Lapisan: React.FC<{ g: Gaya; frame: number }> = ({ g, frame }) => {
  const geserPola = (frame * 0.4) % 120;
  const polaSvg =
    g.jenis === "grid"
      ? `repeating-linear-gradient(0deg, ${g.pola} 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, ${g.pola} 0 2px, transparent 2px 120px)`
      : g.jenis === "hex" || g.jenis === "sel"
        ? `radial-gradient(circle at 60px 60px, ${g.pola} 0 22px, transparent 23px)`
        : g.jenis === "kilat"
          ? `repeating-linear-gradient(115deg, ${g.pola} 0 2px, transparent 2px 90px)`
          : "none";
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${g.atas} 0%, ${g.bawah} 100%)` }}>
      {/* Lapisan tengah: pola bergerak pelan */}
      <AbsoluteFill
        style={{
          backgroundImage: polaSvg,
          backgroundSize: g.jenis === "hex" || g.jenis === "sel" ? "120px 120px" : undefined,
          backgroundPosition: `0px ${-geserPola}px`,
          opacity: 0.9,
        }}
      />
      {/* Cahaya lembut di tengah */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 40% at 50% 58%, rgba(255,255,255,0.10), transparent 70%)",
        }}
      />
      {/* Lapisan depan: butir sel darah / gelembung / bintang melayang lebih cepat */}
      {Array.from({ length: g.jenis === "bintang" ? 70 : 18 }).map((_, i) => {
        const x = acak(i) * 1080;
        const kec = 0.6 + acak(i + 50) * 1.4;
        const y = (acak(i + 100) * 2100 - frame * kec * (g.jenis === "bintang" ? 0.1 : 1)) % 2100;
        const yy = y < 0 ? y + 2100 : y;
        const besar = g.jenis === "bintang" ? 2 + acak(i + 7) * 3 : 16 + acak(i + 9) * 34;
        const kedip = g.jenis === "bintang" ? 0.4 + 0.6 * Math.abs(Math.sin(frame / 20 + i)) : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 40 + i) * 14,
              top: yy - 90,
              width: besar,
              height: g.jenis === "sel" || g.jenis === "hex" ? besar * 0.7 : besar,
              borderRadius: "50%",
              background: g.jenis === "gelembung" ? "transparent" : g.butir,
              border: g.jenis === "gelembung" ? `3px solid ${g.butir}` : undefined,
              opacity: kedip,
              filter: g.jenis === "bintang" ? undefined : "blur(1px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Latar: React.FC = () => {
  const frame = useCurrentFrame();
  const { index, lokal } = adeganPada(frame);
  const kini = SUASANA[ADEGAN[index].suasana] ?? SUASANA["studio-navy"];
  const lalu = index > 0 ? SUASANA[ADEGAN[index - 1].suasana] ?? kini : kini;
  const t = interpolate(lokal, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  // Kamera virtual: zoom pelan pada latar
  const zoom = 1.03 + 0.03 * Math.sin(frame / 90);
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      {t < 1 && <Lapisan g={lalu} frame={frame} />}
      <AbsoluteFill style={{ opacity: t }}>
        <Lapisan g={kini} frame={frame} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
