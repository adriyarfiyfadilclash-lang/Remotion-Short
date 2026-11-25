// Komponen gaya ADRIY Documentary Motion, diadaptasi dari pustaka di .claude/skills/adriy-documentary-motion/library
// (KenBurns, ChapterHeading, DateStamp, LowerThird, Subtitle, QuoteCard, Grain, Vignette, LightLeak, Dust, GateWeave).
// Bahasa visual: foto arsip layar penuh (domain publik) dengan gerak kamera lambat, color grade film, teks editorial.
import React from "react";
import { Easing, Img, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { serif: "Playfair Display", poster: "Anton", sans: FONT, mono: "'DejaVu Sans Mono', monospace" };
export const D = { hitam: "#0B0A09", krem: "#EDE4D3", emas: "#C9A55C", merah: "#B23A2E", abu: "#9A9184" };

if (typeof document !== "undefined") {
  const t = delayRender("font dokumenter");
  Promise.all(
    [["Playfair Display", "playfair-900", "900", "normal"], ["Playfair Display", "playfair-700-italic", "700", "italic"], ["Anton", "anton-400", "400", "normal"]].map(([fam, file, w, st]) =>
      new FontFace(fam, `url(${staticFile(`font/${file}.woff2`)}) format("woff2")`, { weight: w, style: st }).load().then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  ).then(() => continueRender(t)).catch(() => continueRender(t));
}

const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
const masuk = (f: number, t: number, lama = 18) => interpolate(f, [t, t + lama], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

// Ken Burns: zoom & geser lambat + gate weave halus; grade = filter warna film
export const KenBurns: React.FC<{
  src: string; dari: { s: number; x: number; y: number }; ke: { s: number; x: number; y: number }; lama: number;
  grade?: string; style?: React.CSSProperties; posisi?: string;
}> = ({ src, dari, ke, lama, grade = "sepia(0.25) contrast(1.08) saturate(0.85)", style, posisi = "center" }) => {
  const f = useCurrentFrame();
  const t = ease(f, 0, lama);
  const s = dari.s + (ke.s - dari.s) * t, x = dari.x + (ke.x - dari.x) * t, y = dari.y + (ke.y - dari.y) * t;
  const wx = Math.sin(f / 7.3) * 0.8 + Math.sin(f / 2.9) * 0.3, wy = Math.cos(f / 6.1) * 0.6;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: posisi, transform: `translate(${x + wx}px, ${y + wy}px) scale(${s})`, filter: grade }} />
    </div>
  );
};

// Efek film: grain, vignette, debu & goresan, light leak, flicker
export const EfekFilm: React.FC<{ leak?: string; o?: number }> = ({ leak = "rgba(255,150,60,0.28)", o = 1 }) => {
  const f = useCurrentFrame();
  const kedip = 1 + Math.sin(f * 2.7) * 0.015 + Math.sin(f * 1.3) * 0.01;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: o }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 85% 70% at 50% 45%, transparent 45%, rgba(0,0,0,0.65))` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 40% at ${88 + Math.sin(f / 30) * 6}% ${12 + Math.cos(f / 40) * 4}%, ${leak}, transparent 70%)`, mixBlendMode: "screen" }} />
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: (kedip - 1) * 4 + 0.02 }} />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.55 }}>
        <filter id={`grainF${Math.floor(f / 2) % 4}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={Math.floor(f / 2) % 4} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width={W} height={H} filter={`url(#grainF${Math.floor(f / 2) % 4})`} />
      </svg>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 7 }, (_, i) => {
          const s = (f * 13 + i * 97) % 211;
          return s < 9 ? <circle key={i} cx={(i * 337 + f * 41) % W} cy={(i * 593 + f * 23) % H} r={1.5 + (i % 3)} fill="#EDE4D3" opacity={0.5} /> : null;
        })}
        {(f % 47) < 3 && <line x1={(f * 61) % W} y1={0} x2={(f * 61) % W + 4} y2={H} stroke="#EDE4D3" strokeWidth={1.2} opacity={0.25} />}
      </svg>
    </div>
  );
};

// Bingkai film tipis + timecode & tanda rekaman
export const Bingkai: React.FC<{ kode: string }> = ({ kode }) => {
  const f = useCurrentFrame();
  const tc = `00:00:${String(Math.floor(f / 30)).padStart(2, "0")}:${String(f % 30).padStart(2, "0")}`;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: D.hitam }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: D.hitam }} />
      <div style={{ position: "absolute", right: 44, top: 46, fontFamily: F.mono, fontSize: 19, color: D.krem, opacity: 0.75, letterSpacing: 1 }}>{tc}</div>
      <div style={{ position: "absolute", left: 44, top: 46, fontFamily: F.mono, fontSize: 19, color: D.krem, opacity: 0.75, letterSpacing: 2 }}>{kode}</div>
    </div>
  );
};

