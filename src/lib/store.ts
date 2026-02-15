"use client";

import {
  UserPreferences,
  DEFAULT_PREFERENCES,
  PersonalDua,
} from "./types";

const PREFS_KEY = "dua-nexus-preferences";
const PERSONAL_DUAS_KEY = "dua-nexus-personal-duas";

// --- Preferences ---

export function getPreferences(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_PREFERENCES;
}

export function savePreferences(prefs: Partial<UserPreferences>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

// --- Personal Duas ---

export function getPersonalDuas(): PersonalDua[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(PERSONAL_DUAS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export function savePersonalDua(dua: PersonalDua): void {
  if (typeof window === "undefined") return;
  try {
    const duas = getPersonalDuas();
    const existingIndex = duas.findIndex((d) => d.id === dua.id);
    if (existingIndex >= 0) {
      duas[existingIndex] = dua;
    } else {
      duas.push(dua);
    }
    localStorage.setItem(PERSONAL_DUAS_KEY, JSON.stringify(duas));
  } catch {
    // ignore
  }
}

export function deletePersonalDua(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const duas = getPersonalDuas().filter((d) => d.id !== id);
    localStorage.setItem(PERSONAL_DUAS_KEY, JSON.stringify(duas));
  } catch {
    // ignore
  }
}

export function reorderPersonalDuas(duaIds: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const duas = getPersonalDuas();
    const ordered = duaIds
      .map((id) => duas.find((d) => d.id === id))
      .filter(Boolean) as PersonalDua[];
    localStorage.setItem(PERSONAL_DUAS_KEY, JSON.stringify(ordered));
  } catch {
    // ignore
  }
}
