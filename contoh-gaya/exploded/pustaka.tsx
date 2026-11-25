// Komponen gaya ADRIY Exploded View, diadaptasi dari pustaka di .claude/skills/adriy-exploded-view/library:
// ExplodedComponent3D, ExplodedLightingRig3D, ShadowStage3D, AssemblyConnector3D, ComponentNumber3D,
// ExplodedLabel3D, LeaderLine3D. Perubahan: format 9:16, pantulan lingkungan agar logam realistis,
// label & daftar bagian 2D yang terbaca di HP. Semua deterministik.
import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Euler, Matrix4, PMREMGenerator, PerspectiveCamera, Vector3 } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export const W = 1080, H = 1920;
export const EMAS = "#e8b65d";
export const CYAN = "#8bc9ed";
export const TERANG = "#e5edf4";
export type V3 = [number, number, number];
export type Kam = { pos: V3; lihat: V3; fov: number };
export type Pose = { pos: V3; rot: V3 };

// Proyeksi titik lokal objek (dengan pose grup) ke layar
export const keLayar = (k: Kam, pose: Pose, p: V3) => {
  const c = new PerspectiveCamera(k.fov, W / H, 0.1, 200);
  c.position.set(...k.pos);
  c.lookAt(...k.lihat);
  c.updateMatrixWorld();
  c.updateProjectionMatrix();
  const m = new Matrix4().makeRotationFromEuler(new Euler(...pose.rot)).setPosition(...pose.pos);
  const v = new Vector3(...p).applyMatrix4(m).project(c);
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

// Pantulan lingkungan studio (tanpa file luar) agar logam & kaca terlihat nyata
const Lingkungan: React.FC = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    gl.toneMappingExposure = 1.05;
  }, [gl, scene]);
  return null;
};

// Semua mesh memberi & menerima bayangan
const AktifkanBayangan: React.FC = () => {
  const { scene } = useThree();
  scene.traverse((o) => {
    const m = o as unknown as { isMesh?: boolean; castShadow: boolean; receiveShadow: boolean; userData: { tanpaBayangan?: boolean } };
    if (m.isMesh && !m.userData.tanpaBayangan) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });
  return null;
};

// ExplodedLightingRig3D + ShadowStage3D: key light berbayangan, rim dingin & hangat, lantai penerima bayangan
export const CahayaStudio: React.FC<{ lantaiY: number }> = ({ lantaiY }) => (
  <>
    <AktifkanBayangan />
    <hemisphereLight args={["#dfefff", "#0b1520", 0.35]} />
    <directionalLight
      position={[3.5, 9, 4]}
      intensity={2.4}
      color="#fff1d6"
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-left={-5}
      shadow-camera-right={5}
      shadow-camera-top={6}
      shadow-camera-bottom={-6}
      shadow-camera-near={0.5}
      shadow-camera-far={30}
      shadow-bias={-0.0004}
      shadow-normalBias={0.02}
    />
    <directionalLight position={[-6, 3, -4]} intensity={1.3} color="#8bc9ed" />
    <directionalLight position={[5, 1, -5]} intensity={0.8} color="#ffb870" />
    <pointLight position={[0, -1, 6]} intensity={8} distance={20} color="#cfe6ff" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, lantaiY, 0]} receiveShadow userData={{ tanpaBayangan: true }}>
      <circleGeometry args={[3.2, 64]} />
      <meshStandardMaterial color="#07101a" roughness={1} metalness={0} />
    </mesh>
    {[1.6, 2.4, 3.2].map((r) => (
      <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, lantaiY + 0.005, 0]}>
        <ringGeometry args={[r, r + 0.025, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.28} />
      </mesh>
    ))}
  </>
);

export const Kanvas: React.FC<{ k: Kam; children: React.ReactNode }> = ({ k, children }) => (
  <ThreeCanvas shadows width={W} height={H} camera={{ fov: k.fov, near: 0.1, far: 200 }} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} style={{ position: "absolute", inset: 0 }}>
    <AturKamera k={k} />
    <Lingkungan />
    {children}
  </ThreeCanvas>
);

