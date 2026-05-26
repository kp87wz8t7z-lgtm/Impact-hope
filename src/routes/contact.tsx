import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contacto - ImpactHope Network" },
      {
        name: "description",
        content:
          "Contacto de ImpactHope Network para aliados, donantes, organizaciones e interesados en el ecosistema.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contacto"
      title="Conversemos sobre impacto, alianzas y comunidad"
      description="Usa esta página para orientar consultas sobre donaciones, alianzas con ONG, participación comunitaria, cumplimiento o información general del proyecto."
      updated="26 de mayo de 2026"
      notice="No envíes claves privadas, frases semilla, documentos sensibles o información financiera confidencial por formularios o correo electrónico no solicitado."
      sections={[
        {
          title: "Consultas generales",
          body: [
            "Para preguntas sobre la plataforma, contenido del sitio, comunidad o próximos pasos del proyecto, escribe a contact@impacthopenetwork.org.",
            "Incluye tu nombre, organización si aplica, país, motivo de contacto y una descripción breve de tu solicitud para poder responder con mayor precisión.",
          ],
        },
        {
          title: "Alianzas con ONG e instituciones",
          body: [
            "Las organizaciones interesadas en colaborar pueden compartir información sobre su misión, país de operación, población beneficiaria, necesidades actuales, documentación institucional y capacidad de reportar impacto.",
            "Las alianzas estarán sujetas a revisión, criterios de elegibilidad, debida diligencia, disponibilidad de campañas y acuerdos escritos cuando corresponda.",
          ],
        },
        {
          title: "Donantes y comunidad",
          body: [
            "Las consultas sobre donaciones, métodos de pago, trazabilidad, reportes o campañas específicas deben incluir el monto aproximado, método preferido y causa de interés.",
            "ImpactHope Network procurará comunicar de forma clara cómo se registran, separan y reportan las contribuciones destinadas a impacto social.",
          ],
        },
        {
          title: "Cumplimiento y asuntos legales",
          body: [
            "Para solicitudes relacionadas con privacidad, derechos de datos, cumplimiento, reportes de abuso, propiedad intelectual o asuntos legales, escribe a legal@impacthopenetwork.org.",
            "Las solicitudes legales pueden requerir verificación de identidad, documentación adicional y tiempo de revisión según la complejidad del caso.",
          ],
        },
        {
          title: "Canales previstos",
          body: [
            "Correo general: contact@impacthopenetwork.org. Asuntos legales y privacidad: legal@impacthopenetwork.org. Alianzas: partners@impacthopenetwork.org.",
            "Estos canales son referencias operativas del sitio y pueden actualizarse cuando se formalicen dominios, herramientas de soporte o sistemas de atención.",
          ],
        },
      ]}
    />
  );
}
