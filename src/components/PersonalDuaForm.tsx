"use client";

import { useState } from "react";
import { PersonalDua } from "@/lib/types";

interface PersonalDuaFormProps {
  onSave: (dua: PersonalDua) => void;
  onCancel: () => void;
  initialDua?: PersonalDua;
}

export default function PersonalDuaForm({
  onSave,
  onCancel,
  initialDua,
}: PersonalDuaFormProps) {
  const [title, setTitle] = useState(initialDua?.title || "");
  const [arabic, setArabic] = useState(initialDua?.arabic || "");
  const [transliteration, setTransliteration] = useState(
    initialDua?.transliteration || ""
  );
  const [translation, setTranslation] = useState(
    initialDua?.translation || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dua: PersonalDua = {
      id: initialDua?.id || `personal-${Date.now()}`,
      title: title.trim(),
      arabic: arabic.trim() || undefined,
      transliteration: transliteration.trim() || undefined,
      translation: translation.trim() || undefined,
      createdAt: initialDua?.createdAt || Date.now(),
    };

    onSave(dua);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-foreground mb-1 font-sans"
        >
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., For my parents"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base font-sans focus:outline-none focus:ring-2 focus:ring-accent/50"
          required
        />
      </div>

      <div>
        <label
          htmlFor="arabic"
          className="block text-sm font-semibold text-foreground mb-1 font-sans"
        >
          Arabic Text
        </label>
        <textarea
          id="arabic"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          placeholder="Paste Arabic text here..."
          dir="rtl"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-lg font-arabic focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[100px]"
        />
      </div>

      <div>
        <label
          htmlFor="transliteration"
          className="block text-sm font-semibold text-foreground mb-1 font-sans"
        >
          Transliteration
        </label>
        <textarea
          id="transliteration"
          value={transliteration}
          onChange={(e) => setTransliteration(e.target.value)}
          placeholder="e.g., Rabbana aatina fid-dunya..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base font-sans italic focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[80px]"
        />
      </div>

      <div>
        <label
          htmlFor="translation"
          className="block text-sm font-semibold text-foreground mb-1 font-sans"
        >
          Translation / Meaning
        </label>
        <textarea
          id="translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          placeholder="English translation or meaning..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base font-sans focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[80px]"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="touch-btn flex-1 rounded-xl bg-foreground/5 text-foreground font-sans"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="touch-btn flex-1 rounded-xl bg-accent text-white font-sans"
        >
          {initialDua ? "Update" : "Add Dua"}
        </button>
      </div>
    </form>
  );
}
