import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronLeft, PackageSearch, Sparkles } from "lucide-react";

import {
  categoryHref,
  categorySummaries,
  siteName,
  siteUrl,
  softwareHref,
  trendingTools,
} from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Software Deals",
  description:
    "Track software free plans, trials, and future partner offers across SakuStack's reviewed SaaS categories.",
  alternates: {
    canonical: "/deals",
  },
  openGraph: {
    title: "SakuStack Software Deals",
    description:
      "A future-ready software deals page for free plans, trials, and verified partner offers.",
    url: "/deals",
    siteName,
    type: "website",
  },
};

const dealTypes = [
  "Free plan available",
  "Free trial to verify fit",
  "Annual pricing worth checking",
  "Partner offer coming later",
];

export default function DealsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SakuStack Software Deals",
    url: `${siteUrl}/deals`,
    description:
      "A curated page for software free plans, trials, pricing checks, and future verified partner offers.",
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
        <nav className={styles.nav} aria-label="Deals navigation">
          <Link href="/tools">Tools</Link>
          <Link href="/#reviews">Categories</Link>
          <Link href="/affiliate-disclosure">Disclosure</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link className={styles.navAction} href="/tools">
          Browse Tools
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.dealsHero}>
        <Link className={styles.backLink} href="/">
          <ChevronLeft size={17} aria-hidden="true" />
          Home
        </Link>
        <p className={styles.categoryKicker}>Free plans, trials, and future partner offers</p>
        <h1>Software deals worth checking</h1>
        <p>
          SakuStack will use this page for verified software offers later. For
          now, use it to find tools with free plans, trials, annual pricing, and
          buying checks before opening a vendor site.
        </p>
      </section>

      <section className={styles.dealsLayout}>
        <div className={styles.dealsMain}>
          <div className={styles.sectionTop}>
            <div>
              <h2>Deal checklist</h2>
              <p>
                We only want public, useful offers here: free plans, trials,
                pricing checks, and clearly disclosed partner offers when they
                are available.
              </p>
            </div>
          </div>
          <div className={styles.dealTypeGrid}>
            {dealTypes.map((deal) => (
              <div key={deal}>
                <BadgeCheck size={18} aria-hidden="true" />
                <strong>{deal}</strong>
              </div>
            ))}
          </div>

          <div className={styles.sectionTop}>
            <div>
              <h2>Tools to check first</h2>
              <p>
                These tools already have full SakuStack reviews. Verify current
                pricing and terms directly before purchase.
              </p>
            </div>
          </div>
          <div className={styles.dealToolGrid}>
            {trendingTools.slice(0, 9).map((tool) => (
              <article key={tool.name}>
                <span>
                  <Sparkles size={15} aria-hidden="true" />
                  {tool.pricing}
                </span>
                <h3>{tool.name}</h3>
                <p>{tool.bestFor}</p>
                <div>
                  <Link href={softwareHref(tool)}>
                    Read review
                  </Link>
                  <Link href={categoryHref(tool.niche)}>
                    {categorySummaries[tool.niche].title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
