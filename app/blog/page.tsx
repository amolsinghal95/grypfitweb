"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { blogCategories, blogPosts } from "@/lib/blog";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">
            Insights & Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-6">
            Manufacturing <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-muted font-medium max-w-2xl mx-auto">
            Expert insights on gym equipment manufacturing, spare parts maintenance,
            and sports equipment industry trends from 30+ years of experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white text-muted border border-slate-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="premium-card h-full flex flex-col overflow-hidden bg-white">
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <span className="text-6xl font-black text-slate-300">GRYP</span>
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted mb-4">
                      <span>{new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tighter text-primary mb-4 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted font-medium leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted font-medium">No articles found in this category.</p>
          </div>
        )}

        <div className="mt-24 bg-primary rounded-[3rem] p-12 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            Stay Updated with Industry Insights
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Get the latest manufacturing tips, industry news, and product updates delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement & { email: HTMLInputElement }).email.value;
              alert("Opening your email app to subscribe!");
              window.location.href = `mailto:business@gryp.fit?subject=Newsletter Subscription&body=Please subscribe me: ${email}`;
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button className="btn-premium bg-white text-primary hover:bg-slate-100 px-8 py-4">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
