import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, PackageSearch } from "lucide-react";

import {
  editorialAuthor,
  lastUpdated,
  siteName,
  siteUrl,
} from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "SakuStack's editorial policy explains how reviews, ratings, comparisons, updates, affiliate disclosures, and corrections are handled.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "SakuStack Editorial Policy",
    description:
      "How SakuStack keeps software reviews useful, transparent, and separated from affiliate monetization.",
    url: "/editorial-policy",
    siteName,
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "SakuStack Editorial Policy",
    url: `${siteUrl}/editorial-policy`,
    dateModified: lastUpdated,
    author: {
      "@type": "Person",
      name: editorialAuthor.name,
      url: `${siteUrl}${editorialAuthor.url}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="SakuStack home">
          <span className={styles.logoMark}>
            <PackageSearch size={21} aria-hidden="true" />
          </span>
          <span>SakuStack</span>
        </Link>
        <nav className={styles.nav} aria-label="Editorial policy navigation">
          <Link href="/about">About</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/affiliate-disclosure">Disclosure</Link>
        </nav>
        <Link className={styles.navAction} href="/#reviews">
          Browse Reviews
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/about">
          <ChevronLeft size={17} aria-hidden="true" />
          About
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Editorial Policy</h1>
        <p>
          Our editorial policy explains how SakuStack researches, rates, updates,
          discloses, and corrects software review content.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Editorial criteria before commissions</span>
          <span>Clear review and rating methodology</span>
          <span>Corrections and updates encouraged</span>
        </div>
      </section>

      <section className={styles.legalShell}>
        <aside className={styles.legalToc}>
          <strong>Policy sections</strong>
          <a href="#standards">Standards</a>
          <a href="#ratings">Ratings</a>
          <a href="#affiliate">Affiliate separation</a>
          <a href="#updates">Updates</a>
          <a href="#corrections">Corrections</a>
        </aside>

        <article className={styles.legalArticle}>
          <section className={styles.legalCard} id="standards">
            <h2>Editorial standards</h2>
            <p>
              SakuStack reviews are built to help readers compare software
              options before making a buying decision. We prioritize practical
              criteria: use case fit, feature coverage, pricing clarity,
              switching risk, integrations, support, and alternatives.
            </p>
          </section>

          <section className={styles.legalCard} id="ratings">
            <h2>Ratings and scorecards</h2>
            <p>
              Ratings are editorial shortlist aids. They are not guarantees,
              certifications, user-submitted review averages, or paid placement
              labels. A high score means the tool appears strong for the stated
              buyer profile and comparison criteria at the time of review.
            </p>
            <p>
              Readers should verify live pricing, limits, terms, screenshots,
              support commitments, and integrations directly with the vendor.
            </p>
          </section>

          <section className={styles.legalCard} id="affiliate">
            <h2>Affiliate separation</h2>
            <p>
              SakuStack may earn commission from vendor or affiliate links.
              Commercial relationships do not remove our obligation to disclose
              affiliate links, show alternatives, and explain comparison
              criteria. We do not present affiliate commission data as a reader
              benefit.
            </p>
          </section>

          <section className={styles.legalCard} id="updates">
            <h2>Updates and freshness</h2>
            <p>
              Software products change frequently. We display update dates,
              keep category and review pages structured for refreshes, and
              revise content when material product, pricing, or positioning
              changes are identified.
            </p>
          </section>

          <section className={styles.legalCard} id="corrections">
            <h2>Corrections</h2>
            <p>
              If a vendor, reader, or contributor spots outdated or inaccurate
              information, they can contact{" "}
              <a href="mailto:editorial@sakustack.com">editorial@sakustack.com</a>.
              We review correction requests and update pages when appropriate.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
