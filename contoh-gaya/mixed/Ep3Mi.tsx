// EP 3 — Fakta Mi Instan: halaman koran sebagai latar, judul poster berisi halftone, stiker mangkuk besar,
// struk belanja berisi fakta, label harga, lingkaran coretan, cap.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, Cap, F, FilterKolase, Grain, LatarKertas, PanahTangan, Selotip, Sobekan, Tulisan, halftone, usePop } from "./pustaka";

const KolomKoran: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, opacity: 0.32, padding: "40px 30px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 26 }}>
    {Array.from({ length: 5 }, (_, k) => (
      <div key={k}>
        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 30, color: C.tinta, lineHeight: 1.05, marginBottom: 10 }}>{["Pasar pagi ramai", "Harga cabai turun", "Hujan sore hari", "Kereta tepat waktu", "Lomba masak kampung"][k]}</div>
        {Array.from({ length: 70 }, (_, i) => (
          <div key={i} style={{ height: 7, marginBottom: 9, background: C.tinta, width: `${70 + ((i * 37 + k * 13) % 30)}%`, opacity: 0.8 }} />
        ))}
      </div>
    ))}
  </div>
);

const Mangkuk: React.FC = () => {
  const f = useCurrentFrame();
  const s = usePop(8);
  return (
    <svg width={760} height={640} viewBox="-380 -330 760 640" style={{ position: "absolute", left: 20, top: 640, transform: `rotate(-4deg) scale(${s})`, filter: "drop-shadow(0 26px 26px rgba(28,25,23,0.4))", zIndex: 10 }}>
      {/* garis potong stiker putih */}
      <g stroke="#fff" strokeWidth={26} strokeLinejoin="round" fill="#fff">
        <ellipse cx={0} cy={-20} rx={300} ry={84} />
        <path d="M -300 -20 C -290 170, 290 170, 300 -20 Z" />
        <path d="M 120 -250 L 330 -60 M 160 -270 L 350 -90" />
      </g>
      {/* mangkuk */}
      <path d="M -300 -20 C -290 170, 290 170, 300 -20 Z" fill="#F3EBDD" />
      <path d="M 60 -20 C 140 140, 270 120, 300 -20 Z" fill="#D9CBB2" />
      <path d="M -280 40 C -150 90, 150 90, 280 40" stroke={C.merah} strokeWidth={16} fill="none" />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-200 + i * 50} cy={80 + Math.sin(i) * 6} r={7} fill={C.merah} />)}
      <ellipse cx={0} cy={-20} rx={300} ry={84} fill="#E9DCC4" />
      <ellipse cx={0} cy={-14} rx={270} ry={66} fill="#E8A33D" />
      {/* mi bergelombang */}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M ${-240 + i * 8} ${-40 + i * 8} q 30 -20 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`} stroke={i % 2 ? "#F6D27A" : "#F2C25B"} strokeWidth={10} fill="none" strokeLinecap="round" />
      ))}
      {/* telur, sayur, daun bawang */}
      <ellipse cx={-110} cy={-34} rx={64} ry={38} fill="#FFFFFF" />
      <ellipse cx={-104} cy={-32} rx={30} ry={20} fill="#F7B32B" />
      <ellipse cx={-112} cy={-38} rx={10} ry={6} fill="#FFE08A" />
      {[[70, -50], [110, -30], [40, -24]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={30} ry={14} fill="#3FA06A" transform={`rotate(${i * 30 - 20} ${x} ${y})`} />)}
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-20 + (i % 5) * 26} cy={-60 + Math.floor(i / 5) * 22} r={7} fill="#7CC36E" stroke="#2F7D4F" strokeWidth={2} />)}
      {/* sumpit */}
      <path d="M 120 -250 L 330 -60" stroke="#A0703F" strokeWidth={14} strokeLinecap="round" />
      <path d="M 160 -270 L 350 -90" stroke="#8A5E32" strokeWidth={14} strokeLinecap="round" />
      {/* uap */}
      {[-120, -20, 80].map((x, i) => (
        <path key={x} d={`M ${x} -110 q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.85 - ((f + i * 12) % 36) / 70} />
      ))}
    </svg>
  );
};

