// Bentuk organik jantung: ruang yang meruncing, permukaan bergelombang, warna otot + lemak,
// tekstur serat otot, dan pembuluh koroner yang menempel di permukaan.
// Semua prosedural dan deterministik (tanpa angka acak), jadi tiap frame render sama.
import {
  BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, Euler, Float32BufferAttribute, Matrix4,
  Quaternion, RepeatWrapping, SphereGeometry, Vector3,
} from "three";
import { NamaRuang, RUANG, V3 } from "./model";

// Derau halus dari gabungan gelombang sinus (pengganti noise acak)
const derau = (x: number, y: number, z: number) =>
  0.5 * Math.sin(3.1 * x + 1.7 * y) * Math.sin(2.3 * z - 1.3 * y + 0.5) +
  0.3 * Math.sin(5.7 * y + 2.1 * z) * Math.sin(4.9 * x - 0.7) +
  0.2 * Math.sin(9.3 * x + 7.1 * z + 3.3 * y);

const OTOT = new Color("#9c2430");
const OTOT_GELAP = new Color("#5e1018");
const OTOT_TERANG = new Color("#c4434c");
const LEMAK = new Color("#e8c27a");

// Geometri satu ruang (ruang lokal, sebelum posisi/rotasi/skala RUANG)
const cacheRuang: Partial<Record<NamaRuang, BufferGeometry>> = {};
export const geometriRuang = (n: NamaRuang): BufferGeometry => {
  const ada = cacheRuang[n];
  if (ada) return ada;
  const r = RUANG[n].r;
  const atas = RUANG[n].atas;
  const g = new SphereGeometry(r, 128, 96);
  const pos = g.attributes.position;
  const warna: number[] = [];
  const v = new Vector3();
  const c = new Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const ny = v.y / r;
    if (!atas) {
      // Ventrikel: memanjang ke bawah dan meruncing menjadi apeks
      // Ventrikel kiri membentuk apeks; ventrikel kanan lebih tumpul dan pendek
      const kiri = n === "LV";
      const bawah = Math.max(0, -ny);
      const runcing = Math.pow(1 - (kiri ? 0.66 : 0.4) * bawah, 1.1);
      v.x *= runcing;
      v.z *= runcing;
      if (ny < 0) v.y *= kiri ? 1.36 : 1.0;
      v.y += 0.06 * r; // dasar sedikit naik agar menyatu dengan atrium
    } else {
      // Atrium: lebih pipih dan berkerut
      v.y *= 0.88;
      v.z *= 0.92;
    }
    const d = derau(v.x * 2.2 + (atas ? 3 : 0), v.y * 2.2, v.z * 2.2);
    const kerut = atas ? 0.05 : 0.028;
    const panjang = v.length();
    v.multiplyScalar((panjang + kerut * r * d) / panjang);
    pos.setXYZ(i, v.x, v.y, v.z);

    // Warna: otot merah tua, bagian cekung lebih gelap, lemak kekuningan di dekat lekuk atrium-ventrikel
    const t = 0.5 + 0.5 * d;
    c.copy(OTOT_GELAP).lerp(OTOT, Math.min(1, t * 1.4)).lerp(OTOT_TERANG, Math.max(0, t - 0.7));
    if (!atas) {
      const lekuk = Math.max(0, (ny - 0.45) / 0.55);
      const bercak = 0.5 + 0.5 * Math.sin(v.x * 18 + v.z * 11) * Math.sin(v.y * 15);
      c.lerp(LEMAK, Math.min(0.6, lekuk * lekuk * (0.4 + 0.6 * bercak)));
    }
    warna.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(warna, 3));
  g.computeVertexNormals();
  cacheRuang[n] = g;
  return g;
};

