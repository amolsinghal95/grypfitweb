"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/context/InquiryContext";

interface InquiryButtonProps {
  productId: number;
  title: string;
  sku: string;
  category: string;
}

const Icons = {
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
};

export default function InquiryButton({
  productId,
  title,
  sku,
  category,
}: InquiryButtonProps) {

  // ✅ hydration fix
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { items, addItem, removeItem, updateQuantity } = useInquiry();
  const [isAdded, setIsAdded] = useState(false);

  const existingItem = items.find((item) => item.productId === productId);
  const quantity = existingItem?.quantity || 0;
  const isInInquiry = quantity > 0;

  // ✅ local state for input (REAL FIX)
  const [localQty, setLocalQty] = useState<string | number>(quantity || "");

  useEffect(() => {
    setLocalQty(quantity || "");
  }, [quantity]);

  const handleAddToInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInInquiry) {
      addItem({
        productId,
        title,
        sku,
        category,
        quantity: 1,
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(productId);
  };

  // 🚨 block SSR mismatch
  if (!mounted) return null;

  if (isInInquiry) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div
          className="min-w-[220px] rounded-2xl border border-slate-200 bg-white/90 px-4 py-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={localQty}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLocalQty(e.target.value);
            }}
            onBlur={() => {
              const parsed = Number.parseInt(String(localQty), 10);

              if (!parsed || parsed < 1) {
                updateQuantity(productId, 1);
                setLocalQty(1);
              } else {
                updateQuantity(productId, parsed);
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full bg-transparent text-sm font-bold text-primary outline-none placeholder:text-slate-400"
            placeholder="Enter quantity (e.g., 100)"
            aria-label={`Quantity for ${title}`}
          />
        </div>
        <button
          onClick={handleRemove}
          className="text-xs font-bold text-muted hover:text-primary transition-colors underline text-left"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToInquiry}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
        isAdded
          ? "bg-green-500 text-white"
          : "bg-slate-100 text-primary hover:bg-primary hover:text-white"
      }`}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Icons.Check />
          </motion.span>
        ) : (
          <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Icons.Plus />
          </motion.span>
        )}
      </AnimatePresence>
      {isAdded ? "Added!" : "Add to Inquiry"}
    </button>
  );
}