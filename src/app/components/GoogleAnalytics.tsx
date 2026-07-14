"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { consentChangedEvent, consentStorageKey } from "./CookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(consentStorageKey) === "accepted";
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const pagePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    const syncConsent = () => setEnabled(Boolean(measurementId) && hasAnalyticsConsent());

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener(consentChangedEvent, syncConsent);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(consentChangedEvent, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !scriptReady || !measurementId || typeof window.gtag !== "function") return;

    window.gtag("config", measurementId, {
      page_path: pagePath,
    });
  }, [enabled, pagePath, scriptReady]);

  if (!enabled || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="sakustack-google-analytics"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
}
