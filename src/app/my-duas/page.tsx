"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import PersonalDuaForm from "@/components/PersonalDuaForm";
import { usePreferences } from "@/hooks/usePreferences";
import { PersonalDua } from "@/lib/types";
import {
  getPersonalDuas,
  savePersonalDua,
  deletePersonalDua,
} from "@/lib/store";

export default function MyDuasPage() {
  const { prefs } = usePreferences();
  const [duas, setDuas] = useState<PersonalDua[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDua, setEditingDua] = useState<PersonalDua | undefined>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDuas(getPersonalDuas());
    setLoaded(true);
  }, []);

  const handleSave = (dua: PersonalDua) => {
    savePersonalDua(dua);
    setDuas(getPersonalDuas());
    setShowForm(false);
    setEditingDua(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this dua?")) {
      deletePersonalDua(id);
      setDuas(getPersonalDuas());
    }
  };

  const handleEdit = (dua: PersonalDua) => {
    setEditingDua(dua);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="My Personal Duas"
        subtitle="أدعيتي الخاصة"
        backHref="/"
        rightElement={
          !showForm ? (
            <button
              onClick={() => {
                setEditingDua(undefined);
                setShowForm(true);
              }}
              className="touch-btn w-10 h-10 min-h-0 min-w-0 rounded-lg bg-accent text-white"
              aria-label="Add new dua"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          ) : undefined
        }
      />

      {showForm ? (
        <PersonalDuaForm
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingDua(undefined);
          }}
          initialDua={editingDua}
        />
      ) : loaded && duas.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-foreground font-sans">
            No personal duas yet
          </h2>
          <p className="text-sm text-muted mt-2 max-w-xs font-sans">
            Add your own duas, family requests, or personal supplications. They
            will be formatted in the same clear, readable style.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="touch-btn mt-6 px-8 rounded-xl bg-accent text-white font-sans"
          >
            Add Your First Dua
          </button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {duas.map((dua) => (
            <div key={dua.id} className="relative">
              <div className="px-4 pt-4 pb-1">
                <h3 className="text-sm font-bold text-foreground font-sans">
                  {dua.title}
                </h3>
              </div>
              <DuaCard
                dua={{
                  id: dua.id,
                  arabic: dua.arabic || "",
                  transliteration: dua.transliteration || "",
                  translation: dua.translation || "",
                }}
                fontSizeLevel={prefs.fontSizeLevel}
                showTransliteration={prefs.showTransliteration}
                showTranslation={prefs.showTranslation}
              />
              <div className="flex gap-2 px-4 pb-4">
                <button
                  onClick={() => handleEdit(dua)}
                  className="text-xs text-accent font-semibold px-3 py-1.5 rounded-lg bg-accent/5 font-sans"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dua.id)}
                  className="text-xs text-red-600 font-semibold px-3 py-1.5 rounded-lg bg-red-50 font-sans"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
