import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, PackageSearch } from "lucide-react";

import { categoryNiches, siteName, siteUrl, software } from "../software-data";
import styles from "../page.module.css";
import ToolsDirectoryClient from "./ToolsDirectoryClient";

export const metadata: Metadata = {
  title: "Software Tool Directory",
  description:
    "Browse SakuStack's software tool directory by category, pricing, features, review score, and buyer fit.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "SakuStack Software Tool Directory",
    description:
      "Browse software tools by category, pricing angle, features, review score, and buyer fit.",
    url: "/tools",
    siteName,
    type: "website",
  },
};

export default function ToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SakuStack Software Tool Directory",
    url: `${siteUrl}/tools`,
    description:
      "A searchable software directory covering AI tools, SaaS platforms, social scheduling, security, ecommerce, CRM, hosting, and productivity tools.",
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
        <nav className={styles.nav} aria-label="Tools navigation">
          <Link href="/#reviews">Categories</Link>
          <Link href="/knowledge-centre">Knowledge</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link className={styles.navAction} href="/deals">
          Software Deals
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.directoryHero}>
        <Link className={styles.backLink} href="/">
          <ChevronLeft size={17} aria-hidden="true" />
          Home
        </Link>
        <p className={styles.categoryKicker}>{software.length} tools / {categoryNiches.length} categories</p>
        <h1>Software tool directory</h1>
        <p>
          Search tools by category, pricing angle, features, SakuStack score,
          and buyer-fit notes before opening the full review.
        </p>
      </section>

      <ToolsDirectoryClient />
    </main>
  );
}
