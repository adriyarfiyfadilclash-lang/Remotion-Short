// Komponen gaya ADRIY Cosmic Motion, diadaptasi dari pustaka di .claude/skills/adriy-cosmic-motion/library:
// StarField3D, Nebula3D, SpiralGalaxy3D, AsteroidBelt3D, CinematicSpaceLighting, CosmicHUDOverlay,
// CosmicTitleSequence, CosmicTimelineMarker. Perubahan: ukuran teks untuk 9:16, tanpa @react-three/drei,
// planet bertekstur prosedural, dan matahari bercahaya. Semua deterministik (seed tetap).
import React, { useMemo } from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { AdditiveBlending, CanvasTexture, Color, DoubleSide, SRGBColorSpace } from "three";

export const AKSEN = "#79d9ff";

const acak = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

// ---------- Objek 3D ----------
export const StarField3D: React.FC<{ count?: number; radius?: number; seed?: number; size?: number; opacity?: number }> = ({
  count = 2500, radius = 60, seed = 17, size = 0.12, opacity = 0.95,
}) => {
  const data = useMemo(() => {
    const r = acak(seed);
    const p: number[] = [];
    const c: number[] = [];
    const warna = [new Color("#dceeff"), new Color("#fff1d6"), new Color("#bcd0ff"), new Color("#ffd2c2")];
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1, t = r() * Math.PI * 2, rr = radius * (0.6 + 0.4 * r());
      const q = Math.sqrt(1 - u * u) * rr;
      p.push(q * Math.cos(t), u * rr, q * Math.sin(t));
      const w = warna[i % 4].clone().multiplyScalar(0.5 + 0.5 * r());
      c.push(w.r, w.g, w.b);
    }
    return { p: new Float32Array(p), c: new Float32Array(c) };
  }, [count, radius, seed]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.p, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.c, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// Tekstur titik lembut agar partikel nebula & galaksi tidak kotak
let teksturTitik: CanvasTexture | null = null;
const titikLembut = () => {
  if (teksturTitik || typeof document === "undefined") return teksturTitik;
  const k = document.createElement("canvas");
  k.width = k.height = 64;
  const ctx = k.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  teksturTitik = new CanvasTexture(k);
  return teksturTitik;
};

export const Nebula3D: React.FC<{
  count?: number; radius?: number; seed?: number; colorA?: string; colorB?: string; opacity?: number;
  scale?: [number, number, number]; position?: [number, number, number]; size?: number;
}> = ({ count = 2400, radius = 6, seed = 41, colorA = "#6c4db5", colorB = "#e477a8", opacity = 0.35, scale = [1.7, 0.75, 1], position = [0, 0, 0], size = 1.1 }) => {
  const data = useMemo(() => {
    const ca = new Color(colorA), cb = new Color(colorB);
    const r = acak(seed);
    const p: number[] = [], c: number[] = [];
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2, rr = Math.pow(r(), 0.55) * radius, y = (r() - 0.5) * radius * 0.55;
      p.push(Math.cos(a) * rr, y, Math.sin(a) * rr);
      const cc = ca.clone().lerp(cb, r());
      c.push(cc.r, cc.g, cc.b);
    }
    return { p: new Float32Array(p), c: new Float32Array(c) };
  }, [count, radius, seed, colorA, colorB]);
  return (
    <points scale={scale} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.p, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.c, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors map={titikLembut() ?? undefined} transparent opacity={opacity} size={size} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
};

export const SpiralGalaxy3D: React.FC<{ starCount?: number; arms?: number; radius?: number; seed?: number; frame?: number; rotationSpeed?: number }> = ({
  starCount = 9000, arms = 4, radius = 6, seed = 7, frame = 0, rotationSpeed = 0.002,
}) => {
  const data = useMemo(() => {
    const r = acak(seed);
    const p: number[] = [], c: number[] = [];
    const inti = new Color("#ffe2ad"), lengan = new Color("#9fbaff"), merah = new Color("#ff8fb3");
    for (let i = 0; i < starCount; i++) {
      const arm = i % arms;
      const rr = Math.pow(r(), 0.7) * radius;
      const sebar = r() < 0.18 ? 3.2 : 1;
      const a = (arm / arms) * Math.PI * 2 + 2.6 * Math.log(1 + rr) + (r() - 0.5) * 0.5 * sebar;
      const tebal = 0.12 + 0.35 * Math.exp(-rr * 0.9);
      p.push(Math.cos(a) * rr, (r() - 0.5) * tebal, Math.sin(a) * rr);
      const t = Math.min(1, rr / (radius * 0.45));
      const w = inti.clone().lerp(lengan, t);
      if (r() < 0.06) w.lerp(merah, 0.8);
      c.push(w.r, w.g, w.b);
    }
    return { p: new Float32Array(p), c: new Float32Array(c) };
  }, [starCount, arms, radius, seed]);
  return (
    <group rotation={[0, frame * rotationSpeed, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.p, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.c, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors map={titikLembut() ?? undefined} size={0.1} transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
      </points>
      <Cahaya warna="#ffd9a0" ukuran={radius * 0.75} kuat={0.75} />
    </group>
  );
};

export const AsteroidBelt3D: React.FC<{ count?: number; innerRadius?: number; outerRadius?: number; thickness?: number; frame?: number; rotationSpeed?: number; seed?: number }> = ({
  count = 260, innerRadius = 7.2, outerRadius = 8.2, thickness = 0.25, frame = 0, rotationSpeed = 0.0018, seed = 29,
}) => {
  const batu = useMemo(() => {
    const r = acak(seed);
    return Array.from({ length: count }, (_, i) => ({
      a: r() * Math.PI * 2, rr: innerRadius + r() * (outerRadius - innerRadius), y: (r() - 0.5) * thickness,
      s: 0.02 + r() * 0.06, rot: [r() * 3, r() * 3, r() * 3] as [number, number, number], k: i,
    }));
  }, [count, innerRadius, outerRadius, thickness, seed]);
  const putar = frame * rotationSpeed;
  return (
    <group>
      {batu.map((b) => (
        <mesh key={b.k} position={[Math.cos(b.a + putar) * b.rr, b.y, Math.sin(b.a + putar) * b.rr]} rotation={b.rot} scale={b.s}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8d8174" roughness={1} />
        </mesh>
      ))}
    </group>
  );
};

// Cahaya lembut (sprite gradien) untuk matahari & inti galaksi
let teksturCahaya: CanvasTexture | null = null;
export const Cahaya: React.FC<{ warna: string; ukuran: number; kuat?: number; position?: [number, number, number] }> = ({ warna, ukuran, kuat = 1, position = [0, 0, 0] }) => {
  if (!teksturCahaya && typeof document !== "undefined") {
    const k = document.createElement("canvas");
    k.width = k.height = 256;
    const ctx = k.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.15, "rgba(255,255,255,0.6)");
    g.addColorStop(0.45, "rgba(255,255,255,0.15)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    teksturCahaya = new CanvasTexture(k);
  }
  return (
    <sprite position={position} scale={[ukuran, ukuran, 1]}>
      <spriteMaterial map={teksturCahaya ?? undefined} color={warna} transparent opacity={kuat} depthWrite={false} blending={AdditiveBlending} />
    </sprite>
  );
};

// Tekstur planet prosedural: pita (raksasa gas) atau bercak (planet batuan)
const cacheTekstur = new Map<string, CanvasTexture>();
const teksturPlanet = (kunci: string, warna: string[], pita: boolean, seed: number) => {
  const ada = cacheTekstur.get(kunci);
  if (ada || typeof document === "undefined") return ada ?? null;
  const W = 512, H = 256;
  const k = document.createElement("canvas");
  k.width = W;
  k.height = H;
  const ctx = k.getContext("2d")!;
  const r = acak(seed);
  ctx.fillStyle = warna[0];
  ctx.fillRect(0, 0, W, H);
  if (pita) {
    for (let y = 0; y < H; y += 2) {
      const t = Math.sin(y * 0.11) * 0.5 + Math.sin(y * 0.37 + 1.3) * 0.3 + Math.sin(y * 0.9) * 0.2;
      ctx.fillStyle = warna[Math.floor((t * 0.5 + 0.5) * (warna.length - 0.01))];
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, y, W, 2);
    }
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = warna[i % warna.length];
      ctx.beginPath();
      ctx.ellipse(r() * W, r() * H, 10 + r() * 40, 2 + r() * 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = warna[1 + (i % (warna.length - 1))];
      ctx.beginPath();
      ctx.ellipse(r() * W, r() * H, 6 + r() * 38, 4 + r() * 22, r() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  const t = new CanvasTexture(k);
  t.colorSpace = SRGBColorSpace;
  cacheTekstur.set(kunci, t);
  return t;
};

export const Planet3D: React.FC<{
  nama: string; radius: number; warna: string[]; pita?: boolean; seed?: number; position?: [number, number, number];
  frame?: number; rotationSpeed?: number; tilt?: number; atmosfer?: string;
}> = ({ nama, radius, warna, pita = false, seed = 3, position = [0, 0, 0], frame = 0, rotationSpeed = 0.004, tilt = 0, atmosfer }) => {
  const peta = teksturPlanet(nama, warna, pita, seed);
  return (
    <group position={position} rotation={[0, 0, tilt]}>
      <mesh rotation={[0, frame * rotationSpeed, 0]}>
        <sphereGeometry args={[radius, 64, 48]} />
        <meshStandardMaterial map={peta ?? undefined} roughness={0.85} metalness={0} />
      </mesh>
      {atmosfer && (
        <mesh scale={1.05}>
          <sphereGeometry args={[radius, 48, 32]} />
          <meshBasicMaterial color={atmosfer} transparent opacity={0.18} side={DoubleSide} depthWrite={false} blending={AdditiveBlending} />
        </mesh>
      )}
    </group>
  );
};

// Cincin planet dengan pita transparan
let teksturCincin: CanvasTexture | null = null;
export const Cincin: React.FC<{ dalam: number; luar: number }> = ({ dalam, luar }) => {
  if (!teksturCincin && typeof document !== "undefined") {
    const k = document.createElement("canvas");
    k.width = 512;
    k.height = 8;
    const ctx = k.getContext("2d")!;
    for (let x = 0; x < 512; x++) {
      const t = x / 512;
      const a = 0.25 + 0.55 * Math.abs(Math.sin(t * 40) * Math.sin(t * 13 + 1)) * (t > 0.62 && t < 0.66 ? 0.1 : 1);
      ctx.fillStyle = `rgba(${220 - t * 40},${200 - t * 50},${160 - t * 40},${a})`;
      ctx.fillRect(x, 0, 1, 8);
    }
    teksturCincin = new CanvasTexture(k);
  }
  const geo = useMemo(() => {
    // UV radial agar tekstur mengikuti jari-jari cincin
    return { dalam, luar };
  }, [dalam, luar]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry
        args={[geo.dalam, geo.luar, 128, 1]}
        onUpdate={(g) => {
          const pos = g.attributes.position;
          const uv = g.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const d = Math.hypot(pos.getX(i), pos.getY(i));
            uv.setXY(i, (d - geo.dalam) / (geo.luar - geo.dalam), 0.5);
          }
          uv.needsUpdate = true;
        }}
      />
      <meshStandardMaterial map={teksturCincin ?? undefined} transparent side={DoubleSide} depthWrite={false} roughness={1} />
    </mesh>
  );
};

export const Orbit: React.FC<{ radius: number; warna?: string; opacity?: number }> = ({ radius, warna = "#5c839b", opacity = 0.5 }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.012, radius + 0.012, 256]} />
    <meshBasicMaterial color={warna} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
  </mesh>
);

export const CinematicSpaceLighting: React.FC = () => (
  <>
    <ambientLight intensity={0.12} />
    <directionalLight position={[7, 8, 10]} color="#fff0d6" intensity={2.8} />
    <pointLight position={[-8, 1, 5]} color="#638dff" intensity={30} distance={80} decay={2} />
    <pointLight position={[0, 5, -9]} color="#a27aff" intensity={60} distance={100} decay={2} />
  </>
);

// ---------- Lapisan 2D (HUD dokumenter sains) ----------
export const HUD: React.FC<{ bab: string; detail: string; font: string }> = ({ bab, detail, font }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, padding: "70px 60px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontFamily: font, color: AKSEN, pointerEvents: "none" }}>
      <div style={{ borderLeft: `4px solid ${AKSEN}`, paddingLeft: 20 }}>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6 }}>{bab}</div>
        <div style={{ fontSize: 22, letterSpacing: 4, opacity: 0.7, marginTop: 8 }}>{detail}</div>
      </div>
      <div style={{ fontSize: 22, letterSpacing: 4, opacity: 0.75, marginTop: 6 }}>FRAME {String(f).padStart(4, "0")}</div>
    </div>
  );
};

