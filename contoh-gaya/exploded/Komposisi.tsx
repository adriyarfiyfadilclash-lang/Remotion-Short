// Contoh gaya ADRIY Exploded View dalam format 9:16 (1080×1920), 3 adegan: smartphone, motor listrik DC, lampu LED.
import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { CanvasTexture, DoubleSide, ExtrudeGeometry, Shape, Path, SRGBColorSpace } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { FONT } from "../../src/components/Teks";
import {
  CahayaStudio, Catatan, DaftarBagian, JudulTeknis, Kam, Kanvas, KepalaTeknis, LatarCetakBiru, Penunjuk, Pose,
  SumbuPutus, V3, geser, keLayar, useBongkar,
} from "./pustaka";

const Logam: React.FC<{ warna: string; kasar?: number; logam?: number }> = ({ warna, kasar = 0.28, logam = 0.85 }) => (
  <meshStandardMaterial color={warna} metalness={logam} roughness={kasar} />
);

const KotakBulat: React.FC<{ ukuran: V3; r: number; children: React.ReactNode; position?: V3 }> = ({ ukuran, r, children, position }) => {
  const g = useMemo(() => new RoundedBoxGeometry(ukuran[0], ukuran[1], ukuran[2], 4, r), [ukuran, r]);
  return (
    <mesh geometry={g} position={position}>
      {children}
    </mesh>
  );
};

// ---------- Adegan 1: Smartphone ----------
const PersegiBulat = (w: number, h: number, r: number, s: Shape | Path) => {
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
};

const Rangka: React.FC = () => {
  const g = useMemo(() => {
    const luar = PersegiBulat(1.56, 3.06, 0.2, new Shape()) as Shape;
    luar.holes.push(PersegiBulat(1.42, 2.92, 0.16, new Path()) as Path);
    const e = new ExtrudeGeometry(luar, { depth: 0.12, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 3, curveSegments: 16 });
    e.rotateX(-Math.PI / 2);
    return e;
  }, []);
  return (
    <mesh geometry={g}>
      <Logam warna="#b7c7d2" kasar={0.22} />
    </mesh>
  );
};

let teksturLayar: CanvasTexture | null = null;
const ambilLayar = () => {
  if (teksturLayar || typeof document === "undefined") return teksturLayar;
  const k = document.createElement("canvas");
  k.width = 256;
  k.height = 512;
  const c = k.getContext("2d")!;
  const g = c.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, "#3b2ea8");
  g.addColorStop(0.5, "#1f6fd1");
  g.addColorStop(1, "#16c2c9");
  c.fillStyle = g;
  c.fillRect(0, 0, 256, 512);
  c.fillStyle = "rgba(255,255,255,0.85)";
  c.font = "bold 54px sans-serif";
  c.textAlign = "center";
  c.fillText("09:41", 128, 120);
  for (let i = 0; i < 12; i++) {
    c.fillStyle = `rgba(255,255,255,${0.25 + (i % 3) * 0.12})`;
    c.beginPath();
    c.roundRect(28 + (i % 4) * 54, 230 + Math.floor(i / 4) * 64, 40, 40, 10);
    c.fill();
  }
  teksturLayar = new CanvasTexture(k);
  teksturLayar.colorSpace = SRGBColorSpace;
  return teksturLayar;
};

const ASAL_HP: V3[] = [[0, 0, 0], [0, 0.06, 0.55], [0, 0.06, -0.95], [-0.38, 0.11, -1.1], [0, 0.0, 0], [0, 0.15, 0], [0, 0.18, 0]];
const ARAH_HP: V3[] = [[0, 0, 0], [0, 0.6, 0], [0, 1.15, 0], [0, 1.75, 0], [0, 2.25, 0], [0, 2.8, 0], [0, 3.3, 0]];
const NAMA_HP = ["Kaca belakang", "Baterai", "Papan sirkuit", "Modul kamera", "Rangka aluminium", "Layar OLED", "Kaca depan"];
const TITIK_HP: V3[] = [[0.75, 0.02, 1.5], [0.6, 0.05, 0.55], [0.65, 0.02, -0.95], [0.2, 0.08, 0.1], [0.78, 0.06, 1.5], [-0.73, 0.02, 1.45], [0.75, 0.01, -1.5]];

