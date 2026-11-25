// Contoh gaya ADRIY Scientific 3D dalam format 9:16 (1080×1920), 3 adegan: DNA, molekul air, sel hewan.
import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { DoubleSide } from "three";
import { FONT } from "../../src/components/Teks";
import {
  AKSEN, Batang, BidangPindai, Bola, Cangkang, Catatan, EMAS, HUDLab, JudulLab, Kam, Kanvas, LabelLab, LatarLab,
  Readout, TEAL, Tabung, V3, W, keLayar,
} from "./pustaka";

const putarY = (p: V3, a: number, pusat: V3 = [0, 0, 0]): V3 => {
  const x = p[0] - pusat[0], z = p[2] - pusat[2];
  return [pusat[0] + x * Math.cos(a) + z * Math.sin(a), p[1], pusat[2] - x * Math.sin(a) + z * Math.cos(a)];
};

// ---------- Adegan 1: DNA ----------
const BASA: Record<string, { pasangan: string; warna: string }> = {
  A: { pasangan: "T", warna: "#f2a65a" },
  T: { pasangan: "A", warna: "#e86b79" },
  G: { pasangan: "C", warna: "#8be08a" },
  C: { pasangan: "G", warna: "#59c7ef" },
};
const URUTAN = "ATGCGTACCGATTGCAAGTC";
const R_DNA = 0.78, NAIK = 0.21, PER_PUTARAN = 10.5, ALUR = 0.72 * Math.PI; // alur mayor/minor: untai tidak berseberangan tepat
const PUSAT_DNA: V3 = [0, -1.35, 0];

const titikDNA = (i: number, untai: 0 | 1, rot: number): V3 => {
  const a = (i / PER_PUTARAN) * Math.PI * 2 + rot + (untai ? ALUR : 0);
  return [PUSAT_DNA[0] + Math.cos(a) * R_DNA, PUSAT_DNA[1] + (i - URUTAN.length / 2) * NAIK, PUSAT_DNA[2] + Math.sin(a) * R_DNA];
};

const DNA: React.FC<{ rot: number }> = ({ rot }) => {
  const n = URUTAN.length;
  const untai = (u: 0 | 1) => {
    const t: V3[] = [];
    for (let s = -0.5; s <= n - 0.5; s += 0.25) t.push(titikDNA(s, u, rot));
    return t;
  };
  return (
    <group>
      <Tabung titik={untai(0)} r={0.075} warna="#59c7ef" emisi={0.15} />
      <Tabung titik={untai(1)} r={0.075} warna="#d7e7ef" emisi={0.08} />
      {URUTAN.split("").map((b, i) => {
        const a = titikDNA(i, 0, rot), c = titikDNA(i, 1, rot);
        const tengah: V3 = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2];
        return (
          <group key={i}>
            <Batang a={a} b={tengah} r={0.055} warna={BASA[b].warna} emisi={0.12} />
            <Batang a={tengah} b={c} r={0.055} warna={BASA[BASA[b].pasangan].warna} emisi={0.12} />
            <Bola p={a} r={0.11} warna="#9ad8f2" />
            <Bola p={c} r={0.11} warna="#e6eff5" />
          </group>
        );
      })}
    </group>
  );
};

