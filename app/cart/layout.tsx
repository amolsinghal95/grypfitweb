import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Inquiry Cart | GRYP.FIT",
  description:
    "Review products in your GRYP.FIT inquiry cart before sending your bulk requirement by email or WhatsApp.",
  path: "/cart",
  keywords: [
    "inquiry cart",
    "bulk spare parts inquiry",
    "GRYP.FIT cart",
  ],
  robots: {
    index: false,
    follow: false,
  },
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
