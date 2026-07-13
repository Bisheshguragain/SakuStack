export type Niche =
  | "All"
  | "LLM assistants"
  | "Vibe coding"
  | "AI coding tools"
  | "SEO / AI visibility"
  | "CRM / sales"
  | "Email marketing"
  | "Hosting"
  | "Ecommerce"
  | "Courses / funnels"
  | "Mini SaaS / productivity";

export type CategoryNiche = Exclude<Niche, "All">;

export type Software = {
  niche: CategoryNiche;
  name: string;
  rating: number;
  reviews: string;
  pricing: string;
  bestFor: string;
  features: string[];
};

export const lastUpdated = "July 2, 2026";
export const seoYear = "2026";
export const siteName = "SakuStack";
export const defaultOgImage = "/sakustack-hero-dashboard.webp";
export const editorialAuthor = {
  name: "SakuStack Editorial Team",
  title: "Software research and buying guide editors",
  url: "/about",
  description:
    "The SakuStack Editorial Team researches software categories, pricing signals, feature depth, buyer fit, and public review patterns to help readers build stronger shortlists.",
};

export const niches: Niche[] = [
  "All",
  "LLM assistants",
  "Vibe coding",
  "AI coding tools",
  "SEO / AI visibility",
  "CRM / sales",
  "Email marketing",
  "Hosting",
  "Ecommerce",
  "Courses / funnels",
  "Mini SaaS / productivity",
];

export const categoryNiches = niches.filter(
  (niche): niche is CategoryNiche => niche !== "All",
);

