// AnatomicalScene3D: kanvas 3D berisi Heart3D, BloodFlowAnimation, katup, dan sinyal listrik.
// Semua gerak dihitung dari useCurrentFrame() agar render deterministik.
import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame } from "remotion";
import { CatmullRomCurve3, DoubleSide, Vector3 } from "three";
import { KORONER, ambilTeksturOtot, geometriRuang, kurvaKoroner } from "../lib/bentuk";
import {
  JALUR_BIRU, JALUR_MERAH, KAMERA, SAMBUNGAN, KATUP, LEBAR, NamaRuang, PEMBULUH, RUANG, SIMPUL_AV, SIMPUL_SA, TINGGI, V3,
  ayun, bukaKatup, faseDetak, keadaanPada, posRuang, remasAtrium, remasVentrikel,
} from "../lib/model";

const kurva = (titik: V3[]) => new CatmullRomCurve3(titik.map((p) => new Vector3(...p)));

// MedicalStudioLighting: key + fill + rim
const MedicalStudioLighting: React.FC = () => (
  <>
    <hemisphereLight args={["#fff1ea", "#2a0a12", 0.55]} />
    <directionalLight position={[3, 4, 6]} intensity={2.1} color="#fff4ec" />
    <directionalLight position={[-5, 1, 3]} intensity={0.7} color="#9cc9ff" />
    <directionalLight position={[0, -3, 4]} intensity={0.35} color="#ffd0c0" />
    <pointLight position={[-2, 3, -4]} intensity={55} distance={20} color="#ff9a9a" />
    <pointLight position={[3, -1, -4]} intensity={35} distance={20} color="#9cc9ff" />
  </>
);

const Ruang: React.FC<{ n: NamaRuang; frame: number }> = ({ n, frame }) => {
  const k = keadaanPada(frame);
  const r = RUANG[n];
  const remas = r.atas ? remasAtrium(frame) : remasVentrikel(frame);
  const s = 1 - 0.045 * remas * k.detak;
  const pos = posRuang(n, k.bongkar);

  // OrganHighlightEffect: sorot kuning berdenyut
  const sorot = (r.atas ? k.sorotAtas : k.sorotBawah) * (0.55 + 0.25 * Math.sin(frame / 6));
  // Sinyal listrik: atrium menyala dulu, ventrikel menyusul
  const t = faseDetak(frame);
  const nyala = k.listrik * (r.atas ? (t < 0.16 ? 1 - t / 0.16 : 0) : t >= 0.16 && t < 0.4 ? 1 - (t - 0.16) / 0.24 : 0);
  const emisi = nyala > sorot ? "#7cf3ff" : "#ffd166";
  const kuat = 0.18 + Math.max(sorot, nyala * 1.4);
  const opas = 1 - 0.68 * k.kaca;

  const tekstur = ambilTeksturOtot();
  const pusat = r.pos;

  // Geometri memakai koordinat model; grup luar memindah & menskala di sekitar pusat ruang
  return (
    <group position={pos} scale={s}>
      <mesh position={[-pusat[0], -pusat[1], -pusat[2]]} geometry={geometriRuang(n)}>
        <meshPhysicalMaterial
          color="#ffffff"
          vertexColors
          bumpMap={tekstur ?? undefined}
          bumpScale={0.35}
          emissive={kuat > 0.2 ? emisi : "#2a0508"}
          emissiveIntensity={kuat > 0.2 ? kuat : 0.12}
          roughness={0.5}
          metalness={0}
          clearcoat={0.55}
          clearcoatRoughness={0.28}
          transparent
          opacity={opas}
          depthWrite={opas > 0.9}
        />
      </mesh>
    </group>
  );
};

const Pembuluh: React.FC<{ frame: number }> = ({ frame }) => {
  const k = keadaanPada(frame);
  const geo = useMemo(() => PEMBULUH.map((p) => kurva(p.titik)), []);
  const opas = (1 - 0.85 * k.bongkar) * (1 - 0.55 * k.kaca);
  return (
    <>
      {PEMBULUH.map((p, i) => (
        <mesh key={i}>
          <tubeGeometry args={[geo[i], 64, p.r, 24, false]} />
          <meshPhysicalMaterial
            color={p.warna}
            roughness={0.42}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            side={DoubleSide}
            transparent
            opacity={opas}
            depthWrite={opas > 0.9}
          />
        </mesh>
      ))}
      {SAMBUNGAN.map((b, i) => (
        <mesh key={`s${i}`} position={b.pos}>
          <sphereGeometry args={[b.r, 32, 32]} />
          <meshPhysicalMaterial color={b.warna} roughness={0.42} clearcoat={0.6} clearcoatRoughness={0.25} transparent opacity={opas} depthWrite={opas > 0.9} />
        </mesh>
      ))}
    </>
  );
};

