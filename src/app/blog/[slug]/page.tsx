import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronLeft,
  ListChecks,
  PackageSearch,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  articleSeoDescription,
  articleSeoTitle,
  blogHref,
  knowledgeArticleFromSlug,
  knowledgeArticles,
  knowledgeCategoryHref,
  relatedReviewLinks,
  topToolsForNiche,
} from "../../knowledge-data";
import {
  breadcrumbStructuredData,
  categoryHref,
  categorySummaries,
  comparisonPages,
  defaultOgImage,
  editorialAuthor,
  lastUpdated,
  siteName,
  siteUrl,
  softwareHref,
  toolUrl,
} from "../../software-data";
import styles from "../../page.module.css";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = knowledgeArticleFromSlug(slug);

  if (!article) {
    return {};
  }

  const title = articleSeoTitle(article);
  const description = articleSeoDescription(article);

  return {
    title,
    description,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    alternates: {
      canonical: blogHref(article),
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: blogHref(article),
      siteName,
      type: "article",
      images: [
        {
          url: defaultOgImage,
          width: 1568,
          height: 1003,
          alt: `${article.title} by ${siteName}`,
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

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = knowledgeArticleFromSlug(slug);

  if (!article) {
    notFound();
  }

  const summary = categorySummaries[article.niche];
  const tools = topToolsForNiche(article.niche);
  const comparisons = comparisonPages.filter((comparison) => comparison.niche === article.niche);
  const reviews = relatedReviewLinks(article.niche);
  const leadingTool = tools[0];
  const decisionChecklist = [
    "Define the workflow you need this software to improve.",
    "Compare limits, pricing triggers, integrations, and support before a trial.",
    "Read at least two reviews and one direct comparison before clicking out.",
    "Verify current vendor pricing, terms, and feature availability directly.",
  ];
  const readerPromise = [
    {
      label: "Best for",
      value: `${article.niche} buyers comparing real options`,
    },
    {
      label: "Decision stage",
      value: article.intent,
    },
    {
      label: "Next action",
      value: leadingTool ? `Start with ${leadingTool.name}, then compare alternatives` : "Compare the shortlist",
    },
  ];
  const structuredData = [
    breadcrumbStructuredData([
      { name: "Home", url: siteUrl },
      { name: "Knowledge Centre", url: `${siteUrl}/knowledge-centre` },
      { name: summary.title, url: `${siteUrl}${knowledgeCategoryHref(article.niche)}` },
      { name: article.title, url: `${siteUrl}${blogHref(article)}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: `${siteUrl}${blogHref(article)}`,
      datePublished: lastUpdated,
      dateModified: lastUpdated,
      author: {
        "@type": "Person",
        name: editorialAuthor.name,
        url: `${siteUrl}${editorialAuthor.url}`,
        jobTitle: editorialAuthor.title,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      mainEntityOfPage: `${siteUrl}${blogHref(article)}`,
      articleSection: article.niche,
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((faq) => ({
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
        <nav className={styles.nav} aria-label="Article navigation">
          <Link href="/knowledge-centre">Knowledge</Link>
          <Link href={knowledgeCategoryHref(article.niche)}>This Hub</Link>
          <Link href={categoryHref(article.niche)}>Tools</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link className={styles.navAction} href={categoryHref(article.niche)}>
          Compare Tools
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.articleHero}>
        <Link className={styles.backLink} href={knowledgeCategoryHref(article.niche)}>
          <ChevronLeft size={17} aria-hidden="true" />
          {summary.title} hub
        </Link>
        <p className={styles.categoryKicker}>
          {article.intent} / {article.readingTime} / Updated {lastUpdated}
        </p>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div className={styles.articleHeroActions}>
          <Link className={styles.primaryButton} href={categoryHref(article.niche)}>
            Compare {article.niche} tools
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          {leadingTool ? (
            <Link className={styles.secondaryButton} href={softwareHref(leadingTool)}>
              Read {leadingTool.name} review
            </Link>
          ) : null}
        </div>
        <div className={styles.categoryStats}>
          <span>{article.primaryKeyword}</span>
          <span>{article.niche}</span>
          <span>{tools.length} tools referenced</span>
        </div>
        <div className={styles.articlePromiseGrid}>
          {readerPromise.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <p className={styles.affiliateNote}>
          Affiliate disclosure: links may become affiliate links. We keep the
          buying criteria, review path, and comparison links visible before
          outbound clicks.
        </p>
      </section>

      <section className={styles.reviewLayout}>
        <article className={styles.longformArticle}>
          <section className={styles.articleIntroPanel} id="quick-answer">
            <div>
              <span className={styles.articleEyebrow}>
                <BadgeCheck size={16} aria-hidden="true" />
                Editorial quick take
              </span>
              <h2>Use this guide to avoid choosing the loudest tool instead of the right one.</h2>
              <p>
                Start here to understand the buying criteria, then move into the{" "}
                <Link className={styles.tableNameLink} href={categoryHref(article.niche)}>
                  {summary.title.toLowerCase()} comparison
                </Link>{" "}
                and individual reviews when you are ready to shortlist vendors.
              </p>
            </div>
            <div className={styles.articleVerdictBox}>
              <span>Recommended first move</span>
              <strong>
                {leadingTool ? `Compare ${leadingTool.name} against 2 alternatives` : "Compare 3 serious options"}
              </strong>
              <p>
                The best software decision comes from comparing workflow fit,
                pricing pressure, product limits, and switching cost together.
              </p>
            </div>
          </section>

          <section className={styles.articleFramework} id="decision-framework">
            <div>
              <span className={styles.articleEyebrow}>
                <ListChecks size={16} aria-hidden="true" />
                Decision framework
              </span>
              <h2>What to check before you choose</h2>
            </div>
            <div className={styles.checklistGrid}>
              {decisionChecklist.map((item) => (
                <div key={item}>
                  <Check size={17} aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {article.sections.map((section) => (
            <section className={styles.articleContentSection} key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <section className={styles.articleContentSection}>
            <span className={styles.articleEyebrow}>
              <ShieldCheck size={16} aria-hidden="true" />
              SakuStack evaluation method
            </span>
            <h2>How we turn research into a shortlist</h2>
            <p>
              We look for a clear buyer use case, visible pricing path, feature
              depth, review signals, alternatives, and the next page a reader
              should visit before making a decision. That keeps the research
              process practical, transparent, and easier to verify.
            </p>
          </section>

          <section className={styles.reviewSection} id="comparison-snapshot">
            <h2>Comparison snapshot</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Best for</th>
                    <th>Pricing angle</th>
                    <th>Review path</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={`${tool.name}-article-row`}>
                      <td>
                        <strong>
                          <a
                            className={styles.tableNameLink}
                            href={toolUrl(tool)}
                            rel="sponsored noopener noreferrer"
                            target="_blank"
                          >
                            {tool.name}
                          </a>
                        </strong>
                      </td>
                      <td>{tool.bestFor}</td>
                      <td>{tool.pricing}</td>
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
          </section>

          <section className={styles.reviewSection} id="tools-to-compare-first">
            <h2>Tools to compare first</h2>
            <div className={styles.toolMiniGrid}>
              {tools.map((tool) => (
                <div className={styles.toolMiniCard} key={tool.name}>
                  <span className={styles.score}>
                    <Star size={14} fill="currentColor" aria-hidden="true" />
                    {tool.rating}
                  </span>
                  <h3>
                    <a
                      className={styles.toolNameLink}
                      href={toolUrl(tool)}
                      rel="sponsored noopener noreferrer"
                      target="_blank"
                    >
                      {tool.name}
                    </a>
                  </h3>
                  <p>{tool.bestFor}</p>
                  <Link className={styles.tableNameLink} href={softwareHref(tool)}>
                    Read review
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleCtaBand}>
            <div>
              <span>Next step</span>
              <h2>Move from reading to shortlisting.</h2>
              <p>
                Compare the category page first, then open reviews for the two
                or three tools that match your workflow and budget.
              </p>
            </div>
            <Link className={styles.primaryButton} href={categoryHref(article.niche)}>
              Open {summary.title}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </section>

          <section className={styles.reviewSection}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {article.faq.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.categoryAside}>
          <div className={styles.articleTocCard}>
            <h2>In this guide</h2>
            <div className={styles.categoryLinkList}>
              <a href="#quick-answer">Quick take</a>
              <a href="#decision-framework">Decision framework</a>
              <a href="#comparison-snapshot">Comparison snapshot</a>
              <a href="#tools-to-compare-first">Tool shortlist</a>
            </div>
          </div>
          <div>
            <h2>Article role</h2>
            <p>{article.intent}</p>
            <p>{article.primaryKeyword}</p>
          </div>
          <div>
            <h2>Next pages</h2>
            <div className={styles.categoryLinkList}>
              <Link href={knowledgeCategoryHref(article.niche)}>
                <BookOpen size={15} aria-hidden="true" />
                {summary.title} hub
              </Link>
              <Link href={categoryHref(article.niche)}>{summary.title}</Link>
            </div>
          </div>
          <div>
            <h2>Reviews</h2>
            <div className={styles.categoryLinkList}>
              {reviews.map((review) => (
                <Link href={review.href} key={review.href}>
                  {review.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Comparisons</h2>
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
