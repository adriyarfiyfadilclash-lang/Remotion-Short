// Tur kamera gaya ADRIY Exploded View: benda naik dari bawah sambil berputar menghadap kamera, kamera mendekat,
// lalu kamera MASUK ke tiap bagian (kulit luar memudar), berhenti untuk penjelasan, KELUAR lagi,
// masuk ke poin berikutnya dari sudut lain, dan ditutup dengan tampilan terurai lengkap.
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../src/components/Teks";
import { ASAL_M, ARAH_M, Motor, NAMA_M, TITIK_M } from "./Komposisi";
import {
  CYAN, CahayaStudio, Catatan, DaftarBagian, EMAS, JudulTeknis, Kam, Kanvas, KepalaTeknis, LatarCetakBiru, Penunjuk,
  Pose, SumbuPutus, TERANG, V3, W, geser, keLayar,
} from "./pustaka";

// ---------- Sutradara kamera: kunci-kunci yang diinterpolasi halus ----------
type Kunci = {
  f: number; target: V3; jarak: number; az: number; el: number; fov: number;
  e: number; objY: number; objRot: number; tembus: number[];
};
const PADAT = [1, 1, 1, 1, 1, 1, 1, 1];
// urutan tembus: 0 tutup, 1 sikat, 2 bantalan belakang, 3 komutator, 4 rotor, 5 magnet, 6 rumah, 7 bantalan depan
const K = (f: number, target: V3, jarak: number, az: number, el: number, lain: Partial<Kunci> = {}): Kunci => ({
  f, target, jarak, az, el, fov: 40, e: 0, objY: 0, objRot: 0, tembus: PADAT, ...lain,
});
const T = (o: Partial<Record<number, number>>) => PADAT.map((v, i) => o[i] ?? v);

const KUNCI: Kunci[] = [
  // Pembuka: dari bawah, benda naik sambil berputar menghadap kamera; kamera naik & mendekat
  K(0, [0, -0.4, 0], 13, -0.9, -0.42, { objY: -2.6, objRot: -2.6 }),
  K(80, [0, 0.1, 0], 7.6, 0.4, 0.12),
  K(110, [0, 0.1, 0], 7.4, 0.45, 0.13),
  // Poin 1: rumah memudar, magnet terlihat
  K(150, [0, 0, 0], 4.2, 0.75, 0.05, { tembus: T({ 6: 0.22 }) }),
  K(210, [0, 0, 0], 4.0, 0.95, 0.06, { tembus: T({ 6: 0.22 }) }),
  // Poin 2: kamera masuk ke dalam motor menuju rotor & lilitan
  K(250, [0, 0.05, 0], 1.95, 0.45, 0.12, { fov: 38, tembus: T({ 0: 0.12, 1: 0.3, 5: 0.12, 6: 0, 7: 0.3 }) }),
  K(315, [0, 0.05, 0], 1.85, 0.2, 0.1, { fov: 38, tembus: T({ 0: 0.12, 1: 0.3, 5: 0.12, 6: 0, 7: 0.3 }) }),
  // keluar
  K(350, [0, 0.2, 0], 7.6, 0.9, 0.3),
  // Poin 3: dari atas menuju komutator & sikat karbon
  K(395, [0, 0.66, 0], 2.5, 1.15, 0.5, { tembus: T({ 0: 0, 2: 0.3, 5: 0.3, 6: 0.18 }) }),
  K(460, [0, 0.66, 0], 2.4, 1.4, 0.48, { tembus: T({ 0: 0, 2: 0.3, 5: 0.3, 6: 0.18 }) }),
  // keluar
  K(495, [0, 0.1, 0], 7.6, 0.6, 0.15),
  // Poin 4: dari bawah menuju bantalan depan
  K(540, [0, -0.7, 0], 1.75, 0.2, -0.55, { tembus: T({ 6: 0.15, 5: 0.3 }) }),
  K(600, [0, -0.7, 0], 1.7, -0.1, -0.52, { tembus: T({ 6: 0.15, 5: 0.3 }) }),
  // keluar
  K(635, [0, 0.1, 0], 8, 0.4, 0.2),
  // Penutup: benda terurai, kamera mundur & mengorbit pelan
  K(705, [0, 0.2, 0], 13.6, 0.35, 0.22, { fov: 42, e: 1 }),
  K(800, [0, 0.2, 0], 13.6, 0.75, 0.24, { fov: 42, e: 1 }),
];
export const DURASI_TUR = 800;

