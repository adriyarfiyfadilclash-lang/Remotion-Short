// Contoh gaya ADRIY Realistic 3D (9:16): berlian (IOR & dispersi), emas batangan (logam PBR), es batu terapung.
import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { BoxGeometry, DoubleSide, LatheGeometry, Vector2 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CahayaLatar, Debu, Judul, Kam, Kanvas, Kepala, Lantai, Penutup, Spek, Studio, Sumber, Teks3D, V3, keLayar } from "./pustaka";

const putarY = (p: V3, a: number): V3 => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];

// ===================== EP 01: BERLIAN =====================
const Berlian: React.FC<{ rot: number }> = ({ rot }) => {
  const g = useMemo(() => {
    // potongan brilian bundar: culet → paviliun → girdle → mahkota → table
    const prof = [[0.001, -0.86], [1, 0], [1, 0.045], [0.8, 0.22], [0.56, 0.36], [0.001, 0.36]].map(([r, y]) => new Vector2(r, y));
    const l = new LatheGeometry(prof, 16).toNonIndexed();
    l.computeVertexNormals(); // non-indexed → tiap faset rata (flat)
    return l;
  }, []);
  return (
    <group rotation={[0.32, rot, 0.08]}>
      <mesh geometry={g} scale={1.25}>
        <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0} transmission={1} thickness={1.6} ior={2.42} dispersion={8} envMapIntensity={3.2} specularIntensity={1} iridescence={0.6} iridescenceIOR={2.0} clearcoat={1} clearcoatRoughness={0} />
      </mesh>
    </group>
  );
};

const KAM1: Kam = { pos: [0, 2.4, 11.5], lihat: [0, 0.1, 0], fov: 40 };
export const Ep1Berlian: React.FC = () => {
  const f = useCurrentFrame();
  const rot = f * 0.012;
  const k: Kam = { ...KAM1, pos: [Math.sin(f * 0.003) * 0.6, 2.4, 11.5 - f * 0.008] };
  const pTable = keLayar(k, [0, 1.05, 0]);
  const pGirdle = keLayar(k, [1.5, 0.65, 0.3]);
  const pCulet = keLayar(k, [0, -0.62, 0.1]);
  return (
    <AbsoluteFill style={{ background: "#08080A" }}>
      <Kanvas k={k} latar="#08080A" env={1.2} paparan={1.05} kabut={["#08080A", 9, 22]}>
        <Studio key1="#FFFFFF" rimA="#7FB2FF" rimB="#FF8FD0" kuat={1.1} />
        <pointLight position={[0, 3, 2]} intensity={25} color="#ffffff" />
        {/* cahaya lembut di belakang permata */}
        <CahayaLatar warna="#4A3F7A" ukuran={9} position={[0, 0.9, -4]} kuat={0.9} />
        <CahayaLatar warna="#7FA8FF" ukuran={4} position={[0, 1.2, -3.9]} kuat={0.35} />
        {/* softbox di belakang kamera: memberi pantulan terang pada faset */}
        <mesh position={[0, 5, 9]} rotation={[0.6, 0, 0]} userData={{ tanpaBayang: true }}>
          <planeGeometry args={[8, 3]} />
          <meshBasicMaterial color="#ffffff" side={DoubleSide} />
        </mesh>
        <group position={[0, 0.6, 0]} scale={1.25}>
          <Berlian rot={rot} />
        </group>
        {/* tumpuan beludru */}
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[1.6, 1.75, 0.5, 96]} />
          <meshStandardMaterial color="#141216" roughness={0.95} />
        </mesh>
        <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.55, 1.6, 96]} />
          <meshStandardMaterial color="#C9A55C" metalness={1} roughness={0.25} side={DoubleSide} />
        </mesh>
        <Lantai y={-1.3} warna="#060608" kasar={0.25} />
        <Debu n={90} warna="#E9F1FF" />
      </Kanvas>
      {[[0.55, 0.95, 0], [-0.9, 0.7, 0.4], [1.3, 0.35, 0.3], [-0.2, 0.2, 1.1]].map(([x, y, z], i) => {
        const q = keLayar(k, [x, y, z]);
        const kilat = Math.max(0, Math.sin(f / 7 + i * 1.9));
        const u = 28 + 46 * kilat;
        return (
          <svg key={i} width={u * 2} height={u * 2} style={{ position: "absolute", left: q.x - u, top: q.y - u, opacity: kilat, mixBlendMode: "screen" }}>
            <path d={`M ${u} 0 L ${u + 3} ${u - 3} L ${u * 2} ${u} L ${u + 3} ${u + 3} L ${u} ${u * 2} L ${u - 3} ${u + 3} L 0 ${u} L ${u - 3} ${u - 3} Z`} fill="#ffffff" />
            <circle cx={u} cy={u} r={u * 0.28} fill="#DCEBFF" opacity={0.6} />
          </svg>
        );
      })}
      <Kepala seri="MATERIAL · 01" aksen="#9CC3FF" />
      <Judul kecil="Kenapa berkilau?" besar="BERLIAN" aksen="#9CC3FF" />
      <Spek dari={pTable} x={60} y={520} nilai="2,42" label="indeks bias — cahaya dibelokkan sangat tajam" aksen="#9CC3FF" tunda={30} />
      <Spek dari={pGirdle} x={720} y={760} nilai="57 faset" label="potongan brilian bundar" aksen="#FF8FD0" tunda={36} kanan />
      <Spek dari={pCulet} x={720} y={1240} nilai="10" label="skala kekerasan Mohs — mineral terkeras" aksen="#FFD25A" tunda={42} kanan />
      <Penutup teks="Cahaya terpantul berkali-kali di dalam, lalu terurai jadi warna pelangi." sub="Berlian = karbon murni yang tersusun rapat." aksen="#9CC3FF" tunda={50} />
      <Sumber teks="Sumber: GIA (Gemological Institute of America) · model 3D ilustrasi" />
    </AbsoluteFill>
  );
};

