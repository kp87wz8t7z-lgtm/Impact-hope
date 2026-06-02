import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LegalPage } from "@/components/legal-page";
import i18n from "@/i18n";

type Section = { title: string; body: string[] };

export const Route = createFileRoute("/risk")({
  component: RiskPage,
  head: () => ({
    meta: [
      { title: i18n.t("legalPages.risk.meta.title") },
      { name: "description", content: i18n.t("legalPages.risk.meta.description") },
    ],
  }),
});

function RiskPage() {
  const { t } = useTranslation();
  const p = t("legalPages.risk", { returnObjects: true }) as {
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
