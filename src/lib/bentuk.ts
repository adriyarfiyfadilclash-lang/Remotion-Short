// Bentuk organik jantung.
// Jantung dibuat sebagai SATU permukaan menyatu (gabungan halus beberapa bentuk dasar),
// lalu dipotong menjadi 4 ruang tertutup. Saat utuh permukaannya mulus tanpa sambungan;
// saat dibongkar, tiap ruang punya bidang potongan sendiri.
// Semua prosedural dan deterministik (tanpa angka acak), jadi tiap frame render sama.
import { BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, Float32BufferAttribute, RepeatWrapping, Vector3 } from "three";
import { NamaRuang, V3 } from "./model";

// ---------- Fungsi jarak (signed distance) ----------
type P = [number, number, number];
const len = (x: number, y: number, z: number) => Math.sqrt(x * x + y * y + z * z);

const elipsoid = (p: P, c: P, r: P) => {
  const x = (p[0] - c[0]) / r[0], y = (p[1] - c[1]) / r[1], z = (p[2] - c[2]) / r[2];
  const k0 = len(x, y, z);
  const k1 = len(x / r[0], y / r[1], z / r[2]);
  return k1 === 0 ? -Math.min(...r) : (k0 * (k0 - 1)) / k1;
};

// Kerucut membulat antara titik a (jari-jari r1) dan b (jari-jari r2)
const kerucut = (p: P, a: P, b: P, r1: number, r2: number) => {
  const bx = b[0] - a[0], by = b[1] - a[1], bz = b[2] - a[2];
  const l2 = bx * bx + by * by + bz * bz;
  const rr = r1 - r2;
  const a2 = l2 - rr * rr;
  const il2 = 1 / l2;
  const px = p[0] - a[0], py = p[1] - a[1], pz = p[2] - a[2];
  const y = px * bx + py * by + pz * bz;
  const z = y - l2;
  const qx = px * l2 - bx * y, qy = py * l2 - by * y, qz = pz * l2 - bz * y;
  const x2 = qx * qx + qy * qy + qz * qz;
  const y2 = y * y * l2;
  const z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
};

const smin = (a: number, b: number, k: number) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};

// Derau halus dari gabungan gelombang sinus (pengganti noise acak)
const derau = (x: number, y: number, z: number) =>
  0.5 * Math.sin(3.1 * x + 1.7 * y) * Math.sin(2.3 * z - 1.3 * y + 0.5) +
  0.3 * Math.sin(5.7 * y + 2.1 * z) * Math.sin(4.9 * x - 0.7) +
  0.2 * Math.sin(9.3 * x + 7.1 * z + 3.3 * y);

// ---------- Bentuk dasar tiap ruang (koordinat model: x ke kanan layar, y ke atas, z ke arah penonton) ----------
// Tampak depan (anterior): ventrikel kanan paling depan, ventrikel kiri di sisi kanan layar dan membentuk apeks,
// atrium kanan di sisi kiri layar, atrium kiri di belakang atas (hanya aurikelnya yang terlihat dari depan).
const NAMA: NamaRuang[] = ["RA", "LA", "RV", "LV"];

const bentukDasar = (p: P): [number, number, number, number] => {
  const ra = smin(
    elipsoid(p, [-0.82, 0.48, 0.0], [0.44, 0.52, 0.46]),
    kerucut(p, [-0.6, 0.72, 0.28], [-0.14, 0.74, 0.64], 0.2, 0.09), // aurikel kanan, menutupi pangkal aorta
    0.16,
  );
  const la = smin(
    elipsoid(p, [0.3, 0.68, -0.62], [0.62, 0.36, 0.4]),
    kerucut(p, [0.62, 0.7, -0.12], [0.84, 0.56, 0.26], 0.19, 0.08), // aurikel kiri, di samping arteri pulmonalis
    0.16,
  );
  const rv = smin(
    kerucut(p, [-0.3, 0.06, 0.28], [0.22, -1.08, 0.5], 0.6, 0.2),
    kerucut(p, [-0.12, 0.08, 0.42], [0.02, 0.46, 0.56], 0.38, 0.2), // saluran keluar ke arteri pulmonalis
    0.22,
  );
  const lv = kerucut(p, [0.32, 0.02, -0.14], [0.8, -1.42, 0.14], 0.74, 0.09);
  return [ra, la, rv, lv];
};

const RUANG_ATAS = (i: number) => i < 2;

// Permukaan luar gabungan (lekuk atrium-ventrikel dibiarkan sedikit cekung)
const gabung = (s: [number, number, number, number], p: P) => {
  const ventrikel = smin(s[2], s[3], 0.4);
  const atrium = smin(s[0], s[1], 0.22);
  const d = smin(ventrikel, atrium, 0.12);
  return d + 0.012 * derau(p[0] * 3, p[1] * 3, p[2] * 3);
};

