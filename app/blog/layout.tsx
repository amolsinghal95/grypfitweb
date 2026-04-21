import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gym Equipment Manufacturing Blog | GRYP.FIT Insights",
  description:
    "Read GRYP.FIT articles on gym equipment maintenance, spare parts selection, OEM manufacturing, and sports equipment industry insights from Meerut, India.",
  path: "/blog",
  keywords: [
    "gym equipment blog India",
    "spare parts maintenance articles",
    "OEM manufacturing insights",
    "sports equipment industry Meerut",
    "fitness equipment buying guide",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
