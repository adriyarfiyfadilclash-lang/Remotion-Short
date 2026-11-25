// Grafis 2D per adegan (di atas/bawah kanvas 3D). Label memakai proyeksi dari model 3D.
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import data from "../data.json";
import { JALUR_BIRU, JALUR_MERAH, KATUP, PUSAT, RUANG, SIMPUL_AV, SIMPUL_SA, faseDetak, keLayar, keadaanPada, posRuang } from "../lib/model";
import { Adegan } from "../lib/waktu";
import { FONT, MedicalCalloutLabel, useMasukKeluar, warnaAksen, warnaTeks } from "./Teks";

type Props = { a: Adegan; terang: boolean; awal: number };

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const angkaID = (n: number, desimal = 0) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: desimal, maximumFractionDigits: desimal });

const Chip: React.FC<{ teks: string; terang: boolean; y: number; tunda?: number; besar?: number }> = ({ teks, terang, y, tunda = 20, besar = 34 }) => {
  const { masuk, hilang } = useMasukKeluar(tunda);
  return (
    <div style={{ position: "absolute", top: y, left: 60, right: 60, textAlign: "center", opacity: hilang }}>
      <span
        style={{
          display: "inline-block",
          padding: "12px 26px",
          borderRadius: 999,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: besar,
          color: warnaTeks(terang),
          background: terang ? "rgba(255,255,255,0.85)" : "rgba(5,15,35,0.6)",
          border: `2px solid ${terang ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.15)"}`,
          transform: `scale(${masuk})`,
        }}
      >
        {teks}
      </span>
    </div>
  );
};

// ---------- Hook: penghitung detak ----------
const Counter: React.FC<Props> = ({ terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(6);
  const n = interpolate(f, [12, 100], [0, 100000], { ...klem, easing: Easing.out(Easing.cubic) });
  const denyut = 1 + 0.06 * Math.max(0, Math.sin(faseDetak(f) * Math.PI * 2));
  return (
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontFamily: FONT, opacity: hilang }}>
      <div
        style={{
          fontSize: 168,
          fontWeight: 800,
          color: warnaAksen(terang),
          letterSpacing: -4,
          transform: `scale(${masuk * denyut})`,
          textShadow: "0 8px 40px rgba(255,80,100,0.45)",
        }}
      >
        {angkaID(Math.round(n))}×
      </div>
      <div style={{ fontSize: 48, fontWeight: 700, color: warnaTeks(terang), opacity: interpolate(f, [60, 80], [0, 1], klem) }}>
        setiap hari, tanpa libur
      </div>
    </div>
  );
};

// ---------- Ukuran: kepalan tangan ----------
const Kepalan: React.FC<Props> = ({ terang, awal }) => {
  const { masuk, hilang, f } = useMasukKeluar(30);
  const pusat = keLayar(awal + f, PUSAT);
  const cx = 800;
  const cy = pusat.y;
  const garis = interpolate(f, [30, 70], [0, 1], klem);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        <circle cx={cx} cy={cy} r={200} fill="none" stroke={warnaAksen(terang)} strokeWidth={6} strokeDasharray="22 16"
          strokeDashoffset={-f * 1.5} opacity={garis} />
        {/* Kepalan tangan sederhana (ilustrasi datar) */}
        <g transform={`translate(${cx} ${cy}) scale(${masuk})`}>
          <rect x={-105} y={-40} width={210} height={150} rx={46} fill="#f2c6a0" stroke="#b9805a" strokeWidth={5} />
          {[-78, -26, 26, 78].map((x, i) => (
            <rect key={i} x={x - 26} y={-92} width={52} height={92} rx={26} fill="#f6d2b0" stroke="#b9805a" strokeWidth={5} />
          ))}
          <path d="M -105 30 Q -150 -10 -110 -60 Q -70 -20 -60 40 Z" fill="#efbf96" stroke="#b9805a" strokeWidth={5} />
        </g>
        <text x={545} y={cy + 22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={90} fill={warnaTeks(terang)} opacity={garis}>
          ≈
        </text>
      </svg>
      <Chip teks="Ilustrasi ukuran, bukan skala pasti" terang={terang} y={cy + 250} tunda={60} besar={30} />
    </>
  );
};

