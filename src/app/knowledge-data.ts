import {
  categoryHref,
  categoryNiches,
  categorySlug,
  categorySummaries,
  seoYear,
  software,
  softwareHref,
  type CategoryNiche,
  type Software,
} from "./software-data";

export type KnowledgeArticle = {
  slug: string;
  niche: CategoryNiche;
  title: string;
  description: string;
  intent: "Buyer's guide" | "Pricing research" | "Alternatives";
  readingTime: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  sections: Array<{
    heading: string;
    body: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export function knowledgeCategoryHref(niche: CategoryNiche) {
  return `/knowledge-centre/${categorySlug(niche)}`;
}

export function blogHref(article: Pick<KnowledgeArticle, "slug">) {
  return `/blog/${article.slug}`;
}

function shortTitle(title: string) {
  const shortened = title
    .replace(": 5 Tools to Compare", " Alternatives")
    .replace("How to Choose ", "Choose ")
    .replace(" Pricing Guide", " Pricing");

  if (shortened.length <= 46) {
    return shortened;
  }

  const trimmed = shortened.slice(0, 46);
  return trimmed.replace(/\s+\S*$/, "").trim();
}

function shortDescription(description: string) {
  if (description.length <= 155) {
    return description;
  }

  const trimmed = description.slice(0, 152);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 152).trim()}...`;
}

export function articleSeoTitle(article: KnowledgeArticle) {
  return shortTitle(article.title);
}

export function articleSeoDescription(article: KnowledgeArticle) {
  return shortDescription(article.description);
}

export function topToolsForNiche(niche: CategoryNiche, limit = 5) {
  return software
    .filter((tool) => tool.niche === niche)
    .sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function toolNames(tools: Software[]) {
  return tools.map((tool) => tool.name).join(", ");
}

function articleSlug(niche: CategoryNiche, suffix: string) {
  return `${categorySlug(niche)}-${suffix}`;
}

function buildArticlesForNiche(niche: CategoryNiche): KnowledgeArticle[] {
  const summary = categorySummaries[niche];
  const topTools = topToolsForNiche(niche);
  const names = toolNames(topTools);
  const topTool = topTools[0];

  return [
    {
      slug: articleSlug(niche, "buying-guide"),
      niche,
      title: `How to Choose ${summary.title.replace("Best ", "")} in ${seoYear}`,
      description: `A practical buying guide for ${niche} buyers comparing ${names} by use case, features, review signals, and switching risk.`,
      intent: "Buyer's guide",
      readingTime: "7 min read",
      primaryKeyword: `how to choose ${niche.toLowerCase()} software`,
      secondaryKeywords: [
        `best ${niche.toLowerCase()} tools`,
        `${niche.toLowerCase()} buying guide`,
        `${niche.toLowerCase()} comparison`,
      ],
      sections: [
        {
          heading: "Start with the workflow, not the brand name",
          body: `The strongest ${niche.toLowerCase()} choice depends on the job you need done repeatedly. Shortlist tools by the workflow they support, the people who will use them, and the cost of switching later.`,
        },
        {
          heading: "Compare the shortlist",
          body: `${names} are the first tools to compare in this category. Look at core features, limits, integrations, onboarding effort, security requirements, and whether the product fits your team size.`,
        },
        {
          heading: "Use reviews as signals, not the final answer",
          body: `Review scores help identify momentum, but the final decision should include hands-on testing, pricing verification, support quality, and how well the tool fits your existing stack.`,
        },
      ],
      faq: [
        {
          question: `What is the best ${niche.toLowerCase()} tool?`,
          answer: topTool
            ? `${topTool.name} is a strong starting point in this category, but the best choice depends on your workflow, budget, integrations, and required features.`
            : `The best option depends on your workflow, budget, integrations, and required features.`,
        },
        {
          question: `How many ${niche.toLowerCase()} tools should I compare?`,
          answer:
            "Compare three to five serious options first. That is enough to see pricing patterns, feature gaps, and positioning differences without slowing the decision.",
        },
      ],
    },
    {
      slug: articleSlug(niche, "pricing-guide"),
      niche,
      title: `${summary.title.replace("Best ", "")} Pricing Guide ${seoYear}`,
      description: `What to check before paying for ${niche} software, including plans, limits, add-ons, annual discounts, cancellation terms, and upgrade triggers.`,
      intent: "Pricing research",
      readingTime: "6 min read",
      primaryKeyword: `${niche.toLowerCase()} pricing guide`,
      secondaryKeywords: [
        `${niche.toLowerCase()} pricing`,
        `${niche.toLowerCase()} cost`,
        `${niche.toLowerCase()} plans compared`,
      ],
      sections: [
        {
          heading: "Check what is included in the entry plan",
          body: `Pricing pages often hide the real decision in usage limits, seats, credits, projects, storage, or automation runs. Before choosing ${niche.toLowerCase()} software, map the plan against your actual monthly workload.`,
        },
        {
          heading: "Look for expansion costs",
          body: `The first month is rarely the full cost. Check when the plan upgrades, whether core integrations are gated, and whether support, analytics, users, or advanced features require a higher tier.`,
        },
        {
          heading: "Confirm terms before clicking through",
          body: `SakuStack links may become affiliate links, but pricing and terms should always be verified directly with the vendor. This protects the buyer and keeps the recommendation process honest.`,
        },
      ],
      faq: [
        {
          question: `Why do ${niche.toLowerCase()} prices change so often?`,
          answer:
            "SaaS vendors update plans, bundles, usage limits, and promotional pricing frequently. Always verify current terms on the vendor site before buying.",
        },
        {
          question: "Should I choose monthly or annual billing?",
          answer:
            "Use monthly billing while testing workflow fit. Move to annual only after the team has validated usage, integrations, support quality, and cancellation terms.",
        },
      ],
    },
    {
      slug: articleSlug(niche, "alternatives"),
      niche,
      title: `${summary.title.replace("Best ", "")} Alternatives: 5 Tools to Compare`,
      description: `Compare alternative ${niche} tools and learn when to choose ${names} based on features, buyer fit, pricing angle, and workflow depth.`,
      intent: "Alternatives",
      readingTime: "8 min read",
      primaryKeyword: `${niche.toLowerCase()} alternatives`,
      secondaryKeywords: [
        `${niche.toLowerCase()} competitors`,
        `${niche.toLowerCase()} tools compared`,
        `best ${niche.toLowerCase()} alternatives`,
      ],
      sections: [
        {
          heading: "Why compare alternatives before choosing",
          body: `Alternatives help you see whether a tool is genuinely the best fit or simply the best-known option. Compare ${niche.toLowerCase()} tools by workflow fit, pricing, support, integrations, and the features you will use every week.`,
        },
        {
          heading: "When to choose each kind of tool",
          body: `Use ${topTool?.name ?? "the highest-fit option"} when you want the strongest overall shortlist candidate. Compare the rest of the category when you need a different pricing model, workflow style, integration set, or team control.`,
        },
        {
          heading: "Move from broad research to a confident shortlist",
          body: `A useful alternatives guide should help you move from broad research into specific reviews and side-by-side comparisons, so you can understand tradeoffs before opening vendor sites.`,
        },
      ],
      faq: [
        {
          question: `What are the best ${niche.toLowerCase()} alternatives to compare?`,
          answer: `${names} are the first alternatives to compare because they cover different buyer needs, pricing angles, and workflow styles.`,
        },
        {
          question: "Should alternatives pages link directly to vendors?",
          answer:
            "Yes, but they should also link to internal reviews and comparisons first so users understand the tradeoffs before clicking an outbound or affiliate link.",
        },
      ],
    },
  ];
}

export const knowledgeArticles = categoryNiches.flatMap((niche) => buildArticlesForNiche(niche));

export function articlesForNiche(niche: CategoryNiche) {
  return knowledgeArticles.filter((article) => article.niche === niche);
}

export function knowledgeArticleFromSlug(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

export function relatedReviewLinks(niche: CategoryNiche) {
  return topToolsForNiche(niche).map((tool) => ({
    name: `${tool.name} review`,
    href: softwareHref(tool),
  }));
}

export const knowledgePillars = categoryNiches.map((niche) => ({
  niche,
  href: knowledgeCategoryHref(niche),
  categoryHref: categoryHref(niche),
  title: `${categorySummaries[niche].title} Knowledge Hub`,
  description: categorySummaries[niche].description,
  articleCount: articlesForNiche(niche).length,
  toolCount: topToolsForNiche(niche, 20).length,
}));
