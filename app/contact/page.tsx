"use client";

import React, { useState } from "react";
import { motion, type MotionProps } from "framer-motion";


const Icons = {
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  )
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const businessPhone = "918449291260";
  const defaultMessage = encodeURIComponent(
    "Hello! I'm interested in GRYP.FIT components. Please share details regarding custom bulk manufacturing."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:business@gryp.fit?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-accent/30" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-accent">BUSINESS INQUIRIES</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-primary leading-[0.85] mb-12">
              CONTACT<br></br> <span className="text-gradient">GRYP.FIT</span>
            </h1>
            <p className="text-2xl text-muted font-medium leading-relaxed max-w-2xl">
              Discuss your custom requirements, bulk orders, or technical specifications with our engineering team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-4xl font-black tracking-tighter text-primary mb-12">DIRECT CHANNELS.</h2>

            <div className="space-y-10">
              {[
                {
                  label: "Reach Us",
                  val: "GRYP.FIT, Mohkampur Phase 1, Meerut, India",
                  icon: <Icons.MapPin />,
                  href: "https://maps.app.goo.gl/25tqn6RxRwyZw76q7"
                },
                {
                  label: "Talk to Sales",
                  val: "+91-8449291260",
                  icon: <Icons.Phone />,
                  href: "tel:+918449291260"
                },
                {
                  label: "Engineering Desk",
                  val: "business@gryp.fit",
                  icon: <Icons.Mail />,
                  href: "mailto:business@gryp.fit"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{item.label}</h4>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-primary hover:text-accent transition-colors"
                    >
                      {item.val}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 bg-primary rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-3xl font-black tracking-tighter mb-4">Instant Assistance.</h3>
              <p className="text-white/70 font-medium mb-10">
                Get in touch with our team for inquiries and custom orders via WhatsApp.
              </p>
              <a
                href={`https://wa.me/${businessPhone}?text=${defaultMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white btn-premium justify-center font-black transition-all"
              >
                <Icons.WhatsApp /> Start Chat
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="bg-slate-50 border border-slate-100 rounded-[4rem] p-12 md:p-16 shadow-inner">
            <h3 className="text-3xl font-black tracking-tighter text-primary mb-8">SUBMIT INQUIRY.</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "email", label: "Business Email", type: "email" },
                { id: "subject", label: "Inquiry Subject", type: "text" }
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="text-[10px] font-black uppercase tracking-widest text-muted ml-4 mb-2 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    required
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full px-8 py-5 bg-white border border-slate-100 rounded-2xl text-primary font-bold focus:outline-none focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-muted ml-4 mb-2 block">
                  Detailed Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl text-primary font-bold focus:outline-none focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-premium btn-primary py-6 text-lg shadow-2xl">
                Send Specifications
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