// ---------- Letak: siluet tubuh (di belakang jantung) ----------
const Torso: React.FC<Props> = ({ terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(0);
  const garis = interpolate(f, [40, 80], [0, 1], klem);
  const warna = terang ? "#b8cde0" : "#2c4a6e";
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang * masuk }}>
      <circle cx={540} cy={770} r={95} fill={warna} />
      <rect x={500} y={850} width={80} height={70} fill={warna} />
      <path d="M 250 1000 Q 260 905 380 900 L 700 900 Q 820 905 830 1000 L 860 1600 L 220 1600 Z" fill={warna} />
      {/* Garis tengah tubuh */}
      <line x1={540} y1={900} x2={540} y2={900 + 700 * garis} stroke="#d62839" strokeWidth={5} strokeDasharray="18 14" />
      <text x={555} y={1500} fontFamily={FONT} fontWeight={700} fontSize={32} fill="#d62839" opacity={garis}>
        garis tengah
      </text>
    </svg>
  );
};

// ---------- Label ruang jantung ----------
const POS_LABEL: Record<string, { x: number; y: number }> = {
  RA: { x: 250, y: 690 },
  LA: { x: 830, y: 690 },
  RV: { x: 250, y: 1570 },
  LV: { x: 830, y: 1570 },
};

const LabelRuang: React.FC<Props & { pilih: ("RA" | "LA" | "RV" | "LV")[]; catatan?: string }> = ({ terang, awal, pilih, catatan }) => {
  const f = useCurrentFrame();
  const k = keadaanPada(awal + f);
  return (
    <>
      {pilih.map((n, i) => (
        <MedicalCalloutLabel
          key={n}
          teks={RUANG[n].nama}
          dari={POS_LABEL[n]}
          ke={keLayar(awal + f, posRuang(n, k.bongkar))}
          terang={terang}
          tunda={45 + i * 18}
        />
      ))}
      {catatan && <Chip teks={catatan} terang={terang} y={520} tunda={120} besar={28} />}
    </>
  );
};

// ---------- Aliran ke paru / tubuh ----------
const Paru: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  const ujung = keLayar(awal + f, JALUR_BIRU[JALUR_BIRU.length - 1]);
  return (
    <>
      <MedicalCalloutLabel teks="Paru-paru: ambil O₂" dari={{ x: 760, y: 680 }} ke={ujung} terang={terang} tunda={40} warna="#9cc4ff" />
      {Array.from({ length: 8 }).map((_, i) => {
        const t = ((f + i * 12) % 90) / 90;
        return (
          <div key={i} style={{ position: "absolute", left: ujung.x - 40 + i * 12, top: ujung.y - t * 160, width: 20, height: 20, borderRadius: 10,
            border: "3px solid rgba(200,230,255,0.85)", opacity: f > 40 ? 1 - t : 0 }} />
        );
      })}
      <Chip teks="Biru = darah miskin oksigen" terang={terang} y={1540} tunda={80} besar={30} />
    </>
  );
};

const Tubuh: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  const ujung = keLayar(awal + f, JALUR_MERAH[JALUR_MERAH.length - 1]);
  const pusat = keLayar(awal + f, PUSAT);
  const { hilang } = useMasukKeluar(0);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const sudut = (i / 8) * Math.PI * 2 + 0.2;
          const t = ((f - 50 + i * 6) % 60) / 60;
          if (f < 50) return null;
          const r1 = 330 + t * 120;
          const x = pusat.x + Math.cos(sudut) * r1;
          const y = pusat.y + Math.sin(sudut) * r1 * 0.9;
          return <circle key={i} cx={x} cy={y} r={12} fill="#ff4d5e" opacity={1 - t} />;
        })}
      </svg>
      <MedicalCalloutLabel teks="Lewat aorta ke seluruh tubuh" dari={{ x: 700, y: 690 }} ke={ujung} terang={terang} tunda={40} warna="#ff8a95" />
      <Chip teks="Merah = darah kaya oksigen" terang={terang} y={1540} tunda={80} besar={30} />
    </>
  );
};

