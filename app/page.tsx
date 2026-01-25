"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * NEXT.JS INSTALLATION NOTE:
 * In your local project, you should use:
 * import Link from "next/link";
 */

// --- Preview Mocks & Utilities ---
const Link = ({ href, children, className, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const Icons = {
  Dumbbell: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 4 9"/><path d="m15 15 2.5 2.5"/><path d="m3 21 2-2"/><path d="m19 5 2-2"/><path d="m2 10 7-7"/><path d="m15 22 7-7"/><path d="M12 7.5 16.5 12"/><path d="m7.5 12 4.5 4.5"/><path d="m16 8 3-3"/><path d="m5 19 3-3"/></svg>
  ),
  PingPong: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.7 2.3a8 8 0 1 0 7.5 11"/><path d="m5 14 3.5 3.5"/><path d="m14 14 3 3a4.5 4.5 0 0 1-6 6l-3-3"/></svg>
  ),
  Weight: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
  ),
  ArrowUpRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  )
};

export default function Home() {
  const categories = [
    {
      icon: <Icons.Dumbbell />,
      title: "Gym Infrastructure",
      description: "Heavy-duty precision components for commercial-grade machinery.",
      link: "/products?category=Gym",
      tag: "Heavy Duty"
    },
    {
      icon: <Icons.PingPong />,
      title: "Sports Dynamics",
      description: "Durable and lightweight parts for professional sports equipment.",
      link: "/products?category=Sports",
      tag: "Precision"
    },
    {
      icon: <Icons.Weight />,
      title: "Elite Weights",
      description: "Calibrated plates and custom weight sets for serious performance.",
      link: "/products?category=Plates%20&%20Weights",
      tag: "Calibrated"
    },
  ];

  return (
    <div className="bg-background">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-50 -z-10 skew-x-12 translate-x-32" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full -z-10" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-accent/40" />
              {/* CHANGED: Updated label to 'Redefining Standards' as requested */}
              <span className="text-xs font-black text-white uppercase tracking-[0.4em] text-accent">
                Precision. Strength. Trust.
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary leading-[0.85] tracking-tighter mb-8">
              TRUST <br />
              <span className="text-gradient">ENGINEERED.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-xl mb-10">
              India's leading manufacturer of high-precision spare parts for the global fitness and sports industry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-premium btn-primary shadow-2xl shadow-blue-500/30 group"
              >
                Explore Catalog
                <Icons.ArrowUpRight />
              </Link>
              <Link
                href="/about"
                className="btn-premium btn-outline px-12"
              >
                Our Legacy
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div>
                <span className="block text-3xl font-black text-primary">30+</span>
                <span className="text-[10px] text-white font-bold uppercase tracking-widest text-muted">Years Experience</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-primary">500+</span>
                <span className="text-[10px] text-white font-bold uppercase tracking-widest text-muted">Active SKUs</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-primary">ISO</span>
                <span className="text-[10px] text-white font-bold uppercase tracking-widest text-muted">Certified Quality</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" 
                alt="Industrial Gym Manufacturing" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80 mb-2 block">Factory Direct</span>
                <h3 className="text-4xl font-black tracking-tighter">Precision Engineering</h3>
              </div>
            </div>
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[200px]"
            >
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white mb-4">
                <Icons.Check />
              </div>
              <p className="text-sm font-black text-primary leading-tight">Trusted by 100+ Leading Gym Brands Across India</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="section-padding bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Manufacturing Scope</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary">
                CORE <span className="text-gradient">DIVISIONS.</span>
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md text-lg text-muted font-medium"
            >
              From custom OEM parts to high-volume commercial components, we deliver uncompromising quality across all sectors.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <Link href={cat.link} className="block group h-full">
                  <div className="premium-card p-10 h-full flex flex-col items-start hover:border-accent group-hover:bg-slate-50 transition-colors">
                    <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 ring-1 ring-slate-100">
                      {cat.icon}
                    </div>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-muted mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      {cat.tag}
                    </span>
                    <h3 className="text-3xl font-black tracking-tighter text-primary mb-4 group-hover:translate-x-1 transition-transform">
                      {cat.title}
                    </h3>
                    <p className="text-muted text-base mb-8 flex-grow leading-relaxed font-medium">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      Explore Series <Icons.ArrowUpRight />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 text-[20rem] font-black text-slate-50 -z-10 leading-none select-none">30</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-8">
                THREE DECADES OF <br />
                <span className="text-gradient">EXCELLENCE.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { t: "Custom Engineering", d: "Tailored manufacturing solutions for your unique design requirements." },
                  { t: "Unmatched Durability", d: "Every part is stress-tested for 10,000+ cycles of heavy commercial use." },
                  { t: "Rapid Prototyping", d: "Fast-track your R&D with our in-house design and molding facility." },
                  { t: "India-Wide Reach", d: "Robust logistics network serving every major fitness hub in the country." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                      <Icons.Check />
                    </div>
                    <div>
                      <h4 className="text-xl font-black tracking-tight text-primary mb-1">{item.t}</h4>
                      <p className="text-muted font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-12 md:p-16 rounded-[3rem] text-white relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem]" />
              <span className="text-xs font-black uppercase tracking-[0.4em] opacity-60 mb-8 block">Custom Inquiries</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                READY TO <br />
                <span className="text-white/40 italic">SCALE?</span>
              </h3>
              <p className="text-white/70 text-lg mb-12 font-medium">
                Partner with Singhal Industries for wholesale pricing, custom bulk orders, and technical support.
              </p>
              
              <div className="space-y-4">
                <Link
                  href="https://wa.me/918449291260"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white btn-premium justify-center shadow-lg"
                >
                  Direct WhatsApp Inquiry
                </Link>
                <Link
                  href="/contact"
                  className="w-full bg-white text-primary btn-premium justify-center hover:bg-slate-100"
                >
                  Get a Formal Quote
                </Link>
              </div>

              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative footer spacer */}
      <div className="h-20" />
    </div>
  );
}