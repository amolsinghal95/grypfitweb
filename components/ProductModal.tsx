// components/ProductModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { FaWhatsapp, FaEnvelope, FaSms, FaLink } from "react-icons/fa";
import WhatsAppButton from "@/components/WhatsAppButton";

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

interface Props {
  product: Product | null;
  onClose: () => void;
}

const encode = (s?: string) => encodeURIComponent(s || "");
const BUSINESS_PHONE = "918449291260"; // keep for inquiries

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShareOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const title = product.title;
  const sku = product.sku;
  const shareText = `${title} (SKU: ${sku}) — ${product.price}`;
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products?sku=${encodeURIComponent(sku)}`
      : `/products?sku=${encodeURIComponent(sku)}`;

  // Share actions
  const openWhatsAppShare = () => {
    const msg = `${shareText}\n\nCheck this product: ${productUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encode(msg)}`; // no phone so user selects contact
    window.open(url, "_blank");
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
    // using _self triggers native SMS app on mobile
    window.open(smsUrl, "_self");
    setShareOpen(false);
  };

  const copyToClipboard = async () => {
    const textToCopy = `${shareText}\n\n${productUrl}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        // replace with toast if you have one
        alert("Product link copied to clipboard. Paste it anywhere to share.");
      } else {
        // fallback: show prompt so user can long-press and copy (no mail fallback)
        // eslint-disable-next-line no-alert
        window.prompt("Copy the product link & details below (long-press to select):", textToCopy);
      }
    } catch (err) {
      // fallback prompt
      // eslint-disable-next-line no-alert
      window.prompt("Copy the product link & details below (long-press to select):", textToCopy);
    } finally {
      setShareOpen(false);
    }
  };

  const emailEnv = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "";
  const mailtoForQuote = `mailto:${emailEnv}?subject=${encode(`${title} - Enquiry`)}&body=${encode(
    `Hello,\n\nI would like to enquire about ${title} (SKU: ${sku}).\n\nPlease share price, MOQ and lead time.\n\nThanks,\n`
  )}`;

  return (
    <>
      <AnimatePresence>
        {/* Product modal overlay */}
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal card - header is sticky and content scrolls */}
          <motion.div
            className="bg-secondary text-foreground rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-lg border border-muted"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-secondary border-b border-muted p-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-primary truncate max-w-[70%]">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted hover:text-foreground text-2xl p-1 rounded-md transition-colors"
                aria-label="Close modal"
              >
                <HiX />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto max-h-[calc(90vh-72px)] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative w-full h-80 bg-secondary/80 rounded-lg overflow-hidden border border-muted">
                  <Image
                    src={product.image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted mb-2">SKU: {sku}</p>
                  <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Description</h3>
                    <p className="text-muted leading-relaxed">{product.longDescription}</p>
                  </div>

                  <div className="space-y-3">
                    <WhatsAppButton
                      name={title}
                      sku={sku}
                      label="Inquire on WhatsApp"
                      fixed={false}
                      className="w-full justify-center"
                    />

                    <a
                      href={mailtoForQuote}
                      className="block w-full bg-primary hover:bg-blue-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                    >
                      Email for Quote
                    </a>

                    <button
                      onClick={() => setShareOpen(true)}
                      className="w-full border border-muted bg-background text-foreground py-3 rounded-lg transition-colors font-medium"
                    >
                      Share Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Share popup: centered on md+, bottom-sheet on small screens */}
      <AnimatePresence>
        {shareOpen && (
          <>
            {/* overlay behind popup */}
            <motion.div
              key="share-overlay"
              className="fixed inset-0 bg-black/40 z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShareOpen(false)}
            />

            {/* popup card */}
            <motion.div
              key="share-card"
              className="fixed z-[80] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-lg w-full mx-4 md:rounded-lg"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
            >
              <div className="bg-secondary border border-muted rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 border-b border-muted flex items-center justify-between">
                  <h3 className="font-semibold">Share product</h3>
                  <button onClick={() => setShareOpen(false)} className="text-muted hover:text-foreground p-1 rounded">
                    <HiX />
                  </button>
                </div>

                {/* content with scrolling if tall */}
                <div className="p-3 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-2">
                    <button
                      onClick={openWhatsAppShare}
                      className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                    >
                      <FaWhatsapp className="text-2xl text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-sm text-muted">Share with any contact</div>
                      </div>
                      <div className="text-muted">→</div>
                    </button>

                    <button
                      onClick={openEmail}
                      className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                    >
                      <FaEnvelope className="text-2xl text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted">Compose email</div>
                      </div>
                      <div className="text-muted">→</div>
                    </button>

                    <button
                      onClick={openSMS}
                      className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                    >
                      <FaSms className="text-2xl text-rose-600" />
                      <div className="flex-1">
                        <div className="font-medium">SMS</div>
                        <div className="text-sm text-muted">Open messaging app</div>
                      </div>
                      <div className="text-muted">→</div>
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                    >
                      <FaLink className="text-2xl text-muted" />
                      <div className="flex-1">
                        <div className="font-medium">Copy link</div>
                        <div className="text-sm text-muted">Copy URL & details</div>
                      </div>
                      <div className="text-muted">⧉</div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom-sheet style for small screens: use separate element with responsive CSS */}
            <motion.div
              key="share-bottom"
              className="fixed bottom-0 left-0 right-0 z-[81] md:hidden"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
            >
              <div className="bg-secondary border-t border-muted rounded-t-xl shadow-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Share product</h4>
                  <button onClick={() => setShareOpen(false)} className="text-muted px-2 py-1 rounded">
                    <HiX />
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={openWhatsAppShare}
                    className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                  >
                    <FaWhatsapp className="text-2xl text-green-600" />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-muted">Share with any contact</div>
                    </div>
                  </button>

                  <button
                    onClick={openEmail}
                    className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                  >
                    <FaEnvelope className="text-2xl text-blue-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted">Compose email</div>
                    </div>
                  </button>

                  <button
                    onClick={openSMS}
                    className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                  >
                    <FaSms className="text-2xl text-rose-600" />
                    <div>
                      <div className="font-medium">SMS</div>
                      <div className="text-sm text-muted">Open messaging app</div>
                    </div>
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left px-3 py-3 rounded hover:bg-primary/5 transition-colors flex items-center gap-3"
                  >
                    <FaLink className="text-2xl text-muted" />
                    <div>
                      <div className="font-medium">Copy link</div>
                      <div className="text-sm text-muted">Copy URL & details</div>
                    </div>
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
