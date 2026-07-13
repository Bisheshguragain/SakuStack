"use client";

import Link from "next/link";
import { Filter, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";

import ToolLogo from "../components/ToolLogo";
import {
  categoryHref,
  categoryNiches,
  categorySummaries,
  comparisonFocus,
  software,
  softwareHref,
  type CategoryNiche,
} from "../software-data";
import styles from "../page.module.css";

type DirectoryFilter = "All" | CategoryNiche;

export default function ToolsDirectoryClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DirectoryFilter>("All");

  const tools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return software
      .filter((tool) => category === "All" || tool.niche === category)
      .filter((tool) => {
        if (!normalizedQuery) return true;
        return [tool.name, tool.niche, tool.bestFor, tool.pricing, tool.features.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  }, [category, query]);

  return (
    <>
      <section className={styles.directoryControls}>
        <label className={styles.directorySearch} htmlFor="tool-search">
          <Search size={18} aria-hidden="true" />
          <input
            id="tool-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools, categories, features, or pricing"
          />
        </label>
        <div className={styles.directoryTabs} aria-label="Filter tools by category">
          {(["All", ...categoryNiches] as DirectoryFilter[]).map((item) => (
            <button
              className={item === category ? styles.activeTab : ""}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              <Filter size={14} aria-hidden="true" />
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.directoryResults} aria-label="Tool directory results">
        <div className={styles.sectionTop}>
          <div>
            <h2>{tools.length} tools found</h2>
            <p>
              Open a review for details, compare category pages, or use the
              vendor website after checking pricing, features, and review
              signals.
            </p>
          </div>
        </div>
        <div className={styles.directoryGrid}>
          {tools.map((tool) => (
            <article
              className={styles.directoryToolCard}
              data-niche={tool.niche}
              key={`${tool.niche}-${tool.name}`}
            >
              <div className={styles.directoryToolHead}>
                <ToolLogo tool={tool} />
                <div>
                  <Link href={softwareHref(tool)}>{tool.name}</Link>
                  <span>{tool.niche}</span>
                </div>
                <strong>
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  {tool.rating}
                </strong>
              </div>
              <p>{tool.bestFor}</p>
              <dl>
                <div>
                  <dt>Pricing</dt>
                  <dd>{tool.pricing}</dd>
                </div>
                <div>
                  <dt>Compare on</dt>
                  <dd>{comparisonFocus(tool)}</dd>
                </div>
              </dl>
              <div className={styles.directoryActions}>
                <Link href={softwareHref(tool)}>Read review</Link>
                <Link href={categoryHref(tool.niche)}>
                  {categorySummaries[tool.niche].title}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
