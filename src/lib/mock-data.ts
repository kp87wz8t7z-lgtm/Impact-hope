// Mock data shaped after Helius (transactions) and CoinGecko (price) APIs.
// Swap these with real fetches when contracts go live.

export type PricePoint = { date: string; price: number };

export type TokenStats = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  history: PricePoint[];
};

export type Transaction = {
  signature: string;
  type: "DONATION" | "TRANSFER" | "SWAP" | "STAKE";
  amount: number;
  token: string;
  from: string;
  to: string;
  timestamp: number;
  status: "confirmed" | "processing";
  impactTag?: string;
};

// CoinGecko-shaped mock
export const tokenStats: TokenStats = {
  symbol: "IHN",
  name: "ImpactHope Network",
  price: 0.0847,
  change24h: 3.21,
  marketCap: 4_235_000,
  volume24h: 187_400,
  circulatingSupply: 50_000_000,
  totalSupply: 200_000_000,
  history: [
    { date: "04 May", price: 0.062 },
    { date: "08 May", price: 0.071 },
    { date: "12 May", price: 0.068 },
    { date: "16 May", price: 0.075 },
    { date: "20 May", price: 0.079 },
    { date: "24 May", price: 0.083 },
    { date: "29 May", price: 0.0847 },
  ],
};

// Helius-shaped mock (Solana enhanced transactions)
export const recentTransactions: Transaction[] = [
  {
    signature: "5kHm...A3xP",
    type: "DONATION",
    amount: 250,
    token: "USDC",
    from: "8xQr...F9kL",
    to: "IHN Treasury",
    timestamp: Date.now() - 1000 * 60 * 12,
    status: "confirmed",
    impactTag: "Agua potable · México",
  },
  {
    signature: "2mNp...B7wQ",
    type: "DONATION",
    amount: 1500,
    token: "USDC",
    from: "3yTv...C2mR",
    to: "IHN Treasury",
    timestamp: Date.now() - 1000 * 60 * 45,
    status: "confirmed",
    impactTag: "Educación · Guatemala",
  },
  {
    signature: "9jRs...D4nS",
    type: "TRANSFER",
    amount: 10_000,
    token: "IHN",
    from: "IHN Treasury",
    to: "Alianza ONG · CR",
    timestamp: Date.now() - 1000 * 60 * 90,
    status: "confirmed",
    impactTag: "Alimentación · Costa Rica",
  },
  {
    signature: "1bKt...E8uT",
    type: "DONATION",
    amount: 75,
    token: "SOL",
    from: "6pWu...G1vU",
    to: "IHN Treasury",
    timestamp: Date.now() - 1000 * 60 * 180,
    status: "confirmed",
  },
  {
    signature: "7cLv...H5oV",
    type: "STAKE",
    amount: 50_000,
    token: "IHN",
    from: "4qXw...I9pW",
    to: "Staking Pool",
    timestamp: Date.now() - 1000 * 60 * 320,
    status: "confirmed",
  },
  {
    signature: "3dMx...J2qX",
    type: "DONATION",
    amount: 500,
    token: "USDC",
    from: "7rYy...K6rY",
    to: "IHN Treasury",
    timestamp: Date.now() - 1000 * 60 * 480,
    status: "confirmed",
    impactTag: "Salud · Honduras",
  },
];

export function formatTimeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 60) return `hace ${min}m`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h}h`;
  return `hace ${Math.floor(h / 24)}d`;
}

export function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}