// ---------- Katup ----------
const Katup: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  const { hilang } = useMasukKeluar(0);
  return (
    <>
      {KATUP.map((kt, i) => {
        const p = keLayar(awal + f, kt.pos);
        const muncul = interpolate(f, [20 + i * 14, 34 + i * 14], [0, 1], klem);
        return (
          <div key={i} style={{ position: "absolute", left: p.x + 26, top: p.y - 62, width: 52, height: 52, borderRadius: 26,
            background: "#ffd166", color: "#0f172a", fontFamily: FONT, fontWeight: 800, fontSize: 30, display: "flex",
            alignItems: "center", justifyContent: "center", transform: `scale(${muncul})`, opacity: hilang,
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            {i + 1}
          </div>
        );
      })}
      <Chip teks={KATUP.map((k, i) => `${i + 1} ${k.nama}`).join(" · ")} terang={terang} y={1520} tunda={80} besar={28} />
    </>
  );
};

// ---------- Bunyi dug-dug ----------
const Suara: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  const { hilang } = useMasukKeluar(0);
  const t = faseDetak(awal + f);
  const dug = t >= 0.16 && t < 0.34 ? 1 - (t - 0.16) / 0.18 : 0;
  const dag = t >= 0.47 && t < 0.62 ? 1 - (t - 0.47) / 0.15 : 0;
  const kata = (teks: string, kuat: number, x: number) => (
    <div style={{ position: "absolute", left: x, top: 1060, transform: `translate(-50%,-50%) scale(${0.7 + kuat * 0.6})`, opacity: kuat * hilang,
      fontFamily: FONT, fontWeight: 800, fontSize: 92, color: warnaAksen(terang), textShadow: "0 6px 26px rgba(0,0,0,0.5)" }}>
      {teks}
    </div>
  );
  return (
    <>
      {kata("DUG", dug, 190)}
      {kata("DAG", dag, 890)}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        {Array.from({ length: 28 }).map((_, i) => {
          const h = 12 + (dug + dag) * 120 * Math.abs(Math.sin(i * 1.7 + f / 3));
          return <rect key={i} x={120 + i * 30} y={1480 - h / 2} width={16} height={h} rx={8} fill={warnaAksen(terang)} opacity={0.85} />;
        })}
      </svg>
      <Chip teks="DUG = katup atas menutup · DAG = katup keluar menutup" terang={terang} y={1560} tunda={40} besar={26} />
    </>
  );
};

// ---------- Listrik + EKG ----------
const Ekg: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  const { hilang } = useMasukKeluar(0);
  const titik: string[] = [];
  for (let x = 0; x <= 1080; x += 6) {
    const gf = awal + f - (1080 - x) / 12; // geser ke kiri
    const t = faseDetak(Math.max(0, gf));
    let y = 0;
    if (t > 0.04 && t < 0.12) y = -18 * Math.sin(((t - 0.04) / 0.08) * Math.PI); // gelombang P
    if (t > 0.17 && t < 0.19) y = 30;
    if (t >= 0.19 && t < 0.22) y = -150; // QRS
    if (t >= 0.22 && t < 0.24) y = 40;
    if (t > 0.34 && t < 0.5) y = -36 * Math.sin(((t - 0.34) / 0.16) * Math.PI); // gelombang T
    titik.push(`${x},${1480 + y}`);
  }
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        <polyline points={titik.join(" ")} fill="none" stroke="#7cf3ff" strokeWidth={6} strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px #7cf3ff)" }} />
      </svg>
      <MedicalCalloutLabel teks="Simpul SA (pemicu)" dari={{ x: 250, y: 690 }} ke={keLayar(awal + f, SIMPUL_SA)} terang={terang} tunda={50} warna="#7cf3ff" />
      <MedicalCalloutLabel teks="Simpul AV (penyalur)" dari={{ x: 820, y: 760 }} ke={keLayar(awal + f, SIMPUL_AV)} terang={terang} tunda={110} warna="#7cf3ff" />
      <Chip teks="Garis ini = rekaman listrik jantung (EKG)" terang={terang} y={1580} tunda={150} besar={28} />
    </>
  );
};

