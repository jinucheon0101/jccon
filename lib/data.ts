export const aiDeck = [
  "📈 Buy momentum stocks (Palantir type)",
  "🚀 High beta plays (Joby type)",
  "🛢 Hedge with oil exposure",
  "₿ Crypto volatility farming",
  "🧠 Hold cash when HP low",
];

export const aiNews: Record<string, string[]> = {
  Palantir: ["[🟢] AI demand strong", "[🔴] Valuation pressure"],
  "Joby Aviation": ["[🟢] UAE testing progress"],
  Satellogic: ["[🔴] Cash burn concern"],
  "WTI Crude Oil": ["[🟢] Supply risk premium"],
  Bitcoin: ["[🟢] Halving narrative"],
  NASDAQ: ["[⚪] Macro sensitivity"],
};

export const tickerMap: Record<string, string> = {
  Palantir: "PLTR",
  "Joby Aviation": "JOBY",
  Satellogic: "SATL",
  "WTI Crude Oil": "CL=F",
  Bitcoin: "BTC-USD",
  NASDAQ: "^IXIC",
};