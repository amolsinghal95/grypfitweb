// components/HomeClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDumbbell, FaTableTennis, FaWeightHanging } from "react-icons/fa";

export default function HomeClient() {
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary">GRYPFIT</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-3xl text-muted mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Precision. Strength. Trust.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-muted mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting quality spare parts for gym machines and sports equipments since 1995
            </motion.p>

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

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Product Categories</h2>
            <p className="text-muted text-lg">
              Premium quality components for fitness and sports equipment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={category.link}>
                  <motion.div
                    className="bg-background border border-muted rounded-lg p-8 text-center hover:border-primary transition-all cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="text-primary mb-4 flex justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{category.title}</h3>
                    <p className="text-muted">{category.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ...rest of the Home content (Why Choose, Get in Touch) - you can keep the same code */}
    </div>
  );
}