// ---------- Mitos vs fakta ----------
const Mitos: React.FC<Props> = ({ terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(20);
  const balik = interpolate(f, [120, 136], [0, 1], klem);
  const fakta = balik > 0.5;
  const sisi = fakta ? 1 - balik : balik;
  return (
    <div style={{ position: "absolute", top: 560, left: 70, right: 70, height: 600, opacity: hilang, transform: `scale(${masuk})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 44, background: "#ffffff", boxShadow: "0 20px 60px rgba(15,40,80,0.18)",
        transform: `scaleX(${1 - sisi * 2 < 0 ? 0.02 : 1 - sisi * 2})`, padding: "60px 56px", fontFamily: FONT, textAlign: "center",
        border: `6px solid ${fakta ? "#2a9d8f" : "#d62839"}` }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "12px 30px", borderRadius: 999,
          background: fakta ? "#2a9d8f" : "#d62839", color: "#fff", fontWeight: 800, fontSize: 48 }}>
          <svg width={44} height={44} viewBox="0 0 44 44">
            {fakta ? (
              <path d="M 8 23 L 18 33 L 37 12" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M 10 10 L 34 34 M 34 10 L 10 34" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
            )}
          </svg>
          {fakta ? "FAKTA" : "MITOS"}
        </div>
        <div style={{ marginTop: 50, fontSize: fakta ? 52 : 60, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
          {fakta ? "Jantung punya pemicu listriknya sendiri" : "Jantung berdetak karena diperintah otak"}
        </div>
        {fakta && (
          <div style={{ marginTop: 34, fontSize: 38, fontWeight: 500, color: "#334155", lineHeight: 1.35 }}>
            Saraf dari otak hanya mengatur cepat atau lambatnya detak.
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- 5,7 liter per menit ----------
const Liter: React.FC<Props> = ({ terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(14);
  const isi = interpolate(f, [20, 100], [0, 1], { ...klem, easing: Easing.inOut(Easing.cubic) });
  const ombak = Math.sin(f / 6) * 8;
  const x = 640;
  const y = 860;
  const w = 300;
  const h = 520;
  const permukaan = y + h - isi * (h - 40);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang * masuk }}>
        <defs>
          <clipPath id="botol">
            <rect x={x} y={y} width={w} height={h} rx={50} />
          </clipPath>
        </defs>
        <rect x={x} y={y} width={w} height={h} rx={50} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth={6} />
        <g clipPath="url(#botol)">
          <path d={`M ${x} ${permukaan} Q ${x + w / 4} ${permukaan - ombak} ${x + w / 2} ${permukaan} T ${x + w} ${permukaan} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
            fill="#e63946" />
        </g>
        <rect x={x + 90} y={y - 40} width={120} height={44} rx={12} fill="#ffffff" opacity={0.9} />
        <text x={x + w / 2} y={y + h / 2 + 30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill="#ffffff"
          style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))" }}>
          {angkaID(isi * 5.7, 1)} L
        </text>
      </svg>
      <Chip teks="≈ 4 sendok makan per detak" terang={terang} y={1450} tunda={90} besar={34} />
    </>
  );
};

// ---------- 96.000 km = 2x keliling Bumi ----------
const Bumi: React.FC<Props> = ({ terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(6);
  const cx = 540;
  const cy = 1030;
  const r = 250;
  const keliling = 2 * Math.PI * (r + 70);
  const putaran = interpolate(f, [30, 150], [0, 2], { ...klem, easing: Easing.inOut(Easing.cubic) });
  const km = interpolate(f, [30, 150], [0, 96000], { ...klem, easing: Easing.inOut(Easing.cubic) });
  const geser = (f * 1.2) % 400;
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: hilang }}>
        <defs>
          <clipPath id="bola">
            <circle cx={cx} cy={cy} r={r * masuk} />
          </clipPath>
          <radialGradient id="laut" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#5fa8ff" />
            <stop offset="100%" stopColor="#123a8a" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r * masuk + 18} fill="rgba(120,180,255,0.18)" />
        <circle cx={cx} cy={cy} r={r * masuk} fill="url(#laut)" />
        <g clipPath="url(#bola)" fill="#3fae6a">
          {[0, 400].map((o) => (
            <g key={o} transform={`translate(${geser - o} 0)`}>
              <ellipse cx={420} cy={950} rx={110} ry={70} />
              <ellipse cx={560} cy={1100} rx={80} ry={120} />
              <ellipse cx={700} cy={940} rx={70} ry={50} />
              <ellipse cx={330} cy={1150} rx={60} ry={40} />
            </g>
          ))}
        </g>
        {/* Garis pembuluh mengelilingi Bumi dua kali */}
        <circle cx={cx} cy={cy} r={r + 70} fill="none" stroke="#ff4d5e" strokeWidth={10} strokeLinecap="round"
          strokeDasharray={`${keliling * Math.min(putaran, 1)} ${keliling}`} transform={`rotate(-90 ${cx} ${cy})`} />
        {putaran > 1 && (
          <circle cx={cx} cy={cy} r={r + 100} fill="none" stroke="#ffd166" strokeWidth={10} strokeLinecap="round"
            strokeDasharray={`${keliling * 1.1 * (putaran - 1)} ${keliling * 1.2}`} transform={`rotate(-90 ${cx} ${cy})`} />
        )}
      </svg>
      <div style={{ position: "absolute", top: 1430, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 84,
        color: warnaTeks(terang), opacity: hilang }}>
        {angkaID(Math.round(km / 100) * 100)} km
      </div>
    </>
  );
};

// ---------- Ringkasan 3 poin ----------
const Ringkasan: React.FC<Props> = ({ a, terang }) => {
  const f = useCurrentFrame();
  return (
    <>
      {(a.poin ?? []).map((p, i) => (
        <PoinRingkas key={i} teks={p} nomor={i + 1} y={560 + i * 230} tunda={36 + i * 42} terang={terang} aktif={f} />
      ))}
    </>
  );
};

