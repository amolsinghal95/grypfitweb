// components/ProductModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import {
  FaWhatsapp,
  FaEnvelope,
  FaSms,
  FaLink,
  FaShareSquare,
  FaDownload,
} from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import WhatsAppButton from "@/components/WhatsAppButton";

// --- Types ---
interface Weight {
  value: number;
  unit: string;
}
interface Dimensions {
  length: number;
  width?: number;
  height?: number;
  unit: string;
}

interface Product {
  id: number;
  title: string;
  sku: string;
  price?: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  image?: string;
  weight?: Weight;
  dimensions?: Dimensions;
  material?: string;
  colors?: {
    name: string;
    hex: string;
  }[];
}

interface Props {
  product: Product | null;
  onClose: () => void;
}

const encode = (s?: string) => encodeURIComponent(s || "");
const BUSINESS_PHONE = "918449291260"; // international format without +

export default function ProductModal({ product, onClose }: Props) {
  console.log("MODAL PRODUCT:", product);
  console.log("MODAL PRODUCT COLORS:", product?.colors);

  // --- 1. HOOKS MOVED TO TOP (Fixes React Crash) ---
  const [shareOpen, setShareOpen] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  // Image states
  const [imgError, setImgError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imgMeta, setImgMeta] = useState<{ w?: number; h?: number } | null>(
    null
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShareOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent("whatsapp:hide"));
    }
    return () => {
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent("whatsapp:show"));
      }
    };
  }, []);

  // --- 2. EARLY RETURN AFTER HOOKS ---
  if (!product) return null;

  // --- 3. DATA LOGIC (Preserved Exactly) ---
  const title = product.title;
  const sku = product.sku;
  const shareText = `${title} (SKU: ${sku}) — ${product.price}`;
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products?sku=${encodeURIComponent(sku)}`
      : `/products?sku=${encodeURIComponent(sku)}`;

  // (Unused variable dimLabel preserved to maintain original logic structure if needed later)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dimLabel = product.dimensions
    ? product.dimensions.width && product.dimensions.height
      ? `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}`
      : `${product.dimensions.length} ${product.dimensions.unit}`
    : null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const kgToLbs = (kg: number) => (kg * 2.2046226218).toFixed(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mmToIn = (mm: number) => (mm / 25.4).toFixed(2);

  const formatSpecsText = () => {
    const lines: string[] = [];
    lines.push(`${title} (SKU: ${sku})`);
    if (product.weight)
      lines.push(`Weight: ${product.weight.value} ${product.weight.unit}`);
    if (product.dimensions) {
      if (product.dimensions.width && product.dimensions.height) {
        lines.push(
          `Dimensions: ${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}`
        );
      } else {
        lines.push(
          `Size: ${product.dimensions.length} ${product.dimensions.unit}`
        );
      }
    }
    if (product.material) lines.push(`Material: ${product.material}`);
    lines.push(`Price: ${product.price}`);
    lines.push(`Link: ${productUrl}`);
    const emailEnv =
      process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "business@gryp.fit";
    lines.push(`Phone: +${BUSINESS_PHONE}`);
    lines.push(`Email: ${emailEnv}`);
    return lines.join("\n");
  };

  const copySpecs = async () => {
    const text = formatSpecsText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        alert("Product specs copied to clipboard.");
      } else {
        window.prompt("Copy product specs:", text);
      }
    } catch {
      window.prompt("Copy product specs:", text);
    }
  };

  const shareWhatsAppWithDetails = () => {
    const msg = `${productUrl}\n\n${shareText}`;
    const encoded = encode(msg);
    window.open(
      `https://api.whatsapp.com/send?text=${encoded}`,
      "_blank",
      "noopener"
    );
    setShareOpen(false);
  };

  const openEmail = () => {
    const subject = encode(`${title} — Enquiry`);
    const body = encode(
      `${shareText}\n\n${productUrl}\n\nPlease share price, availability & lead time.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareOpen(false);
  };

  const openSMS = () => {
    const body = encode(`${shareText} — ${productUrl}`);
    const smsUrl = `sms:+${BUSINESS_PHONE}?body=${body}`;
    window.open(smsUrl, "_self");
    setShareOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(productUrl);
        alert("Product URL copied to clipboard.");
      } else {
        window.prompt(
          "Copy the product URL below (long-press or Ctrl+C):",
          productUrl
        );
      }
    } catch {
      window.prompt(
        "Copy the product URL below (long-press or Ctrl+C):",
        productUrl
      );
    } finally {
      setShareOpen(false);
    }
  };

  const emailEnv = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "business@gryp.fit";
  const mailtoForQuote = `mailto:${emailEnv}?subject=${encode(
    `${title} - Enquiry`
  )}&body=${encode(
    `Hello,\n\nI would like to enquire about ${title} (SKU: ${sku}).\n\nPlease share price, MOQ and lead time.\n\nThanks,\n`
  )}`;

  async function fetchImageAsDataUrl(url?: string): Promise<string | null> {
    if (!url) return null;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  async function downloadSpecs() {
    const p = product;
    if (!p) return;
    setLoadingPdf(true);

    try {
      const [{ default: pdfMake }, pdfFontsModule] = await Promise.all([
        import("pdfmake/build/pdfmake"),
        import("pdfmake/build/vfs_fonts").catch(() => undefined),
      ]);

      const attachVfsFromModule = (mod: any) => {
        if (!mod) return false;
        if (mod.pdfMake?.vfs) {
          (pdfMake as any).vfs = mod.pdfMake.vfs;
          return true;
        }
        if (mod.vfs) {
          (pdfMake as any).vfs = mod.vfs;
          return true;
        }
        if (mod.default?.vfs) {
          (pdfMake as any).vfs = mod.default.vfs;
          return true;
        }
        if (mod.default?.pdfMake?.vfs) {
          (pdfMake as any).vfs = mod.default.pdfMake.vfs;
          return true;
        }
        return false;
      };

      let vfsAttached = attachVfsFromModule(pdfFontsModule);
      if (!vfsAttached) {
        try {
          const CDN = "https://unpkg.com/pdfmake@0.2.7/build/vfs_fonts.js";
          const resp = await fetch(CDN);
          if (resp.ok) {
            const js = await resp.text();
            // eslint-disable-next-line no-new-func
            new Function("pdfMake", js)(pdfMake);
            if (
              (pdfMake as any).vfs &&
              Object.keys((pdfMake as any).vfs).length > 0
            ) {
              vfsAttached = true;
            }
          }
        } catch (e) {
          console.warn("Failed to load vfs_fonts from CDN:", e);
        }
      }

      const imageData = await fetchImageAsDataUrl(p.image).catch(() => null);

      const content: any[] = [];

      content.push({
        columns: [
          { text: p.title ?? "Product Specs", style: "headerLeft" },
          imageData
            ? { image: imageData, width: 120, alignment: "right" }
            : { text: "", width: 120 },
        ],
      });
      content.push({ text: "\n" });

      content.push({
        columns: [
          { text: `SKU: ${p.sku ?? "-"}`, style: "meta" },
          {
            text: `Category: ${p.category ?? "-"}`,
            style: "meta",
            alignment: "center",
          },
          {
            text: `Price: ${p.price ?? "-"}`,
            style: "meta",
            alignment: "right",
          },
        ],
      });
      content.push({ text: "\n" });

      content.push({ text: "Short Description", style: "sectionTitle" });
      content.push({
        text: p.shortDescription ?? "-",
        margin: [0, 4, 0, 8],
      });

      content.push({ text: "Long Description", style: "sectionTitle" });
      content.push({
        text: p.longDescription ?? "-",
        margin: [0, 4, 0, 12],
      });

      const specBody: any[] = [
        [
          { text: "Specification", style: "tableHeader" },
          { text: "Value", style: "tableHeader" },
        ],
      ];

      if (p.weight) {
        specBody.push([
          { text: "Weight" },
          { text: `${p.weight.value} ${p.weight.unit}` },
        ]);
      }

      if (p.dimensions) {
        const length = p.dimensions.length ?? "";
        const width = p.dimensions.width ?? "";
        const height = p.dimensions.height ?? "";
        const unit = p.dimensions.unit ?? "";
        const dims =
          width && height
            ? `${length} × ${width} × ${height} ${unit}`
            : `${length} ${unit}`.trim();

        specBody.push([{ text: "Dimensions" }, { text: dims }]);
      }

      if (p.material) {
        specBody.push([{ text: "Material" }, { text: p.material }]);
      }

      if (Array.isArray(p.colors) && p.colors.length > 0) {
        specBody.push([
          { text: "Colors Available" },
          { text: p.colors.map((c) => c.name).join(", ") },
        ]);
      }

      specBody.push([{ text: "Product ID" }, { text: String(p.id ?? "") }]);

      specBody.push([
        { text: "Generated On" },
        { text: new Date().toLocaleString() },
      ]);

      specBody.push([{ text: "Product ID" }, { text: String(p.id ?? "") }]);
      specBody.push([
        { text: "Generated On" },
        { text: new Date().toLocaleString() },
      ]);

      content.push({
        text: "Specifications",
        style: "sectionTitle",
        margin: [0, 6, 0, 6],
      });
      content.push({
        table: { widths: ["auto", "*"], body: specBody },
        layout: {
          fillColor: (rowIndex: number) =>
            rowIndex % 2 === 0 ? "#F7F7F7" : null,
        },
        margin: [0, 0, 0, 16],
      });

      const website =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://gryp.fit";
      content.push({
        text: "Contact",
        style: "sectionTitle",
        margin: [0, 6, 0, 6],
      });
      content.push({
        columns: [
          { text: `Phone: +${BUSINESS_PHONE}`, style: "contactText" },
          {
            text: `Email: ${emailEnv}`,
            style: "contactText",
            alignment: "center",
          },
          {
            text: `Website: ${website}`,
            style: "contactText",
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 12],
      });

      content.push({
        text: "Note: This document is generated by Grypfit.",
        style: "footnote",
        margin: [0, 10, 0, 0],
      });

      const docDefinition: any = {
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        content,
        watermark: {
          text: "Gryp.fit",
          color: "#000000",
          opacity: 0.06,
          bold: true,
          italics: false,
          angle: -45,
        },
        styles: {
          headerLeft: { fontSize: 18, bold: true, margin: [0, 0, 0, 2] },
          meta: { fontSize: 10, color: "#555" },
          sectionTitle: { fontSize: 12, bold: true, margin: [0, 6, 0, 6] },
          tableHeader: { bold: true, fillColor: "#EEE", fontSize: 11 },
          footnote: { fontSize: 9, color: "#666" },
          contactText: { fontSize: 10, color: "#333" },
        },
        defaultStyle: { fontSize: 11 },
        footer: (currentPage: number, pageCount: number) => {
          return {
            columns: [
              {
                text: `Page ${currentPage} of ${pageCount}`,
                alignment: "right",
                margin: [0, 0, 40, 0],
              },
            ],
            columnGap: 10,
            fontSize: 9,
            color: "#666",
          };
        },
      };

      const pdfGenerator = (pdfMake as any).createPdf(docDefinition);
      if (typeof pdfGenerator.getBlob === "function") {
        const blob: Blob = await new Promise((resolve, reject) => {
          pdfGenerator.getBlob(
            (b: Blob) => resolve(b),
            (err: any) => reject(err)
          );
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${p.sku || "product"}_specs.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        try {
          pdfGenerator.download(`${p.sku || "product"}_specs.pdf`);
        } catch (err) {
          console.error(
            "pdfMake.download failed, and getBlob not available:",
            err
          );
          alert(
            "Download failed in this browser. Try Chrome/Firefox desktop for PDF export."
          );
        }
      }
    } catch (err) {
      console.error("downloadSpecs overall error:", err);
      alert("Failed to create or download PDF. See console for details.");
    } finally {
      setLoadingPdf(false);
    }
  }

  // --- 4. RENDER (Updated UI with Premium Styles) ---
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row ring-1 ring-white/20"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (Floating) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg border border-slate-100"
            >
              <HiX className="text-xl" />
            </button>

            {/* Left Column: Image Area */}
            <div className="md:w-5/12 h-64 md:h-auto bg-slate-50 relative border-r border-slate-100 p-8 flex items-center justify-center">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

              <div className="relative w-full h-full">
                <Image
                  src={
                    !imgError && product.image
                      ? product.image
                      : "/images/placeholder.jpg"
                  }
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-4 drop-shadow-xl"
                  onError={() => setImgError(true)}
                />

                {/* Fallback img tag for error handling logic */}
                {!imgError && product.image && (
                  <img
                    src={product.image}
                    alt=""
                    style={{ display: "none" }}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Floating SKU Badge */}
              <div className="absolute bottom-8 left-8">
                <div className="px-5 py-2.5 bg-white/90 backdrop-blur text-primary rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-xl border border-white/40">
                  Ref: {sku}
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="md:w-7/12 flex flex-col bg-white overflow-hidden relative">
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                {/* Header Info */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/5 px-3 py-1 rounded-full">
                      {product.category} Series
                    </span>

                    <button
                      onClick={() => setShareOpen(true)}
                      className="relative z-[60] flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
                    >
                      <FaShareSquare /> Share
                    </button>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary leading-[0.95] mb-6">
                    {title}
                  </h2>

                  <p className="text-2xl font-bold text-primary mb-6">
                    {product.price}
                  </p>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-muted text-lg leading-relaxed font-medium">
                      {product.longDescription || product.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Specifications Card */}
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-10">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                      Technical Specs
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={copySpecs}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted hover:text-primary shadow-sm border border-slate-200 transition-all"
                        title="Copy"
                      >
                        <FiCopy size={14} />
                      </button>
                      <button
                        onClick={downloadSpecs}
                        disabled={loadingPdf}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted hover:text-primary shadow-sm border border-slate-200 transition-all"
                        title="Download PDF"
                      >
                        <FaDownload size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                        Weight
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {product.weight
                          ? `${product.weight.value} ${product.weight.unit}`
                          : "-"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                        Dimensions
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {product.dimensions
                          ? product.dimensions.width &&
                            product.dimensions.height
                            ? `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}`
                            : `${product.dimensions.length} ${product.dimensions.unit}`
                          : "-"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                        Material
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {product.material ?? "Industrial Grade"}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                        Color
                      </span>

                      {Array.isArray(product.colors) ? (
                        <div className="flex items-center gap-2">
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1"
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-slate-400"
                                style={{ backgroundColor: color.hex }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          -
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="flex-1">
                    <WhatsAppButton
                      name={title}
                      sku={sku}
                      label="Get Best Price"
                      fixed={false}
                      className="w-full justify-center !py-4 !rounded-xl !text-sm !font-bold shadow-xl shadow-green-500/20"
                    />
                  </div>
                  <button
                    onClick={() => (window.location.href = mailtoForQuote)}
                    className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-primary hover:border-primary hover:bg-slate-50 py-4 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm"
                  >
                    <FaEnvelope /> Email Quote
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Share Overlay - Styled */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShareOpen(false)}
            />
            <motion.div
              className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-primary tracking-tight">
                  Share Product
                </h3>
                <button
                  onClick={() => setShareOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"
                >
                  <HiX />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    l: "WhatsApp",
                    i: <FaWhatsapp className="text-green-600 text-xl" />,
                    fn: shareWhatsAppWithDetails,
                    d: "Link + Details",
                  },
                  {
                    l: "Email",
                    i: <FaEnvelope className="text-blue-600 text-xl" />,
                    fn: openEmail,
                    d: "Compose Mail",
                  },
                  {
                    l: "SMS",
                    i: <FaSms className="text-orange-600 text-xl" />,
                    fn: openSMS,
                    d: "Send Message",
                  },
                  {
                    l: "Copy Link",
                    i: <FaLink className="text-slate-600 text-xl" />,
                    fn: copyToClipboard,
                    d: "Copy to Clipboard",
                  },
                ].map((item) => (
                  <button
                    key={item.l}
                    onClick={item.fn}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group text-left"
                  >
                    {item.i}
                    <div>
                      <div className="font-bold text-primary">{item.l}</div>
                      <div className="text-xs text-muted font-medium">
                        {item.d}
                      </div>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                      →
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}