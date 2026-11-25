// EP 03 — Hemat Listrik (Flat + Exploded/Cutaway): rumah isometrik dipotong (tanpa atap & dinding depan),
// penanda bernomor ke tiap alat, kaca pembesar stopkontak, meteran tagihan berbentuk diagram setengah lingkaran.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";
import { Iso, KacaPembesar, KotakIso, Lencana, P, PinNomor, TeksEkstrusi, W, iso } from "./pustaka";

const O: Iso = { cx: 600, cy: 720, u: 42 };
const poly = (a: [number, number, number][]) => a.map(([x, y, z]) => { const p = iso(O, x, y, z); return `${p.X},${p.Y}`; }).join(" ");

const Rumah: React.FC = () => {
  const f = useCurrentFrame();
  const nyala = 0.75 + 0.25 * Math.sin(f / 6);
  return (
    <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <filter id="b14"><feGaussianBlur stdDeviation="14" /></filter>
        <radialGradient id="cahayaLampu" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FEF08A" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FEF08A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kaca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
      {/* bayangan rumah */}
      <polygon points={poly([[0, 0, -1], [13, 0, -1], [13, 10, -1], [0, 10, -1]])} fill="#0F172A" opacity={0.2} filter="url(#b14)" transform="translate(30 50)" />
      {/* pelat lantai */}
      <KotakIso o={O} x={-0.4} y={-0.4} z={-0.8} w={13} d={10} h={0.8} atas="#E2E8F0" kanan="#94A3B8" depan="#64748B" />
      {/* lantai ruang tamu (kayu) & dapur (keramik) */}
      <polygon points={poly([[0, 0, 0], [6.4, 0, 0], [6.4, 9.2, 0], [0, 9.2, 0]])} fill="#FCD9A8" />
      {Array.from({ length: 9 }, (_, i) => (
        <polyline key={i} points={poly([[0, i + 0.5, 0], [6.4, i + 0.5, 0]])} stroke="#E9B97A" strokeWidth={2} fill="none" />
      ))}
      <polygon points={poly([[6.4, 0, 0], [12.2, 0, 0], [12.2, 9.2, 0], [6.4, 9.2, 0]])} fill="#F1F5F9" />
      {Array.from({ length: 6 }, (_, i) => (
        <polyline key={`a${i}`} points={poly([[6.4 + i, 0, 0], [6.4 + i, 9.2, 0]])} stroke="#CBD5E1" strokeWidth={2} fill="none" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <polyline key={`b${i}`} points={poly([[6.4, i + 1, 0], [12.2, i + 1, 0]])} stroke="#CBD5E1" strokeWidth={2} fill="none" />
      ))}
      {/* karpet */}
      <polygon points={poly([[1, 4.4, 0.01], [5, 4.4, 0.01], [5, 8, 0.01], [1, 8, 0.01]])} fill="#A78BFA" />
      <polygon points={poly([[1.3, 4.7, 0.02], [4.7, 4.7, 0.02], [4.7, 7.7, 0.02], [1.3, 7.7, 0.02]])} fill="none" stroke="#DDD6FE" strokeWidth={3} />

      {/* dinding belakang (kanan-atas) & dinding kiri, terpotong */}
      <KotakIso o={O} x={0} y={-0.35} z={0} w={12.2} d={0.35} h={6} atas="#F8FAFC" kanan="#CBD5E1" depan="#EEF2FF" />
      <KotakIso o={O} x={-0.35} y={-0.35} z={0} w={0.35} d={9.55} h={6} atas="#F8FAFC" kanan="#E0E7FF" depan="#94A3B8" />
      {/* jendela di dinding belakang */}
      <polygon points={poly([[2, 0.01, 2.6], [4.4, 0.01, 2.6], [4.4, 0.01, 4.8], [2, 0.01, 4.8]])} fill="url(#kaca)" stroke="#fff" strokeWidth={8} />
      <polyline points={poly([[3.2, 0.01, 2.6], [3.2, 0.01, 4.8]])} stroke="#fff" strokeWidth={5} />
      {/* dinding sekat ruang (setengah) */}
      <KotakIso o={O} x={6.2} y={0} z={0} w={0.3} d={4.6} h={6} atas="#F8FAFC" kanan="#E2E8F0" depan="#CBD5E1" />
      {/* saklar di sekat */}
      <polygon points={poly([[6.51, 3.4, 2.2], [6.51, 3.9, 2.2], [6.51, 3.9, 3.0], [6.51, 3.4, 3.0]])} fill="#fff" stroke="#94A3B8" strokeWidth={2} />
      <polygon points={poly([[6.52, 3.55, 2.35], [6.52, 3.75, 2.35], [6.52, 3.75, 2.6], [6.52, 3.55, 2.6]])} fill="#0F172A" />

      {/* AC di dinding kiri + aliran dingin */}
      <KotakIso o={O} x={0} y={2.2} z={4.4} w={0.7} d={2.6} h={0.9} atas="#FFFFFF" kanan="#E2E8F0" depan="#CBD5E1" />
      <polyline points={poly([[0.72, 2.4, 4.6], [0.72, 4.6, 4.6]])} stroke="#94A3B8" strokeWidth={4} />
      {[0, 1, 2].map((i) => {
        const t = ((f * 0.04 + i * 0.33) % 1);
        return <polyline key={i} points={poly([[0.9 + t * 1.8, 2.6 + i * 0.8, 4.3 - t * 1.2], [1.3 + t * 1.8, 2.8 + i * 0.8, 4.0 - t * 1.2]])} stroke="#38BDF8" strokeWidth={6} strokeLinecap="round" opacity={1 - t} />;
      })}

      {/* TV di dinding belakang + meja */}
      <KotakIso o={O} x={1.2} y={0} z={0} w={3.6} d={0.9} h={1.0} atas="#A16207" kanan="#854D0E" depan="#713F12" />
      <KotakIso o={O} x={1.6} y={0.02} z={1.3} w={2.8} d={0.12} h={1.7} atas="#1E293B" kanan="#0F172A" depan="#0F172A" />
      <polygon points={poly([[1.7, 0.15, 1.4], [4.3, 0.15, 1.4], [4.3, 0.15, 2.9], [1.7, 0.15, 2.9]])} fill="#3B82F6" opacity={0.85} />
      <polygon points={poly([[1.7, 0.16, 2.2], [3.0, 0.16, 2.9], [1.7, 0.16, 2.9]])} fill="#93C5FD" opacity={0.6} />

      {/* sofa */}
      <KotakIso o={O} x={1.2} y={6.2} z={0} w={3.8} d={1.6} h={0.9} atas="#8B5CF6" kanan="#7C3AED" depan="#6D28D9" />
      <KotakIso o={O} x={1.2} y={7.4} z={0.9} w={3.8} d={0.4} h={1.0} atas="#A78BFA" kanan="#7C3AED" depan="#5B21B6" />
      <KotakIso o={O} x={1.4} y={6.3} z={0.9} w={1.0} d={0.7} h={0.5} atas="#FDE047" kanan="#EAB308" depan="#CA8A04" />

      {/* lampu berdiri menyala */}
      <circle cx={iso(O, 5.4, 4.8, 3.4).X} cy={iso(O, 5.4, 4.8, 3.4).Y} r={110} fill="url(#cahayaLampu)" opacity={nyala} />
      <polyline points={poly([[5.4, 4.8, 0], [5.4, 4.8, 3.2]])} stroke="#334155" strokeWidth={6} />
      <polygon points={poly([[5.0, 4.4, 3.2], [5.8, 4.4, 3.2], [5.6, 4.6, 3.9], [5.2, 4.6, 3.9]])} fill="#FDE68A" />
      <polygon points={poly([[5.8, 4.4, 3.2], [5.8, 5.2, 3.2], [5.6, 5.0, 3.9], [5.6, 4.6, 3.9]])} fill="#FBBF24" />

      {/* dapur: meja dapur, wastafel, stopkontak + charger */}
      <KotakIso o={O} x={6.6} y={0} z={0} w={3.6} d={1.1} h={1.7} atas="#E2E8F0" kanan="#94A3B8" depan="#F8FAFC" />
      <polygon points={poly([[7.2, 0.25, 1.71], [8.4, 0.25, 1.71], [8.4, 0.85, 1.71], [7.2, 0.85, 1.71]])} fill="#94A3B8" />
      <polyline points={poly([[7.8, 0.15, 1.7], [7.8, 0.15, 2.3], [7.8, 0.45, 2.3]])} stroke="#64748B" strokeWidth={6} fill="none" />
      <polygon points={poly([[9.2, 0.01, 2.2], [9.7, 0.01, 2.2], [9.7, 0.01, 2.8], [9.2, 0.01, 2.8]])} fill="#fff" stroke="#94A3B8" strokeWidth={2} />
      <KotakIso o={O} x={9.3} y={0} z={2.3} w={0.3} d={0.3} h={0.35} atas="#F8FAFC" kanan="#CBD5E1" depan="#E2E8F0" />
      <polyline points={poly([[9.45, 0.3, 2.35], [9.5, 0.7, 1.75], [9.2, 0.8, 1.72]])} stroke="#0F172A" strokeWidth={4} fill="none" />
      <KotakIso o={O} x={8.7} y={0.6} z={1.7} w={0.5} d={0.3} h={0.05} atas="#1E293B" kanan="#0F172A" depan="#0F172A" />
      {/* kulkas */}
      <KotakIso o={O} x={10.6} y={0} z={0} w={1.5} d={1.4} h={4.4} atas="#F8FAFC" kanan="#CBD5E1" depan="#F1F5F9" />
      <polyline points={poly([[10.6, 1.41, 3.0], [12.1, 1.41, 3.0]])} stroke="#94A3B8" strokeWidth={3} />
      <polyline points={poly([[10.9, 1.42, 3.3], [10.9, 1.42, 4.0]])} stroke="#64748B" strokeWidth={6} strokeLinecap="round" />
      <polyline points={poly([[10.9, 1.42, 1.6], [10.9, 1.42, 2.6]])} stroke="#64748B" strokeWidth={6} strokeLinecap="round" />
      {[0, 1, 2].map((i) => {
        const t = (f * 0.03 + i * 0.33) % 1;
        return <circle key={i} cx={iso(O, 11.4, 1.6 + t, 1.5 - t * 0.6).X} cy={iso(O, 11.4, 1.6 + t, 1.5 - t * 0.6).Y} r={10 + t * 14} fill="#BAE6FD" opacity={0.6 * (1 - t)} />;
      })}
      {/* tanaman */}
      <KotakIso o={O} x={11.2} y={7.8} z={0} w={0.7} d={0.7} h={0.7} atas="#FDBA74" kanan="#EA580C" depan="#C2410C" />
      {[[11.55, 8.15, 1.6, 28, "#16A34A"], [11.3, 8.0, 1.3, 22, "#22C55E"], [11.8, 8.3, 1.2, 20, "#15803D"]].map(([x, y, z, r, c], i) => (
        <circle key={i} cx={iso(O, x as number, y as number, z as number).X} cy={iso(O, x as number, y as number, z as number).Y} r={r as number} fill={c as string} />
      ))}
    </svg>
  );
};

