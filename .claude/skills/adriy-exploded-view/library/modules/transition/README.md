# ADRIY Exploded View — Transition

Pustaka transisi untuk perpindahan antarbagian dan antarsusunan objek 3D di Remotion + React Three Fiber.

## 7 komponen
- `ExplodeOutTransition` — mendorong kelompok objek menjauh dari pusat.
- `ExplodeInTransition` — membawa kelompok objek kembali ke pusat.
- `RadialExplodeTransition` — memisahkan objek secara radial.
- `LayerPeelTransition` — membuka lapisan dengan perpindahan dan rotasi.
- `AssemblyWipeTransition` — memasukkan susunan dari arah sumbu tertentu.
- `ComponentOrbitTransition` — membawa bagian melalui lintasan melengkung.
- `ExplodedSceneSwap` — menukar dua kelompok adegan dengan gerakan berlawanan.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@remotion/three`

## Contoh
```tsx
<ExplodeOutTransition startFrame={20} duration={40} distance={2}>
  <group>
    {/* bagian-bagian objek 3D */}
  </group>
</ExplodeOutTransition>
```

Tempatkan komponen transisi di dalam `ThreeCanvas`. Gunakan satu transisi utama untuk satu kelompok objek agar transformasi tidak saling bertabrakan.

## Catatan
- Seluruh progres transisi dihitung dari nomor bingkai Remotion.
- Komponen ini mengubah transformasi kelompok objek; bukan sistem pemotongan gambar atau simulasi fisika.
- `ExplodedSceneSwap` merender kedua kelompok selama transisi. Pastikan keduanya tidak terlalu berat.
- Sesuaikan jarak dan sudut dengan ukuran objek serta kamera.

## Status
Kode sumber dan contoh sudah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
