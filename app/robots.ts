import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /resume renders a PDF carrying a phone number and email — shareable by
      // link, but kept out of crawlers so the contact details aren't scraped.
      disallow: ["/admin/", "/api/", "/resume"],
    },
    sitemap: "https://www.sanjeevnode.in/sitemap.xml",
  };
}
