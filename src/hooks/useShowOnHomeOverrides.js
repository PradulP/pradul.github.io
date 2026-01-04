// src/hooks/useShowOnHomeOverrides.js
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ludarp_showOnHome_overrides";

export default function useShowOnHomeOverrides() {
  const [overrides, setOverrides] = useState(() => {
    try {
      if (typeof window === "undefined") return {};
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Failed to read showOnHome overrides:", e);
      return {};
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
      }
    } catch (e) {
      console.error("Failed to write showOnHome overrides:", e);
    }
  }, [overrides]);

  const setOverride = useCallback((id, value) => {
    setOverrides((prev) => {
      const next = { ...prev };
      if (value === null || value === undefined) {
        delete next[id];
      } else {
        next[id] = !!value;
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setOverrides({});
    try {
      if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear overrides:", e);
    }
  }, []);

  return { overrides, setOverride, clearAll };
}
