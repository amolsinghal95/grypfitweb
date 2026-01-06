// components/WhatsAppButton.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  name?: string;
  sku?: string;
  label?: string;
  fixed?: boolean; // legacy flag you already pass; we'll use it to slightly tweak styling
  floating?: boolean; // true -> global floating circle, false -> inline button
  phone?: string; // e.g. "918449291260"
  className?: string;
  style?: React.CSSProperties;
};

const DEFAULT_PHONE = "918449291260";

export default function WhatsAppButton({
  name,
  sku,
  label = "Inquire on WhatsApp",
  fixed = true,
  floating = false,
  phone,
  className = "",
  style,
}: Props) {
  const [visible, setVisible] = useState(true);

  // Only attach global hide/show listeners for the floating instance.
  // Dependency array length is always 1 => stable.
  useEffect(() => {
    if (!floating || typeof window === "undefined") return;

    const onHide = () => setVisible(false);
    const onShow = () => setVisible(true);

    window.addEventListener("whatsapp:hide", onHide as EventListener);
    window.addEventListener("whatsapp:show", onShow as EventListener);

    setVisible(true);

    return () => {
      window.removeEventListener("whatsapp:hide", onHide as EventListener);
      window.removeEventListener("whatsapp:show", onShow as EventListener);
    };
  }, [floating]);

  const number = phone ?? DEFAULT_PHONE;

  const prefillMessage = () => {
    if (!name && !sku) return `Hello! I'm interested in your products at GRYP.FIT. Please sare more details about pricing, availability, and lead time.`;
    let msg = "";
    if (name) msg += `${name}`;
    if (sku) msg += ` (SKU: ${sku})`;
    msg += ` — Please share price, MOQ & lead time.`;
    return msg;
  };

  const encoded = encodeURIComponent(prefillMessage());
  const waUrl = `https://wa.me/${number}?text=${encoded}`;

  // ----- Floating circular button (global) -----
  if (floating) {
    if (!visible) return null;

    return (
      <div
        aria-hidden={!visible}
        style={{
          transition: "transform 180ms ease, opacity 180ms ease",
          transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          ...style,
        }}
        className={`fixed bottom-6 right-6 z-[1000] ${className}`}
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-green-600 hover:brightness-95 text-white"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-xl" />
        </a>
      </div>
    );
  }

  // ----- Inline / in-modal button (solid green block by default) -----
  // IMPORTANT: keep required base classes first so layout/centering is preserved,
  // then append user-provided className so callers can modify spacing/size.
  const baseInline = "inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors select-none text-white";
  const baseBg = fixed ? "bg-green-600 shadow-lg hover:brightness-95" : "bg-green-600 hover:brightness-95";

  // final classes: base styles + background + caller classes
  const mergedClasses = `${baseInline} ${baseBg} ${className}`.trim();

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={mergedClasses}
      title={label}
      aria-label={label}
      style={style}
    >
      <FaWhatsapp />
      <span>{label}</span>
    </a>
  );
}