const Struk: React.FC = () => {
  const s = usePop(20);
  const baris = [
    ["DICIPTAKAN", "1958"],
    ["PENCIPTA", "MOMOFUKU ANDO"],
    ["NEGARA ASAL", "JEPANG"],
    ["MI CUP PERTAMA", "1971"],
    ["PORSI DI INDONESIA", "± 14,5 M/TH"],
    ["PERINGKAT DUNIA", "#2"],
  ];
  return (
    <div style={{ position: "absolute", left: 690, top: 600, width: 340, transform: `rotate(4deg) translateY(${(1 - s) * 80}px)`, opacity: Math.min(1, s * 1.5), filter: "drop-shadow(0 18px 18px rgba(28,25,23,0.3))", zIndex: 14 }}>
      <div style={{ background: "#FCFBF7", padding: "30px 24px 40px", fontFamily: "'DejaVu Sans Mono', monospace", color: C.tinta, clipPath: "polygon(0 0,100% 0,100% 96%,95% 100%,90% 96%,85% 100%,80% 96%,75% 100%,70% 96%,65% 100%,60% 96%,55% 100%,50% 96%,45% 100%,40% 96%,35% 100%,30% 96%,25% 100%,20% 96%,15% 100%,10% 96%,5% 100%,0 96%)" }}>
        <div style={{ textAlign: "center", fontFamily: F.poster, fontSize: 40, letterSpacing: 3 }}>STRUK FAKTA</div>
        <div style={{ textAlign: "center", fontSize: 17, marginTop: 4 }}>KOLASE MART · NO. 003</div>
        <div style={{ borderTop: "3px dashed #57534E", margin: "16px 0" }} />
        {baris.map(([a, b]) => (
          <div key={a} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 17, color: C.abu }}>{a}</div>
            <div style={{ fontSize: 26, fontWeight: 700, textAlign: "right" }}>{b}</div>
          </div>
        ))}
        <div style={{ borderTop: "3px dashed #57534E", margin: "10px 0 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700 }}>
          <span>TOTAL</span>
          <span>NAGIH!</span>
        </div>
        <div style={{ display: "flex", gap: 3, marginTop: 18, height: 50 }}>
          {Array.from({ length: 38 }, (_, i) => <div key={i} style={{ width: [2, 4, 1, 3][i % 4], background: C.tinta }} />)}
        </div>
      </div>
    </div>
  );
};

