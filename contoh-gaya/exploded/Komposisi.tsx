// Contoh gaya ADRIY Exploded View dalam format 9:16 (1080×1920), 3 adegan detail:
// smartphone (9 bagian), motor listrik DC (8 bagian), lampu LED (8 bagian).
import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { CanvasTexture, DoubleSide, ExtrudeGeometry, Path, SRGBColorSpace, Shape } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { FONT } from "../../src/components/Teks";
import {
  CahayaStudio, Catatan, DaftarBagian, JudulTeknis, Kam, Kanvas, KepalaTeknis, LatarCetakBiru, Penunjuk, Pose,
  SumbuPutus, Tembus, V3, geser, keLayar, useBongkar,
} from "./pustaka";
import {
  BantalanBola, Bubut, Heliks, Kabel, Lilitan, Sekrup, SpiralDatar, teksturBaterai, teksturGrill, teksturLaminasi, teksturPCB,
} from "./detail";

const Logam: React.FC<{ warna: string; kasar?: number; logam?: number }> = ({ warna, kasar = 0.28, logam = 0.9 }) => (
  <meshStandardMaterial color={warna} metalness={logam} roughness={kasar} />
);
const Plastik: React.FC<{ warna: string; kasar?: number }> = ({ warna, kasar = 0.55 }) => <meshStandardMaterial color={warna} roughness={kasar} metalness={0.05} />;

const KotakBulat: React.FC<{ ukuran: V3; r: number; children: React.ReactNode; position?: V3; rotation?: V3 }> = ({ ukuran, r, children, position, rotation }) => {
  const g = useMemo(() => new RoundedBoxGeometry(ukuran[0], ukuran[1], ukuran[2], 4, r), [ukuran, r]);
  return (
    <mesh geometry={g} position={position} rotation={rotation}>
      {children}
    </mesh>
  );
};

const PersegiBulat = <T extends Shape | Path>(w: number, h: number, r: number, s: T): T => {
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

// ======================= SMARTPHONE =======================
let teksturLayar: CanvasTexture | null = null;
const ambilLayar = () => {
  if (teksturLayar || typeof document === "undefined") return teksturLayar;
  const k = document.createElement("canvas");
  k.width = 512;
  k.height = 1024;
  const c = k.getContext("2d")!;
  const g = c.createLinearGradient(0, 0, 512, 1024);
  g.addColorStop(0, "#2a1f7a");
  g.addColorStop(0.45, "#1f6fd1");
  g.addColorStop(1, "#13c2b4");
  c.fillStyle = g;
  c.fillRect(0, 0, 512, 1024);
  c.fillStyle = "rgba(255,255,255,0.92)";
  c.font = "bold 110px sans-serif";
  c.textAlign = "center";
  c.fillText("09:41", 256, 230);
  c.font = "36px sans-serif";
  c.fillText("Selasa, 25 November", 256, 290);
  for (let i = 0; i < 16; i++) {
    c.fillStyle = `hsla(${(i * 47) % 360},70%,${62 + (i % 3) * 6}%,0.9)`;
    c.beginPath();
    c.roundRect(46 + (i % 4) * 110, 420 + Math.floor(i / 4) * 125, 84, 84, 22);
    c.fill();
  }
  c.fillStyle = "rgba(255,255,255,0.25)";
  c.beginPath();
  c.roundRect(40, 900, 432, 96, 40);
  c.fill();
  teksturLayar = new CanvasTexture(k);
  teksturLayar.colorSpace = SRGBColorSpace;
  return teksturLayar;
};

const Rangka: React.FC = () => {
  const g = useMemo(() => {
    const luar = PersegiBulat(1.56, 3.06, 0.22, new Shape());
    luar.holes.push(PersegiBulat(1.44, 2.94, 0.18, new Path()));
    const e = new ExtrudeGeometry(luar, { depth: 0.13, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 4, curveSegments: 24 });
    e.rotateX(-Math.PI / 2);
    return e;
  }, []);
  return (
    <group>
      <mesh geometry={g}>
        <Logam warna="#aab8c4" kasar={0.18} />
      </mesh>
      {/* jalur antena (pita plastik di rangka) */}
      {[[-0.79, -0.9], [0.79, -0.9], [-0.79, 1.05], [0.79, 1.05]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.07, z]}>
          <boxGeometry args={[0.03, 0.15, 0.03]} />
          <Plastik warna="#2b3440" />
        </mesh>
      ))}
      {/* tombol volume & daya */}
      {[[-0.8, -0.55, 0.28], [-0.8, -0.2, 0.28], [0.8, -0.4, 0.4]].map(([x, z, l], i) => (
        <KotakBulat key={i} ukuran={[0.05, 0.07, l]} r={0.02} position={[x, 0.065, z]}>
          <Logam warna="#c9d3db" kasar={0.2} />
        </KotakBulat>
      ))}
      {/* baki SIM */}
      <mesh position={[0.79, 0.065, 0.55]}>
        <boxGeometry args={[0.02, 0.05, 0.4]} />
        <Logam warna="#7e8d99" kasar={0.3} />
      </mesh>
      {/* lubang USB-C & speaker di sisi bawah */}
      <KotakBulat ukuran={[0.28, 0.06, 0.03]} r={0.025} position={[0, 0.065, 1.54]}>
        <meshStandardMaterial color="#05080b" />
      </KotakBulat>
      {[-0.42, -0.34, -0.26, 0.26, 0.34, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.065, 1.545]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 12]} />
          <meshStandardMaterial color="#05080b" />
        </mesh>
      ))}
    </group>
  );
};