// Medan satu ruang: di dalam jantung DAN paling dekat dengan bentuk dasar ruang itu
const medanRuang = (i: number, p: P) => {
  const s = bentukDasar(p);
  let lain = Infinity;
  for (let j = 0; j < 4; j++) if (j !== i) lain = Math.min(lain, s[j]);
  return Math.max(gabung(s, p), s[i] - lain);
};

// ---------- Surface nets: medan jarak -> mesh ----------
const BATAS = { min: [-1.5, -1.72, -1.3] as P, max: [1.4, 1.3, 1.3] as P };
const H = 0.028;

type Mesh = { pos: number[]; idx: number[] };

const POJOK: P[] = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
const RUSUK: [number, number][] = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];

const surfaceNets = (F: Float32Array, nx: number, ny: number, nz: number): Mesh => {
  const id = (i: number, j: number, k: number) => i + nx * (j + ny * k);
  const sel = (i: number, j: number, k: number) => i + (nx - 1) * (j + (ny - 1) * k);
  const titik = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1);
  const pos: number[] = [];
  const idx: number[] = [];
  const v = new Float32Array(8);
  for (let k = 0; k < nz - 1; k++)
    for (let j = 0; j < ny - 1; j++)
      for (let i = 0; i < nx - 1; i++) {
        let masuk = 0;
        for (let c = 0; c < 8; c++) {
          v[c] = F[id(i + POJOK[c][0], j + POJOK[c][1], k + POJOK[c][2])];
          if (v[c] < 0) masuk++;
        }
        if (masuk === 0 || masuk === 8) continue;
        let sx = 0, sy = 0, sz = 0, n = 0;
        for (const [a, b] of RUSUK) {
          if (v[a] < 0 === v[b] < 0) continue;
          const t = v[a] / (v[a] - v[b]);
          sx += POJOK[a][0] + t * (POJOK[b][0] - POJOK[a][0]);
          sy += POJOK[a][1] + t * (POJOK[b][1] - POJOK[a][1]);
          sz += POJOK[a][2] + t * (POJOK[b][2] - POJOK[a][2]);
          n++;
        }
        titik[sel(i, j, k)] = pos.length / 3;
        pos.push(BATAS.min[0] + (i + sx / n) * H, BATAS.min[1] + (j + sy / n) * H, BATAS.min[2] + (k + sz / n) * H);
      }
  const quad = (a: number, b: number, c: number, d: number) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    idx.push(a, b, c, a, c, d);
  };
  for (let k = 1; k < nz - 1; k++)
    for (let j = 1; j < ny - 1; j++)
      for (let i = 1; i < nx - 1; i++) {
        const dalam = F[id(i, j, k)] < 0;
        if (dalam !== F[id(i + 1, j, k)] < 0)
          quad(titik[sel(i, j - 1, k - 1)], titik[sel(i, j, k - 1)], titik[sel(i, j, k)], titik[sel(i, j - 1, k)]);
        if (dalam !== F[id(i, j + 1, k)] < 0)
          quad(titik[sel(i - 1, j, k - 1)], titik[sel(i - 1, j, k)], titik[sel(i, j, k)], titik[sel(i, j, k - 1)]);
        if (dalam !== F[id(i, j, k + 1)] < 0)
          quad(titik[sel(i - 1, j - 1, k)], titik[sel(i, j - 1, k)], titik[sel(i, j, k)], titik[sel(i - 1, j, k)]);
      }
  return { pos, idx };
};

// ---------- Warna ----------
const OTOT = new Color("#9a2430");
const OTOT_GELAP = new Color("#5c1018");
const OTOT_TERANG = new Color("#c0464f");
const ATRIUM = new Color("#7e2236");
const LEMAK = new Color("#e6c07a");
const DALAM = new Color("#b5525a");

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// ---------- Bangun keempat ruang (sekali saja) ----------
type Titik = { p: Vector3; n: Vector3; av: number; iv: number };
type Hasil = { geo: Record<NamaRuang, BufferGeometry>; luar: Titik[] };
let hasil: Hasil | null = null;

