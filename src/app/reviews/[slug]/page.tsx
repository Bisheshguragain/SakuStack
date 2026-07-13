import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  CircleDollarSign,
  ListChecks,
  PackageSearch,
  Star,
  Users,
} from "lucide-react";

import {
  breadcrumbStructuredData,
  categoryHref,
  categorySummaries,
  comparisonFocus,
  defaultOgImage,
  lastUpdated,
  reviewCons,
  reviewPros,
  reviewSeoDescription,
  reviewSeoTitle,
  siteName,
  siteUrl,
  softwareFromSlug,
  softwareHref,
  softwareSlug,
  toolUrl,
  uniqueSoftware,
} from "../../software-data";
import styles from "../../page.module.css";

type ReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return uniqueSoftware.map((tool) => ({
    slug: softwareSlug(tool),
  }));
}

function scoreCards(tool: NonNullable<ReturnType<typeof softwareFromSlug>>) {
  return [
    {
      label: "Use case fit",
      score: tool.rating,
      detail: tool.bestFor,
    },
    {
      label: "Feature depth",
      score: Math.min(5, Number((tool.rating + 0.1).toFixed(1))),
      detail: tool.features.join(", "),
    },
    {
      label: "Pricing clarity",
      score: Math.max(4.1, Number((tool.rating - 0.2).toFixed(1))),
      detail: tool.pricing,
    },
    {
      label: "Comparison value",
      score: Math.max(4.2, Number((tool.rating - 0.1).toFixed(1))),
      detail: comparisonFocus(tool),
    },
  ];
}