export const Ep3Listrik: React.FC = () => {
  const f = useCurrentFrame();
  const jarum = interpolate(f, [20, 80], [-60, 35], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  const p = (x: number, y: number, z: number) => { const q = iso(O, x, y, z); return { x: q.X, y: q.Y }; };
  const titikCharger = p(9.45, 0.15, 2.5);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FFF7ED 0%,#FEF3C7 40%,#EEF2FF 100%)" }} />
      <div style={{ position: "absolute", left: 300, top: 420, width: 700, height: 700, borderRadius: "50%", background: "#FDE68A", filter: "blur(110px)", opacity: 0.6 }} />

      {/* judul rata kanan (variasi komposisi) */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 70, display: "flex", justifyContent: "space-between", fontFamily: FONT }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: P.oranye }}>● TIPS RUMAH</div>
        <div style={{ background: "#0F172A", color: "#fff", fontSize: 26, fontWeight: 700, padding: "8px 18px", borderRadius: 999 }}>SAINS SEHARI-HARI · EP 03</div>
      </div>
      <div style={{ position: "absolute", right: 60, top: 150, textAlign: "right", fontFamily: FONT }}>
        <div style={{ fontSize: 48, fontWeight: 800, color: P.navy }}>Di mana listrikmu</div>
        <TeksEkstrusi teks="BOCOR?" ukuran={140} warna="#F97316" sisi="#9A3412" lapis={10} font={FONT} style={{ display: "inline-block", marginTop: 4 }} />
        <div style={{ fontSize: 30, color: P.abu, fontWeight: 600, marginTop: 6 }}>Bedah rumah, temukan 6 kebiasaan boros</div>
      </div>

      <Rumah />

      {/* pin bernomor langsung di tiap alat */}
      {[
        [p(0.4, 3.5, 5.4), 1, P.cyan],
        [p(5.4, 4.8, 4.1), 2, P.kuning],
        [p(3, 0.1, 3.1), 3, P.biru],
        [p(11.35, 0.7, 4.5), 4, P.oranye],
        [p(6.5, 3.65, 3.1), 5, P.hijau],
      ].map(([q, n, c], i) => (
        <PinNomor key={i} x={(q as { x: number }).x} y={(q as { y: number }).y} n={n as number} warna={c as string} font={FONT} tunda={28 + i * 5} />
      ))}

      {/* kaca pembesar di kiri atas: stopkontak + charger yang masih tercolok */}
      <KacaPembesar x={205} y={330} r={125} dari={titikCharger} label="Charger tercolok = daya siaga" font={FONT} tunda={60}>
        <svg width={250} height={250} viewBox="-125 -125 250 250">
          <rect x={-125} y={-125} width={250} height={250} fill="#F1F5F9" />
          <rect x={-70} y={-80} width={140} height={150} rx={22} fill="#fff" stroke="#CBD5E1" strokeWidth={4} />
          <circle cx={0} cy={-5} r={44} fill="#E2E8F0" />
          <rect x={-34} y={-38} width={68} height={52} rx={14} fill="#0F172A" />
          <rect x={-22} y={-60} width={10} height={26} rx={4} fill="#94A3B8" />
          <rect x={12} y={-60} width={10} height={26} rx={4} fill="#94A3B8" />
          <path d="M 0 14 C 0 60, -40 60, -40 125" fill="none" stroke="#0F172A" strokeWidth={10} />
          <circle cx={46} cy={-62} r={24} fill="#FDE047" />
          <polygon points="50,-80 34,-58 46,-58 40,-42 58,-66 46,-66" fill="#0F172A" />
                  </svg>
      </KacaPembesar>

      {/* kartu penjelasan bernomor dalam grid */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 1215, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontFamily: FONT }}>
        {[
          [1, P.cyan, "AC sekitar 25 °C", "Makin dingin, makin berat kerjanya."],
          [2, P.kuning, "Ganti ke lampu LED", "Terang sama, listrik lebih sedikit."],
          [3, P.biru, "TV jangan mode siaga", "Matikan dari saklar, bukan remote."],
          [4, P.oranye, "Kulkas jangan lama dibuka", "Udara dingin keluar, mesin kerja ulang."],
          [5, P.hijau, "Matikan lampu", "Biasakan saat keluar ruangan."],
          [6, P.pink, "Cabut charger", "Lihat kaca pembesar di atas."],
        ].map(([n, c, j, t]) => (
          <div key={n as number} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.92)", borderRadius: 22, padding: "14px 16px", boxShadow: "0 10px 22px rgba(15,23,42,0.10), 0 3px 0 rgba(15,23,42,0.05)" }}>
            <Lencana n={n as number} warna={c as string} ukuran={44} font={FONT} />
            <div>
              <div style={{ fontSize: 25, fontWeight: 800, color: P.navy, lineHeight: 1.15 }}>{j}</div>
              <div style={{ fontSize: 20, color: "#475569", marginTop: 4, lineHeight: 1.25 }}>{t}</div>
            </div>
          </div>
        ))}
      </div>
      {/* pin ke-6 di charger */}
      <PinNomor x={titikCharger.x} y={titikCharger.y - 10} n={6} warna={P.pink} font={FONT} tunda={54} />

      {/* meteran tagihan */}
      <div style={{ position: "absolute", left: 60, right: 60, bottom: 90, background: "#0F172A", borderRadius: 36, padding: "26px 32px", display: "flex", alignItems: "center", gap: 28, boxShadow: "0 20px 40px rgba(15,23,42,0.25)", fontFamily: FONT }}>
        <svg width={250} height={140} viewBox="-125 -115 250 140">
          {[["#16A34A", -180, -120], ["#F59E0B", -120, -60], ["#EF4444", -60, 0]].map(([c, a0, a1]) => {
            const r = 92, A0 = ((a0 as number) * Math.PI) / 180, A1 = ((a1 as number) * Math.PI) / 180;
            return <path key={c as string} d={`M ${Math.cos(A0) * r} ${Math.sin(A0) * r} A ${r} ${r} 0 0 1 ${Math.cos(A1) * r} ${Math.sin(A1) * r}`} fill="none" stroke={c as string} strokeWidth={22} strokeLinecap="butt" />;
          })}
          <g transform={`rotate(${-90 - jarum + 0})`}>
            <rect x={-4} y={-82} width={8} height={82} rx={4} fill="#fff" />
          </g>
          <circle r={14} fill="#fff" />
          <text x={-92} y={20} textAnchor="middle" fontSize={16} fill="#94A3B8" fontWeight={700}>hemat</text>
          <text x={92} y={20} textAnchor="middle" fontSize={16} fill="#94A3B8" fontWeight={700}>boros</text>
        </svg>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#FDE047", letterSpacing: 3 }}>HASILNYA</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginTop: 6 }}>Jarum tagihan bergeser ke arah hemat</div>
          <div style={{ fontSize: 24, color: "#CBD5E1", marginTop: 8 }}>Cek meteran tiap minggu untuk membandingkan.</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 40, fontFamily: FONT, fontSize: 21, color: P.abu }}>Tips umum hemat energi · hasil berbeda tiap rumah</div>
    </AbsoluteFill>
  );
};
