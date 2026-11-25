# ADRIY Scientific 3D — Molecules, Cells & Structures

Pustaka objek konseptual 3D untuk visualisasi atom, ikatan kimia, molekul, sel, organel, dan heliks DNA.

## 7 komponen
1. `Atom3D` — bola atom dengan pilihan warna, ukuran, dan denyut visual.
2. `ChemicalBond3D` — silinder penghubung dua koordinat atom.
3. `Molecule3D` — perakitan molekul berbasis daftar atom dan ikatan.
4. `CellMembrane3D` — membran sel berbentuk cangkang transparan.
5. `CellNucleus3D` — inti sel dan nukleolus.
6. `CellOrganelle3D` — bentuk umum organel.
7. `DNAHelix3D` — heliks ganda dengan anak tangga pasangan basa.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

Gunakan komponen di dalam `ThreeCanvas`.

## Contoh Molecule3D
```tsx
const atoms = [
  { id: "O", position: [0, 0, 0], radius: 0.24, color: "#e85d75" },
  { id: "H1", position: [-0.38, 0.27, 0], radius: 0.13, color: "#ffffff" },
  { id: "H2", position: [0.38, 0.27, 0], radius: 0.13, color: "#ffffff" },
];

<Molecule3D
  atoms={atoms}
  bonds={[
    { from: "O", to: "H1" },
    { from: "O", to: "H2" },
  ]}
/>
```

## Catatan ilmiah
- Model yang disediakan adalah bentuk visual konseptual, bukan struktur molekul tervalidasi secara kimia.
- Posisi, sudut ikatan, radius atom, jumlah ikatan, dan skala perlu disesuaikan dengan sumber ilmiah yang benar.
- `CellOrganelle3D` adalah bentuk generik; bukan model anatomi organel yang presisi.
- `DNAHelix3D` adalah ilustrasi heliks ganda, bukan model pasangan basa atau geometri molekuler atomistik.
- Jangan menyajikan ilustrasi konseptual sebagai data eksperimen atau struktur berskala.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
