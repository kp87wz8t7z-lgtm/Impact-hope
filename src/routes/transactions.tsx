import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ArrowUpRight, RefreshCw } from "lucide-react";
import { recentTransactions, formatTimeAgo, formatUSD, type Transaction } from "@/lib/mock-data";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
  head: () => ({
    meta: [
      { title: "Transacciones - ImpactHope Network" },
      {
        name: "description",
        content: "Trazabilidad de aportes y actividad del ecosistema ImpactHope Network.",
      },
    ],
  }),
});

const typeLabel: Record<Transaction["type"], string> = {
  DONATION: "Donación",
  TRANSFER: "Transferencia",
  SWAP: "Swap",
  STAKE: "Staking",
};

const typeBadge: Record<Transaction["type"], string> = {
  DONATION: "bg-emerald-500/15 text-emerald-400",
  TRANSFER: "bg-blue-500/15 text-blue-400",
  SWAP: "bg-purple-500/15 text-purple-400",
  STAKE: "bg-amber-500/15 text-amber-400",
};

function TxRow({ tx }: { tx: Transaction }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-white/5 last:border-0">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs rounded-full px-2 py-0.5 font-medium ${typeBadge[tx.type]}`}
            >
              {typeLabel[tx.type]}
            </span>
            {tx.impactTag && (
              <span className="text-xs text-white/40">{tx.impactTag}</span>
            )}
          </div>
          <p className="text-xs text-white/30 mt-1 font-mono">
            {tx.from} → {tx.to}
          </p>
          <p className="text-xs text-white/20 font-mono mt-0.5">{tx.signature}</p>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0.5 ml-7 sm:ml-0">
        <span className="text-sm font-semibold text-white font-[Orbitron]">
          {tx.amount.toLocaleString()} {tx.token}
        </span>
        <span className="text-xs text-white/30">{formatTimeAgo(tx.timestamp)}</span>
      </div>
    </div>
  );
}

function TransactionsPage() {
  const total = recentTransactions
    .filter((t) => t.type === "DONATION")
    .reduce((acc, t) => acc + (t.token === "USDC" ? t.amount : 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-1 font-[Orbitron]">
            Trazabilidad
          </p>
          <h1 className="text-3xl font-bold font-[Orbitron] text-white">
            Transacciones
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            Actividad del ecosistema · Red Solana
          </p>
        </div>

        {/* Preview notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-200/80">
            Datos de vista previa. Las transacciones reales se publicarán cuando los contratos e integraciones estén confirmados en mainnet.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Donaciones USDC</p>
            <p className="text-xl font-bold text-white font-[Orbitron]">{formatUSD(total)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Transacciones</p>
            <p className="text-xl font-bold text-white font-[Orbitron]">{recentTransactions.length}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Estado red</p>
            <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Solana activa
            </p>
          </div>
        </div>

        {/* Transaction list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
              Actividad reciente
            </h2>
            <button className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors">
              <RefreshCw className="h-3 w-3" />
              Actualizar
            </button>
          </div>

          <div>
            {recentTransactions.map((tx) => (
              <TxRow key={tx.signature} tx={tx} />
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center">
            <a
              href="https://explorer.solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-amber-400/60 hover:text-amber-400 transition-colors"
            >
              Ver en Solana Explorer
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <p className="text-xs text-white/30 text-center">
          Consultas de trazabilidad:{" "}
          <a
            href="mailto:contact@impacthopenetwork.org"
            className="text-amber-400/70 hover:text-amber-400 transition-colors"
          >
            contact@impacthopenetwork.org
          </a>
        </p>
      </div>
    </div>
  );
}