const halus = Easing.inOut(Easing.cubic);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const keadaan = (f: number): Kunci => {
  let i = 0;
  while (i < KUNCI.length - 2 && f > KUNCI[i + 1].f) i++;
  const a = KUNCI[i], b = KUNCI[i + 1];
  const t = halus(Math.min(1, Math.max(0, (f - a.f) / (b.f - a.f))));
  return {
    f,
    target: [0, 1, 2].map((j) => lerp(a.target[j], b.target[j], t)) as V3,
    jarak: lerp(a.jarak, b.jarak, t), az: lerp(a.az, b.az, t), el: lerp(a.el, b.el, t), fov: lerp(a.fov, b.fov, t),
    e: lerp(a.e, b.e, t), objY: lerp(a.objY, b.objY, t), objRot: lerp(a.objRot, b.objRot, t),
    tembus: a.tembus.map((v, j) => lerp(v, b.tembus[j], t)),
  };
};

const kamera = (s: Kunci): Kam => ({
  pos: [
    s.target[0] + s.jarak * Math.cos(s.el) * Math.sin(s.az),
    s.target[1] + s.jarak * Math.sin(s.el),
    s.target[2] + s.jarak * Math.cos(s.el) * Math.cos(s.az),
  ],
  lihat: s.target,
  fov: s.fov,
});

// ---------- Poin penjelasan ----------
const POIN: { mulai: number; selesai: number; judul: string; isi: string; titik: V3 }[] = [
  { mulai: 150, selesai: 215, judul: "Rumah & magnet permanen", isi: "Dua magnet (kutub N dan S) menempel di dinding rumah baja dan membuat medan magnet tetap.", titik: [-0.64, 0.1, 0.25] },
  { mulai: 250, selesai: 320, judul: "Rotor & lilitan tembaga", isi: "Arus di lilitan membuat rotor menjadi elektromagnet. Magnet mendorong dan menariknya, jadi rotor berputar.", titik: [0.26, 0.25, 0.22] },
  { mulai: 395, selesai: 465, judul: "Komutator & sikat karbon", isi: "Sikat menyalurkan arus ke komutator. Komutator membalik arah arus saat rotor berputar, jadi putarannya tidak berhenti.", titik: [-0.2, 0.72, 0.05] },
  { mulai: 540, selesai: 605, judul: "Bantalan bola", isi: "Bola-bola baja kecil menahan poros sehingga rotor berputar mulus dengan gesekan kecil.", titik: [0.12, -0.72, 0.12] },
];