const bangun = (): Hasil => {
  if (hasil) return hasil;
  const nx = Math.ceil((BATAS.max[0] - BATAS.min[0]) / H) + 1;
  const ny = Math.ceil((BATAS.max[1] - BATAS.min[1]) / H) + 1;
  const nz = Math.ceil((BATAS.max[2] - BATAS.min[2]) / H) + 1;
  const total = nx * ny * nz;
  const medan = NAMA.map(() => new Float32Array(total));
  const p: P = [0, 0, 0];
  for (let k = 0, q = 0; k < nz; k++)
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++, q++) {
        p[0] = BATAS.min[0] + i * H;
        p[1] = BATAS.min[1] + j * H;
        p[2] = BATAS.min[2] + k * H;
        const s = bentukDasar(p);
        const u = gabung(s, p);
        for (let r = 0; r < 4; r++) {
          let lain = Infinity;
          for (let t = 0; t < 4; t++) if (t !== r) lain = Math.min(lain, s[t]);
          medan[r][q] = Math.max(u, s[r] - lain);
        }
      }

  const geo = {} as Record<NamaRuang, BufferGeometry>;
  const luar: Titik[] = [];
  const e = 0.004;
  NAMA.forEach((nama, r) => {
    const m = surfaceNets(medan[r], nx, ny, nz);
    const jumlah = m.pos.length / 3;
    const normal = new Float32Array(jumlah * 3);
    const uv = new Float32Array(jumlah * 2);
    const warna = new Float32Array(jumlah * 3);
    const c = new Color();
    for (let v = 0; v < jumlah; v++) {
      const x = m.pos[v * 3], y = m.pos[v * 3 + 1], z = m.pos[v * 3 + 2];
      // normal dari gradien medan (lebih halus daripada normal segitiga)
      const f = (a: number, b: number, d: number) => medanRuang(r, [a, b, d]);
      let gx = f(x + e, y, z) - f(x - e, y, z);
      let gy = f(x, y + e, z) - f(x, y - e, z);
      let gz = f(x, y, z + e) - f(x, y, z - e);
      const gl = len(gx, gy, gz) || 1;
      gx /= gl;
      gy /= gl;
      gz /= gl;
      normal.set([gx, gy, gz], v * 3);
      // UV bola dari pusat jantung, untuk tekstur serat otot
      uv[v * 2] = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
      uv[v * 2 + 1] = 0.5 + Math.asin(Math.max(-1, Math.min(1, (y - 0.1) / (len(x, y - 0.1, z) || 1)))) / Math.PI;

      const s = bentukDasar([x, y, z]);
      const permukaanLuar = Math.abs(gabung(s, [x, y, z])) < H * 0.75;
      const d = derau(x * 2.6 + 0.3, y * 2.6, z * 2.6 - 0.7);
      if (!permukaanLuar) {
        c.copy(DALAM).lerp(OTOT_GELAP, 0.25 + 0.2 * d);
      } else {
        const t = 0.5 + 0.5 * d;
        c.copy(RUANG_ATAS(r) ? ATRIUM : OTOT_GELAP).lerp(OTOT, Math.min(1, t * 1.4));
        c.lerp(OTOT_TERANG, Math.max(0, t - 0.72));
        // lemak di lekuk atrium-ventrikel dan lekuk antar-ventrikel
        const av = Math.abs(Math.min(s[0], s[1]) - Math.min(s[2], s[3]));
        const iv = Math.abs(s[2] - s[3]);
        const bercak = 0.7 + 0.3 * derau(x * 9 + 1, y * 9, z * 9 - 2);
        const lemak = Math.min(0.75, (smooth(0.13, 0.0, av) * 0.85 + smooth(0.06, 0.0, iv) * 0.4) * bercak);
        c.lerp(LEMAK, lemak);
        luar.push({ p: new Vector3(x, y, z), n: new Vector3(gx, gy, gz), av, iv });
      }
      warna.set([c.r, c.g, c.b], v * 3);
    }
    // pastikan urutan sudut segitiga menghadap keluar (sesuai gradien)
    const idx = m.idx;
    for (let t = 0; t < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, d = idx[t + 2] * 3;
      const ux = m.pos[b] - m.pos[a], uy = m.pos[b + 1] - m.pos[a + 1], uz = m.pos[b + 2] - m.pos[a + 2];
      const wx = m.pos[d] - m.pos[a], wy = m.pos[d + 1] - m.pos[a + 1], wz = m.pos[d + 2] - m.pos[a + 2];
      const cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
      const nx2 = normal[a] + normal[b] + normal[d];
      const ny2 = normal[a + 1] + normal[b + 1] + normal[d + 1];
      const nz2 = normal[a + 2] + normal[b + 2] + normal[d + 2];
      if (cx * nx2 + cy * ny2 + cz * nz2 < 0) {
        const tmp = idx[t + 1];
        idx[t + 1] = idx[t + 2];
        idx[t + 2] = tmp;
      }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(m.pos, 3));
    g.setAttribute("normal", new Float32BufferAttribute(normal, 3));
    g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
    g.setAttribute("color", new Float32BufferAttribute(warna, 3));
    g.setIndex(idx);
    geo[nama] = g;
  });
  hasil = { geo, luar };
  return hasil;
};

export const geometriRuang = (n: NamaRuang): BufferGeometry => bangun().geo[n];

