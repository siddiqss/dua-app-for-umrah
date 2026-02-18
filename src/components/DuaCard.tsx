"use client";

import { Dua, FONT_SIZE_CLASSES } from "@/lib/types";
import { getReferenceStrength } from "@/lib/reference";

interface DuaCardProps {
  dua: Dua;
  fontSizeLevel: number;
  showTransliteration: boolean;
  showTranslation: boolean;
  index?: number;
  total?: number;
}

export default function DuaCard({
  dua,
  fontSizeLevel,
  showTransliteration,
  showTranslation,
  index,
  total,
}: DuaCardProps) {
  const arabicSizeClass = FONT_SIZE_CLASSES[fontSizeLevel] || "text-arabic-base";
  const referenceStrength = getReferenceStrength(dua.reference);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-5">
      {index !== undefined && total !== undefined && total > 1 && (
        <p className="mb-4 text-center text-xs text-muted tabular-nums">
          Dua {index + 1} of {total}
        </p>
      )}

      <div className="ui-card">
        <div className="mb-5">
          <p
            className={`arabic-text font-arabic ${arabicSizeClass} text-foreground`}
            dir="rtl"
            lang="ar"
          >
            {dua.arabic}
          </p>
        </div>

        {showTransliteration && dua.transliteration && (
          <div className="mb-4">
            <p className="text-center text-base italic leading-relaxed text-foreground/85">
              {dua.transliteration}
            </p>
          </div>
        )}

        {showTranslation && dua.translation && (
          <div className="mb-4">
            <p className="text-center text-sm leading-relaxed text-muted">{dua.translation}</p>
          </div>
        )}

        {dua.reference && (
          <div className="mt-3">
            <div className="mb-2 flex justify-center">
              <span className={`ui-chip ${referenceStrength === "verified" ? "ui-chip-active" : ""}`}>
                {referenceStrength === "verified" ? "Quran/Sahih Source" : "Reported Source"}
              </span>
            </div>
            <p className="text-center text-xs text-muted">{dua.reference}</p>
          </div>
        )}

        {dua.note && (
          <div className="mx-auto mt-3 max-w-sm">
            <p className="ui-note text-center">{dua.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
