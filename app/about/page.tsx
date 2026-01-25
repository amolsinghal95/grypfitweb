"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";


const timeline = [
  { year: "1995", event: "Founded Singhal Industries with a vision for industrial excellence." },
  { year: "2000", event: "Pioneered specialized gym equipment component manufacturing." },
  { year: "2010", event: "Became the preferred OEM partner for India's leading fitness brands." },
  { year: "2015", event: "Expanded manufacturing facility to include precision sports gear." },
  { year: "2020", event: "Attained global quality certifications for high-stress components." },
  { year: "2025", event: "Redefining the industry standard under the GRYP.FIT brand." },
];

const Icons = {
  Target: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Award: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  Users: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )
};

export default function About() {
  useEffect(() => {
    document.body.classList.add("about-page-header-white");

    return () => {
      document.body.classList.remove("about-page-header-white");
    };
  }, []);
  return (
    <div className="bg-background min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-accent/30" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-accent">Our Legacy</span>
              <span className="w-12 h-[2px] bg-accent/30" />
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-primary leading-[0.85] mb-12">
              BORN FROM <br />
              <span className="text-gradient">PRECISION.</span>
            </h1>
            <p className="text-2xl text-muted font-medium leading-relaxed">
              Three decades of engineering excellence, powering the components 
              that build the world's most durable fitness environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= BRAND STORY ================= */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-8 leading-[0.9]">
                SINGHAL <br />
                <span className="text-white/0 [-webkit-text-stroke:1px_#020617]">INDUSTRIES.</span>
              </h2>
              <p className="text-lg text-muted font-medium leading-relaxed mb-6">
                Established in 1995, Singhal Industries—operating under the GRYP.FIT brand—is 
                more than a manufacturer. We are the architects of reliability in the fitness 
                and sports equipment industry.
              </p>
              <p className="text-lg text-muted font-medium leading-relaxed">
                From our foundational years in specialized gym components to our current role 
                as a nationwide leader, our commitment remains unchanged: Delivering 
                precision-engineered parts that withstand the test of time and high-intensity use.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
                  <div className="text-accent mb-4"><Icons.Target /></div>
                  <h4 className="font-black text-primary uppercase tracking-widest text-xs mb-2">Our Mission</h4>
                  <p className="text-sm font-medium text-muted">Zero-defect manufacturing for high-performance safety.</p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
                  <div className="text-accent mb-4"><Icons.Award /></div>
                  <h4 className="font-black text-primary uppercase tracking-widest text-xs mb-2">Quality First</h4>
                  <p className="text-sm font-medium text-muted">ISO certified processes and military-grade stress testing.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl group"
            >
              <img
          src="/images/aboutusimage.png"
          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-white" />
            <span className="text-xs font-black uppercase tracking-widest text-white/70">
              Factory Floor 2025
            </span>
          </div>
          <h3 className="text-4xl font-black text-white tracking-tighter">
            Advanced Molding & Casting
          </h3>
        </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE SECTION ================= */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-4">
              THE <span className="text-gradient">JOURNEY.</span>
            </h2>
            <p className="text-muted font-medium text-lg">A timeline of industrial evolution and unwavering trust.</p>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

            <div className="space-y-24 relative">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={`flex flex-col ${idx % 2 === 0 ? "md:items-start" : "md:items-end"}`}>
                      <span className="text-7xl md:text-9xl font-black text-slate-100 leading-none mb-[-2rem] select-none italic">
                        {item.year}
                      </span>
                      <div className={`p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl max-w-md relative z-10 ${
                        idx % 2 === 0 ? "text-left" : "md:text-right"
                      }`}>
                        <span className="text-accent font-black text-3xl mb-4 block">{item.year}</span>
                        <p className="text-primary font-bold text-lg leading-relaxed">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-20 hidden md:block" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
              WHY <span className="text-white/40">GRYP.FIT?</span>
            </h2>
            <p className="text-white/60 text-xl font-medium">Built on three pillars of industrial leadership.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: "EXPERIENCE", d: "Over 25 years of specialized manufacturing knowledge and factory direct expertise.", i: <Icons.Award /> },
              { t: "CAPACITY", d: "Scalable production lines capable of handling custom OEM and large-scale bulk orders.", i: <Icons.Target /> },
              { t: "PRECISION", d: "State-of-the-art testing facility ensuring every part exceeds safety requirements.", i: <Icons.Users /> }
            ].map((v, idx) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 group-hover:bg-accent transition-all duration-500 group-hover:rotate-12">
                  {v.i}
                </div>
                <h3 className="text-2xl font-black text-white tracking-widest mb-4">{v.t}</h3>
                <p className="text-white/50 font-medium leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}