export function categorySlug(niche: CategoryNiche) {
  return niche
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s*\+\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function categoryHref(niche: CategoryNiche) {
  return `/categories/${categorySlug(niche)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s*\+\s*/g, "-")
    .replace(/\s+vs\s+/g, "-vs-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryFromSlug(slug: string) {
  return categoryNiches.find((niche) => categorySlug(niche) === slug);
}

export function breadcrumbStructuredData(
  items: Array<{
    name: string;
    url: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function truncateMetaDescription(description: string) {
  if (description.length <= 158) {
    return description;
  }

  const trimmed = description.slice(0, 155);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 155).trim()}...`;
}

function truncateSeoTitle(title: string) {
  if (title.length <= 60) {
    return title;
  }

  const trimmed = title.slice(0, 57);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 42 ? lastSpace : 57).trim()}...`;
}

export function categorySeoTitle(summary: { title: string }) {
  return truncateSeoTitle(`${summary.title} ${seoYear}: Top Tools`);
}

export function categorySeoDescription(
  niche: CategoryNiche,
  summary: { description: string; title: string },
  topTools: Array<Pick<Software, "name">>,
) {
  const names = topTools.map((tool) => tool.name).join(", ");
  return truncateMetaDescription(
    `Compare ${names} in our ${seoYear} ${niche} guide: features, pricing, ratings, reviews, alternatives, and buyer fit.`,
  );
}

export function reviewSeoTitle(tool: Pick<Software, "name">) {
  return truncateSeoTitle(`${tool.name} Review ${seoYear}: Features & Pricing`);
}

export function reviewSeoDescription(tool: Software) {
  return truncateMetaDescription(
    `${tool.name} review ${seoYear}: compare features, pricing, pros, cons, alternatives, and use-case fit before visiting the vendor.`,
  );
}

export function compareSeoTitle(comparison: { title: string }) {
  return truncateSeoTitle(`${comparison.title} ${seoYear}: Features & Verdict`);
}

export function compareSeoDescription(comparison: {
  title: string;
  niche: CategoryNiche;
  tools: Software[];
}) {
  const names = comparison.tools.map((tool) => tool.name).join(" vs ");
  return truncateMetaDescription(
    `${comparison.title} comparison for ${comparison.niche} buyers. Compare ${names} by features, pricing angle, ratings, use case fit, and alternatives.`,
  );
}

export const categorySummaries: Record<
  CategoryNiche,
  {
    title: string;
    description: string;
    searchIntent: string;
    comparisonIdeas: string[];
  }
> = {
  "LLM assistants": {
    title: "Best LLM Assistants",
    description:
      "Compare ChatGPT, Claude, Gemini, Perplexity, Poe, and other AI assistants by reasoning quality, research workflow, file handling, privacy, and everyday productivity.",
    searchIntent: "Targets buyers searching for best AI chatbot, ChatGPT alternatives, Claude vs ChatGPT, and AI assistant comparisons.",
    comparisonIdeas: ["ChatGPT vs Claude", "Perplexity vs ChatGPT", "Gemini vs Claude"],
  },
  "Vibe coding": {
    title: "Best Vibe Coding Tools",
    description:
      "Compare prompt-to-app builders for founders creating prototypes, MVPs, internal tools, and small SaaS products without starting from a blank codebase.",
    searchIntent: "Targets searches around Lovable alternatives, Bolt.new vs Replit, AI app builders, and vibe coding platforms.",
    comparisonIdeas: ["Lovable vs Bolt.new", "Replit vs Base44", "Hostinger Horizons vs Lovable"],
  },
  "AI coding tools": {
    title: "Best AI Coding Tools",
    description:
      "Compare AI coding assistants and agentic IDEs by codebase context, editor support, debugging help, team controls, and developer workflow fit.",
    searchIntent: "Targets searches like best AI coding assistant, Cursor alternatives, Windsurf vs Cursor, and GitHub Copilot competitors.",
    comparisonIdeas: ["Cursor vs Windsurf", "GitHub Copilot vs Cursor", "Claude Code vs Cursor"],
  },
  "SEO / AI visibility": {
    title: "Best SEO and AI Visibility Tools",
    description:
      "Compare SEO suites and AI visibility tools for keyword research, content optimization, audits, rankings, backlinks, and AI search monitoring.",
    searchIntent: "Targets high-intent SEO tool searches including Semrush alternatives, Ahrefs competitors, and AI visibility software.",
    comparisonIdeas: ["Semrush vs Ahrefs", "Surfer vs Frase", "SE Ranking vs Semrush"],
  },
  "CRM / sales": {
    title: "Best CRM and Sales Software",
    description:
      "Compare CRM platforms for pipeline management, automation, reporting, lead tracking, email, AI sales support, and small business growth.",
    searchIntent: "Targets buyer searches like best CRM software, HubSpot alternatives, Pipedrive vs HubSpot, and CRM for small business.",
    comparisonIdeas: ["HubSpot vs Pipedrive", "Zoho vs HubSpot", "Freshsales vs Pipedrive"],
  },
  "Email marketing": {
    title: "Best Email Marketing Software",
    description:
      "Compare email platforms for deliverability, automations, segmentation, newsletter creation, landing pages, creator monetization, and ecommerce flows.",
    searchIntent: "Targets searches for best email marketing software, ActiveCampaign alternatives, ConvertKit competitors, and newsletter tools.",
    comparisonIdeas: ["ActiveCampaign vs Kit", "MailerLite vs AWeber", "GetResponse vs ActiveCampaign"],
  },
  "Hosting": {
    title: "Best Hosting Platforms",
    description:
      "Compare hosting providers by WordPress support, speed, uptime, security, backups, migration help, scalability, and beginner-friendly site launches.",
    searchIntent: "Targets searches like best WordPress hosting, Kinsta vs WP Engine, Hostinger alternatives, and managed hosting comparisons.",
    comparisonIdeas: ["Kinsta vs WP Engine", "Hostinger vs Bluehost", "Cloudways vs Kinsta"],
  },
  "Ecommerce": {
    title: "Best Ecommerce Platforms",
    description:
      "Compare ecommerce platforms by store builder quality, checkout, payments, themes, apps, POS, digital products, subscriptions, and growth features.",
    searchIntent: "Targets buyer searches like best ecommerce platform, Shopify alternatives, Wix vs Shopify, and Squarespace ecommerce reviews.",
    comparisonIdeas: ["Shopify vs BigCommerce", "Wix vs Squarespace", "Sellfy vs Shopify"],
  },
  "Courses / funnels": {
    title: "Best Course and Funnel Builders",
    description:
      "Compare platforms for courses, funnels, communities, digital products, checkout, email workflows, coaching, memberships, and agency SaaS offers.",
    searchIntent: "Targets searches like best course platform, ClickFunnels alternatives, Kajabi vs GoHighLevel, and Teachable competitors.",
    comparisonIdeas: ["Kajabi vs ClickFunnels", "GoHighLevel vs ClickFunnels", "Thinkific vs Teachable"],
  },
  "Mini SaaS / productivity": {
    title: "Best Mini SaaS and Productivity Tools",
    description:
      "Compare productivity SaaS tools for databases, automations, forms, portals, internal tools, documents, dashboards, and solo-founder operating systems.",
    searchIntent: "Targets searches around Notion alternatives, Airtable vs Notion, Zapier alternatives, Typeform competitors, and no-code mini SaaS stacks.",
    comparisonIdeas: ["Notion vs Airtable", "Make vs Zapier", "Typeform vs Softr"],
  },
};

export const toolUrls: Record<string, string> = {
  "ActiveCampaign": "https://www.activecampaign.com/",
  "Ahrefs": "https://ahrefs.com/",
  "Airtable": "https://www.airtable.com/",
  "AWeber": "https://www.aweber.com/",
  "Base44": "https://base44.com/",
  "BigCommerce": "https://www.bigcommerce.com/",
  "Bluehost": "https://www.bluehost.com/",
  "Bolt.new": "https://bolt.new/",
  "ChatGPT": "https://chatgpt.com/",
  "Claude": "https://claude.ai/",
  "Claude Code": "https://www.anthropic.com/claude-code",
  "ClickFunnels": "https://www.clickfunnels.com/",
  "Cloudways": "https://www.cloudways.com/",
  "Codeium / Windsurf": "https://windsurf.com/",
  "Cursor": "https://cursor.com/",
  "Frase": "https://www.frase.io/",
  "Freshsales": "https://www.freshworks.com/crm/sales/",
  "Gemini": "https://gemini.google.com/",
  "GetResponse": "https://www.getresponse.com/",
  "GitHub Copilot": "https://github.com/features/copilot",
  "GoHighLevel": "https://www.gohighlevel.com/",
  "Hostinger": "https://www.hostinger.com/",
  "Hostinger Horizons": "https://www.hostinger.com/horizons",
  "HubSpot": "https://www.hubspot.com/",
  "Kajabi": "https://kajabi.com/",
  "Kinsta": "https://kinsta.com/",
  "Kit / ConvertKit": "https://kit.com/",
  "Lovable": "https://lovable.dev/",
  "MailerLite": "https://www.mailerlite.com/",
  "Make": "https://www.make.com/",
  "Notion": "https://www.notion.com/",
  "Perplexity": "https://www.perplexity.ai/",
  "Pipedrive": "https://www.pipedrive.com/",
  "Podia": "https://www.podia.com/",
  "Poe": "https://poe.com/",
  "Replit": "https://replit.com/",
  "SE Ranking": "https://seranking.com/",
  "Sellfy": "https://sellfy.com/",
  "Semrush": "https://www.semrush.com/",
  "Shopify": "https://www.shopify.com/",
  "Softr": "https://www.softr.io/",
  "Squarespace": "https://www.squarespace.com/",
  "Surfer": "https://surferseo.com/",
  "Teachable": "https://teachable.com/",
  "Thinkific": "https://www.thinkific.com/",
  "Typeform": "https://www.typeform.com/",
  "Windsurf": "https://windsurf.com/",
  "Wix": "https://www.wix.com/",
  "WP Engine": "https://wpengine.com/",
  "Zapier": "https://zapier.com/",
  "Zoho": "https://www.zoho.com/",
};

export const software: Software[] = [
  {
    niche: "LLM assistants",
    name: "ChatGPT",
    rating: 4.8,
    reviews: "Traffic magnet",
    pricing: "Free, Plus, Team, Enterprise",
    bestFor: "General AI assistant, writing, analysis, code, and workflows",
    features: ["Multimodal chat", "File analysis", "Custom GPTs"],
  },
  {
    niche: "LLM assistants",
    name: "Claude",
    rating: 4.8,
    reviews: "Traffic magnet",
    pricing: "Free, Pro, Team, Enterprise",
    bestFor: "Long-form reasoning, writing, coding, and document-heavy work",
    features: ["Long context", "Artifacts", "Coding support"],
  },
  {
    niche: "LLM assistants",
    name: "Gemini",
    rating: 4.6,
    reviews: "Traffic magnet",
    pricing: "Free, Advanced, Workspace",
    bestFor: "Google ecosystem users and multimodal AI search workflows",
    features: ["Google apps", "Multimodal input", "Research support"],
  },
  {
    niche: "LLM assistants",
    name: "Perplexity",
    rating: 4.7,
    reviews: "Traffic magnet",
    pricing: "Free, Pro, Max",
    bestFor: "AI search, cited answers, and research-heavy comparisons",
    features: ["Cited search", "Model selection", "Deep research"],
  },
  {
    niche: "LLM assistants",
    name: "Poe",
    rating: 4.4,
    reviews: "Traffic magnet",
    pricing: "Free, subscription",
    bestFor: "Trying many chatbots and specialist bots in one account",
    features: ["Multi-model access", "Bot discovery", "Creator bots"],
  },
  {
    niche: "Vibe coding",
    name: "Lovable",
    rating: 4.7,
    reviews: "Fast-growing",
    pricing: "Free credits, paid plans",
    bestFor: "Non-technical founders turning prompts into web apps",
    features: ["Prompt-to-app", "Visual editing", "Deployment"],
  },
  {
    niche: "Vibe coding",
    name: "Bolt.new",
    rating: 4.6,
    reviews: "Fast-growing",
    pricing: "Free credits, paid plans",
    bestFor: "Browser-based full-stack prototypes and quick MVPs",
    features: ["Full-stack generation", "Browser IDE", "Instant preview"],
  },
  {
    niche: "Vibe coding",
    name: "Base44",
    rating: 4.5,
    reviews: "Fast-growing",
    pricing: "Free credits, paid plans",
    bestFor: "No-code style app generation with built-in backend pieces",
    features: ["Chat builder", "Backend tools", "App deployment"],
  },
  {
    niche: "Vibe coding",
    name: "Replit",
    rating: 4.6,
    reviews: "Popular builder",
    pricing: "Free, Core, Teams",
    bestFor: "Coding, hosting, agentic app building, and education",
    features: ["Agent", "Hosting", "Collaborative IDE"],
  },
  {
    niche: "Vibe coding",
    name: "Hostinger Horizons",
    rating: 4.4,
    reviews: "Monetizable",
    pricing: "Paid hosting bundle",
    bestFor: "Prompt-built websites connected to hosting and domains",
    features: ["AI website builder", "Hosting", "Domains"],
  },
  {
    niche: "AI coding tools",
    name: "Cursor",
    rating: 4.8,
    reviews: "Developer favorite",
    pricing: "Free, Pro, Team",
    bestFor: "AI-native coding IDE with codebase-aware editing",
    features: ["Codebase chat", "Agent mode", "Composer"],
  },
  {
    niche: "AI coding tools",
    name: "Windsurf",
    rating: 4.6,
    reviews: "Developer favorite",
    pricing: "Free, Pro, Teams",
    bestFor: "Agentic IDE workflows and AI-assisted coding sessions",
    features: ["Agent flows", "Code context", "IDE assistance"],
  },
  {
    niche: "AI coding tools",
    name: "GitHub Copilot",
    rating: 4.7,
    reviews: "Enterprise known",
    pricing: "Individual, Business, Enterprise",
    bestFor: "Developers already working inside GitHub and VS Code",
    features: ["Inline completions", "Chat", "PR assistance"],
  },
  {
    niche: "AI coding tools",
    name: "Claude Code",
    rating: 4.8,
    reviews: "Traffic magnet",
    pricing: "Usage through Claude plans/API",
    bestFor: "Terminal-based coding agent and codebase modification",
    features: ["Agentic coding", "Repo context", "CLI workflow"],
  },
  {
    niche: "AI coding tools",
    name: "Codeium / Windsurf",
    rating: 4.5,
    reviews: "Developer known",
    pricing: "Free, Pro, Teams",
    bestFor: "AI coding autocomplete and editor assistance",
    features: ["Autocomplete", "Chat", "Editor plugins"],
  },
  {
    niche: "SEO / AI visibility",
    name: "Semrush",
    rating: 4.8,
    reviews: "Strong reviews",
    pricing: "Pro, Guru, Business",
    bestFor: "SEO, competitor research, PPC, content, and AI visibility",
    features: ["Keyword research", "Site audits", "AI visibility"],
  },
  {
    niche: "SEO / AI visibility",
    name: "Surfer",
    rating: 4.8,
    reviews: "Well reviewed",
    pricing: "Essential, Scale, Enterprise",
    bestFor: "Content optimization and AI search visibility workflows",
    features: ["Content editor", "Topical maps", "AI search tracking"],
  },
  {
    niche: "SEO / AI visibility",
    name: "SE Ranking",
    rating: 4.7,
    reviews: "Strong reviews",
    pricing: "Essential, Pro, Business",
    bestFor: "Affordable SEO suite for agencies and SMBs",
    features: ["Rank tracking", "Audits", "AI overview tracking"],
  },
  {
    niche: "SEO / AI visibility",
    name: "Frase",
    rating: 4.6,
    reviews: "Strong reviews",
    pricing: "Starts around $49/mo",
    bestFor: "SEO and GEO content research, writing, and optimization",
    features: ["Content briefs", "AI writing", "GEO optimization"],
  },
  {
    niche: "SEO / AI visibility",
    name: "Ahrefs",
    rating: 4.7,
    reviews: "Traffic magnet",
    pricing: "Lite, Standard, Advanced, Enterprise",
    bestFor: "Backlink research, keyword data, and competitive SEO",
    features: ["Backlinks", "Keywords", "Site explorer"],
  },
  {
    niche: "CRM / sales",
    name: "HubSpot",
    rating: 4.8,
    reviews: "Strong reviews",
    pricing: "Free, Starter, Professional, Enterprise",
    bestFor: "CRM, marketing, sales, service, and customer platform",
    features: ["CRM", "Marketing hub", "Sales automation"],
  },
  {
    niche: "CRM / sales",
    name: "ActiveCampaign",
    rating: 4.7,
    reviews: "Well reviewed",
    pricing: "Starter, Plus, Pro, Enterprise",
    bestFor: "Marketing automation with CRM and email built in",
    features: ["Automations", "CRM", "Email campaigns"],
  },
  {
    niche: "CRM / sales",
    name: "Zoho",
    rating: 4.5,
    reviews: "Well reviewed",
    pricing: "Free and paid apps",
    bestFor: "Affordable business suite and CRM ecosystem",
    features: ["CRM", "55+ apps", "Zoho One"],
  },
  {
    niche: "CRM / sales",
    name: "Pipedrive",
    rating: 4.6,
    reviews: "Needs check",
    pricing: "Essential, Advanced, Professional",
    bestFor: "Sales pipeline management for small sales teams",
    features: ["Pipelines", "Sales automation", "Forecasting"],
  },
  {
    niche: "CRM / sales",
    name: "Freshsales",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Free, Growth, Pro, Enterprise",
    bestFor: "CRM with phone, chat, and Freshworks ecosystem",
    features: ["Deal management", "AI scoring", "Built-in phone"],
  },
  {
    niche: "Email marketing",
    name: "ActiveCampaign",
    rating: 4.7,
    reviews: "Well reviewed",
    pricing: "Starter, Plus, Pro, Enterprise",
    bestFor: "Advanced email automation and customer journeys",
    features: ["Automations", "Segmentation", "CRM"],
  },
  {
    niche: "Email marketing",
    name: "GetResponse",
    rating: 4.4,
    reviews: "Needs check",
    pricing: "Email, Marketing Automation, Ecommerce",
    bestFor: "Email campaigns, webinars, and marketing funnels",
    features: ["Email", "Funnels", "Webinars"],
  },
  {
    niche: "Email marketing",
    name: "Kit / ConvertKit",
    rating: 4.6,
    reviews: "Needs check",
    pricing: "Free, Creator, Creator Pro",
    bestFor: "Creator newsletters and digital product audiences",
    features: ["Newsletter", "Automations", "Creator network"],
  },
  {
    niche: "Email marketing",
    name: "MailerLite",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Free, Growing Business, Advanced",
    bestFor: "Affordable email marketing for small teams",
    features: ["Email builder", "Landing pages", "Automations"],
  },
  {
    niche: "Email marketing",
    name: "AWeber",
    rating: 4.3,
    reviews: "Needs check",
    pricing: "Free, Lite, Plus, Unlimited",
    bestFor: "Classic newsletter and autoresponder workflows",
    features: ["Autoresponders", "Landing pages", "Templates"],
  },
  {
    niche: "Hosting",
    name: "WP Engine",
    rating: 4.7,
    reviews: "Strong reviews",
    pricing: "Startup, Professional, Growth, Scale",
    bestFor: "Managed WordPress hosting for businesses and agencies",
    features: ["Managed WP", "Security", "Performance"],
  },
  {
    niche: "Hosting",
    name: "Kinsta",
    rating: 4.8,
    reviews: "Strong reviews",
    pricing: "Single site, agency, enterprise plans",
    bestFor: "Premium managed WordPress hosting with recurring affiliate upside",
    features: ["Managed WP", "Cloudflare", "APM"],
  },
  {
    niche: "Hosting",
    name: "Hostinger",
    rating: 4.6,
    reviews: "Emerging reviews",
    pricing: "Shared, cloud, VPS, Horizons",
    bestFor: "Budget hosting, domains, AI website builder, and VPS",
    features: ["Hosting", "Domains", "AI builder"],
  },
  {
    niche: "Hosting",
    name: "Cloudways",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Cloud provider based",
    bestFor: "Managed cloud hosting for performance-focused sites",
    features: ["Managed cloud", "Staging", "Scaling"],
  },
  {
    niche: "Hosting",
    name: "Bluehost",
    rating: 4.2,
    reviews: "Needs check",
    pricing: "Basic, Choice Plus, Online Store",
    bestFor: "Beginner WordPress hosting and low-cost site launches",
    features: ["WordPress", "Domains", "Website builder"],
  },
  {
    niche: "Ecommerce",
    name: "Shopify",
    rating: 4.8,
    reviews: "Strong reviews",
    pricing: "Basic, Grow, Advanced, Plus",
    bestFor: "Online stores, retail, POS, and creator commerce",
    features: ["Store builder", "Payments", "App store"],
  },
  {
    niche: "Ecommerce",
    name: "BigCommerce",
    rating: 4.4,
    reviews: "Needs check",
    pricing: "Standard, Plus, Pro, Enterprise",
    bestFor: "Growing ecommerce brands needing flexible catalog tools",
    features: ["Storefront", "B2B", "Multi-channel"],
  },
  {
    niche: "Ecommerce",
    name: "Sellfy",
    rating: 4.3,
    reviews: "Needs check",
    pricing: "Starter, Business, Premium",
    bestFor: "Creators selling digital products and simple storefronts",
    features: ["Digital products", "Subscriptions", "Storefront"],
  },
  {
    niche: "Ecommerce",
    name: "Wix",
    rating: 4.3,
    reviews: "Needs check",
    pricing: "Website, business, ecommerce plans",
    bestFor: "Drag-and-drop sites with ecommerce features",
    features: ["Website builder", "Stores", "Bookings"],
  },
  {
    niche: "Ecommerce",
    name: "Squarespace",
    rating: 4.4,
    reviews: "Needs check",
    pricing: "Personal, Business, Commerce",
    bestFor: "Design-led websites, portfolios, and smaller stores",
    features: ["Templates", "Commerce", "Scheduling"],
  },
  {
    niche: "Courses / funnels",
    name: "Kajabi",
    rating: 4.6,
    reviews: "Needs check",
    pricing: "Kickstarter, Basic, Growth, Pro",
    bestFor: "Premium course, community, email, and funnel businesses",
    features: ["Courses", "Community", "Funnels"],
  },
  {
    niche: "Courses / funnels",
    name: "Thinkific",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Free, Basic, Start, Grow",
    bestFor: "Course creators building structured learning products",
    features: ["Courses", "Communities", "Payments"],
  },
  {
    niche: "Courses / funnels",
    name: "Teachable",
    rating: 4.4,
    reviews: "Needs check",
    pricing: "Free, Basic, Pro, Pro+",
    bestFor: "Creators selling courses, coaching, and downloads",
    features: ["Courses", "Coaching", "Checkout"],
  },
  {
    niche: "Courses / funnels",
    name: "ClickFunnels",
    rating: 4.5,
    reviews: "High-ticket target",
    pricing: "Startup, Pro, higher tiers",
    bestFor: "Funnels, landing pages, offers, and direct-response sales",
    features: ["Funnels", "Checkout", "Email workflows"],
  },
  {
    niche: "Courses / funnels",
    name: "GoHighLevel",
    rating: 4.6,
    reviews: "High-ticket target",
    pricing: "Starter, Unlimited, SaaS Pro",
    bestFor: "Agencies selling CRM, funnels, automation, and white-label SaaS",
    features: ["CRM", "Funnels", "White-label SaaS"],
  },
  {
    niche: "Courses / funnels",
    name: "Podia",
    rating: 4.4,
    reviews: "Needs check",
    pricing: "Free, Mover, Shaker",
    bestFor: "Simple creator storefronts, courses, and memberships",
    features: ["Courses", "Downloads", "Email"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Notion",
    rating: 4.7,
    reviews: "Traffic magnet",
    pricing: "Free, Plus, Business, Enterprise",
    bestFor: "Knowledge base, docs, lightweight CRM, and solo founder ops",
    features: ["Docs", "Databases", "AI"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Airtable",
    rating: 4.6,
    reviews: "Traffic magnet",
    pricing: "Free, Team, Business, Enterprise",
    bestFor: "Flexible databases and internal tools for small teams",
    features: ["Databases", "Interfaces", "Automations"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Typeform",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Basic, Plus, Business",
    bestFor: "High-converting forms, surveys, lead capture, and quizzes",
    features: ["Forms", "Surveys", "Logic"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Make",
    rating: 4.6,
    reviews: "Needs check",
    pricing: "Free, Core, Pro, Teams",
    bestFor: "Visual automation for founders and operations workflows",
    features: ["Automation", "Integrations", "Scenarios"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Softr",
    rating: 4.5,
    reviews: "Needs check",
    pricing: "Free, Basic, Professional, Business",
    bestFor: "Client portals, directories, and no-code mini SaaS frontends",
    features: ["Portals", "Airtable data", "Memberships"],
  },
  {
    niche: "Mini SaaS / productivity",
    name: "Zapier",
    rating: 4.6,
    reviews: "Traffic magnet",
    pricing: "Free, Professional, Team, Enterprise",
    bestFor: "Automation glue between SaaS tools",
    features: ["Zaps", "Tables", "Interfaces"],
  },
];

export const winners = [
  {
    rank: 1,
    name: "HubSpot",
    niche: "CRM / sales",
    pageAngle: "Best CRM software for small businesses",
    reason: "Strong all-in-one CRM, marketing, sales, service, and AI features.",
  },
  {
    rank: 2,
    name: "Semrush",
    niche: "SEO / AI visibility",
    pageAngle: "Best SEO and AI visibility tools",
    reason: "Broad keyword, competitor, content, PPC, and AI search visibility suite.",
  },
  {
    rank: 3,
    name: "Kinsta",
    niche: "Hosting",
    pageAngle: "Best managed WordPress hosting",
    reason: "Premium hosting angle with performance, security, support, and agency use cases.",
  },
  {
    rank: 4,
    name: "WP Engine",
    niche: "Hosting",
    pageAngle: "WP Engine vs Kinsta vs Cloudways",
    reason: "Enterprise-grade WordPress positioning and strong comparison intent.",
  },
  {
    rank: 5,
    name: "SE Ranking",
    niche: "SEO / AI visibility",
    pageAngle: "Best affordable SEO tools",
    reason: "Good fit for agencies and SMBs comparing value against larger SEO suites.",
  },
  {
    rank: 6,
    name: "Frase",
    niche: "SEO / AI visibility",
    pageAngle: "Best AI content optimization tools",
    reason: "Strong SEO plus GEO angle for content teams targeting Google and AI answers.",
  },
  {
    rank: 7,
    name: "Hostinger",
    niche: "Hosting / Vibe coding",
    pageAngle: "Best AI website builders with hosting",
    reason: "Connects hosting, domains, and AI site building for beginners.",
  },
  {
    rank: 8,
    name: "Shopify",
    niche: "Ecommerce",
    pageAngle: "Best ecommerce platforms",
    reason: "Huge buyer-intent category with store builder, payments, app ecosystem, and POS.",
  },
];

export const guides = [
  {
    title: "Best AI chatbots for founders",
    detail: "ChatGPT, Claude, Gemini, Perplexity, and Poe compared by workflow.",
    read: "11 min read",
  },
  {
    title: "Best vibe-coding tools for mini SaaS",
    detail: "Lovable, Bolt, Base44, Replit, and Hostinger Horizons ranked.",
    read: "13 min read",
  },
  {
    title: "Best software stacks for high-intent affiliate SEO",
    detail: "CRM, SEO, hosting, ecommerce, AI, and creator tools organized by search intent.",
    read: "9 min read",
  },
];

export const quizOptions = [
  "Prioritize buyer intent",
  "Build AI traffic",
  "Launch a mini SaaS stack",
];

export function comparisonFocus(tool: Software) {
  if (tool.niche === "LLM assistants") return "Accuracy, reasoning, web search, file handling, privacy";
  if (tool.niche === "Vibe coding") return "App quality, backend depth, deployment, code export, ease of use";
  if (tool.niche === "AI coding tools") return "Repo context, agent reliability, IDE support, debugging, team controls";
  if (tool.niche === "SEO / AI visibility") return "Keyword data, audits, content optimization, AI visibility, reporting";
  if (tool.niche === "CRM / sales") return "Pipeline, automation, integrations, AI sales support, reporting";
  if (tool.niche === "Email marketing") return "Deliverability, automations, segmentation, landing pages, creator fit";
  if (tool.niche === "Hosting") return "Speed, uptime, WordPress support, security, backups, migration";
  if (tool.niche === "Ecommerce") return "Store builder, payments, themes, apps, POS, subscriptions";
  if (tool.niche === "Courses / funnels") return "Course builder, checkout, funnels, community, email, analytics";
  return "Databases, automations, forms, dashboards, integrations, solo-founder workflow";
}

export function toolUrl(tool: Pick<Software, "name">) {
  return toolUrls[tool.name] ?? "#";
}

export function softwareSlug(tool: Pick<Software, "name">) {
  return slugify(tool.name.replace(" / ", " "));
}

export function softwareHref(tool: Pick<Software, "name">) {
  return `/reviews/${softwareSlug(tool)}`;
}

export const uniqueSoftware = software.filter(
  (tool, index, tools) =>
    tools.findIndex((candidate) => candidate.name === tool.name) === index,
);

export function softwareFromSlug(slug: string) {
  return uniqueSoftware.find((tool) => softwareSlug(tool) === slug);
}

export function reviewPros(tool: Software) {
  return [
    `${tool.features[0]} is a clear fit for ${tool.bestFor.toLowerCase()}.`,
    `${tool.pricing} gives buyers an obvious pricing path to compare.`,
    `${tool.name} belongs in the ${tool.niche.toLowerCase()} shortlist for ${comparisonFocus(tool).toLowerCase()}.`,
  ];
}

export function reviewCons(tool: Software) {
  return [
    `${tool.name} pricing and packaging should be checked directly before buying.`,
    "Teams should compare integrations and limits against their current stack.",
    "This SakuStack profile is a starting point, not a replacement for a hands-on trial.",
  ];
}

export function toolInitials(tool: Pick<Software, "name">) {
  return tool.name
    .replace(/\//g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function pricingChecklist(tool: Software) {
  return [
    `Confirm what ${tool.pricing.toLowerCase()} includes today.`,
    "Check seats, usage limits, credits, projects, storage, and support level.",
    "Compare monthly vs annual pricing before committing.",
    "Verify cancellation, refund, and upgrade terms on the vendor site.",
  ];
}

export function evidenceChecklist(tool: Software) {
  return [
    `${tool.features.join(", ")} should match the workflow you need weekly.`,
    `${comparisonFocus(tool)} are the highest-priority comparison criteria.`,
    `${tool.reviews} is a directional research signal, not a guarantee.`,
    "Public ratings and vendor claims should be checked against current pages before purchase.",
  ];
}

export function ratingMethodologyNote(tool: Software) {
  return `${tool.rating}/5 is an editorial shortlist score based on use case fit, feature coverage, pricing clarity, comparison depth, and public review signals. It is not a paid placement or a guarantee of performance.`;
}

export const comparisonPages = categoryNiches.flatMap((niche) =>
  categorySummaries[niche].comparisonIdeas.map((title) => ({
    title,
    slug: slugify(title),
    niche,
    tools: title
      .split(/\s+vs\s+/i)
      .map((name) => software.find((tool) => tool.name === name || tool.name.startsWith(name)))
      .filter((tool): tool is Software => Boolean(tool)),
  })),
);

export function comparisonFromSlug(slug: string) {
  return comparisonPages.find((comparison) => comparison.slug === slug);
}

export const siteUrl = "https://sakustack.com";
export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SakuStack software directory",
    url: `${siteUrl}/#reviews`,
    itemListElement: software.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: toolUrl(tool),
        applicationCategory: tool.niche,
        description: tool.bestFor,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  },
];
