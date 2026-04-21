import productsData from "@/data/products.json";

export interface ProductLookupItem {
  id: number;
  title: string;
  sku: string;
  category: string;
  image: string;
  shortDescription: string;
  price?: string;
  longDescription?: string;
  material?: string;
  usage?: string;
  application?: string;
  weight?: { value: number; unit: string };
  dimensions?: {
    length: number;
    width?: number;
    height?: number;
    unit: string;
  };
  colors?: { name: string; hex: string }[];
}

export function slugifyProductTitle(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function findProductByIdentifier(identifier: string) {
  const normalizedIdentifier = identifier.toLowerCase();

  return (productsData as ProductLookupItem[]).find((product) => {
    const normalizedSku = product.sku.toLowerCase();
    const normalizedSlug = slugifyProductTitle(product.title);

    return (
      normalizedSku === normalizedIdentifier ||
      normalizedSlug === normalizedIdentifier
    );
  });
}
