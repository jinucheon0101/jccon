"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
});

export default function AssetCard({ name, data }: any) {
  const latest = data?.[data.length - 1]?.price;
  const prevClose = data?.[data.length - 2]?.price;

  const change =
    latest && prevClose ? latest - prevClose : null;

  const percent =
    latest && prevClose
      ? ((change / prevClose) * 100).toFixed(2)
      : null;

  const isUp = change !== null ? change >= 0 : true;

  // 🔥 숫자형 percent
  const percentNum = percent ? parseFloat(percent) : 0;

  // 🔥 상승률 큰 카드 확대
  const isHot = Math.abs(percentNum) >= 5;

  // 🔥 골든/데드 크로스 감지 (MA5 vs MA20)
  const ma5_now = data?.[data.length - 1]?.ma5;
  const ma20_now = data?.[data.length - 1]?.ma20;
  const ma5_prev = data?.[data.length - 2]?.ma5;
  const ma20_prev = data?.[data.length - 2]?.ma20;

  let signal = "";
  if (ma5_prev && ma20_prev && ma5_now && ma20_now) {
    if (ma5_prev < ma20_prev && ma5_now > ma20_now) {
      signal = "🟢 Golden Cross";
    } else if (ma5_prev > ma20_prev && ma5_now < ma20_now) {
      signal = "🔴 Death Cross";
    }
  }

  return (
    <div
      style={{
        background: "#0b0b10",
        border: isHot
          ? "1px solid #00ff9f"
          : "1px solid #00ff9f33",
        borderRadius: 12,
        padding: 14,
        boxShadow: isHot
          ? "0 0 20px #00ff9f55"
          : "0 0 10px #00ff9f22",
        transform: isHot ? "scale(1.03)" : "scale(1)",
        transition: "0.3s",
      }}
    >
      {/* NAME */}
      <div style={{ fontSize: 14, color: "#aaa" }}>
        {name}
      </div>

      {/* PRICE */}
      <div
        style={{
          fontSize: 22,
          color: "#fff",
          marginBottom: 4,
        }}
      >
        {latest
          ? name === "NASDAQ" || name === "S&P 500"
            ? latest.toFixed(0)
            : name === "KRW/USD"
            ? `${latest.toFixed(0)}원`
            : `$${latest.toFixed(2)}`
          : "--"}
      </div>

      {/* CHANGE */}
      <div
        style={{
          fontSize: 12,
          color: isUp ? "#00ff9f" : "#ff4d4d",
          marginBottom: 6,
        }}
      >
        {percent === null
          ? "..."
          : `${isUp ? "+" : ""}${percent}%`}
      </div>

      {/* 🔥 SIGNAL */}
      {signal && (
        <div style={{ fontSize: 11, color: "#ccc", marginBottom: 6 }}>
          {signal}
        </div>
      )}

      {/* CHART */}
      <Chart data={data} />
    </div>
  );
}