const AdeganDNA: React.FC = () => {
  const f = useCurrentFrame();
  const rot = f * 0.018;
  const k: Kam = { pos: [0, 0.2, interpolate(f, [0, 110], [12.5, 11.5])], lihat: [0, -0.6, 0], fov: 40 };
  // ikut kemiringan heliks (rotasi Z 0.18 dan geser X 0.2) saat memproyeksikan label
  const miring = (p: V3): V3 => [p[0] * Math.cos(0.18) - p[1] * Math.sin(0.18) + 0.2, p[0] * Math.sin(0.18) + p[1] * Math.cos(0.18), p[2]];
  const tulang = keLayar(k, miring(titikDNA(15, 0, rot)));
  const basa = (() => {
    const a = titikDNA(5, 0, rot), c = titikDNA(5, 1, rot);
    return keLayar(k, miring([(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2]));
  })();
  return (
    <AbsoluteFill>
      <LatarLab />
      <Kanvas k={k}>
        <group rotation={[0, 0, 0.18]} position={[0.2, 0, 0]}>
          <DNA rot={rot} />
          <group position={PUSAT_DNA}>
            <BidangPindai lebar={2.6} dari={-2.4} ke={2.4} lama={110} />
          </group>
          <Cangkang r={1.2} warna={AKSEN} opacity={0.04} scale={[1, 2.6, 1]} position={PUSAT_DNA} />
        </group>
      </Kanvas>
      <HUDLab lab="LAB 01 · GENETIKA" font={FONT} />
      <JudulLab kecil="MOLEKUL KEHIDUPAN" judul="DNA" sub="Heliks ganda yang menyimpan kode genetikmu" top={230} font={FONT} />
      <LabelLab x={tulang.x} y={tulang.y} ke={{ x: tulang.x - 140, y: tulang.y - 330 }} teks="Tulang punggung gula-fosfat" font={FONT} muncul={15} />
      <LabelLab x={basa.x} y={basa.y} ke={{ x: basa.x - 120, y: basa.y + 40 }} teks="Pasangan basa" warna={EMAS} font={FONT} muncul={25} />
      <div style={{ position: "absolute", right: 60, top: 700, display: "flex", flexDirection: "column", gap: 10, fontFamily: FONT }}>
        {(["A", "T", "G", "C"] as const).map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: "#d6ecf7" }}>
            <div style={{ width: 30, height: 14, borderRadius: 7, background: BASA[b].warna }} />
            {b} · {{ A: "Adenin", T: "Timin", G: "Guanin", C: "Sitosin" }[b]}
          </div>
        ))}
      </div>
      <Readout bottom={120} font={FONT} baris={[{ k: "Pasangan basa per putaran", v: "≈ 10,5" }, { k: "Panjang satu putaran", v: "≈ 3,4 nm" }]} />
      <Catatan teks="MODEL KONSEPTUAL · BUKAN SKALA SEBENARNYA" font={FONT} />
    </AbsoluteFill>
  );
};

// ---------- Adegan 2: Molekul air ----------
const SUDUT = (104.5 * Math.PI) / 180;
const D_OH = 1.45;
const H1: V3 = [-Math.sin(SUDUT / 2) * D_OH, -Math.cos(SUDUT / 2) * D_OH, 0];
const H2: V3 = [Math.sin(SUDUT / 2) * D_OH, -Math.cos(SUDUT / 2) * D_OH, 0];

const Air: React.FC<{ skala?: number; opacity?: number; detail?: boolean }> = ({ skala = 1, opacity = 1, detail = false }) => (
  <group scale={skala}>
    <Batang a={[0, 0, 0]} b={H1} r={0.16} warna="#cfdbe4" opacity={opacity} />
    <Batang a={[0, 0, 0]} b={H2} r={0.16} warna="#cfdbe4" opacity={opacity} />
    <Bola p={[0, 0, 0]} r={0.66} warna="#e86b79" opacity={opacity} emisi={0.05} />
    <Bola p={H1} r={0.4} warna="#f3f7fb" opacity={opacity} />
    <Bola p={H2} r={0.4} warna="#f3f7fb" opacity={opacity} />
    {detail && (
      <>
        {/* busur sudut ikatan */}
        <mesh rotation={[0, 0, -Math.PI / 2 - SUDUT / 2]}>
          <torusGeometry args={[0.95, 0.025, 12, 64, SUDUT]} />
          <meshBasicMaterial color={EMAS} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 2 - SUDUT / 2]}>
          <circleGeometry args={[0.95, 48, 0, SUDUT]} />
          <meshBasicMaterial color={EMAS} transparent opacity={0.12} side={DoubleSide} depthWrite={false} />
        </mesh>
        {/* awan elektron */}
        <Cangkang r={1.15} warna="#ff7d8e" opacity={0.07} scale={[1, 0.95, 0.9]} position={[0, 0.1, 0]} />
        <Cangkang r={0.62} warna={AKSEN} opacity={0.08} position={H1} />
        <Cangkang r={0.62} warna={AKSEN} opacity={0.08} position={H2} />
      </>
    )}
  </group>
);

