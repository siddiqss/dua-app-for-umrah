"use client";

import { useState, useEffect, useCallback } from "react";
import { UserPreferences, DEFAULT_PREFERENCES } from "@/lib/types";
import { getPreferences, savePreferences } from "@/lib/store";

export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPrefs(getPreferences());
    setLoaded(true);
  }, []);

  const updatePrefs = useCallback(
    (updates: Partial<UserPreferences>) => {
      const updated = { ...prefs, ...updates };
      setPrefs(updated);
      savePreferences(updates);
    },
    [prefs]
  );

  return { prefs, updatePrefs, loaded };
}
