// EP 02 — Komposisi Udara (Flat + Motion Graphics): angka kinetik raksasa, 100 kubus isometrik 2.5D,
// penanda bernomor, kaca pembesar molekul, diagram napas masuk vs keluar.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";
import { Iso, KacaPembesar, KotakIso, P, PinLabel, TeksEkstrusi, W, iso, usePop } from "./pustaka";

const O: Iso = { cx: 560, cy: 720, u: 37 };
const WARNA = {
  N: { atas: "#93C5FD", kanan: "#2563EB", depan: "#1D4ED8" },
  O: { atas: "#86EFAC", kanan: "#16A34A", depan: "#15803D" },
  A: { atas: "#FDBA74", kanan: "#F97316", depan: "#C2410C" },
};
const jenis = (k: number) => (k < 78 ? "N" : k < 99 ? "O" : "A");
const sel = (k: number) => ({ x: k % 10, y: Math.floor(k / 10) });

const BalokUdara: React.FC = () => {
  const f = useCurrentFrame();
  const urut = Array.from({ length: 100 }, (_, k) => k).sort((a, b) => sel(a).x + sel(a).y - (sel(b).x + sel(b).y));
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <filter id="lembut"><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
      {/* bayangan lantai */}
      <polygon points={[iso(O, -0.6, -0.6, -1.4), iso(O, 11.2, -0.6, -1.4), iso(O, 11.2, 11.2, -1.4), iso(O, -0.6, 11.2, -1.4)].map((p) => `${p.X + 30},${p.Y + 40}`).join(" ")} fill="#0F172A" opacity={0.18} filter="url(#lembut)" />
      {/* alas */}
      <KotakIso o={O} x={-0.5} y={-0.5} z={-0.9} w={11} d={11} h={0.6} atas="#F8FAFC" kanan="#CBD5E1" depan="#94A3B8" />
      <KotakIso o={O} x={-0.5} y={-0.5} z={-1.3} w={11} d={11} h={0.4} atas="#E2E8F0" kanan="#64748B" depan="#475569" />
      {urut.map((k) => {
        const { x, y } = sel(k);
        const j = jenis(k);
        const t = interpolate(f, [8 + (x + y) * 1.6, 22 + (x + y) * 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
        const naik = j === "A" ? 1.4 : j === "O" ? 0.5 : 0;
        const c = WARNA[j];
        return (
          <g key={k} opacity={t}>
            <KotakIso o={O} x={x + 0.09} y={y + 0.09} z={(1 - t) * 4 + naik * t} w={0.82} d={0.82} h={0.82} atas={c.atas} kanan={c.kanan} depan={c.depan} />
          </g>
        );
      })}
      {/* garis gerak naik di kubus argon */}
      {[0, 1, 2].map((i) => {
        const p = iso(O, 9.5, 9.5, 2.6 + i * 0.5);
        return <line key={i} x1={p.X - 20 + i * 20} y1={p.Y - 10} x2={p.X - 20 + i * 20} y2={p.Y - 40} stroke={P.oranye} strokeWidth={5} strokeLinecap="round" opacity={0.7 - i * 0.15} />;
      })}
    </svg>
  );
};

const Molekul2: React.FC<{ x: number; y: number; warna: string; terang: string; label: string; ikatan: number }> = ({ x, y, warna, terang, label, ikatan }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: ikatan }, (_, i) => (
      <rect key={i} x={-22} y={-4 + (i - (ikatan - 1) / 2) * 9} width={44} height={6} rx={3} fill="#94A3B8" />
    ))}
    {[-30, 30].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={0} r={26} fill={warna} />
        <circle cx={cx - 8} cy={-9} r={9} fill={terang} opacity={0.9} />
        <path d={`M ${cx} 26 A 26 26 0 0 1 ${cx + 26} 0`} fill="none" stroke="#0F172A" strokeWidth={4} opacity={0.15} />
      </g>
    ))}
    <text x={70} y={9} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill="#0F172A">{label}</text>
  </g>
);