export const Ep3Mi: React.FC = () => (
  <AbsoluteFill>
    <FilterKolase />
    <LatarKertas warna="#EFE8DA" />
    <KolomKoran />
    {/* bidang warna besar sobek (lapisan belakang) */}
    <Sobekan x={-60} y={520} w={760} h={900} warna="#F7C948" rot={-6} bayang={0.7} />
    <Sobekan x={600} y={1450} w={560} h={360} warna="#9ED8CF" rot={5} bayang={0.7} />

    {/* judul poster dengan isian halftone */}
    <Sobekan x={50} y={60} w={460} h={72} warna={C.merah} rot={-2} halus>
      <div style={{ padding: "8px 22px", fontFamily: F.poster, fontSize: 38, color: "#fff", letterSpacing: 3 }}>KOLASE · MAKAN #03</div>
    </Sobekan>
    <div style={{ position: "absolute", left: 50, top: 150, fontFamily: F.poster, fontSize: 250, lineHeight: 0.88, letterSpacing: -2 }}>
      <div style={{ color: C.tinta, WebkitTextStroke: "0px", position: "relative" }}>
        <span style={{ position: "absolute", left: 10, top: 10, color: C.merah }}>MI</span>
        <span style={{ position: "relative", color: C.tinta }}>MI</span>
      </div>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 10, top: 10, color: C.merah }}>INSTAN</span>
        <span style={{ position: "relative", ...halftone("#1C1917", 9), WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextStroke: "4px #1C1917" }}>INSTAN</span>
      </div>
    </div>
    <Sobekan x={610} y={170} w={420} h={175} warna="#FBF8F1" rot={6} halus tunda={4}>
      <div style={{ padding: "14px 24px", fontFamily: F.serif, fontStyle: "italic", fontWeight: 700, fontSize: 44, color: C.merah, lineHeight: 1.05 }}>3 fakta yang jarang kamu tahu</div>
    </Sobekan>
    <Selotip x={860} y={166} w={120} rot={-18} warna="rgba(255,255,255,0.55)" />

    <Mangkuk />
    <Struk />

    {/* label harga & stiker */}
    {[
      { x: 70, y: 1260, rot: -8, w: "#fff", t: "1958", s: "lahir di Jepang" },
      { x: 360, y: 1330, rot: 6, w: "#FDE68A", t: "1971", s: "versi cup muncul" },
    ].map((l, i) => {
      const s = usePopStatic(26 + i * 6);
      return (
        <div key={l.t} style={{ position: "absolute", left: l.x, top: l.y, transform: `rotate(${l.rot}deg) scale(${s})`, zIndex: 16 }}>
          <div style={{ position: "relative", background: l.w, padding: "16px 26px 16px 46px", fontFamily: F.poster, clipPath: "polygon(16% 0,100% 0,100% 100%,16% 100%,0 50%)", filter: "drop-shadow(0 8px 10px rgba(28,25,23,0.3))", boxShadow: "inset 0 0 0 3px #1C1917" }}>
            <div style={{ position: "absolute", left: 22, top: "50%", width: 14, height: 14, marginTop: -7, borderRadius: 7, background: "#EFE8DA", border: "3px solid #1C1917" }} />
            <div style={{ fontSize: 56, color: C.tinta, lineHeight: 1 }}>{l.t}</div>
            <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: C.merah }}>{l.s}</div>
          </div>
        </div>
      );
    })}

    {/* coretan lingkaran di peringkat */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, zIndex: 31, pointerEvents: "none" }}>
      <ellipse cx={972} cy={1100} rx={58} ry={34} fill="none" stroke={C.merah} strokeWidth={6} transform="rotate(4 972 1100)" />
      <path d="M 920 1078 C 940 1062, 1000 1060, 1030 1090" fill="none" stroke={C.merah} strokeWidth={5} />
    </svg>
    <Tulisan x={640} y={1490} teks={"Indonesia: konsumen\nmi instan terbesar\nke-2 di dunia!"} ukuran={50} rot={-3} lebar={420} />
    <PanahTangan d="M 880 1480 C 900 1350, 930 1230, 955 1145" ujung={[955, 1145, -75]} />

    {/* guntingan tips */}
    <Sobekan x={60} y={1500} w={520} h={250} warna="#FBF8F1" rot={-3} tunda={40}>
      <div style={{ padding: "24px 30px" }}>
        <div style={{ fontFamily: F.poster, fontSize: 30, color: C.hijau, letterSpacing: 2 }}>CATATAN KECIL</div>
        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: 38, color: C.tinta, lineHeight: 1.1, marginTop: 6 }}>Tambah sayur & telur biar gizinya lebih lengkap.</div>
        <div style={{ fontFamily: F.tangan, fontWeight: 700, fontSize: 30, color: C.abu, marginTop: 8 }}>jangan tiap hari ya 😉</div>
      </div>
    </Sobekan>
    <Selotip x={40} y={1488} w={120} rot={-24} />
    <Cap x={890} y={1760} r={100} teks="• DATA 2023 •" tengah="WINA" tunda={48} />
    <div style={{ position: "absolute", left: 60, bottom: 40, fontFamily: F.sans, fontSize: 19, color: C.abu }}>Sumber: World Instant Noodles Association (data 2023)</div>
    <Grain />
  </AbsoluteFill>
);

// hook usePop tidak boleh di dalam map bersyarat; pembungkus kecil agar urutan hook tetap
function usePopStatic(tunda: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePop(tunda);
}
