import type { MetadataRoute } from "next";

const siteUrl = "https://sakustack.com";

const allowedUserAgents = [
  "*",
  "Googlebot",
  "Google-Extended",
  "GoogleOther",
  "Mediapartners-Google",
  "AdsBot-Google",
  "Bingbot",
  "msnbot",
  "DuckDuckBot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "YouBot",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "AI2Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedUserAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
    host: "sakustack.com",
  };
}
