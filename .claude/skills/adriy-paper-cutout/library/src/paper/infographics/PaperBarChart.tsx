import React from "react";
import {interpolate, useCurrentFrame} from "remotion";

type Item = {label: string; value: number; color?: string};
type Props = {data: Item[]; maxValue?: number; width?: number; height?: number; delay?: number; barGap?: number};

export const PaperBarChart: React.FC<Props> = ({data, maxValue, width=800, height=420, delay=0, barGap=18}) => {
  const frame = useCurrentFrame();
  const max = maxValue ?? Math.max(1, ...data.map(d => d.value));
  const chartHeight = height - 58;
  const barWidth = (width - barGap * (data.length + 1)) / Math.max(1, data.length);
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    {data.map((d,i) => {
      const p = interpolate(frame, [delay+i*5, delay+i*5+24], [0,1], {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
      const h = Math.max(0, d.value/max*chartHeight*p);
      const x = barGap + i*(barWidth+barGap);
      return <g key={`${d.label}-${i}`}>
        <rect x={x+3} y={chartHeight-h+5} width={barWidth} height={h} rx={3} fill="rgba(50,35,20,.15)"/>
        <path d={`M${x} ${chartHeight-h} h${barWidth} v${h} h-${barWidth} Z`} fill={d.color ?? ["#D77F69","#E4B85E","#73978B","#7892B5"][i%4]} stroke="rgba(60,42,25,.2)" strokeWidth="1.2"/>
        <path d={`M${x+4} ${chartHeight-h+4} h${Math.max(0,barWidth-8)}`} stroke="rgba(255,255,255,.25)" strokeWidth="2"/>
        <text x={x+barWidth/2} y={chartHeight+25} textAnchor="middle" fontSize="17" fill="#40382F">{d.label}</text>
        <text x={x+barWidth/2} y={Math.max(18,chartHeight-h-10)} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#40382F">{d.value}</text>
      </g>;
    })}
    <path d={`M0 ${chartHeight} H${width}`} stroke="#8B7B66" strokeWidth="2"/>
  </svg>;
};
