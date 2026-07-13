import type { Metadata } from "next";
import Link from "next/link";

import { lastUpdated } from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Monetization Policy",
  description:
    "How SakuStack uses affiliate links, display ads, sponsorships, newsletters, and commercial partnerships while preserving editorial clarity.",
  alternates: {
    canonical: "/monetization-policy",
  },
};

const sections = [
  "Revenue channels",
  "AdSense readiness rules",
  "Affiliate and sponsor rules",
  "Consent and privacy",
  "Editorial safeguards",
];

export default function MonetizationPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          Back to SakuStack
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Monetization Policy</h1>
        <p>
          SakuStack can earn money from several channels, but the site should
          stay useful first: clear content, honest disclosures, safe ad
          placement, and no tricks to force clicks.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Affiliate links</span>
          <span>Google AdSense ready</span>
          <span>Sponsored content guardrails</span>
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
            <strong>Core rule</strong>
            <p>
              Monetization should never make content confusing. Ads, affiliate
              buttons, sponsored placements, and vendor links must be clearly
              separated from navigation and editorial verdicts.
            </p>
          </div>

          <section id="revenue-channels" className={styles.legalCard}>
            <h2>Revenue channels</h2>
            <p>SakuStack may earn revenue from:</p>
            <ul>
              <li>Affiliate and referral commissions from software vendors.</li>
              <li>Display advertising, including Google AdSense.</li>
              <li>Newsletter sponsorships or placements.</li>
              <li>Sponsored comparison placements clearly labeled as sponsored.</li>
              <li>Lead generation or partnership campaigns where legally permitted.</li>
            </ul>
          </section>

          <section id="adsense-readiness-rules" className={styles.legalCard}>
            <h2>AdSense readiness rules</h2>
            <ul>
              <li>Do not ask users to click ads or imply ads support the site.</li>
              <li>Do not place ads where users expect navigation, downloads, or buttons.</li>
              <li>Do not build thin pages primarily to show ads.</li>
              <li>Keep privacy, disclosure, terms, and methodology pages easy to find.</li>
              <li>Use a valid <code>ads.txt</code> file once the real publisher ID is available.</li>
            </ul>
          </section>

          <section id="affiliate-and-sponsor-rules" className={styles.legalCard}>
            <h2>Affiliate and sponsor rules</h2>
            <p>
              Affiliate links can appear in reviews, comparisons, category
              pages, and articles. Sponsored content must be visibly labeled.
              Payment does not guarantee a positive verdict, ranking, score, or
              inclusion.
            </p>
          </section>

          <section id="consent-and-privacy" className={styles.legalCard}>
            <h2>Consent and privacy</h2>
            <p>
              Non-essential advertising, analytics, and affiliate tracking
              should respect user consent requirements. For EEA, UK, and Swiss
              users, Google ad serving should use a Google-certified CMP before
              production ads are enabled.
            </p>
          </section>

          <section id="editorial-safeguards" className={styles.legalCard}>
            <h2>Editorial safeguards</h2>
            <p>
              Reviews and guides should explain what was compared, who the tool
              is best for, which limitations matter, and what users should verify
              directly with the vendor before buying.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
