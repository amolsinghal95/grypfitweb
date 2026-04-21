import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import { buildMetadata } from "@/lib/seo";
import productsData from "@/data/products.json";
import {
  findProductByIdentifier,
  ProductLookupItem as Product,
  slugifyProductTitle,
} from "@/lib/productLookup";

function generateProductUrl(product: Product): string {
  return `/products/${slugifyProductTitle(product.title)}`;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: slugifyProductTitle(product.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductByIdentifier(slug);

  if (!product) {
    return {
      title: "Product Not Found | GRYP.FIT",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = generateProductUrl(product);
  const imageUrl = product.image.startsWith("/")
    ? `https://www.gryp.fit${product.image}`
    : product.image;

  return buildMetadata({
    title: `${product.title} | ${product.sku} | GRYP.FIT`,
    description: product.shortDescription,
    path: productUrl,
    keywords: [
      product.title,
      product.sku,
      product.category,
      "gym equipment spare parts",
      "sports equipment components",
      "GRYP.FIT",
      "Singhal Industries",
      ...(product.material ? [product.material] : []),
    ],
    image: imageUrl,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductByIdentifier(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = productsData
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4) as Product[];

  return (
    <ProductDetailPage
      product={product as Product}
      relatedProducts={relatedProducts}
    />
  );
}
