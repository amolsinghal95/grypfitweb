import ProductsPage from "@/components/ProductsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gym and Sports Equipment Spare Parts Catalog | GRYP.FIT",
  description:
    "Browse GRYP.FIT's catalog of gym equipment spare parts, sports equipment components, and calibrated plates for OEM, wholesale, and bulk inquiries across India.",
  path: "/products",
  keywords: [
    "gym spare parts catalog",
    "sports equipment components",
    "commercial gym equipment parts",
    "calibrated weight plates India",
    "OEM fitness equipment parts",
  ],
});

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;

  return (
    <ProductsPage
      initialCategory={params.category}
      initialSearch={params.search}
    />
  );
}
