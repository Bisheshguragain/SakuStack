import {
  categoryHref,
  categoryNiches,
  categorySummaries,
  comparisonPages,
  siteName,
  siteUrl,
  softwareHref,
  uniqueSoftware,
} from "../software-data";
import {
  blogHref,
  knowledgeArticles,
  knowledgeCategoryHref,
} from "../knowledge-data";

export const dynamic = "force-static";

function markdownLink(label: string, href: string) {
  return `[${label}](${href})`;
}

export function GET() {
  const lines = [
    `# ${siteName}`,
    "",
    "> SakuStack is a software review, comparison, and buying-guide site covering AI tools, SaaS platforms, hosting, CRM, ecommerce, funnels, and productivity software.",
    "",
    "## Important URLs",
    `- ${markdownLink("Homepage", `${siteUrl}/`)}`,
    `- ${markdownLink("Tool Directory", `${siteUrl}/tools`)}`,
    `- ${markdownLink("Software Deals", `${siteUrl}/deals`)}`,
    `- ${markdownLink("About", `${siteUrl}/about`)}`,
    `- ${markdownLink("Knowledge Centre", `${siteUrl}/knowledge-centre`)}`,
    `- ${markdownLink("Editorial policy", `${siteUrl}/editorial-policy`)}`,
    `- ${markdownLink("Methodology", `${siteUrl}/methodology`)}`,
    `- ${markdownLink("Affiliate disclosure", `${siteUrl}/affiliate-disclosure`)}`,
    `- ${markdownLink("Privacy policy", `${siteUrl}/privacy-policy`)}`,
    "",
    "## Category Hubs",
    ...categoryNiches.map(
      (niche) => `- ${markdownLink(categorySummaries[niche].title, `${siteUrl}${categoryHref(niche)}`)}`,
    ),
    "",
    "## Knowledge Hubs",
    ...categoryNiches.map(
      (niche) =>
        `- ${markdownLink(
          `${categorySummaries[niche].title} Knowledge Hub`,
          `${siteUrl}${knowledgeCategoryHref(niche)}`,
        )}`,
    ),
    "",
    "## Blog Articles",
    ...knowledgeArticles.map((article) =>
      `- ${markdownLink(article.title, `${siteUrl}${blogHref(article)}`)}`,
    ),
    "",
    "## Review Pages",
    ...uniqueSoftware.map((tool) =>
      `- ${markdownLink(`${tool.name} Review`, `${siteUrl}${softwareHref(tool)}`)}`,
    ),
    "",
    "## Comparison Pages",
    ...comparisonPages.map(
      (comparison) =>
        `- ${markdownLink(comparison.title, `${siteUrl}/compare/${comparison.slug}`)}`,
    ),
    "",
    "## Usage Notes",
    "- Affiliate/vendor links may be commercial links.",
    "- Pricing, plans, and product features should be verified with the vendor before publication or purchase.",
    "- Use the methodology and affiliate disclosure pages when summarizing SakuStack recommendations.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