const Smartphone: React.FC<{ e: number }> = ({ e }) => {
  const layar = ambilLayar();
  const p = (i: number) => geser(ASAL_HP[i], ARAH_HP[i], e);
  return (
    <group>
      <group position={p(0)}>
        <KotakBulat ukuran={[1.5, 0.04, 3.0]} r={0.02}>
          <meshPhysicalMaterial color="#1c2a38" roughness={0.12} clearcoat={1} metalness={0.2} />
        </KotakBulat>
        <KotakBulat ukuran={[0.62, 0.04, 0.62]} r={0.02} position={[-0.38, -0.03, -1.1]}>
          <meshPhysicalMaterial color="#243546" roughness={0.2} clearcoat={1} />
        </KotakBulat>
      </group>
      <group position={p(1)}>
        <KotakBulat ukuran={[1.22, 0.09, 1.75]} r={0.03}>
          <meshStandardMaterial color="#2e3a46" roughness={0.6} />
        </KotakBulat>
        <mesh position={[0, 0.047, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshStandardMaterial color="#e8b65d" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>
      <group position={p(2)}>
        <mesh>
          <boxGeometry args={[1.3, 0.03, 0.85]} />
          <meshStandardMaterial color="#0e3d33" roughness={0.5} />
        </mesh>
        {[[-0.25, 0.25, 0.32, 0.28], [0.3, -0.1, 0.36, 0.3], [0.35, 0.25, 0.18, 0.16], [-0.05, -0.25, 0.22, 0.14]].map(([x, z, w, d], i) => (
          <mesh key={i} position={[x, 0.035, z]}>
            <boxGeometry args={[w, 0.04, d]} />
            <meshStandardMaterial color={i === 1 ? "#c8d2da" : "#11161c"} metalness={i === 1 ? 0.9 : 0.2} roughness={0.3} />
          </mesh>
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <mesh key={i} position={[-0.6 + i * 0.09, 0.02, 0.38]}>
            <boxGeometry args={[0.04, 0.01, 0.05]} />
            <meshStandardMaterial color="#e8b65d" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}
      </group>
      <group position={p(3)}>
        <KotakBulat ukuran={[0.5, 0.1, 0.5]} r={0.03}>
          <meshStandardMaterial color="#20272e" roughness={0.4} />
        </KotakBulat>
        {[[-0.11, -0.11], [0.11, -0.11], [-0.11, 0.11]].map(([x, z], i) => (
          <group key={i} position={[x, 0.07, z]}>
            <mesh>
              <cylinderGeometry args={[0.085, 0.085, 0.06, 32]} />
              <Logam warna="#9eb7c8" kasar={0.15} />
            </mesh>
            <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.06, 32]} />
              <meshPhysicalMaterial color="#0b1220" roughness={0.05} clearcoat={1} metalness={0.5} />
            </mesh>
          </group>
        ))}
      </group>
      <group position={p(4)}>
        <Rangka />
      </group>
      <group position={p(5)}>
        <KotakBulat ukuran={[1.44, 0.03, 2.94]} r={0.012}>
          <meshStandardMaterial map={layar ?? undefined} emissive="#ffffff" emissiveMap={layar ?? undefined} emissiveIntensity={0.55} roughness={0.4} />
        </KotakBulat>
      </group>
      <group position={p(6)}>
        <KotakBulat ukuran={[1.5, 0.025, 3.0]} r={0.012}>
          <meshPhysicalMaterial color="#cfe8ff" roughness={0.02} clearcoat={1} transparent opacity={0.28} metalness={0.1} />
        </KotakBulat>
      </group>
    </group>
  );
};

// ---------- Adegan 2: Motor listrik DC ----------
const SektorMagnet: React.FC<{ sudut: number; warna: string }> = ({ sudut, warna }) => {
  const g = useMemo(() => {
    const s = new Shape();
    s.absarc(0, 0, 0.7, -0.9, 0.9, false);
    s.absarc(0, 0, 0.56, 0.9, -0.9, true);
    const e = new ExtrudeGeometry(s, { depth: 0.9, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, curveSegments: 32 });
    e.translate(0, 0, -0.45);
    e.rotateX(Math.PI / 2);
    return e;
  }, []);
  return (
    <mesh geometry={g} rotation={[0, sudut, 0]}>
      <meshStandardMaterial color={warna} metalness={0.4} roughness={0.45} />
    </mesh>
  );
};

const ASAL_M: V3[] = [[0, 0.82, 0], [0, 0.6, 0], [0, 0.55, 0], [0, 0, 0], [0, 0, 0], [0, -0.05, 0]];
const ARAH_M: V3[] = [[0, 2.1, 0], [0, 1.55, 0], [0, 1.0, 0], [0, 0.15, 0], [0, -0.85, 0], [0, -1.75, 0]];
const NAMA_M = ["Tutup belakang", "Sikat karbon", "Komutator", "Rotor & lilitan", "Magnet permanen", "Rumah motor"];
const TITIK_M: V3[] = [[0.78, 0.0, 0], [-0.32, 0.1, 0], [0.17, 0.0, 0], [0.62, 0.0, 0], [-0.75, 0.0, 0.2], [0.76, -0.3, 0]];

const Motor: React.FC<{ e: number; putar: number }> = ({ e, putar }) => {
  const p = (i: number) => geser(ASAL_M[i], ARAH_M[i], e);
  const sikat = 0.32 + 0.35 * e;
  return (
    <group>
      {/* 01 tutup belakang */}
      <group position={p(0)}>
        <mesh>
          <cylinderGeometry args={[0.78, 0.78, 0.12, 64]} />
          <meshStandardMaterial color="#1d2630" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.04, 16, 48]} />
          <Logam warna="#d5e1eb" kasar={0.15} />
        </mesh>
        {[-0.45, 0.45].map((x) => (
          <mesh key={x} position={[x, 0.08, 0.3]}>
            <boxGeometry args={[0.12, 0.05, 0.22]} />
            <Logam warna="#e5b765" kasar={0.25} />
          </mesh>
        ))}
      </group>
      {/* 02 sikat karbon + pegas */}
      <group position={p(1)}>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * sikat, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.16, 0.14, 0.14]} />
              <meshStandardMaterial color="#2b2b2e" roughness={0.9} />
            </mesh>
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} position={[s * (0.12 + i * 0.035), 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.045, 0.008, 8, 24]} />
                <Logam warna="#d5e1eb" kasar={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      {/* 03 komutator */}
      <group position={p(2)} rotation={[0, putar, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <cylinderGeometry args={[0.17, 0.17, 0.26, 32, 1, false, (i * 2 * Math.PI) / 3 + 0.08, (2 * Math.PI) / 3 - 0.16]} />
            <Logam warna="#d9894a" kasar={0.22} />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.27, 24]} />
          <meshStandardMaterial color="#1d2630" />
        </mesh>
      </group>
      {/* 04 rotor: poros, inti berlapis, lilitan tembaga */}
      <group position={p(3)} rotation={[0, putar, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 2.4, 24]} />
          <Logam warna="#e5edf4" kasar={0.12} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, (i * 2 * Math.PI) / 3, 0]}>
            <mesh position={[0.25, 0, 0]}>
              <boxGeometry args={[0.36, 0.7, 0.16]} />
              <Logam warna="#4f5d6a" kasar={0.4} logam={0.7} />
            </mesh>
            <mesh position={[0.47, 0, 0]}>
              <boxGeometry args={[0.07, 0.72, 0.5]} />
              <Logam warna="#4f5d6a" kasar={0.4} logam={0.7} />
            </mesh>
            {Array.from({ length: 9 }, (_, j) => (
              <mesh key={j} position={[0.25, -0.28 + j * 0.07, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.62, 1]}>
                <torusGeometry args={[0.13, 0.03, 10, 28]} />
                <Logam warna="#c8743a" kasar={0.25} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      {/* 05 magnet permanen (N & S) */}
      <group position={p(4)}>
        <group position={[-0.5 * e, 0, 0]}>
          <SektorMagnet sudut={Math.PI} warna="#c0434f" />
        </group>
        <group position={[0.5 * e, 0, 0]}>
          <SektorMagnet sudut={0} warna="#3f6fb3" />
        </group>
      </group>
      {/* 06 rumah motor */}
      <group position={p(5)}>
        <mesh>
          <cylinderGeometry args={[0.76, 0.76, 1.2, 72, 1, true]} />
          <meshStandardMaterial color="#9eb7c8" metalness={0.9} roughness={0.25} side={DoubleSide} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.76, 0.7, 0.08, 72]} />
          <Logam warna="#8eb6cf" kasar={0.25} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.95, -0.6, 0]}>
            <boxGeometry args={[0.4, 0.05, 0.3]} />
            <Logam warna="#8eb6cf" kasar={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ---------- Adegan 3: Lampu LED ----------
const ASAL_L: V3[] = [[0, 0.62, 0], [0, 0.6, 0], [0, 0, 0], [0, -0.1, 0], [0, -0.68, 0], [0, -1.02, 0]];
const ARAH_L: V3[] = [[0, 1.4, 0], [0, 0.85, 0], [0, 0, 0], [-0.95, -0.95, 0.3], [0, -0.95, 0], [0, -1.6, 0]];
const NAMA_L = ["Kubah kaca", "Papan LED", "Pendingin", "Driver", "Fitting E27", "Kontak dasar"];
const TITIK_L: V3[] = [[0.6, 0.55, 0.3], [0.55, 0.05, 0.3], [0.62, 0.15, 0.2], [-0.2, 0.2, 0.05], [0.3, 0.0, 0.1], [0.1, -0.05, 0.05]];

const LampuLED: React.FC<{ e: number }> = ({ e }) => {
  const p = (i: number) => geser(ASAL_L[i], ARAH_L[i], e);
  const nyala = 0.4 + 2.2 * e;
  return (
    <group>
      <group position={p(0)}>
        <mesh>
          <sphereGeometry args={[0.95, 64, 48, 0, Math.PI * 2, 0, 2.05]} />
          <meshPhysicalMaterial color="#f4f7fa" roughness={0.35} transmission={0.6} thickness={0.2} transparent opacity={0.55} side={DoubleSide} />
        </mesh>
      </group>
      <group position={p(1)}>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.05, 64]} />
          <Logam warna="#e5edf4" kasar={0.3} logam={0.6} />
        </mesh>
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const r = i === 8 ? 0 : 0.45;
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0.045, Math.sin(a) * r]}>
              <boxGeometry args={[0.14, 0.04, 0.14]} />
              <meshStandardMaterial color="#ffd66b" emissive="#ffcc66" emissiveIntensity={nyala} />
            </mesh>
          );
        })}
      </group>
      <group position={p(2)}>
        <mesh>
          <cylinderGeometry args={[0.72, 0.42, 0.95, 64]} />
          <Logam warna="#d2dde6" kasar={0.35} logam={0.75} />
        </mesh>
        {Array.from({ length: 18 }, (_, i) => (
          <group key={i} rotation={[0, (i / 18) * Math.PI * 2, 0]}>
            <mesh position={[0.6, 0, 0]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.14, 0.92, 0.025]} />
              <Logam warna="#c4d1db" kasar={0.3} logam={0.8} />
            </mesh>
          </group>
        ))}
      </group>
      <group position={p(3)}>
        <mesh>
          <boxGeometry args={[0.5, 0.62, 0.03]} />
          <meshStandardMaterial color="#0e3d33" roughness={0.5} />
        </mesh>
        {[[-0.12, 0.1, 0.09, 0.22, "#2a55a0"], [0.12, 0.15, 0.06, 0.14, "#1d1d22"], [0.05, -0.15, 0.05, 0.1, "#e8b65d"]].map(([x, y, r, h, c], i) => (
          <mesh key={i} position={[x as number, y as number, 0.07 + (r as number)]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[r as number, r as number, h as number, 24]} />
            <meshStandardMaterial color={c as string} metalness={0.3} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[-0.05, -0.2, 0.03]}>
          <boxGeometry args={[0.16, 0.1, 0.03]} />
          <meshStandardMaterial color="#11161c" />
        </mesh>
      </group>
      <group position={p(4)}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.55, 48]} />
          <Logam warna="#cfd8df" kasar={0.18} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[0, -0.2 + i * 0.1, 0]} rotation={[Math.PI / 2, 0.08, 0]}>
            <torusGeometry args={[0.3, 0.035, 12, 48]} />
            <Logam warna="#e5edf4" kasar={0.15} />
          </mesh>
        ))}
      </group>
      <group position={p(5)}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.15, 0.14, 32]} />
          <meshStandardMaterial color="#14181d" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.09, 24, 16]} />
          <Logam warna="#e8b65d" kasar={0.2} />
        </mesh>
      </group>
    </group>
  );
};

