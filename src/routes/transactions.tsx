import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
  head: () => ({
    meta: [
      { title: "Transacciones - ImpactHope Network" },
      {
        name: "description",
        content: "Estado de transacciones, reportes y trazabilidad de ImpactHope Network.",
      },
    ],
  }),
});

function TransactionsPage() {
  return (
    <LegalPage
      eyebrow="Transacciones"
      title="Trazabilidad de aportes y actividad del ecosistema"
      description="Esta pagina concentra el estado previsto para transacciones, reportes on-chain y movimientos relacionados con impacto social."
      updated="26 de mayo de 2026"
      notice="La actividad publica del token y de donaciones se mostrara cuando los contratos, integraciones y fuentes verificables esten formalmente activos."
      sections={[
        {
          title: "Estado actual",
          body: [
            "ImpactHope Network se encuentra en fase de preparacion. Por ahora, los datos visibles del sitio parten desde cero para evitar simular actividad no verificada.",
            "Cuando existan contratos, wallets oficiales o procesadores activos, esta pagina debera enlazar a exploradores publicos y reportes verificables.",
          ],
        },
        {
          title: "Que se publicara",
          body: [
            "Se preve mostrar hash de transaccion, red, tipo de movimiento, monto, fecha, destino de impacto y estado de conciliacion.",
            "Los reportes se organizaran para que donantes, aliados y comunidad puedan revisar el flujo de fondos sin depender solo de declaraciones internas.",
          ],
        },
        {
          title: "Consultas",
          body: [
            "Si necesitas validar un aporte o conversar sobre integraciones de trazabilidad, escribe a contact@impacthopenetwork.org.",
          ],
        },
      ]}
    />
  );
}
