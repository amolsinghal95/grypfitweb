"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductModal from "@/components/ProductModal";


/**
 * FIX: Using the relative path as provided in your snippet.
 */
import productsData from "../../data/products.json";

// --- Types ---
interface Product {
  id: number;
  title: string;
  sku: string;
  category: string;
  image: string;
  shortDescription: string;
  longDescription?: string;
  price?: string;
  material?: string;
  packaging?: string;
  weight?: { value: number; unit: string };
  dimensions?: { length: number; width?: number; height?: number; unit: string };
}

// --- Inline Premium Icons ---
const Icons = {
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Box: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  WhatsApp: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};

// --- WhatsApp Floating Button Component ---
function WhatsAppButton() {
  const businessPhone = "918449291260";
  const defaultMsg = encodeURIComponent("Hello GRYP.FIT! I'm interested in bulk manufacturing and wholesale catalog for industrial fitness spare parts.");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-10 right-10 z-[80] group"
    >
      <a
        href={`https://wa.me/${businessPhone}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,211,102,0.5)] transition-all duration-500 hover:-translate-y-2 active:scale-90"
      >
        <Icons.WhatsApp size={32} />
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
          <div className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap border border-white/10">
            Bulk Support
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// --- Product Card Component ---
function ProductCard({ product, onQuickView }: { product: Product; onQuickView: () => void }) {
  return (
    <div 
      onClick={onQuickView}
      className="premium-card group h-full flex flex-col overflow-hidden bg-white ring-1 ring-slate-200/50 hover:ring-accent/50 cursor-pointer"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-50">
        <img
          src={product.image || "/images/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute top-6 left-6 z-10">
          <div className="px-4 py-2 bg-primary/95 backdrop-blur-md text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl ring-1 ring-white/20">
            REF: {product.sku}
          </div>
        </div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-10 flex flex-col flex-1 text-left">
        <div className="mb-6">
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 block">
            {product.category}
          </span>
          <h3 className="text-3xl font-black tracking-tighter text-primary leading-[1.1] group-hover:text-accent transition-colors duration-500">
            {product.title}
          </h3>
        </div>
        
        <p className="text-muted text-base font-medium leading-relaxed mb-10 flex-grow opacity-80 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="pt-8 border-t border-slate-100 flex items-center justify-between group/btn">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Processing</span>
            <span className="text-sm font-black text-primary">48h Dispatch</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:rotate-[-45deg] transition-all duration-500 shadow-sm">
            <Icons.ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Product Modal Component ---


// --- Main Products Client ---
export default function ProductsClient() {
  const products = (productsData as unknown) as Product[];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const categories = ["All", "Gym", "Sports", "Plates & Weights"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  if (!mounted) return null;

  return (
    // FIX APPLIED HERE: Added 'pt-32 md:pt-40' to push content down below the header.
    // Also added 'container mx-auto px-6' to ensure it doesn't touch edges.
    <div className="relative pt-32 md:pt-40 container mx-auto px-6">
      
      {/* Filtering Toolbar */}
      <div className="mb-20 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
        <div className="relative flex-1 max-w-2xl group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors duration-500">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Search by part name or SKU identifier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-3xl text-primary text-lg font-bold focus:outline-none focus:border-primary focus:ring-[12px] focus:ring-slate-100 transition-all shadow-sm text-left"
          />
        </div>

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
              <ProductCard 
                product={product} 
                onQuickView={() => setSelectedProduct(product)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200"
        >
          <div className="mb-6 flex justify-center text-slate-300">
             <Icons.Box />
          </div>
          <h3 className="text-3xl font-black text-primary mb-3">No matching components</h3>
          <p className="text-muted text-lg font-medium">Try refining your search terms or exploring different categories.</p>
        </motion.div>
      )}

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Premium Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}