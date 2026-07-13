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
  | "Mini SaaS / productivity"
  | "Team productivity platforms"
  | "AI meeting notes"
  | "Video & podcast tools"
  | "Customer support software"
  | "Proposal & e-signature"
  | "Forms & surveys"
  | "Docs & knowledge base"
  | "Scheduling & calendar"
  | "Design & creator tools"
  | "Password & security"
  | "Social media scheduling";

export type CategoryNiche = Exclude<Niche, "All">;

export type Software = {
  niche: CategoryNiche;
  name: string;
  rating: number;
  reviews: string;
  pricing: string;
  bestFor: string;
  features: string[];
  g2Rating?: string;
  g2Reviews?: string;
  capterraRating?: string;
  capterraReviews?: string;
  lastChecked?: string;
};

export const lastUpdated = "July 2, 2026";
export const externalRatingsChecked = "July 13, 2026";
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
  "Team productivity platforms",
  "AI meeting notes",
  "Video & podcast tools",
  "Customer support software",
  "Proposal & e-signature",
  "Forms & surveys",
  "Docs & knowledge base",
  "Scheduling & calendar",
  "Design & creator tools",
  "Password & security",
  "Social media scheduling",
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
  if (description.length <= 154) {
    return description;
  }

  const trimmed = description.slice(0, 151);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 118 ? lastSpace : 151).trim()}...`;
}

function truncateSeoTitle(title: string) {
  if (title.length <= 48) {
    return title;
  }

  const trimmed = title.slice(0, 45);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 34 ? lastSpace : 45).trim()}...`;
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
  return truncateSeoTitle(`${comparison.title} ${seoYear}: Verdict`);
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
  "Team productivity platforms": {
    title: "Best Team Productivity Platforms",
    description:
      "Compare work management platforms for tasks, projects, dashboards, automations, resource planning, collaboration, reporting, and team operating systems.",
    searchIntent: "Targets searches like best project management software, ClickUp alternatives, monday.com vs Asana, and team productivity platforms.",
    comparisonIdeas: ["ClickUp vs monday.com", "Asana vs ClickUp", "Wrike vs Smartsheet"],
  },
  "AI meeting notes": {
    title: "Best AI Meeting Note Takers",
    description:
      "Compare AI meeting assistants for transcription, summaries, action items, searchable calls, CRM sync, meeting intelligence, and team knowledge capture.",
    searchIntent: "Targets searches like best AI note taker, Fireflies vs Otter, Fathom alternatives, and AI meeting summary software.",
    comparisonIdeas: ["Fireflies.ai vs Otter.ai", "Fathom vs Fireflies.ai", "tl;dv vs Avoma"],
  },
  "Video & podcast tools": {
    title: "Best Video and Podcast Tools",
    description:
      "Compare recording and editing tools for podcasts, webinars, tutorials, screen recordings, AI clips, captions, repurposing, and creator workflows.",
    searchIntent: "Targets searches like best podcast recording software, Descript alternatives, Riverside vs Loom, and video editing tools for creators.",
    comparisonIdeas: ["Riverside vs Descript", "Loom vs VEED", "Screen Studio vs Camtasia"],
  },
  "Customer support software": {
    title: "Best Customer Support Software",
    description:
      "Compare helpdesk and customer messaging platforms for tickets, live chat, AI support, knowledge bases, routing, analytics, and support team workflows.",
    searchIntent: "Targets high-intent searches like best helpdesk software, Zendesk alternatives, Intercom vs Help Scout, and customer support tools.",
    comparisonIdeas: ["Zendesk vs Intercom", "Help Scout vs Freshdesk", "Crisp vs Tidio"],
  },
  "Proposal & e-signature": {
    title: "Best Proposal and E-Signature Tools",
    description:
      "Compare proposal, document automation, quote, contract, approval, and e-signature tools for sales teams, agencies, consultants, and service businesses.",
    searchIntent: "Targets buyer searches like best proposal software, PandaDoc alternatives, DocuSign vs Dropbox Sign, and e-signature tools.",
    comparisonIdeas: ["PandaDoc vs DocuSign", "Dropbox Sign vs DocuSign", "Better Proposals vs Proposify"],
  },
  "Forms & surveys": {
    title: "Best Form and Survey Builders",
    description:
      "Compare form, survey, quiz, lead capture, intake, payment, and workflow builders for marketers, agencies, SaaS teams, creators, and operations teams.",
    searchIntent: "Targets searches like best form builder, Typeform alternatives, Jotform vs Fillout, and survey software for lead capture.",
    comparisonIdeas: ["Jotform vs Fillout", "Tally vs Jotform", "Paperform vs Formstack"],
  },
  "Docs & knowledge base": {
    title: "Best Docs and Knowledge Base Tools",
    description:
      "Compare collaborative docs, wikis, internal knowledge bases, SOP libraries, team portals, AI search, and documentation platforms.",
    searchIntent: "Targets searches like best knowledge base software, Coda alternatives, Confluence vs Slite, and internal wiki tools.",
    comparisonIdeas: ["Coda vs Confluence", "Slite vs Guru", "Nuclino vs Slab"],
  },
  "Scheduling & calendar": {
    title: "Best Scheduling and Calendar Tools",
    description:
      "Compare scheduling, booking, AI calendar, focus time, task planning, team availability, and meeting automation tools for busy teams.",
    searchIntent: "Targets searches like best scheduling app, Calendly alternatives, Motion vs Reclaim, and AI calendar tools.",
    comparisonIdeas: ["Calendly vs SavvyCal", "Motion vs Reclaim.ai", "Clockwise vs Akiflow"],
  },
  "Design & creator tools": {
    title: "Best Design and Creator Tools",
    description:
      "Compare design, presentation, social graphics, interface design, visual content, templates, brand assets, and creator production tools.",
    searchIntent: "Targets searches like Canva alternatives, best design tools, Figma vs Adobe Express, and creator design software.",
    comparisonIdeas: ["Canva vs Adobe Express", "Figma vs Canva", "Visme vs Piktochart"],
  },
  "Password & security": {
    title: "Best Password and Security Tools",
    description:
      "Compare password managers and team security tools for vaults, secure sharing, passkeys, admin controls, audits, SSO, and business protection.",
    searchIntent: "Targets searches like best password manager for teams, 1Password alternatives, NordPass vs Dashlane, and business password security.",
    comparisonIdeas: ["1Password vs NordPass", "Dashlane vs Keeper", "Bitwarden vs Proton Pass"],
  },
  "Social media scheduling": {
    title: "Best Social Media Scheduling Tools",
    description:
      "Compare social media scheduling and management tools for publishing calendars, analytics, inbox management, approvals, AI captions, and agency workflows.",
    searchIntent: "Targets searches like best social media scheduler, Buffer alternatives, Hootsuite vs Sprout Social, and social media management tools.",
    comparisonIdeas: ["Buffer vs Hootsuite", "Social Champ vs Buffer", "Zoho Social vs Sprout Social"],
  },
};