const Lensa: React.FC<{ p: V3; r: number }> = ({ p, r }) => (
  <group position={p}>
    <mesh>
      <cylinderGeometry args={[r, r, 0.08, 40]} />
      <Logam warna="#9eb7c8" kasar={0.12} />
    </mesh>
    <mesh position={[0, 0.045, 0]}>
      <cylinderGeometry args={[r * 0.82, r * 0.82, 0.01, 40]} />
      <meshStandardMaterial color="#05080b" />
    </mesh>
    <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[r * 0.55, 40]} />
      <meshPhysicalMaterial color="#1b2a6b" roughness={0.02} clearcoat={1} metalness={0.6} iridescence={1} iridescenceIOR={1.6} />
    </mesh>
  </group>
);

const ASAL_HP: V3[] = [[0, 0, 0], [0, 0.04, 0.2], [0, 0.07, 0.42], [0.05, 0.06, -0.9], [-0.38, 0.13, -1.12], [0, 0.06, 1.3], [0, 0, 0], [0, 0.15, 0], [0, 0.185, 0]];
const ARAH_HP: V3[] = [[0, 0, 0], [0, 0.5, 0], [0, 1.0, 0], [0, 1.5, 0], [0, 2.0, 0], [0, 1.2, 0.8], [0, 2.5, 0], [0, 3.0, 0], [0, 3.45, 0]];
const NAMA_HP = ["Kaca belakang", "Koil pengisian nirkabel", "Baterai", "Papan sirkuit utama", "Modul kamera", "Speaker & port USB-C", "Rangka aluminium", "Layar OLED", "Kaca depan"];
const TITIK_HP: V3[] = [[0.74, 0.02, 1.2], [0.42, 0.0, 0.0], [0.6, 0.06, 0.3], [0.62, 0.03, 0.0], [0.24, 0.1, 0.0], [-0.5, 0.06, 0.05], [-0.8, 0.07, 1.0], [0.72, 0.02, 1.4], [-0.74, 0.01, -1.4]];