// Aurikel (daun telinga atrium): kantong kecil berkerut
const cacheAurikel: Partial<Record<NamaRuang, BufferGeometry>> = {};
export const geometriAurikel = (n: NamaRuang): BufferGeometry => {
  const ada = cacheAurikel[n];
  if (ada) return ada;
  const g = new SphereGeometry(0.2, 64, 48);
  const pos = g.attributes.position;
  const v = new Vector3();
  const warna: number[] = [];
  const c = new Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.x *= 1.3;
    v.y *= 0.55;
    v.z *= 0.4;
    // ujung meruncing
    const u = Math.max(0, v.x / 0.26);
    v.y *= 1 - 0.45 * u;
    v.z *= 1 - 0.45 * u;
    const d = Math.sin(v.x * 40) * 0.5 + 0.5 * Math.sin(v.y * 30 + v.x * 10);
    const L = v.length();
    v.multiplyScalar((L + 0.018 * d) / L);
    pos.setXYZ(i, v.x, v.y, v.z);
    c.copy(OTOT).lerp(OTOT_GELAP, 0.35 * (0.5 + 0.5 * d));
    warna.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(warna, 3));
  g.computeVertexNormals();
  cacheAurikel[n] = g;
  return g;
};

// Posisi aurikel relatif terhadap pusat atriumnya (koordinat model, bukan skala ruang)
export const AURIKEL: Partial<Record<NamaRuang, { pos: V3; rot: V3 }>> = {
  RA: { pos: [0.26, -0.02, 0.3], rot: [0.3, -0.7, -0.25] },
  LA: { pos: [-0.28, -0.1, 0.34], rot: [0.2, 0.7, 3.4] },
};

