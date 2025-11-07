"use client";

import { motion } from "framer-motion";
import type { Metadata } from "next";

const timeline = [
  { year: "1995", event: "Founded Singhal Industries" },
  { year: "2000", event: "Expanded to gym equipment manufacturing" },
  { year: "2010", event: "Partnered with major gym brands across India" },
  { year: "2015", event: "Introduced sports equipment components" },
  { year: "2020", event: "Achieved ISO certification for quality" },
  { year: "2025", event: "Launched GRYPFIT brand" },
];

export default function About() {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-primary">GRYPFIT</span>
          </h1>
          <p className="text-xl text-gray-400">
            Three decades of precision engineering excellence
          </p>
        </motion.div>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-secondary border border-gray-700 rounded-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary">Who We Are</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Singhal Industries, operating under the brand name GRYPFIT, is a trusted manufacturer 
              of spare parts for gym machines and a comprehensive range of sports equipment. 
              Established in 1995, we have built a legacy on the pillars of quality, innovation, 
              and unwavering customer trust.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our commitment is to deliver durable and precision-engineered components that power 
              fitness and performance equipment across India. From small workshops to large-scale 
              manufacturing facilities, we have grown to become a name synonymous with reliability 
              in the fitness industry.
            </p>
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary border border-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  🏋️ Gym Machine Parts
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We manufacture precision components including pulleys, plates, joints, handles, 
                  and connectors for gym equipment. Our parts are designed for gym equipment 
                  manufacturers and service providers who demand reliability and durability.
                </p>
              </div>

              <div className="bg-secondary border border-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  🏸 Sports Equipment Parts
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  From table tennis and cricket plastic bats to fitness tools, we craft durable 
                  parts used in sports and recreational equipment. Our components meet the demands 
                  of both professional athletes and fitness enthusiasts.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 hidden md:block"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:gap-8 gap-4`}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center`}>
                      <div className="bg-secondary border border-gray-700 rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                        <p className="text-gray-300">{item.event}</p>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/30 rounded-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose GRYPFIT?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <span className="text-primary text-3xl">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">25+ Years of Experience</h3>
                  <p className="text-gray-400">
                    Three decades of manufacturing expertise and industry knowledge
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-primary text-3xl">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Top Gym Brands</h3>
                  <p className="text-gray-400">
                    Serving leading gym equipment manufacturers across India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-primary text-3xl">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom & Bulk Manufacturing</h3>
                  <p className="text-gray-400">
                    Flexible production capabilities for custom orders and large volumes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-primary text-3xl">✓</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fast Delivery & Support</h3>
                  <p className="text-gray-400">
                    Reliable logistics and excellent post-sales customer service
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
