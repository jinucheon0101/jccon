import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>🥟 Dumpling Market</h1>
      <Link href="/dashboard">Enter →</Link>
    </div>
  );
}