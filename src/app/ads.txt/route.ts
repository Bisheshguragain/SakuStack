export const dynamic = "force-static";

export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : [
        "# SakuStack ads.txt",
        "# Add NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-0000000000000000 before requesting AdSense review.",
        "# Required Google format:",
        "# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
        "",
      ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
