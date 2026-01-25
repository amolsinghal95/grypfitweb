"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * NEXT.JS NOTE:
 * In your local project, swap the mocks below for:
 * import Link from "next/link";
 */

// --- Preview Mocks ---
const Link = ({ href, children, className, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const Icons = {
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M2 12h20" />
    </svg>
  )
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center
        text-[18vw] font-black text-white/[0.05]
        leading-none select-none pointer-events-none">
        GRYP.FIT
      </div>



      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-950 transition-transform duration-300 group-hover:rotate-6">
                <span className="font-black text-xl italic">G</span>
              </div>
              <span className="text-2xl font-black tracking-tight">
                GRYP<span className="text-accent">.</span>FIT
              </span>
            </Link>

            <p className="text-white/55 font-medium leading-relaxed mb-6 max-w-xs">
              Precision-engineered components for global fitness brands since 1995.
            </p>

            <div className="flex items-center gap-3 text-white/40">
              <Icons.Globe />
              <span className="text-[11px] font-semibold uppercase tracking-widest">
                Meerut, India
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.35em] text-white/30 mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {[
                { n: "Gym Spare Parts", h: "/products?category=Gym" },
                { n: "Sports Equipment", h: "/products?category=Sports" },
                { n: "Calibrated Plates", h: "/products?category=Plates%20&%20Weights" },
                { n: "Custom OEM Solutions", h: "/contact" },
              ].map(link => (
                <li key={link.n}>
                  <Link
                    href={link.h}
                    className="text-white/60 hover:text-white font-semibold flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition text-accent">
                      <Icons.ArrowRight />
                    </span>
                    {link.n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.35em] text-white/30 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { n: "Our Legacy", h: "/about" },
                { n: "Contact", h: "/contact" },
                { n: "Technical Support", h: "/contact" },
                { n: "Wholesale Inquiry", h: "/contact" },
                
              ].map(link => (
                <li key={link.n}>
                  <Link
                    href={link.h}
                    className="text-white/60 hover:text-white font-semibold flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition text-accent">
                      <Icons.ArrowRight />
                    </span>
                    {link.n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-white/3 rounded-3xl p-8 border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-[0.35em] text-white/30 mb-4">
              Start a Project
            </h4>
            <p className="text-white/60 text-sm font-medium mb-6">
              Discuss manufacturing requirements for your brand.
            </p>

            <Link
              href="/contact"
              className="w-full border border-white/30 text-white btn-premium py-4 font-black justify-center hover:bg-white/10 mb-3"
            >
              Get a Quote
            </Link>

            <Link
              href="tel:+918449291260"
              className="w-full text-white/70 btn-premium py-4 font-bold justify-center hover:text-white"
            >
              Call Support
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[11px] font-semibold tracking-widest">
            © {currentYear} GRYP.FIT — SINGHAL INDUSTRIES
          </p>

          
        </div>
      </div>
    </footer>
  );
}
