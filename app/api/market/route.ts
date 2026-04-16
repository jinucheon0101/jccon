export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) return Response.json([]);

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d`,
      { cache: "no-store" }
    );

    const json: any = await res.json();
    const result = json?.chart?.result?.[0];

    if (!result) return Response.json([]);

    const prices = result?.indicators?.quote?.[0]?.close ?? [];
    const timestamps = result?.timestamp ?? [];

    if (!Array.isArray(prices) || !Array.isArray(timestamps)) {
      return Response.json([]);
    }

    let lastValid: number = 0;

    const data = prices.map((price: any, i: number) => {
      if (price !== null && price !== undefined) {
        lastValid = price;
      }

      return {
        day: i,
        price: lastValid,
        time: timestamps[i] ?? 0,
      };
    });

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e);
    return Response.json([]);
  }
}
