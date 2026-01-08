"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDumbbell, FaTableTennis, FaWeightHanging } from "react-icons/fa";

export default function Home() {
  const categories = [
    {
      icon: <FaDumbbell className="text-5xl" />,
      title: "Gym Equipment",
      description: "Precision components for gym machines",
      link: "/products?category=Gym",
    },
    {
      icon: <FaTableTennis className="text-5xl" />,
      title: "Sports Equipment",
      description: "Durable parts for sports gear",
      link: "/products?category=Sports",
    },
    {
      icon: <FaWeightHanging className="text-5xl" />,
      title: "Plates & Weights",
      description: "Professional weight plates and sets",
      link: `/products?category=${encodeURIComponent("Plates & Weights")}`,
    },
  ];

  return (
    <div className="bg-background">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* H1 */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Gym & Sports Equipment Spare Parts
            </motion.h1>

            {/* Brand */}
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              GRYP.FIT
            </motion.h2>

            {/* Tagline */}
            <motion.div
              className="text-xl md:text-3xl text-muted mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>Precision. Strength. Trust.</p>
            </motion.div>

            {/* Legacy line */}
            <motion.div
              className="text-lg md:text-xl text-muted mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                Manufacturer of precision gym & sports equipment spare parts in India
                since 1995
              </p>
            </motion.div>

            {/* SEO-only internal links */}
            <div className="sr-only">
              Explore our <Link href="/products">gym and sports equipment spare parts</Link>,{" "}
              learn more <Link href="/about">about our manufacturing expertise</Link>, or{" "}
              <Link href="/contact">get in touch with us</Link> for bulk orders.
            </div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/products"
                className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Products
              </Link>

              <Link
                href="/contact"
                className="bg-transparent border-2 border-primary hover:bg-primary/10 text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="py-20 bg-gradient-to-br from-[#f8fafc] via-[#eef3f7] to-[#e9eff5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-800 drop-shadow-sm">
              Our Product <span className="text-primary">Categories</span>
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Premium quality components for fitness and sports equipment — built for
              precision, performance, and reliability.
            </p>

            <div className="w-20 h-[3px] bg-primary mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Link href={category.link}>
                  <motion.div
                    className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-8 text-center hover:shadow-xl hover:border-primary transition-all cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="text-primary mb-4 flex justify-center">
                      {category.icon}
                    </div>

                    <h3 className="text-2xl font-semibold mb-3 text-slate-800">
                      {category.title}
                    </h3>

                    <p className="text-slate-600">{category.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose GRYP.FIT?</h2>

              <ul className="space-y-4">
                {[
                  ["25+ Years of Experience", "Trusted legacy in manufacturing excellence"],
                  ["Top Gym Brands Trust Us", "Serving leading fitness equipment manufacturers across India"],
                  ["Custom & Bulk Manufacturing", "Tailored solutions for your specific needs"],
                  ["Fast Delivery & Support", "Reliable service you can count on"],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start">
                    <span className="text-primary mr-3 text-2xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-muted">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-secondary border border-muted rounded-lg p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h3>

              <p className="text-muted mb-6">
                Ready to discuss your requirements? We're here to help with custom
                solutions and bulk orders.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/918449291260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  Chat on WhatsApp
                </a>

                <Link
                  href="/contact"
                  className="block w-full bg-primary hover:bg-blue-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  View Contact Details
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
