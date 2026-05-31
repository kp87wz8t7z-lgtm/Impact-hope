import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { mockCoinPrices, mockNetworkStats } from "@/lib/mock/chain";

// Slim, always-visible market ticker. Mock-driven; swap mockCoinPrices()
// for a CoinGecko fetch later.
export function PriceTicker() {
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState(() => mockCoinPrices());
  const [stats, setStats] = useState(() => mockNetworkStats());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const k of Object.keys(next)) {
          const drift = (Math.random() - 0.5) * 0.004;
          next[k] = {
            ...next[k],
            usd: Math.max(0.0001, next[k].usd * (1 + drift)),
            usd_24h_change: next[k].usd_24h_change + drift * 100,
          };
        }
        return next;
      });
      setStats((s) => ({
        ...s,
        tps: Math.max(1200, s.tps + Math.round((Math.random() - 0.5) * 80)),
        slot: s.slot + Math.round(2 + Math.random() * 3),
      }));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "SOL", price: prices.solana.usd, change: prices.solana.usd_24h_change },
    { label: "IHN", price: prices.impacthope.usd, change: prices.impacthope.usd_24h_change },
    { label: "USDC", price: prices["usd-coin"].usd, change: prices["usd-coin"].usd_24h_change },
  ];

  if (!mounted) {
    return (
      <div
        className="fixed inset-x-0 top-[72px] z-40 h-7 border-b border-white/10 bg-[#050914]/82 backdrop-blur-xl"
        suppressHydrationWarning
      />
    );
  }

  return (
    <div className="fixed inset-x-0 top-[72px] z-40 border-b border-white/10 bg-[#050914]/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto px-5 py-1.5 text-[11px] md:px-6 md:text-xs">
        <div className="flex items-center gap-4 md:gap-6">
          {items.map((i) => {
            const up = i.change >= 0;
            return (
              <div key={i.label} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-semibold text-white/90">{i.label}</span>
                <span className="tabular-nums text-white/72">
                  ${i.price < 1 ? i.price.toFixed(4) : i.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center gap-0.5 tabular-nums ${
                    up ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {up ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {up ? "+" : ""}
                  {i.change.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 text-white/52 md:flex">
          <span className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-emerald-400" />
            <span className="tabular-nums">{stats.tps.toLocaleString()} TPS</span>
          </span>
          <span className="text-white/30">·</span>
          <span className="tabular-nums">slot {stats.slot.toLocaleString()}</span>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Solana mainnet
          </span>
        </div>
      </div>
    </div>
  );
}

