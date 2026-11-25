// Model jantung ilustratif (bukan anatomi presisi) + keadaan tiap mode adegan.
// Dipakai bersama oleh adegan 3D dan label 2D agar posisinya selalu cocok.
import { Euler, Matrix4, PerspectiveCamera, Quaternion, Vector3 } from "three";
import data from "../data.json";
import { ADEGAN, PANJANG, adeganPada } from "./waktu";

export type V3 = [number, number, number];
export type NamaRuang = "RA" | "LA" | "RV" | "LV";

export const KAMERA = { fov: 32, z: 10 };
export const LEBAR = data.lebar;
export const TINGGI = data.tinggi;
const DETAK = data.detakFrame; // 25 frame per detak (sekitar 72 kali per menit pada 30 fps)

// ---------- Geometri ruang jantung ----------
// pos = pusat potongan tiap ruang (dipakai untuk label, detak, dan pembongkaran).
// Bentuk permukaannya dibuat di lib/bentuk.ts. r/skala/rotZ/warna disimpan untuk keperluan lain.
export const RUANG: Record<
  NamaRuang,
  { pos: V3; r: number; skala: V3; rotZ: number; warna: string; nama: string; atas: boolean }
> = {
  RA: { pos: [-0.72, 0.52, 0.12], r: 0.5, skala: [1, 1, 1], rotZ: 0, warna: "#c23a4c", nama: "Atrium kanan", atas: true },
  LA: { pos: [0.38, 0.66, -0.5], r: 0.46, skala: [1, 1, 1], rotZ: 0, warna: "#d4485a", nama: "Atrium kiri", atas: true },
  RV: { pos: [-0.08, -0.32, 0.5], r: 0.62, skala: [1, 1, 1], rotZ: 0, warna: "#b8343f", nama: "Ventrikel kanan", atas: false },
  LV: { pos: [0.5, -0.52, -0.08], r: 0.66, skala: [1, 1, 1], rotZ: 0, warna: "#cc3b47", nama: "Ventrikel kiri", atas: false },
};

// Warna pembuluh: merah = darah kaya oksigen, biru = darah miskin oksigen (konvensi edukasi)
const AORTA = "#c8414d";
const VENA = "#4a5fa8";
const PULMO = "#5868c4";
const VPULMO = "#b8404c";

// Titik percabangan trunkus pulmonalis (ditutup bola agar ujung tabung tidak bolong)
export const SAMBUNGAN: { pos: V3; r: number; warna: string }[] = [{ pos: [0.45, 1.3, -0.05], r: 0.165, warna: PULMO }];

export const PEMBULUH: { titik: V3[]; r: number; warna: string }[] = [
  // Aorta: naik dari tengah jantung (di belakang arteri pulmonalis), melengkung ke kiri-belakang, lalu turun
  { titik: [[0.1, 0.4, 0.05], [0.0, 0.9, 0.12], [0.02, 1.4, 0.05], [0.3, 1.78, -0.15], [0.68, 1.62, -0.52], [0.78, 1.0, -0.82], [0.78, 0.0, -0.9]], r: 0.17, warna: AORTA },
  // Cabang lengkung aorta: brakiosefalika, karotis komunis kiri, subklavia kiri
  { titik: [[0.08, 1.62, 0.02], [0.0, 1.95, 0.05], [-0.06, 2.25, 0.08]], r: 0.075, warna: AORTA },
  { titik: [[0.32, 1.84, -0.16], [0.33, 2.05, -0.16], [0.34, 2.28, -0.16]], r: 0.055, warna: AORTA },
  { titik: [[0.55, 1.78, -0.38], [0.64, 2.0, -0.4], [0.75, 2.22, -0.42]], r: 0.06, warna: AORTA },
  // Trunkus pulmonalis: keluar dari ventrikel kanan di depan, naik ke kiri-belakang lalu bercabang di bawah lengkung aorta
  { titik: [[0.04, 0.42, 0.56], [0.22, 0.85, 0.5], [0.38, 1.18, 0.22], [0.45, 1.3, -0.05]], r: 0.17, warna: PULMO },
  // Arteri pulmonalis kiri
  { titik: [[0.45, 1.3, -0.05], [0.85, 1.35, -0.25], [1.25, 1.3, -0.4]], r: 0.11, warna: PULMO },
  // Arteri pulmonalis kanan: lewat di bawah lengkung aorta, di belakang aorta naik dan vena kava superior
  { titik: [[0.45, 1.3, -0.05], [0.05, 1.32, -0.42], [-0.6, 1.3, -0.5], [-1.25, 1.25, -0.5]], r: 0.11, warna: PULMO },
  // Vena kava superior: masuk ke atrium kanan dari atas
  { titik: [[-0.86, 0.7, 0.02], [-0.88, 1.3, -0.02], [-0.9, 2.05, -0.05]], r: 0.15, warna: VENA },
  // Vena kava inferior: masuk ke atrium kanan dari bawah-belakang
  { titik: [[-0.8, 0.15, -0.18], [-0.77, -0.3, -0.3], [-0.74, -0.75, -0.35]], r: 0.15, warna: VENA },
  // Empat vena pulmonalis: masuk ke atrium kiri dari belakang, dua dari tiap paru
  { titik: [[0.7, 0.8, -0.65], [1.0, 0.86, -0.68], [1.35, 0.9, -0.7]], r: 0.075, warna: VPULMO },
  { titik: [[0.7, 0.56, -0.65], [1.0, 0.5, -0.68], [1.35, 0.45, -0.7]], r: 0.075, warna: VPULMO },
  { titik: [[-0.1, 0.8, -0.72], [-0.45, 0.86, -0.78], [-0.8, 0.9, -0.82]], r: 0.075, warna: VPULMO },
  { titik: [[-0.1, 0.56, -0.72], [-0.45, 0.5, -0.78], [-0.8, 0.45, -0.82]], r: 0.075, warna: VPULMO },
];

