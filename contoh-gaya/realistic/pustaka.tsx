// Komponen gaya ADRIY Realistic 3D, diadaptasi dari pustaka di .claude/skills/adriy-realistic-3d/library
// (StudioLighting3D, RimLighting3D, ShadowGround3D, ProductPedestal3D, GlassObject3D, MetalObject3D,
// Extruded3DTitle, DustMotes3D, FogEnvironment3D). Bahan fisik (PBR): pantulan lingkungan studio,
// bayangan nyata, kaca/permata dengan IOR & dispersi, logam dengan roughness rendah. Semua deterministik.
import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Easing, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ACESFilmicToneMapping, Color, PMREMGenerator, PerspectiveCamera, SRGBColorSpace, Vector3 } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import fontJson from "./helvetiker_bold.typeface.json";
import { CanvasTexture } from "three";
import { FONT } from "../../src/components/Teks";

export const W = 1080, H = 1920;
export const F = { serif: "Playfair Display", poster: "Anton", sans: FONT, mono: "'DejaVu Sans Mono', monospace" };
export type V3 = [number, number, number];
export type Kam = { pos: V3; lihat: V3; fov: number };

if (typeof document !== "undefined") {
  const t = delayRender("font realistic");
  Promise.all(
    [["Playfair Display", "playfair-900", "900", "normal"], ["Playfair Display", "playfair-700-italic", "700", "italic"], ["Anton", "anton-400", "400", "normal"]].map(([fam, file, w, st]) =>
      new FontFace(fam, `url(${staticFile(`font/${file}.woff2`)}) format("woff2")`, { weight: w, style: st }).load().then((f) => (document.fonts as unknown as Set<FontFace>).add(f)),
    ),
  ).then(() => continueRender(t)).catch(() => continueRender(t));
}

export const keLayar = (k: Kam, p: V3) => {
  const c = new PerspectiveCamera(k.fov, W / H, 0.1, 200);
  c.position.set(...k.pos);
  c.lookAt(...k.lihat);
  c.updateMatrixWorld();
  c.updateProjectionMatrix();
  const v = new Vector3(...p).project(c);
  return { x: ((v.x + 1) / 2) * W, y: ((1 - v.y) / 2) * H };
};

const Pengatur: React.FC<{ k: Kam; env: number; paparan: number }> = ({ k, env, paparan }) => {
  const { camera, gl, scene } = useThree();
  camera.position.set(...k.pos);
  (camera as PerspectiveCamera).fov = k.fov;
  camera.lookAt(...k.lihat);
  (camera as PerspectiveCamera).updateProjectionMatrix();
  useMemo(() => {
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = paparan;
    gl.outputColorSpace = SRGBColorSpace;
    const pm = new PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.03).texture;
    scene.environmentIntensity = env;
    pm.dispose();
  }, [gl, scene, env, paparan]);
  // bayangan untuk semua mesh
  scene.traverse((o) => {
    const m = o as unknown as { isMesh?: boolean; castShadow: boolean; receiveShadow: boolean; userData: { tanpaBayang?: boolean } };
    if (m.isMesh && !m.userData.tanpaBayang) { m.castShadow = true; m.receiveShadow = true; }
  });
  return null;
};

export const Kanvas: React.FC<{ k: Kam; children: React.ReactNode; latar: string; env?: number; paparan?: number; kabut?: [string, number, number] }> = ({ k, children, latar, env = 1, paparan = 1, kabut }) => (
  <ThreeCanvas shadows width={W} height={H} camera={{ fov: k.fov, near: 0.1, far: 200 }} gl={{ antialias: true, preserveDrawingBuffer: true }} style={{ position: "absolute", inset: 0 }}>
    <color attach="background" args={[latar]} />
    {kabut && <fog attach="fog" args={kabut} />}
    <Pengatur k={k} env={env} paparan={paparan} />
    {children}
  </ThreeCanvas>
);

