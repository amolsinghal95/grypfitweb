// app/products/page.tsx  (server component)
import React from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Gym & Sports Equipment Spare Parts | GRYP.FIT India",
  description:
    "Explore our complete range of gym machine spare parts, sports equipment components, weight plates, and fitness accessories. Manufacturer in India since 1995.",
  alternates: {
    canonical: "https://gryp.fit/products",
  },
  openGraph: {
    title: "Gym & Sports Equipment Spare Parts | GRYP.FIT",
    description:
      "Browse premium gym & sports equipment spare parts manufactured in India. Bulk and custom orders available.",
    url: "https://gryp.fit/products",
    siteName: "GRYP.FIT",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center leading-tight">
  <span className="block text-black">
    Gym & Sports Equipment
  </span>
  <span className="block text-primary">
    Spare Parts
  </span>
</h1>

        <p className="text-xl text-muted text-center mb-8">
          Premium quality components for fitness and sports equipment
        </p>

        {/* Client-side interactive UI */}
        <ProductsClient />
      </div>
    </div>
  );
}
