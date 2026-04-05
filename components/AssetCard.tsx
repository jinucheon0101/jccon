"use client";

import Chart from "./Chart";

export default function AssetCard({
  name,
  hp,
  clickAsset,
  data,
  news,
  isBoss,
}: any) {
  return (
    <div
      onClick={() => clickAsset(name)}
      style={{
        background: "#0b0b10",
        padding: 12,
        borderRadius: 14,
        border: isBoss ? "2px solid gold" : "1px solid #222",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: "bold" }}>{name}</div>

      <div style={{ marginTop: 6, marginBottom: 8 }}>
        <div style={{ height: 6, background: "#222", borderRadius: 10 }}>
          <div
            style={{
              width: `${hp}%`,
              height: "100%",
              background:
                hp > 70 ? "#00ff88" : hp > 40 ? "#ffcc00" : "#ff4d4d",
            }}
          />
        </div>
        <div style={{ fontSize: 10 }}>HP: {hp}</div>
      </div>

      {news.map((n: string, i: number) => (
        <div key={i} style={{ fontSize: 10 }}>
          {n}
        </div>
      ))}

      <Chart data={data} />
    </div>
  );
}