// Studio: key berbayangan + fill + dua rim (StudioLighting3D + RimLighting3D)
export const Studio: React.FC<{ key1?: string; rimA?: string; rimB?: string; kuat?: number }> = ({ key1 = "#FFF4E6", rimA = "#8EC5FF", rimB = "#FFB36B", kuat = 1 }) => (
  <>
    <directionalLight position={[3, 7, 4]} intensity={2.6 * kuat} color={key1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-bias={-0.0003} shadow-normalBias={0.02} />
    <directionalLight position={[-4, 2, 3]} intensity={0.5 * kuat} color="#DDE8FF" />
    <spotLight position={[-5, 4, -4]} angle={0.6} penumbra={0.9} intensity={90 * kuat} color={rimA} />
    <spotLight position={[5, 3, -4]} angle={0.6} penumbra={0.9} intensity={70 * kuat} color={rimB} />
  </>
);

// Lantai reflektif gelap + bayangan (ShadowGround3D)
export const Lantai: React.FC<{ y: number; warna?: string; kasar?: number }> = ({ y, warna = "#0E0E10", kasar = 0.35 }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
    <circleGeometry args={[30, 96]} />
    <meshStandardMaterial color={warna} roughness={kasar} metalness={0.15} envMapIntensity={0.25} />
  </mesh>
);

// Teks 3D diekstrusi (Extruded3DTitle)
const font = new FontLoader().parse(fontJson as unknown as Parameters<FontLoader["parse"]>[0]);
export const Teks3D: React.FC<{ teks: string; ukuran: number; tebal: number; children: React.ReactNode; position?: V3; rotation?: V3 }> = ({ teks, ukuran, tebal, children, position, rotation }) => {
  const g = useMemo(() => {
    const t = new TextGeometry(teks, { font, size: ukuran, depth: tebal, curveSegments: 10, bevelEnabled: true, bevelThickness: tebal * 0.15, bevelSize: ukuran * 0.025, bevelSegments: 4 });
    t.center();
    return t;
  }, [teks, ukuran, tebal]);
  return <mesh geometry={g} position={position} rotation={rotation}>{children}</mesh>;
};

// Debu berkilau di udara (DustMotes3D)
export const Debu: React.FC<{ n?: number; luas?: V3; warna?: string; ukuran?: number }> = ({ n = 120, luas = [6, 6, 4], warna = "#FFE8C2", ukuran = 0.018 }) => {
  const f = useCurrentFrame();
  const titik = useMemo(() => Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    return [(r(1) - 0.5) * luas[0], (r(2) - 0.5) * luas[1], (r(3) - 0.5) * luas[2], r(4)] as [number, number, number, number];
  }), [n, luas]);
  return (
    <>
      {titik.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x + Math.sin(f / 40 + i) * 0.05, y + ((f * 0.002 + s) % 1) * 0.4, z]} userData={{ tanpaBayang: true }}>
          <sphereGeometry args={[ukuran * (0.5 + s), 6, 6]} />
          <meshBasicMaterial color={warna} transparent opacity={0.35 + 0.4 * Math.abs(Math.sin(f / 9 + i))} />
        </mesh>
      ))}
    </>
  );
};

// ---------- Lapisan 2D sinematik ----------
const masuk = (f: number, t: number, lama = 18) => interpolate(f, [t, t + lama], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

export const Kepala: React.FC<{ seri: string; aksen: string }> = ({ seri, aksen }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top: 64, display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ width: 10, height: 10, borderRadius: 5, background: aksen, boxShadow: `0 0 14px ${aksen}` }} />
    <div style={{ fontFamily: F.poster, fontSize: 26, letterSpacing: 8, color: "#E9E6E1" }}>{seri}</div>
    <div style={{ flex: 1, height: 1, background: "rgba(233,230,225,0.25)" }} />
  </div>
);

