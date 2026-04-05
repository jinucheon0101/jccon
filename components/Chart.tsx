"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }: any) {
  return (
    <div style={{ height: 120, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%" minHeight={120}>
        <LineChart data={data}>
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00ff99"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}