// Tekstur serat otot (bump map), digambar sekali di kanvas
let teksturOtot: CanvasTexture | null = null;
export const ambilTeksturOtot = (): CanvasTexture | null => {
  if (teksturOtot) return teksturOtot;
  if (typeof document === "undefined") return null;
  const S = 512;
  const kanvas = document.createElement("canvas");
  kanvas.width = S;
  kanvas.height = S;
  const ctx = kanvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, S, S);
  // serat miring yang sedikit bergelombang
  for (let i = 0; i < 140; i++) {
    const y0 = (i / 140) * S * 1.6 - S * 0.3;
    const terang = 100 + ((i * 37) % 60);
    ctx.strokeStyle = `rgb(${terang},${terang},${terang})`;
    ctx.lineWidth = 1.5 + ((i * 13) % 3);
    ctx.beginPath();
    for (let x = 0; x <= S; x += 8) {
      const y = y0 - x * 0.45 + 6 * Math.sin(x / 37 + i);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // bintik halus
  for (let i = 0; i < 2400; i++) {
    const x = (i * 7919) % S;
    const y = (i * 104729) % S;
    const t = 90 + ((i * 31) % 90);
    ctx.fillStyle = `rgba(${t},${t},${t},0.5)`;
    ctx.fillRect(x, y, 2, 2);
  }
  teksturOtot = new CanvasTexture(kanvas);
  teksturOtot.wrapS = RepeatWrapping;
  teksturOtot.wrapT = RepeatWrapping;
  teksturOtot.repeat.set(3, 3);
  return teksturOtot;
};

// ---------- Pembuluh koroner ----------
// Titik kasar (koordinat model). Titik-titik ini ditempelkan ke permukaan ruang terdekat.
export const KORONER: { titik: V3[]; r: number; warna: string }[] = [
  // Arteri desendens anterior kiri (LAD), di lekuk antara ventrikel kanan dan kiri
  { titik: [[0.12, 0.3, 0.6], [0.16, 0.0, 0.7], [0.2, -0.4, 0.7], [0.3, -0.85, 0.55], [0.42, -1.25, 0.3]], r: 0.032, warna: "#d8434d" },
  // Cabang diagonal
  { titik: [[0.18, -0.15, 0.7], [0.45, -0.35, 0.6], [0.65, -0.7, 0.45], [0.75, -1.0, 0.25]], r: 0.022, warna: "#d8434d" },
  { titik: [[0.24, -0.55, 0.65], [0.45, -0.85, 0.5], [0.55, -1.15, 0.3]], r: 0.018, warna: "#d8434d" },
  // Arteri koroner kanan (RCA), di lekuk atrium-ventrikel kanan
  { titik: [[0.05, 0.3, 0.55], [-0.3, 0.1, 0.65], [-0.65, -0.05, 0.5], [-0.95, -0.3, 0.15], [-0.95, -0.55, -0.2]], r: 0.03, warna: "#d8434d" },
  // Cabang marginal kanan
  { titik: [[-0.7, -0.08, 0.5], [-0.65, -0.45, 0.55], [-0.45, -0.8, 0.55], [-0.2, -1.05, 0.45]], r: 0.02, warna: "#d8434d" },
  // Arteri sirkumfleks
  { titik: [[0.35, 0.2, 0.45], [0.7, 0.05, 0.3], [0.98, -0.15, 0.0], [0.95, -0.4, -0.3]], r: 0.026, warna: "#d8434d" },
  // Vena jantung besar (menyertai LAD)
  { titik: [[0.2, 0.25, 0.6], [0.26, -0.1, 0.68], [0.3, -0.5, 0.66], [0.38, -0.95, 0.5]], r: 0.022, warna: "#5d6fbf" },
  // Vena jantung kecil
  { titik: [[-0.55, -0.15, 0.55], [-0.6, -0.55, 0.55], [-0.5, -0.9, 0.5]], r: 0.016, warna: "#5d6fbf" },
];

let titikPermukaan: { p: Vector3; n: Vector3 }[] | null = null;
const matriksRuang = (n: NamaRuang) => {
  const r = RUANG[n];
  return new Matrix4().compose(
    new Vector3(...r.pos),
    new Quaternion().setFromEuler(new Euler(0, 0, r.rotZ)),
    new Vector3(...r.skala),
  );
};

// Kumpulan titik di permukaan luar jantung utuh (titik yang tertutup ruang lain dibuang)
const ambilPermukaan = () => {
  if (titikPermukaan) return titikPermukaan;
  const nama: NamaRuang[] = ["RA", "LA", "RV", "LV"];
  const balik = nama.map((n) => matriksRuang(n).invert());
  const hasil: { p: Vector3; n: Vector3 }[] = [];
  nama.forEach((n, idx) => {
    const g = geometriRuang(n);
    const m = matriksRuang(n);
    const nm = new Matrix4().extractRotation(m);
    const pos = g.attributes.position;
    const nor = g.attributes.normal;
    for (let i = 0; i < pos.count; i++) {
      const p = new Vector3().fromBufferAttribute(pos, i).applyMatrix4(m);
      const tertutup = nama.some((lain, j) => {
        if (j === idx) return false;
        const lokal = p.clone().applyMatrix4(balik[j]);
        return lokal.length() < RUANG[lain].r * 0.97;
      });
      if (tertutup) continue;
      hasil.push({ p, n: new Vector3().fromBufferAttribute(nor, i).applyMatrix4(nm).normalize() });
    }
  });
  titikPermukaan = hasil;
  return hasil;
};

const tempel = (q: Vector3, angkat: number) => {
  let terbaik = ambilPermukaan()[0];
  let jarak = Infinity;
  for (const t of ambilPermukaan()) {
    const d = t.p.distanceToSquared(q);
    if (d < jarak) {
      jarak = d;
      terbaik = t;
    }
  }
  return terbaik.p.clone().addScaledVector(terbaik.n, angkat);
};

const cacheKoroner: CatmullRomCurve3[] = [];
export const kurvaKoroner = (i: number): CatmullRomCurve3 => {
  if (cacheKoroner[i]) return cacheKoroner[i];
  const kasar = new CatmullRomCurve3(KORONER[i].titik.map((p) => new Vector3(...p)));
  // Tempel ke permukaan, haluskan, lalu tempel lagi agar jalurnya mulus tanpa zig-zag
  let titik = kasar.getSpacedPoints(40).map((p) => tempel(p, 0));
  for (let ulang = 0; ulang < 6; ulang++) {
    titik = titik.map((p, j) =>
      j === 0 || j === titik.length - 1 ? p : p.clone().add(titik[j - 1]).add(titik[j + 1]).multiplyScalar(1 / 3),
    );
  }
  const akhir = titik.filter((_, j) => j % 3 === 0 || j === titik.length - 1).map((p) => tempel(p, KORONER[i].r * 0.6));
  cacheKoroner[i] = new CatmullRomCurve3(akhir);
  return cacheKoroner[i];
};
