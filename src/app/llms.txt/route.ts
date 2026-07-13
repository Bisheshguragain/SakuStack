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

export function GET() {
  const lines = [
    `# ${siteName}`,
    "",
    "> SakuStack is a software review, comparison, and buying-guide site covering AI tools, SaaS platforms, hosting, CRM, ecommerce, funnels, and productivity software.",
    "",
    "## Important URLs",
    `- Homepage: ${siteUrl}/`,
    `- About: ${siteUrl}/about`,
    `- Knowledge Centre: ${siteUrl}/knowledge-centre`,
    `- Editorial policy: ${siteUrl}/editorial-policy`,
    `- Methodology: ${siteUrl}/methodology`,
    `- Affiliate disclosure: ${siteUrl}/affiliate-disclosure`,
    `- Privacy policy: ${siteUrl}/privacy-policy`,
    "",
    "## Category Hubs",
    ...categoryNiches.map(
      (niche) => `- ${categorySummaries[niche].title}: ${siteUrl}${categoryHref(niche)}`,
    ),
    "",
    "## Knowledge Hubs",
    ...categoryNiches.map(
      (niche) => `- ${categorySummaries[niche].title} Knowledge Hub: ${siteUrl}${knowledgeCategoryHref(niche)}`,
    ),
    "",
    "## Blog Articles",
    ...knowledgeArticles.map((article) => `- ${article.title}: ${siteUrl}${blogHref(article)}`),
    "",
    "## Review Pages",
    ...uniqueSoftware.map((tool) => `- ${tool.name} Review: ${siteUrl}${softwareHref(tool)}`),
    "",
    "## Comparison Pages",
    ...comparisonPages.map(
      (comparison) => `- ${comparison.title}: ${siteUrl}/compare/${comparison.slug}`,
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
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