// ===================== EP 02: EMAS =====================
const Batangan: React.FC<{ p: V3; rot?: number }> = ({ p, rot = 0 }) => {
  const g = useMemo(() => {
    // bentuk ingot: alas lebih besar dari atas (trapesium)
    const b = new BoxGeometry(1.6, 0.45, 0.8, 8, 2, 4);
    const pos = b.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) > 0) { pos.setX(i, pos.getX(i) * 0.86); pos.setZ(i, pos.getZ(i) * 0.8); }
    b.computeVertexNormals();
    return b;
  }, []);
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <mesh geometry={g}>
        <meshPhysicalMaterial color="#F2C14E" metalness={1} roughness={0.18} clearcoat={0.4} clearcoatRoughness={0.1} envMapIntensity={1.6} />
      </mesh>
      <Teks3D teks="999.9" ukuran={0.16} tebal={0.02} position={[0, 0.235, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color="#E7B43E" metalness={1} roughness={0.3} />
      </Teks3D>
    </group>
  );
};

export const Ep2Emas: React.FC = () => {
  const f = useCurrentFrame();
  const a = -0.5 + f * 0.0035;
  const k: Kam = { pos: [Math.sin(a) * 12, 4.6, Math.cos(a) * 12], lihat: [0, 0.6, 0], fov: 40 };
  const BAR: V3[] = [[-0.9, -0.77, 0.5], [0.9, -0.77, 0.5], [-0.9, -0.77, -0.5], [0.9, -0.77, -0.5], [0, -0.32, 0.5], [0, -0.32, -0.5], [0, 0.13, 0]];
  const pAtas = keLayar(k, [0, 0.36, 0]);
  const pTumpuk = keLayar(k, putarY([-1.6, -0.77, 0.5], 0));
  return (
    <AbsoluteFill style={{ background: "#0B0906" }}>
      <Kanvas k={k} latar="#0B0906" env={1} paparan={1.1} kabut={["#0B0906", 10, 24]}>
        <Studio key1="#FFE9C4" rimA="#FFC36B" rimB="#FF8A3D" kuat={1.1} />
        {BAR.map((p, i) => <Batangan key={i} p={p} rot={i === 6 ? 0.35 : 0} />)}
        <Teks3D teks="Au" ukuran={1.1} tebal={0.3} position={[0, 2.3, -1.8]}>
          <meshPhysicalMaterial color="#F2C14E" metalness={1} roughness={0.15} clearcoat={0.5} />
        </Teks3D>
        <Teks3D teks="79" ukuran={0.38} tebal={0.08} position={[1.15, 2.9, -1.8]}>
          <meshPhysicalMaterial color="#C9A55C" metalness={1} roughness={0.35} />
        </Teks3D>
        <Lantai y={-1} warna="#0C0A08" kasar={0.12} />
        <Debu n={80} warna="#FFE2A8" luas={[7, 5, 5]} />
      </Kanvas>
      <Kepala seri="MATERIAL · 02" aksen="#F2C14E" />
      <Judul kecil="Logam yang tak berkarat" besar="EMAS" aksen="#F2C14E" />
      <Spek dari={pAtas} x={60} y={1080} nilai="19,3 g/cm³" label="hampir 2,5× lebih berat dari besi" aksen="#F2C14E" tunda={30} />
      <Spek dari={pTumpuk} x={700} y={1190} nilai="1.064 °C" label="titik leleh emas" aksen="#FF8A3D" tunda={38} kanan />
      <Penutup teks="Emas murni “999.9” berarti 99,99% emas." sub="Tidak bereaksi dengan udara & air, jadi kilaunya bertahan ribuan tahun." aksen="#F2C14E" tunda={48} />
      <Sumber teks="Sumber: Royal Society of Chemistry, USGS · model 3D ilustrasi" />
    </AbsoluteFill>
  );
};

