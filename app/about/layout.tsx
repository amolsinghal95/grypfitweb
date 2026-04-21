import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About GRYP.FIT - Manufacturer and Supplier in Meerut, India",
  description:
    "Learn about GRYP.FIT by Singhal Industries, a Meerut-based manufacturer and supplier of gym and sports equipment spare parts serving OEM and bulk buyers across India.",
  path: "/about",
  keywords: [
    "about GRYP.FIT",
    "Singhal Industries Meerut",
    "gym parts manufacturer Meerut",
    "sports equipment supplier India",
    "OEM spare parts manufacturer",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
