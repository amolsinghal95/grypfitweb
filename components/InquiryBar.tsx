"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInquiry } from "@/context/InquiryContext";
import { FaShoppingCart } from "react-icons/fa";

export default function InquiryBar() {
  const { items, totalCount } = useInquiry();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Hide on cart page, show on other pages when items exist
      setIsVisible(items.length > 0 && pathname !== "/cart");
    }
  }, [items, mounted, pathname]);

  if (!mounted || items.length === 0 || pathname === "/cart") return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <Link
        href="/cart"
        className="flex items-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FaShoppingCart size={18} />
        <span>View Cart</span>
        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">
          {totalCount} item{totalCount !== 1 ? "s" : ""}
        </span>
      </Link>
    </div>
  );
}