// Judul bab: nomor bab + garis + judul serif besar
export const JudulBab: React.FC<{ bab: string; judul: string; sub?: string; top: number; tunda?: number; align?: "left" | "center" }> = ({ bab, judul, sub, top, tunda = 6, align = "left" }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 24), g = masuk(f, tunda + 8, 26), q = masuk(f, tunda + 16, 22);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: align }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: align === "center" ? "center" : "flex-start", opacity: p }}>
        <span style={{ fontFamily: F.poster, fontSize: 26, letterSpacing: 8, color: D.emas }}>{bab}</span>
        <span style={{ height: 2, width: 160 * g, background: D.emas }} />
      </div>
      <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 92, lineHeight: 1.02, color: D.krem, marginTop: 14, opacity: p, transform: `translateY(${(1 - p) * 24}px)`, textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>{judul}</div>
      {sub && <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 38, color: D.krem, opacity: 0.85 * q, marginTop: 14, textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>{sub}</div>}
    </div>
  );
};

// Cap tanggal & lokasi ala mesin ketik, huruf muncul satu per satu
export const CapTanggal: React.FC<{ x: number; y: number; tanggal: string; lokasi: string; tunda: number }> = ({ x, y, tanggal, lokasi, tunda }) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.floor((f - tunda) * 1.4));
  const t1 = tanggal.slice(0, n), t2 = lokasi.slice(0, Math.max(0, n - tanggal.length));
  return (
    <div style={{ position: "absolute", left: x, top: y, fontFamily: F.mono, color: D.krem, textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>{t1}<span style={{ opacity: f % 20 < 10 && n < tanggal.length ? 1 : 0 }}>▌</span></div>
      <div style={{ display: "inline-block", fontSize: 24, letterSpacing: 4, color: "#E8C886", marginTop: 8, background: t2 ? "rgba(11,10,9,0.6)" : "transparent", padding: t2 ? "4px 10px" : 0 }}>{t2}</div>
    </div>
  );
};

// Lower third: garis aksen + nama + keterangan
export const LowerThird: React.FC<{ x: number; y: number; nama: string; ket: string; tunda: number }> = ({ x, y, nama, ket, tunda }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 20);
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 16, opacity: p, transform: `translateX(${(1 - p) * -40}px)` }}>
      <div style={{ width: 6, background: D.merah }} />
      <div>
        <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 32, color: D.krem, letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>{nama}</div>
        <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 23, color: D.krem, opacity: 0.8, marginTop: 2, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>{ket}</div>
      </div>
    </div>
  );
};

// Subtitle narasi di bawah, kotak gelap transparan
export const Subtitle: React.FC<{ teks: string; tunda: number; bottom?: number }> = ({ teks, tunda, bottom = 170 }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 10);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, bottom, textAlign: "center", opacity: p }}>
      <span style={{ display: "inline", background: "rgba(11,10,9,0.72)", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone", padding: "6px 14px", fontFamily: F.sans, fontWeight: 600, fontSize: 36, lineHeight: 1.6, color: "#F5EFE3" }}>{teks}</span>
    </div>
  );
};

// Angka besar (fakta)
export const AngkaBesar: React.FC<{ x: number; y: number; angka: string; satuan: string; ket: string; tunda: number }> = ({ x, y, angka, satuan, ket, tunda }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 22);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, textShadow: "0 4px 24px rgba(0,0,0,0.85)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: F.poster, fontSize: 150, lineHeight: 1, color: D.krem }}>{angka}</span>
        <span style={{ fontFamily: F.poster, fontSize: 54, color: D.emas }}>{satuan}</span>
      </div>
      <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 32, color: D.krem, opacity: 0.9, maxWidth: 560 }}>{ket}</div>
    </div>
  );
};

// Kartu kutipan
export const Kutipan: React.FC<{ teks: string; oleh: string; top: number; tunda: number }> = ({ teks, oleh, top, tunda }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 24);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top, opacity: p, textShadow: "0 3px 20px rgba(0,0,0,0.9)" }}>
      <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 140, color: D.emas, lineHeight: 0.6, height: 60 }}>“</div>
      <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 50, lineHeight: 1.25, color: D.krem }}>{teks}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
        <span style={{ height: 2, width: 60, background: D.emas }} />
        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 26, color: D.emas, letterSpacing: 2 }}>{oleh}</span>
      </div>
    </div>
  );
};

export const Kredit: React.FC<{ teks: string }> = ({ teks }) => (
  <div style={{ position: "absolute", left: 44, right: 44, bottom: 46, fontFamily: F.sans, fontSize: 18, color: D.krem, opacity: 0.6, textAlign: "right" }}>{teks}</div>
);
