import { getBlogPostBySlug } from "@/lib/blog";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default async function Head({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.image ?? "/images/aboutusimage.png"),
    author: {
      "@type": "Organization",
      name: "GRYP.FIT by Singhal Industries",
    },
    publisher: {
      "@type": "Organization",
      name: "GRYP.FIT by Singhal Industries",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/aboutusimage.png"),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
