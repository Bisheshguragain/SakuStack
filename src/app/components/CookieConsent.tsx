"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "../page.module.css";

export const consentStorageKey = "sakustack-cookie-consent-v1";
export const consentChangedEvent = "sakustack-cookie-consent-changed";

type ConsentChoice = "accepted" | "rejected";
type ConsentState = ConsentChoice | "unknown" | null;

export default function CookieConsent() {
  const [choice, setChoice] = useState<ConsentState>("unknown");

  useEffect(() => {
    const checkConsent = () => {
      const savedChoice = window.localStorage.getItem(consentStorageKey) as ConsentChoice | null;
      setChoice(savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null);
    };

    const timer = window.setTimeout(checkConsent, 0);
    window.addEventListener("storage", checkConsent);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", checkConsent);
    };
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    window.localStorage.setItem(consentStorageKey, nextChoice);
    window.dispatchEvent(new CustomEvent(consentChangedEvent, { detail: nextChoice }));
    setChoice(nextChoice);
  }

  if (choice) {
    return null;
  }

  return (
    <section className={styles.cookieBanner} aria-label="Cookie consent notice">
      <div>
        <strong>Cookie choices</strong>
        <p>
          SakuStack uses essential storage for this notice. We may later use
          analytics, affiliate tracking, and advertising cookies only where
          permitted and disclosed. You can reject non-essential cookies now.
        </p>
        <Link href="/privacy-policy">Privacy policy</Link>
      </div>
      <div className={styles.cookieActions}>
        <button type="button" onClick={() => saveChoice("rejected")}>
          Reject non-essential
        </button>
        <button type="button" onClick={() => saveChoice("accepted")}>
          Accept
        </button>
      </div>
    </section>
  );
}
