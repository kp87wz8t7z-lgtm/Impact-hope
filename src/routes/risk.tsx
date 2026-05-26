import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/risk")({
  component: RiskPage,
  head: () => ({
    meta: [
      { title: "Divulgación de riesgos - ImpactHope Network" },
      {
        name: "description",
        content:
          "Divulgación de riesgos sobre activos digitales, blockchain, regulación, liquidez y etapa temprana de ImpactHope Network.",
      },
    ],
  }),
});

function RiskPage() {
  return (
    <LegalPage
      eyebrow="Riesgos"
      title="Riesgos de activos digitales y proyectos en etapa temprana"
      description="Participar en ecosistemas blockchain implica riesgos significativos. Esta página resume riesgos materiales que todo usuario, donante, aliado o posible participante debe considerar."
      updated="26 de mayo de 2026"
      notice="Puedes perder la totalidad de cualquier valor aportado o asociado a activos digitales. Nada en esta plataforma elimina el riesgo de pérdida total."
      sections={[
        {
          title: "Riesgo de pérdida total",
          body: [
            "Los activos digitales pueden perder todo su valor por volatilidad, falta de adopción, fallas técnicas, cambios de mercado, restricciones regulatorias, ataques, errores operativos o pérdida de confianza.",
            "Ninguna información publicada por ImpactHope Network debe interpretarse como garantía de precio, liquidez, rendimiento, adopción, utilidad futura o preservación de capital.",
          ],
        },
        {
          title: "Incertidumbre regulatoria",
          body: [
            "Las leyes sobre blockchain, tokens, donaciones digitales, stablecoins, exchanges, valores, impuestos y protección al consumidor pueden cambiar rápidamente.",
            "Cambios regulatorios en Estados Unidos, New Jersey u otras jurisdicciones pueden afectar la legalidad, disponibilidad, estructura, uso, valor o continuidad de la plataforma.",
          ],
        },
        {
          title: "Riesgos de smart contracts y tecnología",
          body: [
            "Los smart contracts, wallets, bridges, oráculos, APIs y servicios técnicos pueden contener errores, vulnerabilidades, fallas de diseño o dependencias externas que provoquen pérdidas.",
            "Auditorías, pruebas o revisiones reducen ciertos riesgos, pero no garantizan seguridad absoluta ni ausencia de exploits.",
          ],
        },
        {
          title: "Riesgo de liquidez y mercado",
          body: [
            "Puede no existir mercado activo para comprar, vender o intercambiar tokens. La liquidez puede desaparecer, ser insuficiente o depender de terceros no controlados por ImpactHope Network.",
            "Precios, spreads, slippage, comisiones, congestión de red y disponibilidad de exchanges pueden afectar cualquier operación relacionada con activos digitales.",
          ],
        },
        {
          title: "Riesgo operativo",
          body: [
            "ImpactHope Network se encuentra en etapa temprana. El proyecto, roadmap, alianzas, funciones, campañas, uso de fondos, reportes o lanzamiento pueden retrasarse, modificarse o discontinuarse.",
            "La ejecución depende de recursos, proveedores, talento, cumplimiento legal, disponibilidad técnica, adopción comunitaria y condiciones de mercado.",
          ],
        },
        {
          title: "Riesgos de terceros",
          body: [
            "El ecosistema puede interactuar con wallets, procesadores de pago, redes blockchain, exchanges, proveedores de infraestructura, ONG, bancos o herramientas de comunicación.",
            "ImpactHope Network no controla los sistemas, políticas, tarifas, seguridad, decisiones, disponibilidad ni cumplimiento de terceros independientes.",
          ],
        },
        {
          title: "Riesgos de donación e impacto",
          body: [
            "Los fondos destinados a impacto social pueden estar sujetos a verificación, demoras, criterios de elegibilidad, cumplimiento, cambios de aliados o necesidades operativas.",
            "Los reportes de impacto pueden depender de información proporcionada por organizaciones aliadas, beneficiarios, proveedores o datos disponibles públicamente.",
          ],
        },
        {
          title: "Sin asesoría ni recomendación",
          body: [
            "ImpactHope Network no proporciona asesoría financiera, legal, fiscal ni de inversión. Cada usuario debe evaluar su situación, tolerancia al riesgo y obligaciones legales.",
            "Debes buscar asesoría independiente antes de participar en cualquier actividad relacionada con activos digitales, donaciones, inversiones o cumplimiento regulatorio.",
          ],
        },
      ]}
    />
  );
}
