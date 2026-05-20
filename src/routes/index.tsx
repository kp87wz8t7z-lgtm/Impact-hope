import { createFileRoute } from "@tanstack/react-router";
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
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  Landmark,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  Network,
  PieChart,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import networkHero from "@/assets/impact-network-hero.jpeg";
import impact1 from "@/assets/impact-1.jpg";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";
import coinImg from "@/assets/coin.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ImpactHope Coin - Inversión digital con impacto social real" },
      {
        name: "description",
        content:
          "ImpactHope Coin conecta blockchain, inversión y causas benéficas. Cada transacción genera impacto social real, con transparencia total.",
      },
    ],
  }),
});

const nav = [
  { label: "Misión", href: "#mision" },
  { label: "Cómo funciona", href: "#funciona" },
  { label: "Impacto", href: "#impacto" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Donar", href: "#donar" },
];

const orbitNodes = [
  {
    title: "Educación",
    value: "1,245+",
    caption: "vidas transformadas",
    icon: GraduationCap,
    className: "left-[6%] top-[16%]",
    delay: "0s",
  },
  {
    title: "On-chain",
    value: "100%",
    caption: "transparencia",
    icon: LockKeyhole,
    className: "right-[4%] top-[18%]",
    delay: ".4s",
  },
  {
    title: "Alimentos",
    value: "54+",
    caption: "países conectados",
    icon: Utensils,
    className: "left-[1%] bottom-[24%]",
    delay: ".8s",
  },
  {
    title: "Comunidad",
    value: "25K+",
    caption: "personas unidas",
    icon: Users,
    className: "right-[3%] bottom-[23%]",
    delay: "1.2s",
  },
  {
    title: "Impacto",
    value: "$3.2M+",
    caption: "fondos donados",
    icon: HandHeart,
    className: "left-[36%] bottom-[12%]",
    delay: "1.6s",
  },
];

const impactMetrics = [
  { icon: Users, value: "25,842+", label: "Comunidad global", color: "text-amber-300" },
  { icon: Globe, value: "54+", label: "Países impactados", color: "text-cyan-300" },
  { icon: Heart, value: "1,245+", label: "Vidas transformadas", color: "text-orange-300" },
  { icon: Coins, value: "$3.2M+", label: "Fondos donados", color: "text-amber-300" },
  { icon: BadgeCheck, value: "100%", label: "Transparente on-chain", color: "text-cyan-300" },
];

const transactions = [
  { id: "0x8A...92F", org: "Save Children", amount: "$250 USDC", chain: "Ethereum" },
  { id: "0x7C...11B", org: "UNICEF", amount: "$500 USDC", chain: "Polygon" },
  { id: "0x3F...7E9", org: "Educa a un Niño", amount: "$120 USDC", chain: "Ethereum" },
  { id: "0x9D...4AA", org: "World Vision", amount: "$300 USDC", chain: "Polygon" },
];

const tokenomics = [
  { label: "Liquidity DEX y estabilidad", value: "30%", color: "bg-cyan-400" },
  { label: "Rewards y comunidad", value: "20%", color: "bg-amber-400" },
  { label: "Reserva estratégica", value: "15%", color: "bg-emerald-400" },
  { label: "Tesorería y desarrollo", value: "15%", color: "bg-violet-400" },
  { label: "Premarket inicial", value: "10%", color: "bg-rose-400" },
  { label: "Operaciones y cumplimiento", value: "10%", color: "bg-sky-300" },
];

function Index() {
  const [donation, setDonation] = useState(50);
  const [tip, setTip] = useState(10);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [displayDonation, setDisplayDonation] = useState(50);

  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

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

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-x-hidden bg-[#050914] text-foreground"
    >
      <div className="fixed inset-0 -z-10 bg-[#050914]" />

      <header className="sticky top-0 z-50 bg-[#050914]/82 shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src={coinImg}
              alt=""
              className="h-9 w-9 drop-shadow-[0_0_18px_rgba(250,200,80,0.65)]"
              width={36}
              height={36}
            />
            <span className="text-lg font-bold tracking-tight">
              ImpactHope<span className="text-primary"> Coin</span>
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
          <Button
            asChild
            className="bg-gradient-to-r from-amber-300 to-orange-500 text-black shadow-[0_10px_30px_-10px_rgba(250,180,50,0.7)] hover:opacity-90"
          >
            <a href="#donar">
              <Heart className="mr-1 h-4 w-4" /> Donar
            </a>
          </Button>
        </div>
      </header>

      <section id="top" className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#050914]">
        <div className="absolute inset-0 bg-[#050914]" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-[2] hidden w-[61vw] lg:block">
          <div className="absolute inset-0 overflow-hidden rounded-l-[3rem] shadow-[-36px_0_90px_rgba(0,0,0,.3)]">
            <img
              src={networkHero}
              alt=""
              className="h-full w-full scale-[1.03] object-cover object-[48%_center] brightness-[1.04] contrast-[1.03] saturate-[1.06]"
              width={1461}
              height={1024}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_45%,rgba(251,191,36,.08),transparent_36%),linear-gradient(90deg,rgba(5,9,20,.5)_0%,rgba(5,9,20,.16)_20%,rgba(5,9,20,0)_54%,rgba(5,9,20,.14)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,.08)_0%,rgba(5,9,20,0)_50%,rgba(5,9,20,.2)_100%)]" />
          </div>
          <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#050914] via-[#050914]/64 to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-20 bg-gradient-to-b from-transparent to-[#050914]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-8 px-5 pb-10 pt-14 md:px-6 md:py-16 lg:grid-cols-[.78fr_1.22fr] lg:gap-10 lg:py-10">
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
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-[#07101d]/55 px-4 py-1.5 text-xs font-semibold text-amber-100 opacity-0 shadow-[0_0_35px_rgba(245,158,11,.22)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" /> Partner-ready impact infrastructure
            </div>
            <h1 className="mt-6 max-w-[620px] text-5xl font-black leading-[.94] tracking-tight text-white drop-shadow-[0_8px_34px_rgba(0,0,0,.55)] sm:text-6xl lg:text-[4.9rem]">
              {"Capital digital".split(" ").map((w, i) => (
                <span key={`a${i}`} className="hero-word mr-[0.22em] inline-block opacity-0">
                  {w}
                </span>
              ))}
              <span className="hero-word mr-[0.22em] inline-block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent opacity-0">
                para
              </span>
              <br />
              {"impacto humano verificable.".split(" ").map((w, i) => (
                <span key={`b${i}`} className="hero-word mr-[0.22em] inline-block opacity-0">
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero-reveal mt-6 max-w-xl text-lg leading-relaxed text-white/82 opacity-0 drop-shadow-[0_6px_24px_rgba(0,0,0,.45)]">
              ImpactHope Coin conecta blockchain, partners y causas sociales en una red trazable:
              cada aporte se convierte en educacion, proteccion y oportunidades medibles.
            </p>
            <div className="hero-reveal mt-8 flex flex-wrap gap-3 opacity-0">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-300 to-orange-500 text-black shadow-[0_18px_46px_-12px_rgba(250,180,50,0.85)] hover:opacity-90"
              >
                <a href="#donar">
                  Unirse como partner <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/18 bg-white/[.04] text-white backdrop-blur hover:bg-white/[.08]"
              >
                <a href="#impacto">Ver impacto</a>
              </Button>
            </div>
            <div
              ref={statsRef}
              className="hero-reveal mt-10 grid max-w-md grid-cols-3 gap-4 opacity-0"
            >
              {[
                { k: "3000", prefix: "$", suffix: "", v: "Capital inicial" },
                { k: "100", prefix: "", suffix: "%", v: "Trazable" },
                { k: null, raw: "24/7", v: "Impacto visible" },
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
                  className="signal-chip inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-[#06111f]/55 px-3 py-2 text-xs font-semibold text-cyan-50 shadow-[0_0_26px_rgba(34,211,238,.12)] backdrop-blur-xl"
                >
                  <item.icon className="h-4 w-4 text-amber-200" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-reveal pointer-events-none relative mx-auto hidden h-[560px] w-full max-w-[690px] opacity-0 max-lg:-mt-4 max-sm:h-[360px]">
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
                alt="Token ImpactHope Coin"
                className="relative z-10 w-full drop-shadow-[0_34px_80px_rgba(251,146,60,.58)]"
                width={260}
                height={260}
              />
            </div>

            {orbitNodes.map((node) => (
              <div
                key={node.title}
                className={`network-node absolute z-30 hidden w-[178px] rounded-2xl border border-cyan-200/14 bg-[#07111f]/78 p-4 shadow-[0_20px_60px_rgba(0,0,0,.38),0_0_34px_rgba(34,211,238,.08)] backdrop-blur-xl sm:block ${node.className}`}
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

            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-xl">
              <Network className="h-4 w-4" />
              Ecosistema de impacto conectado al token
            </div>
          </div>
        </div>
      </section>

      <section id="mision" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="reveal grid gap-8 rounded-[2rem] border border-amber-300/18 bg-[#07101d]/72 p-7 shadow-[0_28px_90px_rgba(0,0,0,.36)] backdrop-blur-xl md:grid-cols-[1.05fr_.95fr] md:p-10 lg:p-14">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Nuestra Misión
              </span>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                Un puente entre la <span className="text-primary">economía digital</span> y el{" "}
                <span className="text-primary">impacto humano</span>.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72">
                Las donaciones tradicionales sufren de falta de transparencia. Los activos digitales
                carecen de propósito. ImpactHope Coin une lo mejor de ambos mundos: tecnología
                blockchain con responsabilidad social verificable.
              </p>
            </div>
            <div className="grid content-center gap-3">
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
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Link2,
                t: "Adquiere el token",
                d: "Compra ImpactHope Coin y forma parte de una comunidad global comprometida.",
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
          <div className="reveal mt-6 grid gap-4 rounded-2xl border border-amber-300/25 bg-[#07101d]/70 p-5 backdrop-blur-xl md:grid-cols-5">
            {impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-3 border-white/10 md:border-r md:last:border-r-0"
              >
                <metric.icon className={`h-9 w-9 ${metric.color}`} />
                <div>
                  <div className="text-xl font-black">{metric.value}</div>
                  <div className="text-xs text-white/58">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impacto" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Transparencia en tiempo real
              </span>
              <h2 className="mt-3 max-w-2xl text-4xl font-black md:text-5xl">
                Donde cada moneda se convierte en sonrisas.
              </h2>
            </div>
            <p className="max-w-md text-white/68">
              Apoyamos educación, alimentación y desarrollo comunitario con reportes visibles,
              trazables y medibles.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[.95fr_1fr_.95fr]">
            <div className="reveal rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Transacciones recientes
              </div>
              <div className="mt-4 divide-y divide-white/10">
                {transactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-[1fr_auto] gap-4 py-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs">
                          →
                        </span>
                        <span className="font-semibold">{tx.id}</span>
                        <span className="text-white/40">→</span>
                        <span className="text-white/82">{tx.org}</span>
                      </div>
                      <div className="mt-1 text-xs text-white/46">{tx.chain} · Confirmada</div>
                    </div>
                    <div className="text-right font-semibold">{tx.amount}</div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 border-white/15 bg-white/[.03] text-white hover:bg-white/[.07]"
              >
                Ver todas las transacciones <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="reveal overflow-hidden rounded-2xl border border-white/10 bg-[#07101d]/78 backdrop-blur-xl">
              <div className="p-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Mapa de impacto
                </div>
                <h3 className="mt-2 text-2xl font-bold">Nuestras causas en el mundo</h3>
              </div>
              <div className="relative mx-5 mb-5 h-[288px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_48%_45%,rgba(251,191,36,.2),transparent_32%),linear-gradient(145deg,rgba(14,165,233,.16),rgba(0,0,0,.1))]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30" />
                {[
                  ["left-[18%] top-[36%]", "Lima"],
                  ["left-[30%] top-[49%]", "Bogotá"],
                  ["left-[49%] top-[33%]", "Madrid"],
                  ["left-[58%] top-[54%]", "Lagos"],
                  ["left-[72%] top-[42%]", "Nairobi"],
                  ["left-[82%] top-[62%]", "Manila"],
                ].map(([pos, label]) => (
                  <div key={label} className={`absolute ${pos}`}>
                    <span className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/20 blur-md" />
                    <MapPin className="relative h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,.75)]" />
                  </div>
                ))}
                <div className="absolute bottom-4 left-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                  54 países conectados
                </div>
              </div>
            </div>

            <div className="reveal rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Tokenomics
              </div>
              <h3 className="mt-2 text-2xl font-bold">Así generamos impacto</h3>
              <div className="mt-5 flex items-center justify-center">
                <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#22d3ee_0_30%,#f59e0b_30%_50%,#34d399_50%_65%,#a78bfa_65%_80%,#fb7185_80%_90%,#7dd3fc_90%_100%)]">
                  <div className="absolute inset-9 flex items-center justify-center rounded-full bg-[#07101d]">
                    <PieChart className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {tokenomics.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[auto_44px_1fr] items-center gap-3 text-sm"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="font-bold">{item.value}</span>
                    <span className="text-white/62">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { img: impact1, t: "Comunidad", d: "Niños unidos por la esperanza" },
              { img: impact2, t: "Alimentación", d: "Llevamos comida a quien la necesita" },
              { img: impact3, t: "Educación", d: "Construyendo el futuro con conocimiento" },
            ].map((c) => (
              <div
                key={c.t}
                className="reveal group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={c.img}
                  alt={c.t}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold">{c.t}</h3>
                  <p className="mt-1 text-white/78">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Roadmap
            </span>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">El camino hacia el impacto</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/68">
              Nuestro roadmap estratégico para construir un ecosistema transparente, sostenible y
              con impacto real.
            </p>
          </div>
          <div className="relative mt-14 grid gap-5 lg:grid-cols-5">
            <div className="absolute left-8 right-8 top-16 hidden h-1 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-300 shadow-[0_0_26px_rgba(251,191,36,.6)] lg:block" />
            {[
              {
                q: "Q1 2026",
                icon: Rocket,
                f: "Fase 1",
                t: "Fundamentos",
                d: ["Branding", "Estructura legal", "Sitio web"],
              },
              {
                q: "Q2 2026",
                icon: Users,
                f: "Fase 2",
                t: "Comunidad",
                d: ["Redes sociales", "Lista de interesados", "Contenido educativo"],
              },
              {
                q: "Q3 2026",
                icon: Handshake,
                f: "Fase 3",
                t: "Alianzas",
                d: ["ONG aliadas", "Acuerdos preliminares", "Criterios de donación"],
              },
              {
                q: "Q4 2026",
                icon: TrendingUp,
                f: "Fase 4",
                t: "Lanzamiento",
                d: ["Activación de mercado", "Métricas", "Informes de impacto"],
              },
              {
                q: "Q5 2026",
                icon: BrainCircuit,
                f: "Fase 5",
                t: "Expansión",
                d: ["Integración de IA", "Automatización", "Nuevas alianzas"],
              },
            ].map((r, i) => (
              <div
                key={r.f}
                className="reveal relative rounded-2xl border border-amber-300/20 bg-[#07101d]/78 p-5 backdrop-blur-xl"
              >
                <div className="relative z-10 mb-5">
                  <div className="text-sm font-bold text-primary">{r.q}</div>
                  <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10 text-2xl font-black text-white shadow-[0_0_35px_rgba(251,191,36,.38)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
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
        </div>
      </section>

      <section id="donar" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="reveal grid gap-10 rounded-[2rem] border border-white/10 bg-[#07101d]/82 p-7 shadow-[0_30px_90px_rgba(0,0,0,.42)] backdrop-blur-xl md:grid-cols-[.95fr_1.05fr] md:p-12">
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
                {["100% transparente", "Reportes verificables", "Impacto medible"].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-lg text-white/86">
                    <CheckCircle2 className="h-6 w-6 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/12 bg-[#050914]/72 p-5 md:p-7">
              <div className="text-2xl font-bold">Selecciona tu donación</div>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {[10, 25, 50, 100].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDonation(v)}
                    className={`rounded-xl py-4 text-lg font-bold transition-all ${
                      donation === v
                        ? "bg-gradient-to-r from-amber-300 to-orange-500 text-black shadow-[0_0_28px_rgba(245,158,11,.34)]"
                        : "bg-white/[.055] text-white hover:bg-white/[.09]"
                    }`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={donation}
                onChange={(e) => setDonation(Number(e.target.value))}
                className="mt-4 h-14 border-white/15 bg-transparent text-lg"
                placeholder="Monto personalizado"
              />

              <div className="mt-7 text-xl font-bold">Elige tu método de pago</div>
              <div className="mt-4 space-y-3">
                {[
                  { icon: CreditCard, label: "Tarjeta de crédito / débito", detail: "Stripe" },
                  { icon: CircleDollarSign, label: "Criptomonedas", detail: "BTC · ETH · USDC" },
                  { icon: Wifi, label: "Zelle", detail: "Transferencia directa" },
                  { icon: Landmark, label: "Cuenta de banco", detail: "ACH" },
                ].map((method) => (
                  <button
                    key={method.label}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.045] p-4 text-left transition-colors hover:border-primary/40 hover:bg-white/[.07]"
                  >
                    <span className="flex items-center gap-3">
                      <method.icon className="h-6 w-6 text-white/72" />
                      <span className="font-semibold">{method.label}</span>
                    </span>
                    <span className="text-sm text-white/48">{method.detail}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="font-semibold">¿Quieres dejar un tip opcional?</div>
                <p className="mt-1 text-sm text-white/56">
                  Apoya el desarrollo y crecimiento de la organización.
                </p>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[5, 10, 20, 0].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTip(v)}
                      className={`rounded-xl py-3 font-bold transition-colors ${
                        tip === v
                          ? "bg-gradient-to-r from-amber-300 to-orange-500 text-black"
                          : "border border-white/10 bg-white/[.04] text-white/70 hover:bg-white/[.08]"
                      }`}
                    >
                      {v === 0 ? "Otro" : `$${v}`}
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
                    if (email) setSent(true);
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
                    className="h-14 w-full bg-gradient-to-r from-amber-300 to-orange-500 text-base font-black text-black hover:opacity-90"
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
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 md:px-6 lg:grid-cols-5">
          {[
            { i: Shield, t: "Seguridad", d: "Smart contracts auditados." },
            { i: BrainCircuit, t: "IA transparente", d: "Verificación de proyectos." },
            { i: Users, t: "Comunidad", d: "Decisiones compartidas." },
            { i: Rocket, t: "Futuro", d: "Herramientas para impacto." },
            { i: Heart, t: "Recompensas", d: "Ayudas mientras creces." },
          ].map((v) => (
            <div
              key={v.t}
              className="reveal border border-white/10 bg-[#07101d]/76 p-5 backdrop-blur-xl first:rounded-l-2xl last:rounded-r-2xl max-lg:rounded-2xl"
            >
              <v.i className="h-9 w-9 text-primary" />
              <div className="mt-3 font-bold text-primary">{v.t}</div>
              <div className="mt-1 text-sm text-white/62">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative mt-8 border-t border-white/10 bg-[#050914]/78 py-10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-white/52 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <img src={coinImg} alt="" className="h-6 w-6" width={24} height={24} />
            <span>© 2026 ImpactHope Coin LLC</span>
          </div>
          <p>Fundadora: Alicia Rivas · Etapa inicial de desarrollo</p>
        </div>
      </footer>
    </div>
  );
}