const LATAR_AIR = Array.from({ length: 9 }, (_, i) => {
  const s = Math.sin(i * 91.7) * 43758.5;
  const r = s - Math.floor(s);
  return { p: [((i % 3) - 1) * 4.2 + r * 1.2, Math.floor(i / 3) * 3.6 - 6.5 + r, -6 - r * 4] as V3, rot: r * 6, k: i };
});

const AdeganAir: React.FC = () => {
  const f = useCurrentFrame();
  const k: Kam = { pos: [0, 0, interpolate(f, [0, 110], [11, 10])], lihat: [0, -0.6, 0], fov: 40 };
  const ay = 0.35 * Math.sin(f / 40);
  const getar = 0.03 * Math.sin(f * 0.9);
  const pusat: V3 = [0, -0.6, 0];
  const proj = (p: V3) => keLayar(k, [pusat[0] + putarY(p, ay)[0], pusat[1] + p[1], pusat[2] + putarY(p, ay)[2]]);
  const o = proj([0, 0.66, 0]);
  const h2 = proj([H2[0] + 0.3, H2[1] - 0.25, H2[2]]);
  const sudut = proj([0, -0.95, 0]);
  return (
    <AbsoluteFill>
      <LatarLab />
      <Kanvas k={k}>
        {LATAR_AIR.map((m) => (
          <group key={m.k} position={m.p} rotation={[m.rot, m.rot * 0.7 + f * 0.01, m.rot * 0.3]}>
            <Air skala={0.7} opacity={0.35} />
          </group>
        ))}
        <group position={pusat} rotation={[0, ay, 0]} scale={1 + getar}>
          <Air detail />
        </group>
      </Kanvas>
      <HUDLab lab="LAB 02 · KIMIA" font={FONT} />
      <JudulLab kecil="MOLEKUL PALING PENTING" judul="H₂O" sub="Satu oksigen, dua hidrogen" top={230} font={FONT} />
      <div style={{ position: "absolute", left: o.x - 26, top: o.y - 120, fontFamily: FONT, fontSize: 52, fontWeight: 800, color: "#ff9aa7" }}>δ−</div>
      <div style={{ position: "absolute", left: h2.x - 10, top: h2.y + 10, fontFamily: FONT, fontSize: 46, fontWeight: 800, color: AKSEN }}>δ+</div>
      <LabelLab x={sudut.x} y={sudut.y} ke={{ x: sudut.x + 120, y: sudut.y + 300 }} teks="Sudut ikatan 104,5°" warna={EMAS} font={FONT} muncul={18} />
      <Readout bottom={120} font={FONT} baris={[{ k: "Sudut ikatan H–O–H", v: "104,5°" }, { k: "Panjang ikatan O–H", v: "≈ 0,096 nm" }]} />
      <Catatan teks="MODEL BOLA & BATANG · UKURAN ATOM DISEDERHANAKAN" font={FONT} />
    </AbsoluteFill>
  );
};

// ---------- Adegan 3: Sel hewan ----------
const R_SEL = 2.35;
const PUSAT_SEL: V3 = [0, -1.25, 0];

const acakSel = (i: number) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const Mitokondria: React.FC<{ p: V3; rot: V3 }> = ({ p, rot }) => (
  <group position={p} rotation={rot}>
    <mesh>
      <capsuleGeometry args={[0.17, 0.5, 12, 24]} />
      <meshPhysicalMaterial color="#f2a65a" roughness={0.35} clearcoat={0.6} />
    </mesh>
    {[-0.18, -0.06, 0.06, 0.18].map((y) => (
      <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.172, 0.018, 8, 32]} />
        <meshStandardMaterial color="#c9772f" />
      </mesh>
    ))}
  </group>
);

