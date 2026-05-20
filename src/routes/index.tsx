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
  Map,
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
  { icon: HandHeart, value: "+50", label: "ONG apoyadas", color: "text-amber-300" },
  { icon: Users, value: "+120K", label: "Personas beneficiadas", color: "text-cyan-300" },
  { icon: Globe, value: "+25", label: "Países alcanzados", color: "text-orange-300" },
];

const transactions = [
  { id: "0x8A...92F", org: "Save Children", amount: "$250 USDC", chain: "Ethereum" },
  { id: "0x7C...11B", org: "UNICEF", amount: "$500 USDC", chain: "Polygon" },
  { id: "0x3F...7E9", org: "Educa a un Niño", amount: "$120 USDC", chain: "Ethereum" },
  { id: "0x9D...4AA", org: "World Vision", amount: "$300 USDC", chain: "Polygon" },
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
        <img
          src={networkHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1672}
          height={941}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b from-transparent via-[#050914]/72 to-[#050914] md:h-56" />
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
            <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-[#07101d]/55 px-4 py-1.5 text-xs font-semibold text-amber-100 opacity-0 shadow-[0_0_35px_rgba(245,158,11,.22)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" /> Partner-ready impact infrastructure
            </div>
            <h1 className="mt-6 max-w-[620px] text-5xl font-black leading-[.94] tracking-tight text-white drop-shadow-[0_8px_34px_rgba(0,0,0,.55)] sm:text-6xl lg:text-[4.9rem]">
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
            <p className="hero-reveal mt-6 max-w-xl text-lg leading-relaxed text-white/82 opacity-0 drop-shadow-[0_6px_24px_rgba(0,0,0,.45)]">
              ImpactHope Coin une blockchain, comunidad y causas benéficas. Cada transacción genera
              una contribución verificable para niños, familias y organizaciones que más lo
              necesitan.
            </p>
            <div className="hero-reveal mt-8 flex flex-wrap gap-3 opacity-0">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-300 to-orange-500 text-black shadow-[0_18px_46px_-12px_rgba(250,180,50,0.85)] hover:opacity-90"
              >
                <a href="#donar">
                  Donar ahora <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/18 bg-white/[.04] text-white backdrop-blur hover:bg-white/[.08]"
              >
                <a href="#funciona">Cómo funciona</a>
              </Button>
            </div>
            <div
              ref={statsRef}
              className="hero-reveal mt-10 grid max-w-md grid-cols-3 gap-4 opacity-0"
            >
              {[
                { k: "3000", prefix: "$", suffix: "", v: "Inversión inicial" },
                { k: "100", prefix: "", suffix: "%", v: "Transparente" },
                { k: null, raw: "∞", v: "Vidas posibles" },
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
          <div className="reveal mt-6 grid gap-4 rounded-2xl border border-amber-300/25 bg-[#07101d]/70 p-5 backdrop-blur-xl md:grid-cols-3">
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
        <div className="mx-auto max-w-[430px] px-5 lg:max-w-5xl lg:px-6">
          <div className="reveal overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#070c19]/86 shadow-[0_26px_78px_rgba(0,0,0,.44)] backdrop-blur-xl">
            <div className="relative min-h-[232px] p-7 lg:min-h-[280px] lg:p-10">
              <img
                src={impact2}
                alt="Manos cuidando a un niño"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-y-0 right-0 h-full w-[70%] object-cover object-center opacity-95 brightness-110 [mask-image:linear-gradient(90deg,transparent,black_18%)]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_48%,rgba(251,191,36,.34),transparent_24%),linear-gradient(90deg,#070c19_0%,rgba(7,12,25,.82)_42%,rgba(7,12,25,.1)_100%)]" />
              <div className="relative max-w-[270px]">
                <h2 className="text-[2.45rem] font-black leading-[.98] tracking-normal text-white lg:text-6xl">
                  Tu token,
                  <span className="block text-primary">su esperanza.</span>
                </h2>
                <p className="mt-5 text-xl leading-snug text-white/78 lg:text-2xl">
                  Cada transacción genera impacto real para ONG y comunidades que más lo necesitan.
                </p>
              </div>
              <Button
                variant="outline"
                className="relative mt-8 h-16 w-full justify-center gap-5 rounded-[1.05rem] border-white/16 bg-white/[.035] text-lg font-medium text-white hover:bg-white/[.07]"
              >
                <Map className="h-7 w-7" />
                Explorar mapa de impacto
              </Button>
            </div>
          </div>

          <div className="reveal mt-6 overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#070c19]/86 shadow-[0_26px_78px_rgba(0,0,0,.44)] backdrop-blur-xl">
            <div className="p-7 md:p-10">
              <div className="text-[13px] font-bold uppercase tracking-[0.24em] text-primary">
                Tokenomics
              </div>
              <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                <div>
                  <h2 className="text-[2.08rem] font-black leading-tight text-white lg:text-5xl">
                    Así generamos impacto juntos{" "}
                    <Heart className="inline h-7 w-7 align-[-0.12em] text-primary lg:h-9 lg:w-9" />
                  </h2>
                  <p className="mt-5 text-xl leading-snug text-white/72">
                    El 100% del impacto va a ONG y comunidades necesitadas.
                  </p>
                  <div className="mt-9 flex justify-center md:justify-start">
                    <div className="relative h-[220px] w-[220px] rounded-full bg-[conic-gradient(#3b82f6_0_30%,#f59e0b_30%_50%,#47c765_50%_65%,#8b5cf6_65%_80%,#ef4444_80%_90%,#48b6c9_90%_100%)] shadow-[0_0_34px_rgba(251,191,36,.08)] lg:h-[300px] lg:w-[300px]">
                      <div className="absolute inset-[48px] flex flex-col items-center justify-center rounded-full bg-[#070c19] text-center lg:inset-16">
                        <Globe
                          className="h-12 w-12 text-primary lg:h-20 lg:w-20"
                          strokeWidth={1.7}
                        />
                        <span className="mt-1 max-w-[96px] text-xs font-semibold leading-tight text-white/82 lg:mt-2 lg:max-w-[116px] lg:text-base">
                          Impacto real.
                          <br />
                          Vidas transformadas.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {tokenomics.map((item, index) => {
                    const icons = [
                      CircleDollarSign,
                      Users,
                      Sparkles,
                      HandHeart,
                      Shield,
                      BadgeCheck,
                    ];
                    const Icon = icons[index];
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.color} text-white shadow-[0_10px_24px_rgba(0,0,0,.24)]`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <div className="text-2xl font-black leading-none text-white">
                            {item.value}
                          </div>
                          <div className="mt-1 text-xl font-semibold leading-tight text-white">
                            {item.label}
                          </div>
                          <p className="mt-1 text-base leading-snug text-white/58">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-7 py-6 md:px-10">
              <div className="flex items-start gap-4">
                <Heart className="mt-1 h-10 w-10 shrink-0 text-primary" strokeWidth={1.9} />
                <div>
                  <p className="text-xl font-medium text-white/86">
                    Transparente. Trazable. Con propósito.
                  </p>
                  <p className="mt-2 text-lg text-white/54">Cada token impulsa un cambio real.</p>
                </div>
              </div>
              <div className="mt-7 grid grid-cols-3 rounded-[1.05rem] bg-white/[.045] px-3 py-5">
                {[
                  { icon: HandHeart, value: "+50", label: "ONG apoyadas" },
                  { icon: Users, value: "+120K", label: "Personas beneficiadas" },
                  { icon: Globe, value: "+25", label: "Países alcanzados" },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col items-center text-center">
                    <metric.icon className="h-9 w-9 text-primary" strokeWidth={1.8} />
                    <div className="mt-2 text-2xl font-black leading-none text-white">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-sm leading-tight text-white/62">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal mx-auto mt-5 flex h-16 max-w-[260px] flex-col items-center justify-center rounded-[1.25rem] border border-white/12 bg-white/[.035] text-center text-lg text-white/86">
            <span>impact-hope-spark.lovable.app</span>
            <Heart className="mt-1 h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="hidden">
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
              <h3 className="mt-2 text-2xl font-bold">
                Así generamos impacto juntos <Heart className="inline h-5 w-5 text-primary" />
              </h3>
              <p className="mt-2 text-sm text-white/58">
                El 100% del impacto va a ONG y comunidades necesitadas.
              </p>
              <div className="mt-5 flex items-center justify-center">
                <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#22d3ee_0_30%,#f59e0b_30%_50%,#34d399_50%_65%,#a78bfa_65%_80%,#fb7185_80%_90%,#7dd3fc_90%_100%)]">
                  <div className="absolute inset-9 flex flex-col items-center justify-center rounded-full bg-[#07101d] text-center">
                    <Globe className="h-7 w-7 text-primary" />
                    <span className="mt-1 text-[10px] font-semibold leading-tight text-white/70">
                      Impacto real.
                      <br />
                      Vidas transformadas.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {tokenomics.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 text-sm">
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />
                    <div>
                      <span className="font-bold">
                        {item.value} {item.label}
                      </span>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/50">
                <Heart className="mr-1 inline h-3 w-3 text-primary" />
                Transparente. Trazable. Con propósito. Cada token impulsa un cambio real.
              </p>
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
