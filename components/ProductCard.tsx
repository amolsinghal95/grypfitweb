"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductModal from "./ProductModal";

const Link = ({ href, children, className, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

interface ProductCardProps {
  id: number;
  title: string;
  sku: string;
  category: string;
  image: string;
  shortDescription: string;
  href?: string;
  onClick?: () => void;
  price?: string;
  longDescription?: string;
  material?: string;

  weight?: { value: number; unit: string };
  dimensions?: {
    length: number;
    width?: number;
    height?: number;
    unit: string;
  };
  colors?: {
    name: string;
    hex: string;
  }[];
}

const Icons = {
  ArrowRight: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" />
    </svg>
  ),
};

export default function ProductCard({
  id,
  title,
  sku,
  category,
  image,
  shortDescription,
  href,
  onClick,
  price = "Request Quote",
  longDescription,
  material,
  weight,
  dimensions,
  colors, // ✅ ADD
}: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const modalProductData = {
    id,
    title,
    sku,
    category,
    image,
    shortDescription,
    price,
    longDescription: longDescription || shortDescription,
    material,
    weight,
    dimensions,
    colors,
  };

  const handleCardClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onClick) onClick();
    setShowModal(true);
  };

  // Helper to construct the spec string from weight & dimensions props
  const getSpecsText = () => {
    const parts = [];
    if (weight) parts.push(`${weight.value} ${weight.unit}`);
    if (dimensions) {
      const { length, width, height, unit } = dimensions;
      if (width && height) {
        parts.push(`${length}x${width}x${height} ${unit}`);
      } else {
        parts.push(`${length} ${unit}`);
      }
    }
    return parts.length > 0 ? parts.join(" • ") : "-";
  };

  const CardContent = (
    <div
      onClick={handleCardClick}
      className="premium-card group h-full flex flex-col overflow-hidden bg-white ring-1 ring-slate-200/50 hover:ring-accent/50 cursor-pointer"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
        <img
          src={image || "/images/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute top-6 left-6 z-10">
          <div className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl ring-1 ring-white/20 flex items-center gap-2">
            <span className="opacity-60">REF</span>
            <span>{sku}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="p-10 flex flex-col flex-1 relative">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-accent/40" />
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">
              {category}
            </span>
          </div>
          <h3 className="text-3xl font-black tracking-tighter text-primary leading-[1.1] group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>
        </div>
        <p className="text-muted text-base font-medium leading-relaxed mb-10 flex-grow opacity-80 line-clamp-2">
          {shortDescription}
        </p>
        <div className="pt-8 border-t border-slate-100 flex items-center justify-between group/btn">
          <div className="flex flex-col">
            {/* CHANGED: Replaced "Processing" with price */}
            <span className="text-[18px] font-black text-muted uppercase tracking-[0.2em] text-left">
              {price}
            </span>
            {/* CHANGED: Replaced "48H Dispatch" with weight & dimensions */}
            <span className="text-sm font-black text-primary text-left">
              {getSpecsText()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-500">
              Quick View
            </span>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:rotate-[-45deg] transition-all duration-700 shadow-sm border border-slate-200 group-hover:border-primary">
              <Icons.ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {href ? (
        <Link
          href={href}
          className="block h-full perspective-1000"
          onClick={handleCardClick}
        >
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="h-full"
          >
            {CardContent}
          </motion.div>
        </Link>
      ) : (
        CardContent
      )}

      {showModal && (
        <ProductModal
          product={modalProductData}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}