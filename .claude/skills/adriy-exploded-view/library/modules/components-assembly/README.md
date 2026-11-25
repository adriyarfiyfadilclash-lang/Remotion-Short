# ADRIY Exploded View — 3D Components & Assembly

Pustaka komponen untuk memisahkan bagian objek, memperlihatkan posisi pemasangan, dan menyusun kembali bagian-bagian dalam animasi Exploded View.

## 7 komponen
- `AssemblyPart3D` — menggerakkan satu bagian antara posisi terpasang dan posisi terurai.
- `ExplodedComponent3D` — pembungkus khusus komponen dengan jarak pemisahan relatif.
- `AssemblyConnector3D` — garis penghubung posisi awal dan posisi komponen.
- `ComponentSocket3D` — bentuk lubang dudukan atau port pemasangan.
- `Fastener3D` — baut sederhana berkepala segi enam atau bulat.
- `AssemblyStep3D` — animasi satu langkah pemasangan dalam rentang bingkai.
- `AssemblyGuide3D` — garis panduan arah gerak komponen.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

## Contoh dasar
```tsx
<ExplodedComponent3D
  assembledAt={[0, 0, 0]}
  separatedBy={[0, 1.2, 0]}
  startFrame={10}
  duration={36}
>
  <mesh>
    <boxGeometry args={[1, 0.2, 1]} />
    <meshStandardMaterial color="#8aaabb" />
  </mesh>
</ExplodedComponent3D>
```

Semua komponen 3D harus digunakan di dalam `ThreeCanvas`.

## Catatan penggunaan
- `ExplodedComponent3D` memakai posisi terpasang ditambah `separatedBy` sebagai posisi akhir.
- `AssemblyPart3D` menerima `progress` opsional bernilai 0 sampai 1. Jika diberikan, nilai ini mengambil alih animasi berbasis bingkai.
- `AssemblyStep3D` menggerakkan grup anak. Properti `fade` disediakan sebagai opsi antarmuka, tetapi transparansi material anak tidak diubah otomatis; atur transparansi material secara terpisah bila diperlukan.
- Geometri baut dan soket adalah bentuk teknis sederhana, bukan model CAD presisi.
- Sesuaikan ukuran, titik pusat, dan arah sumbu dengan model objek yang digunakan.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
