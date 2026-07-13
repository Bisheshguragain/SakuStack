import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, PackageSearch } from "lucide-react";

import {
  articlesForNiche,
  blogHref,
  knowledgeCategoryHref,
  relatedReviewLinks,
  topToolsForNiche,
} from "../../knowledge-data";
import {
  breadcrumbStructuredData,
  categoryFromSlug,
  categoryHref,
  categoryNiches,
  categorySlug,
  categorySummaries,
  comparisonPages,
  defaultOgImage,
  lastUpdated,
  siteName,
  siteUrl,
  softwareHref,
  toolUrl,
} from "../../software-data";
import styles from "../../page.module.css";

type KnowledgeCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getNiche(slug: string) {
  return categoryFromSlug(slug);
}

export function generateStaticParams() {
  return categoryNiches.map((niche) => ({
    slug: categorySlug(niche),
  }));
}

export async function generateMetadata({
  params,
}: KnowledgeCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const niche = getNiche(slug);

  if (!niche) {
    return {};
  }

  const summary = categorySummaries[niche];
  const title = `${summary.title} Knowledge Hub: Guides, Pricing & Alternatives`;
  const description = `Read ${niche} buying guides, pricing research, alternatives articles, reviews, and comparisons for software buyers.`;

  return {
    title,
    description,
    alternates: {
      canonical: knowledgeCategoryHref(niche),
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: knowledgeCategoryHref(niche),
      siteName,
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1568,
          height: 1003,
          alt: `${summary.title} knowledge hub by ${siteName}`,
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

export default async function KnowledgeCategoryPage({
  params,
}: KnowledgeCategoryPageProps) {
  const { slug } = await params;
  const niche = getNiche(slug);

  if (!niche) {
    notFound();
  }

  const summary = categorySummaries[niche];
  const articles = articlesForNiche(niche);
  const tools = topToolsForNiche(niche);
  const comparisons = comparisonPages.filter((comparison) => comparison.niche === niche);
  const reviewLinks = relatedReviewLinks(niche);
  const structuredData = [
    breadcrumbStructuredData([
      { name: "Home", url: siteUrl },
      { name: "Knowledge Centre", url: `${siteUrl}/knowledge-centre` },
      { name: `${summary.title} Knowledge Hub`, url: `${siteUrl}${knowledgeCategoryHref(niche)}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${summary.title} Knowledge Hub`,
      url: `${siteUrl}${knowledgeCategoryHref(niche)}`,
      description: summary.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${summary.title} articles`,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}${blogHref(article)}`,
        name: article.title,
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
        <nav className={styles.nav} aria-label="Knowledge hub navigation">
          <Link href="/knowledge-centre">Knowledge</Link>
          <Link href={categoryHref(niche)}>Tools</Link>
          <Link href="/#compare">Matrix</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link className={styles.navAction} href={categoryHref(niche)}>
          Compare Tools
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.categoryHero}>
        <Link className={styles.backLink} href="/knowledge-centre">
          <ChevronLeft size={17} aria-hidden="true" />
          Knowledge Centre
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>{summary.title} Knowledge Hub</h1>
        <p>
          {summary.description} Use this hub to move from research questions to
          review pages, comparisons, and vendor evaluation.
        </p>
        <div className={styles.categoryStats}>
          <span>{articles.length} guides</span>
          <span>{tools.length} tools linked</span>
          <span>{comparisons.length} comparison pages</span>
        </div>
      </section>

      <section className={styles.knowledgeLayout}>
        <div className={styles.categoryMain}>
          <div className={styles.sectionTop}>
            <div>
              <h2>Helpful guides</h2>
              <p>
                Use these guides to understand what matters, compare likely
                costs, and spot alternatives before choosing a tool.
              </p>
            </div>
          </div>

          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <Link className={styles.articleCard} href={blogHref(article)} key={article.slug}>
                <span>{article.intent}</span>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <small>{article.readingTime} / {article.primaryKeyword}</small>
              </Link>
            ))}
          </div>

          <section className={styles.knowledgeBlock}>
            <h2>Where to go next</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>What it helps with</th>
                    <th>Open</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Buying guides</strong>
                    </td>
                    <td>Understand buying criteria, pricing questions, and alternatives.</td>
                    <td>{articles.map((article) => article.title).join(", ")}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Category comparison</strong>
                    </td>
                    <td>Compare the top tools in one niche.</td>
                    <td>
                      <Link className={styles.tableNameLink} href={categoryHref(niche)}>
                        {summary.title}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Review pages</strong>
                    </td>
                    <td>Check individual tool strengths, limits, pricing signals, and fit.</td>
                    <td>{reviewLinks.map((link) => link.name).join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className={styles.categoryAside}>
          <div>
            <h2>Tools to mention</h2>
            <div className={styles.categoryLinkList}>
              {tools.map((tool) => (
                <a
                  href={toolUrl(tool)}
                  key={tool.name}
                  rel="sponsored noopener noreferrer"
                  target="_blank"
                >
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2>Review pages</h2>
            <div className={styles.categoryLinkList}>
              {tools.map((tool) => (
                <Link href={softwareHref(tool)} key={tool.name}>
                  {tool.name} review
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Comparison pages</h2>
            <div className={styles.categoryLinkList}>
              {comparisons.map((comparison) => (
                <Link href={`/compare/${comparison.slug}`} key={comparison.slug}>
                  {comparison.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
