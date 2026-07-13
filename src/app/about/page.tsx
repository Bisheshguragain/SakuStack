import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronLeft, PackageSearch } from "lucide-react";

import {
  editorialAuthor,
  lastUpdated,
  siteName,
  siteUrl,
} from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "About SakuStack",
  description:
    "Learn how SakuStack researches software categories, reviews tools, discloses affiliate relationships, and keeps buying guides useful for readers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SakuStack",
    description:
      "The editorial background, research standards, and reader-first principles behind SakuStack software reviews.",
    url: "/about",
    siteName,
    type: "website",
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SakuStack",
    url: `${siteUrl}/about`,
    dateModified: lastUpdated,
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      publishingPrinciples: `${siteUrl}/editorial-policy`,
    },
  };

  const authorData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: editorialAuthor.name,
    url: `${siteUrl}${editorialAuthor.url}`,
    jobTitle: editorialAuthor.title,
    description: editorialAuthor.description,
    worksFor: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <main className={styles.page}>
      {[structuredData, authorData].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="SakuStack home">
          <span className={styles.logoMark}>
            <PackageSearch size={21} aria-hidden="true" />
          </span>
          <span>SakuStack</span>
        </Link>
        <nav className={styles.nav} aria-label="About navigation">
          <Link href="/methodology">Methodology</Link>
          <Link href="/editorial-policy">Editorial Policy</Link>
          <Link href="/affiliate-disclosure">Disclosure</Link>
        </nav>
        <Link className={styles.navAction} href="/knowledge-centre">
          Knowledge Centre
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          <ChevronLeft size={17} aria-hidden="true" />
          Home
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>About SakuStack</h1>
        <p>
          SakuStack helps readers compare software with practical buying guides,
          standardized reviews, comparison pages, and transparent affiliate
          disclosures.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Reader-first software research</span>
          <span>Transparent affiliate disclosures</span>
          <span>Standardized review criteria</span>
        </div>
      </section>

      <section className={styles.legalShell}>
        <aside className={styles.legalToc}>
          <strong>On this page</strong>
          <a href="#mission">Mission</a>
          <a href="#editorial-team">Editorial team</a>
          <a href="#how-we-work">How we work</a>
          <a href="#trust">Trust links</a>
        </aside>

        <article className={styles.legalArticle}>
          <section className={styles.legalCard} id="mission">
            <h2>Our mission</h2>
            <p>
              SakuStack exists to make software research easier for founders,
              operators, creators, marketers, and small teams. We organize high
              intent categories into clear shortlists so readers can compare
              features, pricing signals, alternatives, and workflow fit before
              visiting vendor websites.
            </p>
          </section>

          <section className={styles.legalCard} id="editorial-team">
            <h2>{editorialAuthor.name}</h2>
            <p>{editorialAuthor.description}</p>
            <p>
              Our pages are written from a buyer-research perspective. We focus
              on what a reader needs before clicking out: who the software is
              best for, what to verify, which alternatives matter, and where
              pricing or terms should be checked directly with the vendor.
            </p>
          </section>

          <section className={styles.legalCard} id="how-we-work">
            <h2>How we work</h2>
            <ul>
              <li>We use repeatable review structures across software pages.</li>
              <li>We keep affiliate disclosures visible near commercial links.</li>
              <li>We separate editorial criteria from monetization choices.</li>
              <li>We update pages when pricing, product positioning, or category trends change.</li>
              <li>We encourage readers to verify current vendor terms before purchase.</li>
            </ul>
          </section>

          <section className={styles.legalCallout} id="trust">
            <strong>
              <BadgeCheck size={18} aria-hidden="true" /> Trust and transparency
            </strong>
            <p>
              Read our <Link href="/methodology">methodology</Link>,{" "}
              <Link href="/editorial-policy">editorial policy</Link>,{" "}
              <Link href="/affiliate-disclosure">affiliate disclosure</Link>,
              and <Link href="/monetization-policy">monetization policy</Link>{" "}
              for more detail.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