// Kemajuan pembongkaran: utuh -> terurai (ExplodedComponent3D)
export const useBongkar = (mulai = 8, lama = 60) => {
  const f = useCurrentFrame();
  return interpolate(f, [mulai, mulai + lama], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
};
export const geser = (asal: V3, arah: V3, e: number): V3 => [asal[0] + arah[0] * e, asal[1] + arah[1] * e, asal[2] + arah[2] * e];

// Garis sumbu pembongkaran (AssemblyConnector3D)
export const SumbuPutus: React.FC<{ dari: V3; ke: V3 }> = ({ dari, ke }) => {
  const n = 40;
  const titik = Array.from({ length: n }, (_, i) => i).filter((i) => i % 2 === 0);
  return (
    <>
      {titik.map((i) => {
        const t0 = i / n, t1 = (i + 1) / n;
        const a = new Vector3(...dari).lerp(new Vector3(...ke), t0);
        const b = new Vector3(...dari).lerp(new Vector3(...ke), t1);
        const tengah = a.clone().add(b).multiplyScalar(0.5);
        const arah = b.clone().sub(a);
        const q = new Euler().setFromRotationMatrix(new Matrix4().lookAt(new Vector3(), arah, new Vector3(0, 0, 1)));
        return (
          <mesh key={i} position={tengah} rotation={q}>
            <boxGeometry args={[0.012, 0.012, arah.length()]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </>
  );
};

// ---------- Lapisan 2D ----------
const MONO = "'DejaVu Sans Mono', 'Courier New', monospace";

export const LatarCetakBiru: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, #12263a, #07111d 70%)" }}>
    <div
      style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(139,201,237,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(139,201,237,0.10) 1px, transparent 1px), linear-gradient(rgba(139,201,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,201,237,0.04) 1px, transparent 1px)",
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
      }}
    />
  </div>
);

export const KepalaTeknis: React.FC<{ kode: string; font: string }> = ({ kode, font }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top: 60, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: font }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 46, height: 46, border: `3px solid ${EMAS}`, display: "grid", placeItems: "center", transform: "rotate(45deg)" }}>
        <div style={{ width: 14, height: 14, background: EMAS }} />
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6, color: TERANG }}>EXPLODED VIEW</div>
    </div>
    <div style={{ fontFamily: MONO, fontSize: 22, color: CYAN, border: `1px solid ${CYAN}`, padding: "6px 14px", letterSpacing: 2 }}>{kode}</div>
  </div>
);

export const JudulTeknis: React.FC<{ kecil: string; judul: string; sub: string; font: string }> = ({ kecil, judul, sub, font }) => {
  const t = useCurrentFrame();
  const o = interpolate(t, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 170, textAlign: "center", opacity: o, fontFamily: font }}>
      <div style={{ fontSize: 26, letterSpacing: 9, color: EMAS, fontWeight: 700 }}>{kecil}</div>
      <div style={{ marginTop: 8, fontSize: 92, lineHeight: 1.02, fontWeight: 800, color: "#f2f6fa", letterSpacing: 2 }}>{judul}</div>
      <div style={{ marginTop: 14, fontSize: 36, color: "#9eb7c8" }}>{sub}</div>
    </div>
  );
};

// Nomor bagian + garis penunjuk + nama (ComponentNumber3D + LeaderLine3D + PartNameTag3D)
export const Penunjuk: React.FC<{ titik: { x: number; y: number }; no: string; nama: string; sisi: "kiri" | "kanan"; y?: number; muncul: number; font: string }> = ({ titik, no, nama, sisi, y, muncul, font }) => {
  const t = useCurrentFrame() - muncul;
  const o = interpolate(t, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ty = y ?? titik.y;
  const xUjung = sisi === "kiri" ? 250 : W - 250;
  const lebar = nama.length * 15 + 30;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, pointerEvents: "none" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <polyline points={`${titik.x},${titik.y} ${xUjung + (sisi === "kiri" ? 60 : -60)},${ty} ${xUjung},${ty}`} fill="none" stroke={TERANG} strokeWidth={2} opacity={0.75} />
        <circle cx={titik.x} cy={titik.y} r={6} fill={EMAS} stroke="#07111d" strokeWidth={2} />
      </svg>
      <div style={{ position: "absolute", top: ty - 27, left: sisi === "kiri" ? xUjung - 54 : xUjung, width: 54, height: 54, borderRadius: 27, background: EMAS, color: "#07111d", display: "grid", placeItems: "center", fontFamily: MONO, fontWeight: 700, fontSize: 24, boxShadow: "0 0 0 4px rgba(232,182,93,0.25)" }}>{no}</div>
      <div
        style={{
          position: "absolute", top: ty + 30, left: sisi === "kiri" ? Math.max(40, xUjung - lebar + 10) : Math.min(W - 40 - lebar, xUjung - 10),
          fontFamily: font, fontSize: 23, fontWeight: 700, letterSpacing: 1.5, color: TERANG, textShadow: "0 2px 8px #07111d", whiteSpace: "nowrap", textAlign: sisi === "kiri" ? "right" : "left", width: lebar,
        }}
      >
        {nama}
      </div>
    </div>
  );
};

// Daftar bagian (bill of materials) di bawah
export const DaftarBagian: React.FC<{ isi: string[]; font: string }> = ({ isi, font }) => (
  <div style={{ position: "absolute", left: 60, right: 60, bottom: 110, border: `1px solid rgba(139,201,237,0.35)`, background: "rgba(7,17,29,0.85)", fontFamily: font }}>
    <div style={{ padding: "10px 20px", background: "rgba(232,182,93,0.12)", borderBottom: "1px solid rgba(139,201,237,0.25)", fontFamily: MONO, fontSize: 20, letterSpacing: 3, color: EMAS }}>DAFTAR BAGIAN</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "8px 20px" }}>
      {isi.map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 23, color: "#d5e1eb", padding: "4px 0" }}>
          <span style={{ fontFamily: MONO, color: EMAS, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
          {n}
        </div>
      ))}
    </div>
  </div>
);

export const Catatan: React.FC<{ teks: string; font: string }> = ({ teks, font }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 55, textAlign: "center", fontFamily: font, fontSize: 21, color: "#6f8aa0", letterSpacing: 2 }}>{teks}</div>
);
