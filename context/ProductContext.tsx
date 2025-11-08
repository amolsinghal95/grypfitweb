// context/ProductContext.tsx
"use client";

import React from "react";

export type ProductInfo = { sku?: string; name?: string };

export const ProductContext = React.createContext<ProductInfo | null>(null);

export const ProductProvider = ({ children, value }: { children: React.ReactNode; value: ProductInfo }) => {
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => React.useContext(ProductContext);
