# Skill Add-on — Exploded View 3D Components & Assembly

## Tujuan
Gunakan modul ini untuk membangun visualisasi bagian-bagian objek, memperlihatkan urutan pembongkaran, lalu menunjukkan proses perakitan kembali.

## Pemilihan komponen
- Bagian utama yang bergerak: `AssemblyPart3D`.
- Bagian terpisah dengan offset relatif: `ExplodedComponent3D`.
- Garis posisi pemasangan: `AssemblyConnector3D`.
- Lubang dudukan: `ComponentSocket3D`.
- Baut: `Fastener3D`.
- Satu aksi pemasangan: `AssemblyStep3D`.
- Arah gerak atau jalur komponen: `AssemblyGuide3D`.

## Alur visual yang disarankan
1. Tampilkan objek dalam keadaan utuh.
2. Pisahkan komponen satu per satu, bukan sekaligus tanpa urutan.
3. Tampilkan garis posisi awal sebagai panduan.
4. Beri jeda agar penonton dapat mengamati tiap bagian.
5. Susun kembali komponen dengan urutan yang masuk akal.
6. Akhiri dengan objek utuh dan stabil.

## Aturan kualitas
- Setiap bagian harus mempunyai titik pusat dan posisi akhir yang jelas.
- Hindari tabrakan geometri saat bagian bergerak.
- Gunakan jarak pemisahan yang cukup agar bentuk komponen terlihat.
- Samakan skala komponen dengan objek utama.
- Jangan menyebut model sederhana sebagai rekonstruksi CAD presisi.
- Uji komposisi dari kamera akhir, bukan hanya dari sudut pandang bebas.
