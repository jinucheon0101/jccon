import { NextResponse } from "next/server";

const API_KEY = process.env.FINNHUB_API_KEY;

const symbols = ["PLTR", "JOBY", "SATL", "BTC-USD", "AAPL"];

export async function GET() {
  const result: any = {};

  await Promise.all(
    symbols.map(async (symbol) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      const json = await res.json();

      result[symbol] = {
        price: json.c,
        change: json.d,
        percent: json.dp,
      };
    })
  );

  return NextResponse.json(result);
}