const Smartphone: React.FC<{ e: number }> = ({ e }) => {
  const layar = ambilLayar();
  const pcb = teksturPCB();
  const bat = teksturBaterai();
  const grill = teksturGrill();
  const p = (i: number) => geser(ASAL_HP[i], ARAH_HP[i], e);
  return (
    <group>
      {/* 01 kaca belakang + tonjolan kamera + flash */}
      <group position={p(0)}>
        <KotakBulat ukuran={[1.5, 0.045, 3.0]} r={0.02}>
          <meshPhysicalMaterial color="#26384a" roughness={0.35} clearcoat={1} clearcoatRoughness={0.05} metalness={0.15} />
        </KotakBulat>
        <KotakBulat ukuran={[0.64, 0.05, 0.64]} r={0.05} position={[-0.38, -0.035, -1.12]}>
          <meshPhysicalMaterial color="#1c2a38" roughness={0.12} clearcoat={1} metalness={0.3} />
        </KotakBulat>
        {[[-0.5, -1.24], [-0.26, -1.24], [-0.5, -1.0]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.065, z]} rotation={[Math.PI, 0, 0]}>
            <torusGeometry args={[0.095, 0.012, 10, 40]} />
            <Logam warna="#c9d3db" kasar={0.15} />
          </mesh>
        ))}
      </group>
      {/* 02 koil pengisian nirkabel + lembar ferit + konektor */}
      <group position={p(1)}>
        <mesh>
          <boxGeometry args={[0.95, 0.012, 0.95]} />
          <Plastik warna="#15191e" kasar={0.8} />
        </mesh>
        <group position={[0, 0.018, 0]}>
          <SpiralDatar rDalam={0.12} rLuar={0.42} putaran={11} tebal={0.011} />
        </group>
        <mesh position={[0.48, 0.01, -0.42]}>
          <boxGeometry args={[0.16, 0.012, 0.3]} />
          <meshStandardMaterial color="#d49a3a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
      {/* 03 baterai berstiker + konektor flex */}
      <group position={p(2)}>
        <KotakBulat ukuran={[1.24, 0.1, 1.72]} r={0.035}>
          <meshStandardMaterial color="#1b222b" roughness={0.6} />
        </KotakBulat>
        <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.12, 1.6]} />
          <meshStandardMaterial map={bat ?? undefined} roughness={0.5} />
        </mesh>
        <mesh position={[0.35, 0.03, -0.92]}>
          <boxGeometry args={[0.18, 0.012, 0.2]} />
          <meshStandardMaterial color="#d49a3a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
      {/* 04 papan sirkuit utama: PCB bertekstur, SoC, tutup pelindung, konektor, sekrup */}
      <group position={p(3)}>
        <mesh>
          <boxGeometry args={[1.32, 0.03, 0.95]} />
          <meshStandardMaterial map={pcb ?? undefined} roughness={0.55} />
        </mesh>
        <KotakBulat ukuran={[0.42, 0.06, 0.38]} r={0.01} position={[0.28, 0.045, 0.1]}>
          <Logam warna="#d5dde3" kasar={0.25} />
        </KotakBulat>
        <KotakBulat ukuran={[0.26, 0.05, 0.26]} r={0.008} position={[0.28, 0.09, 0.1]}>
          <meshStandardMaterial color="#14181d" roughness={0.35} />
        </KotakBulat>
        <KotakBulat ukuran={[0.3, 0.05, 0.22]} r={0.01} position={[-0.25, 0.04, 0.27]}>
          <Logam warna="#c3ccd3" kasar={0.3} />
        </KotakBulat>
        {[[0.08, -0.3, 0.18, 0.1], [0.45, -0.32, 0.12, 0.08], [-0.48, 0.25, 0.08, 0.14]].map(([x, z, w, d], i) => (
          <mesh key={i} position={[x, 0.035, z]}>
            <boxGeometry args={[w, 0.035, d]} />
            <meshStandardMaterial color="#11161c" roughness={0.4} />
          </mesh>
        ))}
        {[[-0.55, -0.38], [0.58, -0.4], [0.58, 0.38]].map(([x, z], i) => (
          <Sekrup key={i} p={[x, 0.03, z]} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[-0.3 + i * 0.05, 0.025, -0.4]}>
            <boxGeometry args={[0.025, 0.02, 0.06]} />
            <Logam warna="#e8b65d" kasar={0.2} />
          </mesh>
        ))}
      </group>
      {/* 05 modul kamera: 3 lensa + flash + kabel flex */}
      <group position={p(4)}>
        <KotakBulat ukuran={[0.56, 0.12, 0.56]} r={0.04}>
          <meshStandardMaterial color="#20272e" roughness={0.4} />
        </KotakBulat>
        <Lensa p={[-0.12, 0.08, -0.12]} r={0.1} />
        <Lensa p={[0.12, 0.08, -0.12]} r={0.1} />
        <Lensa p={[-0.12, 0.08, 0.12]} r={0.1} />
        <mesh position={[0.13, 0.065, 0.13]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 24]} />
          <meshStandardMaterial color="#fff1c2" emissive="#ffd98a" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.36, -0.03, 0.05]}>
          <boxGeometry args={[0.22, 0.01, 0.1]} />
          <meshStandardMaterial color="#d49a3a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
      {/* 06 papan bawah: port USB-C, speaker bergrill, motor getar, mikrofon */}
      <group position={p(5)}>
        <mesh>
          <boxGeometry args={[1.3, 0.025, 0.32]} />
          <meshStandardMaterial map={pcb ?? undefined} roughness={0.55} />
        </mesh>
        <KotakBulat ukuran={[0.3, 0.09, 0.14]} r={0.04} position={[0, 0.06, 0.1]}>
          <Logam warna="#d5dde3" kasar={0.18} />
        </KotakBulat>
        <KotakBulat ukuran={[0.44, 0.1, 0.24]} r={0.02} position={[-0.38, 0.06, 0]}>
          <meshStandardMaterial color="#1a1f26" roughness={0.6} />
        </KotakBulat>
        <mesh position={[-0.38, 0.112, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.4, 0.2]} />
          <meshStandardMaterial map={grill ?? undefined} roughness={0.7} />
        </mesh>
        <KotakBulat ukuran={[0.3, 0.08, 0.16]} r={0.03} position={[0.4, 0.055, -0.02]}>
          <Logam warna="#b7c7d2" kasar={0.25} />
        </KotakBulat>
        <mesh position={[0.2, 0.03, 0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
          <Logam warna="#c9d3db" kasar={0.2} />
        </mesh>
      </group>
      {/* 07 rangka aluminium */}
      <group position={p(6)}>
        <Rangka />
      </group>
      {/* 08 layar OLED + bingkai hitam + kabel flex */}
      <group position={p(7)}>
        <KotakBulat ukuran={[1.46, 0.03, 2.96]} r={0.012}>
          <meshStandardMaterial color="#05080b" roughness={0.3} />
        </KotakBulat>
        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.38, 2.86]} />
          <meshStandardMaterial map={layar ?? undefined} emissive="#ffffff" emissiveMap={layar ?? undefined} emissiveIntensity={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.03, 1.38]}>
          <boxGeometry args={[0.5, 0.01, 0.22]} />
          <meshStandardMaterial color="#d49a3a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
      {/* 09 kaca depan dengan lubang kamera & celah earpiece */}
      <group position={p(8)}>
        <KotakBulat ukuran={[1.5, 0.025, 3.0]} r={0.012}>
          <meshPhysicalMaterial color="#d6ecff" roughness={0.02} clearcoat={1} transparent opacity={0.22} metalness={0.1} />
        </KotakBulat>
        <mesh position={[0, 0.014, -1.33]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 32]} />
          <meshStandardMaterial color="#05080b" />
        </mesh>
        <KotakBulat ukuran={[0.34, 0.01, 0.025]} r={0.004} position={[0, 0.014, -1.44]}>
          <meshStandardMaterial color="#2a3440" />
        </KotakBulat>
      </group>
    </group>
  );
};

