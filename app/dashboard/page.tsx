"use client";

import { useEffect, useState } from "react";
import AssetCard from "@/components/AssetCard";
import { aiDeck, aiNews, tickerMap } from "@/lib/data";
import { getMarketData } from "@/lib/api";

export default function Dashboard() {
  const [hp, setHp] = useState<Record<string, number>>({
    Palantir: 78,
    "Joby Aviation": 64,
    Satellogic: 52,
    "WTI Crude Oil": 70,
    Bitcoin: 60,
    NASDAQ: 85,
  });

  const [marketData, setMarketData] = useState<Record<string, any[]>>({});
  const [log, setLog] = useState<string[]>([
    "🥟 Market connected...",
  ]);

  const assets = Object.keys(hp);

  // 🔥 API 호출
  useEffect(() => {
    const fetchAll = async () => {
      const entries = Object.entries(tickerMap);

      const results = await Promise.all(
        entries.map(async ([name, symbol]) => {
          const data = await getMarketData(symbol);
          return [name, data];
        })
      );

      setMarketData(Object.fromEntries(results));
    };

    fetchAll();
  }, []);

  const clickAsset = (name: string) => {
    const delta = Math.random() > 0.5 ? 5 : -7;

    setHp((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(100, prev[name] + delta)),
    }));

    setLog((prev) => [
      `🥟 ${name} HP ${delta > 0 ? "+" : ""}${delta}`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div style={{ padding: 20, background: "#050508", minHeight: "100vh", color: "white" }}>
      <h1>🥟 DUMPLING MARKET RPG</h1>

      <div>
        {aiDeck.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {assets.map((name) => (
          <AssetCard
            key={name}
            name={name}
            hp={hp[name]}
            clickAsset={clickAsset}
            data={marketData[name] || []}
            news={aiNews[name]}
            isBoss={name === "NASDAQ"}
          />
        ))}
      </div>

      <div>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}