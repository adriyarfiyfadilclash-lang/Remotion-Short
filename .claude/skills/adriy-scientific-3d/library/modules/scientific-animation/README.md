# ADRIY Scientific 3D — Scientific Animation

Pustaka tahap pertama untuk gerakan objek ilmiah dan visualisasi proses sains dalam Remotion + React Three Fiber.

## 7 komponen
- `ScientificObjectMotion3D` — gerakan posisi, rotasi, dan skala objek.
- `ScientificOrbit3D` — gerak partikel atau objek pada lintasan melingkar.
- `ScientificWave3D` — gelombang sinus untuk ilustrasi sinyal, suara, atau cahaya.
- `ParticleFlow3D` — aliran partikel sepanjang vektor.
- `MolecularVibration3D` — getaran periodik molekul.
- `CellPulse3D` — denyut atau perubahan skala berirama.
- `GrowthSequence3D` — pertumbuhan bertahap dengan gerak naik.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

## Contoh penggunaan
```tsx
<ScientificOrbit3D radius={1.2} duration={90}>
  <mesh>
    <sphereGeometry args={[0.08, 16, 16]} />
    <meshStandardMaterial color="#70d8ff" />
  </mesh>
</ScientificOrbit3D>
```

Semua komponen visual 3D harus digunakan di dalam `ThreeCanvas`.

## Catatan
- Animasi berbasis `useCurrentFrame`, sehingga gerakan deterministik pada setiap render.
- `ScientificWave3D` membangun titik-titik kecil di sepanjang kurva gelombang. Untuk kebutuhan garis kontinu, gunakan komponen garis khusus.
- `ParticleFlow3D` memakai sebaran deterministik berdasarkan `seed`.
- Visual atom, molekul, sel, dan gelombang pada contoh merupakan ilustrasi konseptual, bukan simulasi fisika/kimia yang tervalidasi.
- Sesuaikan parameter dengan kebutuhan adegan dan narasi.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