// ======================= MOTOR DC =======================
// Profil lempeng rotor 3 kutub (hub + leher + sepatu kutub)
const bentukLaminasi = () => {
  const s = new Shape();
  const titik: [number, number][] = [];
  const HUB = 0.17, LEHER = 0.37, SEPATU = 0.52, LN = 0.15, LS = 0.62;
  const busur = (r: number, a0: number, a1: number, n = 10) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      titik.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
  };
  for (let k = 0; k < 3; k++) {
    const a = (k * 2 * Math.PI) / 3;
    const aBerikut = ((k + 1) * 2 * Math.PI) / 3;
    busur(LEHER, a - LN, a - LS, 6);
    busur(SEPATU, a - LS, a + LS, 24);
    busur(LEHER, a + LS, a + LN, 6);
    titik.push([Math.cos(a + LN) * HUB, Math.sin(a + LN) * HUB]);
    busur(HUB, a + LN, aBerikut - LN, 8);
    titik.push([Math.cos(aBerikut - LN) * LEHER, Math.sin(aBerikut - LN) * LEHER]);
  }
  s.moveTo(...titik[0]);
  titik.slice(1).forEach((t) => s.lineTo(...t));
  s.closePath();
  s.holes.push(new Path().absarc(0, 0, 0.065, 0, Math.PI * 2, true));
  return s;
};

