"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🔥 MA 계산
export function enrichData(data: any[]) {
  return data.map((d, i) => {
    const slice = (n: number) =>
      data.slice(Math.max(0, i - n), i + 1);

    const avg = (arr: any[]) =>
      arr.reduce((sum, v) => sum + v.price, 0) / arr.length;

    return {
      ...d,
      ma5: avg(slice(5)),
      ma20: avg(slice(20)),
      ma50: avg(slice(50)),
      ma100: avg(slice(100)),
    };
  });
}

export default function Chart({ data }: any) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div style={{ height: 180 }}>Loading...</div>;
  }

  const enriched = enrichData(data);

  return (
    <div style={{ height: 180, position: "relative" }}>
      {/* 범례 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          fontSize: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <span style={{ color: "#00ff9f" }}>● Price</span>
        <span style={{ color: "#ffcc00" }}>● MA5</span>
        <span style={{ color: "#ff4d4d" }}>● MA20</span>
        <span style={{ color: "#4da6ff" }}>● MA50</span>
        <span style={{ color: "#b266ff" }}>● MA100</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={enriched}>
          <XAxis dataKey="time" tick={false} />
          <YAxis domain={["auto", "auto"]} hide />

          <Tooltip
            labelFormatter={(t) =>
              new Date(t * 1000).toLocaleDateString()
            }
          />

          <Line dataKey="price" stroke="#00ff9f" dot={false} strokeWidth={2} />
          <Line dataKey="ma5" stroke="#ffcc00" dot={false} />
          <Line dataKey="ma20" stroke="#ff4d4d" dot={false} />
          <Line dataKey="ma50" stroke="#4da6ff" strokeDasharray="6 4" dot={false} />
          <Line dataKey="ma100" stroke="#b266ff" strokeDasharray="2 6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}