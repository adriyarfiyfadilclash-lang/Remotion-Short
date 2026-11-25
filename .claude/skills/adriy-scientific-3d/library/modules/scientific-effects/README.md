# ADRIY Scientific 3D — Scientific Effects

Kumpulan efek visual 3D untuk adegan ilmiah: partikel, pemindaian, pulsa energi, gelombang, cangkang bercahaya, dan percikan.

## 7 komponen
1. `ScientificParticleField3D` — lingkungan partikel deterministik.
2. `ScientificScanPlane3D` — bidang pemindaian bergerak.
3. `ScientificEnergyPulse3D` — cincin pulsa yang mengembang.
4. `ScientificWaveField3D` — kisi gelombang matematis.
5. `ScientificGlowShell3D` — cangkang transparan bercahaya.
6. `ScientificSparkBurst3D` — ledakan titik bercahaya.
7. `ScientificDataBeam3D` — garis berkas dengan penanda yang bergerak.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

Gunakan komponen di dalam `ThreeCanvas`.

## Contoh
```tsx
<ScientificParticleField3D count={200} radius={3} />
<ScientificEnergyPulse3D position={[0, 0, 0]} />
<ScientificDataBeam3D start={[-1, 0, 0]} end={[1, 0, 0]} />
<ScientificScanPlane3D startY={-2} endY={2} duration={90} />
```

## Catatan teknis dan ilmiah
- Efek gelombang menggunakan fungsi sinus ilustratif, bukan hasil pengukuran atau simulasi fisika.
- Partikel dan percikan dibuat deterministik dari `seed` agar hasil konsisten pada render Remotion.
- Cangkang glow menggunakan material transparan; hasil akhir bergantung pada urutan transparansi, kamera, dan renderer.
- Efek pemindaian hanya berupa bidang visual. Efek ini tidak melakukan pemindaian atau rekonstruksi data nyata.
- Atur jumlah partikel dan segmen sesuai kebutuhan performa.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
