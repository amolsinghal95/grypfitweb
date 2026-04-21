import HomePage from "@/components/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gym Equipment Spare Parts Manufacturer in India | GRYP.FIT",
  description:
    "GRYP.FIT is an Indian manufacturer of gym equipment parts, supplying durable spare parts for fitness machines with OEM support and bulk supply for distributors, brands, and commercial buyers across India.",
  path: "/",
  keywords: [
    "gym equipment spare parts manufacturer in India",
    "gym equipment parts manufacturer",
    "OEM gym equipment parts",
    "bulk supply gym spare parts",
    "fitness machine spare parts India",
    "commercial gym parts supplier",
    "GRYP.FIT",
    "Singhal Industries",
  ],
  image: "/images/aboutusimage.png",
});

export default function Page() {
  return <HomePage />;
}
