import Script from "next/script";

export const dynamic = "force-dynamic";

import products from "@/data/products.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  findProductByIdentifier,
  slugifyProductTitle,
} from "@/lib/productLookup";

interface Product {
  id: number;
  title: string;
  sku: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  image: string;
  usage?: string;
  application?: string;
}

/* ================= SEO METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = findProductByIdentifier(slug) as Product | undefined;

  if (!product) {
    return {
      title: "Product Not Found | GRYP.FIT",
      robots: "noindex",
    };
  }

  const canonicalPath = `/products/${slugifyProductTitle(product.title)}`;

  return {
    ...buildMetadata({
      title: `${product.title} | GRYP.FIT`,
      description: product.shortDescription,
      path: canonicalPath,
      keywords: [
        product.title,
        product.sku,
        product.category,
        "gym equipment spare parts",
        "sports equipment components",
      ],
      image: product.image,
    }),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}

/* ================= PAGE ================= */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = findProductByIdentifier(slug) as Product | undefined;

  if (!product) {
    notFound();
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://www.gryp.fit${product.image}`;
  const additionalProperty = [];

  if (product.usage) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Usage",
      value: product.usage,
    });
  }

  if (product.application) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Application",
      value: product.application,
    });
  }

  return (
    <main className="max-w-4xl mx-auto py-16">
      {/* ================= PRODUCT SCHEMA ================= */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.shortDescription,
            sku: product.sku,
            category: product.category,
            image: imageUrl,
            brand: {
              "@type": "Brand",
              name: "GRYP.FIT",
            },
            manufacturer: {
              "@type": "Organization",
              name: "Singhal Industries",
            },
            additionalProperty,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: `https://www.gryp.fit/product/${product.sku.toLowerCase()}`,
            },
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.shortDescription}</p>

      <p className="mb-2">
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>SKU:</strong> {product.sku}
      </p>
    </main>
  );
}
