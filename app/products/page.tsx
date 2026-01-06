// app/products/page.tsx  (server component)
import React from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Products — GrypFit",
  description: "Browse our range of gym parts & equipment components",
};

export default function ProductsPage() {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Our <span className="text-primary">Products</span>
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
