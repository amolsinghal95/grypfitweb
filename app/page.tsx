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
              className="text-xl md:text-3xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Precision. Strength. Trust.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting quality spare parts since 1995
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
            <p className="text-gray-400 text-lg">
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
                    className="bg-background border border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-all cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="text-primary mb-4 flex justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{category.title}</h3>
                    <p className="text-gray-400">{category.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose GRYPFIT?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg">25+ Years of Experience</h3>
                    <p className="text-gray-400">Trusted legacy in manufacturing excellence</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg">Top Gym Brands Trust Us</h3>
                    <p className="text-gray-400">Serving leading fitness equipment manufacturers across India</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg">Custom & Bulk Manufacturing</h3>
                    <p className="text-gray-400">Tailored solutions for your specific needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">✓</span>
                  <div>
                    <h3 className="font-semibold text-lg">Fast Delivery & Support</h3>
                    <p className="text-gray-400">Reliable service you can count on</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-secondary border border-gray-700 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Ready to discuss your requirements? We're here to help with custom solutions
                and bulk orders.
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
