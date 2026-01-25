"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * NEXT.JS INSTALLATION NOTE:
 * In your local project, swap the mocks below for:
 * import Link from "next/link";
 */
const Link = ({ href, children, className, ...props }: any) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

// --- Premium Industrial Icons ---
const Icons = {
  Dumbbell: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5 4 9" />
      <path d="m15 15 2.5 2.5" />
      <path d="m3 21 2-2" />
      <path d="m19 5 2-2" />
      <path d="m2 10 7-7" />
      <path d="m15 22 7-7" />
      <path d="M12 7.5 16.5 12" />
      <path d="m7.5 12 4.5 4.5" />
      <path d="m16 8 3-3" />
      <path d="m5 19 3-3" />
    </svg>
  ),
  PingPong: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.7 2.3a8 8 0 1 0 7.5 11" />
      <path d="m5 14 3.5 3.5" />
      <path d="m14 14 3 3a4.5 4.5 0 0 1-6 6l-3-3" />
    </svg>
  ),
  Weight: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  ),
  Check: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Factory: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20V9l4-2 4 2 4-2 4 2 4-2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
      <path d="M7 18h2" />
      <path d="M13 18h2" />
      <path d="M18 13h2" />
      <path d="M18 9h2" />
      <path d="M18 5h2" />
    </svg>
  ),
  WhatsApp: ({ size = 24 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

const categories = [
  {
    icon: <Icons.Dumbbell />,
    title: "Gym Infrastructure",
    description:
      "Heavy-duty precision components for commercial-grade fitness machinery.",
    link: "/products?category=Gym",
    tag: "Industrial Strength",
  },
  {
    icon: <Icons.PingPong />,
    title: "Sports Dynamics",
    description:
      "Durable and lightweight parts engineered for professional sports equipment.",
    link: "/products?category=Sports",
    tag: "High Precision",
  },
  {
    icon: <Icons.Weight />,
    title: "Elite Weights",
    description:
      "Calibrated plates and custom weight sets for global performance standards.",
    link: "/products?category=Plates%20&%20Weights",
    tag: "Calibrated",
  },
];

export default function HomeClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background relative">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Architectural Background */}
        <div className="absolute top-0 right-0 w-[45vw] h-full bg-slate-50 -z-10 skew-x-12 translate-x-20 border-l border-slate-100" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/20 blur-[120px] rounded-full -z-10 animate-pulse" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-16 h-[2px] bg-accent/40" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-accent">
                ESTABLISHED 1995
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-primary leading-[0.82] tracking-tighter mb-10">
              STRENGTH <br />
              <span className="text-gradient">IN DETAIL.</span>
            </h1>

            <p className="text-2xl text-muted font-medium leading-relaxed max-w-xl mb-12">
              India's premier manufacturer of high-precision components for the
              global fitness industry. Engineering reliability into every part.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link
                href="/products"
                className="btn-premium btn-primary shadow-2xl shadow-blue-500/30 group"
              >
                <span>Explore Catalog</span>
                <Icons.ArrowUpRight />
              </Link>
              <Link
                href="/about"
                className="btn-premium btn-outline px-12"
              >
                Our Legacy
              </Link>
            </div>

            {/* Performance Stats */}
            <div className="mt-20 grid grid-cols-3 gap-12 border-t border-slate-100 pt-10">
              <div>
                <span className="block text-4xl font-black text-primary mb-1">
                  30+
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                  Years Expert
                </span>
              </div>
              <div>
                <span className="block text-4xl font-black text-primary mb-1">
                  500+
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                  Active SKUs
                </span>
              </div>
              <div>
                <span className="block text-4xl font-black text-primary mb-1">
                  ISO
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                  Certified
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white ring-1 ring-slate-100">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
                alt="Industrial Gym Manufacturing"
                className="w-full h-[750px] object-cover hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Icons.Factory />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] opacity-80">
                    Meerut HQ facility
                  </span>
                </div>
                <h3 className="text-5xl font-black tracking-tighter leading-none">
                  Precision <br /> Engineering.
                </h3>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-50 z-20 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                <Icons.Check />
              </div>
              <p className="text-sm font-black text-primary leading-snug">
                Trusted by 200+ Global Equipment Manufacturers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= DIVISIONS SECTION ================= */}
      <section className="section-padding bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <span className="text-xs font-black uppercase tracking-[0.5em] text-accent mb-6 block">
                Our Capabilities
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-primary leading-none">
                CORE <span className="text-gradient">DIVISIONS.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md text-xl text-muted font-medium text-left md:text-right"
            >
              From complex OEM requirements to bulk commercial components, we set
              the benchmark for quality.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link href={cat.link} className="block group h-full">
                  <div className="premium-card p-12 h-full flex flex-col items-start hover:border-accent group-hover:bg-white transition-all duration-500 text-left">
                    <div className="w-20 h-20 bg-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] rounded-[1.5rem] flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 ring-1 ring-slate-100">
                      {cat.icon}
                    </div>
                    <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      {cat.tag}
                    </span>
                    <h3 className="text-3xl font-black tracking-tighter text-primary mb-6 group-hover:translate-x-1 transition-transform">
                      {cat.title}
                    </h3>
                    <p className="text-muted text-lg mb-10 flex-grow leading-relaxed font-medium">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
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
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative text-left"
            >
              <div className="absolute -top-20 -left-20 text-[25rem] font-black text-slate-50 -z-10 leading-none select-none italic opacity-50">
                30
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-primary mb-12 leading-[0.85]">
                THREE DECADES <br />
                <span className="text-gradient">OF EXCELLENCE.</span>
              </h2>
              <div className="space-y-10">
                {[
                  {
                    t: "Custom Engineering",
                    d: "Tailored manufacturing for your unique product designs.",
                  },
                  {
                    t: "Extreme Durability",
                    d: "Stress-tested for 100,000+ commercial use cycles.",
                  },
                  {
                    t: "Rapid Prototyping",
                    d: "Accelerated R&D with our in-house specialized molding.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Icons.Check />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black tracking-tight text-primary mb-2">
                        {item.t}
                      </h4>
                      <p className="text-muted text-lg font-medium leading-relaxed">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-primary p-12 md:p-20 rounded-[4rem] text-white relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden text-left"
            >
              {/* Background texture overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[6rem]" />

              <span className="text-xs font-black uppercase tracking-[0.5em] opacity-40 mb-10 block relative z-10">
                Manufacturing Support
              </span>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.9] relative z-10">
                READY TO <br />
                <span className="text-white/30 italic">SCALE UP?</span>
              </h3>
              <p className="text-white/60 text-xl mb-14 font-medium leading-relaxed relative z-10">
                Partner with Singhal Industries for factory-direct wholesale
                pricing and custom production runs.
              </p>

              <div className="flex flex-col gap-5 relative z-10">
                <Link
                  href="https://wa.me/918449291260"
                  className="w-full bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white btn-premium justify-center shadow-xl py-6 font-black text-lg"
                >
                  <Icons.WhatsApp size={24} />
                  <span>Direct Factory Line</span>
                </Link>
                <Link
                  href="/contact"
                  className="w-full bg-white text-primary btn-premium justify-center hover:bg-slate-100 py-6 font-black text-lg shadow-xl"
                >
                  Request Technical Quote
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-6 border-t border-white/10 pt-12 relative z-10">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-primary bg-slate-800 overflow-hidden shadow-xl"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="Client"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                  JOIN 200+ PARTNER BRANDS
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative Branding Scroll */}
      <div className="h-40 flex items-center overflow-hidden bg-slate-50 border-y border-slate-100">
        <div className="flex gap-20 whitespace-nowrap animate-infinite-scroll">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="text-6xl font-black text-slate-200 tracking-tighter uppercase italic opacity-40"
            >
              Precision . Reliability . Performance . GRYP.FIT . Industrial
              Grade .
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}