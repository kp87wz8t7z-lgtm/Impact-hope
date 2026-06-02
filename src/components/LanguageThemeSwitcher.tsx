import { Languages, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ACCENTS, useAccent, type AccentKey } from "@/contexts/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n, t } = useTranslation();
  const { accent, setAccent, config } = useAccent();

  const changeLang = (lng: "es" | "en") => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("ihn-lang", lng);
    } catch {
      /* ignore */
    }
  };

  const currentLng = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);

  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("common.language")}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.05] px-2.5 text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors hover:bg-white/[.10]"
        >
          <Languages className="h-3.5 w-3.5" />
          {currentLng}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px] border-white/10 bg-[#0a1322] text-white">
          <DropdownMenuLabel className="text-white/60">{t("common.language")}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={() => changeLang("es")}
            className="cursor-pointer focus:bg-white/10"
            data-active={currentLng === "es"}
          >
            🇪🇸 Español {currentLng === "es" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeLang("en")}
            className="cursor-pointer focus:bg-white/10"
          >
            🇬🇧 English {currentLng === "en" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("common.accent")}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[.05] text-white/80 transition-colors hover:bg-white/[.10]"
        >
          <span className="relative inline-flex h-3.5 w-3.5">
            <Palette className="h-3.5 w-3.5" />
            <span
              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-1 ring-[#050914]"
              style={{ backgroundColor: config.swatch }}
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px] border-white/10 bg-[#0a1322] text-white">
          <DropdownMenuLabel className="text-white/60">{t("common.accent")}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          {(Object.keys(ACCENTS) as AccentKey[]).map((k) => (
            <DropdownMenuItem
              key={k}
              onClick={() => setAccent(k)}
              className="cursor-pointer gap-2 focus:bg-white/10"
            >
              <span
                className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: ACCENTS[k].swatch }}
              />
              <span className="flex-1">{ACCENTS[k].label}</span>
              {accent === k && <span className="text-xs">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
