// MedicalExplainerScene (lapisan judul & subjudul) + MedicalCalloutLabel + AnatomyLeaderLine
import React from "react";
import { continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// Font Poppins disimpan lokal di public/font, jadi render tidak bergantung pada internet
export const FONT = "Poppins";
if (typeof document !== "undefined") {
  const tunggu = delayRender("Memuat font Poppins");
  Promise.all(
    ["500", "700", "800"].map((w) =>
      new FontFace(FONT, `url(${staticFile(`font/poppins-${w}.woff2`)}) format("woff2")`, { weight: w })
        .load()
        .then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  )
    .then(() => continueRender(tunggu))
    .catch((e) => {
      console.error(e);
      continueRender(tunggu);
    });
}

export const warnaTeks = (terang: boolean) => (terang ? "#0f172a" : "#ffffff");
export const warnaAksen = (terang: boolean) => (terang ? "#d62839" : "#ffd166");

// Panjang adegan yang sedang tampil (frame), diisi oleh Video.tsx
export const DurasiAdegan = React.createContext(300);

// Masuk & keluar halus untuk semua elemen dalam adegan
export const useMasukKeluar = (tunda = 0, keluar = 10) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = React.useContext(DurasiAdegan);
  const masuk = spring({ frame: f - tunda, fps, config: { damping: 14, mass: 0.8 } });
  const hilang = interpolate(f, [durationInFrames - keluar, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { masuk, hilang, f };
};

// Teks dengan *kata kunci* yang disorot dan digaris bawahi
export const TeksSorot: React.FC<{ teks: string; terang: boolean; tunda?: number }> = ({ teks, terang, tunda = 0 }) => {
  const f = useCurrentFrame();
  const bagian = teks.split("*");
  return (
    <>
      {bagian.map((b, i) => {
        if (i % 2 === 0) return <span key={i}>{b}</span>;
        const garis = interpolate(f, [tunda + 14, tunda + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span key={i} style={{ color: warnaAksen(terang), position: "relative", display: "inline-block" }}>
            {b}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -4,
                height: 8,
                borderRadius: 4,
                background: warnaAksen(terang),
                opacity: 0.55,
                transform: `scaleX(${garis})`,
                transformOrigin: "left",
              }}
            />
          </span>
        );
      })}
    </>
  );
};

export const MedicalExplainerScene: React.FC<{ judul: string; sub: string; terang: boolean }> = ({ judul, sub, terang }) => {
  const a = useMasukKeluar(0);
  const b = useMasukKeluar(10);
  return (
    <div style={{ position: "absolute", top: 170, left: 60, right: 60, fontFamily: FONT, textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          padding: "26px 34px",
          borderRadius: 34,
          background: terang ? "rgba(255,255,255,0.78)" : "rgba(5,15,35,0.45)",
          border: terang ? "2px solid rgba(15,23,42,0.08)" : "2px solid rgba(255,255,255,0.12)",
          opacity: a.masuk * a.hilang,
          transform: `translateY(${(1 - a.masuk) * 60}px) scale(${0.92 + 0.08 * a.masuk})`,
        }}
      >
        <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.14, color: warnaTeks(terang), letterSpacing: -1 }}>
          <TeksSorot teks={judul} terang={terang} />
        </div>
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 22,
            fontSize: 42,
            fontWeight: 500,
            lineHeight: 1.3,
            color: warnaTeks(terang),
            opacity: b.masuk * b.hilang * 0.92,
            transform: `translateY(${(1 - b.masuk) * 40}px)`,
            textShadow: terang ? "none" : "0 3px 14px rgba(0,0,0,0.55)",
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

// MedicalCalloutLabel + AnatomyLeaderLine: label yang ditarik garis ke titik di layar
export const MedicalCalloutLabel: React.FC<{
  teks: string;
  dari: { x: number; y: number };
  ke: { x: number; y: number };
  terang: boolean;
  tunda: number;
  warna?: string;
}> = ({ teks, dari, ke, terang, tunda, warna }) => {
  const { masuk, hilang, f } = useMasukKeluar(tunda);
  const tarik = interpolate(f, [tunda, tunda + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ex = dari.x + (ke.x - dari.x) * tarik;
  const ey = dari.y + (ke.y - dari.y) * tarik;
  const w = warna ?? warnaAksen(terang);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        <line x1={dari.x} y1={dari.y} x2={ex} y2={ey} stroke={w} strokeWidth={4} strokeLinecap="round" />
        <circle cx={ke.x} cy={ke.y} r={10 * tarik} fill={w} />
        <circle cx={ke.x} cy={ke.y} r={10 + 14 * ((f % 30) / 30)} fill="none" stroke={w} strokeWidth={3} opacity={tarik * (1 - (f % 30) / 30)} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: dari.x,
          top: dari.y,
          transform: `translate(-50%, -50%) scale(${masuk})`,
          transformOrigin: "center center",
          opacity: hilang,
          padding: "12px 22px",
          borderRadius: 22,
          background: terang ? "rgba(255,255,255,0.92)" : "rgba(8,20,45,0.82)",
          border: `3px solid ${w}`,
          color: warnaTeks(terang),
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 32,
          whiteSpace: "nowrap",
        }}
      >
        {teks}
      </div>
    </>
  );
};
