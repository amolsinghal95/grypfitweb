"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useInquiry } from "@/context/InquiryContext";
import { FaTrash, FaWhatsapp, FaEnvelope, FaArrowLeft } from "react-icons/fa";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [localQty, setLocalQty] = useState<Record<number, string | number>>({});

  useEffect(() => {
  setMounted(true);
  window.scrollTo(0, 0);
}, []);

  const {
    items,
    totalCount,
    removeItem,
    updateQuantity,
    clearItems,
    generateWhatsAppMessage,
    generateEmailMessage,
  } = useInquiry();

  // ✅ sync local state with items
  useEffect(() => {
    const updated: Record<number, string | number> = {};
    items.forEach((item) => {
      updated[item.productId] = item.quantity ?? 1;
    });
    setLocalQty(updated);
  }, [items]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M5 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path d="M19 2h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-primary mb-2">Your Cart is Empty</h1>
          <p className="text-muted mb-8">Add products to start an inquiry</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold">
            <FaArrowLeft /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/918449291260?text=${generateWhatsAppMessage()}`;
  const emailUrl = `mailto:amolsinghal95@gmail.com?subject=Bulk Inquiry - ${items.length} Products&body=${generateEmailMessage()}`;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-muted mb-4">
              <FaArrowLeft /> Back to Products
            </Link>
            <h1 className="text-3xl font-black text-primary">Inquiry Cart</h1>
            <p className="text-muted mt-1">{totalCount} item{totalCount !== 1 ? "s" : ""} total</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
          {items.map((item, index) => (
            <div
              key={item.productId}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 ${
                index !== items.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-primary truncate">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted">SKU: {item.sku}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-xs font-bold text-muted rounded">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">

                <div className="w-full sm:w-[140px] rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={localQty[item.productId] ?? ""}
                    onChange={(e) => {
                      setLocalQty((prev) => ({
                        ...prev,
                        [item.productId]: e.target.value,
                      }));
                    }}
                    onBlur={() => {
                      const val = localQty[item.productId];
                      const parsed = Number.parseInt(String(val), 10);

                      if (!parsed || parsed < 1) {
                        updateQuantity(item.productId, 1);
                        setLocalQty((prev) => ({ ...prev, [item.productId]: 1 }));
                      } else {
                        updateQuantity(item.productId, parsed);
                      }
                    }}
                    className="w-full text-center bg-transparent text-sm font-semibold text-primary outline-none"
                  />
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="w-10 h-10 shrink-0 rounded-lg bg-red-50 flex items-center justify-center text-red-500"
                >
                  <FaTrash size={14} />
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <button
            onClick={clearItems}
            className="text-muted hover:text-red-500 font-bold text-sm flex items-center gap-2"
          >
            <FaTrash size={14} /> Clear All Items
          </button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href={emailUrl} className="flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-xl font-bold">
              <FaEnvelope /> Email Inquiry
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold">
              <FaWhatsapp /> WhatsApp Inquiry
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}