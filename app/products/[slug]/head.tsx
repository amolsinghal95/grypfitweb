import { buildBreadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  findProductByIdentifier,
  slugifyProductTitle,
} from "@/lib/productLookup";

export default async function Head({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductByIdentifier(slug);

  if (!product) return null;

  const productPath = `/products/${slugifyProductTitle(product.title)}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.title, path: productPath },
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    sku: product.sku,
    category: product.category,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: "GRYP.FIT",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Singhal Industries",
    },
    mainEntityOfPage: absoluteUrl(productPath),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
