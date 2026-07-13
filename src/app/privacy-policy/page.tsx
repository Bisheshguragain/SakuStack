import type { Metadata } from "next";
import Link from "next/link";

import { lastUpdated } from "../software-data";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SakuStack privacy policy covering data collection, cookies, analytics, affiliate tracking, newsletter signups, user rights, retention, and third-party links.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  "Scope",
  "Information we may collect",
  "How we use information",
  "Cookies analytics and affiliate tracking",
  "Advertising and Google AdSense",
  "Third-party websites",
  "Your choices and rights",
  "Retention and security",
  "Children and international visitors",
  "Policy changes",
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.legalHero}>
        <Link className={styles.backLink} href="/">
          Back to SakuStack
        </Link>
        <p className={styles.categoryKicker}>Updated {lastUpdated}</p>
        <h1>Privacy Policy</h1>
        <p>
          This policy explains how SakuStack may collect, use, disclose, and
          protect information when you browse software reviews, click outbound
          links, or later submit forms such as newsletter signups.
        </p>
        <div className={styles.legalMetaGrid}>
          <span>Static site today</span>
          <span>Newsletter and analytics ready language</span>
          <span>Vendor sites have their own policies</span>
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
              SakuStack should collect as little personal information as
              possible. If analytics, newsletters, affiliate tracking, or forms
              are added later, this policy should be updated before those tools
              go live.
            </p>
          </div>

          <section id="scope" className={styles.legalCard}>
            <h2>Scope</h2>
            <p>
              This Privacy Policy applies to SakuStack pages, content, reviews,
              comparisons, forms, and related site features. It does not apply to
              third-party software vendors, affiliate networks, payment
              processors, newsletter providers, analytics providers, hosting
              platforms, or websites we link to.
            </p>
          </section>

          <section id="information-we-may-collect" className={styles.legalCard}>
            <h2>Information we may collect</h2>
            <p>Depending on the features enabled, we may collect:</p>
            <ul>
              <li>Contact information you submit, such as an email address.</li>
              <li>Technical information, such as device type, browser, pages viewed, referrer, approximate location, and IP-derived analytics data.</li>
              <li>Interaction information, such as category pages viewed, links clicked, forms submitted, and newsletter preferences.</li>
              <li>Affiliate or referral information, such as click identifiers, campaign parameters, and conversion events provided by affiliate partners.</li>
            </ul>
            <p>
              We do not intentionally collect sensitive personal information,
              payment card data, government identifiers, health information, or
              account passwords through SakuStack.
            </p>
          </section>

          <section id="how-we-use-information" className={styles.legalCard}>
            <h2>How we use information</h2>
            <p>We may use information to:</p>
            <ul>
              <li>Operate, maintain, secure, and improve the site.</li>
              <li>Understand which categories, reviews, and comparisons are useful.</li>
              <li>Send newsletter updates if you request them.</li>
              <li>Track affiliate referrals, commissions, and campaign performance.</li>
              <li>Prevent fraud, abuse, spam, or misuse of the site.</li>
              <li>Comply with legal, accounting, tax, or platform obligations.</li>
            </ul>
          </section>

          <section id="cookies-analytics-and-affiliate-tracking" className={styles.legalCard}>
            <h2>Cookies analytics and affiliate tracking</h2>
            <p>
              SakuStack may use cookies, pixels, local storage, server logs,
              UTM parameters, affiliate click IDs, analytics scripts, or similar
              technologies to understand traffic, measure conversions, and
              attribute referrals. Some tracking may be set by third-party
              vendors or affiliate networks after you click an outbound link.
            </p>
            <p>
              Browser settings may allow you to block or delete cookies. Blocking
              cookies may affect analytics, attribution, personalization, or
              future newsletter/form features.
            </p>
          </section>

          <section id="advertising-and-google-adsense" className={styles.legalCard}>
            <h2>Advertising and Google AdSense</h2>
            <p>
              SakuStack may use Google AdSense, Google advertising products, or
              other advertising partners to display ads. Third-party vendors,
              including Google, may use cookies to serve ads based on a
              visitor&apos;s prior visits to SakuStack or other websites.
              Google&apos;s use of advertising cookies enables Google and its
              partners to serve ads based on visits to this site and other sites
              on the internet.
            </p>
            <p>
              Visitors can opt out of personalized advertising through{" "}
              <a href="https://adssettings.google.com/" rel="noopener noreferrer" target="_blank">
                Google Ads Settings
              </a>
              . Visitors can also learn about opting out of some third-party
              vendors&apos; personalized advertising cookies through{" "}
              <a href="https://www.aboutads.info/" rel="noopener noreferrer" target="_blank">
                aboutads.info
              </a>
              .
            </p>
            <p>
              For visitors in regions where consent is required, advertising,
              analytics, and non-essential cookies should not be enabled until
              the required consent has been collected through an appropriate
              consent mechanism. If SakuStack serves Google ads to users in the
              EEA, the UK, or Switzerland, we should use a Google-certified
              Consent Management Platform that supports the IAB Transparency and
              Consent Framework before real ads are served.
            </p>
          </section>

          <section id="third-party-websites" className={styles.legalCard}>
            <h2>Third-party websites</h2>
            <p>
              When you click a vendor, affiliate, or external resource link, you
              leave SakuStack. Third-party sites control their own privacy
              practices, cookies, account creation, billing, contracts, support,
              and security. Review their privacy policies and terms before
              submitting information or purchasing.
            </p>
          </section>

          <section id="your-choices-and-rights" className={styles.legalCard}>
            <h2>Your choices and rights</h2>
            <p>
              Depending on your location, you may have rights to access,
              correct, delete, restrict, object to, or request a copy of certain
              personal information. You may also have rights relating to cookie
              consent, marketing opt-outs, or sale/share opt-outs if applicable.
            </p>
            <p>
              To make a request, contact us at{" "}
              <a href="mailto:privacy@sakustack.com">privacy@sakustack.com</a>.
              We may need to verify your request before responding. If we do not
              yet hold personal information about you, we may not be able to
              fulfill a data-specific request.
            </p>
          </section>

          <section id="retention-and-security" className={styles.legalCard}>
            <h2>Retention and security</h2>
            <p>
              We aim to retain personal information only as long as reasonably
              necessary for the purposes described in this policy, unless a
              longer period is required for legal, accounting, tax, fraud
              prevention, dispute, or operational reasons.
            </p>
            <p>
              No website, hosting environment, email provider, or analytics tool
              can be guaranteed completely secure. We use reasonable measures for
              the current stage of the site, but you use SakuStack and linked
              third-party services at your own risk.
            </p>
          </section>

          <section id="children-and-international-visitors" className={styles.legalCard}>
            <h2>Children and international visitors</h2>
            <p>
              SakuStack is intended for business and software research audiences,
              not children. We do not knowingly collect personal information from
              children under 13. If you believe a child has provided information,
              contact us and we will take reasonable steps to delete it.
            </p>
            <p>
              Visitors may access SakuStack from different countries. Your
              information may be processed where our hosting, analytics,
              newsletter, affiliate, or service providers operate, subject to
              applicable law and provider terms.
            </p>
          </section>

          <section id="policy-changes" className={styles.legalCard}>
            <h2>Policy changes</h2>
            <p>
              We may update this Privacy Policy when SakuStack adds analytics,
              forms, newsletters, affiliate networks, advertising, new vendors,
              or other features. The updated date above indicates the latest
              revision.
            </p>
          </section>

          <p className={styles.legalFinePrint}>
            This privacy policy is a launch-ready draft for a content and
            affiliate site. It is not legal advice. Review it with counsel before
            adding production analytics, email marketing, cookies, or real
            affiliate tracking.
          </p>
        </article>
      </section>
    </main>
  );
}
