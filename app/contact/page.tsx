"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Default prefilled WhatsApp message for contact page
  const defaultMessage = encodeURIComponent(
    "Hello! I'm interested in GRYP.FIT products. Please share details about pricing, availability and lead time. — Sent from the GRYP.FIT website"
  );

  const businessPhone = "918449291260"; // digits only, no + or spaces

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:gryp.fit@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const LAT = 28.9497921;
const LNG = 77.67162;
const PLACE_NAME = "GRYP.FIT - Singhal Industries";

// Embed that uses a q=lat,lng query (usually shows a pin)
const embedSrc = `https://www.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;

// External links
const googleMapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}&travelmode=driving`;
const appleMapsUrl = `https://maps.apple.com/?daddr=${LAT},${LNG}&q=${encodeURIComponent(PLACE_NAME)}`;
const geoUrl = `geo:${LAT},${LNG}?q=${LAT},${LNG}(${encodeURIComponent(PLACE_NAME)})`;

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-gray-400">
            Get in touch with our team for inquiries and custom orders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-primary text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-gray-400">
                    Singhal Industries
                    <br />
                    Mohkampur Phase 1
                    <br />
                    Meerut, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhone className="text-primary text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <a
                    href="tel:+918449291260"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    +91-8449291260
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-primary text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a
                    href="mailto:gryp.fit@gmail.com"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    gryp.fit@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaWhatsapp className="text-primary text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <a
                    // opens WhatsApp chat to business with default message
                    href={`https://wa.me/${businessPhone}?text=${defaultMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Map + actions */}
            <div className="bg-secondary border border-gray-700 rounded-lg overflow-hidden">
              <div className="relative">
                {/* iframe with q=lat,lng to show a pin */}
                <iframe
                  src={embedSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GRYP.FIT Location - Mohkampur Phase 1, Meerut"
                />

                {/* Decorative red pin centered over the iframe (visual only) */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2.5C8.4 2.5 5.5 5.4 5.5 9c0 4.9 5.9 10.6 5.9 10.6s5.9-5.7 5.9-10.6c0-3.6-2.9-6.5-6.3-6.5z" fill="#E11D48"/>
                    <circle cx="12" cy="9" r="2.2" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-3 flex flex-col md:flex-row items-stretch gap-3">
                <a
                  href={googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:opacity-95"
                  aria-label={`Open ${PLACE_NAME} in Google Maps`}
                >
                  Open in Google Maps
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary border border-muted px-4 py-2 rounded-md hover:opacity-95"
                  aria-label={`Open ${PLACE_NAME} in Apple Maps`}
                >
                  Open in Apple Maps
                </a>

                <a
                  href={googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-background border border-muted px-4 py-2 rounded-md hover:opacity-95"
                  aria-label={`Get directions to ${PLACE_NAME}`}
                >
                  Get directions
                </a>

                {/* Optional geo: deep link for native apps (Android) */}
                <a href={geoUrl} className="hidden" aria-hidden />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-secondary border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6">
                <p className="text-sm text-gray-400 text-center">
                  Or reach out directly via WhatsApp for faster response
                </p>
                <a
                  // bottom CTA also opens WhatsApp with the default message
                  href={`https://wa.me/${businessPhone}?text=${defaultMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
