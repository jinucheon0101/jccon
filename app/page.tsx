"use client";

import { useEffect, useState } from "react";
import AssetCard from "@/components/AssetCard";
import { tickerMap } from "@/lib/data";

export default function Page() {
  const [marketData, setMarketData] = useState<any>({});

  useEffect(() => {
    async function fetchAll() {
      const entries = await Promise.all(
        Object.entries(tickerMap).map(async ([name, symbol]) => {
          const res = await fetch(`/api/market?symbol=${symbol}`);
          const data = await res.json();
          return [name, data];
        })
      );

      setMarketData(Object.fromEntries(entries));
    }

    fetchAll();
  }, []);

  const assets = Object.keys(marketData);

  // 🔥 시장 요약 + 해석까지 포함
  const summary = assets
    .map((name) => {
      const data = marketData[name];
      if (!data || data.length < 2) return null;

      const latest = data[data.length - 1].price;
      const prev = data[data.length - 2].price;

      const change = ((latest - prev) / prev) * 100;

      // 🔥 강한 상승
      if (change > 3)
        return {
          text: `🚀 ${name} strong rally (+${change.toFixed(1)}%)`,
          type: "bull",
        };

      // 🔥 급락
      if (change < -3)
        return {
          text: `🔻 ${name} sharp drop (${change.toFixed(1)}%)`,
          type: "bear",
        };

      // 🔥 횡보
      if (Math.abs(change) < 0.5)
        return {
          text: `😐 ${name} flat`,
          type: "neutral",
        };

      return null;
    })
    .filter(Boolean);

  // 🔥 시장 전체 톤 판단
  const bullCount = summary.filter((s: any) => s.type === "bull").length;
  const bearCount = summary.filter((s: any) => s.type === "bear").length;

  let marketTone = "";
  if (bullCount > bearCount) {
    marketTone = "🟢 Risk ON — 자금 유입 구간";
  } else if (bearCount > bullCount) {
    marketTone = "🔴 Risk OFF — 방어 우선 구간";
  } else {
    marketTone = "⚖️ Mixed — 방향성 탐색 중";
  }

  return (
    <div
      style={{
        padding: 20,
        background: "#050508",
        minHeight: "100vh",
        color: "white",
        fontFamily: "monospace",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          fontSize: 48,
          color: "#00ff9f",
          marginBottom: 10,
        }}
      >
        DUMPLING INDEX 🥟
      </h1>

      {/* 🔥 시장 한줄 해석 */}
      <div
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#00ff9f",
          marginBottom: 10,
        }}
      >
        {marketTone}
      </div>

      {/* 🔥 트위터 느낌 요약 로그 */}
      <div
        style={{
          marginBottom: 20,
          padding: 12,
          border: "1px solid #222",
          borderRadius: 10,
          maxHeight: 120,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            animation: "scrollUp 12s linear infinite",
          }}
        >
          {summary.map((s: any, i) => (
            <div
              key={i}
              style={{
                fontSize: 12,
                color:
                  s.type === "bull"
                    ? "#00ff9f"
                    : s.type === "bear"
                    ? "#ff4d4d"
                    : "#aaa",
              }}
            >
              • {s.text}
            </div>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {assets.map((name) => (
          <AssetCard key={name} name={name} data={marketData[name]} />
        ))}
      </div>

      {/* 🔥 애니메이션 */}
      <style jsx global>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}