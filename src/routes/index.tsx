import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { animate, createScope, stagger, type Scope } from "animejs";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  Coins,
  CreditCard,
  Droplets,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  Landmark,
  Leaf,
  Link2,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  Menu,
  Network,
  PieChart,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import networkHero from "@/assets/impact-network-hero-vertical.webp";
import impact1 from "@/assets/impact-1.jpg";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";
import coinImg from "@/assets/coin.png";
import roadmapBg from "@/assets/roadmap-bg.webp";
import handsImg from "@/assets/hands.webp";
import worldMapImg from "@/assets/world-map.webp";
import { PriceTicker } from "@/components/landing/PriceTicker";
import { LiveOnChain } from "@/components/landing/LiveOnChain";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ImpactHope Network - Inversión digital con impacto social real" },
      {
        name: "description",
        content:
          "ImpactHope Network conecta blockchain, inversión y causas benéficas. Cada transacción genera impacto social real, con transparencia total.",
      },
    ],
  }),
});

const nav = [
  { label: "Misión", href: "#mision" },
  { label: "Cómo funciona", href: "#funciona" },
  { label: "Token", href: "#token" },
  { label: "Live", href: "#onchain" },
  { label: "Impacto", href: "#impacto" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Donar", href: "#donar" },
];

const chartRanges = ["1D", "7D", "1M", "3M", "1A", "Todo"] as const;

const paymentMethods = [
  { icon: CreditCard, label: "Tarjeta de crédito / débito", detail: "Stripe" },
  { icon: CircleDollarSign, label: "Criptomonedas", detail: "BTC · ETH · USDC" },
  { icon: Wifi, label: "Zelle", detail: "Transferencia directa" },
  { icon: Landmark, label: "Cuenta de banco", detail: "ACH" },
] as const;

const orbitNodes = [
  {
    title: "Educación",
    value: "0",
    caption: "vidas transformadas",
    icon: GraduationCap,
    className: "left-[6%] top-[16%]",
    delay: "0s",
  },
  {
    title: "On-chain",
    value: "0%",
    caption: "transparencia",
    icon: LockKeyhole,
    className: "right-[4%] top-[18%]",
    delay: ".4s",
  },
  {
    title: "Alimentos",
    value: "0",
    caption: "países conectados",
    icon: Utensils,
    className: "left-[1%] bottom-[24%]",
    delay: ".8s",
  },
  {
    title: "Comunidad",
    value: "0",
    caption: "personas unidas",
    icon: Users,
    className: "right-[3%] bottom-[23%]",
    delay: "1.2s",
  },
  {
    title: "Impacto",
    value: "$0",
    caption: "fondos donados",
    icon: HandHeart,
    className: "left-[36%] bottom-[12%]",
    delay: "1.6s",
  },
];

const impactMetrics = [
  { icon: HandHeart, value: "0", label: "ONG apoyadas", color: "text-amber-300" },
  { icon: Users, value: "0", label: "Personas beneficiadas", color: "text-cyan-300" },
  { icon: Globe, value: "0", label: "Países alcanzados", color: "text-orange-300" },
];

const transactions = [
  { id: "0x00...000", org: "Pendiente", amount: "$0 USDC", chain: "Ethereum" },
  { id: "0x00...001", org: "Pendiente", amount: "$0 USDC", chain: "Polygon" },
  { id: "0x00...002", org: "Pendiente", amount: "$0 USDC", chain: "Ethereum" },
  { id: "0x00...003", org: "Pendiente", amount: "$0 USDC", chain: "Polygon" },
];

const tokenomics = [
  {
    label: "Liquidez",
    desc: "Estabilidad y confianza para el crecimiento",
    value: "30%",
    color: "bg-cyan-400",
  },
  {
    label: "Recompensas e incentivos",
    desc: "Para quienes construyen y apoyan el ecosistema",
    value: "20%",
    color: "bg-amber-400",
  },
  {
    label: "Reserva de impacto",
    desc: "Financia proyectos sociales y ambientales",
    value: "15%",
    color: "bg-emerald-400",
  },
  {
    label: "Tesorería",
    desc: "Desarrollo y expansión sostenible",
    value: "15%",
    color: "bg-violet-400",
  },
  { label: "Premarket", desc: "Soporte inicial del proyecto", value: "10%", color: "bg-rose-400" },
  { label: "Operaciones", desc: "Team & legal", value: "10%", color: "bg-sky-300" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donation, setDonation] = useState(50);
  const [tip, setTip] = useState(10);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [displayDonation, setDisplayDonation] = useState(50);
  const [selectedRange, setSelectedRange] = useState<(typeof chartRanges)[number]>("1D");
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].label);

  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    scopeRef.current = createScope({ root: rootRef.current }).add(() => {
      animate(".hero-word", {
        opacity: [0, 1],
        translateY: [34, 0],
        filter: ["blur(12px)", "blur(0px)"],
        duration: 900,
        delay: stagger(70, { start: 180 }),
        ease: "out(3)",
      });

      animate(".hero-reveal", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        delay: stagger(110, { start: 650 }),
        ease: "out(2)",
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [34, 0],
              duration: 780,
              ease: "out(3)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    rootRef.current.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
              const target = Number(el.dataset.count);
              const obj = { n: 0 };
              animate(obj, {
                n: target,
                duration: 1600,
                ease: "out(3)",
                onUpdate: () => {
                  el.textContent = Math.round(obj.n).toLocaleString();
                },
              });
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      scopeRef.current?.revert();
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const obj = { n: displayDonation };
    animate(obj, {
      n: donation,
      duration: 500,
      ease: "out(3)",
      onUpdate: () => setDisplayDonation(Math.round(obj.n)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donation]);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    let frame = 0;
    const updateBackgroundPosition = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      background.style.backgroundPosition = `center ${Math.min(100, Math.max(0, progress * 100))}%`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateBackgroundPosition);
    };

    updateBackgroundPosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="isolate relative min-h-screen overflow-x-hidden bg-[#050914] text-foreground"
    >
      <div className="fixed inset-0 -z-20 bg-[#050914]" />
      <div
        ref={backgroundRef}
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-top bg-no-repeat brightness-[1.08] contrast-[1.04] saturate-[1.06]"
        style={{ backgroundImage: `url(${networkHero})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,9,20,.06)_0%,rgba(5,9,20,.02)_18%,rgba(5,9,20,.18)_46%,rgba(5,9,20,.38)_100%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 bg-[#050914]/82 shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src={coinImg}
              alt=""
              className="h-9 w-9 drop-shadow-[0_0_18px_rgba(250,200,80,0.65)]"
              width={36}
              height={36}
            />
            <span className="font-body text-lg font-bold tracking-tight">
              ImpactHope<span className="text-primary"> Network</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-white/72 transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-gray-950 shadow-[0_10px_36px_-8px_rgba(245,158,11,0.6)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_14px_44px_-8px_rgba(245,158,11,0.8)]"
            >
              <a href="#donar">
                <Heart className="mr-1 h-4 w-4" /> Donar
              </a>
            </Button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[.05] text-white/80 transition-colors hover:bg-white/[.10] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#050914]/96 px-5 pb-6 pt-3 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-white/80 transition-colors hover:bg-white/[.06] hover:text-primary"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <Button
              asChild
              className="mt-4 w-full bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 font-bold text-gray-950 shadow-[0_10px_36px_-8px_rgba(245,158,11,0.6)] transition-all duration-200 hover:brightness-110"
            >
              <a href="#donar" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="mr-1 h-4 w-4" /> Donar ahora
              </a>
            </Button>
          </div>
        )}
      </header>
      <PriceTicker />

      <main id="main">

      <section
        id="top"
        className="relative min-h-[calc(100svh-72px)] overflow-hidden pt-[72px]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-[linear-gradient(to_right,rgba(5,9,20,.68)_0%,rgba(5,9,20,.52)_38%,rgba(5,9,20,.12)_62%,transparent_100%)]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center px-5 pb-14 pt-14 md:px-6 md:py-16 lg:py-10">
          <div className="relative z-10 max-w-[680px]">
            <div className="pointer-events-none absolute -right-16 top-16 -z-10 h-44 w-44 opacity-45 sm:hidden">
              <div className="absolute inset-0 rounded-full bg-amber-300/35 blur-3xl" />
              <img
                src={coinImg}
                alt=""
                className="relative h-full w-full drop-shadow-[0_0_55px_rgba(251,191,36,.7)]"
                width={176}
                height={176}
              />
            </div>
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-[#07101d]/66 px-4 py-1.5 text-xs font-semibold text-amber-100 opacity-0 shadow-[0_0_35px_rgba(245,158,11,.22)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" /> Partner-ready impact infrastructure
            </div>
            <h1 className="mt-6 max-w-[620px] text-5xl font-black leading-[.94] tracking-normal text-white sm:text-6xl lg:text-[4.9rem]">
              {"Ayuda con el".split(" ").map((w, i) => (
                <span key={`a${i}`} className="hero-word mr-[0.22em] inline-block opacity-0">
                  {w}
                </span>
              ))}
              <span className="hero-word mr-[0.22em] inline-block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent opacity-0">
                corazón.
              </span>
              <br />
              {"Transforma vidas reales.".split(" ").map((w, i) => (
                <span key={`b${i}`} className="hero-word mr-[0.22em] inline-block opacity-0">
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero-reveal mt-6 max-w-xl rounded-xl bg-black/64 px-4 py-3 text-lg leading-relaxed text-white/92 opacity-0 backdrop-blur-sm">
              ImpactHope Network une blockchain, comunidad y causas benéficas. Cada transacción
              genera una contribución verificable para niños, familias y organizaciones que más lo
              necesitan.
            </p>
            <div className="hero-reveal mt-8 flex flex-wrap gap-3 opacity-0">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 !text-gray-950 font-bold shadow-[0_18px_50px_-10px_rgba(245,158,11,0.75)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_22px_60px_-10px_rgba(245,158,11,0.9)]"
              >
                <a href="#donar">
                  Donar ahora <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-violet-500/35 bg-violet-600/10 text-violet-100 backdrop-blur transition-all duration-200 hover:border-violet-400/55 hover:bg-violet-600/22 hover:text-white"
              >
                <a href="#funciona">Cómo funciona</a>
              </Button>
            </div>
            <div
              ref={statsRef}
              className="hero-reveal mt-10 grid max-w-md grid-cols-3 gap-4 opacity-0"
            >
              {[
                { k: "0", prefix: "$", suffix: "", v: "Inversión inicial" },
                { k: null, raw: "On-chain", prefix: "", suffix: "", v: "Transparencia" },
                { k: "0", prefix: "", suffix: "", v: "Vidas posibles" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="border-l border-white/14 pl-4 first:border-l-0 first:pl-0"
                >
                  <div className="text-3xl font-black text-primary">
                    {s.k !== null ? (
                      <>
                        {s.prefix}
                        <span data-count={s.k}>0</span>
                        {s.suffix}
                      </>
                    ) : (
                      s.raw
                    )}
                  </div>
                  <div className="mt-1 text-xs text-white/55">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="hero-reveal mt-8 flex max-w-xl flex-wrap gap-3 opacity-0">
              {[
                { icon: Shield, label: "On-chain transparency" },
                { icon: Handshake, label: "Partner ecosystem" },
                { icon: GraduationCap, label: "Measurable education impact" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="signal-chip inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-[#06111f]/68 px-3 py-2 text-xs font-semibold text-cyan-50 shadow-[0_0_26px_rgba(34,211,238,.12)] backdrop-blur-xl"
                >
                  <item.icon className="h-4 w-4 text-amber-200" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-reveal pointer-events-none relative mx-auto hidden h-[560px] w-full max-w-[690px] opacity-0 max-lg:-mt-4 max-sm:h-[360px]">
            <div className="absolute inset-[14px_18px_14px_18px] rounded-[2.4rem] border border-white/10 bg-[#07101d]/24 shadow-[0_18px_60px_rgba(0,0,0,.22)] backdrop-blur-[1px] max-sm:inset-[10px] max-sm:rounded-[2rem]" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_52%_48%,rgba(251,191,36,.22),transparent_48%),radial-gradient(circle_at_62%_42%,rgba(34,211,238,.18),transparent_58%)] blur-2xl" />
            <div className="coin-motion absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/18 shadow-[0_0_90px_rgba(34,211,238,.12)] max-sm:h-[330px] max-sm:w-[330px]" />
            <div className="coin-motion absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/15 max-sm:h-[250px] max-sm:w-[250px]" />

            <svg
              className="coin-motion absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 690 560"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="goldLine" x1="0" x2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity=".72" />
                  <stop offset="48%" stopColor="#facc15" stopOpacity=".95" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity=".36" />
                </linearGradient>
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {[
                "M338 270 C238 166 139 118 66 105",
                "M352 268 C446 154 553 114 640 125",
                "M333 286 C210 323 121 372 50 438",
                "M358 287 C466 346 548 390 646 430",
                "M346 296 C343 388 340 467 342 532",
              ].map((d) => (
                <path
                  key={d}
                  d={d}
                  className="network-link"
                  fill="none"
                  filter="url(#lineGlow)"
                  stroke="url(#goldLine)"
                  strokeDasharray="12 18"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              ))}
              {[
                [66, 105],
                [640, 125],
                [50, 438],
                [646, 430],
                [342, 532],
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  className="pulse-dot"
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#facc15"
                />
              ))}
            </svg>

            <div className="coin-motion coin-core absolute left-1/2 top-1/2 z-40 flex h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 items-center justify-center max-sm:h-[190px] max-sm:w-[190px]">
              <div className="absolute inset-0 rounded-full bg-amber-300/25 blur-3xl" />
              <div className="absolute inset-7 rounded-full border border-amber-200/30 shadow-[0_0_80px_rgba(251,191,36,.36)]" />
              <img
                src={coinImg}
                alt="Token ImpactHope Network"
                className="relative z-10 w-full drop-shadow-[0_34px_80px_rgba(251,146,60,.58)]"
                width={260}
                height={260}
              />
            </div>

            {orbitNodes.map((node) => (
              <div
                key={node.title}
                className={`network-node absolute z-30 hidden w-[178px] rounded-2xl border border-white/12 bg-[#08131f]/92 p-4 shadow-[0_20px_60px_rgba(0,0,0,.46),0_0_24px_rgba(34,211,238,.06)] backdrop-blur-2xl sm:block ${node.className}`}
                style={{ animationDelay: node.delay }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-orange-400 to-cyan-300 text-black shadow-[0_0_22px_rgba(34,211,238,.22)]">
                    <node.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-bold">{node.title}</div>
                </div>
                <div className="text-2xl font-black text-white">{node.value}</div>
                <div className="text-xs text-white/54">{node.caption}</div>
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/16 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-xl">
              <Network className="h-4 w-4" />
              Ecosistema de impacto conectado al token
            </div>
          </div>
        </div>
      </section>

      <section id="mision" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="reveal relative grid gap-8 overflow-hidden rounded-[2rem] border border-amber-300/18 p-7 shadow-[0_28px_90px_rgba(0,0,0,.36)] backdrop-blur-sm md:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-14">
            <img
              src={worldMapImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-[#07101d]/20" />
            <div className="relative z-10">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Nuestra Misión
              </span>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                Un puente entre la <span className="text-primary">economía digital</span> y el{" "}
                <span className="text-primary">impacto humano</span>.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72">
                Las donaciones tradicionales sufren de falta de transparencia. Los activos digitales
                carecen de propósito. ImpactHope Network une lo mejor de ambos mundos: tecnología
                blockchain con responsabilidad social verificable.
              </p>
            </div>
            <div className="relative z-10 grid content-center gap-3">
              {impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4"
                >
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  <div>
                    <div className="text-2xl font-black">{metric.value}</div>
                    <div className="text-sm text-white/58">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="funciona" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Cómo funciona
            </span>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Tres pasos. Impacto real.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Link2,
                t: "Adquiere el token",
                d: "Compra ImpactHope Network y forma parte de una comunidad global comprometida.",
              },
              {
                icon: TrendingUp,
                t: "Cada tx genera impacto",
                d: "Un porcentaje de las transacciones se destina automáticamente a causas benéficas.",
              },
              {
                icon: Heart,
                t: "Cambia vidas",
                d: "Recibe reportes verificables sobre las personas y proyectos que tu participación apoya.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                className="reveal group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#07101d]/76 p-8 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="absolute -right-3 top-2 text-7xl font-black text-amber-300/35">
                  0{i + 1}
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-black shadow-[0_0_35px_rgba(245,158,11,.35)]">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-white/68">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="token" className="relative py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          {/* Header + supply */}
          <div className="reveal mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Token
              </span>
              <h2 className="mt-3 max-w-xl text-4xl font-black leading-tight md:text-5xl">
                El movimiento del <span className="text-primary">Token IHN</span> en el mercado.
              </h2>
              <p className="mt-3 text-lg text-white/68">
                Transparente. Trazable. Con propósito.
                <br />
                Cada token impulsa un cambio real.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-white/12 bg-[#07101d]/80 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <img
                  src={coinImg}
                  className="h-12 w-12 drop-shadow-[0_0_18px_rgba(250,200,80,0.65)]"
                  alt=""
                  width={48}
                  height={48}
                />
                <div>
                  <div className="text-xs text-white/50">Supply inicial (Circulación inicial)</div>
                  <div className="text-2xl font-black text-white">
                    0 <span className="text-primary">IHN</span>
                  </div>
                  <div className="text-sm text-white/50">0 coins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="reveal mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: HandHeart, value: "0", label: "ONG apoyadas", bar: "#f59e0b" },
              { icon: Users, value: "0", label: "Personas beneficiadas", bar: "#22d3ee" },
              { icon: Globe, value: "0", label: "Países alcanzados", bar: "#fb923c" },
              { icon: Coins, value: "$IHN", label: "Token con propósito", bar: "#34d399" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl"
              >
                <s.icon className="h-8 w-8" style={{ color: s.bar }} />
                <div className="mt-3 text-3xl font-black text-white">{s.value}</div>
                <div className="mt-1 text-sm text-white/58">{s.label}</div>
                <div
                  className="mt-3 h-0.5 w-full rounded-full"
                  style={{ background: `linear-gradient(to right, ${s.bar}, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Price chart + Distribution */}
          <div className="reveal mb-6 grid gap-6 lg:grid-cols-2">
            {/* Price chart */}
            <div className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-sm text-white/50">Precio del token (IHN)</div>
                  <div className="mt-1 flex items-end gap-3">
                    <div className="text-4xl font-black text-white">$0.0000</div>
                    <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-emerald-400">
                      <TrendingUp className="h-4 w-4" /> 0.00% últimas 24h
                    </div>
                  </div>
                </div>
              </div>
              <svg
                viewBox="0 0 400 120"
                className="w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity=".28" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[24, 60, 96].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="white"
                    strokeOpacity=".06"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M0,97 C18,90 28,84 48,80 C68,76 73,87 90,82 C107,77 117,66 132,61 C147,56 157,70 172,63 C187,57 197,46 217,43 C237,40 247,54 262,49 C277,44 287,35 307,30 C327,25 337,18 360,14 C378,11 390,16 400,14 L400,120 L0,120 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0,97 C18,90 28,84 48,80 C68,76 73,87 90,82 C107,77 117,66 132,61 C147,56 157,70 172,63 C187,57 197,46 217,43 C237,40 247,54 262,49 C277,44 287,35 307,30 C327,25 337,18 360,14 C378,11 390,16 400,14"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="400" cy="14" r="4" fill="#f59e0b" />
                <circle cx="400" cy="14" r="8" fill="#f59e0b" fillOpacity=".25" />
                <text x="3" y="13" fill="white" fillOpacity=".38" fontSize="9">
                  $0.00
                </text>
                <text x="3" y="62" fill="white" fillOpacity=".38" fontSize="9">
                  $0.00
                </text>
                <text x="3" y="115" fill="white" fillOpacity=".38" fontSize="9">
                  $0.00
                </text>
              </svg>
              <div className="mt-3 flex gap-1.5">
                {chartRanges.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedRange(t)}
                    aria-pressed={selectedRange === t}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                      selectedRange === t
                        ? "bg-primary/20 text-primary"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/[.06] bg-white/[.025] p-3 sm:grid-cols-4">
                {[
                  { label: "Capitalización", value: "$0" },
                  { label: "Volumen 24h", value: "$0" },
                  { label: "Suministro total", value: "0 IHN" },
                  { label: "En circulación", value: "0 IHN" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[11px] text-white/45">{s.label}</div>
                    <div className="mt-0.5 text-sm font-bold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Token distribution */}
            <div
              id="token-transacciones"
              className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 text-sm text-white/50">Distribución real del token (0 IHN)</div>
              <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
                <div className="relative h-[160px] w-[160px] shrink-0 rounded-full bg-[conic-gradient(#22d3ee_0_30%,#f59e0b_30%_50%,#34d399_50%_65%,#8b5cf6_65%_80%,#fb7185_80%_90%,#7dd3fc_90%_100%)]">
                  <div className="absolute inset-[36px] flex flex-col items-center justify-center rounded-full bg-[#07101d] text-center">
                    <div className="text-lg font-black text-white leading-none">0</div>
                    <div className="mt-1 text-[10px] text-white/55 leading-tight">
                      Suministro
                      <br />
                      total
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {tokenomics.map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-[3px] h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
                      />
                      <div>
                        <span className="font-bold text-white">{item.value}</span>{" "}
                        <span className="text-white/72">{item.label}</span>
                        <p className="text-xs text-white/42">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/[.06] bg-white/[.025] p-3 text-xs text-white/55">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Cada transacción impulsa el cambio. El 10% de las operaciones se destina a impacto
                social real.
              </div>
            </div>
          </div>

          {/* Transactions + Exchanges */}
          <div className="reveal mb-6 grid gap-6 lg:grid-cols-2">
            {/* Live transactions */}
            <div className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Transacciones en tiempo real
                </span>
              </div>
              <div className="space-y-2">
                {[
                  {
                    addr: "0x00…0000",
                    type: "Compra",
                    typeColor: "bg-cyan-400/20 text-cyan-300",
                    amount: "0 IHN",
                    time: "Pendiente",
                  },
                  {
                    addr: "0x00…0001",
                    type: "Recompensa",
                    typeColor: "bg-violet-400/20 text-violet-300",
                    amount: "0 IHN",
                    time: "Pendiente",
                  },
                  {
                    addr: "0x00…0002",
                    type: "Donación",
                    typeColor: "bg-amber-400/20 text-amber-300",
                    amount: "0 IHN",
                    time: "Pendiente",
                  },
                  {
                    addr: "0x00…0003",
                    type: "Compra",
                    typeColor: "bg-cyan-400/20 text-cyan-300",
                    amount: "0 IHN",
                    time: "Pendiente",
                  },
                  {
                    addr: "0x00…0004",
                    type: "Recompensa",
                    typeColor: "bg-violet-400/20 text-violet-300",
                    amount: "0 IHN",
                    time: "Pendiente",
                  },
                ].map((tx) => (
                  <div
                    key={tx.addr + tx.time}
                    className="flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.03] px-3 py-2.5 text-xs"
                  >
                    <span className="font-mono text-white/50">{tx.addr}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tx.typeColor}`}
                    >
                      {tx.type}
                    </span>
                    <span className="ml-auto font-bold text-white">{tx.amount}</span>
                    <span className="shrink-0 text-white/38">{tx.time}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/transactions"
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Ver todas las transacciones <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Exchanges */}
            <div
              id="token-mercados"
              className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                Dónde puedes conseguir $IHN
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Uniswap", abbr: "UNI" },
                  { name: "PancakeSwap", abbr: "CAKE" },
                  { name: "MEXC", abbr: "MEXC" },
                  { name: "Gate.io", abbr: "GT" },
                  { name: "BitMart", abbr: "BMX" },
                  { name: "Próximamente...", abbr: "···" },
                ].map((ex) => (
                  <div
                    key={ex.name}
                    className="flex items-center gap-3 rounded-xl border border-white/[.07] bg-white/[.03] px-3 py-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-black text-primary">
                      {ex.abbr}
                    </span>
                    <span className="text-sm font-semibold text-white/80">{ex.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/markets"
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Ver todos los mercados <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Impact metrics strip */}
          <div className="reveal grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                icon: Droplets,
                label: "Agua potable",
                value: "0",
                unit: "litros entregados",
                color: "text-cyan-300",
              },
              {
                icon: GraduationCap,
                label: "Educación",
                value: "0",
                unit: "niños educados",
                color: "text-amber-300",
              },
              {
                icon: Leaf,
                label: "Medio ambiente",
                value: "0",
                unit: "árboles plantados",
                color: "text-emerald-300",
              },
              {
                icon: Users,
                label: "Comunidad",
                value: "0",
                unit: "familias ayudadas",
                color: "text-violet-300",
              },
              {
                icon: HandHeart,
                label: "Salud",
                value: "0",
                unit: "personas atendidas",
                color: "text-rose-300",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-4 text-center backdrop-blur-xl"
              >
                <m.icon className={`mx-auto h-8 w-8 ${m.color}`} />
                <div className="mt-2 text-[11px] font-semibold text-white/55">{m.label}</div>
                <div className="mt-1 text-2xl font-black text-white">{m.value}</div>
                <div className="mt-0.5 text-xs text-white/42">{m.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LiveOnChain />

      <section id="impacto" className="relative py-20">

        <div className="mx-auto px-4 sm:px-5 md:max-w-2xl lg:max-w-5xl lg:px-6">
          <div className="reveal overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#070c19]/20 shadow-[0_26px_78px_rgba(0,0,0,.44)]">
            <div className="relative min-h-[232px] p-7 lg:min-h-[280px] lg:p-10">
              <img
                src={handsImg}
                alt="Manos sosteniendo un corazón luminoso"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-center opacity-95 brightness-110 [mask-image:linear-gradient(90deg,transparent,black_15%)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#070c19_0%,#070c19_22%,rgba(7,12,25,.55)_48%,rgba(7,12,25,.1)_100%)]" />
              <div className="relative max-w-[70%] sm:max-w-[320px]">
                <div className="inline-block rounded-2xl bg-[#070c19]/55 px-4 pb-4 pt-3 backdrop-blur-md">
                  <h2 className="text-[2.45rem] font-black leading-[.98] tracking-normal text-white lg:text-6xl">
                    Tu token,
                    <span className="block text-primary">su esperanza.</span>
                  </h2>
                  <p className="mt-5 text-xl leading-snug text-white/78 lg:text-2xl">
                    Cada transacción genera impacto real para ONG y comunidades que más lo
                    necesitan.
                  </p>
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="relative mt-8 h-16 w-full justify-center gap-5 rounded-[1.05rem] border-white/16 bg-white/[.035] text-lg font-medium text-white hover:bg-white/[.07] hover:text-white"
                >
                  <Link to="/impact-map">
                    <Map className="h-7 w-7" />
                    Explorar mapa de impacto
                  </Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section
        id="roadmap"
        className="relative min-h-[900px] overflow-hidden py-16 md:py-20"
      >
        <div className="absolute inset-0 bg-[#020713]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-6">
          <div className="max-w-[560px]">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Roadmap
            </span>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              El camino hacia el impacto
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/78 md:text-xl">
              Nuestro roadmap estratégico para construir un ecosistema transparente, sostenible y
              con impacto real.
            </p>
          </div>
          <div className="relative mt-12 grid gap-5 lg:grid-cols-5">
            {[
              {
                q: "Q1 2026",
                icon: Rocket,
                f: "Fase 1",
                t: "Fundamentos",
                d: ["Branding", "Estructura legal", "Sitio web", "Mensaje inicial"],
                offset: "lg:mt-44",
              },
              {
                q: "Q2 2026",
                icon: Users,
                f: "Fase 2",
                t: "Comunidad",
                d: ["Redes sociales", "Lista de interesados", "Contenido educativo"],
                offset: "lg:mt-32",
              },
              {
                q: "Q3 2026",
                icon: TrendingUp,
                f: "Fase 3",
                t: "Lanzamiento",
                d: ["Activación de mercado", "Métricas", "Informes de impacto"],
                offset: "lg:mt-20",
              },
              {
                q: "Q4 2026",
                icon: Handshake,
                f: "Fase 4",
                t: "Alianzas",
                d: ["ONG aliadas", "Acuerdos preliminares", "Criterios de donación"],
                offset: "lg:mt-10",
              },
              {
                q: "Q5 2026",
                icon: BrainCircuit,
                f: "Fase 5",
                t: "Expansión",
                d: ["Integración de IA", "Automatización", "Nuevas alianzas"],
                offset: "lg:mt-0",
              },
            ].map((r) => (
              <div
                key={r.f}
                className={`reveal relative rounded-2xl border border-amber-300/25 bg-[#05101b]/72 p-5 shadow-[0_18px_50px_rgba(0,0,0,.38)] backdrop-blur-md lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-0 ${r.offset}`}
              >
                <div className="relative z-10 mb-5">
                  <div className="text-sm font-black text-primary md:text-base">{r.q}</div>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary">
                  <r.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {r.f}
                </div>
                <h3 className="mt-2 text-2xl font-bold">{r.t}</h3>
                <ul className="mt-4 space-y-2">
                  {r.d.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/68">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Users, label: "Comunidad", value: "0", desc: "Personas unidas" },
              { icon: Globe, label: "Alcance global", value: "0", desc: "Países conectados" },
              { icon: Heart, label: "Vidas transformadas", value: "0", desc: "Impactos reales" },
              {
                icon: Coins,
                label: "Fondos para impacto",
                value: "$0",
                desc: "Destinados a causas",
              },
              { icon: Shield, label: "Transparencia", value: "0%", desc: "On-chain verificable" },
            ].map((m) => (
              <div
                key={m.label}
                className="reveal flex items-center gap-4 rounded-2xl border border-amber-300/25 bg-[#05101b]/70 p-4 backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-0"
              >
                <m.icon className="h-9 w-9 shrink-0 text-primary" />
                <div>
                  <div className="text-sm text-primary">{m.label}</div>
                  <div className="text-2xl font-black leading-none md:text-3xl">{m.value}</div>
                  <div className="mt-1 text-xs text-white/72">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-4 flex flex-col gap-4 rounded-2xl border border-amber-300/25 bg-[#05101b]/70 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between lg:border-transparent lg:bg-transparent lg:backdrop-blur-0">
            <div className="flex items-center gap-4">
              <Heart className="h-9 w-9 shrink-0 text-primary" />
              <p className="text-lg text-white/82">
                Cada paso nos acerca a un mundo más justo, transparente y lleno de oportunidades
                para todos.
              </p>
            </div>
            <span className="font-black text-primary">Sé parte del cambio.</span>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="reveal text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Ecosistema
            </span>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Construido para <span className="text-primary">alianzas reales</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">
              Buscamos organizaciones que compartan nuestra visión: transparencia, impacto medible y
              tecnología al servicio del bien común.
            </p>
          </div>

          <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "ONG Educación Global",
                category: "Educación",
                quote:
                  "La tecnología blockchain puede llevar transparencia real a cada donación. ImpactHope Network lo hace posible.",
                initials: "EG",
                color: "from-amber-400 to-orange-500",
              },
              {
                name: "Fundación Agua Limpia",
                category: "Medio ambiente",
                quote:
                  "Un ecosistema donde cada transacción genera impacto verificable es exactamente lo que el sector necesita.",
                initials: "AL",
                color: "from-cyan-400 to-sky-500",
              },
              {
                name: "Red Comunitaria Latino",
                category: "Comunidad",
                quote:
                  "Por fin una plataforma que une a quienes tienen recursos con quienes tienen la necesidad, con total trazabilidad.",
                initials: "RC",
                color: "from-violet-400 to-purple-500",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#07101d]/78 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-sm font-black text-black`}
                  >
                    {p.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-xs text-white/50">{p.category}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/70">"{p.quote}"</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              "Transparencia on-chain",
              "Impacto medible",
              "Reportes verificables",
              "Sin intermediarios",
              "Comunidad global",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-300/20 bg-amber-300/[.06] px-4 py-1.5 text-sm font-semibold text-amber-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="donar" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="reveal grid gap-10 rounded-[2rem] border border-white/10 bg-[#07101d]/62 p-7 shadow-[0_30px_90px_rgba(0,0,0,.42)] md:p-10 lg:grid-cols-[.95fr_1.05fr] lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <Heart className="h-3.5 w-3.5" /> Tu aporte importa
              </span>
              <h2 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
                Dona hoy. Transforma <span className="text-primary">mañana.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72">
                Cada contribución se registra en blockchain y se reporta de forma transparente a la
                comunidad.
              </p>
              <ul className="mt-8 space-y-4">
                {["Transparencia verificable", "Reportes verificables", "Impacto medible"].map(
                  (b) => (
                    <li key={b} className="flex items-center gap-3 text-lg text-white/86">
                      <CheckCircle2 className="h-6 w-6 text-primary" /> {b}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/[.03] p-5 backdrop-blur-md md:p-7">
              <div className="text-2xl font-bold">Selecciona tu donación</div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[10, 25, 50, 100].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDonation(v)}
                    className={`rounded-xl py-4 text-lg font-bold transition-all ${
                      donation === v
                        ? "bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-gray-950 shadow-[0_8px_28px_-6px_rgba(245,158,11,.65)]"
                        : "border border-white/10 bg-white/[.06] text-white backdrop-blur-md hover:bg-white/[.10]"
                    }`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                min={1}
                max={100000}
                value={donation}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (Number.isFinite(n) && n >= 0) setDonation(n);
                }}
                className="mt-4 h-14 border-white/15 bg-transparent text-lg"
                placeholder="Monto personalizado"
                aria-label="Monto de donación personalizado"
              />

              <div className="mt-7 text-xl font-bold">Elige tu método de pago</div>
              <div className="mt-4 space-y-3" role="radiogroup" aria-label="Método de pago">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPayment === method.label;
                  return (
                    <button
                      key={method.label}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedPayment(method.label)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-primary/55 bg-primary/12"
                          : "border-white/10 bg-white/[.05] backdrop-blur-md hover:border-primary/40 hover:bg-white/[.09]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <method.icon className="h-6 w-6 text-white/72" />
                        <span className="font-semibold">{method.label}</span>
                      </span>
                      <span className="text-sm text-white/48">{method.detail}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="font-semibold">¿Quieres dejar un tip opcional?</div>
                <p className="mt-1 text-sm text-white/56">
                  Apoya el desarrollo y crecimiento de la organización.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[5, 10, 20, 0].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTip(v)}
                      className={`rounded-xl py-3 font-bold transition-colors ${
                        tip === v
                          ? "bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-gray-950 shadow-[0_8px_24px_-6px_rgba(245,158,11,.6)]"
                          : "border border-white/10 bg-white/[.05] text-white/70 backdrop-blur-md hover:bg-white/[.09]"
                      }`}
                    >
                      {v === 0 ? "Sin tip" : `$${v}`}
                    </button>
                  ))}
                </div>
              </div>

              {sent ? (
                <div className="mt-5 rounded-xl border border-primary/30 bg-primary/15 p-4 text-center text-sm">
                  ¡Gracias! Te contactaremos pronto sobre tu aporte de ${displayDonation + tip}.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email) return;
                    setSent(true);
                    const total = displayDonation + tip;
                    const subject = encodeURIComponent(`Aporte ImpactHope Network - $${total}`);
                    const body = encodeURIComponent(
                      `Hola ImpactHope Network,\n\nQuiero coordinar un aporte de $${total}.\n\nDonacion: $${displayDonation}\nTip: $${tip}\nMetodo preferido: ${selectedPayment}\nCorreo: ${email}\n\nGracias.`,
                    );
                    window.location.href = `mailto:contact@impacthopenetwork.org?subject=${subject}&body=${body}`;
                  }}
                  className="mt-5 space-y-3"
                >
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/46" />
                    <Input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 border-white/15 bg-transparent pl-9"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-base font-black text-gray-950 shadow-[0_14px_44px_-8px_rgba(245,158,11,0.65)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_18px_54px_-8px_rgba(245,158,11,0.85)]"
                  >
                    Donar ${displayDonation} + ${tip} tip <Heart className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
              <p className="mt-4 text-center text-xs text-white/42">
                Información de pago segura. No constituye asesoría financiera.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-5 md:px-6 lg:grid-cols-5">
          {[
            { i: Shield, t: "Seguridad", d: "Smart contracts auditados." },
            { i: BrainCircuit, t: "IA transparente", d: "Verificación de proyectos." },
            { i: Users, t: "Comunidad", d: "Decisiones compartidas." },
            { i: Rocket, t: "Futuro", d: "Herramientas para impacto." },
            { i: Heart, t: "Recompensas", d: "Ayudas mientras creces." },
          ].map((v) => (
            <div
              key={v.t}
              className="reveal rounded-2xl border border-white/10 bg-[#07101d]/76 p-5 backdrop-blur-xl lg:rounded-none lg:first:rounded-l-2xl lg:last:rounded-r-2xl"
            >
              <v.i className="h-9 w-9 text-primary" />
              <div className="mt-3 font-bold text-primary">{v.t}</div>
              <div className="mt-1 text-sm text-white/62">{v.d}</div>
            </div>
          ))}
        </div>
      </section>
      </main>

      <footer className="relative mt-8 border-t border-white/10 bg-[#050914]/78 py-10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-white/52 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <img src={coinImg} alt="" className="h-6 w-6" width={24} height={24} />
            <span>© 2026 ImpactHope Network LLC</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4" aria-label="Enlaces legales">
            <Link to="/terms" className="transition-colors hover:text-white/80">
              Términos de uso
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-white/80">
              Política de privacidad
            </Link>
            <Link to="/risk" className="transition-colors hover:text-white/80">
              Riesgos
            </Link>
            <Link to="/legal" className="transition-colors hover:text-white/80">
              Aviso legal
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white/80">
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