// Bingkai sudut ala layar pemindai
export const BingkaiSudut: React.FC = () => {
  const s = { position: "absolute" as const, width: 70, height: 70, borderColor: "rgba(121,217,255,0.55)", borderStyle: "solid" };
  return (
    <>
      <div style={{ ...s, top: 40, left: 40, borderWidth: "3px 0 0 3px" }} />
      <div style={{ ...s, top: 40, right: 40, borderWidth: "3px 3px 0 0" }} />
      <div style={{ ...s, bottom: 40, left: 40, borderWidth: "0 0 3px 3px" }} />
      <div style={{ ...s, bottom: 40, right: 40, borderWidth: "0 3px 3px 0" }} />
    </>
  );
};

export const Judul: React.FC<{ kecil: string; judul: string; sub?: string; mulai?: number; lama?: number; top: number; font: string }> = ({ kecil, judul, sub, mulai = 0, lama = 100, top, font }) => {
  const t = useCurrentFrame() - mulai;
  const opacity = interpolate(t, [0, 18, lama - 14, lama], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(t, [0, 24], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", opacity, transform: `translateY(${y}px)`, fontFamily: font }}>
      <div style={{ fontSize: 28, letterSpacing: 10, color: AKSEN, fontWeight: 700 }}>{kecil}</div>
      <div style={{ marginTop: 18, fontSize: 96, lineHeight: 1.05, fontWeight: 800, color: "#f4f9ff", letterSpacing: 4, textShadow: "0 0 40px rgba(75,170,255,.55)" }}>{judul}</div>
      {sub && <div style={{ marginTop: 22, fontSize: 40, color: "#b9cce0", letterSpacing: 1 }}>{sub}</div>}
    </div>
  );
};

// Label info dengan titik penanda dan garis (versi 2D dari CosmicInfoLabel3D)
export const Penanda: React.FC<{ x: number; y: number; arahX: number; arahY: number; teks: string; sub?: string; font: string; muncul?: number }> = ({ x, y, arahX, arahY, teks, sub, font, muncul = 0 }) => {
  const t = useCurrentFrame() - muncul;
  const o = interpolate(t, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const denyut = 1 + 0.25 * Math.sin(t / 6);
  const lx = x + arahX, ly = y + arahY;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, fontFamily: font, pointerEvents: "none" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <circle cx={x} cy={y} r={14 * denyut} fill="none" stroke={AKSEN} strokeWidth={3} opacity={0.8} />
        <circle cx={x} cy={y} r={6} fill={AKSEN} />
        <polyline points={`${x},${y} ${lx},${ly} ${lx + (arahX > 0 ? 40 : -40)},${ly}`} fill="none" stroke={AKSEN} strokeWidth={2.5} />
      </svg>
      <div
        style={{
          position: "absolute", top: ly - 40, ...(arahX > 0 ? { left: lx + 50 } : { right: 1080 - lx + 50 }),
          padding: "14px 22px", whiteSpace: "nowrap", border: `2px solid ${AKSEN}`, background: "rgba(2,10,28,0.72)", borderRadius: 10, color: "#eaf7ff",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3 }}>{teks}</div>
        {sub && <div style={{ fontSize: 24, color: "#9fc7dd", marginTop: 4, letterSpacing: 1 }}>{sub}</div>}
      </div>
    </div>
  );
};

export const Keterangan: React.FC<{ teks: string; font: string }> = ({ teks, font }) => (
  <div style={{ position: "absolute", left: 60, right: 60, bottom: 150, textAlign: "center", fontFamily: font }}>
    <span style={{ display: "inline-block", padding: "18px 32px", borderRadius: 14, background: "rgba(2,10,28,0.7)", border: "1px solid rgba(121,217,255,0.35)", color: "#dff3ff", fontSize: 38, fontWeight: 500 }}>
      {teks}
    </span>
  </div>
);
