// Komponen gaya ADRIY Scientific 3D, diadaptasi dari pustaka di .claude/skills/adriy-scientific-3d/library:
// ScientificLabLighting3D, DNAHelix3D, Molecule3D/Atom3D/ChemicalBond3D, CellMembrane3D, CellNucleus3D,
// CellOrganelle3D, ScientificScanPlane3D, ScientificGlowShell3D, label/readout/scale bar.
// Perubahan: format 9:16, tanpa @react-three/drei (garis diganti tabung 3D), detail organel lebih kaya,
// lapisan teks 2D yang terbaca di HP. Semua deterministik.
import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { AdditiveBlending, CatmullRomCurve3, DoubleSide, PerspectiveCamera, Quaternion, Vector3 } from "three";

export const W = 1080, H = 1920;
export const AKSEN = "#59d9ff";
export const EMAS = "#f0c879";
export const TEAL = "#43c9b1";
export type V3 = [number, number, number];
export type Kam = { pos: V3; lihat: V3; fov: number };

export const keLayar = (k: Kam, p: V3) => {
  const c = new PerspectiveCamera(k.fov, W / H, 0.1, 200);
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

// Pencahayaan laboratorium tiga titik (ScientificLabLighting3D)
export const CahayaLab: React.FC = () => (
  <>
    <ambientLight intensity={0.45} color="#d8eaff" />
    <directionalLight position={[4, 5, 6]} intensity={1.8} color="#ffffff" />
    <directionalLight position={[-4, 1, 3]} intensity={0.6} color="#8db9d8" />
    <pointLight position={[0, 2, -5]} intensity={30} distance={30} color="#59d9ff" />
  </>
);

export const Kanvas: React.FC<{ k: Kam; children: React.ReactNode }> = ({ k, children }) => (
  <ThreeCanvas width={W} height={H} camera={{ fov: k.fov, near: 0.1, far: 200 }} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} style={{ position: "absolute", inset: 0 }}>
    <AturKamera k={k} />
    <CahayaLab />
    {children}
  </ThreeCanvas>
);

// Silinder di antara dua titik (ChemicalBond3D)
export const Batang: React.FC<{ a: V3; b: V3; r: number; warna: string; opacity?: number; emisi?: number }> = ({ a, b, r, warna, opacity = 1, emisi = 0 }) => {
  const { pos, q, len } = useMemo(() => {
    const va = new Vector3(...a), vb = new Vector3(...b);
    const d = vb.clone().sub(va);
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), d.clone().normalize());
    return { pos: va.add(vb).multiplyScalar(0.5), q, len: d.length() };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={q}>
      <cylinderGeometry args={[r, r, len, 20]} />
      <meshPhysicalMaterial color={warna} roughness={0.3} clearcoat={0.6} emissive={warna} emissiveIntensity={emisi} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
};

export const Bola: React.FC<{ p: V3; r: number; warna: string; opacity?: number; emisi?: number }> = ({ p, r, warna, opacity = 1, emisi = 0 }) => (
  <mesh position={p}>
    <sphereGeometry args={[r, 48, 32]} />
    <meshPhysicalMaterial color={warna} roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.15} emissive={warna} emissiveIntensity={emisi} transparent={opacity < 1} opacity={opacity} />
  </mesh>
);

// Cangkang cahaya (ScientificGlowShell3D)
export const Cangkang: React.FC<{ r: number; warna: string; opacity?: number; scale?: V3; position?: V3 }> = ({ r, warna, opacity = 0.1, scale = [1, 1, 1], position = [0, 0, 0] }) => (
  <mesh scale={scale} position={position}>
    <sphereGeometry args={[r, 48, 32]} />
    <meshBasicMaterial color={warna} transparent opacity={opacity} depthWrite={false} blending={AdditiveBlending} side={DoubleSide} />
  </mesh>
);

export const Tabung: React.FC<{ titik: V3[]; r: number; warna: string; opacity?: number; emisi?: number }> = ({ titik, r, warna, opacity = 1, emisi = 0 }) => {
  const kurva = useMemo(() => new CatmullRomCurve3(titik.map((p) => new Vector3(...p))), [titik]);
  return (
    <mesh>
      <tubeGeometry args={[kurva, Math.max(32, titik.length * 6), r, 14, false]} />
      <meshPhysicalMaterial color={warna} roughness={0.35} clearcoat={0.5} emissive={warna} emissiveIntensity={emisi} transparent={opacity < 1} opacity={opacity} depthWrite={opacity > 0.9} />
    </mesh>
  );
};

// Bidang pindai bergerak (ScientificScanPlane3D)
export const BidangPindai: React.FC<{ lebar: number; dari: number; ke: number; lama: number; warna?: string }> = ({ lebar, dari, ke, lama, warna = AKSEN }) => {
  const f = useCurrentFrame();
  const p = interpolate(f % lama, [0, lama], [0, 1], { easing: Easing.inOut(Easing.sin) });
  const y = dari + (ke - dari) * p;
  return (
    <group position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[lebar, lebar]} />
        <meshBasicMaterial color={warna} transparent opacity={0.07} side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[lebar * 0.48, lebar * 0.5, 96]} />
        <meshBasicMaterial color={warna} transparent opacity={0.55} side={DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
};