const IntiRotor: React.FC = () => {
  const g = useMemo(() => {
    const e = new ExtrudeGeometry(bentukLaminasi(), { depth: 0.048, bevelEnabled: false, curveSegments: 4 });
    e.rotateX(-Math.PI / 2);
    return e;
  }, []);
  return (
    <group>
      {Array.from({ length: 13 }, (_, i) => (
        <mesh key={i} geometry={g} position={[0, -0.36 + i * 0.056, 0]}>
          <meshStandardMaterial color={i % 2 ? "#5d6b78" : "#53606c"} metalness={0.85} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
};

const SektorMagnet: React.FC<{ sudut: number; warna: string }> = ({ sudut, warna }) => {
  const g = useMemo(() => {
    const s = new Shape();
    s.absarc(0, 0, 0.7, -0.95, 0.95, false);
    s.absarc(0, 0, 0.57, 0.95, -0.95, true);
    const e = new ExtrudeGeometry(s, { depth: 0.82, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 3, curveSegments: 40 });
    e.translate(0, 0, -0.41);
    e.rotateX(Math.PI / 2);
    return e;
  }, []);
  return (
    <mesh geometry={g} rotation={[0, sudut, 0]}>
      <meshStandardMaterial color={warna} metalness={0.35} roughness={0.4} />
    </mesh>
  );
};

const PemegangSikat: React.FC<{ sisi: 1 | -1; tarik: number }> = ({ sisi, tarik }) => (
  <group position={[sisi * (0.3 + tarik), 0, 0]}>
    <mesh position={[sisi * 0.1, 0, 0]}>
      <boxGeometry args={[0.32, 0.17, 0.17]} />
      <Logam warna="#d6a653" kasar={0.25} />
    </mesh>
    <mesh position={[sisi * -0.1, 0, 0]}>
      <boxGeometry args={[0.16, 0.12, 0.12]} />
      <meshStandardMaterial color="#26282b" roughness={0.95} />
    </mesh>
    <group position={[sisi * 0.08, 0, 0]} rotation={[0, 0, (sisi * Math.PI) / 2]}>
      <Heliks r={0.045} pitch={0.03} putaran={6} tebal={0.007} warna="#e5edf4" y0={-0.09} />
    </group>
    <Kabel titik={[[sisi * 0.26, 0.05, 0], [sisi * 0.36, 0.15, 0.05], [sisi * 0.3, 0.28, 0.12]]} r={0.012} warna="#c8743a" logam={0.9} kasar={0.3} />
  </group>
);

export const ASAL_M: V3[] = [[0, 0.98, 0], [0, 0.72, 0], [0, 1.18, 0], [0, 0.56, 0], [0, 0, 0], [0, 0, 0], [0, -0.02, 0], [0, -0.72, 0]];
export const ARAH_M: V3[] = [[0, 1.95, 0], [0, 1.3, 0], [0, 1.45, 0], [0, 0.85, 0], [0, 0.1, 0], [0, -0.65, 0], [0, -1.35, 0], [0, -2.0, 0]];
export const NAMA_M = ["Tutup & terminal", "Sikat karbon & pegas", "Bantalan belakang", "Komutator", "Rotor berlapis & lilitan", "Magnet permanen", "Rumah motor", "Bantalan depan"];
export const TITIK_M: V3[] = [[0.78, 0.02, 0], [-0.5, 0.08, 0], [0.12, 0.05, 0.1], [0.16, 0.0, 0.05], [0.52, 0.0, 0.0], [-0.72, 0.0, 0.2], [0.77, -0.25, 0.0], [0.14, 0.0, 0.08]];

export const Motor: React.FC<{ e: number; putar: number; tembus?: number[] }> = ({ e, putar, tembus }) => {
  const p = (i: number) => geser(ASAL_M[i], ARAH_M[i], e);
  const t = (i: number) => tembus?.[i] ?? 1;
  return (
    <group>
      {/* 01 tutup belakang plastik + terminal kuningan + lubang bantalan */}
      <Tembus o={t(0)}>
      <group position={p(0)}>
        <Bubut profil={[[0.12, -0.06], [0.78, -0.06], [0.8, -0.02], [0.8, 0.05], [0.72, 0.1], [0.25, 0.1], [0.22, 0.16], [0.12, 0.16]]}>
          <Plastik warna="#1f2730" kasar={0.5} />
        </Bubut>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.5, 0.18, 0.25]}>
            <mesh>
              <boxGeometry args={[0.14, 0.18, 0.025]} />
              <Logam warna="#d6a653" kasar={0.22} />
            </mesh>
            <mesh position={[0, 0.04, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.03, 0.012, 8, 20]} />
              <meshStandardMaterial color="#05080b" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.1, -0.55]}>
          <boxGeometry args={[0.3, 0.03, 0.12]} />
          <Plastik warna="#e5edf4" />
        </mesh>
      </group>
      </Tembus>
      {/* 02 sikat karbon, pemegang kuningan, pegas, kabel */}
      <Tembus o={t(1)}>
      <group position={p(1)}>
        <PemegangSikat sisi={-1} tarik={0.3 * e} />
        <PemegangSikat sisi={1} tarik={0.3 * e} />
      </group>
      </Tembus>
      {/* 03 bantalan belakang */}
      <Tembus o={t(2)}>
      <BantalanBola p={p(2)} r={0.17} />
      </Tembus>
      {/* 04 komutator: 3 segmen tembaga + celah isolator + kait kawat */}
      <Tembus o={t(3)}>
      <group position={p(3)} rotation={[0, putar, 0]}>
        {[0, 1, 2].map((i) => {
          const a = (i * 2 * Math.PI) / 3;
          return (
            <group key={i}>
              <mesh>
                <cylinderGeometry args={[0.17, 0.17, 0.28, 32, 1, false, a + 0.09, (2 * Math.PI) / 3 - 0.18]} />
                <Logam warna="#d9894a" kasar={0.2} />
              </mesh>
              <mesh position={[Math.sin(a + Math.PI / 3) * 0.2, -0.14, Math.cos(a + Math.PI / 3) * 0.2]}>
                <boxGeometry args={[0.07, 0.05, 0.07]} />
                <Logam warna="#d9894a" kasar={0.25} />
              </mesh>
            </group>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.155, 0.155, 0.3, 24]} />
          <Plastik warna="#3a2a1d" />
        </mesh>
      </group>
      </Tembus>
      {/* 05 rotor: poros, 13 lempeng baja, lilitan tembaga di tiap kutub */}
      <Tembus o={t(4)}>
      <group position={p(4)} rotation={[0, putar, 0]}>
        <mesh>
          <cylinderGeometry args={[0.062, 0.062, 2.5, 32]} />
          <Logam warna="#e5edf4" kasar={0.08} />
        </mesh>
        <IntiRotor />
        {[0, 1, 2].map((k) => (
          <group key={k} rotation={[0, (k * 2 * Math.PI) / 3, 0]}>
            <group rotation={[0, 0, 0]}>
              <Lilitan dari={0.19} ke={0.35} lebar={0.12} tinggi={0.42} putaran={14} tebal={0.016} />
              <Lilitan dari={0.35} ke={0.2} lebar={0.15} tinggi={0.44} putaran={12} tebal={0.016} />
            </group>
          </group>
        ))}
      </group>
      </Tembus>
      {/* 06 magnet permanen N (merah) & S (biru) */}
      <Tembus o={t(5)}>
      <group position={p(5)}>
        <group position={[-0.45 * e, 0, 0]}>
          <SektorMagnet sudut={Math.PI} warna="#c0434f" />
        </group>
        <group position={[0.45 * e, 0, 0]}>
          <SektorMagnet sudut={0} warna="#3f6fb3" />
        </group>
      </group>
      </Tembus>
      {/* 07 rumah motor baja: kaleng, celah ventilasi, flens bertelinga, dudukan bantalan */}
      <Tembus o={t(6)}>
      <group position={p(6)}>
        <mesh>
          <cylinderGeometry args={[0.78, 0.78, 1.2, 96, 1, true]} />
          <meshStandardMaterial color="#9fb0bd" metalness={0.92} roughness={0.22} side={DoubleSide} />
        </mesh>
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 + 0.5;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.785, -0.32, Math.sin(a) * 0.785]} rotation={[0, -a, 0]}>
              <boxGeometry args={[0.02, 0.3, 0.14]} />
              <meshStandardMaterial color="#05080b" />
            </mesh>
          );
        })}
        <Bubut profil={[[0.2, -0.66], [0.78, -0.66], [0.78, -0.6], [0.24, -0.6], [0.24, -0.5], [0.2, -0.5]]}>
          <Logam warna="#8ea2b1" kasar={0.25} />
        </Bubut>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 1.0, -0.63, 0]}>
            <KotakBulat ukuran={[0.5, 0.05, 0.36]} r={0.02}>
              <Logam warna="#8ea2b1" kasar={0.25} />
            </KotakBulat>
            <mesh position={[s * 0.1, 0.03, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 20]} />
              <meshStandardMaterial color="#05080b" />
            </mesh>
          </group>
        ))}
      </group>
      </Tembus>
      {/* 08 bantalan depan + ring pengunci */}
      <Tembus o={t(7)}>
      <group position={p(7)}>
        <BantalanBola r={0.17} />
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.018, 10, 32, 5.5]} />
          <Logam warna="#2a3440" kasar={0.3} />
        </mesh>
      </group>
      </Tembus>
    </group>
  );
};

