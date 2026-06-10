import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, BadgeCheck, Heart, Shield, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import coinImg from "@/assets/coin.png";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";

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
  const { t } = useTranslation();
  const policyLinks = [
    { label: t("policyLinks.terms"), to: "/terms" as const },
    { label: t("policyLinks.privacy"), to: "/privacy" as const },
    { label: t("policyLinks.risk"), to: "/risk" as const },
    { label: t("policyLinks.legal"), to: "/legal" as const },
    { label: t("policyLinks.contact"), to: "/contact" as const },
  ];

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="fixed inset-0 -z-10 bg-[#050914]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 8%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 30%), radial-gradient(circle at 82% 14%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 32%), linear-gradient(180deg, rgba(5,9,20,0) 0%, #050914 68%)",
        }}
      />

      <header className="border-b border-white/10 bg-[#050914]/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={coinImg} alt="" className="h-9 w-9" width={36} height={36} />
            <span className="text-lg font-black tracking-tight">
              ImpactHope<span className="text-primary"> Network</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageThemeSwitcher />
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.045] px-4 py-2 text-sm font-semibold text-white/78 transition-colors hover:border-primary/45 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.home")}
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-[0.72fr_0.28fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/72">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/56">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.05] px-3 py-1.5 text-white/72">
              <BadgeCheck className="h-4 w-4 text-primary" />
              {t("common.updated")}: {updated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-white/72">
              <Shield className="h-4 w-4 text-primary" />
              {t("common.informativeDocument")}
            </span>
          </div>

          {notice ? (
            <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[.08] p-5 text-sm leading-relaxed text-white/82">
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
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
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
              {t("common.documents")}
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
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[.04] p-5 text-sm leading-relaxed text-white/70">
            {t("common.legalDisclaimer")}
          </div>
        </aside>
      </section>
    </main>
  );
}
