"use client";

import { Dua, FONT_SIZE_CLASSES } from "@/lib/types";

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

  return (
    <div className="w-full px-4 py-6">
      {index !== undefined && total !== undefined && total > 1 && (
        <p className="text-xs text-muted text-center mb-4 font-sans">
          Dua {index + 1} of {total}
        </p>
      )}

      {/* Arabic Text */}
      <div className="mb-6">
        <p
          className={`arabic-text font-arabic ${arabicSizeClass} text-foreground leading-relaxed`}
          dir="rtl"
          lang="ar"
        >
          {dua.arabic}
        </p>
      </div>

      {/* Transliteration */}
      {showTransliteration && dua.transliteration && (
        <div className="mb-4">
          <p className="text-base text-foreground/80 text-center italic leading-relaxed font-sans">
            {dua.transliteration}
          </p>
        </div>
      )}

      {/* Translation */}
      {showTranslation && dua.translation && (
        <div className="mb-4">
          <p className="text-sm text-foreground/70 text-center leading-relaxed font-sans">
            {dua.translation}
          </p>
        </div>
      )}

      {/* Reference */}
      {dua.reference && (
        <div className="mt-4">
          <p className="text-xs text-muted text-center font-sans">
            {dua.reference}
          </p>
        </div>
      )}

      {/* Note */}
      {dua.note && (
        <div className="mt-3 mx-auto max-w-sm">
          <p className="text-xs text-accent text-center leading-relaxed font-sans bg-accent/5 rounded-lg px-3 py-2">
            {dua.note}
          </p>
        </div>
      )}
    </div>
  );
}