// ======================= LAMPU LED =======================
const ASAL_L: V3[] = [[0, 0.48, 0], [0, 0.46, 0], [0, 0.43, 0], [0, 0, 0], [0, -0.1, 0], [0, -0.12, 0], [0, -0.78, 0], [0, -1.12, 0]];
const ARAH_L: V3[] = [[0, 1.35, 0], [0, 0.95, 0], [0, 0.66, 0], [0, 0, 0], [0, -0.62, 0], [-1.0, -0.65, 0.35], [0, -1.2, 0], [0, -1.7, 0]];
const NAMA_L = ["Kubah diffuser", "Papan LED (MCPCB)", "Bantalan termal", "Pendingin aluminium", "Rumah isolator", "Papan driver", "Fitting ulir E27", "Isolator & kontak"];
const TITIK_L: V3[] = [[0.7, 0.75, 0.3], [0.55, 0.04, 0.3], [0.62, 0.0, 0.1], [0.66, 0.2, 0.15], [0.36, -0.1, 0.1], [-0.25, 0.15, 0.05], [0.31, 0.0, 0.1], [0.16, -0.05, 0.05]];

const LampuLED: React.FC<{ e: number }> = ({ e }) => {
  const p = (i: number) => geser(ASAL_L[i], ARAH_L[i], e);
  const pcbHijau = teksturPCB("#0f4a3a", "pcb-hijau");
  const pcbPutih = teksturPCB("#d9dee3", "pcb-putih");
  const nyala = 0.6 + 2.4 * e;
  return (
    <group>
      {/* 01 kubah diffuser profil A60 */}
      <group position={p(0)}>
        <Bubut profil={[[0.6, 0], [0.7, 0.05], [0.85, 0.2], [0.94, 0.45], [0.95, 0.68], [0.88, 0.98], [0.7, 1.23], [0.42, 1.38], [0.001, 1.43]]} halus>
          <meshPhysicalMaterial color="#f4f7fa" roughness={0.45} transmission={0.55} thickness={0.3} transparent opacity={0.62} side={DoubleSide} clearcoat={0.6} />
        </Bubut>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.61, 0.025, 10, 64]} />
          <Plastik warna="#e9eef2" />
        </mesh>
      </group>
      {/* 02 papan LED aluminium: 12 LED SMD + konektor + kabel */}
      <group position={p(1)}>
        <mesh>
          <cylinderGeometry args={[0.66, 0.66, 0.04, 64]} />
          <meshStandardMaterial map={pcbPutih ?? undefined} metalness={0.3} roughness={0.45} />
        </mesh>
        {Array.from({ length: 12 }, (_, i) => {
          const cincin = i < 8;
          const a = cincin ? (i / 8) * Math.PI * 2 : ((i - 8) / 4) * Math.PI * 2 + 0.4;
          const r = cincin ? 0.47 : 0.22;
          return (
            <group key={i} position={[Math.cos(a) * r, 0.035, Math.sin(a) * r]} rotation={[0, -a, 0]}>
              <mesh>
                <boxGeometry args={[0.13, 0.04, 0.11]} />
                <Plastik warna="#f2f2ee" kasar={0.3} />
              </mesh>
              <mesh position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.042, 24]} />
                <meshStandardMaterial color="#ffd66b" emissive="#ffcf5a" emissiveIntensity={nyala} />
              </mesh>
            </group>
          );
        })}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.14, 0.03, 0.08]} />
          <Plastik warna="#e9eef2" />
        </mesh>
        <Kabel titik={[[-0.03, -0.02, 0], [-0.05, -0.2, 0.02], [-0.06, -0.4, 0.03]]} r={0.014} warna="#c0434f" />
        <Kabel titik={[[0.03, -0.02, 0], [0.05, -0.2, 0.02], [0.06, -0.4, 0.03]]} r={0.014} warna="#1a1f26" />
      </group>
      {/* 03 bantalan termal */}
      <group position={p(2)}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.015, 64]} />
          <Plastik warna="#7e8d99" kasar={0.9} />
        </mesh>
      </group>
      {/* 04 pendingin aluminium: badan kerucut + 24 sirip + bibir atas */}
      <group position={p(3)}>
        <Bubut profil={[[0.3, -0.55], [0.42, -0.55], [0.69, 0.38], [0.72, 0.42], [0.72, 0.46], [0.62, 0.46], [0.62, 0.4], [0.36, -0.45], [0.3, -0.45]]}>
          <Logam warna="#cfd9e1" kasar={0.32} logam={0.85} />
        </Bubut>
        {Array.from({ length: 24 }, (_, i) => (
          <group key={i} rotation={[0, (i / 24) * Math.PI * 2, 0]}>
            <mesh position={[0.6, -0.06, 0]} rotation={[0, 0, -0.29]}>
              <boxGeometry args={[0.13, 0.9, 0.022]} />
              <Logam warna="#c4d1db" kasar={0.3} logam={0.85} />
            </mesh>
          </group>
        ))}
      </group>
      {/* 05 rumah isolator plastik */}
      <group position={p(4)}>
        <Bubut profil={[[0.24, -0.62], [0.33, -0.6], [0.36, -0.2], [0.4, 0.3], [0.42, 0.34], [0.36, 0.34], [0.33, 0.3], [0.3, -0.2], [0.24, -0.56]]}>
          <Plastik warna="#eef1f4" kasar={0.45} />
        </Bubut>
      </group>
      {/* 06 papan driver: trafo, kapasitor elektrolit, resistor, penyearah, IC, kabel */}
      <group position={p(5)}>
        <mesh>
          <boxGeometry args={[0.46, 0.72, 0.03]} />
          <meshStandardMaterial map={pcbHijau ?? undefined} roughness={0.5} />
        </mesh>
        <group position={[-0.08, 0.16, 0.1]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.13, 24]} />
            <Logam warna="#c8743a" kasar={0.3} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.22, 0.05, 0.15]} />
            <Plastik warna="#15191e" kasar={0.4} />
          </mesh>
        </group>
        {[[0.12, 0.18, 0.06, 0.2, "#2a55a0"], [0.12, -0.08, 0.05, 0.15, "#1d1d22"]].map(([x, y, r, h, c], i) => (
          <group key={i} position={[x as number, y as number, 0.015 + (h as number) / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[r as number, r as number, h as number, 28]} />
              <meshStandardMaterial color={c as string} roughness={0.35} metalness={0.2} />
            </mesh>
            <mesh position={[0, (h as number) / 2 + 0.002, 0]}>
              <cylinderGeometry args={[(r as number) * 0.92, (r as number) * 0.92, 0.004, 28]} />
              <Logam warna="#c9d3db" kasar={0.2} />
            </mesh>
          </group>
        ))}
        {[-0.18, -0.24, -0.3].map((y, i) => (
          <group key={i} position={[-0.1, y, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.022, 0.022, 0.12, 16]} />
              <Plastik warna="#d8c49a" kasar={0.5} />
            </mesh>
            {[-0.03, 0, 0.03].map((b, j) => (
              <mesh key={j} position={[0, b, 0]}>
                <cylinderGeometry args={[0.0235, 0.0235, 0.008, 16]} />
                <meshStandardMaterial color={["#8b4a1c", "#1a1a1a", "#c0434f"][(i + j) % 3]} />
              </mesh>
            ))}
          </group>
        ))}
        <mesh position={[0.1, -0.27, 0.035]}>
          <boxGeometry args={[0.12, 0.09, 0.04]} />
          <Plastik warna="#15191e" />
        </mesh>
        <Kabel titik={[[0.0, 0.36, 0.0], [0.05, 0.5, 0.05], [0.25, 0.62, 0.1]]} r={0.013} warna="#c0434f" />
        <Kabel titik={[[-0.05, -0.36, 0.0], [-0.02, -0.5, 0.04], [0.18, -0.6, 0.06]]} r={0.013} warna="#1a1f26" />
      </group>
      {/* 07 fitting E27: selongsong + ulir heliks + bibir */}
      <group position={p(6)}>
        <mesh>
          <cylinderGeometry args={[0.29, 0.29, 0.56, 64]} />
          <Logam warna="#cfd8df" kasar={0.18} />
        </mesh>
        <Heliks r={0.3} pitch={0.11} putaran={4.4} tebal={0.04} warna="#e5edf4" y0={-0.25} logam={0.95} kasar={0.15} />
        <mesh position={[0, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.31, 0.02, 10, 64]} />
          <Logam warna="#e5edf4" kasar={0.15} />
        </mesh>
      </group>
      {/* 08 isolator kaca hitam + kontak tengah kuningan */}
      <group position={p(7)}>
        <Bubut profil={[[0.08, -0.06], [0.14, -0.06], [0.24, 0.05], [0.26, 0.08], [0.08, 0.08]]}>
          <meshPhysicalMaterial color="#121418" roughness={0.15} clearcoat={1} />
        </Bubut>
        <mesh position={[0, -0.08, 0]} scale={[1, 0.55, 1]}>
          <sphereGeometry args={[0.1, 32, 20]} />
          <Logam warna="#e8b65d" kasar={0.15} />
        </mesh>
      </group>
    </group>
  );
};

