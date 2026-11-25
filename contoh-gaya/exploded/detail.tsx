// Bagian kecil yang dipakai ulang untuk model Exploded View yang detail:
// tekstur prosedural (PCB, stiker baterai), sekrup, tabung lengkung, heliks/ulir, spiral datar, bantalan bola, bubut (lathe).
import React, { useMemo } from "react";
import { CanvasTexture, CatmullRomCurve3, Curve, LatheGeometry, RepeatWrapping, SRGBColorSpace, SplineCurve, Vector2, Vector3 } from "three";

export type V3 = [number, number, number];

const cacheTekstur = new Map<string, CanvasTexture>();
const buatTekstur = (kunci: string, w: number, h: number, gambar: (c: CanvasRenderingContext2D) => void) => {
  const ada = cacheTekstur.get(kunci);
  if (ada || typeof document === "undefined") return ada ?? null;
  const k = document.createElement("canvas");
  k.width = w;
  k.height = h;
  gambar(k.getContext("2d")!);
  const t = new CanvasTexture(k);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  cacheTekstur.set(kunci, t);
  return t;
};

// PCB: lapisan solder-mask + jalur tembaga + pad emas + tulisan silkscreen
export const teksturPCB = (warna = "#0f4a3a", kunci = "pcb") =>
  buatTekstur(kunci, 512, 512, (c) => {
    c.fillStyle = warna;
    c.fillRect(0, 0, 512, 512);
    let s = 7;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    c.lineCap = "round";
    for (let i = 0; i < 90; i++) {
      c.strokeStyle = `rgba(120,200,150,${0.18 + r() * 0.2})`;
      c.lineWidth = 2 + r() * 3;
      let x = r() * 512, y = r() * 512;
      c.beginPath();
      c.moveTo(x, y);
      for (let j = 0; j < 3; j++) {
        if (r() < 0.5) x += (r() - 0.5) * 220;
        else y += (r() - 0.5) * 220;
        c.lineTo(x, y);
      }
      c.stroke();
    }
    for (let i = 0; i < 140; i++) {
      c.fillStyle = r() < 0.7 ? "#d9b25a" : "#c8d2da";
      const x = r() * 512, y = r() * 512;
      c.fillRect(x, y, 6 + r() * 6, 4 + r() * 4);
    }
    c.fillStyle = "rgba(255,255,255,0.65)";
    c.font = "bold 16px monospace";
    ["C12", "R7", "U3", "L2", "J1", "Q4"].forEach((t, i) => c.fillText(t, 40 + i * 75, 40 + (i % 3) * 170));
  });

export const teksturBaterai = () =>
  buatTekstur("baterai", 512, 768, (c) => {
    c.fillStyle = "#1b222b";
    c.fillRect(0, 0, 512, 768);
    c.fillStyle = "#e8b65d";
    c.fillRect(0, 0, 512, 90);
    c.fillStyle = "#1b222b";
    c.font = "bold 46px sans-serif";
    c.fillText("Li-ion Polymer", 30, 62);
    c.fillStyle = "#d5e1eb";
    c.font = "bold 64px sans-serif";
    c.fillText("3.87 V", 30, 220);
    c.fillText("4500 mAh", 30, 300);
    c.font = "28px sans-serif";
    c.fillStyle = "#8eb6cf";
    ["Jangan dibongkar", "Jangan dibakar", "Jangan ditusuk"].forEach((t, i) => c.fillText("⚠ " + t, 30, 420 + i * 50));
    c.strokeStyle = "#8eb6cf";
    c.lineWidth = 4;
    c.strokeRect(30, 600, 120, 120);
    c.strokeRect(180, 600, 120, 120);
    c.font = "bold 40px sans-serif";
    c.fillText("CE", 55, 675);
    c.fillText("♻", 215, 678);
  });

export const teksturGrill = () =>
  buatTekstur("grill", 256, 64, (c) => {
    c.fillStyle = "#1a1f26";
    c.fillRect(0, 0, 256, 64);
    c.fillStyle = "#05080b";
    for (let x = 0; x < 16; x++) for (let y = 0; y < 3; y++) {
      c.beginPath();
      c.arc(12 + x * 15.5, 14 + y * 18, 5, 0, Math.PI * 2);
      c.fill();
    }
  });

export const teksturLaminasi = () => {
  const t = buatTekstur("laminasi", 64, 256, (c) => {
    c.fillStyle = "#56636f";
    c.fillRect(0, 0, 64, 256);
    for (let y = 0; y < 256; y += 8) {
      c.fillStyle = "#2c343c";
      c.fillRect(0, y, 64, 2);
    }
  });
  if (t) {
    t.wrapS = t.wrapT = RepeatWrapping;
  }
  return t;
};

// Sekrup kepala bulat dengan alur silang
export const Sekrup: React.FC<{ p: V3; r?: number }> = ({ p, r = 0.035 }) => (
  <group position={p}>
    <mesh>
      <cylinderGeometry args={[r, r * 1.05, r * 0.7, 20]} />
      <meshStandardMaterial color="#c9d3db" metalness={0.95} roughness={0.2} />
    </mesh>
    <mesh position={[0, r * 0.36, 0]}>
      <boxGeometry args={[r * 1.4, r * 0.15, r * 0.25]} />
      <meshStandardMaterial color="#1a1f26" />
    </mesh>
    <mesh position={[0, r * 0.36, 0]}>
      <boxGeometry args={[r * 0.25, r * 0.15, r * 1.4]} />
      <meshStandardMaterial color="#1a1f26" />
    </mesh>
  </group>
);