// ---------- Tekstur serat otot (bump map), digambar sekali di kanvas ----------
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
  for (let i = 0; i < 160; i++) {
    const y0 = (i / 160) * S * 1.6 - S * 0.3;
    const terang = 100 + ((i * 37) % 60);
    ctx.strokeStyle = `rgb(${terang},${terang},${terang})`;
    ctx.lineWidth = 1.2 + ((i * 13) % 3);
    ctx.beginPath();
    for (let x = 0; x <= S; x += 8) {
      const y = y0 - x * 0.45 + 6 * Math.sin(x / 37 + i);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  teksturOtot = new CanvasTexture(kanvas);
  teksturOtot.wrapS = RepeatWrapping;
  teksturOtot.wrapT = RepeatWrapping;
  teksturOtot.repeat.set(4, 3);
  return teksturOtot;
};

// ---------- Pembuluh koroner ----------
// Titik kasar (koordinat model). Titik-titik ini ditempelkan ke permukaan luar jantung.
const MERAH_KORONER = "#d0404b";
const BIRU_KORONER = "#5a68b8";
export const KORONER: { titik: V3[]; r: number; warna: string; alur?: "av" | "iv" }[] = [
  // Arteri desendens anterior kiri (LAD): lekuk antar-ventrikel depan, dari pangkal arteri pulmonalis ke apeks
  { titik: [[0.42, 0.42, 0.5], [0.42, 0.05, 0.7], [0.5, -0.45, 0.62], [0.62, -0.95, 0.45], [0.78, -1.42, 0.2]], r: 0.03, warna: MERAH_KORONER, alur: "iv" },
  // Cabang diagonal ke dinding ventrikel kiri
  { titik: [[0.43, -0.05, 0.68], [0.7, -0.3, 0.5], [0.95, -0.6, 0.25]], r: 0.02, warna: MERAH_KORONER },
  { titik: [[0.52, -0.55, 0.6], [0.78, -0.8, 0.4], [0.95, -1.0, 0.15]], r: 0.017, warna: MERAH_KORONER },
  // Cabang kecil ke dinding ventrikel kanan
  { titik: [[0.44, -0.2, 0.68], [0.2, -0.45, 0.78], [0.0, -0.6, 0.78]], r: 0.014, warna: MERAH_KORONER },
  // Arteri koroner kanan (RCA): dari pangkal aorta mengikuti lekuk atrium-ventrikel kanan
  { titik: [[-0.06, 0.48, 0.6], [-0.42, 0.2, 0.68], [-0.8, -0.08, 0.5], [-1.0, -0.35, 0.1], [-0.95, -0.5, -0.3]], r: 0.03, warna: MERAH_KORONER, alur: "av" },
  // Cabang marginal tajam (acute marginal)
  { titik: [[-0.8, -0.08, 0.5], [-0.6, -0.55, 0.65], [-0.3, -0.92, 0.65], [0.05, -1.1, 0.6]], r: 0.019, warna: MERAH_KORONER },
  // Arteri sirkumfleks: dari bawah aurikel kiri ke sisi belakang
  { titik: [[0.62, 0.32, 0.38], [0.92, 0.12, 0.1], [1.02, -0.15, -0.25], [0.9, -0.35, -0.6]], r: 0.024, warna: MERAH_KORONER, alur: "av" },
  // Vena jantung besar (menyertai LAD lalu masuk lekuk atrium-ventrikel kiri)
  { titik: [[0.5, -1.0, 0.45], [0.38, -0.45, 0.66], [0.33, 0.0, 0.72], [0.55, 0.28, 0.48], [0.9, 0.18, 0.15]], r: 0.022, warna: BIRU_KORONER },
  // Vena jantung anterior di dinding ventrikel kanan
  { titik: [[-0.55, -0.7, 0.62], [-0.65, -0.3, 0.62], [-0.72, 0.0, 0.52]], r: 0.016, warna: BIRU_KORONER },
];

const tempel = (q: Vector3, angkat: number, alur?: "av" | "iv") => {
  const semua = bangun().luar;
  const luar = alur ? semua.filter((t) => t[alur] < 0.035) : semua;
  let terbaik = luar[0];
  let jarak = Infinity;
  for (const t of luar) {
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
  const alur = KORONER[i].alur;
  let titik = kasar.getSpacedPoints(40).map((p) => tempel(p, 0, alur));
  for (let ulang = 0; ulang < 6; ulang++) {
    titik = titik.map((p, j) =>
      j === 0 || j === titik.length - 1 ? p : p.clone().add(titik[j - 1]).add(titik[j + 1]).multiplyScalar(1 / 3),
    );
  }
  const akhir = titik.filter((_, j) => j % 3 === 0 || j === titik.length - 1).map((p) => tempel(p, KORONER[i].r * 0.6, alur));
  cacheKoroner[i] = new CatmullRomCurve3(akhir);
  return cacheKoroner[i];
};
