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
    <div className="min-h-dvh bg-background">
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
              className="ui-icon-btn bg-accent text-white border-accent"
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
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="ui-card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
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
            <h2 className="text-lg font-semibold text-foreground">No personal duas yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Add your own duas, family requests, or personal supplications.
              They are formatted in the same clear, readable style.
            </p>
            <button onClick={() => setShowForm(true)} className="ui-primary-btn mt-6">
              Add Your First Dua
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-xl space-y-3 px-4 py-4 pb-12">
          {duas.map((dua) => (
            <div key={dua.id} className="ui-card-soft p-0">
              <div className="px-4 pt-4">
                <h3 className="text-sm font-semibold text-foreground">{dua.title}</h3>
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
                <button onClick={() => handleEdit(dua)} className="ui-secondary-btn text-xs">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dua.id)}
                  className="ui-secondary-btn border-rose-300 bg-rose-50 text-rose-700 text-xs dark:bg-rose-900/20 dark:border-rose-700 dark:text-rose-200"
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
