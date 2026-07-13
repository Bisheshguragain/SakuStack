import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, Star } from "lucide-react";

import {
  breadcrumbStructuredData,
  categoryHref,
  categorySummaries,
  comparisonFocus,
  comparisonFromSlug,
  comparisonPages,
  compareSeoDescription,
  compareSeoTitle,
  defaultOgImage,
  lastUpdated,
  siteName,
  siteUrl,
  softwareHref,
  toolUrl,
} from "../../software-data";
import styles from "../../page.module.css";

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparisonPages.map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisonFromSlug(slug);

  if (!comparison) {
    return {};
  }

  const title = compareSeoTitle(comparison);
  const description = compareSeoDescription(comparison);
  const toolNames = comparison.tools.map((tool) => tool.name);

  return {
    title,
    description,
    keywords: [
      `${comparison.title}`,
      `${comparison.title} comparison`,
      ...toolNames.map((name) => `${name} review`),
      ...toolNames.map((name) => `${name} alternatives`),
      `best ${comparison.niche.toLowerCase()} software`,
    ],
    alternates: {
      canonical: `/compare/${comparison.slug}`,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `/compare/${comparison.slug}`,
      siteName,
      type: "article",
      images: [
        {
          url: defaultOgImage,
          width: 1568,
          height: 1003,
          alt: `${comparison.title} software comparison by ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [defaultOgImage],
    },
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const comparison = comparisonFromSlug(slug);

  if (!comparison) {
    notFound();
  }

  const summary = categorySummaries[comparison.niche];
  const leadingTool = [...comparison.tools].sort(
    (a, b) => b.rating - a.rating || a.name.localeCompare(b.name),
  )[0];
  const comparisonFaqs = [
    {
      question: `Which is better, ${comparison.title}?`,
      answer: leadingTool
        ? `${leadingTool.name} is the highest rated SakuStack pick in this comparison, but the better choice depends on pricing, integrations, feature depth, and your workflow.`
        : `The best option depends on pricing, integrations, feature depth, and your workflow.`,
    },
    {
      question: `What should buyers compare before choosing between ${comparison.title}?`,
      answer:
        "Compare core features, usage limits, pricing tiers, team controls, integrations, support, cancellation terms, and whether each tool fits the workflow you are buying for.",
    },
  ];
  const structuredData = [
    breadcrumbStructuredData([
      { name: "Home", url: siteUrl },
      { name: summary.title, url: `${siteUrl}${categoryHref(comparison.niche)}` },
      { name: comparison.title, url: `${siteUrl}/compare/${comparison.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: comparison.title,
      url: `${siteUrl}/compare/${comparison.slug}`,
      dateModified: lastUpdated,
      author: {
        "@type": "Organization",
        name: "SakuStack",
      },
      publisher: {
        "@type": "Organization",
        name: "SakuStack",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: comparison.title,
      itemListElement: comparison.tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          url: toolUrl(tool),
          applicationCategory: tool.niche,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: comparisonFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
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
      <section className={styles.reviewHero}>
        <Link className={styles.backLink} href={categoryHref(comparison.niche)}>
          <ChevronLeft size={17} aria-hidden="true" />
          {summary.title}
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>{comparison.title}</h1>
        <p>
          Compare these {comparison.niche.toLowerCase()} options by pricing,
          features, review signals, and the buying criteria that matter before a
          software trial.
        </p>
        {leadingTool ? (
          <div className={styles.reviewHeroActions}>
            <a
              className={styles.primaryButton}
              href={toolUrl(leadingTool)}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              Visit {leadingTool.name}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Link className={styles.secondaryButton} href={softwareHref(leadingTool)}>
              Read {leadingTool.name} review
            </Link>
          </div>
        ) : null}
        <p className={styles.affiliateNote}>
          Affiliate disclosure: we may earn a commission from links on this
          comparison. We keep the comparison criteria visible so buyers can
          judge fit before clicking.
        </p>
      </section>

      <section className={styles.categoryLayout}>
        <div className={styles.categoryMain}>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Rating</th>
                  <th>Best for</th>
                  <th>Pricing angle</th>
                  <th>Compare on</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {comparison.tools.map((tool) => (
                  <tr key={tool.name}>
                    <td>
                      <strong>
                        <a
                          className={styles.tableNameLink}
                          href={toolUrl(tool)}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                        >
                          {tool.name}
                        </a>
                      </strong>
                    </td>
                    <td>
                      <span className={styles.score}>
                        <Star size={14} fill="currentColor" aria-hidden="true" />
                        {tool.rating}
                      </span>
                    </td>
                    <td>{tool.bestFor}</td>
                    <td>{tool.pricing}</td>
                    <td>{comparisonFocus(tool)}</td>
                    <td>
                      <Link className={styles.tableNameLink} href={softwareHref(tool)}>
                        Read review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className={styles.reviewSection}>
            <h2>Verdict</h2>
            <p>
              Start with {leadingTool?.name} if you want the highest rated
              option in this comparison, then check the other tools for workflow
              fit, integrations, pricing limits, and team requirements.
            </p>
          </section>

          <section className={styles.reviewSection}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {comparisonFaqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.categoryAside}>
          <div>
            <h2>Category</h2>
            <Link className={styles.tableNameLink} href={categoryHref(comparison.niche)}>
              {summary.title}
            </Link>
          </div>
          <div>
            <h2>How to choose</h2>
            <p>
              Compare the tools by everyday workflow fit, pricing limits,
              integrations, team requirements, support, and how much switching
              effort each option would create.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