// ---------- Lapisan 2D ----------
const MONO = "'DejaVu Sans Mono', 'Courier New', monospace";

export const LatarLab: React.FC = () => (
  <div
    style={{
      position: "absolute", inset: 0,
      background:
        "radial-gradient(ellipse at 50% 55%, rgba(40,110,150,0.35), transparent 60%), linear-gradient(160deg,#061321,#0c2638 55%,#102d43)",
    }}
  >
    <div
      style={{
        position: "absolute", inset: 0, opacity: 0.5,
        backgroundImage:
          "linear-gradient(rgba(89,217,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(89,217,255,0.07) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export const HUDLab: React.FC<{ lab: string; font: string }> = ({ lab, font }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 64, display: "flex", justifyContent: "space-between", fontFamily: font }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: AKSEN, boxShadow: `0 0 18px ${AKSEN}`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(f / 10)) }} />
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 5, color: "#e6f6ff" }}>SCIENTIFIC 3D</div>
        </div>
        <div style={{ marginTop: 10, fontSize: 22, letterSpacing: 3, color: AKSEN, fontFamily: MONO }}>{lab}</div>
      </div>
      <div style={{ textAlign: "right", fontFamily: MONO, fontSize: 20, color: "#8fb8cc", lineHeight: 1.6 }}>
        <div>REC ● {String(Math.floor(f / 30)).padStart(2, "0")}:{String(f % 30).padStart(2, "0")}</div>
        <div>MODE: ILUSTRASI</div>
      </div>
    </div>
  );
};

export const JudulLab: React.FC<{ kecil: string; judul: string; sub: string; top: number; font: string }> = ({ kecil, judul, sub, top, font }) => {
  const t = useCurrentFrame();
  const o = interpolate(t, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const garis = interpolate(t, [6, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, opacity: o, fontFamily: font }}>
      <div style={{ fontSize: 26, letterSpacing: 8, color: AKSEN, fontWeight: 700 }}>{kecil}</div>
      <div style={{ marginTop: 10, fontSize: 104, lineHeight: 1, fontWeight: 800, color: "#f2fbff" }}>{judul}</div>
      <div style={{ marginTop: 18, height: 4, width: 420 * garis, background: `linear-gradient(90deg, ${AKSEN}, transparent)` }} />
      <div style={{ marginTop: 18, fontSize: 38, color: "#b8d6e6", lineHeight: 1.3, maxWidth: 900 }}>{sub}</div>
    </div>
  );
};

// Label dengan garis penunjuk (ScientificLabel3D + ScientificLeaderLine3D)
export const LabelLab: React.FC<{ x: number; y: number; ke: { x: number; y: number }; teks: string; warna?: string; font: string; muncul?: number }> = ({ x, y, ke, teks, warna = AKSEN, font, muncul = 0 }) => {
  const t = useCurrentFrame() - muncul;
  const o = interpolate(t, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kanan = ke.x > x;
  // kartu selalu utuh di layar: perkiraan lebar dari panjang teks
  const lebar = teks.length * 19 + 50;
  const kiri = kanan ? Math.min(ke.x, W - 50 - lebar) : Math.max(50, ke.x - lebar);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, pointerEvents: "none" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <line x1={x} y1={y} x2={ke.x} y2={ke.y} stroke={warna} strokeWidth={2.5} strokeDasharray="8 6" />
        <circle cx={x} cy={y} r={8} fill={warna} />
        <circle cx={x} cy={y} r={16} fill="none" stroke={warna} strokeWidth={2} opacity={0.6} />
      </svg>
      <div
        style={{
          position: "absolute", top: ke.y - 28, left: kiri, whiteSpace: "nowrap",
          padding: "10px 20px", background: "rgba(6,19,33,0.82)", borderLeft: `5px solid ${warna}`, color: "#eaf7ff",
          fontFamily: font, fontSize: 32, fontWeight: 700, letterSpacing: 1, borderRadius: 6,
        }}
      >
        {teks}
      </div>
    </div>
  );
};

// Kartu angka (ScientificDataReadout3D)
export const Readout: React.FC<{ baris: { k: string; v: string }[]; bottom: number; font: string }> = ({ baris, bottom, font }) => (
  <div style={{ position: "absolute", left: 60, right: 60, bottom, background: "rgba(6,19,33,0.82)", border: "1px solid rgba(89,217,255,0.35)", borderRadius: 14, padding: "22px 30px", fontFamily: font }}>
    {baris.map((b, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 32, padding: "6px 0", borderTop: i ? "1px solid rgba(89,217,255,0.15)" : "none" }}>
        <span style={{ color: "#9cc3d6" }}>{b.k}</span>
        <span style={{ color: EMAS, fontWeight: 700, fontFamily: MONO }}>{b.v}</span>
      </div>
    ))}
  </div>
);

export const Catatan: React.FC<{ teks: string; font: string }> = ({ teks, font }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 60, textAlign: "center", fontFamily: font, fontSize: 22, color: "#6f93a6", letterSpacing: 2 }}>{teks}</div>
);
