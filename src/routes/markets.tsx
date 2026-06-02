import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LegalPage } from "@/components/legal-page";
import i18n from "@/i18n";

type Section = { title: string; body: string[] };

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
  head: () => ({
    meta: [
      { title: i18n.t("legalPages.markets.meta.title") },
      { name: "description", content: i18n.t("legalPages.markets.meta.description") },
    ],
  }),
});

function MarketsPage() {
  const { t } = useTranslation();
  const p = t("legalPages.markets", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    description: string;
    updated: string;
    notice: string;
    sections: Section[];
  };
  return (
    <LegalPage
      eyebrow={p.eyebrow}
      title={p.title}
      description={p.description}
      updated={p.updated}
      notice={p.notice}
      sections={p.sections}
    />
  );
}
