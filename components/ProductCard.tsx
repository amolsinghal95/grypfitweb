"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  title: string;
  sku: string;
  price: string;
  shortDescription: string;
  category: string;
  image: string;
  onClick: () => void;
}

export default function ProductCard({
  title,
  sku,
  price,
  shortDescription,
  category,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <motion.div
      className="bg-secondary rounded-lg overflow-hidden shadow-lg cursor-pointer border border-gray-700 hover:border-primary transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative w-full h-48 bg-gray-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.jpg";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-2">SKU: {sku}</p>
        <p className="text-sm text-gray-300 mb-3">{shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{price}</span>
          <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
