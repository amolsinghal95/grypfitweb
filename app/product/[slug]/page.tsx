import Script from "next/script";

export const dynamic = "force-dynamic";

import products from "@/data/products.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Product {
  id: number;
  title: string;
  sku: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  image: string;
}

/* ================= SEO METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = (products as Product[]).find(
    (p) => p.sku.toLowerCase() === slug.toLowerCase()
  );

  if (!product) {
    return {
      title: "Product Not Found | GRYP.FIT",
      robots: "noindex",
    };
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://www.gryp.fit${product.image}`;

  return {
    title: `${product.title} | GRYP.FIT`,
    description: product.shortDescription,
    robots: "index, follow",

    openGraph: {
      title: `${product.title} | GRYP.FIT`,
      description: product.shortDescription,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          alt: product.title,
        },
      ],
    },

    alternates: {
      canonical: `https://www.gryp.fit/product/${product.sku.toLowerCase()}`,
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

  const product = (products as Product[]).find(
    (p) => p.sku.toLowerCase() === slug.toLowerCase()
  );

  if (!product) {
    notFound();
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://www.gryp.fit${product.image}`;

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
