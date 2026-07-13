import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PackageSearch } from "lucide-react";

import {
  blogHref,
  knowledgeArticles,
  knowledgePillars,
} from "../knowledge-data";
import {
  defaultOgImage,
  lastUpdated,
  siteName,
  siteUrl,
} from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Knowledge Centre: Software Buying Guides and SEO Hubs",
  description:
    "Explore SakuStack software buying guides, pricing guides, alternatives articles, category hubs, reviews, and comparison pages for high-intent SaaS niches.",
  alternates: {
    canonical: "/knowledge-centre",
  },
  openGraph: {
    title: `Knowledge Centre | ${siteName}`,
    description:
      "Software buying guides, pricing research, alternatives articles, and category hubs built to help buyers compare tools.",
    url: "/knowledge-centre",
    siteName,
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1568,
        height: 1003,
        alt: `${siteName} software knowledge centre`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Knowledge Centre | ${siteName}`,
    description:
      "Software buying guides, pricing research, alternatives articles, and category hubs.",
    images: [defaultOgImage],
  },
};

export default function KnowledgeCentrePage() {
  const featuredArticles = knowledgeArticles.slice(0, 6);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "SakuStack Knowledge Centre",
      url: `${siteUrl}/knowledge-centre`,
      description:
        "Software buying guides, pricing guides, alternatives articles, and category hubs.",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "SakuStack software knowledge hubs",
      itemListElement: knowledgePillars.map((pillar, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}${pillar.href}`,
        name: pillar.title,
      })),
    },
  ];

  return (
    <main className={styles.page}>
      {structuredData.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
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
        <nav className={styles.nav} aria-label="Knowledge navigation">
          <Link href="/#reviews">Categories</Link>
          <Link href="/knowledge-centre">Knowledge</Link>
          <Link href="/#compare">Matrix</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link className={styles.navAction} href="/#reviews">
          Browse Tools
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.knowledgeHero}>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Knowledge Centre</h1>
        <p>
          Practical software buying guides, pricing explainers, alternatives
          lists, reviews, and comparison pages to help you shortlist the right
          tools with less guesswork.
        </p>
        <div className={styles.categoryStats}>
          <span>{knowledgePillars.length} category hubs</span>
          <span>{knowledgeArticles.length} buying guides</span>
          <span>Buying guides + pricing + alternatives</span>
        </div>
      </section>

      <section className={styles.knowledgeLayout}>
        <div className={styles.categoryMain}>
          <div className={styles.sectionTop}>
            <div>
              <h2>Category knowledge hubs</h2>
              <p>
                Choose a software category to see helpful guides, popular
                tools, review pages, and side-by-side comparisons in one place.
              </p>
            </div>
          </div>

          <div className={styles.knowledgeGrid}>
            {knowledgePillars.map((pillar) => (
              <Link
                className={styles.knowledgeCard}
                data-niche={pillar.niche}
                href={pillar.href}
                key={pillar.niche}
              >
                <span>{pillar.niche}</span>
                <h2>{pillar.title}</h2>
                <p>{pillar.description}</p>
                <small>
                  {pillar.articleCount} articles / {pillar.toolCount} tools
                </small>
              </Link>
            ))}
          </div>

          <section className={styles.knowledgeBlock}>
            <div className={styles.sectionTop}>
              <div>
                <h2>Featured buying guides</h2>
                <p>
                  Start with these guides when you are comparing pricing,
                  alternatives, product fit, and the tradeoffs that matter
                  before choosing software.
                </p>
              </div>
            </div>
            <div className={styles.articleList}>
              {featuredArticles.map((article) => (
                <Link className={styles.articleRow} href={blogHref(article)} key={article.slug}>
                  <BookOpen size={20} aria-hidden="true" />
                  <span>
                    <strong>{article.title}</strong>
                    <small>
                      {article.intent} / {article.readingTime} / {article.primaryKeyword}
                    </small>
                  </span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.categoryAside}>
          <div>
            <h2>How to use this centre</h2>
            <ul>
              <li>Start with the category hub that matches your workflow.</li>
              <li>Read the buying guide to understand what to compare.</li>
              <li>Use pricing and alternatives articles to narrow the shortlist.</li>
              <li>Open reviews and comparison pages before visiting vendors.</li>
            </ul>
          </div>
          <div>
            <h2>Popular starting points</h2>
            <p>
              AI assistants, SEO tools, hosting platforms, CRM software, email
              marketing tools, ecommerce platforms, and productivity SaaS are
              good places to start if you are building a modern software stack.
            </p>
          </div>
          <div>
            <h2>Before you buy</h2>
            <p>
              Always confirm current pricing, plan limits, integrations,
              support terms, cancellation rules, and data requirements directly
              with the vendor before committing.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
