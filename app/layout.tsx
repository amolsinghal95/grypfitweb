// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton"; // global floating instance
import { InquiryProvider } from "@/context/InquiryContext";
import InquiryBar from "@/components/InquiryBar";
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const structuredData = [
  buildOrganizationSchema(),
  buildLocalBusinessSchema(),
  buildWebSiteSchema(),
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GRYP.FIT",
  description:
    "GRYP.FIT by Singhal Industries manufactures and supplies gym and sports equipment spare parts from Meerut, India for OEM, wholesale, and bulk requirements.",
  keywords: [
    "gym parts",
    "gym equipment",
    "sports equipment",
    "spare parts",
    "manufacturing",
    "India",
    "Meerut",
    "manufacturer",
    "supplier",
    "pulleys",
    "weights",
    "plates",
  ],
  authors: [{ name: "GRYP.FIT by Singhal Industries" }],
  openGraph: {
    title: "GRYP.FIT",
    description:
      "GRYP.FIT by Singhal Industries manufactures and supplies gym and sports equipment spare parts from Meerut, India.",
    url: SITE_URL,
    siteName: "GRYP.FIT",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRYP.FIT",
    description:
      "GRYP.FIT by Singhal Industries manufactures and supplies gym and sports equipment spare parts from Meerut, India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <InquiryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />

          {/* Global floating WhatsApp button */}
          <WhatsAppButton floating phone="918449291260" />
          
          {/* Floating inquiry bar */}
          <InquiryBar />
        </InquiryProvider>
      </body>
    </html>
  );
}
