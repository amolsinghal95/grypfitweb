import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*", "/cart"],
      },
    ],
    sitemap: "https://www.gryp.fit/sitemap.xml",
    host: "https://www.gryp.fit",
  };
}
