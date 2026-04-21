import { buildBreadcrumbSchema } from "@/lib/seo";

export default function Head() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GRYP.FIT Blog",
    url: "https://www.gryp.fit/blog",
    about: "Gym equipment maintenance, spare parts selection, and sports equipment manufacturing insights.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </>
  );
}
