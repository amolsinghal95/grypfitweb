import Link from "next/link";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  // Default prefilled WhatsApp message
  const whatsappMessage = encodeURIComponent(
    "Hello! I’m interested in your products at GRYP.FIT. Please share more details about pricing, availability, and lead time. — Sent from the GRYP.FIT website"
  );

  // Default email subject and body
  const emailSubject = encodeURIComponent("Product Enquiry - GRYP.FIT");
  const emailBody = encodeURIComponent(
    `Hello,\n\nI’m reaching out to learn more about your products at GRYP.FIT.\n\nPlease share details about:\n- Product catalog or categories\n- Pricing and bulk order options\n- Delivery and lead time\n\nThank you,\n[Your Name]\n\n— Sent from the GRYP.FIT website`
  );

  return (
    <footer className="bg-secondary border-t border-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* --- Brand Info --- */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">gryp.fit</h3>
            <p className="text-muted text-sm">Precision. Strength. Trust.</p>
            <p className="text-muted text-sm mt-2">
              Crafting quality spare parts for gym machines and sport equipment since 1995
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Connect With Us --- */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {/* WhatsApp with custom message */}
              <a
                href={`https://wa.me/918449291260?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors text-2xl"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              {/* Email with custom subject & body */}
              <a
                href={`mailto:amolsinghal95@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                className="text-muted hover:text-primary transition-colors text-2xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="text-muted text-sm">
            © 2025 GRYP.FIT - Singhal Industries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
