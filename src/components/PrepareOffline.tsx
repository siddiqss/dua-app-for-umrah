"use client";

import { useState, useCallback } from "react";
import umrahData from "@/data/umrah.json";
import hajjData from "@/data/hajj.json";

function getOfflineUrls(): string[] {
  const urls: string[] = ["/umrah", "/hajj", "/my-duas", "/settings"];
  for (let i = 0; i < umrahData.length; i++) {
    urls.push(`/umrah/${i}`);
  }
  (hajjData as { steps: unknown[] }[]).forEach((day, dayIndex) => {
    day.steps.forEach((_, stepIndex) => {
      urls.push(`/hajj/${dayIndex}/${stepIndex}`);
    });
  });
  return urls;
}

export default function PrepareOffline() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "done" | "partial" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const run = useCallback(async () => {
    const urls = getOfflineUrls();
    setTotal(urls.length);
    setStatus("loading");
    setProgress(0);

    let done = 0;
    let successCount = 0;
    for (const url of urls) {
      try {
        const res = await fetch(url, { mode: "same-origin" });
        if (res.ok) {
          successCount++;
        }
      } catch {
        // ignore single failure
      }
      done++;
      setProgress(done);
    }

    if (successCount === urls.length) {
      setStatus("done");
      return;
    }
    if (successCount > 0) {
      setStatus("partial");
      return;
    }
    setStatus("error");
  }, []);

  return (
    <div className="px-4 py-3 border-t border-border">
      <p className="text-xs text-muted mb-2 font-sans">
        On Wi‑Fi, tap below to cache all Umrah and Hajj steps so they work
        offline.
      </p>
      {status === "idle" && (
        <button
          type="button"
          onClick={run}
          className="touch-btn w-full rounded-xl bg-foreground/5 text-foreground font-sans text-sm font-semibold"
        >
          Prepare for offline
        </button>
      )}
      {status === "loading" && (
        <div className="space-y-2">
          <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{
                width: `${total ? (progress / total) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted font-sans">
            Caching {progress} of {total}…
          </p>
        </div>
      )}
      {status === "done" && (
        <p className="text-sm text-accent font-sans font-medium">
          Done. Reader pages are cached for offline use.
        </p>
      )}
      {status === "partial" && (
        <p className="text-sm text-amber-600 font-sans">
          Some pages failed to cache. Stay on Wi‑Fi and run it again.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-sans">
          Something went wrong. Try again on a stable connection.
        </p>
      )}
    </div>
  );
}
