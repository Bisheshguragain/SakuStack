# SakuStack

SakuStack is a Next.js affiliate discovery site for software buyers, with category pages, reviews, comparisons, buying guides, SEO metadata, structured data, robots.txt, sitemap.xml, llms.txt, and compliance pages.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` or pass another port:

```bash
npm run dev -- -p 3005
```

## Production Build

```bash
npm run build
```

## Netlify Deployment

This repository includes `netlify.toml` for Netlify.

Use these settings when connecting the GitHub repo:

- Repository: `Bisheshguragain/SakuStack`
- Branch: `main`
- Build command: `npm run build`
- Publish directory: `.next`
- Framework preset: Next.js

Netlify should use the Next.js runtime through `@netlify/plugin-nextjs`.

## Environment Variables

Optional:

```bash
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-0000000000000000
```

Set this in Netlify once the real Google AdSense publisher ID is available. Do not commit real secrets or private API keys.

## Important URLs

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/ads.txt`
- `/affiliate-disclosure`
- `/privacy-policy`
- `/terms`
- `/methodology`
- `/monetization-policy`
