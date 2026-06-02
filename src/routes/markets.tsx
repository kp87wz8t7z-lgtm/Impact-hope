import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { tokenStats, formatUSD } from "@/lib/mock-data";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
  head: () => ({
    meta: [
      { title: "Mercados - ImpactHope Network" },
      {
        name: "description",
        content:
          "Precio, volumen y estadísticas del token IHN en mercados digitales.",
      },
    ],
  }),
});

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/50 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-semibold text-white font-[Orbitron]">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-0.5">{sub}</p>}
    </div>
  );
}

function MarketsPage() {
  const up = tokenStats.change24h >= 0;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-1 font-[Orbitron]">
            Mercados
          </p>
          <h1 className="text-3xl font-bold font-[Orbitron] text-white">
            Token IHN
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            ImpactHope Network · Solana
          </p>
        </div>

        {/* Preview notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-200/80">
            Datos de vista previa. El token IHN aún no tiene mercados activos. Los valores mostrados son simulados para illustrar el formato futuro.
          </p>
        </div>

        {/* Price hero */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end gap-4 mb-6">
            <span className="text-5xl font-bold font-[Orbitron] text-white">
              ${tokenStats.price.toFixed(4)}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-semibold mb-1 ${
                up ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {up ? "+" : ""}
              {tokenStats.change24h.toFixed(2)}% (24h)
            </span>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={tokenStats.history}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v.toFixed(3)}`}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                }}
                formatter={(v: number) => [`$${v.toFixed(4)}`, "Precio"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#priceGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Market Cap" value={formatUSD(tokenStats.marketCap)} />
          <StatCard label="Volumen 24h" value={formatUSD(tokenStats.volume24h)} />
          <StatCard
            label="Circulante"
            value={`${(tokenStats.circulatingSupply / 1_000_000).toFixed(0)}M`}
            sub="IHN"
          />
          <StatCard
            label="Supply total"
            value={`${(tokenStats.totalSupply / 1_000_000).toFixed(0)}M`}
            sub="IHN"
          />
        </div>

        {/* Markets table placeholder */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
            Exchanges previstos
          </h2>
          <div className="space-y-3">
            {["Raydium (DEX)", "Jupiter Aggregator", "CEX por confirmar"].map(
              (name) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-white/70">{name}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-white/10 text-white/40">
                    Próximamente
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <p className="text-xs text-white/30 text-center">
          Para listados e integraciones:{" "}
          <a
            href="mailto:partners@impacthopenetwork.org"
            className="text-amber-400/70 hover:text-amber-400 transition-colors"
          >
            partners@impacthopenetwork.org
          </a>
        </p>
      </div>
    </div>
  );
}
