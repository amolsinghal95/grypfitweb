// components/WhatsAppButton.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  name?: string;
  sku?: string;
  extra?: string;
  label?: string;
  className?: string;
  size?: number;
  fixed?: boolean; // new: render as fixed floating or inline
};

// your business phone (country code + number, no + or spaces)
const BUSINESS_PHONE = "918449291260";

const encode = (s?: string) => encodeURIComponent(s || "");

function buildWhatsAppURL(msg: string) {
  return `https://api.whatsapp.com/send?phone=${BUSINESS_PHONE}&text=${encode(msg)}`;
}

export default function WhatsAppButton({
  name,
  sku,
  extra,
  label,
  className = "",
  size = 20,
  fixed = true,
}: Props) {
  let msg = "Hello 👋, I'm interested in a product from GRYP.FIT.";
  if (name) msg += ` Product: ${name}`;
  if (sku) msg += ` (SKU: ${sku})`;
  if (extra) msg += ` ${extra}`;
  msg += " Please share price, availability & lead time.";

  const url = buildWhatsAppURL(msg);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  // class variants
  const fixedClasses =
    "fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center justify-center";
  const inlineClasses =
    "w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 shadow-sm transition-all duration-200 flex items-center justify-center";

  const base = fixed ? fixedClasses : inlineClasses;

  return (
    <motion.button
      onClick={onClick}
      className={`${base} ${className}`}
      whileHover={{ scale: fixed ? 1.07 : 1.02 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: fixed ? 0 : 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
      aria-label={label ?? (name ? `Enquire about ${name} on WhatsApp` : "Chat on WhatsApp")}
    >
      <FaWhatsapp className="text-3xl" style={{ width: size, height: size }} />
      {label ? <span className={`ml-3 font-medium ${fixed ? "hidden sm:inline" : "inline"}`}>{label}</span> : null}
    </motion.button>
  );
}
