"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  Filter,
  Mail,
  PackageSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import styles from "./page.module.css";

import {
  categoryHref,
  categoryNiches,
  categorySummaries,
  comparisonFocus,
  niches,
  popularComparisons,
  quizOptions,
  software,
  softwareHref,
  structuredData,
  toolInitials,
  toolLogoHue,
  toolUrl,
  trendingTools,
  useCaseGroups,
  winners,
  type Niche,
} from "./software-data";
import { knowledgePillars } from "./knowledge-data";

type LogoStyle = CSSProperties & { "--logo-hue": number };

function logoStyle(tool: { name: string }) {
  return { "--logo-hue": toolLogoHue(tool) } as LogoStyle;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Niche>("All");
  const [quizChoice, setQuizChoice] = useState(quizOptions[0]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const filteredTools = useMemo(
    () =>
      activeCategory === "All"
        ? software
        : software.filter((tool) => tool.niche === activeCategory),
    [activeCategory],
  );

  const featuredTools = useMemo(
    () =>
      [...filteredTools]
        .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
        .slice(0, 12),
    [filteredTools],
  );

  const quizPick = useMemo(() => {
    if (quizChoice.includes("AI traffic")) return software.find((tool) => tool.name === "ChatGPT");
    if (quizChoice.includes("mini SaaS")) return software.find((tool) => tool.name === "Lovable");
    return software.find((tool) => tool.name === "HubSpot");
  }, [quizChoice]);

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
        <a className={styles.logo} href="#" aria-label="SakuStack home">
          <span className={styles.logoMark}>
            <PackageSearch size={21} aria-hidden="true" />
          </span>
          <span>SakuStack</span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#reviews">Categories</a>
          <Link href="/tools">Tools</Link>
          <Link href="/deals">Deals</Link>
          <a href="#winners">Top Pages</a>
          <a href="#compare">Matrix</a>
          <Link href="/knowledge-centre">Knowledge</Link>
        </nav>
        <a className={styles.navAction} href="#quiz">
          Start Quiz
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Find tools worth recommending.</h1>
          <p>
            Compare AI tools, SaaS platforms, pricing, features, review scores,
            use cases, and buying considerations across 21 high-intent software
            categories.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#reviews">
              Browse Niches
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondaryButton} href="#winners">
              <Trophy size={18} aria-hidden="true" />
              Top Review Pages
            </a>
          <Link className={styles.secondaryButton} href="/knowledge-centre">
              <Clock3 size={18} aria-hidden="true" />
              Knowledge Centre
            </Link>
            <Link className={styles.secondaryButton} href="/tools">
              <Search size={18} aria-hidden="true" />
              Tool Directory
            </Link>
          </div>
          <div className={styles.trustRow} aria-label="Publishing principles">
            <span>
              <ShieldCheck size={17} aria-hidden="true" />
              Disclosure-first
            </span>
            <span>
              <BarChart3 size={17} aria-hidden="true" />
              Feature-led
            </span>
            <span>
              <Sparkles size={17} aria-hidden="true" />
              Review-ready
            </span>
          </div>
        </div>

        <div className={styles.heroMedia} aria-label="SakuStack software comparison dashboard">
          <Image
            src="/sakustack-hero-dashboard.webp"
            alt="Premium SakuStack dashboard showing software rankings, category cards, scores, and comparison analytics"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div className={styles.heroBrandPlate} aria-hidden="true">
            <span className={styles.heroBrandMark}>
              <PackageSearch size={18} />
            </span>
            <div>
              <strong>SakuStack</strong>
              <span>Software intelligence</span>
            </div>
          </div>
          <div className={styles.floatingPanel}>
            <div className={styles.panelHeader}>
              <span>Directory size</span>
              <strong>{software.length} tools</strong>
            </div>
            <div className={styles.panelRows}>
              <span>21 software categories</span>
              <span>Features + pricing angles</span>
              <span>G2-style score cards</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.discoveryBand} aria-label="Trending software tools">
        <div className={styles.sectionTop}>
          <div>
            <h2>Trending tools</h2>
            <p>
              Fresh software shortlists for AI work, social publishing, sales,
              creators, operations, commerce, and team productivity.
            </p>
          </div>
          <Link className={styles.textLink} href="/tools">
            Explore all tools
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.trendingGrid}>
          {trendingTools.map((tool) => (
            <Link className={styles.trendingCard} href={softwareHref(tool)} key={tool.name}>
              <span
                className={styles.toolLogo}
                style={logoStyle(tool)}
                aria-hidden="true"
              >
                {toolInitials(tool)}
              </span>
              <div>
                <strong>{tool.name}</strong>
                <small>{tool.niche}</small>
              </div>
              <span className={styles.score}>
                <Star size={14} fill="currentColor" aria-hidden="true" />
                {tool.rating}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.useCaseBand} aria-label="Browse by use case">
        <div className={styles.sectionTop}>
          <div>
            <h2>Browse by use case</h2>
            <p>
              Start with the job you need done, then move into category pages,
              reviews, comparisons, and pricing checks.
            </p>
          </div>
        </div>
        <div className={styles.useCaseGrid}>
          {useCaseGroups.map((group) => (
            <article className={styles.useCaseCard} key={group.label}>
              <span>{group.label}</span>
              <h3>{group.description}</h3>
              <div>
                {group.niches.map((niche) => (
                  <Link href={categoryHref(niche)} key={`${group.label}-${niche}`}>
                    {categorySummaries[niche].title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.productBand} id="reviews">
        <div className={styles.sectionTop}>
          <div>
            <h2>21-category software directory</h2>
            <p>
              Filter the software directory by category, then compare review
              scores, use cases, pricing angles, key features, and what matters
              most before choosing a tool.
            </p>
          </div>
          <div className={styles.searchBox}>
            <Search size={17} aria-hidden="true" />
            <span>{filteredTools.length} tools shown</span>
          </div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Software category">
          {niches.map((category) => (
            <button
              className={category === activeCategory ? styles.activeTab : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
              role="tab"
              aria-selected={category === activeCategory}
            >
              <Filter size={15} aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>

        <div className={styles.categoryPageGrid} aria-label="SEO category pages">
          {categoryNiches.map((category) => (
            <a
              className={styles.categoryPageLink}
              data-niche={category}
              href={categoryHref(category)}
              key={category}
            >
              <span>{category}</span>
              <strong>{categorySummaries[category].title}</strong>
              <small>{software.filter((tool) => tool.niche === category).length} tools</small>
            </a>
          ))}
        </div>

        <div className={styles.cardGrid}>
          {featuredTools.map((tool) => (
            <article
              className={styles.toolCard}
              data-niche={tool.niche}
              key={`${tool.niche}-${tool.name}`}
            >
              <div className={styles.cardHead}>
                <span
                  className={styles.toolLogo}
                  style={logoStyle(tool)}
                  aria-hidden="true"
                >
                  {toolInitials(tool)}
                </span>
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
              <div className={styles.cardFoot}>
                <span className={styles.statusBadge}>
                  Review page ready
                </span>
                <a className={styles.reviewCount} href={softwareHref(tool)}>
                  Read review
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.comparisonSpotlight} aria-label="Popular comparisons">
        <div className={styles.sectionTop}>
          <div>
            <h2>Popular comparisons</h2>
            <p>
              Side-by-side pages for high-intent decisions across AI, sales,
              social media, security, proposals, and creator workflows.
            </p>
          </div>
          <a href="#compare" className={styles.textLink}>
            View matrix
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.comparisonGrid}>
          {popularComparisons.map((comparison) => (
            <Link
              className={styles.comparisonCard}
              href={`/compare/${comparison.slug}`}
              key={comparison.slug}
            >
              <span>{categorySummaries[comparison.niche].title}</span>
              <strong>{comparison.title}</strong>
              <small>{comparison.tools.map((tool) => tool.name).join(" vs ")}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.winners} id="winners">
        <div className={styles.sectionTop}>
          <div>
            <h2>Priority comparison pages</h2>
            <p>
              These are the first SEO pages to create because they match strong
              buyer intent, clear comparison angles, and broad software demand.
            </p>
          </div>
          <a href="#compare" className={styles.textLink}>
            View full matrix
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.winnerGrid}>
          {winners.map((winner) => (
            <article className={styles.winnerCard} key={winner.name}>
              <span className={styles.rank}>#{winner.rank}</span>
              <div>
                <p>{winner.niche}</p>
                <h3>
                  <a
                    className={styles.toolNameLink}
                    href={toolUrl(winner)}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    aria-label={`Visit ${winner.name} website`}
                  >
                    {winner.name}
                  </a>
                </h3>
              </div>
              <dl>
                <div>
                  <dt>Page angle</dt>
                  <dd>{winner.pageAngle}</dd>
                </div>
                <div>
                  <dt>Why compare</dt>
                  <dd>{winner.reason}</dd>
                </div>
              </dl>
              <a className={styles.cardLink} href={softwareHref(winner)}>
                Read review
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.compare} id="compare">
        <div className={styles.sectionTop}>
          <div>
            <h2>Full software comparison table</h2>
            <p>
              Directory-style table for all target categories. This is the public
              buyer-facing view: features, pricing angle, score, use case, and
              comparison criteria.
            </p>
          </div>
          <Link href="/deals" className={styles.textLink}>
            View deals
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Niche</th>
                <th>Software</th>
                <th>Rating</th>
                <th>Pricing angle</th>
                <th>Key features</th>
                <th>Compare on</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {software.map((tool) => (
                <tr data-niche={tool.niche} key={`${tool.niche}-${tool.name}`}>
                  <td>{tool.niche}</td>
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
                    <span>{tool.bestFor}</span>
                  </td>
                  <td>
                    <span className={styles.score}>
                      <Star size={14} fill="currentColor" aria-hidden="true" />
                      {tool.rating}
                    </span>
                  </td>
                  <td>{tool.pricing}</td>
                  <td>
                    {tool.features.join(", ")}
                  </td>
                  <td>{comparisonFocus(tool)}</td>
                  <td>
                    <a className={styles.tableNameLink} href={softwareHref(tool)}>
                      Read review
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.quizSection} id="quiz">
        <div className={styles.quizCopy}>
          <h2>Match a stack to your next move</h2>
          <p>
            Choose the content strategy and SakuStack will surface the first
            software review angle to build.
          </p>
        </div>
        <div className={styles.quizPanel}>
          <div className={styles.optionGroup}>
            {quizOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={option === quizChoice ? styles.selectedOption : ""}
                onClick={() => setQuizChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className={styles.recommendation}>
            <p>Recommended first review</p>
            <h3>{quizPick?.name}</h3>
            <span>{quizPick?.bestFor}</span>
            <small>{quizPick ? comparisonFocus(quizPick) : null}</small>
          </div>
        </div>
      </section>

      <section className={styles.guides} id="guides">
        <div className={styles.sectionTop}>
          <div>
            <h2>Knowledge Centre hubs</h2>
            <p>
              SEO content clusters for buying guides, pricing research,
              alternatives articles, reviews, and comparison pages.
            </p>
          </div>
          <Link className={styles.textLink} href="/knowledge-centre">
            Open Knowledge Centre
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.guideGrid}>
          {knowledgePillars.slice(0, 6).map((pillar) => (
            <Link className={styles.guideCard} href={pillar.href} key={pillar.niche}>
              <Clock3 size={18} aria-hidden="true" />
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <span>
                {pillar.articleCount} articles / {pillar.toolCount} tools
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.signup} id="deals">
        <div>
          <h2>Get the monthly stack memo</h2>
          <p>
            One email with new software comparisons, updated pricing notes,
            review page ideas, and tools removed from the shortlist.
          </p>
        </div>
        <form
          className={styles.signupForm}
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) setJoined(true);
          }}
        >
          <label htmlFor="email">Email address</label>
          <div>
            <Mail size={18} aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
            <button type="submit">Join</button>
          </div>
          {joined ? <p>You&apos;re on the list. Watch for the next memo.</p> : null}
        </form>
      </section>
    </main>
  );
}