function reviewFaq(tool: NonNullable<ReturnType<typeof softwareFromSlug>>) {
  return [
    {
      question: `Who is ${tool.name} best for?`,
      answer: tool.bestFor,
    },
    {
      question: `What are the main ${tool.name} features to compare?`,
      answer: tool.features.join(", "),
    },
    {
      question: `What should buyers check before choosing ${tool.name}?`,
      answer: `${comparisonFocus(tool)}. Buyers should also confirm pricing, limits, integrations, and contract terms directly with the vendor.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = softwareFromSlug(slug);

  if (!tool) {
    return {};
  }

  const title = reviewSeoTitle(tool);
  const description = reviewSeoDescription(tool);

  return {
    title,
    description,
    keywords: [
      `${tool.name} review`,
      `${tool.name} pricing`,
      `${tool.name} features`,
      `${tool.name} alternatives`,
      `${tool.name} pros and cons`,
      `best ${tool.niche.toLowerCase()} software`,
    ],
    alternates: {
      canonical: softwareHref(tool),
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: softwareHref(tool),
      siteName,
      type: "article",
      images: [
        {
          url: defaultOgImage,
          width: 1568,
          height: 1003,
          alt: `${tool.name} review and software scorecard by ${siteName}`,
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

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const tool = softwareFromSlug(slug);

  if (!tool) {
    notFound();
  }

  const category = categorySummaries[tool.niche];
  const pros = reviewPros(tool);
  const cons = reviewCons(tool);
  const scores = scoreCards(tool);
  const faqs = reviewFaq(tool);
  const alternatives = uniqueSoftware
    .filter((candidate) => candidate.niche === tool.niche && candidate.name !== tool.name)
    .slice(0, 4);
  const structuredData = [
    breadcrumbStructuredData([
      { name: "Home", url: siteUrl },
      { name: category.title, url: `${siteUrl}${categoryHref(tool.niche)}` },
      { name: `${tool.name} Review`, url: `${siteUrl}${softwareHref(tool)}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Review",
      name: `${tool.name} Review`,
      url: `${siteUrl}${softwareHref(tool)}`,
      dateModified: lastUpdated,
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: toolUrl(tool),
        applicationCategory: tool.niche,
        description: tool.bestFor,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: tool.rating,
        bestRating: 5,
        worstRating: 1,
      },
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
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
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
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="SakuStack home">
          <span className={styles.logoMark}>
            <PackageSearch size={21} aria-hidden="true" />
          </span>
          <span>SakuStack</span>
        </Link>
        <nav className={styles.nav} aria-label="Review navigation">
          <Link href="/#reviews">Categories</Link>
          <Link href={categoryHref(tool.niche)}>This Category</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/affiliate-disclosure">Disclosure</Link>
        </nav>
        <a
          className={styles.navAction}
          href={toolUrl(tool)}
          target="_blank"
          rel="sponsored noopener noreferrer"
        >
          Visit Tool
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </header>
      <section className={styles.reviewHero}>
        <Link className={styles.backLink} href={categoryHref(tool.niche)}>
          <ChevronLeft size={17} aria-hidden="true" />
          {category.title}
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>{tool.name} Review</h1>
        <p>
          A standardized SakuStack review of {tool.name}: what it does best,
          who it fits, pricing signals, key features, alternatives, and the
          buying criteria to check before you click through.
        </p>
        <div className={styles.reviewHeroActions}>
          <a
            className={styles.primaryButton}
            href={toolUrl(tool)}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            Visit {tool.name}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <Link className={styles.secondaryButton} href={categoryHref(tool.niche)}>
            Compare alternatives
          </Link>
        </div>
        <dl className={styles.reviewQuickFacts}>
          <div>
            <dt>Best for</dt>
            <dd>{tool.bestFor}</dd>
          </div>
          <div>
            <dt>Pricing</dt>
            <dd>{tool.pricing}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{tool.niche}</dd>
          </div>
          <div>
            <dt>Score</dt>
            <dd>{tool.rating}/5</dd>
          </div>
        </dl>
        <p className={styles.affiliateNote}>
          Affiliate disclosure: we may earn a commission if you buy through
          links on this page. Rankings are editorial and based on use case fit,
          features, pricing, and review signals.
        </p>
      </section>

      <section className={styles.reviewLayout}>
        <article className={styles.reviewArticle}>
          <div className={styles.verdictCard}>
            <div>
              <span className={styles.rating}>
                <Star size={16} fill="currentColor" aria-hidden="true" />
                {tool.rating}
              </span>
              <h2>Editorial verdict</h2>
              <p>
                {tool.name} is a strong candidate for {tool.bestFor.toLowerCase()}.
                It should be shortlisted when your buying decision depends on{" "}
                {comparisonFocus(tool).toLowerCase()}.
              </p>
            </div>
            <a
              className={styles.primaryButton}
              href={toolUrl(tool)}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              Visit {tool.name}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <section className={styles.reviewSection}>
            <h2>Review scorecard</h2>
            <div className={styles.scoreGrid}>
              {scores.map((score) => (
                <div className={styles.scoreCard} key={score.label}>
                  <span>{score.label}</span>
                  <strong>{score.score}/5</strong>
                  <p>{score.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.proConGrid}>
            <section>
              <h2>Pros</h2>
              <ul>
                {pros.map((pro) => (
                  <li key={pro}>
                    <Check size={16} aria-hidden="true" />
                    {pro}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Cons</h2>
              <ul>
                {cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className={styles.reviewSection}>
            <h2>Who should choose {tool.name}?</h2>
            <div className={styles.fitGrid}>
              <div>
                <Users size={20} aria-hidden="true" />
                <h3>Best fit</h3>
                <p>{tool.bestFor}</p>
              </div>
              <div>
                <BadgeCheck size={20} aria-hidden="true" />
                <h3>What to validate</h3>
                <p>{comparisonFocus(tool)}</p>
              </div>
            </div>
          </section>

          <section className={styles.reviewSection}>
            <h2>Features and pricing angle</h2>
            <div className={styles.featureBreakdown}>
              <div>
                <CircleDollarSign size={20} aria-hidden="true" />
                <h3>Pricing angle</h3>
                <p>{tool.pricing}</p>
              </div>
              <div>
                <ListChecks size={20} aria-hidden="true" />
                <h3>Core features</h3>
                <ul>
                  {tool.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p>
              Before choosing a plan, confirm current pricing, usage limits,
              cancellation terms, integrations, and whether the included
              features match the workflow you are buying for.
            </p>
          </section>

          <section className={styles.reviewSection}>
            <h2>Best alternatives</h2>
            <div className={styles.categoryLinkList}>
              {alternatives.map((alternative) => (
                <Link href={softwareHref(alternative)} key={alternative.name}>
                  {alternative.name} review
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.reviewSection}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.categoryAside}>
          <div>
            <h2>Quick facts</h2>
            <p>Updated {lastUpdated}</p>
            <p>{tool.rating}/5 editorial score</p>
            <p>{tool.reviews}</p>
          </div>
          <div>
            <h2>Review criteria</h2>
            <p>{comparisonFocus(tool)}</p>
          </div>
          <div>
            <h2>Category</h2>
            <Link className={styles.tableNameLink} href={categoryHref(tool.niche)}>
              {category.title}
            </Link>
          </div>
          <div>
            <h2>Methodology</h2>
            <p>
              Scores are a directional editorial aid. We review use case fit,
              product depth, pricing clarity, feature coverage, and buyer intent.
            </p>
            <Link className={styles.tableNameLink} href="/methodology">
              Read methodology
            </Link>
          </div>
          <div>
            <h2>Disclosure</h2>
            <p>
              Vendor links may become affiliate links. Editorial structure stays
              consistent across every SakuStack review page.
            </p>
            <Link className={styles.tableNameLink} href="/affiliate-disclosure">
              Read disclosure
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
