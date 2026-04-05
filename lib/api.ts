export async function getMarketData(symbol: string) {
  try {
    const res = await fetch(
      \`https://query1.finance.yahoo.com/v8/finance/chart/\${symbol}\`,
      { cache: "no-store" }
    );

    const json = await res.json();

    const result = json.chart.result?.[0];
    if (!result) return [];

    const prices = result.indicators.quote[0].close;

    return prices.map((price: number, i: number) => ({
      day: i,
      price: price ?? 0,
    }));
  } catch (e) {
    console.error("API error:", e);
    return [];
  }
}