// Jalur aliran darah (untuk partikel)
// Biru: vena kava -> atrium kanan -> ventrikel kanan -> trunkus pulmonalis -> paru-paru
export const JALUR_BIRU: V3[] = [
  [-0.9, 2.1, -0.05], [-0.88, 1.2, 0.0], [-0.75, 0.55, 0.15], [-0.5, 0.05, 0.4], [-0.25, -0.45, 0.6],
  [-0.05, -0.15, 0.65], [0.04, 0.4, 0.6], [0.22, 0.85, 0.5], [0.4, 1.2, 0.2], [0.85, 1.35, -0.25], [1.3, 1.3, -0.4],
];
// Merah: vena pulmonalis -> atrium kiri -> ventrikel kiri -> aorta -> tubuh
export const JALUR_MERAH: V3[] = [
  [1.4, 0.88, -0.7], [0.9, 0.82, -0.66], [0.4, 0.68, -0.5], [0.45, 0.15, -0.25], [0.6, -0.6, -0.05],
  [0.4, -0.2, 0.0], [0.12, 0.4, 0.05], [0.0, 0.95, 0.12], [0.05, 1.45, 0.05], [0.35, 1.78, -0.15], [0.7, 1.55, -0.55], [0.78, 0.6, -0.85],
];

export const KATUP: { pos: V3; nama: string; av: boolean }[] = [
  { pos: [-0.5, 0.12, 0.42], nama: "Trikuspid", av: true },
  { pos: [0.1, 0.52, 0.62], nama: "Pulmonal", av: false },
  { pos: [0.48, 0.22, -0.28], nama: "Mitral", av: true },
  { pos: [-0.16, 0.3, 0.12], nama: "Aorta", av: false },
];

// Simpul SA di pertemuan vena kava superior dengan atrium kanan; simpul AV di dekat sekat bawah atrium
export const SIMPUL_SA: V3 = [-0.9, 0.82, 0.3];
export const SIMPUL_AV: V3 = [-0.32, 0.12, 0.35];

// ---------- Detak (HeartBeatAnimation) ----------
// fase 0..1 dalam satu detak: atrium kontraksi dulu, lalu ventrikel
export const faseDetak = (frame: number) => (frame % DETAK) / DETAK;

export const remasAtrium = (frame: number) => {
  const t = faseDetak(frame);
  return t < 0.16 ? Math.sin((t / 0.16) * Math.PI) : 0;
};
export const remasVentrikel = (frame: number) => {
  const t = faseDetak(frame);
  return t >= 0.16 && t < 0.5 ? Math.sin(((t - 0.16) / 0.34) * Math.PI) : 0;
};
// Katup trikuspid/mitral terbuka saat ventrikel mengisi; katup pulmonal/aorta terbuka saat memompa
export const bukaKatup = (frame: number, av: boolean) => {
  const t = faseDetak(frame);
  if (av) return t < 0.16 || t > 0.55 ? 1 : 0.05;
  return t > 0.2 && t < 0.47 ? 1 : 0.05;
};

// ---------- Mode adegan ----------
export type Keadaan = {
  pos: V3;
  skala: number;
  rotX: number;
  rotY: number;
  goyang: number; // ayunan rotasi kiri-kanan
  bongkar: number; // ExplodedAnatomy3D: 0 utuh, 1 terurai
  kaca: number; // TransparentBodyLighting: 0 padat, 1 tembus pandang
  biru: number; // aliran ke paru
  merah: number; // aliran ke tubuh
  katup: number;
  listrik: number;
  sorotAtas: number;
  sorotBawah: number;
  detak: number; // kekuatan detak
};

const DASAR: Keadaan = {
  pos: [0, -0.83, 0], skala: 0.85, rotX: 0.05, rotY: 0, goyang: 0.25, bongkar: 0, kaca: 0,
  biru: 0, merah: 0, katup: 0, listrik: 0, sorotAtas: 0, sorotBawah: 0, detak: 1,
};

