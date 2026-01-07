// components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMoreHorizontal } from "react-icons/fi";

interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit?: string;
}

interface ProductCardProps {
  id: number;
  title: string;
  sku: string;
  price: string;
  shortDescription?: string;
  image?: string;
  category?: string;
  weight?: { value: number; unit: string };
  dimensions?: Dimensions;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  title,
  sku,
  price,
  shortDescription,
  image,
  category,
  weight,
  dimensions,
  onClick,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const onKey = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const renderDimensions = (d: Dimensions) => {
    const unit = d.unit ?? "cm";
    return `${d.length}×${d.width}×${d.height} ${unit}`;
  };

  const src = !imgError && image ? image : "/images/placeholder.jpg";

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onKey}
      className="group cursor-pointer bg-secondary border border-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
      aria-label={`Open details for ${title}`}
    >
      <div className="relative h-48 w-full bg-white flex items-center justify-center">
  <Image
    src={src}
    alt={title}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-contain p-3"
  />

  {/* hidden native img (reliable onError) */}
  {!imgError && image && (
    <img
      src={image}
      alt=""
      style={{ display: "none" }}
      onError={() => setImgError(true)}
    />
  )}
</div>


      {/* CONTENT */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
  {/* LEFT */}
  <div className="min-w-0 flex-1">
    <h3 className="text-lg font-semibold truncate">{title}</h3>
    {shortDescription ? (
      <p className="text-xs text-muted truncate">{shortDescription}</p>
    ) : null}

    {/* SKU — FIXED POSITION */}
    <div className="text-sm text-muted mt-1 truncate">
      SKU: {sku}
    </div>
  </div>

  {/* RIGHT */}
  <div className="flex-shrink-0 text-xl font-bold text-primary">
    {price}
  </div>
</div>


        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {category && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {category}
              </span>
            )}
            {weight && (
              <span className="text-xs text-muted">• {weight.value}{weight.unit}</span>
            )}
            {dimensions && (
              <span className="text-xs text-muted">• {renderDimensions(dimensions)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              className="p-2 rounded hover:bg-primary/5 text-muted"
              aria-label={`Open details for ${title}`}
              title="More details"
            >
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