const Golgi: React.FC<{ p: V3; rot: V3 }> = ({ p, rot }) => (
  <group position={p} rotation={rot}>
    {[0, 1, 2, 3, 4].map((i) => (
      <mesh key={i} position={[0, i * 0.11, 0]} rotation={[Math.PI / 2, 0, 0.6]}>
        <torusGeometry args={[0.42 - i * 0.04, 0.045, 10, 48, 2.2]} />
        <meshPhysicalMaterial color="#e8c66b" roughness={0.35} clearcoat={0.5} />
      </mesh>
    ))}
  </group>
);

const Sel: React.FC<{ rot: number }> = ({ rot }) => {
  const ribosom = useMemo(
    () => Array.from({ length: 140 }, (_, i) => {
      const u = acakSel(i) * 2 - 1, t = acakSel(i + 500) * Math.PI * 2, r = (0.4 + 0.55 * acakSel(i + 900)) * R_SEL;
      const q = Math.sqrt(1 - u * u);
      return [q * Math.cos(t) * r, u * r * 0.9, q * Math.sin(t) * r] as V3;
    }).filter((p) => Math.hypot(p[0] + 0.25, p[1] - 0.1, p[2]) > 1.2),
    [],
  );
  const er = useMemo(
    () => [0, 1, 2, 3].map((j) => {
      const t: V3[] = [];
      for (let a = -1.4; a <= 1.4; a += 0.1) {
        const rr = 1.22 + j * 0.13 + 0.05 * Math.sin(a * 9 + j);
        t.push([-0.25 + Math.cos(a + 2.6) * rr, 0.1 + Math.sin(a * 1.3) * 0.5 + j * 0.05, Math.sin(a + 2.6) * rr]);
      }
      return t;
    }),
    [],
  );
  return (
    <group>
      {/* membran sel dengan potongan (cutaway) yang menghadap kamera */}
      <group rotation={[0.25, 0, 0]}>
        <mesh>
          <sphereGeometry args={[R_SEL, 96, 64, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9]} />
          <meshPhysicalMaterial color={TEAL} roughness={0.3} clearcoat={0.6} transparent opacity={0.55} side={DoubleSide} depthWrite={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[R_SEL * 0.96, 96, 64, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9]} />
          <meshStandardMaterial color="#0f3f45" transparent opacity={0.6} side={DoubleSide} depthWrite={false} />
        </mesh>
      </group>
    <group rotation={[0.25, rot, 0]}>
      {/* sitoplasma */}
      <Cangkang r={R_SEL * 0.95} warna="#3fb8c9" opacity={0.05} />
      {/* nukleus + nukleolus + pori */}
      <group position={[-0.25, 0.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.95, 64, 48]} />
          <meshPhysicalMaterial color="#a78bfa" roughness={0.3} clearcoat={0.7} />
        </mesh>
        <Bola p={[0.25, 0.15, 0.62]} r={0.32} warna="#f4b6d2" />
        {Array.from({ length: 26 }, (_, i) => {
          const u = (i / 26) * 2 - 1 + 0.03, t = i * 2.39996;
          const q = Math.sqrt(1 - u * u);
          return (
            <mesh key={i} position={[q * Math.cos(t) * 0.955, u * 0.955, q * Math.sin(t) * 0.955]}>
              <sphereGeometry args={[0.045, 10, 8]} />
              <meshStandardMaterial color="#6d4fc7" />
            </mesh>
          );
        })}
      </group>
      {/* retikulum endoplasma kasar */}
      {er.map((t, i) => (
        <Tabung key={i} titik={t} r={0.05} warna="#64a8d8" />
      ))}
      <Mitokondria p={[1.25, 0.8, 0.6]} rot={[0.3, 0, 0.9]} />
      <Mitokondria p={[1.4, -0.7, 0.9]} rot={[0.2, 0.4, -0.5]} />
      <Mitokondria p={[-0.6, -1.5, 0.9]} rot={[0.1, 0, 1.5]} />
      <Mitokondria p={[-1.6, 0.9, 0.7]} rot={[0.5, 0, -0.3]} />
      <Golgi p={[0.85, -0.25, 1.35]} rot={[0.3, -0.4, 0]} />
      {[[1.7, 0.1, -0.3], [-1.3, -0.9, -0.6], [0.3, 1.6, 0.5]].map((p, i) => (
        <Bola key={i} p={p as V3} r={0.17} warna="#8be08a" />
      ))}
      {ribosom.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color="#20384c" />
        </mesh>
      ))}
    </group>
    </group>
  );
};