// ===================== EP 03: ES MENGAPUNG =====================
const EsBatu: React.FC<{ p: V3; r: V3; s?: number }> = ({ p, r, s = 1 }) => {
  const g = useMemo(() => new RoundedBoxGeometry(0.9, 0.9, 0.9, 5, 0.14), []);
  return (
    <group position={p} rotation={r} scale={s}>
      <mesh geometry={g}>
        <meshPhysicalMaterial color="#E4F4FF" roughness={0.12} transparent opacity={0.82} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={2.2} emissive="#9FD4FF" emissiveIntensity={0.12} />
      </mesh>
      {/* gelembung udara terperangkap */}
      {[[0.1, 0.05, 0.08, 0.06], [-0.15, -0.1, 0.05, 0.04], [0.05, -0.2, -0.1, 0.05], [-0.05, 0.15, -0.12, 0.035]].map(([x, y, z, rr], i) => (
        <mesh key={i} position={[x, y, z]} userData={{ tanpaBayang: true }}>
          <sphereGeometry args={[rr, 16, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

export const Ep3Es: React.FC = () => {
  const f = useCurrentFrame();
  const ayun = Math.sin(f / 18) * 0.03;
  const k: Kam = { pos: [3.2, 1.8, 10.5], lihat: [0, -0.35, 0], fov: 40 };
  const MUKA = 0.4; // permukaan air
  const pAtas = keLayar(k, [-0.3, MUKA + 0.12, 0.3]);
  const pBawah = keLayar(k, [-0.3, MUKA - 0.7, 0.5]);
  return (
    <AbsoluteFill style={{ background: "#06101A" }}>
      <Kanvas k={k} latar="#06101A" env={1.1} paparan={1.05} kabut={["#06101A", 10, 24]}>
        <Studio key1="#F2F8FF" rimA="#5EC8FF" rimB="#B7E6FF" kuat={1} />
        {/* tangki kaca */}
        <mesh position={[0, -0.55, 0]} userData={{ tanpaBayang: true }}>
          <boxGeometry args={[3.2, 2.5, 2]} />
          <meshPhysicalMaterial color="#DDF3FF" roughness={0.02} transparent opacity={0.08} side={DoubleSide} depthWrite={false} envMapIntensity={2} />
        </mesh>
        <lineSegments position={[0, -0.55, 0]}>
          <edgesGeometry args={[new BoxGeometry(3.2, 2.5, 2)]} />
          <lineBasicMaterial color="#CFEFFF" transparent opacity={0.7} />
        </lineSegments>
        {/* air */}
        <mesh position={[0, (MUKA - 1.8) / 2, 0]} userData={{ tanpaBayang: true }}>
          <boxGeometry args={[3.12, MUKA + 1.75, 1.92]} />
          <meshPhysicalMaterial color="#1F74C4" roughness={0.05} transparent opacity={0.38} depthWrite={false} />
        </mesh>
        <mesh position={[0, MUKA, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={{ tanpaBayang: true }}>
          <planeGeometry args={[3.12, 1.92, 32, 32]} />
          <meshPhysicalMaterial color="#8FD3FF" roughness={0.02} metalness={0.1} transparent opacity={0.35} depthWrite={false} side={DoubleSide} />
        </mesh>
        {/* es: ±90% di bawah permukaan */}
        <EsBatu p={[-0.3, MUKA - 0.36 + ayun, 0.3]} r={[0.12, 0.5, 0.06]} s={1.2} />
        <EsBatu p={[0.85, MUKA - 0.33 - ayun, -0.35]} r={[-0.08, -0.3, 0.1]} s={0.95} />
        {/* garis permukaan air (penanda) */}
        <mesh position={[0, MUKA + 0.002, 0.97]} userData={{ tanpaBayang: true }}>
          <boxGeometry args={[3.12, 0.012, 0.01]} />
          <meshBasicMaterial color="#BFE7FF" />
        </mesh>
        <Lantai y={-1.81} warna="#081019" kasar={0.15} />
        <Debu n={60} warna="#D8F1FF" luas={[6, 4, 4]} ukuran={0.012} />
      </Kanvas>
      <Kepala seri="MATERIAL · 03" aksen="#7FD0FF" />
      <Judul kecil="Kenapa es mengapung?" besar="ES BATU" aksen="#7FD0FF" />
      <Spek dari={pAtas} x={60} y={560} nilai="±10%" label="bagian es yang muncul di atas air" aksen="#7FD0FF" tunda={30} />
      <Spek dari={pBawah} x={60} y={1290} nilai="±90%" label="bagian yang tenggelam" aksen="#2F8FD8" tunda={36} />
      <Penutup teks="Saat membeku, air mengembang ±9% — es jadi lebih ringan dari air." sub="Kepadatan es ±0,92 g/cm³, air ±1,00 g/cm³." aksen="#7FD0FF" tunda={46} />
      <Sumber teks="Sumber: USGS Water Science School · model 3D ilustrasi" />
    </AbsoluteFill>
  );
};

export const ContohRealistic: React.FC = () => (
  <AbsoluteFill style={{ background: "#08080A" }}>
    <Sequence durationInFrames={110}><Ep1Berlian /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Emas /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Es /></Sequence>
  </AbsoluteFill>
);