const PoinRingkas: React.FC<{ teks: string; nomor: number; y: number; tunda: number; terang: boolean; aktif: number }> = ({ teks, nomor, y, tunda, terang }) => {
  const { masuk, hilang, f } = useMasukKeluar(tunda);
  const centang = interpolate(f, [tunda + 10, tunda + 24], [0, 1], klem);
  return (
    <div style={{ position: "absolute", top: y, left: 70, right: 70, height: 190, borderRadius: 34, display: "flex", alignItems: "center", gap: 28,
      padding: "0 34px", background: terang ? "#ffffff" : "rgba(5,20,40,0.6)", border: "2px solid rgba(255,255,255,0.18)",
      opacity: hilang * masuk, transform: `translateX(${(1 - masuk) * -120}px)`, fontFamily: FONT }}>
      <svg width={84} height={84} viewBox="0 0 84 84" style={{ flexShrink: 0 }}>
        <circle cx={42} cy={42} r={38} fill="#2a9d8f" />
        <path d="M 22 44 L 36 58 L 62 28" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={70} strokeDashoffset={70 * (1 - centang)} />
      </svg>
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.22, color: warnaTeks(terang) }}>
        <span style={{ color: warnaAksen(terang) }}>{nomor}. </span>
        {teks}
      </div>
    </div>
  );
};

// ---------- Ajakan ----------
const Cta: React.FC<Props> = ({ a, terang }) => {
  const b1 = useMasukKeluar(40);
  const b2 = useMasukKeluar(70);
  const goyang = Math.sin(b1.f / 8) * 2;
  return (
    <>
      <div style={{ position: "absolute", top: 1150, left: 70, right: 70, padding: "30px 34px", borderRadius: 36, background: "#ffffff",
        fontFamily: FONT, fontWeight: 700, fontSize: 42, color: "#0f172a", lineHeight: 1.25, textAlign: "center",
        opacity: b1.masuk * b1.hilang, transform: `scale(${b1.masuk}) rotate(${goyang}deg)` }}>
        {a.ajakan}
      </div>
      <div style={{ position: "absolute", top: 1340, left: 0, right: 0, textAlign: "center", opacity: b2.masuk * b2.hilang }}>
        <span style={{ display: "inline-block", padding: "16px 40px", borderRadius: 999, background: "#e63946", color: "#fff",
          fontFamily: FONT, fontWeight: 800, fontSize: 38, transform: `scale(${0.95 + 0.05 * Math.sin(b2.f / 5)})` }}>
          {a.ikuti}
        </span>
      </div>
      <div style={{ position: "absolute", top: 1480, left: 60, right: 60, textAlign: "center", fontFamily: FONT, fontSize: 26,
        color: warnaTeks(terang), opacity: 0.8 * b2.hilang * b2.masuk, lineHeight: 1.4 }}>
        {data.sumber}
        <br />
        {data.catatan}
      </div>
    </>
  );
};

export const OverlayAdegan: React.FC<Props> = (p) => {
  switch (p.a.overlay) {
    case "counter":
      return (
        <>
          <Counter {...p} />
          <Chip teks={data.catatan} terang={p.terang} y={1640} tunda={90} besar={24} />
        </>
      );
    case "kepalan":
      return <Kepalan {...p} />;
    case "label4":
      return <LabelRuang {...p} pilih={["RA", "LA", "RV", "LV"]} catatan="Kanan/kiri = sisi tubuh pemilik jantung" />;
    case "labelAtas":
      return <LabelRuang {...p} pilih={["RA", "LA"]} />;
    case "labelBawah":
      return <LabelRuang {...p} pilih={["RV", "LV"]} />;
    case "paru":
      return <Paru {...p} />;
    case "tubuh":
      return <Tubuh {...p} />;
    case "katup":
      return <Katup {...p} />;
    case "suara":
      return <Suara {...p} />;
    case "ekg":
      return <Ekg {...p} />;
    case "mitos":
      return <Mitos {...p} />;
    case "liter":
      return <Liter {...p} />;
    case "bumi":
      return <Bumi {...p} />;
    case "ringkasan":
      return <Ringkasan {...p} />;
    case "cta":
      return <Cta {...p} />;
    default:
      return null;
  }
};

// Lapisan di BELAKANG jantung
export const UnderlayAdegan: React.FC<Props> = (p) => (p.a.overlay === "torso" ? <Torso {...p} /> : null);

// Label "Jantung" untuk adegan letak (di depan)
export const LabelLetak: React.FC<Props> = ({ terang, awal }) => {
  const f = useCurrentFrame();
  return <MedicalCalloutLabel teks="Jantung" dari={{ x: 830, y: 820 }} ke={keLayar(awal + f, PUSAT)} terang={terang} tunda={50} />;
};
