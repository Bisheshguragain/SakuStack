import type { Metadata } from "next";
import Link from "next/link";

import { lastUpdated } from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Review Methodology",
  description:
    "How SakuStack evaluates software categories, review pages, comparison pages, scores, affiliate links, limitations, and updates.",
  alternates: {
    canonical: "/methodology",
  },
};

const sections = [
  "What our reviews are for",
  "Scoring framework",
  "Sources and limitations",
  "How rankings are updated",
  "Affiliate independence",
  "What our scores do not mean",
  "Vendor corrections",
];

export default function MethodologyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          Back to SakuStack
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Review Methodology</h1>
        <p>
          SakuStack uses a consistent editorial framework to turn software
          categories into buyer-friendly shortlists, reviews, and comparisons.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Use case first</span>
          <span>Scores are editorial signals</span>
          <span>Affiliate status is not a guarantee</span>
        </div>
      </section>

      <section className={styles.legalShell}>
        <aside className={styles.legalToc}>
          <strong>On this page</strong>
          {sections.map((section) => (
            <a href={`#${section.toLowerCase().replaceAll(" ", "-")}`} key={section}>
              {section}
            </a>
          ))}
        </aside>

        <article className={styles.legalArticle}>
          <div className={styles.legalCallout}>
            <strong>Plain-English summary</strong>
            <p>
              We rank software to help readers build a shortlist, not to certify
              that any tool is perfect, risk-free, compliant, or the best choice
              for every company.
            </p>
          </div>

          <section id="what-our-reviews-are-for" className={styles.legalCard}>
            <h2>What our reviews are for</h2>
            <p>
              SakuStack reviews are designed to help readers quickly compare
              software by category, use case, pricing angle, core features,
              alternatives, and buying criteria. They are a research starting
              point and shortlist builder.
            </p>
            <p>
              Reviews are not procurement advice, legal advice, compliance
              advice, security certification, financial advice, or a guarantee
              that a product will meet your specific requirements.
            </p>
          </section>

          <section id="scoring-framework" className={styles.legalCard}>
            <h2>Scoring framework</h2>
            <p>Our editorial scorecards may consider:</p>
            <div className={styles.legalChecklist}>
              <span>Use case fit</span>
              <span>Feature depth</span>
              <span>Pricing clarity</span>
              <span>Comparison value</span>
              <span>Category relevance</span>
              <span>Buyer intent</span>
              <span>Alternatives</span>
              <span>Public review signals</span>
            </div>
            <p>
              Scores are directional editorial signals. They help readers scan
              options, but they should not be treated as objective measurements,
              certifications, endorsements, or promises of performance.
            </p>
          </section>

          <section id="sources-and-limitations" className={styles.legalCard}>
            <h2>Sources and limitations</h2>
            <p>
              SakuStack may rely on public product pages, pricing pages, vendor
              documentation, review platforms, marketplace listings, affiliate
              program pages, product announcements, and editorial judgment.
              Public information may be incomplete, outdated, promotional, or
              interpreted differently by buyers.
            </p>
            <p>
              We do not guarantee that every product has been personally tested
              in every plan, region, integration, security configuration, or
              business scenario.
            </p>
          </section>

          <section id="how-rankings-are-updated" className={styles.legalCard}>
            <h2>How rankings are updated</h2>
            <p>
              Rankings, scores, product descriptions, pricing notes, comparison
              pages, and outbound links may change when products launch features,
              remove features, change pricing, alter affiliate programs, receive
              new review signals, or no longer fit a category.
            </p>
            <p>
              The &quot;updated&quot; date indicates when the page template or
              editorial data was last revised. It does not guarantee that every
              vendor detail changed on that exact date.
            </p>
          </section>

          <section id="affiliate-independence" className={styles.legalCard}>
            <h2>Affiliate independence</h2>
            <p>
              A product may appear on SakuStack because it is useful, popular,
              commercially relevant, frequently compared, or likely to answer a
              buyer-intent search. A product may also have an affiliate link.
              Affiliate status does not guarantee a top ranking or positive
              editorial treatment.
            </p>
            <p>
              Where links are commercial, SakuStack aims to disclose that
              relationship clearly and mark outbound links appropriately.
            </p>
          </section>

          <section id="what-our-scores-do-not-mean" className={styles.legalCard}>
            <h2>What our scores do not mean</h2>
            <p>Scores and rankings do not mean that:</p>
            <ul>
              <li>A tool is risk-free or suitable for every reader.</li>
              <li>A vendor is financially stable or legally compliant.</li>
              <li>A product meets your security, privacy, procurement, or industry requirements.</li>
              <li>Pricing, plan limits, support levels, or features will remain unchanged.</li>
              <li>SakuStack is responsible for vendor claims, contracts, or outcomes.</li>
            </ul>
          </section>

          <section id="vendor-corrections" className={styles.legalCard}>
            <h2>Vendor corrections</h2>
            <p>
              Vendors or readers may contact{" "}
              <a href="mailto:editorial@sakustack.com">editorial@sakustack.com</a>{" "}
              to flag factual issues. We may review correction requests, but we
              do not guarantee changes, response times, placement, ranking, or
              removal.
            </p>
          </section>

          <p className={styles.legalFinePrint}>
            This methodology is designed to be transparent and protective, but it
            is not legal advice. Review with counsel before relying on it for
            regulated markets, paid placements, or formal vendor review programs.
          </p>
        </article>
      </section>
    </main>
  );
}
