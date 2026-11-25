// Cek durasi video sebelum render: harus 120-178 detik (2:00-2:58)
import { readFileSync, existsSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../src/data.json", import.meta.url), "utf8"));
const fps = data.fps;
const frame = data.adegan.reduce((a, s) => a + Math.round(s.detik * fps), 0);
const detik = frame / fps;
const mm = Math.floor(detik / 60);
const ss = String(Math.round(detik % 60)).padStart(2, "0");

// Pastikan semua file suara yang dipakai benar-benar ada
const hilang = [];
const perlu = new Set(["musik/latar.wav", "sfx/detak.wav"]);
data.adegan.forEach((a) => a.sfx.forEach((s) => perlu.add(`sfx/${s.jenis}.wav`)));
perlu.forEach((f) => {
  if (!existsSync(new URL(`../public/${f}`, import.meta.url))) hilang.push(f);
});

if (hilang.length) {
  console.error(`GAGAL: file suara tidak ditemukan di folder public/: ${hilang.join(", ")}`);
  process.exit(1);
}
if (detik < 120) {
  console.error(`GAGAL: durasi ${mm}:${ss} terlalu pendek. Minimal 2:00. Tambah "detik" di src/data.json.`);
  process.exit(1);
}
if (detik > 178) {
  console.error(`GAGAL: durasi ${mm}:${ss} terlalu panjang. Maksimal 2:58. Kurangi "detik" di src/data.json.`);
  process.exit(1);
}
console.log(`LOLOS: durasi ${mm}:${ss} (${detik} detik, ${frame} frame, ${data.adegan.length} adegan).`);
