"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

// --- Inline Icons ---
const Icons = {
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Sort: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M6 12h12" />
      <path d="M10 18h4" />
    </svg>
  ),
  Box: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  )
};

// --- Updated Interface ---
interface Product {
  id: number;
  title: string;
  sku: string;
  category: string;
  image: string;
  shortDescription: string;
  price?: string;
  longDescription?: string;
  material?: string;
  packaging?: string;
  weight?: { value: number; unit: string };
  dimensions?: { length: number; width?: number; height?: number; unit: string };
  colors?: {
  name: string;
  hex: string;
}[];

}

/* 🔧 FIX: safely convert price string to number */
const parsePrice = (price?: string) => {
  if (!price) return 0;
  return Number(price.replace(/[^\d.]/g, "")) || 0;
};

export default function ProductsClient() {
  const products = productsData as Product[];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOpen, setSortOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const categories = ["All", "Gym", "Sports", "Plates & Weights"];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });

    // ✅ PRICE SORT (FIXED)
    if (sortBy === "price_low")
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

    if (sortBy === "price_high")
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    if (sortBy === "name_asc")
      result.sort((a, b) => a.title.localeCompare(b.title));

    if (sortBy === "name_desc")
      result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  if (!mounted) return null;

  return (
    <div className="pt-32">

      {/* Filtering Toolbar */}
      <div className="mb-20 flex flex-col xl:flex-row xl:items-center justify-between gap-10">

        {/* Search + Sort */}
        <div className="flex gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors duration-500">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search by part name or SKU identifier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-3xl text-primary text-lg font-bold focus:outline-none focus:border-primary focus:ring-[12px] focus:ring-slate-100 transition-all shadow-sm"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="px-6 py-6 bg-white border border-slate-200 rounded-3xl text-muted hover:text-primary hover:border-primary transition-all shadow-sm"
            >
              <Icons.Sort />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-4 w-60 bg-white rounded-3xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
                {[
                  ["relevance", "Relevance"],
                  ["price_low", "Price: Low → High"],
                  ["price_high", "Price: High → Low"],
                  ["name_asc", "Name: A → Z"],
                  ["name_desc", "Name: Z → A"],
                ].map(([key, label]) => (
                  <button
  key={key}
  onClick={() => {
    setSortBy(key);
    setSortOpen(false);
  }}
  className={`w-full px-6 py-4 text-left text-sm font-bold transition flex items-center justify-between
    ${
      sortBy === key
        ? "bg-primary/5 text-primary"
        : "text-muted hover:bg-slate-50"
    }`}
>
  <span>{label}</span>

  {sortBy === key && (
    <span className="w-2 h-2 rounded-full bg-primary" />
  )}
</button>

                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border-2 ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20 scale-105"
                  : "bg-white text-muted border-slate-100 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <div className="mb-6 flex justify-center text-slate-300">
            <Icons.Box />
          </div>
          <h3 className="text-3xl font-black text-primary mb-3">No matching components</h3>
          <p className="text-muted text-lg font-medium">Try refining your search terms or exploring different categories.</p>
        </motion.div>
      )}
    </div>
  );
}
