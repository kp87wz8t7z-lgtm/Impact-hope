import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { animate, stagger, createScope, type Scope } from "animejs";
import { Heart, Shield, Sparkles, Users, TrendingUp, Globe, ArrowRight, Coins, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero-children.jpg";
import impact1 from "@/assets/impact-1.jpg";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";
import coinImg from "@/assets/coin.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ImpactHope Coin — Inversión digital con impacto social real" },
      { name: "description", content: "ImpactHope Coin conecta blockchain, inversión y causas benéficas. Cada transacción genera impacto social real, con transparencia total." },
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

function Index() {
  const [donation, setDonation] = useState(50);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [displayDonation, setDisplayDonation] = useState(50);

  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const donationDisplayRef = useRef<HTMLSpanElement>(null);

  // Split hero headline into animated words
  useEffect(() => {
    if (!rootRef.current) return;
    scopeRef.current = createScope({ root: rootRef.current }).add(() => {
      // Hero words stagger reveal
      animate(".hero-word", {
        opacity: [0, 1],
        translateY: [40, 0],
        filter: ["blur(12px)", "blur(0px)"],
        duration: 900,
        delay: stagger(80, { start: 200 }),
        ease: "out(3)",
      });

      // Hero subtitle + CTAs
      animate(".hero-reveal", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        delay: stagger(120, { start: 700 }),
        ease: "out(2)",
      });

      // Floating coin (continuous)
      animate(".coin-float", {
        translateY: [-18, 18],
        rotate: [-3, 3],
        duration: 3500,
        ease: "inOut(2)",
        alternate: true,
        loop: true,
      });

      // Coin glow pulse
      animate(".coin-glow", {
        scale: [1, 1.15, 1],
        opacity: [0.6, 0.9, 0.6],
        duration: 4000,
        ease: "inOut(2)",
        loop: true,
      });
    });

    // Scroll reveal via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              ease: "out(3)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      observer.observe(el);
    });

    // Stats count up
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
      { threshold: 0.4 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      scopeRef.current?.revert();
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  // Animate donation number when changed
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
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Fixed background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <img
          src={heroImg}
          alt="Niños felices del mundo"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src={coinImg} alt="" className="h-9 w-9 drop-shadow-[0_0_15px_rgba(250,200,80,0.6)]" width={36} height={36} />
            <span className="font-bold text-lg tracking-tight">
              ImpactHope<span className="text-primary"> Coin</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-foreground/80 hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <Button asChild className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:opacity-90 shadow-[0_10px_30px_-10px_rgba(250,180,50,0.6)]">
            <a href="#donar">
              <Heart className="mr-1 h-4 w-4" /> Donar
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary opacity-0">
              <Sparkles className="h-3.5 w-3.5" /> Pre-lanzamiento · Token con propósito
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              {"Invierte con el".split(" ").map((w, i) => (
                <span key={`a${i}`} className="hero-word inline-block opacity-0 mr-[0.25em]">{w}</span>
              ))}
              <span className="hero-word inline-block opacity-0 mr-[0.25em] bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">corazón.</span>
              <br />
              {"Transforma vidas reales.".split(" ").map((w, i) => (
                <span key={`b${i}`} className="hero-word inline-block opacity-0 mr-[0.25em]">{w}</span>
              ))}
            </h1>
            <p className="hero-reveal mt-6 text-lg text-foreground/80 max-w-xl leading-relaxed opacity-0">
              ImpactHope Coin une blockchain, comunidad y causas benéficas. Cada transacción genera una contribución verificable para niños, familias y organizaciones que más lo necesitan.
            </p>
            <div className="hero-reveal mt-8 flex flex-wrap gap-3 opacity-0">
              <Button size="lg" asChild className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:opacity-90 shadow-[0_15px_40px_-10px_rgba(250,180,50,0.6)]">
                <a href="#donar">Donar ahora <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 bg-white/5 backdrop-blur hover:bg-white/10">
                <a href="#funciona">Cómo funciona</a>
              </Button>
            </div>
            <div ref={statsRef} className="hero-reveal mt-10 grid grid-cols-3 gap-6 max-w-md opacity-0">
              {[
                { k: "3000", prefix: "$", suffix: "", v: "Inversión inicial" },
                { k: "100", prefix: "", suffix: "%", v: "Transparente" },
                { k: null, raw: "∞", v: "Vidas posibles" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-3xl font-bold text-primary">
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
                  <div className="text-xs text-foreground/60 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="coin-glow absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-transparent blur-3xl" />
            <img
              src={coinImg}
              alt="Token ImpactHope Coin"
              className="coin-float relative w-[420px] max-w-full drop-shadow-[0_25px_60px_rgba(250,180,50,0.45)]"
              width={420}
              height={420}
            />
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section id="mision" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal rounded-3xl border border-white/10 bg-card backdrop-blur-xl p-10 md:p-16 shadow-2xl">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Nuestra Misión</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
              Un puente entre la <span className="text-primary">economía digital</span> y el <span className="text-primary">impacto humano</span>.
            </h2>
            <p className="mt-6 text-lg text-foreground/75 max-w-3xl leading-relaxed">
              Las donaciones tradicionales sufren de falta de transparencia. Los activos digitales carecen de propósito. ImpactHope Coin une lo mejor de ambos mundos: tecnología blockchain con responsabilidad social verificable.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="funciona" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Cómo funciona</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Tres pasos. Impacto real.</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { icon: Coins, t: "Adquiere el token", d: "Compra ImpactHope Coin y forma parte de una comunidad global comprometida." },
              { icon: TrendingUp, t: "Cada tx genera impacto", d: "Un porcentaje de las transacciones se destina automáticamente a causas benéficas." },
              { icon: Heart, t: "Cambia vidas", d: "Recibe reportes verificables sobre las personas y proyectos que tu participación apoya." },
            ].map((s, i) => (
              <div key={s.t} className="reveal group relative rounded-2xl border border-white/10 bg-card backdrop-blur-xl p-8 hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className="text-6xl font-bold text-primary/20 absolute top-4 right-6">0{i + 1}</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black mb-5">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO - galería */}
      <section id="impacto" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Impacto Social</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold max-w-2xl">Donde cada moneda se convierte en sonrisas.</h2>
            </div>
            <p className="text-foreground/70 max-w-md">
              Apoyamos educación, alimentación y desarrollo comunitario en zonas donde más se necesita.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: impact1, t: "Comunidad", d: "Niños unidos por la esperanza" },
              { img: impact2, t: "Alimentación", d: "Llevamos comida a quien la necesita" },
              { img: impact3, t: "Educación", d: "Construyendo el futuro con conocimiento" },
            ].map((c) => (
              <div key={c.t} className="reveal group relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/5]">
                <img src={c.img} alt={c.t} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold">{c.t}</h3>
                  <p className="text-foreground/80 mt-1">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Roadmap</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">El camino hacia el impacto</h2>
          </div>
          <div className="mt-16 space-y-4">
            {[
              { f: "Fase 1", t: "Fundamentos", d: "Branding, estructura legal, sitio web, mensaje y estrategia inicial." },
              { f: "Fase 2", t: "Comunidad", d: "Redes sociales, lista de interesados y contenido educativo." },
              { f: "Fase 3", t: "Alianzas", d: "ONG aliadas, acuerdos preliminares y criterios de donación claros." },
              { f: "Fase 4", t: "Lanzamiento", d: "Activación de mercado, métricas e informes de impacto." },
            ].map((r, i) => (
              <div key={r.f} className="reveal flex gap-6 rounded-2xl border border-white/10 bg-card backdrop-blur-xl p-6 hover:border-primary/40 transition-colors">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black text-lg">
                  0{i + 1}
                </div>
                <div>
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider">{r.f}</div>
                  <h3 className="text-xl font-bold mt-1">{r.t}</h3>
                  <p className="text-foreground/70 mt-1">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONACIÓN */}
      <section id="donar" className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="reveal rounded-3xl border border-primary/30 bg-gradient-to-br from-amber-500/10 via-card to-orange-500/10 backdrop-blur-xl p-10 md:p-14 shadow-[0_30px_80px_-20px_rgba(250,180,50,0.4)]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  <Heart className="h-3.5 w-3.5" /> Tu aporte importa
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                  Dona hoy. Transforma <span className="text-primary">mañana</span>.
                </h2>
                <p className="mt-4 text-foreground/75">
                  Cada contribución se registra en blockchain y se reporta de forma transparente a la comunidad.
                </p>
                <ul className="mt-6 space-y-2">
                  {["100% transparente", "Reportes verificables", "Impacto medible"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl bg-background/60 border border-white/10 p-6">
                  <div className="text-sm text-foreground/70 mb-3">Selecciona tu donación</div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[10, 25, 50, 100].map((v) => (
                      <button
                        key={v}
                        onClick={() => setDonation(v)}
                        className={`py-2 rounded-lg font-semibold transition-all ${
                          donation === v
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black"
                            : "bg-white/5 hover:bg-white/10"
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
                    className="bg-background/50 border-white/20 text-lg"
                    placeholder="Monto personalizado"
                  />
                </div>
                {sent ? (
                  <div className="rounded-xl bg-primary/15 border border-primary/30 p-4 text-center text-sm">
                    ¡Gracias! Te contactaremos pronto sobre tu aporte de ${donation}.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSent(true);
                    }}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                      <Input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 h-12 bg-background/50 border-white/20"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:opacity-90 text-base font-bold">
                      Donar ${donation} <Heart className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
                <p className="text-xs text-foreground/50 text-center">
                  Información de pago segura. No constituye asesoría financiera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: Shield, t: "Transparencia", d: "Blockchain auditable." },
            { i: Users, t: "Comunidad", d: "Decisiones compartidas." },
            { i: Globe, t: "Alcance global", d: "Impacto sin fronteras." },
            { i: Heart, t: "Propósito real", d: "Causas verificadas." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-white/10 bg-card backdrop-blur-xl p-6 text-center">
              <v.i className="h-8 w-8 text-primary mx-auto" />
              <div className="font-bold mt-3">{v.t}</div>
              <div className="text-sm text-foreground/70 mt-1">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 mt-12 py-10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <img src={coinImg} alt="" className="h-6 w-6" width={24} height={24} />
            <span>© 2026 ImpactHope Coin LLC</span>
          </div>
          <p>Fundadora: Alicia Rivas · Etapa inicial de desarrollo</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
