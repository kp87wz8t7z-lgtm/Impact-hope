import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Política de privacidad - ImpactHope Network" },
      {
        name: "description",
        content:
          "Política de privacidad de ImpactHope Network sobre datos personales, información técnica y transparencia blockchain.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad"
      title="Cómo protegemos y usamos la información"
      description="Esta política explica qué información puede recopilar ImpactHope Network, cómo se utiliza y qué límites existen cuando interactúas con tecnología blockchain."
      updated="26 de mayo de 2026"
      notice="Las transacciones blockchain pueden ser públicas e inmutables. La plataforma no controla redes descentralizadas, exploradores, wallets, exchanges ni servicios de terceros."
      sections={[
        {
          title: "Información que podemos recopilar",
          body: [
            "Podemos recopilar información personal limitada que nos entregues voluntariamente, como nombre, correo electrónico, organización, mensaje de contacto, preferencias de comunicación o datos necesarios para procesar solicitudes.",
            "También podemos recopilar información técnica básica, como dirección IP, tipo de navegador, dispositivo, páginas visitadas, fechas de acceso, métricas de uso y datos de seguridad necesarios para operar la plataforma.",
          ],
        },
        {
          title: "Uso de la información",
          body: [
            "Usamos la información para operar el sitio, responder mensajes, gestionar relaciones con usuarios y aliados, prevenir fraude, mejorar servicios, preparar reportes y cumplir obligaciones legales o regulatorias.",
            "Cuando exista una campaña, lista de espera, formulario de donación o proceso de verificación, la información puede utilizarse para confirmar identidad, elegibilidad, comunicaciones operativas y seguimiento de impacto.",
          ],
        },
        {
          title: "Transparencia blockchain",
          body: [
            "Las direcciones de wallet, hashes de transacciones, montos, redes utilizadas y otra información registrada en blockchain pueden ser visibles públicamente y permanecer disponibles de forma indefinida.",
            "ImpactHope Network no puede borrar, modificar ni ocultar datos que ya se hayan registrado en una red blockchain pública o en servicios de terceros que indexen esa información.",
          ],
        },
        {
          title: "Servicios de terceros",
          body: [
            "La plataforma puede depender de proveedores externos para hosting, analítica, pagos, comunicación, wallets, redes blockchain, verificación, seguridad u otros servicios operativos.",
            "Cada proveedor puede tener sus propias políticas de privacidad y términos. ImpactHope Network no controla sus prácticas, sistemas, disponibilidad ni decisiones independientes.",
          ],
        },
        {
          title: "Divulgación legal",
          body: [
            "Podemos divulgar información cuando sea requerido por ley, citación, autoridad competente, obligación regulatoria, proceso legal, prevención de fraude, protección de derechos o seguridad de usuarios.",
            "También podemos compartir información limitada con asesores profesionales, proveedores, aliados o instituciones cuando sea necesario para operar campañas, reportes, cumplimiento o administración del ecosistema.",
          ],
        },
        {
          title: "Seguridad",
          body: [
            "Aplicamos medidas razonables para proteger la información, pero ningún sistema digital es completamente seguro. Los usuarios aceptan riesgos inherentes a internet, blockchain, correo electrónico, wallets y servicios externos.",
            "Debes proteger tus dispositivos, claves privadas, frases semilla, contraseñas y cuentas. ImpactHope Network nunca debe recibir tu frase semilla ni claves privadas.",
          ],
        },
        {
          title: "Retención de datos",
          body: [
            "Conservamos información durante el tiempo necesario para operar la plataforma, cumplir obligaciones legales, resolver disputas, mantener registros financieros o responder solicitudes.",
            "Los periodos de retención pueden variar según el tipo de información, la ley aplicable, requisitos fiscales, auditorías, cumplimiento o necesidades legítimas de operación.",
          ],
        },
        {
          title: "Derechos de usuarios",
          body: [
            "Cuando la ley lo permita, puedes solicitar acceso, corrección, actualización o eliminación de datos personales controlados por ImpactHope Network.",
            "Algunas solicitudes pueden estar limitadas por obligaciones legales, registros necesarios, prevención de fraude o por la imposibilidad técnica de modificar datos publicados en blockchain.",
          ],
        },
      ]}
    />
  );
}