// ---------- Kerangka adegan ----------
type Def = {
  kode: string; kecil: string; judul: string; sub: string; nama: string[]; titik: V3[]; asal: V3[]; arah: V3[];
  kam: Kam; pose: (f: number) => Pose; lantaiY: number; catatan: string;
  objek: (e: number, f: number) => React.ReactNode; sumbu: [V3, V3];
};

const Adegan: React.FC<{ d: Def }> = ({ d }) => {
  const f = useCurrentFrame();
  const e = useBongkar(8, 60);
  const pose = d.pose(f);
  const titik = d.nama.map((_, i) => keLayar(d.kam, pose, geser([d.asal[i][0] + d.titik[i][0], d.asal[i][1] + d.titik[i][1], d.asal[i][2] + d.titik[i][2]], d.arah[i], e)));
  // label dibagi kiri/kanan sesuai posisi titik di layar
  return (
    <AbsoluteFill>
      <LatarCetakBiru />
      <Kanvas k={d.kam}>
        <CahayaStudio lantaiY={d.lantaiY} />
        <group position={pose.pos} rotation={pose.rot}>
          {d.objek(e, f)}
          <SumbuPutus dari={d.sumbu[0]} ke={d.sumbu[1]} />
        </group>
      </Kanvas>
      <KepalaTeknis kode={d.kode} font={FONT} />
      <JudulTeknis kecil={d.kecil} judul={d.judul} sub={d.sub} font={FONT} />
      {(() => {
        // label dibagi kiri/kanan; jarak tegak minimal 130 px agar tidak bertumpuk
        const y: number[] = titik.map((t) => t.y);
        (["kiri", "kanan"] as const).forEach((sisi) => {
          const idx = titik.map((t, i) => ({ t, i })).filter((o) => (o.t.x < 540) === (sisi === "kiri")).sort((a, b) => a.t.y - b.t.y);
          for (let j = 1; j < idx.length; j++) y[idx[j].i] = Math.max(y[idx[j].i], y[idx[j - 1].i] + 130);
        });
        return titik.map((t, i) => (
          <Penunjuk key={i} titik={t} y={y[i]} no={String(i + 1).padStart(2, "0")} nama={d.nama[i].toUpperCase()} sisi={t.x < 540 ? "kiri" : "kanan"} muncul={40 + i * 5} font={FONT} />
        ));
      })()}
      <DaftarBagian isi={d.nama} font={FONT} />
      <Catatan teks={d.catatan} font={FONT} />
    </AbsoluteFill>
  );
};

