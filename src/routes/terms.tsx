import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Términos de uso - ImpactHope Network" },
      {
        name: "description",
        content:
          "Términos de uso de ImpactHope Network para usuarios, donantes, aliados y participantes del ecosistema.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Términos de uso"
      title="Condiciones para participar en ImpactHope Network"
      description="Estos términos definen las reglas básicas para acceder al sitio, participar en el ecosistema y utilizar información relacionada con donaciones, activos digitales e impacto social."
      updated="26 de mayo de 2026"
      notice="Al acceder o utilizar esta plataforma, aceptas estos términos. Si no estás de acuerdo, debes dejar de usar el sitio y cualquier servicio relacionado."
      sections={[
        {
          title: "Aceptación de los términos",
          body: [
            "Al visitar, navegar o utilizar ImpactHope Network, aceptas quedar sujeto a estos términos, a la política de privacidad, a la divulgación de riesgos y a cualquier regla adicional publicada por la plataforma.",
            "ImpactHope Network puede actualizar estos términos cuando sea necesario por razones operativas, legales, regulatorias o de seguridad. El uso continuo de la plataforma después de una actualización implica aceptación de la versión vigente.",
          ],
        },
        {
          title: "Naturaleza del ecosistema",
          body: [
            "ImpactHope Network es una iniciativa fintech en etapa temprana que busca conectar tecnología blockchain, comunidad y causas benéficas verificables.",
            "Cualquier token, herramienta o funcionalidad digital relacionada con el ecosistema debe entenderse como parte de una propuesta de utilidad, participación y contribución social. No representa acciones, participación corporativa, valores, deuda, contrato de inversión ni derecho automático a retornos financieros.",
          ],
        },
        {
          title: "No asesoría financiera",
          body: [
            "La información publicada en este sitio no constituye asesoría financiera, legal, fiscal, contable ni de inversión. Ningún contenido debe interpretarse como recomendación para comprar, vender, mantener o intercambiar activos digitales.",
            "Los usuarios deben consultar asesores profesionales calificados antes de tomar decisiones relacionadas con criptomonedas, donaciones, inversiones, impuestos o cumplimiento regulatorio.",
          ],
        },
        {
          title: "Cumplimiento y restricciones",
          body: [
            "Cada usuario es responsable de cumplir con las leyes aplicables en su jurisdicción, incluyendo normas de Estados Unidos, reglas contra lavado de dinero, sanciones, impuestos, protección al consumidor y regulación de activos digitales.",
            "ImpactHope Network puede restringir, suspender o terminar el acceso a usuarios, ubicaciones o actividades cuando exista riesgo legal, operativo, reputacional, regulatorio o de seguridad.",
          ],
        },
        {
          title: "Responsabilidades del usuario",
          body: [
            "Los usuarios son responsables de sus decisiones, de la seguridad de sus billeteras, claves privadas, dispositivos, cuentas, contraseñas y conexiones a servicios de terceros.",
            "No debes utilizar la plataforma para fraude, abuso, lavado de dinero, evasión de sanciones, actividades ilegales, manipulación de mercado, suplantación de identidad o cualquier conducta que afecte a usuarios, aliados o beneficiarios.",
          ],
        },
        {
          title: "Riesgos de blockchain",
          body: [
            "Las transacciones blockchain pueden ser públicas, irreversibles e inmutables. ImpactHope Network no puede revertir transacciones confirmadas ni recuperar activos enviados a direcciones incorrectas.",
            "La plataforma no será responsable por pérdidas derivadas de volatilidad, errores de usuario, fallas de red, servicios de terceros, wallets, exchanges, smart contracts, ataques, demoras o cambios regulatorios.",
          ],
        },
        {
          title: "Fondos de impacto social",
          body: [
            "Cuando existan fondos destinados a impacto social, ImpactHope Network procurará separarlos de fondos operativos y comunicar criterios, avances, beneficiarios y reportes de manera clara.",
            "La distribución de fondos puede estar sujeta a verificación, hitos, disponibilidad operativa, requisitos de cumplimiento, debida diligencia de organizaciones aliadas y revisión documental.",
          ],
        },
        {
          title: "Limitación de responsabilidad",
          body: [
            "En la máxima medida permitida por la ley, ImpactHope Network no será responsable por daños indirectos, incidentales, especiales, punitivos, pérdida de fondos, datos, acceso, ganancias, oportunidades o reputación.",
            "El sitio y su contenido se proporcionan tal como están disponibles, sin garantías de funcionamiento continuo, ausencia de errores, disponibilidad de mercado, adopción futura o resultados específicos.",
          ],
        },
        {
          title: "Indemnización y terminación",
          body: [
            "Aceptas mantener indemne a ImpactHope Network, sus fundadores, colaboradores, aliados y proveedores frente a reclamos derivados de tu uso indebido de la plataforma, incumplimiento legal o violación de estos términos.",
            "ImpactHope Network puede modificar, suspender o discontinuar funcionalidades, campañas, accesos o comunicaciones en cualquier momento por razones estratégicas, técnicas, legales o de riesgo.",
          ],
        },
        {
          title: "Ley aplicable",
          body: [
            "Estos términos se interpretan bajo leyes de Estados Unidos y, cuando corresponda, del Estado de New Jersey, sin perjuicio de normas obligatorias aplicables en otras jurisdicciones.",
            "Cualquier disputa deberá tratarse primero mediante comunicación directa y de buena fe con ImpactHope Network antes de iniciar procesos formales.",
          ],
        },
      ]}
    />
  );
}
