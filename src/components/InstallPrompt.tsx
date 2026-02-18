"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [mode, setMode] = useState<"native" | "ios" | "manual">("manual");

  const DISMISS_KEY = "umrah-companion-install-dismissed";

  const isStandalone = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  };

  const getInstallMode = () => {
    if (typeof window === "undefined") return "manual" as const;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    if (isIOS) return "ios" as const;
    return "manual" as const;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem(DISMISS_KEY) || isStandalone()) {
      return;
    }

    setMode(getInstallMode());
    const fallbackTimer = window.setTimeout(() => {
      setShowPrompt(true);
    }, 1200);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setMode("native");
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setShowPrompt(false);
    if (outcome !== "accepted") {
      localStorage.setItem(DISMISS_KEY, "true");
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem(DISMISS_KEY, "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 safe-bottom">
      <div className="ui-card mx-auto max-w-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Add to Home Screen</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {mode === "native" &&
                "Install for quick access and offline use in the Haram."}
              {mode === "ios" &&
                "In Safari, tap Share then Add to Home Screen for offline access."}
              {mode === "manual" &&
                "Use your browser menu (Share or ⋮) then Add to Home Screen / Install app."}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={handleDismiss} className="ui-secondary-btn flex-1">
            Not Now
          </button>
          {mode === "native" ? (
            <button onClick={handleInstall} className="ui-primary-btn flex-1">
              Install
            </button>
          ) : (
            <button onClick={handleDismiss} className="ui-primary-btn flex-1">
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
