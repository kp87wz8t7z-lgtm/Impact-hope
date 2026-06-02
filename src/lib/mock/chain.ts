// Mock data layer shaped after Helius (Solana) + CoinGecko APIs.
// When switching to live, replace each `mockXxx()` with a real fetch
// against `https://api.helius.xyz/...` or `https://api.coingecko.com/api/v3/...`.
// Shapes match the official responses so call sites need no changes.

export const TREASURY_WALLET = "7xKXtg2CW87d9HfV4Sd5ECpwhB3sZcMRkM4bP1aJEoX9";
export const IHN_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

// ────────────────────────────────────────────────────────────────────────────
// Helius — Parsed Transactions (`/v0/addresses/{address}/transactions`)
// ────────────────────────────────────────────────────────────────────────────

export type HeliusTx = {
  signature: string;
  timestamp: number; // unix seconds
  type: "TRANSFER" | "SWAP" | "NFT_SALE" | "UNKNOWN";
  source: string;
  description: string;
  fee: number; // lamports
  feePayer: string;
  nativeTransfers: { fromUserAccount: string; toUserAccount: string; amount: number }[];
  tokenTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    mint: string;
    tokenAmount: number;
    symbol: string;
  }[];
};

const SAMPLE_SENDERS = [
  "9aB3kqW2pRtY7uJxF4hN1mQ8vC6sL5dE0fG2hK9jT4nP",
  "3xKp2J9LmN8vR1qW7yT6sH4dB5gC0fE2nM1oP9rS8aV3",
  "5yU8nM2pL9wQ7vT4kH3jR1bC6dF0gE5sX8aY9oP2nM1q",
  "8tR3yU2nM9pL7wQ4vK6hJ1bC5dF0gE3sX7aY8oP4nM2q",
  "2pL9wQ7vT4kH8nM3yR1bC6dF0gE5sX2aY8oP9rJ4uM7t",
];

const SAMPLE_DESCS = [
  "Donación 50 USDC → Treasury",
  "Donación 120 USDC → Treasury",
  "Swap 2.4 SOL → 540 USDC",
  "Reparto a beneficiarios: 8 wallets",
  "Mint 1,000 IHN → Treasury",
  "Donación anónima 25 USDC → Treasury",
];

