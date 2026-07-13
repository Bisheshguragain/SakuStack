import type { Metadata } from "next";
import Link from "next/link";

import { lastUpdated } from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "SakuStack terms of use covering editorial content, vendor links, no warranties, limitation of liability, acceptable use, and user responsibilities.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  "Acceptance of terms",
  "Editorial information only",
  "No warranties",
  "Third-party vendors",
  "Affiliate and advertising relationships",
  "User responsibilities",
  "Limitation of liability",
  "Indemnity",
  "Changes and availability",
  "Contact",
];

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          Back to SakuStack
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Terms of Use</h1>
        <p>
          These Terms govern your use of SakuStack, including software reviews,
          category pages, comparison pages, outbound links, disclosures, and
          editorial content.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Research content only</span>
          <span>No vendor guarantee</span>
          <span>Use at your own risk</span>
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
              SakuStack helps you research tools. It does not sell the software,
              control vendor terms, guarantee outcomes, or replace your own due
              diligence.
            </p>
          </div>

          <section id="acceptance-of-terms" className={styles.legalCard}>
            <h2>Acceptance of terms</h2>
            <p>
              By accessing or using SakuStack, you agree to these Terms of Use,
              our Privacy Policy, Affiliate Disclosure, and Review Methodology.
              If you do not agree, do not use the site.
            </p>
          </section>

          <section id="editorial-information-only" className={styles.legalCard}>
            <h2>Editorial information only</h2>
            <p>
              SakuStack provides general editorial information, software
              research, rankings, comparisons, review templates, and outbound
              links. Content is not legal, financial, tax, accounting,
              procurement, investment, cybersecurity, compliance, or professional
              advice.
            </p>
            <p>
              You are responsible for deciding whether any product, vendor,
              contract, workflow, integration, or purchase is suitable for your
              needs.
            </p>
          </section>

          <section id="no-warranties" className={styles.legalCard}>
            <h2>No warranties</h2>
            <p>
              SakuStack is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. To the fullest extent permitted by law, we
              disclaim all warranties, express or implied, including warranties
              of accuracy, completeness, fitness for a particular purpose,
              merchantability, non-infringement, availability, security, and
              error-free operation.
            </p>
          </section>

          <section id="third-party-vendors" className={styles.legalCard}>
            <h2>Third-party vendors</h2>
            <p>
              We do not own, operate, control, or guarantee third-party software
              products or vendor websites. Vendors are solely responsible for
              their own pricing, claims, product features, contracts, data
              processing terms, security, uptime, support, refunds, billing, and
              customer relationships.
            </p>
            <p>
              Any purchase, trial, subscription, cancellation, refund,
              implementation, data migration, or dispute is between you and the
              applicable vendor.
            </p>
          </section>

          <section id="affiliate-and-advertising-relationships" className={styles.legalCard}>
            <h2>Affiliate and advertising relationships</h2>
            <p>
              SakuStack may earn compensation from affiliate links, referral
              links, sponsored links, paid placements, advertising, partner
              programs, or other commercial relationships. See our{" "}
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for
              more detail.
            </p>
          </section>

          <section id="user-responsibilities" className={styles.legalCard}>
            <h2>User responsibilities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use SakuStack for unlawful, deceptive, harmful, or abusive purposes.</li>
              <li>Attempt to disrupt, scrape abusively, reverse engineer, or attack the site.</li>
              <li>Rely on SakuStack as the only source for a business-critical purchase.</li>
              <li>Misrepresent SakuStack content as vendor-approved or legal advice.</li>
            </ul>
          </section>

          <section id="limitation-of-liability" className={styles.legalCard}>
            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law, SakuStack and
              its owners, operators, contributors, affiliates, and service
              providers will not be liable for indirect, incidental, special,
              consequential, exemplary, punitive, or business-loss damages,
              including lost profits, lost revenue, lost data, lost goodwill,
              procurement errors, vendor disputes, downtime, implementation
              failures, or reliance on content.
            </p>
            <p>
              Where liability cannot be excluded, our aggregate liability will be
              limited to the greater of the amount you paid directly to SakuStack
              for site access in the previous twelve months or 100 USD.
            </p>
          </section>

          <section id="indemnity" className={styles.legalCard}>
            <h2>Indemnity</h2>
            <p>
              To the extent permitted by law, you agree to defend, indemnify, and
              hold harmless SakuStack and its owners, operators, contributors,
              affiliates, and service providers from claims, liabilities,
              damages, losses, and expenses arising from your use of the site,
              your violation of these Terms, your misuse of third-party vendor
              services, or your business decisions based on site content.
            </p>
          </section>

          <section id="changes-and-availability" className={styles.legalCard}>
            <h2>Changes and availability</h2>
            <p>
              We may update, remove, redirect, monetize, suspend, or discontinue
              any page, ranking, link, category, review, score, or feature at any
              time. We may also update these Terms. Continued use of SakuStack
              after changes means you accept the updated Terms.
            </p>
          </section>

          <section id="contact" className={styles.legalCard}>
            <h2>Contact</h2>
            <p>
              For terms-related questions, contact{" "}
              <a href="mailto:legal@sakustack.com">legal@sakustack.com</a>.
            </p>
          </section>

          <p className={styles.legalFinePrint}>
            These Terms are a protective draft for a software affiliate and
            review site. They are not legal advice and should be reviewed by
            counsel before public launch, monetization, or paid partnerships.
          </p>
        </article>
      </section>
    </main>
  );
}
