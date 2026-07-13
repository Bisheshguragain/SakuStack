import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, PackageSearch, Star } from "lucide-react";

import {
  articlesForNiche,
  blogHref,
  knowledgeCategoryHref,
} from "../../knowledge-data";
import {
  breadcrumbStructuredData,
  categoryFromSlug,
  categoryHref,
  categoryNiches,
  categorySeoDescription,
  categorySeoTitle,
  categorySlug,
  categorySummaries,
  comparisonFocus,
  comparisonPages,
  defaultOgImage,
  lastUpdated,
  siteName,
  siteUrl,
  software,
  softwareHref,
  toolUrl,
  type CategoryNiche,
} from "../../software-data";
import styles from "../../page.module.css";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function toolsForCategory(niche: CategoryNiche) {
  return software
    .filter((tool) => tool.niche === niche)
    .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
}

export function generateStaticParams() {
  return categoryNiches.map((niche) => ({
    slug: categorySlug(niche),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const niche = categoryFromSlug(slug);

  if (!niche) {
    return {};
  }

  const summary = categorySummaries[niche];
  const url = categoryHref(niche);
  const tools = toolsForCategory(niche);
  const title = categorySeoTitle(summary);
  const description = categorySeoDescription(niche, summary, tools.slice(0, 5));

  return {
    title,
    description,
    keywords: [
      summary.title,
      `best ${niche.toLowerCase()} tools`,
      `${niche.toLowerCase()} software`,
      `${niche.toLowerCase()} comparison`,
      `${niche.toLowerCase()} alternatives`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type: "article",
      images: [
        {
          url: defaultOgImage,
          width: 1568,
          height: 1003,
          alt: `${summary.title} software comparison dashboard by ${siteName}`,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const niche = categoryFromSlug(slug);

  if (!niche) {
    notFound();
  }

  const summary = categorySummaries[niche];
  const tools = toolsForCategory(niche);
  const topTool = tools[0];
  const comparisons = comparisonPages.filter((comparison) => comparison.niche === niche);
  const knowledgeArticles = articlesForNiche(niche);
  const structuredData = [
    breadcrumbStructuredData([
      { name: "Home", url: siteUrl },
      { name: summary.title, url: `${siteUrl}${categoryHref(niche)}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${summary.title} Compared`,
      url: `${siteUrl}${categoryHref(niche)}`,
      description: summary.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${summary.title} shortlist`,
      url: `${siteUrl}${categoryHref(niche)}`,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          url: toolUrl(tool),
          applicationCategory: tool.niche,
          description: tool.bestFor,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.rating,
            bestRating: 5,
            worstRating: 1,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the best ${niche.toLowerCase()} tool?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: topTool
              ? `${topTool.name} is the current top rated SakuStack pick for ${niche.toLowerCase()}, but buyers should compare pricing, integrations, limits, and workflow fit.`
              : summary.description,
          },
        },
        {
          "@type": "Question",
          name: `How does SakuStack compare ${niche.toLowerCase()} tools?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "We compare tools by use case fit, pricing clarity, feature coverage, review signals, alternatives, and buyer intent.",
          },
        },
      ],
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
        <nav className={styles.nav} aria-label="Category navigation">
          <Link href="/#reviews">Categories</Link>
          <Link href="/#winners">Top Pages</Link>
          <Link href="/#compare">Matrix</Link>
          <Link href="/#guides">Guides</Link>
        </nav>
        <Link className={styles.navAction} href="/#quiz">
          Start Quiz
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.categoryHero}>
        <Link className={styles.backLink} href="/#reviews">
          <ChevronLeft size={17} aria-hidden="true" />
          All categories
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>{summary.title} Compared</h1>
        <p>{summary.description}</p>
        <div className={styles.categoryStats} aria-label="Category summary">
          <span>{tools.length} tools compared</span>
          <span>{topTool?.name} leads by rating</span>
          <span>{niche}</span>
        </div>
        <p className={styles.affiliateNote}>
          Affiliate disclosure: we may earn a commission from links on this
          page. We keep pricing, feature, and review criteria visible before
          each outbound click.
        </p>
      </section>

      <section className={styles.categoryLayout}>
        <div className={styles.categoryMain}>
          <div className={styles.sectionTop}>
            <div>
              <h2>Top {niche.toLowerCase()} picks</h2>
              <p>
                Use this shortlist to compare core features, pricing angles,
                review signals, and the most important buying criteria before
                visiting each tool.
              </p>
            </div>
          </div>

          <div className={styles.cardGrid}>
            {tools.map((tool) => (
              <article className={styles.toolCard} key={`${tool.niche}-${tool.name}`}>
                <div className={styles.cardHead}>
                  <div>
                    <p>{tool.niche}</p>
                    <h3>
                      <a
                        className={styles.toolNameLink}
                        href={toolUrl(tool)}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        aria-label={`Visit ${tool.name} website`}
                      >
                        {tool.name}
                      </a>
                    </h3>
                  </div>
                  <span className={styles.rating}>
                    <Star size={16} fill="currentColor" aria-hidden="true" />
                    {tool.rating}
                  </span>
                </div>
                <p className={styles.cardUse}>{tool.bestFor}</p>
                <dl className={styles.cardMeta}>
                  <div>
                    <dt>Pricing</dt>
                    <dd>{tool.pricing}</dd>
                  </div>
                  <div>
                    <dt>Reviews</dt>
                    <dd>{tool.reviews}</dd>
                  </div>
                  <div>
                    <dt>Compare</dt>
                    <dd>{comparisonFocus(tool)}</dd>
                  </div>
                </dl>
                <ul>
                  {tool.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className={styles.primaryButton}
                  href={toolUrl(tool)}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                >
                  Visit website
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <Link className={styles.cardLink} href={softwareHref(tool)}>
                  Read review
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.categoryTableBlock}>
            <div className={styles.sectionTop}>
              <div>
                <h2>{summary.title} feature matrix</h2>
                <p>
                  A compact comparison table for quick scanning and future
                  affiliate-link placement.
                </p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Software</th>
                    <th>Rating</th>
                    <th>Pricing angle</th>
                    <th>Best for</th>
                    <th>Key features</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={`${tool.niche}-${tool.name}-row`}>
                      <td>
                        <strong>
                          <a
                            className={styles.tableNameLink}
                            href={toolUrl(tool)}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            aria-label={`Visit ${tool.name} website`}
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
                      <td>{tool.pricing}</td>
                      <td>{tool.bestFor}</td>
                      <td>{tool.features.join(", ")}</td>
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
          </div>
        </div>

        <aside className={styles.categoryAside}>
          <div>
            <h2>What this category covers</h2>
            <p>{summary.description}</p>
          </div>
          <div>
            <h2>Knowledge hub</h2>
            <p>
              Use the hub for buying guides, pricing research, and alternatives
              articles that support this category.
            </p>
            <Link className={styles.tableNameLink} href={knowledgeCategoryHref(niche)}>
              Open {summary.title} hub
            </Link>
          </div>
          <div>
            <h2>Supporting guides</h2>
            <div className={styles.categoryLinkList}>
              {knowledgeArticles.map((article) => (
                <Link href={blogHref(article)} key={article.slug}>
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Comparison pages to build next</h2>
            <ul>
              {comparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link className={styles.tableNameLink} href={`/compare/${comparison.slug}`}>
                    {comparison.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Other categories</h2>
            <div className={styles.categoryLinkList}>
              {categoryNiches
                .filter((otherNiche) => otherNiche !== niche)
                .map((otherNiche) => (
                  <Link href={categoryHref(otherNiche)} key={otherNiche}>
                    {categorySummaries[otherNiche].title}
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>

      <footer className={styles.footer}>
        <strong>SakuStack</strong>
        <p>
          Affiliate disclosure: we may earn a commission when you buy through
          links on this site. Rankings are based on use case fit, product
          quality, pricing, features, and review evidence. Read our{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link>,{" "}
          <Link href="/methodology">methodology</Link>,{" "}
          <Link href="/privacy-policy">privacy policy</Link>, and{" "}
          <Link href="/terms">terms</Link>.
        </p>
      </footer>
    </main>
  );
}
