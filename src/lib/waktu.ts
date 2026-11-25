import data from "../data.json";

export type Sfx = { detik: number; jenis: string };
export type Adegan = {
  id: string;
  detik: number;
  bagian: number;
  suasana: string;
  mode: string;
  overlay: string;
  judul: string;
  sub: string;
  maskot?: string;
  detak?: boolean;
  poin?: string[];
  ajakan?: string;
  ikuti?: string;
  sfx: Sfx[];
};

export const FPS: number = data.fps;
export const ADEGAN: Adegan[] = data.adegan as Adegan[];

// Panjang tiap adegan dalam frame (dibulatkan sama seperti di Root.tsx)
export const PANJANG: number[] = ADEGAN.map((a) => Math.round(a.detik * FPS));

// Frame awal tiap adegan
export const AWAL: number[] = PANJANG.reduce<number[]>((arr, p, i) => {
  arr.push(i === 0 ? 0 : arr[i - 1] + PANJANG[i - 1]);
  return arr;
}, []);

export const TOTAL: number = PANJANG.reduce((a, b) => a + b, 0);

// Cari adegan yang sedang tampil pada frame global
export const adeganPada = (frame: number): { index: number; lokal: number } => {
  for (let i = ADEGAN.length - 1; i >= 0; i--) {
    if (frame >= AWAL[i]) return { index: i, lokal: frame - AWAL[i] };
  }
  return { index: 0, lokal: frame };
};
