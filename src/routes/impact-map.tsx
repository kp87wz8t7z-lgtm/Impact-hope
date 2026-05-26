import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/impact-map")({
  component: ImpactMapPage,
  head: () => ({
    meta: [
      { title: "Mapa de impacto - ImpactHope Network" },
      {
        name: "description",
        content:
          "Mapa previsto de causas, alianzas e iniciativas de impacto social de ImpactHope Network.",
      },
    ],
  }),
});

function ImpactMapPage() {
  return (
    <LegalPage
      eyebrow="Mapa de impacto"
      title="Causas, aliados y comunidades beneficiadas"
      description="Este espacio servira como mapa publico de proyectos, regiones, organizaciones aliadas y resultados medibles del ecosistema."
      updated="26 de mayo de 2026"
      notice="Los puntos de impacto se publicaran solo cuando existan aliados validados, permisos correspondientes y reportes verificables."
      sections={[
        {
          title: "Proposito del mapa",
          body: [
            "El mapa de impacto debe ayudar a visualizar donde se destinan recursos, que organizaciones participan y que resultados se reportan por region.",
            "La prioridad es evitar afirmaciones prematuras: cada ubicacion debera respaldarse con documentacion, acuerdos o reportes publicables.",
          ],
        },
        {
          title: "Datos previstos",
          body: [
            "Cada proyecto podra incluir pais, categoria de causa, organizacion responsable, monto asignado, fecha, evidencia, metrica de resultado y estado de seguimiento.",
            "Las categorias iniciales previstas incluyen educacion, alimentacion, agua, salud, comunidad y medio ambiente.",
          ],
        },
        {
          title: "Organizaciones interesadas",
          body: [
            "Las ONG o instituciones que quieran participar pueden escribir a partners@impacthopenetwork.org con informacion institucional, pais de operacion y necesidades actuales.",
          ],
        },
      ]}
    />
  );
}
