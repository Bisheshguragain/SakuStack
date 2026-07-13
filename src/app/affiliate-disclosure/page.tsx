import type { Metadata } from "next";
import Link from "next/link";

import { lastUpdated } from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "SakuStack affiliate disclosure explaining commissions, sponsored links, editorial independence, vendor responsibility, and buyer obligations.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

const sections = [
  "Our relationship with vendors",
  "Editorial independence",
  "What we do not guarantee",
  "Your responsibility as a buyer",
  "How links are marked",
  "Display ads sponsorships and monetization",
  "Changes to this disclosure",
];

export default function AffiliateDisclosurePage() {
  return (
    <main className={styles.page}>
      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          Back to SakuStack
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Affiliate Disclosure</h1>
        <p>
          SakuStack is an editorial software research and comparison site. We
          may earn compensation when you click certain links or buy software
          through vendor, affiliate, referral, or partner links on this site.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Clear relationship disclosure</span>
          <span>Editorial rankings not guaranteed by payment</span>
          <span>Vendor terms control purchases</span>
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
              Some links may pay us. We still aim to rank tools based on
              usefulness, product fit, pricing clarity, and buyer intent. You
              should verify all vendor claims, pricing, contracts, and terms
              directly before buying.
            </p>
          </div>

          <section id="our-relationship-with-vendors" className={styles.legalCard}>
            <h2>Our relationship with vendors</h2>
            <p>
              SakuStack may participate in affiliate programs, partner programs,
              referral programs, sponsorships, or commercial arrangements with
              software vendors, affiliate networks, and partner platforms.
              Compensation may include commissions, flat referral fees, recurring
              revenue share, lead fees, bounty payments, free access, discounts,
              or other consideration.
            </p>
            <p>
              A financial relationship is a material connection. We disclose it
              so visitors can evaluate our recommendations with appropriate
              context.
            </p>
          </section>

          <section id="editorial-independence" className={styles.legalCard}>
            <h2>Editorial independence</h2>
            <p>
              Affiliate availability does not guarantee inclusion, ranking, a
              positive review, a badge, or a recommendation. We may include tools
              that do not pay us and exclude tools that do. Our editorial
              framework considers use case fit, feature coverage, pricing
              clarity, buyer intent, alternatives, public product information,
              and review signals.
            </p>
            <p>
              We may update rankings, scores, wording, categories, or outbound
              links at any time without notice.
            </p>
          </section>

          <section id="what-we-do-not-guarantee" className={styles.legalCard}>
            <h2>What we do not guarantee</h2>
            <p>
              We do not guarantee that software information is complete,
              current, error-free, suitable for your business, available in your
              location, compliant with your industry, or priced exactly as shown.
              Vendors can change pricing, product features, packaging, trial
              terms, security claims, service levels, refund policies, and
              contracts without notifying us.
            </p>
            <p>
              SakuStack is not responsible for vendor websites, vendor claims,
              product performance, support outcomes, billing, refunds, contract
              disputes, downtime, data loss, business losses, or any decision you
              make after leaving SakuStack.
            </p>
          </section>

          <section id="your-responsibility-as-a-buyer" className={styles.legalCard}>
            <h2>Your responsibility as a buyer</h2>
            <p>
              Before buying, you should independently verify pricing, features,
              limits, renewal terms, cancellation terms, refund policies, data
              processing terms, security documentation, service levels,
              integrations, and contract obligations directly with the vendor.
            </p>
            <p>
              Our content is a research starting point. It is not legal,
              financial, procurement, compliance, cybersecurity, tax, accounting,
              or professional advice.
            </p>
          </section>

          <section id="how-links-are-marked" className={styles.legalCard}>
            <h2>How links are marked</h2>
            <p>
              Outbound vendor links may use attributes such as{" "}
              <code>rel=&quot;sponsored noopener noreferrer&quot;</code> where
              appropriate. These attributes help identify commercial links and
              reduce security risk when opening third-party sites.
            </p>
            <p>
              We also place affiliate disclosure language near commercial
              content, comparison pages, category pages, review pages, and site
              footers so the relationship is visible before users click.
            </p>
          </section>

          <section id="display-ads-sponsorships-and-monetization" className={styles.legalCard}>
            <h2>Display ads sponsorships and monetization</h2>
            <p>
              SakuStack may monetize through affiliate links, referral links,
              display advertising such as Google AdSense, sponsorships,
              newsletter placements, paid listings, lead generation, or other
              commercial partnerships. Any sponsored placement should be labeled
              clearly and should not be formatted to look like navigation,
              download links, editorial verdicts, or required user actions.
            </p>
            <p>
              We should not ask visitors to click ads, imply that clicking ads
              supports a vendor ranking, place ads in misleading positions, or
              build pages primarily for ad impressions. Ads and commercial links
              should support the content experience, not replace it.
            </p>
          </section>

          <section id="changes-to-this-disclosure" className={styles.legalCard}>
            <h2>Changes to this disclosure</h2>
            <p>
              We may update this disclosure as SakuStack adds new vendors,
              affiliate networks, tracking tools, advertising placements, or
              commercial relationships. The updated date above shows when this
              page was last revised.
            </p>
          </section>

          <p className={styles.legalFinePrint}>
            This page is intended as a practical compliance draft and general
            site disclosure. It is not legal advice and should be reviewed by a
            qualified lawyer before public launch or monetization.
          </p>
        </article>
      </section>
    </main>
  );
}