const AdeganSel: React.FC = () => {
  const f = useCurrentFrame();
  const rot = -0.5 + f * 0.004;
  const k: Kam = { pos: [0, 1.6, interpolate(f, [0, 110], [12.2, 11.4])], lihat: [0, -0.9, 0], fov: 42 };
  const ubah = (p: V3): V3 => {
    // rotasi grup sel: X 0.25 lalu Y rot
    const cx = Math.cos(0.25), sx = Math.sin(0.25);
    const y1 = p[1] * cx - p[2] * sx, z1 = p[1] * sx + p[2] * cx;
    const r = putarY([p[0], y1, z1], rot);
    return [PUSAT_SEL[0] + r[0], PUSAT_SEL[1] + r[1], PUSAT_SEL[2] + r[2]];
  };
  const nuk = keLayar(k, ubah([-0.6, 0.6, 0.6]));
  const mito = keLayar(k, ubah([1.25, 0.8, 0.6]));
  const golgi = keLayar(k, ubah([0.85, -0.1, 1.35]));
  const mem = keLayar(k, [PUSAT_SEL[0] - R_SEL * 0.86, PUSAT_SEL[1] - R_SEL * 0.35, 0.9]);
  return (
    <AbsoluteFill>
      <LatarLab />
      <Kanvas k={k}>
        <group position={PUSAT_SEL}>
          <Sel rot={rot} />
        </group>
      </Kanvas>
      <HUDLab lab="LAB 03 · BIOLOGI SEL" font={FONT} />
      <JudulLab kecil="UNIT TERKECIL KEHIDUPAN" judul="SEL HEWAN" sub="Tubuhmu tersusun dari sekitar 30 triliun sel" top={230} font={FONT} />
      <LabelLab x={nuk.x} y={nuk.y} ke={{ x: 330, y: nuk.y - 230 }} teks="Nukleus" warna="#c4b1ff" font={FONT} muncul={10} />
      <LabelLab x={mito.x} y={mito.y} ke={{ x: W - 300, y: mito.y - 200 }} teks="Mitokondria" warna="#f2a65a" font={FONT} muncul={18} />
      <LabelLab x={golgi.x} y={golgi.y} ke={{ x: W - 320, y: golgi.y + 230 }} teks="Badan Golgi" warna="#e8c66b" font={FONT} muncul={26} />
      <LabelLab x={mem.x} y={mem.y} ke={{ x: 300, y: mem.y + 230 }} teks="Membran sel" warna={TEAL} font={FONT} muncul={34} />
      <Readout bottom={120} font={FONT} baris={[{ k: "Diameter sel hewan", v: "10–30 µm" }, { k: "Jumlah sel tubuh manusia", v: "± 30 triliun" }]} />
      <Catatan teks="MODEL KONSEPTUAL · UKURAN ORGANEL DISEDERHANAKAN" font={FONT} />
    </AbsoluteFill>
  );
};

export const ContohScientific: React.FC = () => (
  <AbsoluteFill style={{ background: "#061321" }}>
    <Sequence durationInFrames={110}>
      <AdeganDNA />
    </Sequence>
    <Sequence from={110} durationInFrames={110}>
      <AdeganAir />
    </Sequence>
    <Sequence from={220} durationInFrames={110}>
      <AdeganSel />
    </Sequence>
  </AbsoluteFill>
);