export const Judul: React.FC<{ kecil: string; besar: string; aksen: string; top?: number }> = ({ kecil, besar, aksen, top = 120 }) => {
  const f = useCurrentFrame();
  const p = masuk(f, 4, 26);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, opacity: p, transform: `translateY(${(1 - p) * 26}px)` }}>
      <div style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 44, color: aksen }}>{kecil}</div>
      <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 108, lineHeight: 1, color: "#F4F1EC", letterSpacing: 1, textShadow: "0 6px 40px rgba(0,0,0,0.6)" }}>{besar}</div>
    </div>
  );
};

// Label spesifikasi: garis tipis dari titik 3D ke kartu kaca gelap
export const Spek: React.FC<{ dari: { x: number; y: number }; x: number; y: number; nilai: string; label: string; aksen: string; tunda: number; kanan?: boolean }> = ({ dari, x, y, nilai, label, aksen, tunda, kanan }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 16);
  const ujungX = kanan ? x : x + 300;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: p }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <path d={`M ${dari.x} ${dari.y} L ${ujungX} ${y + 30}`} stroke="rgba(244,241,236,0.6)" strokeWidth={1.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
        <circle cx={dari.x} cy={dari.y} r={6} fill={aksen} />
        <circle cx={dari.x} cy={dari.y} r={14} fill="none" stroke={aksen} strokeWidth={1.5} opacity={0.6} />
      </svg>
      <div style={{ position: "absolute", left: x, top: y, width: 300, padding: "14px 18px", background: "rgba(14,14,16,0.6)", border: "1px solid rgba(244,241,236,0.18)", borderLeft: `3px solid ${aksen}`, backdropFilter: "blur(6px)" }}>
        <div style={{ fontFamily: F.poster, fontSize: 44, color: "#F4F1EC", lineHeight: 1 }}>{nilai}</div>
        <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 21, color: "rgba(244,241,236,0.75)", marginTop: 6, lineHeight: 1.25 }}>{label}</div>
      </div>
    </div>
  );
};

export const Penutup: React.FC<{ teks: string; sub: string; aksen: string; tunda: number }> = ({ teks, sub, aksen, tunda }) => {
  const f = useCurrentFrame();
  const p = masuk(f, tunda, 22);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: 110, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${aksen}, transparent)` }} />
      <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 46, color: "#F4F1EC", marginTop: 20, lineHeight: 1.15 }}>{teks}</div>
      <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 25, color: "rgba(244,241,236,0.7)", marginTop: 10 }}>{sub}</div>
    </div>
  );
};

export const Sumber: React.FC<{ teks: string }> = ({ teks }) => (
  <div style={{ position: "absolute", left: 60, bottom: 46, fontFamily: F.sans, fontSize: 18, color: "rgba(244,241,236,0.45)" }}>{teks}</div>
);
export { Color };

// Cahaya latar bergradasi lembut (pengganti lingkaran bertepi tajam)
const cacheGlow = new Map<string, CanvasTexture>();
export const CahayaLatar: React.FC<{ warna: string; ukuran: number; position: V3; kuat?: number }> = ({ warna, ukuran, position, kuat = 1 }) => {
  let t = cacheGlow.get(warna);
  if (!t && typeof document !== "undefined") {
    const k = document.createElement("canvas");
    k.width = k.height = 256;
    const c = k.getContext("2d")!;
    const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, warna);
    g.addColorStop(0.5, warna + "66");
    g.addColorStop(1, warna + "00");
    c.fillStyle = g;
    c.fillRect(0, 0, 256, 256);
    t = new CanvasTexture(k);
    cacheGlow.set(warna, t);
  }
  return (
    <mesh position={position} userData={{ tanpaBayang: true }}>
      <planeGeometry args={[ukuran, ukuran]} />
      <meshBasicMaterial map={t ?? undefined} transparent opacity={kuat} depthWrite={false} fog={false} />
    </mesh>
  );
};
