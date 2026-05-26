import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
  head: () => ({
    meta: [
      { title: "Mercados - ImpactHope Network" },
      {
        name: "description",
        content:
          "Informacion sobre mercados, liquidez y disponibilidad prevista del token ImpactHope Network.",
      },
    ],
  }),
});

function MarketsPage() {
  return (
    <LegalPage
      eyebrow="Mercados"
      title="Disponibilidad del token y canales oficiales"
      description="Esta pagina centraliza los mercados previstos y el estado de disponibilidad del token IHN cuando existan canales oficiales."
      updated="26 de mayo de 2026"
      notice="No compres tokens desde enlaces no verificados. La disponibilidad oficial se publicara aqui cuando las integraciones esten confirmadas."
      sections={[
        {
          title: "Estado actual",
          body: [
            "El token IHN aun no muestra mercados activos en este sitio. Las tarjetas de exchanges de la pagina principal son referencias de canales posibles, no enlaces oficiales de compra.",
            "Cualquier listado, pool de liquidez o contrato debera validarse antes de publicarse como canal oficial.",
          ],
        },
        {
          title: "Mercados previstos",
          body: [
            "La hoja de ruta contempla evaluar DEX, CEX, liquidez inicial, transparencia de contrato y reportes de impacto antes de activar enlaces publicos.",
            "Cuando exista disponibilidad confirmada, esta pagina debera incluir enlaces directos al mercado, contrato, red, advertencias de riesgo y estado de liquidez.",
          ],
        },
        {
          title: "Alianzas y listados",
          body: [
            "Para conversaciones sobre listados, integraciones o proveedores de liquidez, escribe a partners@impacthopenetwork.org.",
          ],
        },
      ]}
    />
  );
}
