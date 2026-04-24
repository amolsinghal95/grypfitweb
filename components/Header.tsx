"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useInquiry } from "@/context/InquiryContext";
import { FaShoppingCart } from "react-icons/fa";


// --- Inline Premium Icons ---
const Icons = {
  Menu: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  ChevronRight: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Home: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  LayoutGrid: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
  ),
  Info: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  Phone: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  ArrowRight: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Settings: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  )
};

const navLinks = [
  { name: "Home", href: "/", icon: <Icons.Home size={18} /> },
  { name: "Products", href: "/products", icon: <Icons.LayoutGrid size={18} /> },
  { name: "Blog", href: "/blog", icon: <Icons.Info size={18} /> },
  { name: "About", href: "/about", icon: <Icons.Info size={18} /> },
  { name: "Contact", href: "/contact", icon: <Icons.Phone size={18} /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const inquiry = useInquiry();

  useEffect(() => {
    setMounted(true);
  }, []);

  const openCart = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-cart'));
  };

  const router = useRouter();

const handleRequestQuote = () => {
  setIsOpen(false);
  setTimeout(() => {
    router.push("/contact");
  }, 150);
};


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setScrolled(false);
    };

    resetToTop();

    const frame = window.requestAnimationFrame(resetToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      {/* 1. THE NAVIGATION BAR (Always Visible) */}
      <header 
        className={`glass-header transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] fixed top-0 w-full z-50 ${
          scrolled ? "py-3 shadow-2xl shadow-black/5 bg-white/80 backdrop-blur-md" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Branding Area */}
          <Link href="/" className="group flex items-center space-x-4">
  <motion.img
    src="/images/logo.jpeg" // ← your image path
    alt="GRYP.FIT Logo"
    className="w-12 h-12 object-contain"
    whileHover={{ rotate: 8, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  />

            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter text-primary flex items-center">
                GRYP<span className="text-accent">.</span>FIT
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/60">
                By Singhal Industries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center p-1 bg-slate-100/50 rounded-full border border-slate-200/40 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-500 relative flex items-center gap-2 group ${
                    isActive ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  <span className={`transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110 opacity-40 group-hover:opacity-100"}`}>
                    {link.icon}
                  </span>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-white -z-10 rounded-full shadow-sm border border-slate-200/60"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Global Action Section */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all"
            >
              <FaShoppingCart size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">Cart</span>
              {mounted && inquiry && inquiry.items.length > 0 && (
                <span className="bg-accent text-white px-2 py-1 rounded text-xs font-bold">
                  {inquiry.items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all"
            >
              <FaShoppingCart size={16} className="text-primary" />
              {mounted && inquiry && inquiry.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">
                  {inquiry.items.length}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden w-12 h-12 flex items-center justify-center text-primary bg-white rounded-2xl transition-all active:scale-90 border border-slate-200 shadow-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-100 shadow-2xl z-50 overflow-hidden"
            >
              <div className="container mx-auto px-8 py-16 flex flex-col space-y-10">
                <div className="grid grid-cols-1 gap-4">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`text-5xl font-black flex items-center justify-between group ${
                          pathname === link.href ? "text-accent" : "text-primary"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-muted/20 text-xl font-mono">0{idx + 1}</span>
                          {link.name}
                        </div>
                        <Icons.ChevronRight size={40} className="opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-10 border-t border-slate-100 flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-muted">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Icons.Settings size={20} />
                    </div>
                    <p className="text-sm font-medium">Custom Spare Parts & Bulk Manufacturing</p>
                  </div>
                  <button
  onClick={handleRequestQuote}
  className="btn-premium btn-primary w-full py-6 text-xl rounded-[2rem]"
>
  Request Quote
</button>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

    </>
  );
}
