## Auditoría UX/UI profesional — ImpactHope Network

Voy a hacer una auditoría completa y luego refactorizar por fases priorizadas. El home (`index.tsx`) tiene 1.625 líneas con todo mezclado — esa es la causa raíz de la mayoría de problemas visuales y de mantenibilidad.

### Fase 0 — Diagnóstico (lo que voy a auditar)

**Arquitectura de código**
- `index.tsx` monolítico de 1.625 líneas → secciones imposibles de iterar de forma aislada
- Importaciones desde `../../references/` (carpeta de assets de referencia, no del bundle) → riesgo de build
- Mezcla de tokens de color hardcoded vs `src/styles.css`

**Jerarquía visual & tipografía**
- Escala tipográfica inconsistente (h1/h2/h3 sin ritmo claro)
- Densidad de texto desigual entre secciones
- Contraste de `text-muted-foreground` sobre fondos oscuros con gradiente

**Layout & spacing**
- Padding vertical entre secciones no sigue una escala (4xl/5xl/6xl mezclados)
- Grids que rompen en breakpoints intermedios (768–1024)
- Hero con orbit nodes posicionados en `%` → se solapan en viewport actual (1066px)

**Componentes & consistencia**
- Botones con estilos inline en vez de variantes shadcn
- Cards sin sistema (algunas con borde, otras con glow, otras sin nada)
- Iconografía coherente (lucide ✓) pero tamaños sin token

**Accesibilidad**
- Botones-icono sin `aria-label`
- Contraste de oro sobre púrpura translúcido < AA en varios sitios
- Single `<main>` por ruta — verificar
- Foco visible en CTAs

**Estados & motion**
- Countups que disparan repetidamente (visto en session replay: 60+ updates de "0")
- `IntersectionObserver` sin `unobserve` después de trigger
- Reduced-motion respetado en algunos sitios, no en todos

**Mobile / responsive**
- Hero map / world map sin breakpoint mobile
- Donation form de 4 columnas no degrada bien <768
- Roadmap horizontal — sin scroll horizontal explícito en mobile

### Fase 1 — Refactor arquitectónico (sin cambio visual)
1. Romper `index.tsx` en componentes por sección: `<Hero/>`, `<HowItWorks/>`, `<Metrics/>`, `<Tokenomics/>`, `<Transactions/>`, `<ImpactMap/>`, `<Roadmap/>`, `<Donate/>`, `<Footer/>` en `src/components/landing/`
2. Mover assets de `references/` a `src/assets/` (o eliminar si no se usan)
3. Extraer hook `useRevealOnScroll` y `useCountUp` con cleanup correcto

### Fase 2 — Sistema de diseño (tokens)
1. Añadir escala tipográfica fluida (`--text-display`, `--text-h1`...`--text-body`) con `clamp()`
2. Escala de spacing semántica (`--section-y`, `--container-x`)
3. Variantes de Card: `card-glass`, `card-elevated`, `card-outline`
4. Tokens de gradiente y glow centralizados

### Fase 3 — Polish visual por sección
Orden: Hero → Métricas → Cómo funciona → Tokenomics → Transacciones → Mapa → Roadmap → Donar → Footer
Cada una: jerarquía, spacing, contraste, hover/focus, responsive 375/768/1024/1440.

### Fase 4 — Accesibilidad & performance
- `aria-label` en todos los icon-only
- `prefers-reduced-motion` global
- Lazy-load de imágenes pesadas (`world map.png`, hero)
- Fix de countups (unobserve después del primer trigger)

---

### Cómo quieres que proceda

Esto es trabajo grande. Tres opciones:

**A) Auditoría completa + plan detallado primero** (1 turno): te entrego el informe con screenshots y prioridades, y tú decides qué refactorizar.

**B) Refactor por fases, empezando ya** (varios turnos): arranco con Fase 1 (split arquitectónico) + Fase 2 (tokens) en este turno, y seguimos sección por sección.

**C) Solo polish visual** (saltar refactor de código): voy sección por sección mejorando jerarquía, spacing y responsive sin tocar la arquitectura.

¿Cuál prefieres? Mi recomendación es **B** — sin romper el monolito primero, cualquier polish visual va a ser frágil y difícil de iterar.
