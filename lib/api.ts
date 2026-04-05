export async function getMarketData(symbol: string) {
  try {
    const res = await fetch(`/api/market?symbol=${symbol}`);
    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data;
  } catch (e) {
    console.error("API error:", e);
    return [];
  }
}