export function mockHeliusTransactions(limit = 8): HeliusTx[] {
  const now = Math.floor(Date.now() / 1000);
  return Array.from({ length: limit }).map((_, i) => {
    const isToken = i % 2 === 0;
    return {
      signature: `${(i + 1).toString().padStart(4, "0")}xQk9pL2nM5vR8yT3wHb${i}fA7sD1cE4gJ6kN0qP9rU2`,
      timestamp: now - i * 47 - 12,
      type: isToken ? "TRANSFER" : "SWAP",
      source: "HELIUS_MOCK",
      description: SAMPLE_DESCS[i % SAMPLE_DESCS.length],
      fee: 5000,
      feePayer: SAMPLE_SENDERS[i % SAMPLE_SENDERS.length],
      nativeTransfers: isToken
        ? []
        : [
            {
              fromUserAccount: SAMPLE_SENDERS[i % SAMPLE_SENDERS.length],
              toUserAccount: TREASURY_WALLET,
              amount: 1_200_000_000 + i * 80_000_000,
            },
          ],
      tokenTransfers: isToken
        ? [
            {
              fromUserAccount: SAMPLE_SENDERS[i % SAMPLE_SENDERS.length],
              toUserAccount: TREASURY_WALLET,
              mint: USDC_MINT,
              tokenAmount: [25, 50, 120, 240, 75][i % 5],
              symbol: "USDC",
            },
          ]
        : [],
    };
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Helius — Balances (`/v0/addresses/{address}/balances`)
// ────────────────────────────────────────────────────────────────────────────

export type HeliusBalance = {
  nativeBalance: number; // lamports
  tokens: { mint: string; symbol: string; amount: number; decimals: number; usd: number }[];
};

export function mockHeliusBalance(): HeliusBalance {
  return {
    nativeBalance: 184_320_000_000, // 184.32 SOL
    tokens: [
      { mint: USDC_MINT, symbol: "USDC", amount: 48_290, decimals: 6, usd: 48_290 },
      { mint: IHN_MINT, symbol: "IHN", amount: 12_400_000, decimals: 9, usd: 248_000 },
    ],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Helius — Token Holders (`/v0/token-metadata` + RPC `getTokenLargestAccounts`)
// ────────────────────────────────────────────────────────────────────────────

export type TokenHolder = { rank: number; address: string; amount: number; percentage: number };

export function mockTokenHolders(): { total: number; top: TokenHolder[] } {
  const top: TokenHolder[] = [
    { rank: 1, address: TREASURY_WALLET, amount: 12_400_000, percentage: 24.8 },
    { rank: 2, address: "Liq…Pool1", amount: 6_200_000, percentage: 12.4 },
    { rank: 3, address: "8aB3…kqW2", amount: 2_800_000, percentage: 5.6 },
    { rank: 4, address: "3xKp…J9Lm", amount: 1_950_000, percentage: 3.9 },
    { rank: 5, address: "5yU8…nM2p", amount: 1_120_000, percentage: 2.24 },
  ];
  return { total: 4_287, top };
}

// ────────────────────────────────────────────────────────────────────────────
// Helius / Solana RPC — Network stats
// ────────────────────────────────────────────────────────────────────────────

export type NetworkStats = { tps: number; slot: number; epoch: number; blockHeight: number };

export function mockNetworkStats(): NetworkStats {
  return { tps: 2840, slot: 312_847_213, epoch: 724, blockHeight: 291_044_876 };
}

// ────────────────────────────────────────────────────────────────────────────
// CoinGecko — `/simple/price` & `/coins/{id}/market_chart`
// ────────────────────────────────────────────────────────────────────────────

export type CoinPrice = {
  id: string;
  symbol: string;
  name: string;
  usd: number;
  usd_24h_change: number;
  usd_market_cap: number;
  usd_24h_vol: number;
};

export function mockCoinPrices(): Record<string, CoinPrice> {
  return {
    solana: {
      id: "solana",
      symbol: "SOL",
      name: "Solana",
      usd: 184.27,
      usd_24h_change: 3.42,
      usd_market_cap: 87_420_000_000,
      usd_24h_vol: 2_140_000_000,
    },
    impacthope: {
      id: "impacthope",
      symbol: "IHN",
      name: "ImpactHope",
      usd: 0.02,
      usd_24h_change: 12.8,
      usd_market_cap: 1_000_000,
      usd_24h_vol: 84_200,
    },
    "usd-coin": {
      id: "usd-coin",
      symbol: "USDC",
      name: "USD Coin",
      usd: 1.0,
      usd_24h_change: 0.01,
      usd_market_cap: 34_200_000_000,
      usd_24h_vol: 5_120_000_000,
    },
    tether: {
      id: "tether",
      symbol: "USDT",
      name: "Tether",
      usd: 1.0,
      usd_24h_change: -0.02,
      usd_market_cap: 119_400_000_000,
      usd_24h_vol: 42_800_000_000,
    },
  };
}

// CoinGecko `/coins/{id}/market_chart` → { prices: [[ts, price], ...] }
export function mockSparkline(base = 180, points = 32, volatility = 0.04): number[] {
  // Deterministic pseudo-random (no Math.random) for SSR-safe rendering.
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < points; i++) {
    const noise = Math.sin(i * 0.7) * volatility + Math.cos(i * 1.3) * (volatility / 2);
    v = base * (1 + noise + (i / points) * 0.02);
    out.push(Number(v.toFixed(2)));
  }
  return out;
}

// Small helpers
export const fmtSol = (lamports: number) => (lamports / 1e9).toFixed(2);
export const shortAddr = (a: string) => `${a.slice(0, 4)}…${a.slice(-4)}`;
export const fmtUsd = (n: number) =>
  n >= 1_000_000_000
    ? `$${(n / 1e9).toFixed(2)}B`
    : n >= 1_000_000
      ? `$${(n / 1e6).toFixed(2)}M`
      : n >= 1_000
        ? `$${(n / 1e3).toFixed(1)}K`
        : `$${n.toFixed(2)}`;
export const timeAgo = (ts: number) => {
  const s = Math.max(1, Math.floor(Date.now() / 1000 - ts));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
};
