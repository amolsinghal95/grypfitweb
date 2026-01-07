"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-background backdrop-blur-sm border border-muted sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-primary">
                GRYP.FIT
              </span>
              <p className="text-xs text-muted hidden md:block">
                By Singhal Industries
              </p>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground text-2xl"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