export const Ep2Udara: React.FC = () => {
  const f = useCurrentFrame();
  const angka = Math.round(interpolate(f, [5, 45], [0, 78], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const pN = iso(O, 3.5, 2.5, 1);
  const pO = iso(O, 8.5, 8.5, 1.5);
  const pA = iso(O, 9.5, 9.5, 2.3);
  const sBar = usePop(50);
  return (
    <AbsoluteFill>
      {/* latar gradasi lembut + gumpalan warna kabur */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg,#EFF6FF 0%,#F0FDF4 55%,#FFF7ED 100%)" }} />
      <div style={{ position: "absolute", left: -200, top: 300, width: 700, height: 700, borderRadius: "50%", background: "#BFDBFE", filter: "blur(90px)", opacity: 0.7 }} />
      <div style={{ position: "absolute", right: -220, top: 900, width: 640, height: 640, borderRadius: "50%", background: "#BBF7D0", filter: "blur(90px)", opacity: 0.7 }} />

      {/* kepala + judul kinetik */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 70, display: "flex", justifyContent: "space-between", fontFamily: FONT }}>
        <div style={{ background: "#0F172A", color: "#fff", fontSize: 26, fontWeight: 700, padding: "8px 18px", borderRadius: 999 }}>SAINS SEHARI-HARI · EP 02</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: P.hijau }}>● INFOGRAFIK</div>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 160, fontFamily: FONT }}>
        <div style={{ fontSize: 50, fontWeight: 800, color: P.navy, lineHeight: 1.1 }}>
          Udara yang kamu hirup <span style={{ background: "linear-gradient(transparent 55%, #BBF7D0 55%)" }}>bukan</span> cuma oksigen.
        </div>
      </div>
      {/* angka raksasa dengan ekstrusi + garis kecepatan */}
      <div style={{ position: "absolute", left: 50, top: 300, display: "flex", alignItems: "center", gap: 26 }}>
        <TeksEkstrusi teks={`${angka}%`} ukuran={230} warna="#2563EB" sisi="#1E3A8A" lapis={14} font={FONT} />
        <div style={{ fontFamily: FONT }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 120 - i * 30, height: 8, borderRadius: 4, background: P.biru, opacity: 0.5 - i * 0.12, marginBottom: 10, marginLeft: i * 20 }} />
          ))}
          <div style={{ fontSize: 30, fontWeight: 700, color: P.abu }}>udara adalah</div>
          <div style={{ fontSize: 60, fontWeight: 800, color: P.navy, lineHeight: 1 }}>NITROGEN</div>
        </div>
      </div>

      <BalokUdara />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1215, textAlign: "center", fontFamily: FONT, fontSize: 28, fontWeight: 700, color: P.abu }}>
        1 kubus = 1% udara kering · total 100 kubus
      </div>

      <PinLabel x={pN.X} y={pN.Y} kiri={60} atas={560} n="N₂" warna={P.biru} judul="78 Nitrogen" isi="Gas utama, tidak dipakai tubuh." lebar={300} font={FONT} tunda={40} />
      <PinLabel x={pO.X} y={pO.Y} kiri={720} atas={1040} n="O₂" warna={P.hijau} judul="21 Oksigen" isi="Yang kita butuhkan untuk bernapas." lebar={300} font={FONT} tunda={46} />
      <PinLabel x={pA.X} y={pA.Y} kiri={770} atas={560} n="Ar" warna={P.oranye} judul="±1 Lainnya" isi="Argon, CO₂ & gas lain." lebar={250} font={FONT} tunda={52} />
      <KacaPembesar x={175} y={1035} r={112} dari={{ x: iso(O, 1, 8, 1).X, y: iso(O, 1, 8, 1).Y }} label="Diperbesar" font={FONT} tunda={56}>
        <svg width={230} height={230} viewBox="-115 -115 230 230">
          <rect x={-115} y={-115} width={230} height={230} fill="#EFF6FF" />
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={-100 + (i * 53) % 200} cy={-100 + ((i * 97) % 200)} r={3} fill="#93C5FD" />
          ))}
          <Molekul2 x={-34} y={-40} warna="#2563EB" terang="#93C5FD" label="N₂" ikatan={3} />
          <Molekul2 x={-34} y={44} warna="#16A34A" terang="#86EFAC" label="O₂" ikatan={2} />
        </svg>
      </KacaPembesar>

      {/* diagram pendukung: napas masuk vs keluar */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 1330, background: "#fff", borderRadius: 32, padding: "26px 30px", boxShadow: "0 18px 40px rgba(15,23,42,0.10), 0 4px 0 rgba(15,23,42,0.05)", fontFamily: FONT }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: P.navy }}>Saat kamu bernapas</div>
          <div style={{ fontSize: 22, color: P.abu, fontWeight: 600 }}>perkiraan, per volume</div>
        </div>
        {[
          { l: "Masuk", o: 21, c: 0.04 },
          { l: "Keluar", o: 16, c: 4 },
        ].map((b, i) => (
          <div key={b.l} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, color: P.navy }}>
              <span>{i === 0 ? "⬇" : "⬆"} Napas {b.l.toLowerCase()}</span>
              <span>
                <span style={{ color: P.hijau }}>O₂ {b.o}%</span> · <span style={{ color: P.pink }}>CO₂ {b.c.toLocaleString("id-ID")}%</span>
              </span>
            </div>
            <div style={{ position: "relative", height: 30, borderRadius: 15, background: "#F1F5F9", marginTop: 10, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(b.o / 25) * 100 * sBar}%`, background: "linear-gradient(90deg,#4ADE80,#16A34A)", borderRadius: 15 }} />
              <div style={{ position: "absolute", left: `${(b.o / 25) * 100 * sBar}%`, top: 0, bottom: 0, width: `${Math.max(1.2, (b.c / 25) * 100) * sBar}%`, background: "linear-gradient(90deg,#F472B6,#DB2777)", borderRadius: 15 }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 18, fontSize: 25, color: "#475569", lineHeight: 1.35 }}>
          Tubuh mengambil sebagian oksigen dan membuang <b style={{ color: P.pink }}>karbon dioksida</b>.
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 40, fontFamily: FONT, fontSize: 21, color: P.abu }}>Sumber: NASA, NOAA, buku ajar fisiologi · nilai napas bersifat perkiraan</div>
    </AbsoluteFill>
  );
};
