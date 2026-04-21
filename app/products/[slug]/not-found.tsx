import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-32">
      <div className="text-center px-6">
        <div className="mb-8">
          <span className="text-9xl font-black text-primary opacity-20">404</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-primary mb-6">
          Product Not Found
        </h1>
        <p className="text-lg text-muted font-medium mb-10 max-w-md mx-auto">
          The product you're looking for doesn't exist or may have been removed from our catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="btn-premium btn-primary"
          >
            Browse All Products
          </Link>
          <Link
            href="/contact"
            className="btn-premium btn-outline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}