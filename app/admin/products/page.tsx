"use client";

import React, { useState } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";

interface Product {
  id: number;
  title: string;
  sku: string;
  category: string;
  price: string;
  image: string;
  shortDescription: string;
}

export default function AdminProductsPage() {
  const [products] = useState<Product[]>(productsData as Product[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/admin"
                className="text-sm font-bold text-muted hover:text-primary transition-colors mb-2 inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-black tracking-tighter text-primary">
                Manage Products
              </h1>
            </div>
            <button className="btn-premium btn-primary flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
              Add Product
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-muted hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-muted">Product</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-muted">SKU</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-muted hidden md:table-cell">Category</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-muted">Price</th>
                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-muted hidden lg:table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            <img
                              src={product.image || "/images/placeholder.jpg"}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{product.title}</p>
                            <p className="text-sm text-muted line-clamp-1 hidden sm:block">
                              {product.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm font-bold text-primary">
                          {product.sku}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <span className="px-3 py-1 bg-slate-100 text-muted text-xs font-bold uppercase tracking-widest rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-primary">{product.price}</span>
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            </svg>
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted font-medium">No products found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Product Data Storage</h3>
                <p className="text-sm text-blue-800">
                  Products are stored in <code className="bg-blue-100 px-2 py-0.5 rounded">data/products.json</code>. 
                  To add, edit, or delete products, you can either use this admin interface or directly edit the JSON file.
                  Changes will be reflected immediately on the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}