// ======================= KERANGKA ADEGAN =======================
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
  // label dibagi kiri/kanan; jarak tegak minimal agar tidak bertumpuk
  const y: number[] = titik.map((t) => t.y);
  (["kiri", "kanan"] as const).forEach((sisi) => {
    const idx = titik.map((t, i) => ({ t, i })).filter((o) => (o.t.x < 540) === (sisi === "kiri")).sort((a, b) => a.t.y - b.t.y);
    for (let j = 1; j < idx.length; j++) y[idx[j].i] = Math.max(y[idx[j].i], y[idx[j - 1].i] + 118);
  });
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
      {titik.map((t, i) => (
        <Penunjuk key={i} titik={t} y={y[i]} no={String(i + 1).padStart(2, "0")} nama={d.nama[i].toUpperCase()} sisi={t.x < 540 ? "kiri" : "kanan"} muncul={40 + i * 4} font={FONT} />
      ))}
      <DaftarBagian isi={d.nama} font={FONT} />
      <Catatan teks={d.catatan} font={FONT} />
    </AbsoluteFill>
  );
};

const ADEGAN: Def[] = [
  {
    kode: "EV-01 · GADGET", kecil: "APA ISI DALAMNYA?", judul: "SMARTPHONE", sub: "9 bagian dalam tubuh setipis 8 mm",
    nama: NAMA_HP, titik: TITIK_HP, asal: ASAL_HP, arah: ARAH_HP, lantaiY: -0.25, catatan: "ILUSTRASI · TATA LETAK BERBEDA TIAP MODEL",
    kam: { pos: [5.0, 7.4, 10.4], lihat: [0, 1.6, 0.2], fov: 38 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, -0.55 + f * 0.0015, 0] }),
    objek: (e) => <Smartphone e={e} />, sumbu: [[0.95, -0.2, 1.6], [0.95, 3.7, 1.6]],
  },
  {
    kode: "EV-02 · MESIN", kecil: "PENGGERAK KIPAS & MAINAN", judul: "MOTOR DC", sub: "Listrik + magnet = putaran",
    nama: NAMA_M, titik: TITIK_M, asal: ASAL_M, arah: ARAH_M, lantaiY: -2.95, catatan: "ILUSTRASI MOTOR DC SIKAT 3 KUTUB",
    kam: { pos: [4.9, 3.6, 12.4], lihat: [0, 0.2, 0], fov: 42 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, 0.35 + f * 0.0015, 0] }),
    objek: (e, f) => <Motor e={e} putar={f * 0.03} />, sumbu: [[0, -2.85, 0], [0, 3.1, 0]],
  },
  {
    kode: "EV-03 · RUMAH", kecil: "HEMAT ENERGI", judul: "LAMPU LED", sub: "Bukan sekadar bohlam biasa",
    nama: NAMA_L, titik: TITIK_L, asal: ASAL_L, arah: ARAH_L, lantaiY: -3.05, catatan: "ILUSTRASI · KOMPONEN DISEDERHANAKAN",
    kam: { pos: [4.5, 3.4, 12.6], lihat: [0, 0.3, 0], fov: 42 },
    pose: (f) => ({ pos: [0, 0, 0], rot: [0, 0.3 + f * 0.0015, 0] }),
    objek: (e) => <LampuLED e={e} />, sumbu: [[0, -2.95, 0], [0, 3.4, 0]],
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
