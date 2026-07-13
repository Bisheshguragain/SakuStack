import Link from "next/link";
import { PackageSearch } from "lucide-react";

import {
  blogHref,
  knowledgeArticles,
  knowledgePillars,
} from "../knowledge-data";
import {
  categoryHref,
  categoryNiches,
  categorySummaries,
  comparisonPages,
  siteName,
  softwareHref,
  uniqueSoftware,
} from "../software-data";
import styles from "../page.module.css";

const legalLinks = [
  { href: "/about", label: "About SakuStack" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/monetization-policy", label: "Monetization policy" },
  { href: "/methodology", label: "Methodology" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
];

export default function GlobalFooter() {
  const topCategories = categoryNiches.slice(0, 6);
  const featuredGuides = knowledgeArticles.slice(0, 5);
  const popularReviews = uniqueSoftware.slice(0, 6);
  const comparisons = comparisonPages.slice(0, 5);

  return (
    <footer className={styles.globalFooter}>
      <div className={styles.footerBrandBlock}>
        <Link className={styles.footerLogo} href="/" aria-label={`${siteName} home`}>
          <span>
            <PackageSearch size={21} aria-hidden="true" />
          </span>
          {siteName}
        </Link>
        <p>
          Software buying guides, reviews, comparison pages, and category hubs
          for teams choosing AI tools, SaaS platforms, hosting, CRM, ecommerce,
          course platforms, and productivity software.
        </p>
        <p>
          Disclosure: SakuStack may earn commission from vendor or affiliate
          links. Rankings and reviews are editorial and should be verified
          against current vendor pricing, plans, and terms before purchase.
        </p>
        <p>
          Contact: <a href="mailto:hello@sakustack.com">hello@sakustack.com</a>
        </p>
      </div>

      <nav className={styles.globalFooterGrid} aria-label="Footer navigation">
        <div>
          <h2>Categories</h2>
          {topCategories.map((niche) => (
            <Link href={categoryHref(niche)} key={niche}>
              {categorySummaries[niche].title}
            </Link>
          ))}
        </div>

        <div>
          <h2>Knowledge</h2>
          <Link href="/tools">Tool Directory</Link>
          <Link href="/knowledge-centre">Knowledge Centre</Link>
          <Link href="/deals">Software Deals</Link>
          {knowledgePillars.slice(0, 4).map((pillar) => (
            <Link href={pillar.href} key={pillar.niche}>
              {pillar.title}
            </Link>
          ))}
        </div>

        <div>
          <h2>Guides</h2>
          {featuredGuides.map((article) => (
            <Link href={blogHref(article)} key={article.slug}>
              {article.title}
            </Link>
          ))}
        </div>

        <div>
          <h2>Reviews</h2>
          {popularReviews.map((tool) => (
            <Link href={softwareHref(tool)} key={tool.name}>
              {tool.name} review
            </Link>
          ))}
        </div>

        <div>
          <h2>Comparisons</h2>
          {comparisons.map((comparison) => (
            <Link href={`/compare/${comparison.slug}`} key={comparison.slug}>
              {comparison.title}
            </Link>
          ))}
        </div>

        <div>
          <h2>Trust</h2>
          {legalLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className={styles.footerBottomBar}>
        <span>© 2026 {siteName}. All rights reserved.</span>
        <span>Independent software research, reviews, and buying guides.</span>
      </div>
    </footer>
  );
}
