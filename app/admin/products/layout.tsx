import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin Products | GRYP.FIT",
  description:
    "Internal product management interface for the GRYP.FIT catalog.",
  path: "/admin/products",
  keywords: ["admin products", "internal catalog management"],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
});

export default function AdminProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
