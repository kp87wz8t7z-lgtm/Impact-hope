import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Coins, Users, Zap, Wallet } from "lucide-react";
import {
  fmtSol,
  fmtUsd,
  mockHeliusBalance,
  mockHeliusTransactions,
  mockNetworkStats,
  mockSparkline,
  mockTokenHolders,
  shortAddr,
  timeAgo,
  TREASURY_WALLET,
  type HeliusTx,
} from "@/lib/mock/chain";

function Sparkline({ data, color = "#fbbf24" }: { data: number[]; color?: string }) {
  const w = 120;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="block" aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TxRow({ tx }: { tx: HeliusTx }) {
  const isToken = tx.tokenTransfers.length > 0;
  const amount = isToken
    ? `${tx.tokenTransfers[0].tokenAmount} ${tx.tokenTransfers[0].symbol}`
    : `${fmtSol(tx.nativeTransfers[0]?.amount ?? 0)} SOL`;
  const incoming =
    (tx.tokenTransfers[0]?.toUserAccount ?? tx.nativeTransfers[0]?.toUserAccount) ===
    TREASURY_WALLET;
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            incoming ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {incoming ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white/90">{tx.description}</div>
          <div className="font-mono text-[11px] text-white/52">
            {shortAddr(tx.signature)} · {shortAddr(tx.feePayer)}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm font-semibold tabular-nums text-white/95">{amount}</div>
        <div className="text-[11px] text-white/52">hace {timeAgo(tx.timestamp)}</div>
      </div>
    </div>
  );
}

export function LiveOnChain() {
  const [balance] = useState(() => mockHeliusBalance());
  const [holders] = useState(() => mockTokenHolders());
  const [stats, setStats] = useState(() => mockNetworkStats());
  const [txs, setTxs] = useState<HeliusTx[]>(() => mockHeliusTransactions(6));
  const spark = mockSparkline(0.018, 32, 0.08);

  // Simulate live updates (tps + new tx every ~8s)
  useEffect(() => {
    const tick = setInterval(() => {
      setStats((s) => ({
        ...s,
        tps: Math.max(1200, s.tps + Math.round((Math.random() - 0.5) * 100)),
        slot: s.slot + 3,
      }));
    }, 2500);
    const newTx = setInterval(() => {
      setTxs((prev) => [mockHeliusTransactions(1)[0], ...prev].slice(0, 6));
    }, 8000);
    return () => {
      clearInterval(tick);
      clearInterval(newTx);
    };
  }, []);

  const totalUsd =
    (balance.nativeBalance / 1e9) * 184.27 + balance.tokens.reduce((a, t) => a + t.usd, 0);

  return (
    <section id="onchain" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-10 text-center">
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live on Solana
          </span>
          <h2 className="display-lg mt-4">Transparencia on-chain en tiempo real</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/72">
            Cada movimiento de la treasury es público y verificable. Datos en vivo desde la red
            Solana vía Helius + CoinGecko.
          </p>
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-white/62">
              <Wallet className="h-3.5 w-3.5" /> Treasury
            </div>
            <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-white">
              {fmtUsd(totalUsd)}
            </div>
            <div className="mt-1 text-[11px] text-white/52">
              {fmtSol(balance.nativeBalance)} SOL + tokens
            </div>
          </div>
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-white/62">
              <Coins className="h-3.5 w-3.5" /> Precio IHN
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <div className="font-mono text-2xl font-bold tabular-nums text-white">$0.0200</div>
              <Sparkline data={spark} color="#34d399" />
            </div>
            <div className="mt-1 text-[11px] text-emerald-400">+12.8% 24h</div>
          </div>
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-white/62">
              <Users className="h-3.5 w-3.5" /> Holders
            </div>
            <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-white">
              {holders.total.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-white/52">+38 esta semana</div>
          </div>
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-white/62">
              <Zap className="h-3.5 w-3.5" /> Red Solana
            </div>
            <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-white">
              {stats.tps.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-white/52">TPS · epoch {stats.epoch}</div>
          </div>
        </div>

        {/* Tx feed + holders */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="card-glass overflow-hidden rounded-2xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-white/95">
                  Transacciones recientes
                </div>
                <div className="font-mono text-[11px] text-white/52">
                  {shortAddr(TREASURY_WALLET)} · vía Helius API
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                EN VIVO
              </span>
            </div>
            <div>
              {txs.map((tx) => (
                <TxRow key={tx.signature} tx={tx} />
              ))}
            </div>
          </div>

          <div className="card-glass overflow-hidden rounded-2xl">
            <div className="border-b border-white/10 px-4 py-3">
              <div className="text-sm font-semibold text-white/95">Top holders IHN</div>
              <div className="text-[11px] text-white/52">
                {holders.total.toLocaleString()} wallets totales
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {holders.top.map((h) => (
                <div key={h.rank} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] text-white/72">
                      {h.rank}
                    </span>
                    <span className="truncate font-mono text-xs text-white/80">
                      {shortAddr(h.address)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs tabular-nums text-white/90">
                      {(h.amount / 1e6).toFixed(2)}M
                    </div>
                    <div className="text-[10px] text-white/52">{h.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-white/40">
          Datos mock — preparado para Helius RPC + CoinGecko v3. Conectar API keys para activar
          datos reales.
        </p>
      </div>
    </section>
  );
}
