"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";

interface Product {
  id: number;
  title: string;
  sku: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-secondary rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-secondary border-b border-gray-700 p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">{product.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-foreground text-2xl"
              aria-label="Close modal"
            >
              <HiX />
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative w-full h-80 bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-2">SKU: {product.sku}</p>
                <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{product.longDescription}</p>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/918449291260"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                  >
                    Inquire on WhatsApp
                  </a>
                  <a
                    href="mailto:amolsinghal95@gmail.com"
                    className="block w-full bg-primary hover:bg-blue-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                  >
                    Email for Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
