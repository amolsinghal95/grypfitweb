import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact GRYP.FIT - Meerut, India Manufacturer and Supplier",
  description:
    "Contact GRYP.FIT by Singhal Industries in Meerut, India for custom gym equipment parts, sports components, OEM manufacturing, and bulk supply inquiries.",
  path: "/contact",
  keywords: [
    "contact GRYP.FIT",
    "Meerut spare parts manufacturer",
    "bulk gym parts inquiry",
    "OEM sports equipment supplier India",
    "fitness equipment parts contact",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
