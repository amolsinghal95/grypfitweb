import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GRYP.FIT - Precision Gym & Sports Equipment Parts",
  description: "Trusted manufacturer of spare parts for gym machines and sports equipment. Precision. Strength. Trust. — Crafting quality spare parts since 1995",
  keywords: ["gym parts", "gym equipment", "sports equipment", "spare parts", "manufacturing", "India", "pulleys", "weights", "plates"],
  authors: [{ name: "GRYP.FIT - Singhal Industries" }],
  openGraph: {
    title: "GRYP.FIT - Precision Gym & Sports Equipment Parts",
    description: "Trusted manufacturer of spare parts for gym machines and sports equipment since 1995",
    url: "https://www.gryp.fit",
    siteName: "GRYP.FIT",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