const KartuPoin: React.FC<{ no: number; judul: string; isi: string; o: number; dari: { x: number; y: number } }> = ({ no, judul, isi, o, dari }) => {
  const atas = 1330;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, pointerEvents: "none" }}>
      <svg width={W} height={1920} style={{ position: "absolute", inset: 0 }}>
        <polyline points={`${dari.x},${dari.y} ${dari.x},${atas - 40} 120,${atas - 40} 120,${atas}`} fill="none" stroke={TERANG} strokeWidth={2.5} opacity={0.8} />
        <circle cx={dari.x} cy={dari.y} r={9} fill={EMAS} stroke="#07111d" strokeWidth={3} />
        <circle cx={dari.x} cy={dari.y} r={22} fill="none" stroke={EMAS} strokeWidth={2} opacity={0.6} />
      </svg>
      <div
        style={{
          position: "absolute", left: 60, right: 60, top: atas, padding: "28px 34px", background: "rgba(7,17,29,0.88)",
          border: `1px solid rgba(139,201,237,0.4)`, borderLeft: `8px solid ${EMAS}`, fontFamily: FONT,
          transform: `translateY(${(1 - o) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 24, color: "#07111d", background: EMAS, padding: "4px 12px", fontWeight: 700 }}>
            POIN {no}/4
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, color: "#f2f6fa" }}>{judul}</div>
        </div>
        <div style={{ marginTop: 16, fontSize: 34, lineHeight: 1.4, color: "#c3d4e0" }}>{isi}</div>
      </div>
    </div>
  );
};

// Percikan kecil di titik sentuh sikat-komutator
const Percikan: React.FC<{ f: number; kuat: number }> = ({ f, kuat }) => {
  if (kuat < 0.02) return null;
  return (
    <>
      {[-1, 1].map((s) =>
        Array.from({ length: 6 }, (_, i) => {
          const a = i * 1.7 + f * 0.9 * (i % 2 ? 1 : -1);
          const nyala = 0.5 + 0.5 * Math.sin(f * 2.3 + i * 1.3 + s);
          return (
            <mesh key={`${s}${i}`} position={[s * 0.19 + Math.cos(a) * 0.03, 0.72 + Math.sin(a) * 0.04, Math.sin(a * 1.3) * 0.04]} scale={kuat * nyala}>
              <sphereGeometry args={[0.012, 8, 6]} />
              <meshBasicMaterial color="#bfe9ff" />
            </mesh>
          );
        }),
      )}
      <pointLight position={[0, 0.72, 0]} intensity={2.5 * kuat} distance={1.2} color="#8bc9ed" />
    </>
  );
};

export const TurMotor: React.FC = () => {
  const f = useCurrentFrame();
  const s = keadaan(f);
  const k = kamera(s);
  const pose: Pose = { pos: [0, s.objY, 0], rot: [0, s.objRot, 0] };
  const poinAktif = POIN.findIndex((p) => f >= p.mulai - 10 && f <= p.selesai + 10);
  const oPoin = poinAktif < 0 ? 0 : interpolate(f, [POIN[poinAktif].mulai - 10, POIN[poinAktif].mulai + 8, POIN[poinAktif].selesai - 6, POIN[poinAktif].selesai + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kuatPercik = interpolate(f, [385, 400, 460, 475], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const oAkhir = interpolate(f, [690, 720], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const oJudul = interpolate(f, [0, 15, 115, 135], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#07111d" }}>
      <LatarCetakBiru />
      <Kanvas k={k}>
        <CahayaStudio lantaiY={-2.95 + Math.min(0, s.objY)} />
        <group position={pose.pos} rotation={pose.rot}>
          <Motor e={s.e} putar={f * 0.03} tembus={s.tembus} />
          <Percikan f={f} kuat={kuatPercik} />
          {s.e > 0.05 && <SumbuPutus dari={[0, -2.85, 0]} ke={[0, 3.1, 0]} />}
        </group>
      </Kanvas>
      <KepalaTeknis kode="EV-02 · TUR KAMERA" font={FONT} />
      <div style={{ opacity: oJudul }}>
        <JudulTeknis kecil="PENGGERAK KIPAS & MAINAN" judul="MOTOR DC" sub="Ayo masuk dan lihat cara kerjanya" font={FONT} />
      </div>
      {poinAktif >= 0 && (
        <KartuPoin no={poinAktif + 1} judul={POIN[poinAktif].judul} isi={POIN[poinAktif].isi} o={oPoin} dari={keLayar(k, pose, POIN[poinAktif].titik)} />
      )}
      {oAkhir > 0 && (
        <div style={{ opacity: oAkhir }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: FONT }}>
            <div style={{ fontSize: 26, letterSpacing: 9, color: EMAS, fontWeight: 700 }}>SEMUA BAGIAN</div>
            <div style={{ marginTop: 8, fontSize: 76, fontWeight: 800, color: "#f2f6fa" }}>MOTOR DC</div>
          </div>
          <Sequence from={700} layout="none">
            {(() => {
              const titik = NAMA_M.map((_, i) => keLayar(k, pose, geser([ASAL_M[i][0] + TITIK_M[i][0], ASAL_M[i][1] + TITIK_M[i][1], ASAL_M[i][2] + TITIK_M[i][2]], ARAH_M[i], s.e)));
              const y = titik.map((t) => t.y);
              ([true, false] as const).forEach((kiri) => {
                const idx = titik.map((t, i) => ({ t, i })).filter((o) => (o.t.x < 540) === kiri).sort((a, b) => a.t.y - b.t.y);
                for (let j = 1; j < idx.length; j++) y[idx[j].i] = Math.max(y[idx[j].i], y[idx[j - 1].i] + 118);
              });
              return NAMA_M.map((n, i) => (
                <Penunjuk key={i} titik={titik[i]} y={y[i]} no={String(i + 1).padStart(2, "0")} nama={n.toUpperCase()} sisi={titik[i].x < 540 ? "kiri" : "kanan"} muncul={10 + i * 4} font={FONT} />
              ));
            })()}
          </Sequence>
          <DaftarBagian isi={NAMA_M} font={FONT} />
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 55, display: "flex", justifyContent: "center", gap: 14 }}>
        {POIN.map((p, i) => (
          <div key={i} style={{ width: 70, height: 6, borderRadius: 3, background: f >= p.mulai ? EMAS : "rgba(139,201,237,0.25)" }} />
        ))}
      </div>
      {oAkhir > 0 && <Catatan teks="ILUSTRASI MOTOR DC SIKAT 3 KUTUB" font={FONT} />}
      <div style={{ position: "absolute", right: 60, top: 128, fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 20, color: CYAN, opacity: 0.8 }}>
        CAM {s.jarak.toFixed(1)}m · {Math.round((s.el * 180) / Math.PI)}°
      </div>
    </AbsoluteFill>
  );
};
