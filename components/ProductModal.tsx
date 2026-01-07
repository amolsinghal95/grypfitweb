// components/ProductModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { FaWhatsapp, FaEnvelope, FaSms, FaLink, FaShareSquare, FaDownload } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { MdStraighten } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import WhatsAppButton from "@/components/WhatsAppButton";

// --- Types ---
interface Weight { value: number; unit: string; }
interface Dimensions { length: number; width?: number; height?: number; unit: string; }

interface Product {
  id: number;
  title: string;
  sku: string;
  price: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  image?: string;
  weight?: Weight;
  dimensions?: Dimensions;
  material?: string;
  packaging?: string;
}

interface Props { product: Product | null; onClose: () => void; }

const encode = (s?: string) => encodeURIComponent(s || "");
const BUSINESS_PHONE = "918449291260"; // international format without +

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  const [shareOpen, setShareOpen] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  // >>> Added image states (only change)
  const [imgError, setImgError] = useState(false);
  const [imgMeta, setImgMeta] = useState<{ w?: number; h?: number } | null>(null);
  // <<< end image states

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

  const title = product.title;
  const sku = product.sku;
  const shareText = `${title} (SKU: ${sku}) — ${product.price}`;
  const productUrl = typeof window !== "undefined" ? `${window.location.origin}/products?sku=${encodeURIComponent(sku)}` : `/products?sku=${encodeURIComponent(sku)}`;

  const dimLabel = product.dimensions
    ? product.dimensions.width && product.dimensions.height
      ? `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}`
      : `${product.dimensions.length} ${product.dimensions.unit}`
    : null;

  const kgToLbs = (kg: number) => (kg * 2.2046226218).toFixed(1);
  const mmToIn = (mm: number) => (mm / 25.4).toFixed(2);

  const formatSpecsText = () => {
    const lines: string[] = [];
    lines.push(`${title} (SKU: ${sku})`);
    if (product.weight) lines.push(`Weight: ${product.weight.value} ${product.weight.unit}`);
    if (product.dimensions) {
      if (product.dimensions.width && product.dimensions.height) {
        lines.push(
          `Dimensions: ${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}`
        );
      } else {
        lines.push(`Size: ${product.dimensions.length} ${product.dimensions.unit}`);
      }
    }
    if (product.material) lines.push(`Material: ${product.material}`);
    if (product.packaging) lines.push(`Packaging: ${product.packaging}`);
    lines.push(`Price: ${product.price}`);
    lines.push(`Link: ${productUrl}`);
    const emailEnv = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@gryp.fit";
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
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank", "noopener");
    setShareOpen(false);
  };

  const openEmail = () => {
    const subject = encode(`${title} — Enquiry`);
    const body = encode(`${shareText}\n\n${productUrl}\n\nPlease share price, availability & lead time.`);
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
        window.prompt("Copy the product URL below (long-press or Ctrl+C):", productUrl);
      }
    } catch {
      window.prompt("Copy the product URL below (long-press or Ctrl+C):", productUrl);
    } finally {
      setShareOpen(false);
    }
  };

  const emailEnv = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@gryp.fit";
  const mailtoForQuote = `mailto:${emailEnv}?subject=${encode(`${title} - Enquiry`)}&body=${encode(`Hello,\n\nI would like to enquire about ${title} (SKU: ${sku}).\n\nPlease share price, MOQ and lead time.\n\nThanks,\n`)}`;

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
        if (mod.pdfMake?.vfs) { (pdfMake as any).vfs = mod.pdfMake.vfs; return true; }
        if (mod.vfs) { (pdfMake as any).vfs = mod.vfs; return true; }
        if (mod.default?.vfs) { (pdfMake as any).vfs = mod.default.vfs; return true; }
        if (mod.default?.pdfMake?.vfs) { (pdfMake as any).vfs = mod.default.pdfMake.vfs; return true; }
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
            if ((pdfMake as any).vfs && Object.keys((pdfMake as any).vfs).length > 0) {
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
          imageData ? { image: imageData, width: 120, alignment: "right" } : { text: "", width: 120 },
        ],
      });
      content.push({ text: "\n" });

      content.push({
        columns: [
          { text: `SKU: ${p.sku ?? "-"}`, style: "meta" },
          { text: `Category: ${p.category ?? "-"}`, style: "meta", alignment: "center" },
          { text: `Price: ${p.price ?? "-"}`, style: "meta", alignment: "right" },
        ],
      });
      content.push({ text: "\n" });

      content.push({ text: "Short Description", style: "sectionTitle" });
      content.push({ text: p.shortDescription ?? "-", margin: [0, 4, 0, 8] });

      content.push({ text: "Long Description", style: "sectionTitle" });
      content.push({ text: p.longDescription ?? "-", margin: [0, 4, 0, 12] });

      const specBody: any[] = [[{ text: "Specification", style: "tableHeader" }, { text: "Value", style: "tableHeader" }]];
      if (p.weight) specBody.push([{ text: "Weight" }, { text: `${p.weight.value} ${p.weight.unit}` }]);
      if (p.dimensions) {
        const length = p.dimensions.length ?? "";
        const width = p.dimensions?.width ?? "";
        const height = p.dimensions?.height ?? "";
        const unit = p.dimensions.unit ?? "";
        const dims = width && height ? `${length} x ${width} x ${height} ${unit}` : `${length} ${unit}`.trim();
        specBody.push([{ text: "Dimensions" }, { text: dims }]);
      }

      specBody.push([{ text: "Product ID" }, { text: String(p.id ?? "") }]);
      specBody.push([{ text: "Generated On" }, { text: new Date().toLocaleString() }]);

      content.push({ text: "Specifications", style: "sectionTitle", margin: [0, 6, 0, 6] });
      content.push({
        table: { widths: ["auto", "*"], body: specBody },
        layout: { fillColor: (rowIndex: number) => (rowIndex % 2 === 0 ? "#F7F7F7" : null) },
        margin: [0, 0, 0, 16],
      });

      const website = typeof window !== "undefined" ? window.location.origin : "https://gryp.fit";
      content.push({ text: "Contact", style: "sectionTitle", margin: [0, 6, 0, 6] });
      content.push({
        columns: [
          { text: `Phone: +${BUSINESS_PHONE}`, style: "contactText" },
          { text: `Email: ${emailEnv}`, style: "contactText", alignment: "center" },
          { text: `Website: ${website}`, style: "contactText", alignment: "right" },
        ],
        margin: [0, 0, 0, 12],
      });

      content.push({ text: "Note: This document is generated by Grypfit.", style: "footnote", margin: [0, 10, 0, 0] });

      const docDefinition: any = {
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        content,
        watermark: { text: "Gryp.fit", color: "#000000", opacity: 0.06, bold: true, italics: false, angle: -45 },
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
              { text: `Page ${currentPage} of ${pageCount}`, alignment: "right", margin: [0, 0, 40, 0] },
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
          pdfGenerator.getBlob((b: Blob) => resolve(b), (err: any) => reject(err));
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
          console.error("pdfMake.download failed, and getBlob not available:", err);
          alert("Download failed in this browser. Try Chrome/Firefox desktop for PDF export.");
        }
      }
    } catch (err) {
      console.error("downloadSpecs overall error:", err);
      alert("Failed to create or download PDF. See console for details.");
    } finally {
      setLoadingPdf(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-secondary text-foreground rounded-lg max-w-5xl w-full h-[90vh] overflow-hidden shadow-lg border border-muted flex flex-col"

            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {/* ------------- CHANGED HEADER START ------------- */}
            <div className="sticky top-0 bg-secondary border-b border-muted p-4 flex items-start gap-3 z-10">
              <div className="flex-1 pr-4">
                {/* allow wrapping and multiple lines; remove truncate & max-width */}
                <h2 className="text-2xl font-bold text-primary leading-tight break-words">{title}</h2>
              </div>

              <div className="flex-shrink-0">
                <button onClick={onClose} className="text-muted hover:text-foreground text-2xl p-1 rounded-md transition-colors" aria-label="Close modal">
                  <HiX />
                </button>
              </div>
            </div>
            {/* -------------- CHANGED HEADER END -------------- */}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* >>> REPLACED IMAGE BLOCK START */}
                <div className="relative w-full h-80 bg-white rounded-lg border border-muted flex items-center justify-center">
  <Image
    src={!imgError && product.image ? product.image : "/images/placeholder.jpg"}
    alt={title}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-contain p-4"
  />

  {!imgError && product.image && (
    <img
      src={product.image}
      alt=""
      style={{ display: "none" }}
      onError={() => {
        console.warn(
          "ProductModal: image failed to load, switching to placeholder:",
          product.image
        );
        setImgError(true);
      }}
    />
  )}
</div>

                {/* >>> REPLACED IMAGE BLOCK END */}

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">{product.category}</span>
                    </div>

                    <button
                      onClick={() => setShareOpen(true)}
                      className="p-2 rounded hover:bg-primary/5 text-muted"
                      title="Share product"
                    >
                      <FaShareSquare />
                    </button>
                  </div>

                  <p className="text-xs text-muted mb-2">SKU: {sku}</p>
                  <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Description</h3>
                    <p className="text-muted leading-relaxed">{product.longDescription}</p>
                  </div>

                  <div className="mt-4 border border-muted p-3 rounded-lg bg-background">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">Specifications</h4>

                      <div className="flex items-center gap-2">
                        <button onClick={copySpecs} title="Copy specs" className="text-muted hover:text-foreground p-2 rounded bg-transparent">
                          <FiCopy />
                        </button>

                        <button onClick={downloadSpecs} title="Download specs" className="text-muted hover:text-foreground p-2 rounded bg-transparent" disabled={loadingPdf}>
                          <FaDownload />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted">Weight</div>
                      <div className="font-medium">{product.weight ? `${product.weight.value} ${product.weight.unit}` : "-"}</div>

                      <div className="text-muted">Dimensions</div>
                      <div className="font-medium">{product.dimensions ? product.dimensions.width && product.dimensions.height ? `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}` : `${product.dimensions.length} ${product.dimensions.unit}` : "-"}</div>
                    </div>

                    <div className="mt-3 text-sm text-muted space-y-2">
                      {product.material && (
                        <div className="grid grid-cols-2">
                          <div className="text-muted">Material</div>
                          <div className="font-medium">{product.material}</div>
                        </div>
                      )}

                      {product.packaging && (
                        <div className="grid grid-cols-2">
                          <div className="text-muted">Packaging</div>
                          <div className="font-medium">{product.packaging}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <WhatsAppButton name={title} sku={sku} label="Inquire" fixed={false} className="w-full justify-center" />
                      </div>

                      <div className="flex-1">
                        <button
                          onClick={() => (window.location.href = mailtoForQuote)}
                          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white py-3 rounded-lg transition-colors font-medium"
                        >
                          <FaEnvelope />
                          <span>Get Quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <>
            <motion.div key="share-overlay" className="fixed inset-0 bg-black/40 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShareOpen(false)} />

            <motion.div key="share-card" className="fixed z-[80] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-lg w-full mx-4 md:rounded-lg" initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }}>
              <div className="bg-secondary border border-muted rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 border-b border-muted flex items-center justify-between">
                  <h3 className="font-semibold">Share product</h3>
                  <button onClick={() => setShareOpen(false)} className="text-muted hover:text-foreground p-1 rounded"><HiX /></button>
                </div>

                <div className="p-3 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-2">
                    <button onClick={shareWhatsAppWithDetails} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                      <FaWhatsapp className="text-2xl text-green-600" />
                      <div className="flex-1"><div className="font-medium">WhatsApp</div><div className="text-sm text-muted">Share link + name, SKU & price</div></div>
                      <div className="text-muted">→</div>
                    </button>

                    <button onClick={openEmail} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                      <FaEnvelope className="text-2xl text-blue-600" />
                      <div className="flex-1"><div className="font-medium">Email</div><div className="text-sm text-muted">Compose email</div></div>
                      <div className="text-muted">→</div>
                    </button>

                    <button onClick={openSMS} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                      <FaSms className="text-2xl text-rose-600" />
                      <div className="flex-1"><div className="font-medium">SMS</div><div className="text-sm text-muted">Open messaging app</div></div>
                      <div className="text-muted">→</div>
                    </button>

                    <button onClick={copyToClipboard} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                      <FaLink className="text-2xl text-muted" />
                      <div className="flex-1"><div className="font-medium">Copy URL</div><div className="text-sm text-muted">Copy product URL only (for browser)</div></div>
                      <div className="text-muted">⧉</div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div key="share-bottom" className="fixed bottom-0 left-0 right-0 z-[81] md:hidden" initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }}>
              <div className="bg-secondary border-t border-muted rounded-t-xl shadow-lg p-3">
                <div className="flex items-center justify-between mb-2"><h4 className="font-semibold">Share product</h4><button onClick={() => setShareOpen(false)} className="text-muted px-2 py-1 rounded"><HiX /></button></div>

                <div className="space-y-2">
                  <button onClick={shareWhatsAppWithDetails} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                    <FaWhatsapp className="text-2xl text-green-600" />
                    <div><div className="font-medium">WhatsApp</div><div className="text-sm text-muted">Share link + name, SKU & price</div></div>
                  </button>

                  <button onClick={openEmail} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                    <FaEnvelope className="text-2xl text-blue-600" />
                    <div><div className="font-medium">Email</div><div className="text-sm text-muted">Compose email</div></div>
                  </button>

                  <button onClick={openSMS} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                    <FaSms className="text-2xl text-rose-600" />
                    <div><div className="font-medium">SMS</div><div className="text-sm text-muted">Open messaging app</div></div>
                  </button>

                  <button onClick={copyToClipboard} className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3">
                    <FaLink className="text-2xl text-muted" />
                    <div><div className="font-medium">Copy URL</div><div className="text-sm text-muted">Copy product URL only (for browser)</div></div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
