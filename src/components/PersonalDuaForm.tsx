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
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 px-4 py-4">
      <div className="ui-card-soft">
        <label htmlFor="title" className="mb-1 block text-sm font-semibold text-foreground">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., For my parents"
          className="ui-input"
          required
        />
      </div>

      <div className="ui-card-soft">
        <label htmlFor="arabic" className="mb-1 block text-sm font-semibold text-foreground">
          Arabic Text
        </label>
        <textarea
          id="arabic"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          placeholder="Paste Arabic text here..."
          dir="rtl"
          className="ui-input min-h-[110px] font-arabic text-lg"
        />
      </div>

      <div className="ui-card-soft">
        <label htmlFor="transliteration" className="mb-1 block text-sm font-semibold text-foreground">
          Transliteration
        </label>
        <textarea
          id="transliteration"
          value={transliteration}
          onChange={(e) => setTransliteration(e.target.value)}
          placeholder="e.g., Rabbana aatina fid-dunya..."
          className="ui-input min-h-[90px] italic"
        />
      </div>

      <div className="ui-card-soft">
        <label htmlFor="translation" className="mb-1 block text-sm font-semibold text-foreground">
          Translation / Meaning
        </label>
        <textarea
          id="translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          placeholder="English translation or meaning..."
          className="ui-input min-h-[90px]"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel} className="ui-secondary-btn flex-1">
          Cancel
        </button>
        <button type="submit" className="ui-primary-btn flex-1">
          {initialDua ? "Update" : "Add Dua"}
        </button>
      </div>
    </form>
  );
}
