// "Si Merah": maskot sel darah merah buatan sendiri (SVG), ekspresi berubah per adegan.
import React from "react";
import { useMasukKeluar } from "./Teks";

export const Maskot: React.FC<{ ekspresi: string }> = ({ ekspresi }) => {
  const { masuk, hilang, f } = useMasukKeluar(8);
  const lompat = Math.abs(Math.sin(f / 9)) * (ekspresi === "senang" ? 22 : 8);
  const miring = Math.sin(f / 14) * (ekspresi === "bingung" ? 10 : 5);
  const kedip = f % 70 > 66 ? 0.15 : 1;
  const mulut =
    ekspresi === "senang" ? "M 70 118 Q 100 146 130 118" : ekspresi === "kaget" ? "" : "M 76 126 Q 92 116 108 126 Q 118 132 128 124";
  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        top: 1360 - lompat,
        width: 200,
        height: 200,
        opacity: hilang,
        transform: `scale(${masuk}) rotate(${miring}deg)`,
      }}
    >
      <svg width={200} height={200} viewBox="0 0 200 200">
        <ellipse cx={100} cy={176} rx={60 - lompat} ry={10} fill="rgba(0,0,0,0.18)" />
        <ellipse cx={100} cy={100} rx={86} ry={74} fill="#e63946" />
        <ellipse cx={100} cy={104} rx={58} ry={46} fill="#c1121f" opacity={0.55} />
        <ellipse cx={72} cy={66} rx={22} ry={12} fill="#ff8a95" opacity={0.6} />
        <g transform={`translate(0 ${ekspresi === "kaget" ? -6 : 0})`}>
          <ellipse cx={74} cy={92} rx={12} ry={16 * kedip} fill="#fff" />
          <ellipse cx={126} cy={92} rx={12} ry={16 * kedip} fill="#fff" />
          <circle cx={ekspresi === "bingung" ? 70 : 76} cy={95} r={6 * kedip} fill="#1b1b1b" />
          <circle cx={ekspresi === "bingung" ? 122 : 128} cy={95} r={6 * kedip} fill="#1b1b1b" />
        </g>
        {ekspresi === "kaget" ? (
          <ellipse cx={100} cy={128} rx={12} ry={15} fill="#5a0a10" />
        ) : (
          <path d={mulut} stroke="#5a0a10" strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
        {ekspresi === "bingung" && (
          <text x={158} y={44} fontSize={48} fontWeight={800} fill="#ffd166">
            ?
          </text>
        )}
        {ekspresi === "kaget" && (
          <text x={160} y={44} fontSize={48} fontWeight={800} fill="#ffd166">
            !
          </text>
        )}
      </svg>
    </div>
  );
};
