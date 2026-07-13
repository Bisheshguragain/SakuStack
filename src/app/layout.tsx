import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsent from "./components/CookieConsent";
import GlobalFooter from "./components/GlobalFooter";
import MobileMenu from "./components/MobileMenu";
import { defaultOgImage, siteName, siteUrl } from "./software-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const globalStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    image: `${siteUrl}${defaultOgImage}`,
    knowsAbout: [
      "Software reviews",
      "SaaS comparisons",
      "AI tools",
      "LLM assistants",
      "SEO software",
      "AI visibility tools",
      "CRM software",
      "Web hosting",
      "Ecommerce platforms",
      "Productivity software",
      "Team productivity platforms",
      "AI meeting note takers",
      "Video and podcast software",
      "Customer support software",
      "Proposal software",
      "E-signature tools",
      "Form builders",
      "Survey software",
      "Knowledge base software",
      "Scheduling software",
      "Design tools",
      "Password managers",
      "Business security software",
      "Social media scheduling tools",
      "Social media management software",
    ],
    publishingPrinciples: `${siteUrl}/methodology`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: "Saku Stack",
    url: siteUrl,
    inLanguage: "en",
    description:
      "Software reviews, buying guides, category hubs, and comparison pages for AI tools, SaaS platforms, hosting, CRM, ecommerce, funnels, and productivity software.",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteName} primary site navigation`,
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Software Categories", url: `${siteUrl}/#reviews` },
      { "@type": "SiteNavigationElement", position: 2, name: "Tool Directory", url: `${siteUrl}/tools` },
      { "@type": "SiteNavigationElement", position: 3, name: "Software Deals", url: `${siteUrl}/deals` },
      { "@type": "SiteNavigationElement", position: 4, name: "Knowledge Centre", url: `${siteUrl}/knowledge-centre` },
      { "@type": "SiteNavigationElement", position: 5, name: "Methodology", url: `${siteUrl}/methodology` },
      { "@type": "SiteNavigationElement", position: 6, name: "Affiliate Disclosure", url: `${siteUrl}/affiliate-disclosure` },
      { "@type": "SiteNavigationElement", position: 7, name: "Privacy Policy", url: `${siteUrl}/privacy-policy` },
    ],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  title: {
    default: `${siteName} | Software Reviews, Comparisons, and Buying Guides`,
    template: `%s | ${siteName}`,
  },
  description:
    "Compare AI tools, SaaS platforms, hosting, CRM, ecommerce, funnels, and productivity software with buyer-focused reviews and feature-led recommendations.",
  keywords: [
    "software reviews",
    "software comparisons",
    "AI tools",
    "SaaS tools",
    "affiliate software reviews",
    "best business software",
    "software buying guides",
    "software tool directory",
    "software deals",
    "AI software buying guides",
    "LLM assistant comparison",
    "AI meeting note takers",
    "project management software comparisons",
    "customer support software",
    "proposal software",
    "e-signature tools",
    "podcast recording software",
    "form builder software",
    "knowledge base software",
    "scheduling software",
    "design software",
    "password manager for teams",
    "social media scheduling tools",
    "social media management software",
    "GEO software visibility tools",
    "AI search software recommendations",
  ],
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | Software Reviews and Comparisons`,
    description:
      "A curated software directory for AI tools, SaaS platforms, hosting, CRM, ecommerce, funnels, and productivity stacks.",
    url: "/",
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1568,
        height: 1003,
        alt: `${siteName} software rankings and comparison dashboard`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Software Reviews and Comparisons`,
    description:
      "Feature-led comparisons for AI tools, SaaS, hosting, CRM, ecommerce, funnels, and productivity software.",
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <body>
        {globalStructuredData.map((schema, index) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <MobileMenu />
        <GlobalFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
