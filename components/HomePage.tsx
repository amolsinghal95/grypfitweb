"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";

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

export default function HomePage() {
  const featuredPosts = blogPosts.slice(0, 3);
  const categories = [
    {
      icon: <Icons.Dumbbell />,
      title: "Gym Machine Parts",
      description: "Durable components and replacement parts for commercial gym equipment.",
      link: "/products?category=Gym",
      tag: "Bulk Supply"
    },
    {
      icon: <Icons.PingPong />,
      title: "Sports Equipment Parts",
      description: "Performance-focused accessories and components for sports equipment manufacturing.",
      link: "/products?category=Sports",
      tag: "OEM Support"
    },
    {
      icon: <Icons.Weight />,
      title: "Weight Components",
      description: "Weight plates, handles, grips, and compatible parts built for reliability.",
      link: "/products?category=Plates%20%26%20Weights",
      tag: "Custom Builds"
    },
  ];
  const partnerLogos = [
    {
      name: "Stag International",
      image: "/images/stag-international.png",
    },
    {
      name: "Khalsa Sports",
      image: "/images/khalsa-sports.png",
    },
  ];
  const trustPoints = [
    "Trusted by equipment manufacturers and distributors",
    "Strong supplier network across India",
    "Bulk production & custom manufacturing support",
    "Reliable sourcing & consistent quality",
  ];
  const whyChooseUs = [
    "Consistent quality across batches",
    "Support for bulk and OEM requirements",
    "Custom manufacturing options available",
    "Strong supply network and sourcing reliability",
    "Focus on durability and performance",
    "Responsive communication and support",
  ];
  const orderSteps = [
    "Send your requirement or product inquiry",
    "Get specifications, pricing, and timeline",
    "Manufacturing begins with approved specifications",
    "Delivery as per agreed schedule",
  ];

  return (
    <div className="bg-background">
      <section className="min-h-[90vh]screen bg-[#fcfdfe] selection:bg-blue-100 selection:text-blue-600">
        <div className="container mx-auto px-6 pt-28 pb-10 md:pt-36 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-accent/30" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">
                Precision. Strength. Trust.
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[0.95] tracking-tighter mb-5">
              Manufacturer of
              <br />
              <span className="text-gradient">Gym & Sports Equipment Parts</span>
            </h1>

            <p className="text-base md:text-xl text-primary font-black leading-relaxed max-w-2xl mb-3">
              OEM Manufacturing • Bulk Supply • Custom Components
            </p>

            <p className="text-base md:text-lg text-muted font-medium leading-relaxed max-w-2xl mb-8">
              High-quality components for distributors, OEM partners, and bulk buyers in the fitness and sports equipment industry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-premium btn-primary shadow-2xl shadow-blue-500/30 group"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="btn-premium btn-outline px-10"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="fixed top-0 right-0 -z-10 w-1/2 h-screen bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none" />
      </section>

      <section className="pt-4 pb-10 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-5"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Icons.Check />
                </div>
                <p className="text-sm font-bold text-primary leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
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
              <span className="text-xs font-black text-primary uppercase tracking-[0.4em] text-accent">
                Built for Scale
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter mb-8">
              Built for <span className="text-gradient"> Scale</span><br/> Trusted for 
              <span className="text-gradient"> Quality.</span>
            </h2>

            <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-2xl mb-6">
              At Gryp.Fit, we focus on delivering precision-engineered parts for gym and sports equipment manufacturers. From standard components to custom-built solutions, we support businesses that require durability, consistency, and volume.
            </p>

            <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-2xl mb-10">
              With a growing supplier network and manufacturing capabilities, we ensure every order meets industry expectations, whether it&apos;s small batch requirements or large-scale production.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div>
                <span className="block text-3xl font-black text-primary">30+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Years Experience</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-primary">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Active SKUs</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-primary">India</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Supply Network</span>
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
  <Image
    src="/images/homepage.png" // <-- your real image (host locally)
    alt="Precision manufacturing of gym equipment components"
    width={600}
    height={600}
    className="w-full h-[600px] object-cover object-center hover:scale-105 transition-transform duration-1000"
    priority={true}
  />

  {/* Dark overlay (fix this — current one is too “UI fake”) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  {/* Text */}
  <div className="absolute bottom-10 left-10 text-white">
    <span className="text-xl font-bold uppercase tracking-[0.25em] opacity-100 mb-2 block">
      Manufacturing Capability
    </span>
    <span className="text-l font-bold uppercase tracking-[0.15em] opacity-100 mb-2 block">
      Precision Engineered Parts
    </span>
  </div>
</div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[200px]"
            >
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white mb-4">
                <Icons.Check />
              </div>
              <p className="text-sm font-black text-primary leading-tight">Reliable support for bulk buyers, OEM partners, and distributors</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Product Categories</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black">
                Our <span className="text-gradient">Product Range</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md text-lg text-white font-large"
            >
              Explore a wide range of gym and sports equipment components designed for performance, durability, and compatibility.
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

      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-8">
                Why Businesses <br />Choose
                <span className="text-gradient"> Gryp.Fit</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-white">
                      <Icons.Check />
                    </div>
                    <div>
                      <p className="text-lg font-black tracking-tight text-primary">{item}</p>
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
              <span className="text-xs font-black uppercase tracking-[0.4em] opacity-60 mb-8 block">Ordering Process</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                Simple & Reliable <br />
                <span className="text-white/40 italic">Ordering Process</span>
              </h3>
              <div className="space-y-5">
                {orderSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl bg-white/5 px-5 py-5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-black flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-white font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">
              Trust & Proof
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-5">
              Built for Real Industry Needs
            </h2>
            <p className="text-base md:text-lg text-muted font-medium leading-relaxed max-w-3xl mx-auto mb-12">
              We work with manufacturers, distributors, and businesses across the fitness and sports equipment sector. Our focus is on long-term partnerships, consistent supply, and dependable product quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="inline-flex items-center justify-center px-5 py-3 rounded-[1.5rem] border border-slate-200 bg-white text-primary shadow-sm min-h-[140px] md:min-h-[160px]"
                aria-label={partner.name}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={260}
                  height={80}
                  className="h-16 md:h-20 w-auto max-w-[260px] object-contain"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="inline-flex items-center justify-center px-12 py-3 rounded-[1.5rem] border border-slate-200 bg-white text-primary shadow-sm">
              <Image
                src="/images/indiamart-trustseal.png"
                alt="IndiaMART TrustSEAL"
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center justify-center px-10 py-3 rounded-[1.5rem] border border-slate-200 bg-white text-primary shadow-sm">
              <Image
                src="/images/iia.png"
                alt="IndiaMART TrustSEAL"
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 -z-10" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/10 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-6">
          <div className="rounded-[3rem] border border-slate-200/70 bg-white/80 backdrop-blur-sm p-10 md:p-14 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">
              Blog & Insights
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-6">
              Industry Insights & Updates
            </h2>
            <p className="text-lg text-muted font-medium leading-relaxed max-w-3xl mb-10">
              Practical articles on product selection, maintenance, and sourcing for gym and sports equipment businesses.
            </p>
            <div className="grid gap-5 md:grid-cols-3 mb-10">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-slate-200/40"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-muted">
                      {post.category}
                    </span>
                    <span className="text-xs font-bold text-muted">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-primary mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="btn-premium btn-outline"
            >
              Explore Insights
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-12 md:p-16 rounded-[3rem] text-white relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem]" />
            <span className="text-xs font-black uppercase tracking-[0.4em] opacity-60 mb-8 block">Final CTA</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
              Looking for a <br />
              <span className="text-white/40 italic">Reliable Supplier?</span>
            </h2>
            <p className="text-white/70 text-lg mb-12 font-medium max-w-3xl">
              Get in touch with us for bulk orders, custom requirements, or product inquiries. We&apos;re here to support your business with dependable solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-white text-primary btn-premium justify-center hover:bg-slate-100"
              >
                Contact Us
              </Link>
              <Link
                href="/contact"
                className="bg-[#25D366] hover:bg-[#20bd5c] text-white btn-premium justify-center shadow-lg"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
