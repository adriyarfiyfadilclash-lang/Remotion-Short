// Contoh gaya ADRIY Cosmic Motion dalam format 9:16 (1080×1920), 3 adegan.
import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { FONT } from "../../src/components/Teks";
import {
  AsteroidBelt3D, BingkaiSudut, Cahaya, CinematicSpaceLighting, Cincin, HUD, Judul, Keterangan, Nebula3D, Orbit,
  Penanda, Planet3D, SpiralGalaxy3D, StarField3D,
} from "./pustaka";

const W = 1080, H = 1920;
type V3 = [number, number, number];
type Kam = { pos: V3; lihat: V3; fov: number };

// Proyeksi titik 3D ke layar, untuk menempatkan label 2D
const keLayar = (k: Kam, p: V3) => {
  const c = new PerspectiveCamera(k.fov, W / H, 0.1, 500);
  c.position.set(...k.pos);
  c.lookAt(...k.lihat);
  c.updateMatrixWorld();
  c.updateProjectionMatrix();
  const v = new Vector3(...p).project(c);
  return { x: ((v.x + 1) / 2) * W, y: ((1 - v.y) / 2) * H };
};

const AturKamera: React.FC<{ k: Kam }> = ({ k }) => {
  const { camera } = useThree();
  camera.position.set(...k.pos);
  (camera as PerspectiveCamera).fov = k.fov;
  camera.lookAt(...k.lihat);
  (camera as PerspectiveCamera).updateProjectionMatrix();
  return null;
};

const Kanvas: React.FC<{ k: Kam; children: React.ReactNode }> = ({ k, children }) => (
  <ThreeCanvas width={W} height={H} camera={{ fov: k.fov, near: 0.1, far: 500 }} gl={{ antialias: true, preserveDrawingBuffer: true }} style={{ position: "absolute", inset: 0 }}>
    <color attach="background" args={["#020713"]} />
    <AturKamera k={k} />
    {children}
  </ThreeCanvas>
);

const lerp3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// ---------- Adegan 1: planet bercincin ----------
const SATURNUS: V3 = [0.2, -2.6, 0];
const AdeganPlanet: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 110], [0, 1]);
  const k: Kam = { pos: lerp3([0, 1.5, 24], [0.5, 1.0, 20], t), lihat: [0, -0.4, 0], fov: 45 };
  const titik = keLayar(k, [SATURNUS[0] - 1.1, SATURNUS[1] + 1.2, 0.8]);
  return (
    <AbsoluteFill>
      <Kanvas k={k}>
        <StarField3D count={3000} radius={80} />
        <Nebula3D position={[-6, 9, -40]} radius={16} scale={[1.8, 0.7, 1]} size={2.6} opacity={0.16} />
        <Nebula3D position={[10, -12, -45]} radius={14} colorA="#1f5fb5" colorB="#46d3e6" seed={5} size={2.6} opacity={0.14} />
        <ambientLight intensity={0.06} />
        <directionalLight position={[-10, 4, 6]} intensity={3.2} color="#fff2dc" />
        <pointLight position={[8, 2, -6]} color="#7a8dff" intensity={40} distance={60} />
        <group position={SATURNUS} rotation={[0.42, 0, -0.28]}>
          <Planet3D nama="saturnus" radius={1.9} warna={["#d8c08f", "#c9a56a", "#e6d4a8", "#b48d57", "#efe0bb"]} pita seed={11} frame={f} rotationSpeed={0.006} />
          <Cincin dalam={2.4} luar={4.2} />
        </group>
      </Kanvas>
      <BingkaiSudut />
      <HUD bab="COSMIC MOTION" detail="BAGIAN 01 · KENALAN" font={FONT} />
      <Judul kecil="ADRIY COSMIC MOTION" judul="ALAM SEMESTA" sub="Seberapa kecil kita sebenarnya?" top={300} lama={130} font={FONT} />
      <Penanda x={titik.x} y={titik.y} arahX={-60} arahY={-170} teks="SATURNUS" sub="±9,5× diameter Bumi" muncul={30} font={FONT} />
    </AbsoluteFill>
  );
};

// ---------- Adegan 2: tata surya ----------
const PLANET: { nama: string; r: number; jarak: number; warna: string[]; pita?: boolean; laju: number; fase: number }[] = [
  { nama: "merkurius", r: 0.12, jarak: 1.8, warna: ["#8f8a85", "#6e6a66", "#a7a29b"], laju: 0.04, fase: 0.5 },
  { nama: "venus", r: 0.2, jarak: 2.5, warna: ["#d9b77c", "#c99d5d", "#ead2a1"], laju: 0.03, fase: 2.1 },
  { nama: "bumi", r: 0.22, jarak: 3.2, warna: ["#2d63b8", "#3f8f4a", "#e9eef5", "#2d63b8"], laju: 0.025, fase: 4.4 },
  { nama: "mars", r: 0.16, jarak: 3.9, warna: ["#b4532e", "#8f3d22", "#d0774a"], laju: 0.02, fase: 1.2 },
  { nama: "jupiter", r: 0.55, jarak: 5.7, warna: ["#c9a983", "#a77b55", "#e8d6b8", "#b8875c"], pita: true, laju: 0.011, fase: 3.3 },
  { nama: "saturnus2", r: 0.46, jarak: 6.8, warna: ["#d8c08f", "#c9a56a", "#e6d4a8"], pita: true, laju: 0.008, fase: 5.6 },
  { nama: "uranus", r: 0.3, jarak: 7.8, warna: ["#9fd8e0", "#86c6d3", "#b6e6ec"], pita: true, laju: 0.006, fase: 0.2 },
  { nama: "neptunus", r: 0.29, jarak: 8.7, warna: ["#3f66d8", "#2f50b3", "#6187ee"], pita: true, laju: 0.005, fase: 2.7 },
];
const posPlanet = (i: number, f: number): V3 => {
  const p = PLANET[i];
  const a = p.fase + f * p.laju;
  return [Math.cos(a) * p.jarak, 0, Math.sin(a) * p.jarak];
};

