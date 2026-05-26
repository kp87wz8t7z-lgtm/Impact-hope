import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/legal")({
  component: LegalNoticePage,
  head: () => ({
    meta: [
      { title: "Aviso legal - ImpactHope Network" },
      {
        name: "description",
        content:
          "Aviso legal de ImpactHope Network sobre información del sitio, etapa temprana, activos digitales, impacto social y cumplimiento.",
      },
    ],
  }),
});

function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Aviso legal"
      title="Información legal y límites de responsabilidad"
      description="Este aviso explica el alcance informativo del sitio, la etapa actual del proyecto y las precauciones necesarias para usuarios, aliados, donantes e interesados."
      updated="26 de mayo de 2026"
      notice="ImpactHope Network está en etapa inicial de desarrollo. La información del sitio puede cambiar conforme avancen la estructura legal, el producto, las alianzas, la tecnología y el cumplimiento regulatorio."
      sections={[
        {
          title: "Propósito informativo",
          body: [
            "El contenido publicado en ImpactHope Network tiene fines informativos, educativos y comerciales generales. No constituye una oferta formal de valores, solicitud de inversión, asesoría financiera, asesoría legal ni recomendación fiscal.",
            "Cualquier presentación, cifra, roadmap, métrica o documento debe entenderse como información preliminar sujeta a validación, revisión profesional y cambios operativos.",
          ],
        },
        {
          title: "Etapa del proyecto",
          body: [
            "ImpactHope Network nace con la visión de conectar inversión digital, comunidad y causas benéficas mediante tecnología blockchain y reportes de impacto.",
            "El proyecto se encuentra en fase de estructuración, validación de marca, preparación documental, desarrollo comunitario, diseño de alianzas y análisis legal antes de cualquier lanzamiento formal.",
          ],
        },
        {
          title: "No promesa de retornos",
          body: [
            "ImpactHope Network no promete retornos financieros, ganancias, apreciación de precio, liquidez, adopción futura, acceso a exchanges ni resultados específicos.",
            "Cualquier referencia a potencial comunitario, oportunidad de mercado, crecimiento, roadmap o uso de fondos es una estimación estratégica, no una garantía de desempeño.",
          ],
        },
        {
          title: "Separación de fondos",
          body: [
            "La credibilidad del ecosistema depende de separar claramente fondos operativos, contribuciones benéficas, ingresos potenciales, costos administrativos y campañas de impacto.",
            "Cuando existan campañas o fondos de impacto, la plataforma procurará comunicar criterios, instituciones apoyadas, avances y reportes de forma transparente y trazable.",
          ],
        },
        {
          title: "Uso de documentos y materiales",
          body: [
            "Los documentos, imágenes, textos, diseños, marcas, logotipos y materiales del sitio pertenecen a ImpactHope Network o se utilizan bajo permisos, licencias o referencias internas del proyecto.",
            "No puedes copiar, modificar, distribuir, vender, explotar o presentar estos materiales como propios sin autorización por escrito.",
          ],
        },
        {
          title: "Alianzas y terceros",
          body: [
            "Cualquier mención de ONG, proveedores, redes blockchain, procesadores, instituciones o servicios externos no implica patrocinio, aprobación, sociedad formal o garantía, salvo que se indique expresamente.",
            "Las alianzas, criterios de donación y procesos de verificación pueden requerir acuerdos escritos, debida diligencia y revisión legal antes de hacerse efectivos.",
          ],
        },
        {
          title: "Cumplimiento profesional",
          body: [
            "Antes de lanzar formalmente un token, aceptar fondos, publicar condiciones definitivas o cerrar acuerdos, ImpactHope Network debe consultar profesionales legales, financieros, fiscales y de cumplimiento.",
            "Los usuarios, posibles inversores y aliados también deben realizar su propia evaluación independiente y no depender exclusivamente del contenido de este sitio.",
          ],
        },
        {
          title: "Cambios en la información",
          body: [
            "ImpactHope Network puede corregir, actualizar, retirar o modificar información del sitio sin previo aviso cuando sea necesario por precisión, estrategia, cumplimiento, seguridad o cambios del proyecto.",
            "La disponibilidad del sitio o de cualquier funcionalidad no está garantizada y puede suspenderse por mantenimiento, seguridad, proveedores, regulaciones o decisiones internas.",
          ],
        },
      ]}
    />
  );
}
