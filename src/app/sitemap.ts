import type { MetadataRoute } from "next";

import {
  blogHref,
  knowledgeArticles,
  knowledgeCategoryHref,
} from "./knowledge-data";
import {
  categoryHref,
  categoryNiches,
  comparisonPages,
  softwareHref,
  uniqueSoftware,
} from "./software-data";

const siteUrl = "https://sakustack.com";
const legalRoutes = [
  "/affiliate-disclosure",
  "/privacy-policy",
  "/terms",
  "/methodology",
  "/monetization-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/knowledge-centre`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...categoryNiches.map((niche) => ({
      url: `${siteUrl}${knowledgeCategoryHref(niche)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
    ...knowledgeArticles.map((article) => ({
      url: `${siteUrl}${blogHref(article)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.68,
    })),
    ...categoryNiches.map((niche) => ({
      url: `${siteUrl}${categoryHref(niche)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...uniqueSoftware.map((tool) => ({
      url: `${siteUrl}${softwareHref(tool)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...comparisonPages.map((comparison) => ({
      url: `${siteUrl}/compare/${comparison.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72,
    })),
    ...legalRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.35,
    })),
  ];
}