const AdeganTataSurya: React.FC = () => {
  const f = useCurrentFrame();
  const sudut = interpolate(f, [0, 110], [0, 0.35]);
  const k: Kam = { pos: [Math.sin(sudut) * 17, 34, Math.cos(sudut) * 17], lihat: [0, 0, 1.5], fov: 44 };
  const bumi = keLayar(k, posPlanet(2, f));
  return (
    <AbsoluteFill>
      <Kanvas k={k}>
        <StarField3D count={3000} radius={90} seed={23} />
        <Nebula3D position={[0, -30, -10]} radius={20} size={3} opacity={0.12} seed={9} />
        <ambientLight intensity={0.08} />
        <pointLight position={[0, 0, 0]} intensity={260} distance={60} decay={1.6} color="#fff1d0" />
        <mesh>
          <sphereGeometry args={[0.9, 48, 32]} />
          <meshBasicMaterial color="#ffb44d" />
        </mesh>
        <Cahaya warna="#ffb347" ukuran={5} kuat={1} />
        <Cahaya warna="#ff7b2e" ukuran={10} kuat={0.45} />
        {PLANET.map((p, i) => (
          <group key={p.nama}>
            <Orbit radius={p.jarak} opacity={0.35} />
            <group position={posPlanet(i, f)}>
              <Planet3D nama={p.nama} radius={p.r} warna={p.warna} pita={p.pita} seed={i * 7 + 3} frame={f} />
              {p.nama === "saturnus2" && (
                <group rotation={[0.4, 0, 0.2]}>
                  <Cincin dalam={p.r * 1.3} luar={p.r * 2.0} />
                </group>
              )}
            </group>
          </group>
        ))}
        <AsteroidBelt3D innerRadius={4.4} outerRadius={4.95} count={380} frame={f} />
      </Kanvas>
      <BingkaiSudut />
      <HUD bab="COSMIC MOTION" detail="BAGIAN 02 · TATA SURYA" font={FONT} />
      <Judul kecil="RUMAH KITA" judul="TATA SURYA" sub="8 planet mengelilingi Matahari" top={260} lama={130} font={FONT} />
      <Penanda x={bumi.x} y={bumi.y} arahX={-120} arahY={260} teks="BUMI" sub="kita di sini" muncul={20} font={FONT} />
      <Keterangan teks="Ukuran & jarak tidak sesuai skala" font={FONT} />
    </AbsoluteFill>
  );
};

// ---------- Adegan 3: galaksi Bima Sakti ----------
const POSISI_MATAHARI: V3 = [3.1 * Math.cos(2.2), 0, 3.1 * Math.sin(2.2)];
const AdeganGalaksi: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 110], [0, 1]);
  const k: Kam = { pos: lerp3([0, 13, 12], [0, 11.5, 10.5], t), lihat: [0, -0.6, 0], fov: 50 };
  const putar = f * 0.002;
  const ms: V3 = [
    POSISI_MATAHARI[0] * Math.cos(putar) + POSISI_MATAHARI[2] * Math.sin(putar),
    0,
    -POSISI_MATAHARI[0] * Math.sin(putar) + POSISI_MATAHARI[2] * Math.cos(putar),
  ];
  const kita = keLayar(k, [ms[0], ms[1] - 1.6, ms[2]]);
  return (
    <AbsoluteFill>
      <Kanvas k={k}>
        <StarField3D count={2500} radius={90} seed={51} />
        <Nebula3D position={[-10, 3, -30]} radius={14} size={4} opacity={0.18} seed={77} colorA="#3a2a8a" colorB="#b24c8c" />
        <group position={[0, -1.6, 0]}>
          <SpiralGalaxy3D frame={f} radius={6} starCount={16000} />
          <Nebula3D radius={4.5} scale={[1.2, 0.08, 1.2]} size={1.2} opacity={0.05} colorA="#ffcf8a" colorB="#ff7ab0" seed={13} />
        </group>
      </Kanvas>
      <BingkaiSudut />
      <HUD bab="COSMIC MOTION" detail="BAGIAN 03 · GALAKSI" font={FONT} />
      <Judul kecil="GALAKSI KITA" judul="BIMA SAKTI" sub="Sekitar 100–400 miliar bintang" top={260} lama={130} font={FONT} />
      <Penanda x={kita.x} y={kita.y + (-1.6 * 0)} arahX={90} arahY={260} teks="TATA SURYA" sub="±26.000 tahun cahaya dari pusat" muncul={20} font={FONT} />
    </AbsoluteFill>
  );
};

export const ContohCosmic: React.FC = () => (
  <AbsoluteFill style={{ background: "#020713" }}>
    <Sequence durationInFrames={110}>
      <AdeganPlanet />
    </Sequence>
    <Sequence from={110} durationInFrames={110}>
      <AdeganTataSurya />
    </Sequence>
    <Sequence from={220} durationInFrames={110}>
      <AdeganGalaksi />
    </Sequence>
  </AbsoluteFill>
);