const ADEGAN: Def[] = [
  {
    kode: "EV-01 · GADGET", kecil: "APA ISI DALAMNYA?", judul: "SMARTPHONE", sub: "7 lapisan dalam tubuh setipis 8 mm",
    nama: NAMA_HP, titik: TITIK_HP, asal: ASAL_HP, arah: ARAH_HP, lantaiY: -0.15, catatan: "ILUSTRASI · TATA LETAK BERBEDA TIAP MODEL",
    kam: { pos: [5.2, 9.0, 10.6], lihat: [0, 1.25, 0], fov: 38 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, -0.55 + f * 0.0015, 0] }),
    objek: (e) => <Smartphone e={e} />, sumbu: [[0.95, 0, 1.6], [0.95, 3.4, 1.6]],
  },
  {
    kode: "EV-02 · MESIN", kecil: "PENGGERAK KIPAS & MAINAN", judul: "MOTOR DC", sub: "Listrik + magnet = putaran",
    nama: NAMA_M, titik: TITIK_M, asal: ASAL_M, arah: ARAH_M, lantaiY: -2.0, catatan: "ILUSTRASI MOTOR DC SIKAT 3 KUTUB",
    kam: { pos: [4.4, 4.8, 10.2], lihat: [0, 0.35, 0], fov: 42 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, 0.35 + f * 0.0015, 0] }),
    objek: (e, f) => <Motor e={e} putar={f * 0.05} />, sumbu: [[0, -1.9, 0], [0, 3.1, 0]],
  },
  {
    kode: "EV-03 · RUMAH", kecil: "HEMAT ENERGI", judul: "LAMPU LED", sub: "Bukan sekadar bohlam biasa",
    nama: NAMA_L, titik: TITIK_L, asal: ASAL_L, arah: ARAH_L, lantaiY: -2.75, catatan: "ILUSTRASI · KOMPONEN DISEDERHANAKAN",
    kam: { pos: [4.0, 4.6, 10.8], lihat: [0, 0.2, 0], fov: 42 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, 0.3 + f * 0.0015, 0] }),
    objek: (e) => <LampuLED e={e} />, sumbu: [[0, -2.6, 0], [0, 2.6, 0]],
  },
];

export const ContohExploded: React.FC = () => (
  <AbsoluteFill style={{ background: "#07111d" }}>
    {ADEGAN.map((d, i) => (
      <Sequence key={i} from={i * 110} durationInFrames={110}>
        <Adegan d={d} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