// Pembuluh koroner di permukaan jantung (hilang saat jantung dibongkar)
const Koroner: React.FC<{ frame: number }> = ({ frame }) => {
  const k = keadaanPada(frame);
  const opas = Math.max(0, 1 - 1.6 * k.bongkar) * (1 - 0.7 * k.kaca);
  if (opas < 0.02) return null;
  return (
    <>
      {KORONER.map((p, i) => (
        <mesh key={i}>
          <tubeGeometry args={[kurvaKoroner(i), 96, p.r, 10, false]} />
          <meshPhysicalMaterial
            color={p.warna}
            roughness={0.35}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            transparent
            opacity={opas}
            depthWrite={opas > 0.9}
          />
        </mesh>
      ))}
    </>
  );
};

// BloodFlowAnimation: butir darah bergerak di sepanjang jalur
const Aliran: React.FC<{ frame: number; jalur: V3[]; warna: string; kuat: number; geser: number }> = ({ frame, jalur, warna, kuat, geser }) => {
  const c = useMemo(() => kurva(jalur), [jalur]);
  if (kuat < 0.02) return null;
  const N = 22;
  return (
    <>
      {Array.from({ length: N }).map((_, i) => {
        const u = (i / N + frame * 0.006 + geser) % 1;
        const p = c.getPointAt(u);
        return (
          <mesh key={i} position={p} scale={kuat}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color={warna} emissive={warna} emissiveIntensity={0.9} />
          </mesh>
        );
      })}
    </>
  );
};

// Katup: cincin + dua daun yang membuka/menutup mengikuti detak
const Katup: React.FC<{ frame: number }> = ({ frame }) => {
  const k = keadaanPada(frame);
  if (k.katup < 0.02) return null;
  return (
    <>
      {KATUP.map((kt, i) => {
        const buka = bukaKatup(frame, kt.av);
        const sudut = 1.15 * buka;
        return (
          <group key={i} position={kt.pos} scale={k.katup}>
            <mesh>
              <torusGeometry args={[0.13, 0.025, 12, 32]} />
              <meshStandardMaterial color="#ffe7a3" emissive="#ffcf5a" emissiveIntensity={0.7} />
            </mesh>
            <mesh position={[0, 0.0, 0]} rotation={[sudut, 0, 0]}>
              <circleGeometry args={[0.12, 24, 0, Math.PI]} />
              <meshStandardMaterial color="#fff3cf" emissive="#ffcf5a" emissiveIntensity={0.5} side={DoubleSide} />
            </mesh>
            <mesh rotation={[-sudut, 0, Math.PI]}>
              <circleGeometry args={[0.12, 24, 0, Math.PI]} />
              <meshStandardMaterial color="#fff3cf" emissive="#ffcf5a" emissiveIntensity={0.5} side={DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </>
  );
};

// Sinyal listrik dari simpul SA ke simpul AV (konsep NeuronSignal untuk jantung)
const SinyalListrik: React.FC<{ frame: number }> = ({ frame }) => {
  const k = keadaanPada(frame);
  if (k.listrik < 0.02) return null;
  const t = faseDetak(frame);
  const gelombang = t < 0.4 ? t / 0.4 : 0;
  return (
    <>
      <mesh position={SIMPUL_SA} scale={k.listrik * (1 + 0.6 * (t < 0.1 ? 1 - t / 0.1 : 0))}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#fffbe0" emissive="#7cf3ff" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={SIMPUL_AV} scale={k.listrik * (t > 0.14 && t < 0.24 ? 1.5 : 1)}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color="#fffbe0" emissive="#7cf3ff" emissiveIntensity={1.8} />
      </mesh>
      {gelombang > 0 && (
        <mesh position={SIMPUL_SA} scale={0.2 + gelombang * 2.2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#7cf3ff" transparent opacity={0.28 * (1 - gelombang) * k.listrik} depthWrite={false} />
        </mesh>
      )}
    </>
  );
};

const Jantung: React.FC = () => {
  const frame = useCurrentFrame();
  const k = keadaanPada(frame);
  if (k.skala < 0.01) return null;
  return (
    <group
      position={[k.pos[0], k.pos[1] + ayun(frame), k.pos[2]]}
      rotation={[k.rotX, k.rotYAkhir, 0]}
      scale={k.skala}
    >
      <Pembuluh frame={frame} />
      {(["LA", "RA", "LV", "RV"] as NamaRuang[]).map((n) => (
        <Ruang key={n} n={n} frame={frame} />
      ))}
      <Koroner frame={frame} />
      <Aliran frame={frame} jalur={JALUR_BIRU} warna="#5b8cff" kuat={k.biru} geser={0} />
      <Aliran frame={frame} jalur={JALUR_MERAH} warna="#ff4d5e" kuat={k.merah} geser={0.5} />
      <Katup frame={frame} />
      <SinyalListrik frame={frame} />
    </group>
  );
};

export const AnatomicalScene3D: React.FC = () => (
  <ThreeCanvas
    width={LEBAR}
    height={TINGGI}
    camera={{ fov: KAMERA.fov, position: [0, 0, KAMERA.z], near: 0.1, far: 100 }}
    gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    style={{ position: "absolute", inset: 0 }}
  >
    <MedicalStudioLighting />
    <Jantung />
  </ThreeCanvas>
);
