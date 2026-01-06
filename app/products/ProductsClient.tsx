// app/products/ProductsClient.tsx
"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HiSearch } from "react-icons/hi";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

// Client-only modal — dynamic import with ssr: false
const ProductModal = dynamic(() => import("@/components/ProductModal"), { ssr: false });

// --- Types ---
interface Product {
  id: number;
  title: string;
  sku: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  image: string;
}

// --- Small custom SortDropdown (self-contained) ---
type SortOption = { key: string; label: string };

function SortDropdown({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: SortOption[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.key === value) || options[0];

  // close when clicking outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!btnRef.current || !listRef.current) return;
      if (btnRef.current.contains(e.target as Node)) return;
      if (listRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // keyboard navigation while open
  useEffect(() => {
    if (!open) return;
    let idx = options.findIndex((o) => o.key === value);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        idx = (idx + 1) % options.length;
        onChange(options[idx].key);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        idx = (idx - 1 + options.length) % options.length;
        onChange(options[idx].key);
      } else if (e.key === "Enter") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, options, value, onChange]);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between gap-2 rounded-lg border border-muted bg-secondary py-3 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
      >
        <span className="truncate">{selected.label}</span>
        <svg className={`ml-2 h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-activedescendant={value}
          className="absolute right-0 left-0 mt-2 z-40 rounded-lg bg-secondary border border-muted shadow-lg overflow-hidden"
        >
          {options.map((opt) => {
            const active = opt.key === value;
            return (
              <button
                key={opt.key}
                id={opt.key}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={`w-full text-left px-3 py-3 text-sm flex items-center justify-between gap-2 hover:bg-primary/5 transition ${active ? "bg-primary/5" : ""}`}
              >
                <span className="truncate">{opt.label}</span>
                {active ? (
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12l4 4L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Main component ---
export default function ProductsClient() {
  const products = (productsData as unknown) as Product[];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSort, setSelectedSort] = useState("relevance");

  // NEW: mounted flag to avoid SSR -> client input hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Gym", "Sports", "Plates & Weights"];
  const sortOptions: SortOption[] = [
    { key: "relevance", label: "Relevance" },
    { key: "price_asc", label: "Price: Low → High" },
    { key: "price_desc", label: "Price: High → Low" },
    { key: "name_asc", label: "Name A → Z" },
    { key: "name_desc", label: "Name Z → A" },
  ];

  // Read query params (category / sku) only on client
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam && categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }
      const skuParam = params.get("sku");
      if (skuParam) {
        const found = products.find((p) => p.sku.toLowerCase() === skuParam.toLowerCase());
        if (found) setSelectedProduct(found);
      }
    } catch {
      // ignore in SSR mismatch cases
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helpers: tokenized fuzzy-ish search
  const matchesSearch = (product: Product, q: string) => {
    if (!q) return true;
    const hay = `${product.title} ${product.shortDescription} ${product.sku}`.toLowerCase();
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return tokens.every((t) => hay.includes(t));
  };

  const parsePrice = (price?: string) => {
    if (!price) return 0;
    const num = price.replace(/[^\d.]/g, "");
    return Number(num) || 0;
  };

  // Compute filtered + sorted list
  const filteredProducts = useMemo(() => {
    let result = products.slice();

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter((p) => matchesSearch(p, searchTerm));
    }

    switch (selectedSort) {
      case "price_asc":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price_desc":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "name_asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name_desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "relevance":
      default:
        if (searchTerm) {
          const q = searchTerm.trim().toLowerCase();
          result.sort((a, b) => {
            const aHas = a.title.toLowerCase().includes(q) ? 0 : 1;
            const bHas = b.title.toLowerCase().includes(q) ? 0 : 1;
            return aHas - bHas;
          });
        }
        break;
    }

    return result;
  }, [products, selectedCategory, searchTerm, selectedSort]);

  // open product (also update URL sku param)
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("sku", product.sku);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("sku");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Ensure search input is focused/usable on mobile (no layout jumps)
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-6">
          {/* TOP ROW: Search + Sort on same horizontal line */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Left: Search (flex-grow) */}
            <div className="flex-1">
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted text-xl" />
                <input
  ref={searchRef}
  type="text"
  placeholder="Search products by name, SKU, or description..."
  value={mounted ? searchTerm : ""}  // Always controlled
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-14 pr-4 py-3 bg-secondary border border-muted rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors md:text-sm text-base"
  aria-label="Search products"
/>

              </div>
            </div>

            {/* Right: Sort (fixed smaller width) */}
            <div className="flex-shrink-0 w-full sm:w-[180px] md:w-[220px]">
              <SortDropdown value={selectedSort} onChange={(v) => setSelectedSort(v)} options={sortOptions} />
            </div>
          </div>

          {/* Categories row BELOW */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const selected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm border transition-all duration-200
                      ${selected ? "bg-primary text-white border-primary shadow-sm" : "bg-secondary text-foreground border-muted hover:bg-primary/10 hover:border-primary"}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="text-muted text-xl">No products found matching your criteria.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.06 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: index * 0.02 }}>
              {/* Pass onClick to ProductCard — whole card acts as button (requires ProductCard supports onClick) */}
              <ProductCard {...product} onClick={() => openProduct(product)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PRODUCT MODAL (client-only dynamic import) */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeProduct} />}
    </>
  );
}