const MODE: Record<string, Partial<Keadaan>> = {
  hero: {},
  putar: { goyang: 0.9, skala: 0.9 },
  kecil: { skala: 0.5, pos: [-0.75, -0.75, 0], goyang: 0.2 },
  dada: { skala: 0.3, pos: [0.12, -0.42, 0], goyang: 0.1 },
  bongkar: { bongkar: 1, skala: 0.78, pos: [0, -0.7, 0], goyang: 0.15 },
  atrium: { bongkar: 0.55, skala: 0.82, pos: [0, -0.72, 0], sorotAtas: 1, goyang: 0.15 },
  ventrikel: { bongkar: 0.55, skala: 0.82, pos: [0, -0.72, 0], sorotBawah: 1, goyang: 0.15 },
  "alir-biru": { kaca: 1, biru: 1, skala: 0.88, goyang: 0.12 },
  "alir-merah": { kaca: 1, merah: 1, skala: 0.88, goyang: 0.12 },
  katup: { kaca: 0.85, katup: 1, biru: 0.45, merah: 0.45, skala: 0.95, goyang: 0.1 },
  listrik: { kaca: 0.55, listrik: 1, skala: 0.9, goyang: 0.12 },
  bawah: { skala: 0.42, pos: [0, -2.05, 0], goyang: 0.5 },
  kiri: { skala: 0.55, pos: [-0.72, -0.95, 0], goyang: 0.3 },
  hilang: { skala: 0.001, pos: [0, -0.9, 0] },
  ringkas: { skala: 0.45, pos: [0, -2.0, 0], goyang: 0.8 },
  cta: { skala: 0.5, pos: [0, 0.05, 0], goyang: 0.6 },
};

const keadaanMode = (mode: string): Keadaan => ({ ...DASAR, ...(MODE[mode] ?? {}) });

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const halus = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

const campur = (a: Keadaan, b: Keadaan, t: number): Keadaan => {
  const o = { ...b } as Keadaan;
  (Object.keys(b) as (keyof Keadaan)[]).forEach((k) => {
    if (k === "pos") o.pos = [lerp(a.pos[0], b.pos[0], t), lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t)];
    else (o as Record<string, number | V3>)[k] = lerp(a[k] as number, b[k] as number, t);
  });
  return o;
};

// Rotasi Y dihitung dari frame lokal agar mulus
const rotasi = (k: Keadaan, lokal: number) => k.rotY + k.goyang * Math.sin(lokal / 50);

// Keadaan akhir (sudah dicampur dengan adegan sebelumnya) pada frame global
export const keadaanPada = (frame: number): Keadaan & { rotYAkhir: number } => {
  const { index, lokal } = adeganPada(frame);
  const kini = keadaanMode(ADEGAN[index].mode);
  const kiniRot = rotasi(kini, lokal);
  const LAMA = 24;
  if (index > 0 && lokal < LAMA) {
    const lalu = keadaanMode(ADEGAN[index - 1].mode);
    const lokalLalu = PANJANG[index - 1] + lokal;
    const t = halus(lokal / LAMA);
    const k = campur(lalu, kini, t);
    return { ...k, rotYAkhir: lerp(rotasi(lalu, lokalLalu), kiniRot, t) };
  }
  return { ...kini, rotYAkhir: kiniRot };
};

// Ayunan naik-turun halus (CinematicAnatomyFocus)
export const ayun = (frame: number) => 0.04 * Math.sin(frame / 32);

// Posisi pusat ruang setelah dibongkar
export const posRuang = (n: NamaRuang, bongkar: number): V3 => {
  const p = RUANG[n].pos;
  const panjang = Math.hypot(p[0], p[1] - 0.05) || 1;
  const arah: V3 = [p[0] / panjang, (p[1] - 0.05) / panjang, 0];
  const jarak = 0.55 * bongkar;
  // Atrium kiri ada di belakang; saat dibongkar ditarik ke depan agar terlihat
  const maju = n === "LA" ? 0.75 : n === "RV" ? 0.05 : 0.2;
  return [p[0] + arah[0] * jarak, p[1] + arah[1] * jarak, p[2] + maju * bongkar];
};

// ---------- Proyeksi 3D -> layar (untuk label & garis penunjuk) ----------
const kamera = new PerspectiveCamera(KAMERA.fov, LEBAR / TINGGI, 0.1, 100);
kamera.position.set(0, 0, KAMERA.z);
kamera.lookAt(0, 0, 0);
kamera.updateMatrixWorld();
kamera.updateProjectionMatrix();

export const keLayar = (frame: number, titik: V3): { x: number; y: number } => {
  const k = keadaanPada(frame);
  const m = new Matrix4().compose(
    new Vector3(k.pos[0], k.pos[1] + ayun(frame), k.pos[2]),
    new Quaternion().setFromEuler(new Euler(k.rotX, k.rotYAkhir, 0)),
    new Vector3(k.skala, k.skala, k.skala),
  );
  const v = new Vector3(...titik).applyMatrix4(m).project(kamera);
  return { x: ((v.x + 1) / 2) * LEBAR, y: ((1 - v.y) / 2) * TINGGI };
};

// Pusat jantung (koordinat model)
export const PUSAT: V3 = [0, 0.27, 0];
