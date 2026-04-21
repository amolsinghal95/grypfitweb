"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import InquiryButton from "./InquiryButton";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaLink, FaDownload, FaShareSquare, FaShoppingCart } from "react-icons/fa";
import { downloadProductPdf } from "@/lib/downloadProductPdf";

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
  usage?: string;
  application?: string;
  weight?: { value: number; unit: string };
  dimensions?: { length: number; width?: number; height?: number; unit: string };
  colors?: { name: string; hex: string }[];
}

const Icons = {
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Weight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Ruler: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
      <path d="m14.5 12.5 2-2"/>
      <path d="m11.5 9.5 2-2"/>
      <path d="m8.5 6.5 2-2"/>
      <path d="m17.5 15.5 2-2"/>
    </svg>
  ),
  Package: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
};

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setLoadingPdf(true);
    try {
      await downloadProductPdf(product);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
    setLoadingPdf(false);
  };

  const whatsappMessage = `Hello! I'm interested in ${product.title} (SKU: ${product.sku}). Please provide more details and pricing for bulk orders.`;
  const mailtoSubject = encodeURIComponent(`Inquiry: ${product.title} (${product.sku})`);
  const mailtoBody = encodeURIComponent(
    `Hello,\n\nI'm interested in the following product:\n\nProduct: ${product.title}\nSKU: ${product.sku}\nCategory: ${product.category}\n\nPlease provide pricing and availability for bulk orders.\n\nThank you!`
  );

  const getSpecsText = () => {
    const parts = [];
    if (product.weight) parts.push(`${product.weight.value} ${product.weight.unit}`);
    if (product.dimensions) {
      const { length, width, height, unit } = product.dimensions;
      if (width && height) {
        parts.push(`${length}x${width}x${height} ${unit}`);
      } else {
        parts.push(`${length} ${unit}`);
      }
    }
    return parts;
  };

  const specs = getSpecsText();

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors"
        >
          <Icons.ArrowLeft />
          Back to Products
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-xl">
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={`${product.title} product image`}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute top-4 left-4 z-10">
                <div className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-lg">
                  {product.sku}
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-md text-primary rounded-lg text-xs font-black uppercase tracking-wider shadow-lg">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Color Options - Static display only */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Available Colors
                </span>
                <div className="flex flex-wrap gap-3 mt-3">
                  {product.colors.map((color) => (
                    <div
                      key={color.name}
                      className="flex flex-col items-center gap-1"
                    >
                      <span
                        className="w-8 h-8 rounded-full border-2 border-slate-200"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="text-[10px] font-bold text-muted text-center">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-primary mb-4">
              {product.title}
            </h1>

            <p className="text-base text-muted font-medium leading-relaxed mb-6">
              {product.longDescription || product.shortDescription}
            </p>

            {/* Specifications - 2x2 Grid with equal-sized cells */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {specs.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl h-full">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Icons.Weight />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted block">
                      Weight
                    </span>
                    <p className="text-sm font-bold text-primary truncate">{specs[0]}</p>
                  </div>
                </div>
              )}
              {specs.length > 1 && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl h-full">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Icons.Ruler />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted block">
                      Dimensions
                    </span>
                    <p className="text-sm font-bold text-primary truncate">{specs[1]}</p>
                  </div>
                </div>
              )}
              {product.material && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl h-full">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Icons.Package />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted block">
                      Material
                    </span>
                    <p className="text-sm font-bold text-primary truncate">{product.material}</p>
                  </div>
                </div>
              )}
              {/* 4th slot - Share & Download buttons (same height as other cells) */}
              <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl h-full justify-center">
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-1.5 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors group flex-1"
                >
                  <FaShareSquare className="text-primary group-hover:text-white text-xs" />
                  <span className="text-[10px] font-bold text-primary group-hover:text-white">Share</span>
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={loadingPdf}
                  className="flex items-center justify-center gap-1.5 py-1.5 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors group flex-1 disabled:opacity-50"
                >
                  <FaDownload className="text-primary group-hover:text-white text-xs" />
                  <span className="text-[10px] font-bold text-primary group-hover:text-white">
                    {loadingPdf ? '...' : 'PDF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            {(product.usage || product.application) && (
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                {product.usage && (
                  <div className="mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted">
                      Usage
                    </span>
                    <p className="text-sm font-medium text-primary mt-0.5">
                      {product.usage}
                    </p>
                  </div>
                )}
                {product.application && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted">
                      Application
                    </span>
                    <p className="text-sm font-medium text-primary mt-0.5">
                      {product.application}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-black text-primary">
                {product.price || "Request Quote"}
              </span>
            </div>

            {/* Add to Inquiry */}
            <div className="mb-6">
              <InquiryButton
                productId={product.id}
                title={product.title}
                sku={product.sku}
                category={product.category}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={`https://wa.me/918449291260?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-primary flex items-center justify-center gap-2 flex-1 text-sm"
              >
                <Icons.WhatsApp />
                WhatsApp
              </a>
              <a
                href={`mailto:amolsinghal95@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="btn-premium btn-outline flex items-center justify-center gap-2 flex-1 text-sm"
              >
                <Icons.Mail />
                Email
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
              <div className="flex items-center gap-1.5">
                <Icons.Check />
                <span>Best Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icons.Check />
                <span>Bulk Orders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icons.Check />
                <span>Pan India Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Share Overlay */}
      {shareOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShareOpen(false)} />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-primary">Share Product</h3>
              <button onClick={() => setShareOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="space-y-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.title} (${product.sku}): ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 border border-transparent hover:border-green-100 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaWhatsapp className="text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-primary text-sm">WhatsApp</div>
                  <div className="text-xs text-muted">Share product details</div>
                </div>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(`${product.title} - Enquiry`)}&body=${encodeURIComponent(`Check out ${product.title} (${product.sku}): ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaEnvelope className="text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-primary text-sm">Email</div>
                  <div className="text-xs text-muted">Send via email</div>
                </div>
              </a>
              <button
                onClick={async () => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  try {
                    await navigator.clipboard.writeText(url);
                    alert('Link copied!');
                    setShareOpen(false);
                  } catch {
                    prompt('Copy this link:', url);
                    setShareOpen(false);
                  }
                }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group w-full text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FaLink className="text-slate-600" />
                </div>
                <div>
                  <div className="font-bold text-primary text-sm">Copy Link</div>
                  <div className="text-xs text-muted">Copy to clipboard</div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