export const toolUrls: Record<string, string> = {
  "ActiveCampaign": "https://www.activecampaign.com/",
  "Ahrefs": "https://ahrefs.com/",
  "1Password": "https://1password.com/",
  "Airtable": "https://www.airtable.com/",
  "Adobe Express": "https://www.adobe.com/express/",
  "Agorapulse": "https://www.agorapulse.com/",
  "Akiflow": "https://akiflow.com/",
  "AWeber": "https://www.aweber.com/",
  "Base44": "https://base44.com/",
  "BigCommerce": "https://www.bigcommerce.com/",
  "Bitwarden": "https://bitwarden.com/",
  "Bluehost": "https://www.bluehost.com/",
  "Bolt.new": "https://bolt.new/",
  "Buffer": "https://buffer.com/",
  "Asana": "https://asana.com/",
  "Avoma": "https://www.avoma.com/",
  "Better Proposals": "https://betterproposals.io/",
  "Camtasia": "https://www.techsmith.com/camtasia/",
  "Calendly": "https://calendly.com/",
  "Canva": "https://www.canva.com/",
  "ChatGPT": "https://chatgpt.com/",
  "Claude": "https://claude.ai/",
  "Claude Code": "https://www.anthropic.com/claude-code",
  "ClickFunnels": "https://www.clickfunnels.com/",
  "ClickUp": "https://clickup.com/",
  "Cloudways": "https://www.cloudways.com/",
  "Codeium / Windsurf": "https://windsurf.com/",
  "Crisp": "https://crisp.chat/",
  "Coda": "https://coda.io/",
  "Confluence": "https://www.atlassian.com/software/confluence",
  "Clockwise": "https://www.getclockwise.com/",
  "Cursor": "https://cursor.com/",
  "Dashlane": "https://www.dashlane.com/",
  "Descript": "https://www.descript.com/",
  "DocuSign": "https://www.docusign.com/",
  "Dropbox Sign": "https://sign.dropbox.com/",
  "Envato Elements": "https://elements.envato.com/",
  "Fathom": "https://fathom.video/",
  "Feathery": "https://www.feathery.io/",
  "Figma": "https://www.figma.com/",
  "Fillout": "https://www.fillout.com/",
  "Fireflies.ai": "https://fireflies.ai/",
  "Formstack": "https://www.formstack.com/",
  "Frase": "https://www.frase.io/",
  "Freshdesk": "https://www.freshworks.com/freshdesk/",
  "Freshsales": "https://www.freshworks.com/crm/sales/",
  "Gemini": "https://gemini.google.com/",
  "GetResponse": "https://www.getresponse.com/",
  "GitHub Copilot": "https://github.com/features/copilot",
  "GoHighLevel": "https://www.gohighlevel.com/",
  "Guru": "https://www.getguru.com/",
  "Hostinger": "https://www.hostinger.com/",
  "Hostinger Horizons": "https://www.hostinger.com/horizons",
  "Hootsuite": "https://www.hootsuite.com/",
  "HubSpot": "https://www.hubspot.com/",
  "Help Scout": "https://www.helpscout.com/",
  "Intercom": "https://www.intercom.com/",
  "Jotform": "https://www.jotform.com/",
  "Kajabi": "https://kajabi.com/",
  "Kinsta": "https://kinsta.com/",
  "Keeper": "https://www.keepersecurity.com/",
  "Kit / ConvertKit": "https://kit.com/",
  "Later": "https://later.com/",
  "Lovable": "https://lovable.dev/",
  "Loom": "https://www.loom.com/",
  "MailerLite": "https://www.mailerlite.com/",
  "Make": "https://www.make.com/",
  "monday.com": "https://monday.com/",
  "Motion": "https://www.usemotion.com/",
  "NordPass": "https://nordpass.com/",
  "Nuclino": "https://www.nuclino.com/",
  "Notion": "https://www.notion.com/",
  "Otter.ai": "https://otter.ai/",
  "PandaDoc": "https://www.pandadoc.com/",
  "Paperform": "https://paperform.co/",
  "Perplexity": "https://www.perplexity.ai/",
  "Piktochart": "https://piktochart.com/",
  "Pipedrive": "https://www.pipedrive.com/",
  "Podia": "https://www.podia.com/",
  "Poe": "https://poe.com/",
  "Proposify": "https://www.proposify.com/",
  "Proton Pass": "https://proton.me/pass",
  "Qwilr": "https://qwilr.com/",
  "Reclaim.ai": "https://reclaim.ai/",
  "Replit": "https://replit.com/",
  "Riverside": "https://riverside.fm/",
  "Screen Studio": "https://www.screen.studio/",
  "SE Ranking": "https://seranking.com/",
  "Sembly": "https://www.sembly.ai/",
  "Sendible": "https://www.sendible.com/",
  "SavvyCal": "https://savvycal.com/",
  "Sellfy": "https://sellfy.com/",
  "Semrush": "https://www.semrush.com/",
  "Shopify": "https://www.shopify.com/",
  "Social Champ": "https://www.socialchamp.com/",
  "SocialPilot": "https://www.socialpilot.co/",
  "Smartsheet": "https://www.smartsheet.com/",
  "Softr": "https://www.softr.io/",
  "Slab": "https://slab.com/",
  "Slite": "https://slite.com/",
  "Squarespace": "https://www.squarespace.com/",
  "Sprout Social": "https://sproutsocial.com/",
  "Surfer": "https://surferseo.com/",
  "Teachable": "https://teachable.com/",
  "Thinkific": "https://www.thinkific.com/",
  "Tally": "https://tally.so/",
  "Tidio": "https://www.tidio.com/",
  "tl;dv": "https://tldv.io/",
  "Typeform": "https://www.typeform.com/",
  "VEED": "https://www.veed.io/",
  "Visme": "https://www.visme.co/",
  "Windsurf": "https://windsurf.com/",
  "Wix": "https://www.wix.com/",
  "WP Engine": "https://wpengine.com/",
  "Wrike": "https://www.wrike.com/",
  "Zapier": "https://zapier.com/",
  "Zendesk": "https://www.zendesk.com/",
  "Zoho": "https://www.zoho.com/",
  "Zoho Social": "https://www.zoho.com/social/",
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
  {
    niche: "Team productivity platforms",
    name: "ClickUp",
    rating: 4.7,
    reviews: "Strong G2/Capterra signal",
    pricing: "Free; paid plans from about $7/user/mo annually",
    bestFor: "All-in-one work management, docs, dashboards, and automations",
    features: ["Tasks", "Docs", "Dashboards"],
  },
  {
    niche: "Team productivity platforms",
    name: "monday.com",
    rating: 4.6,
    reviews: "Strong G2/Capterra signal",
    pricing: "Free for small teams; paid plans from about $9/seat/mo annually",
    bestFor: "Visual project boards, team workflows, CRM-style operations, and dashboards",
    features: ["Boards", "Automations", "Dashboards"],
  },
  {
    niche: "Team productivity platforms",
    name: "Asana",
    rating: 4.5,
    reviews: "Strong G2/Capterra signal",
    pricing: "Free; Starter from about $10.99/user/mo annually",
    bestFor: "Task management, project planning, goals, and cross-functional collaboration",
    features: ["Projects", "Goals", "Workflow builder"],
  },
  {
    niche: "Team productivity platforms",
    name: "Wrike",
    rating: 4.4,
    reviews: "Strong enterprise reviews",
    pricing: "Free; Team from about $10/user/mo, Business from about $25/user/mo",
    bestFor: "Agency, marketing, operations, and enterprise project management workflows",
    features: ["Gantt charts", "Approvals", "Resource planning"],
  },
  {
    niche: "Team productivity platforms",
    name: "Smartsheet",
    rating: 4.4,
    reviews: "Strong enterprise reviews",
    pricing: "Pro from about $9/member/mo annually; Business from about $19/member/mo",
    bestFor: "Spreadsheet-style project management, reporting, portfolios, and enterprise workflows",
    features: ["Grid views", "Reports", "Portfolio tracking"],
  },
  {
    niche: "AI meeting notes",
    name: "Fireflies.ai",
    rating: 4.7,
    reviews: "Strong G2/Capterra signal",
    pricing: "Free; Pro from about $10/seat/mo annually; Business from about $19/seat/mo",
    bestFor: "Meeting transcription, summaries, searchable conversations, and CRM sync",
    features: ["Transcription", "AI summaries", "CRM integrations"],
  },
  {
    niche: "AI meeting notes",
    name: "Fathom",
    rating: 4.8,
    reviews: "Strong user review signal",
    pricing: "Free individual plan; paid team plans from about $19/user/mo",
    bestFor: "Fast meeting summaries, action items, call clips, and sales follow-up notes",
    features: ["Call summaries", "Action items", "CRM sync"],
  },
  {
    niche: "AI meeting notes",
    name: "Otter.ai",
    rating: 4.5,
    reviews: "High awareness reviews",
    pricing: "Free; Pro from about $8.33/user/mo annually; Business from about $20/user/mo",
    bestFor: "Meeting notes, live transcription, team sharing, and searchable audio records",
    features: ["Live transcription", "Meeting chat", "Team vocabulary"],
  },
  {
    niche: "AI meeting notes",
    name: "tl;dv",
    rating: 4.6,
    reviews: "Fast-growing reviews",
    pricing: "Free; Pro from about $18/user/mo; Business from about $39/user/mo",
    bestFor: "Recorded meetings, highlights, AI notes, and searchable customer conversations",
    features: ["Meeting recording", "AI notes", "Highlights"],
  },
  {
    niche: "AI meeting notes",
    name: "Avoma",
    rating: 4.6,
    reviews: "Strong sales team reviews",
    pricing: "Paid plans commonly start around $19/user/mo",
    bestFor: "Revenue teams needing meeting intelligence, coaching, notes, and CRM hygiene",
    features: ["Conversation intelligence", "Coaching", "CRM updates"],
  },
  {
    niche: "AI meeting notes",
    name: "Sembly",
    rating: 4.4,
    reviews: "Growing review signal",
    pricing: "Free; paid plans commonly start around $10/user/mo",
    bestFor: "Meeting minutes, task extraction, team notes, and AI-generated summaries",
    features: ["Meeting minutes", "Tasks", "AI summaries"],
  },
  {
    niche: "Video & podcast tools",
    name: "Riverside",
    rating: 4.7,
    reviews: "Strong creator reviews",
    pricing: "Free; Standard from about $15/mo annually; Pro from about $24/mo",
    bestFor: "Remote podcast recording, webinars, interviews, and studio-quality video capture",
    features: ["Local recording", "AI clips", "Transcripts"],
  },
  {
    niche: "Video & podcast tools",
    name: "Descript",
    rating: 4.6,
    reviews: "Strong creator reviews",
    pricing: "Free; Hobbyist from about $12/person/mo annually; Creator from about $24/person/mo",
    bestFor: "Text-based video editing, podcast editing, screen recording, and repurposing",
    features: ["Text editing", "Overdub", "Clips"],
  },
  {
    niche: "Video & podcast tools",
    name: "Loom",
    rating: 4.6,
    reviews: "High awareness reviews",
    pricing: "Free; Business from about $15/creator/mo annually",
    bestFor: "Async video messages, tutorials, team updates, and quick screen recordings",
    features: ["Screen recording", "Video messages", "Team library"],
  },
  {
    niche: "Video & podcast tools",
    name: "VEED",
    rating: 4.5,
    reviews: "Fast-growing reviews",
    pricing: "Free; Lite from about $12/user/mo annually; Pro from about $29/user/mo",
    bestFor: "Browser-based video editing, captions, social clips, and creator content",
    features: ["Captions", "AI editing", "Social clips"],
  },
  {
    niche: "Video & podcast tools",
    name: "Screen Studio",
    rating: 4.6,
    reviews: "Creator favorite",
    pricing: "One-time license commonly starts around $89",
    bestFor: "Polished product demos, app walkthroughs, and Mac screen recordings",
    features: ["Screen demos", "Auto zoom", "Export presets"],
  },
  {
    niche: "Video & podcast tools",
    name: "Camtasia",
    rating: 4.4,
    reviews: "Long-standing review signal",
    pricing: "Annual plans commonly start around $179.88/year",
    bestFor: "Screen recording, tutorial videos, training content, and desktop editing",
    features: ["Screen recorder", "Templates", "Cursor effects"],
  },
  {
    niche: "Customer support software",
    name: "Zendesk",
    rating: 4.5,
    reviews: "Enterprise known",
    pricing: "Support plans commonly start around $19/agent/mo annually",
    bestFor: "Ticketing, help center, omnichannel support, and larger support operations",
    features: ["Ticketing", "Help center", "AI support"],
  },
  {
    niche: "Customer support software",
    name: "Intercom",
    rating: 4.6,
    reviews: "Strong B2B reviews",
    pricing: "Plans commonly start around $29/seat/mo plus usage-based AI/support costs",
    bestFor: "Customer messaging, live chat, AI agents, and product-led support",
    features: ["Messenger", "AI agent", "Help center"],
  },
  {
    niche: "Customer support software",
    name: "Help Scout",
    rating: 4.7,
    reviews: "Strong SMB reviews",
    pricing: "Standard from about $25/user/mo; Plus from about $50/user/mo",
    bestFor: "Simple shared inbox, docs, chat, and customer support for growing teams",
    features: ["Shared inbox", "Docs", "Beacon chat"],
  },
  {
    niche: "Customer support software",
    name: "Freshdesk",
    rating: 4.5,
    reviews: "Strong helpdesk reviews",
    pricing: "Free; Growth from about $15/agent/mo annually; Pro from about $49/agent/mo",
    bestFor: "Ticketing, automation, omnichannel support, and Freshworks ecosystem teams",
    features: ["Tickets", "Automations", "Omnichannel"],
  },
  {
    niche: "Customer support software",
    name: "Crisp",
    rating: 4.4,
    reviews: "Growing SMB reviews",
    pricing: "Free; paid workspace plans commonly start around $45/mo",
    bestFor: "Live chat, shared inbox, chatbot flows, and customer messaging for startups",
    features: ["Live chat", "Shared inbox", "Chatbots"],
  },
  {
    niche: "Customer support software",
    name: "Tidio",
    rating: 4.5,
    reviews: "Strong SMB reviews",
    pricing: "Free; paid plans commonly start around $24/mo",
    bestFor: "Live chat, AI chatbot support, ecommerce support, and lead capture",
    features: ["Live chat", "AI chatbot", "Ecommerce support"],
  },
  {
    niche: "Proposal & e-signature",
    name: "PandaDoc",
    rating: 4.7,
    reviews: "Strong sales reviews",
    pricing: "Starter from about $19/user/mo annually; Business from about $49/user/mo",
    bestFor: "Proposals, quotes, contracts, document automation, and sales approvals",
    features: ["Proposals", "E-signatures", "CPQ"],
  },
  {
    niche: "Proposal & e-signature",
    name: "DocuSign",
    rating: 4.6,
    reviews: "Enterprise known",
    pricing: "Personal from about $10/mo; Standard from about $25/user/mo",
    bestFor: "E-signatures, agreements, approvals, and enterprise contract workflows",
    features: ["E-signatures", "Templates", "Agreement workflows"],
  },
  {
    niche: "Proposal & e-signature",
    name: "Dropbox Sign",
    rating: 4.5,
    reviews: "Strong e-sign reviews",
    pricing: "Essentials from about $15/mo; Standard from about $25/user/mo",
    bestFor: "Simple e-signature workflows, forms, templates, and Dropbox-connected teams",
    features: ["E-signatures", "Templates", "Audit trail"],
  },
  {
    niche: "Proposal & e-signature",
    name: "Better Proposals",
    rating: 4.6,
    reviews: "Agency-friendly reviews",
    pricing: "Starter from about $19/user/mo; Premium from about $29/user/mo",
    bestFor: "Agencies and consultants sending branded proposals and closing pages",
    features: ["Proposal builder", "Payments", "Templates"],
  },
  {
    niche: "Proposal & e-signature",
    name: "Proposify",
    rating: 4.4,
    reviews: "Sales proposal reviews",
    pricing: "Basic from about $35/mo; team plans commonly start around $49/user/mo",
    bestFor: "Sales teams managing proposal content, approvals, and close tracking",
    features: ["Proposal templates", "Approvals", "Analytics"],
  },
  {
    niche: "Proposal & e-signature",
    name: "Qwilr",
    rating: 4.5,
    reviews: "Modern proposal reviews",
    pricing: "Business plans commonly start around $35/user/mo",
    bestFor: "Interactive sales proposals, microsites, quotes, and buyer-facing deal rooms",
    features: ["Interactive proposals", "Quotes", "Analytics"],
  },
  {
    niche: "Forms & surveys",
    name: "Jotform",
    rating: 4.7,
    reviews: "Strong G2/Capterra signal",
    pricing: "Free; paid plans commonly start around $34/mo annually",
    bestFor: "Forms, surveys, approvals, payments, and no-code data collection workflows",
    features: ["Form builder", "Approvals", "Payments"],
  },
  {
    niche: "Forms & surveys",
    name: "Tally",
    rating: 4.6,
    reviews: "Fast-growing maker reviews",
    pricing: "Free; Pro commonly starts around $29/mo",
    bestFor: "Fast, clean forms for founders, creators, startups, and lightweight surveys",
    features: ["Unlimited forms", "Logic", "Payments"],
  },
  {
    niche: "Forms & surveys",
    name: "Fillout",
    rating: 4.6,
    reviews: "Strong no-code reviews",
    pricing: "Free; paid plans commonly start around $15/mo",
    bestFor: "Modern forms, quizzes, Airtable-connected workflows, and customer intake",
    features: ["Forms", "Quizzes", "Integrations"],
  },
  {
    niche: "Forms & surveys",
    name: "Paperform",
    rating: 4.5,
    reviews: "Creator and agency reviews",
    pricing: "Essentials commonly starts around $20/mo annually",
    bestFor: "Branded forms, landing-page style surveys, payments, and service intake",
    features: ["Branded forms", "Payments", "Calculations"],
  },
  {
    niche: "Forms & surveys",
    name: "Formstack",
    rating: 4.4,
    reviews: "Business workflow reviews",
    pricing: "Forms plans commonly start around $50/mo annually",
    bestFor: "Business forms, document workflows, approvals, compliance, and operations",
    features: ["Forms", "Workflows", "Documents"],
  },
  {
    niche: "Forms & surveys",
    name: "Feathery",
    rating: 4.5,
    reviews: "Product and SaaS team reviews",
    pricing: "Free; paid plans commonly start around $49/mo",
    bestFor: "Advanced signup flows, product forms, onboarding, and conditional intake workflows",
    features: ["Advanced forms", "Conditional logic", "Integrations"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Coda",
    rating: 4.6,
    reviews: "Strong team docs reviews",
    pricing: "Free; Pro commonly starts around $10/doc maker/mo annually",
    bestFor: "Docs that behave like apps, team workflows, trackers, and operating systems",
    features: ["Docs", "Tables", "Packs"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Confluence",
    rating: 4.4,
    reviews: "Enterprise known",
    pricing: "Free; Standard commonly starts around $6.40/user/mo annually",
    bestFor: "Company wikis, project documentation, technical knowledge, and Atlassian teams",
    features: ["Pages", "Spaces", "Atlassian sync"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Slite",
    rating: 4.5,
    reviews: "Remote team reviews",
    pricing: "Standard commonly starts around $8/member/mo annually",
    bestFor: "Remote team knowledge bases, handbook pages, decisions, and internal docs",
    features: ["Knowledge base", "AI answers", "Docs"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Guru",
    rating: 4.6,
    reviews: "Strong support/sales reviews",
    pricing: "Plans commonly start around $15/user/mo",
    bestFor: "Verified company knowledge, sales enablement, support answers, and AI search",
    features: ["Knowledge cards", "Verification", "AI search"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Nuclino",
    rating: 4.5,
    reviews: "Lightweight wiki reviews",
    pricing: "Free; Standard commonly starts around $6/user/mo annually",
    bestFor: "Simple team wikis, collaborative docs, project notes, and internal knowledge",
    features: ["Wiki", "Graph view", "Docs"],
  },
  {
    niche: "Docs & knowledge base",
    name: "Slab",
    rating: 4.5,
    reviews: "Knowledge base reviews",
    pricing: "Free; Startup commonly starts around $6.67/user/mo annually",
    bestFor: "Internal knowledge bases, team docs, onboarding, and searchable company answers",
    features: ["Topics", "Search", "Integrations"],
  },
  {
    niche: "Scheduling & calendar",
    name: "Calendly",
    rating: 4.7,
    reviews: "High awareness reviews",
    pricing: "Free; Standard commonly starts around $10/seat/mo annually",
    bestFor: "Meeting booking, routing, reminders, team scheduling, and sales calendars",
    features: ["Scheduling links", "Routing", "Reminders"],
  },
  {
    niche: "Scheduling & calendar",
    name: "SavvyCal",
    rating: 4.5,
    reviews: "Founder-friendly reviews",
    pricing: "Basic commonly starts around $12/user/mo",
    bestFor: "Polished scheduling links, calendar overlays, and consultant booking workflows",
    features: ["Calendar overlay", "Scheduling links", "Team scheduling"],
  },
  {
    niche: "Scheduling & calendar",
    name: "Motion",
    rating: 4.5,
    reviews: "AI productivity reviews",
    pricing: "Individual plans commonly start around $19/mo annually",
    bestFor: "AI calendar planning, task scheduling, focus time, and daily workload control",
    features: ["AI calendar", "Task planning", "Project scheduling"],
  },
  {
    niche: "Scheduling & calendar",
    name: "Reclaim.ai",
    rating: 4.6,
    reviews: "Strong calendar reviews",
    pricing: "Free; Starter commonly starts around $8/user/mo annually",
    bestFor: "Smart calendar blocking, habits, focus time, team scheduling, and availability",
    features: ["Smart blocking", "Habits", "Focus time"],
  },
  {
    niche: "Scheduling & calendar",
    name: "Clockwise",
    rating: 4.4,
    reviews: "Team calendar reviews",
    pricing: "Free; paid plans commonly start around $6.75/user/mo annually",
    bestFor: "Focus time protection, calendar optimization, meeting moves, and team schedules",
    features: ["Focus time", "Calendar optimization", "Team availability"],
  },
  {
    niche: "Scheduling & calendar",
    name: "Akiflow",
    rating: 4.5,
    reviews: "Power-user reviews",
    pricing: "Plans commonly start around $19/mo annually",
    bestFor: "Task inbox, calendar planning, time blocking, and personal productivity systems",
    features: ["Task inbox", "Time blocking", "Calendar planning"],
  },
  {
    niche: "Design & creator tools",
    name: "Canva",
    rating: 4.7,
    reviews: "High awareness reviews",
    pricing: "Free; Pro commonly starts around $15/person/mo",
    bestFor: "Social graphics, presentations, brand templates, quick design, and creator assets",
    features: ["Templates", "Brand kit", "AI design"],
  },
  {
    niche: "Design & creator tools",
    name: "Adobe Express",
    rating: 4.5,
    reviews: "Strong creator reviews",
    pricing: "Free; Premium commonly starts around $9.99/mo",
    bestFor: "Quick graphics, social content, Adobe asset workflows, and creator campaigns",
    features: ["Templates", "Generative AI", "Social content"],
  },
  {
    niche: "Design & creator tools",
    name: "Figma",
    rating: 4.8,
    reviews: "Design team favorite",
    pricing: "Free; Professional commonly starts around $12/editor/mo annually",
    bestFor: "Interface design, prototypes, design systems, collaboration, and product teams",
    features: ["Design files", "Prototyping", "FigJam"],
  },
  {
    niche: "Design & creator tools",
    name: "Visme",
    rating: 4.5,
    reviews: "Presentation and content reviews",
    pricing: "Basic free; Starter commonly starts around $12.25/mo annually",
    bestFor: "Presentations, infographics, reports, branded content, and visual documents",
    features: ["Presentations", "Infographics", "Brand assets"],
  },
  {
    niche: "Design & creator tools",
    name: "Piktochart",
    rating: 4.4,
    reviews: "Infographic reviews",
    pricing: "Free; Pro commonly starts around $14/member/mo annually",
    bestFor: "Infographics, reports, visual stories, presentations, and marketing graphics",
    features: ["Infographics", "Reports", "Visual templates"],
  },
  {
    niche: "Design & creator tools",
    name: "Envato Elements",
    rating: 4.5,
    reviews: "Creator asset reviews",
    pricing: "Individual plans commonly start around $16.50/mo annually",
    bestFor: "Templates, stock assets, fonts, videos, design files, and creator production",
    features: ["Templates", "Stock assets", "Fonts"],
  },
  {
    niche: "Password & security",
    name: "1Password",
    rating: 4.8,
    reviews: "Strong business reviews",
    pricing: "Individual from about $2.99/mo; Teams Starter commonly around $19.95/mo",
    bestFor: "Password management, passkeys, secure sharing, admin controls, and business vaults",
    features: ["Vaults", "Passkeys", "Admin controls"],
  },
  {
    niche: "Password & security",
    name: "NordPass",
    rating: 4.6,
    reviews: "Strong security reviews",
    pricing: "Personal and business plans; business pricing commonly starts around $3.59/user/mo",
    bestFor: "Password vaults, secure sharing, business admin tools, and Nord ecosystem users",
    features: ["Password vault", "Data breach scanner", "Secure sharing"],
  },
  {
    niche: "Password & security",
    name: "Dashlane",
    rating: 4.5,
    reviews: "Business security reviews",
    pricing: "Business plans commonly start around $8/user/mo annually",
    bestFor: "Password management, credential security, dark web monitoring, and team policies",
    features: ["Password manager", "Dark web monitoring", "Admin console"],
  },
  {
    niche: "Password & security",
    name: "Keeper",
    rating: 4.6,
    reviews: "Strong enterprise reviews",
    pricing: "Business plans commonly start around $2/user/mo annually",
    bestFor: "Enterprise password management, secrets management, secure sharing, and compliance",
    features: ["Vaults", "Secrets manager", "Compliance"],
  },
  {
    niche: "Password & security",
    name: "Bitwarden",
    rating: 4.7,
    reviews: "Open-source favorite",
    pricing: "Free; Teams commonly starts around $4/user/mo",
    bestFor: "Open-source password management, teams, secure vaults, and value-focused security",
    features: ["Open source", "Vaults", "Admin policies"],
  },
  {
    niche: "Password & security",
    name: "Proton Pass",
    rating: 4.5,
    reviews: "Privacy-focused reviews",
    pricing: "Free; paid plans commonly start around $4.99/mo",
    bestFor: "Privacy-focused password management, aliases, secure sharing, and Proton users",
    features: ["Password vault", "Email aliases", "Passkeys"],
  },
  {
    niche: "Social media scheduling",
    name: "Social Champ",
    rating: 4.6,
    reviews: "Agency-friendly reviews",
    pricing: "Free; paid plans commonly start around $29/mo",
    bestFor: "Social scheduling, content calendars, approvals, analytics, and agency workflows",
    features: ["Scheduling", "Approvals", "Analytics"],
  },
  {
    niche: "Social media scheduling",
    name: "Buffer",
    rating: 4.5,
    reviews: "High awareness reviews",
    pricing: "Free; Essentials commonly starts around $5/channel/mo annually",
    bestFor: "Simple social scheduling, publishing queues, small teams, and creator calendars",
    features: ["Publishing queue", "Analytics", "Engagement"],
  },
  {
    niche: "Social media scheduling",
    name: "Hootsuite",
    rating: 4.4,
    reviews: "Enterprise known",
    pricing: "Professional commonly starts around $99/mo annually",
    bestFor: "Multi-network social management, monitoring, reporting, teams, and larger brands",
    features: ["Scheduling", "Streams", "Reporting"],
  },
  {
    niche: "Social media scheduling",
    name: "Zoho Social",
    rating: 4.5,
    reviews: "Strong SMB reviews",
    pricing: "Standard commonly starts around $10/mo annually; agency plans available",
    bestFor: "Affordable social scheduling, brand monitoring, CRM-connected teams, and agencies",
    features: ["Publishing", "Monitoring", "CRM sync"],
  },
  {
    niche: "Social media scheduling",
    name: "Later",
    rating: 4.4,
    reviews: "Creator and ecommerce reviews",
    pricing: "Starter commonly starts around $16.67/mo annually",
    bestFor: "Visual social planning, Instagram/TikTok workflows, link-in-bio, and creator content",
    features: ["Visual calendar", "Link in bio", "Analytics"],
  },
  {
    niche: "Social media scheduling",
    name: "Sprout Social",
    rating: 4.6,
    reviews: "Strong mid-market reviews",
    pricing: "Standard commonly starts around $199/seat/mo",
    bestFor: "Premium social management, analytics, inbox workflows, listening, and support teams",
    features: ["Smart inbox", "Analytics", "Social listening"],
  },
  {
    niche: "Social media scheduling",
    name: "Agorapulse",
    rating: 4.5,
    reviews: "Agency and SMB reviews",
    pricing: "Standard commonly starts around $49/user/mo annually",
    bestFor: "Social inbox, scheduling, reporting, team collaboration, and agency client management",
    features: ["Social inbox", "Publishing", "Reports"],
  },
  {
    niche: "Social media scheduling",
    name: "Sendible",
    rating: 4.4,
    reviews: "Agency-focused reviews",
    pricing: "Creator commonly starts around $29/mo; agency plans available",
    bestFor: "Agency scheduling, client dashboards, content approvals, and social reporting",
    features: ["Client dashboards", "Approvals", "Reporting"],
  },
  {
    niche: "Social media scheduling",
    name: "SocialPilot",
    rating: 4.5,
    reviews: "Value-focused agency reviews",
    pricing: "Professional commonly starts around $25.50/mo annually",
    bestFor: "Cost-conscious agencies, bulk scheduling, client approvals, and multi-brand calendars",
    features: ["Bulk scheduling", "Client approvals", "Analytics"],
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
  {
    rank: 9,
    name: "ClickUp",
    niche: "Team productivity platforms",
    pageAngle: "Best team productivity platforms",
    reason: "Large productivity category with ClickUp alternatives, monday.com comparisons, and workflow software intent.",
  },
  {
    rank: 10,
    name: "Intercom",
    niche: "Customer support software",
    pageAngle: "Best customer support software",
    reason: "High-value B2B support category with AI agents, live chat, helpdesk, and support automation searches.",
  },
  {
    rank: 11,
    name: "PandaDoc",
    niche: "Proposal & e-signature",
    pageAngle: "Best proposal and e-signature tools",
    reason: "Commercial proposal, quote, contract, and e-signature searches often come from buyers close to purchase.",
  },
  {
    rank: 12,
    name: "Riverside",
    niche: "Video & podcast tools",
    pageAngle: "Best podcast recording software",
    reason: "Creator and business video searches connect well to recording, editing, repurposing, and podcast workflows.",
  },
  {
    rank: 13,
    name: "1Password",
    niche: "Password & security",
    pageAngle: "Best password managers for teams",
    reason: "Security software searches have strong commercial intent and clear business buying criteria.",
  },
  {
    rank: 14,
    name: "Calendly",
    niche: "Scheduling & calendar",
    pageAngle: "Best scheduling apps and Calendly alternatives",
    reason: "Scheduling tools attract founders, sales teams, recruiters, consultants, and operations buyers.",
  },
  {
    rank: 15,
    name: "Canva",
    niche: "Design & creator tools",
    pageAngle: "Best creator design tools",
    reason: "Design and creator software brings broad search demand with strong template, brand, and content workflows.",
  },
  {
    rank: 16,
    name: "Jotform",
    niche: "Forms & surveys",
    pageAngle: "Best form builders and Typeform alternatives",
    reason: "Forms, surveys, intake, and lead capture searches connect directly to business workflows.",
  },
  {
    rank: 17,
    name: "Buffer",
    niche: "Social media scheduling",
    pageAngle: "Best social media scheduling tools",
    reason: "Social scheduling searches attract creators, small businesses, agencies, ecommerce brands, and marketing teams.",
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
  {
    title: "Best AI meeting note takers",
    detail: "Fireflies, Fathom, Otter, tl;dv, Avoma, and Sembly compared by workflow.",
    read: "8 min read",
  },
  {
    title: "Best customer support tools for growing teams",
    detail: "Zendesk, Intercom, Help Scout, Freshdesk, Crisp, and Tidio compared.",
    read: "10 min read",
  },
  {
    title: "Best password managers for teams",
    detail: "1Password, NordPass, Dashlane, Keeper, Bitwarden, and Proton Pass compared.",
    read: "9 min read",
  },
  {
    title: "Best form builders for lead capture",
    detail: "Jotform, Tally, Fillout, Paperform, Formstack, and Feathery compared.",
    read: "8 min read",
  },
  {
    title: "Best social media schedulers for agencies",
    detail: "Social Champ, Buffer, Hootsuite, Zoho Social, Later, Sprout Social, and more compared.",
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
  if (tool.niche === "Mini SaaS / productivity") return "Databases, automations, forms, dashboards, integrations, solo-founder workflow";
  if (tool.niche === "Team productivity platforms") return "Tasks, dashboards, automations, reporting, workload, permissions";
  if (tool.niche === "AI meeting notes") return "Transcription quality, summaries, action items, CRM sync, privacy";
  if (tool.niche === "Video & podcast tools") return "Recording quality, editing speed, captions, clips, collaboration, export";
  if (tool.niche === "Customer support software") return "Ticketing, AI support, live chat, knowledge base, routing, analytics";
  if (tool.niche === "Proposal & e-signature") return "Proposal builder, e-signatures, templates, approvals, payments, analytics";
  if (tool.niche === "Forms & surveys") return "Form design, logic, payments, integrations, analytics, conversion";
  if (tool.niche === "Docs & knowledge base") return "Docs, wiki structure, AI search, permissions, verification, integrations";
  if (tool.niche === "Scheduling & calendar") return "Booking flow, availability, routing, reminders, calendar sync, focus time";
  if (tool.niche === "Design & creator tools") return "Templates, brand assets, collaboration, exports, AI features, content workflows";
  if (tool.niche === "Password & security") return "Vault security, sharing, passkeys, admin controls, audits, business policies";
  return "Publishing calendar, social inbox, approvals, analytics, AI captions, team workflows";
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

export function toolLogoHue(tool: Pick<Software, "name">) {
  const total = tool.name
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return total % 360;
}

export function toolLogoSrc(tool: Pick<Software, "name">) {
  const url = toolUrl(tool);

  if (!url || url === "#") {
    return "";
  }

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return "";
  }
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

export type ReviewSignal = {
  source: "SakuStack" | "G2" | "Capterra";
  rating: string;
  reviews: string;
  role: string;
  status: "Editorial" | "Public snapshot" | "Pending verification";
  lastChecked: string;
};

const priorityExternalReviewSignals: Record<
  string,
  Pick<Software, "g2Rating" | "g2Reviews" | "capterraRating" | "capterraReviews" | "lastChecked">
> = {
  "HubSpot": {
    g2Rating: "4.4/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.5/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "Semrush": {
    g2Rating: "4.5/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.7/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "ClickUp": {
    g2Rating: "4.7/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.6/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "monday.com": {
    g2Rating: "4.7/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.6/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "Fireflies.ai": {
    g2Rating: "4.8/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.7/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "Intercom": {
    g2Rating: "4.5/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.5/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "PandaDoc": {
    g2Rating: "4.7/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.5/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "1Password": {
    g2Rating: "4.7/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.7/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "Canva": {
    g2Rating: "4.7/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.7/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
  "Shopify": {
    g2Rating: "4.4/5",
    g2Reviews: "Public G2 review profile",
    capterraRating: "4.5/5",
    capterraReviews: "Public Capterra review profile",
    lastChecked: externalRatingsChecked,
  },
};

export function externalReviewProfile(tool: Software) {
  return {
    ...tool,
    ...priorityExternalReviewSignals[tool.name],
  };
}

export function reviewSignals(tool: Software): ReviewSignal[] {
  const profile = externalReviewProfile(tool);

  return [
    {
      source: "SakuStack",
      rating: `${tool.rating}/5`,
      reviews: "Editorial score",
      role: "Buyer-fit score based on features, pricing clarity, use case fit, and comparison value.",
      status: "Editorial",
      lastChecked: lastUpdated,
    },
    {
      source: "G2",
      rating: profile.g2Rating ?? "Pending",
      reviews: profile.g2Reviews ?? "Pending verification",
      role: "Third-party user review signal. Verify current rating on the source profile before relying on it.",
      status: profile.g2Rating ? "Public snapshot" : "Pending verification",
      lastChecked: profile.lastChecked ?? "Pending verification",
    },
    {
      source: "Capterra",
      rating: profile.capterraRating ?? "Pending",
      reviews: profile.capterraReviews ?? "Pending verification",
      role: "Third-party user review signal. Verify current rating on the source profile before relying on it.",
      status: profile.capterraRating ? "Public snapshot" : "Pending verification",
      lastChecked: profile.lastChecked ?? "Pending verification",
    },
  ];
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

export const trendingToolNames = [
  "ChatGPT",
  "Claude",
  "ClickUp",
  "Fireflies.ai",
  "Canva",
  "Buffer",
  "1Password",
  "Shopify",
  "Intercom",
  "PandaDoc",
  "Social Champ",
  "Riverside",
];

export const trendingTools = trendingToolNames
  .map((name) => uniqueSoftware.find((tool) => tool.name === name))
  .filter((tool): tool is Software => Boolean(tool));

export const popularComparisonSlugs = [
  "chatgpt-vs-claude",
  "clickup-vs-mondaycom",
  "firefliesai-vs-otterai",
  "buffer-vs-hootsuite",
  "1password-vs-nordpass",
  "hubspot-vs-pipedrive",
  "canva-vs-adobe-express",
  "pandadoc-vs-docusign",
];

export const popularComparisons = popularComparisonSlugs
  .map((slug) => comparisonFromSlug(slug))
  .filter((comparison): comparison is NonNullable<ReturnType<typeof comparisonFromSlug>> =>
    Boolean(comparison),
  );

export const useCaseGroups = [
  {
    label: "For AI work",
    description: "Chat, coding, research, meeting notes, and AI-assisted visibility.",
    niches: ["LLM assistants", "AI coding tools", "AI meeting notes", "SEO / AI visibility"] satisfies CategoryNiche[],
  },
  {
    label: "For marketing",
    description: "Email, social, forms, SEO, design, content, and lead capture.",
    niches: ["Email marketing", "Social media scheduling", "Forms & surveys", "Design & creator tools"] satisfies CategoryNiche[],
  },
  {
    label: "For sales teams",
    description: "CRM, proposals, scheduling, customer support, and revenue workflows.",
    niches: ["CRM / sales", "Proposal & e-signature", "Scheduling & calendar", "Customer support software"] satisfies CategoryNiche[],
  },
  {
    label: "For creators",
    description: "Courses, funnels, video, podcasts, design assets, and newsletters.",
    niches: ["Courses / funnels", "Video & podcast tools", "Design & creator tools", "Email marketing"] satisfies CategoryNiche[],
  },
  {
    label: "For operations",
    description: "Team productivity, docs, automations, forms, and mini SaaS workflows.",
    niches: ["Team productivity platforms", "Docs & knowledge base", "Mini SaaS / productivity", "Forms & surveys"] satisfies CategoryNiche[],
  },
  {
    label: "For websites and commerce",
    description: "Hosting, ecommerce, security, support, and conversion workflows.",
    niches: ["Hosting", "Ecommerce", "Password & security", "Customer support software"] satisfies CategoryNiche[],
  },
];

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
