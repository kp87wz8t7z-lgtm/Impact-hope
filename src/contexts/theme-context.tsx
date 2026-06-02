import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AccentKey = "amber" | "emerald" | "violet" | "cyan";

type AccentConfig = {
  key: AccentKey;
  label: string;
  primary: string; // oklch components without "oklch()"
  primaryFg: string;
  swatch: string; // hex for swatch preview
  glow: string; // rgba for shadow/glow effects
  grad: { from: string; via: string; to: string }; // hex stops for amber-style gradient buttons
};

export const ACCENTS: Record<AccentKey, AccentConfig> = {
  amber: {
    key: "amber",
    label: "Ámbar",
    primary: "0.82 0.17 75",
    primaryFg: "0.18 0.04 265",
    swatch: "#f59e0b",
    glow: "rgba(245,158,11,0.65)",
    grad: { from: "#fde68a", via: "#fbbf24", to: "#f97316" },
  },
  emerald: {
    key: "emerald",
    label: "Esmeralda",
    primary: "0.78 0.18 162",
    primaryFg: "0.15 0.04 200",
    swatch: "#10b981",
    glow: "rgba(16,185,129,0.6)",
    grad: { from: "#a7f3d0", via: "#34d399", to: "#059669" },
  },
  violet: {
    key: "violet",
    label: "Violeta",
    primary: "0.7 0.22 295",
    primaryFg: "0.99 0.01 90",
    swatch: "#8b5cf6",
    glow: "rgba(139,92,246,0.6)",
    grad: { from: "#ddd6fe", via: "#a78bfa", to: "#7c3aed" },
  },
  cyan: {
    key: "cyan",
    label: "Cian",
    primary: "0.78 0.15 215",
    primaryFg: "0.15 0.04 230",
    swatch: "#22d3ee",
    glow: "rgba(34,211,238,0.6)",
    grad: { from: "#a5f3fc", via: "#22d3ee", to: "#0891b2" },
  },
};

type ThemeCtx = {
  accent: AccentKey;
  setAccent: (a: AccentKey) => void;
  config: AccentConfig;
};

const Ctx = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "ihn-accent";

function applyAccent(key: AccentKey) {
  const c = ACCENTS[key];
  const root = document.documentElement;
  root.style.setProperty("--primary", `oklch(${c.primary})`);
  root.style.setProperty("--primary-foreground", `oklch(${c.primaryFg})`);
  root.style.setProperty("--accent-glow", c.glow);
  root.style.setProperty("--accent-grad-from", c.grad.from);
  root.style.setProperty("--accent-grad-via", c.grad.via);
  root.style.setProperty("--accent-grad-to", c.grad.to);
  root.dataset.accent = key;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentKey>("amber");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as AccentKey | null;
    const init = stored && stored in ACCENTS ? stored : "amber";
    setAccentState(init);
    applyAccent(init);
  }, []);

  const setAccent = (a: AccentKey) => {
    setAccentState(a);
    applyAccent(a);
    try {
      localStorage.setItem(STORAGE_KEY, a);
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ accent, setAccent, config: ACCENTS[accent] }}>{children}</Ctx.Provider>;
}

export function useAccent() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAccent must be used inside <ThemeProvider>");
  return v;
}
