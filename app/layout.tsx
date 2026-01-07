// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton"; // global floating instance

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GRYP.FIT | Gym & Sports Equipment Spare Parts Manufacturer in India",
  description:
    "GRYP.FIT is a trusted Indian manufacturer of gym and sports equipment spare parts. Precision-engineered components for fitness machines since 1995.",
  keywords: [
    "gym parts",
    "gym equipment",
    "sports equipment",
    "spare parts",
    "manufacturing",
    "India",
    "pulleys",
    "weights",
    "plates",
  ],
  authors: [{ name: "GRYP.FIT - Singhal Industries" }],
  openGraph: {
    title: "GRYP.FIT | Gym & Sports Equipment Spare Parts Manufacturer in India",
    description: "Trusted Indian manufacturer of gym and sports equipment spare parts since 1995.",
    url: "https://gryp.fit",
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
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Global floating WhatsApp button.
            Make sure your WhatsAppButton handles `floating` prop (if not, I can patch it). */}
        <WhatsAppButton floating phone="918449291260" />
      </body>
    </html>
  );
}
