import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, BadgeCheck, Heart, Shield, Sparkles } from "lucide-react";

import coinImg from "@/assets/coin.png";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  notice?: string;
};

const policyLinks = [
  { label: "Términos", to: "/terms" },
  { label: "Privacidad", to: "/privacy" },
  { label: "Riesgos", to: "/risk" },
  { label: "Aviso legal", to: "/legal" },
  { label: "Contacto", to: "/contact" },
] as const;

function renderLinkedText(text: string) {
  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(emailPattern)) {
    const email = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    parts.push(
      <a
        key={`${email}-${index}`}
        href={`mailto:${email}`}
        className="font-semibold text-primary hover:underline"
      >
        {email}
      </a>,
    );
    lastIndex = index + email.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}

export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
  notice,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="fixed inset-0 -z-10 bg-[#050914]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(251,191,36,.16),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(34,211,238,.12),transparent_32%),linear-gradient(180deg,rgba(5,9,20,0)_0%,#050914_68%)]" />

      <header className="border-b border-white/10 bg-[#050914]/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={coinImg} alt="" className="h-9 w-9" width={36} height={36} />
            <span className="text-lg font-black tracking-tight">
              ImpactHope<span className="text-primary"> Network</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.045] px-4 py-2 text-sm font-semibold text-white/78 transition-colors hover:border-primary/45 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-[0.72fr_0.28fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/72">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/56">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-1.5">
              <BadgeCheck className="h-4 w-4 text-cyan-200" />
              Actualizado: {updated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/16 bg-amber-300/8 px-3 py-1.5">
              <Shield className="h-4 w-4 text-amber-200" />
              Documento informativo
            </span>
          </div>

          {notice ? (
            <div className="mt-8 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-sm leading-relaxed text-amber-50/86">
              {notice}
            </div>
          ) : null}

          <div className="mt-10 space-y-5">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-[#07101d]/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-sm font-black text-black">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-black leading-tight">{section.title}</h2>
                </div>
                <div className="space-y-3 text-[15px] leading-relaxed text-white/70">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <div className="rounded-2xl border border-white/10 bg-[#07101d]/78 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
              <Heart className="h-4 w-4" />
              Documentos
            </div>
            <nav className="grid gap-2">
              {policyLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl border border-white/8 bg-white/[.035] px-4 py-3 text-sm font-semibold text-white/68 transition-colors hover:border-primary/35 hover:bg-white/[.07] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-4 rounded-2xl border border-cyan-300/16 bg-cyan-300/8 p-5 text-sm leading-relaxed text-cyan-50/76">
            Estas páginas resumen políticas operativas para usuarios, aliados y posibles
            participantes del ecosistema. Deben revisarse con asesoría profesional antes de
            cualquier lanzamiento formal de token o captación de fondos.
          </div>
        </aside>
      </section>
    </main>
  );
}
