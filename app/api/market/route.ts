export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) return Response.json([]);

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const result = json.chart?.result?.[0];

    if (!result) return Response.json([]);

    const prices: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];
    const timestamps: number[] = result.timestamp ?? [];

    if (!Array.isArray(prices) || !Array.isArray(timestamps)) {
      return Response.json([]);
    }

    // 🔥 null을 이전 값으로 채우기
    let lastValid: number | null = null;

    const data = prices.map((price: number | null, i: number) => {
      if (price !== null && price !== undefined) {
        lastValid = price;
      }

      return {
        day: i,
        price: lastValid ?? 0,
        time: timestamps[i],
      };
    });

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e);
    return Response.json([]);
  }
}
