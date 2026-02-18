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
    const pageCache = "caches" in window ? await caches.open("app-pages") : null;
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          mode: "same-origin",
        });
        if (res.ok) {
          if (pageCache) {
            await pageCache.put(url, res.clone());
          }
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
    <section className="mx-auto w-full max-w-xl px-4 py-3">
      <div className="ui-card-soft">
        <p className="text-xs leading-relaxed text-muted">
          On Wi-Fi, cache all Umrah and Hajj steps so they work fully offline.
        </p>
        {status === "idle" && (
          <button type="button" onClick={run} className="ui-primary-btn mt-3 w-full">
            Prepare for offline
          </button>
        )}
        {status === "loading" && (
          <div className="mt-3 space-y-2">
            <div className="ui-progress">
              <span
                style={{
                  width: `${total ? (progress / total) * 100 : 0}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted tabular-nums">
              Caching {progress} of {total}
            </p>
          </div>
        )}
        {status === "done" && (
          <p className="mt-3 text-sm font-medium text-accent">
            Done. Reader pages are cached for offline use.
          </p>
        )}
        {status === "partial" && (
          <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
            Some pages failed to cache. Stay on Wi-Fi and run it again.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
            Something went wrong. Try again on a stable connection.
          </p>
        )}
      </div>
    </section>
  );
}
