import Link from "next/link";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">GRYPFIT</h3>
            <p className="text-gray-400 text-sm">
              Precision. Strength. Trust.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Crafting quality spare parts since 1995
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/918449291260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors text-2xl"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:amolsinghal95@gmail.com"
                className="text-gray-400 hover:text-primary transition-colors text-2xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 GRYPFIT - Singhal Industries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