// Tabung lewat titik-titik (kabel, pipa)
export const Kabel: React.FC<{ titik: V3[]; r: number; warna: string; logam?: number; kasar?: number }> = ({ titik, r, warna, logam = 0.1, kasar = 0.45 }) => {
  const c = useMemo(() => new CatmullRomCurve3(titik.map((p) => new Vector3(...p))), [titik]);
  return (
    <mesh>
      <tubeGeometry args={[c, Math.max(24, titik.length * 10), r, 10, false]} />
      <meshStandardMaterial color={warna} metalness={logam} roughness={kasar} />
    </mesh>
  );
};

class KurvaFungsi extends Curve<Vector3> {
  constructor(private f: (t: number) => V3) {
    super();
  }
  getPoint(t: number, target = new Vector3()) {
    return target.set(...this.f(t));
  }
}

// Heliks (ulir, pegas, lilitan)
export const Heliks: React.FC<{ r: number; pitch: number; putaran: number; tebal: number; warna: string; y0?: number; logam?: number; kasar?: number }> = ({ r, pitch, putaran, tebal, warna, y0 = 0, logam = 0.9, kasar = 0.25 }) => {
  const c = useMemo(() => new KurvaFungsi((t) => {
    const a = t * putaran * Math.PI * 2;
    return [Math.cos(a) * r, y0 + t * putaran * pitch, Math.sin(a) * r];
  }), [r, pitch, putaran, y0]);
  return (
    <mesh>
      <tubeGeometry args={[c, Math.ceil(putaran * 48), tebal, 10, false]} />
      <meshStandardMaterial color={warna} metalness={logam} roughness={kasar} />
    </mesh>
  );
};

// Spiral datar (koil pengisian nirkabel) di bidang XZ
export const SpiralDatar: React.FC<{ rDalam: number; rLuar: number; putaran: number; tebal: number }> = ({ rDalam, rLuar, putaran, tebal }) => {
  const c = useMemo(() => new KurvaFungsi((t) => {
    const a = t * putaran * Math.PI * 2;
    const r = rDalam + (rLuar - rDalam) * t;
    return [Math.cos(a) * r, 0, Math.sin(a) * r];
  }), [rDalam, rLuar, putaran]);
  return (
    <mesh>
      <tubeGeometry args={[c, Math.ceil(putaran * 64), tebal, 8, false]} />
      <meshStandardMaterial color="#c8743a" metalness={0.9} roughness={0.28} />
    </mesh>
  );
};

// Lilitan kawat di sekeliling lengan rotor (loop persegi membulat yang maju sepanjang lengan)
export const Lilitan: React.FC<{ dari: number; ke: number; lebar: number; tinggi: number; putaran: number; tebal: number }> = ({ dari, ke, lebar, tinggi, putaran, tebal }) => {
  const c = useMemo(() => new KurvaFungsi((t) => {
    const a = t * putaran * Math.PI * 2;
    const x = dari + (ke - dari) * t;
    // superelips: persegi membulat
    const ca = Math.cos(a), sa = Math.sin(a);
    const e = 0.35;
    const z = Math.sign(ca) * Math.pow(Math.abs(ca), e) * lebar;
    const y = Math.sign(sa) * Math.pow(Math.abs(sa), e) * tinggi;
    return [x, y, z];
  }), [dari, ke, lebar, tinggi, putaran]);
  return (
    <mesh>
      <tubeGeometry args={[c, Math.ceil(putaran * 40), tebal, 8, false]} />
      <meshStandardMaterial color="#c8743a" metalness={0.92} roughness={0.26} />
    </mesh>
  );
};

// Bantalan bola: cincin luar, cincin dalam, bola-bola, penutup
export const BantalanBola: React.FC<{ p?: V3; r?: number }> = ({ p = [0, 0, 0], r = 0.2 }) => (
  <group position={p}>
    <mesh>
      <cylinderGeometry args={[r, r, r * 0.5, 40, 1, true]} />
      <meshStandardMaterial color="#d5e1eb" metalness={0.95} roughness={0.15} side={2} />
    </mesh>
    <mesh>
      <cylinderGeometry args={[r * 0.45, r * 0.45, r * 0.5, 32, 1, true]} />
      <meshStandardMaterial color="#d5e1eb" metalness={0.95} roughness={0.15} side={2} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, r * 0.2, 0]}>
      <ringGeometry args={[r * 0.45, r, 40]} />
      <meshStandardMaterial color="#2a3440" metalness={0.6} roughness={0.4} side={2} />
    </mesh>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.cos(a) * r * 0.72, -r * 0.05, Math.sin(a) * r * 0.72]}>
          <sphereGeometry args={[r * 0.17, 16, 12]} />
          <meshStandardMaterial color="#eef3f7" metalness={1} roughness={0.08} />
        </mesh>
      );
    })}
  </group>
);

// Bubut: profil (r, y) diputar mengelilingi sumbu Y
export const Bubut: React.FC<{ profil: [number, number][]; children: React.ReactNode; segmen?: number; halus?: boolean }> = ({ profil, children, segmen = 96, halus = false }) => {
  const g = useMemo(() => {
    const t = profil.map(([r, y]) => new Vector2(r, y));
    return new LatheGeometry(halus ? new SplineCurve(t).getPoints(64) : t, segmen);
  }, [profil, segmen, halus]);
  return <mesh geometry={g}>{children}</mesh>;
};
