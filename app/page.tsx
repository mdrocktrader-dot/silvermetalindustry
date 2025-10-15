"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

// ==========================
// Company Info
// ==========================
const COMPANY = {
  name: "Silver Metal Industry LLC",
  location: "Sharjah, UAE",
  whatsapp: "971526551620",
  email: "mdrocktrader@gmail.com",
  tagline:
    "Trusted supplier of Aluminium, Mild Steel, Roofing & Fencing materials across UAE.",
};

// ==========================
// Product List
// ==========================
const PRODUCTS = [
  {
    id: "alu-1",
    name: "Pre-Painted Aluminium Coil",
    short: "Durable pre-painted coil for roofing & cladding.",
    desc: "High-durability pre-painted aluminium coil suitable for roofing, facades and cladding. Available in RAL colors, multiple thicknesses and protective topcoats.",
    specs: ["Width: up to 1250mm", "Thickness: 0.4 - 1.6mm", "Finish: PVDF, Polyester"],
    priceRange: "AED 12 - 30 / m",
  },
  {
    id: "ms-1",
    name: "MS Square Tube",
    short: "Cold-rolled mild steel square tube for structure & fencing.",
    desc: "Cold-rolled mild steel square tube suitable for frames, fences, and structural use. Available in multiple sizes and surface finishes.",
    specs: ["Sizes: 20x20 to 200x200mm", "Grade: IS/EN/ASTM options"],
    priceRange: "AED 25 - 120 / piece",
  },
  {
    id: "roof-1",
    name: "PUR/PIR Sandwich Panel",
    short: "Insulated panels for roofing and walls.",
    desc: "Thermally efficient sandwich panels with PIR/PUR core. Fire-rated variants available. Ideal for warehouses, cold rooms and commercial roofs.",
    specs: ["Thickness: 40mm - 200mm", "Core: PUR/PIR", "Finish: Color coated steel"],
    priceRange: "AED 45 - 200 / m²",
  },
];

// ==========================
// SEO Head
// ==========================
function SeoHead() {
  return (
    <Head>
      <title>{COMPANY.name} — Building Materials Supplier (Sharjah, UAE)</title>
      <meta
        name="description"
        content="Premium aluminium, mild steel, roofing and fencing materials. Quick quotes and delivery across UAE."
      />
      <meta property="og:title" content={COMPANY.name} />
      <meta
        property="og:description"
        content="Premium aluminium, mild steel, roofing and fencing materials."
      />
      <meta property="og:image" content="/hero-warehouse.jpg" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

// ==========================
// Navbar Component
// ==========================
function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold">
            SM
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-slate-900">{COMPANY.name}</div>
            <div className="text-xs text-slate-600">{COMPANY.location}</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#products" className="hover:text-slate-900">
            Products
          </a>
          <a href="#about" className="hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="hover:text-slate-900">
            Contact
          </a>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <Phone size={16} /> WhatsApp
          </a>
        </nav>

        <button
          className="md:hidden p-2 rounded-md border"
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

// ==========================
// Mobile Menu
// ==========================
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30"
        >
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring" }}
            className="w-72 bg-white h-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold">Menu</div>
              <button onClick={onClose}>
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#products" onClick={onClose}>
                Products
              </a>
              <a href="#about" onClick={onClose}>
                About
              </a>
              <a href="#contact" onClick={onClose}>
                Contact
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
              >
                <Phone size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================
// Hero Section
// ==========================
function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold">
            Trusted Building Materials — Supplied Across UAE
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl">{COMPANY.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              className="px-5 py-3 bg-slate-900 text-white rounded-md font-medium"
            >
              WhatsApp for Prices
            </a>
            <a href="#products" className="px-5 py-3 border rounded-md text-slate-900">
              View Products
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src="/hero-warehouse.jpg"
            alt="warehouse"
            className="w-full h-64 rounded-2xl object-cover shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ==========================
// About Section
// ==========================
function About() {
  return (
    <section id="about" className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold">About {COMPANY.name}</h3>
          <p className="mt-4 text-slate-600">
            Based in Sharjah, we supply durable construction materials across UAE —
            focusing on quality, timely delivery, and customer satisfaction.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>• Aluminium, Mild Steel, Roofing & Fencing</li>
            <li>• Bulk orders & custom sizes</li>
            <li>• Quick quotations & logistics support</li>
          </ul>
        </div>
        <img
          src="/team.jpg"
          alt="team"
          className="w-full h-64 object-cover rounded-lg shadow"
        />
      </div>
    </section>
  );
}

// ==========================
// Contact Section
// ==========================
function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-3 text-slate-600">
            For quotations, delivery and bulk orders — contact our sales team.
          </p>
          <div className="mt-6 space-y-3">
            <div>📍 {COMPANY.location}</div>
            <div>
              📞 <a href={`tel:+${COMPANY.whatsapp}`}>+{COMPANY.whatsapp}</a>
            </div>
            <div>
              ✉️ <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 px-5 py-3 bg-green-600 text-white rounded-md"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================
// Footer Section
// ==========================
function Footer() {
  return (
    <footer className="border-t mt-8 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm">
          © {new Date().getFullYear()} {COMPANY.name} — {COMPANY.location}
        </div>
        <div className="text-sm text-slate-600">
          Built for lead generation • WhatsApp ordering enabled
        </div>
      </div>
    </footer>
  );
}

// ==========================
// Export Main Page
// ==========================
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      <SeoHead />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <About />
        <Contact />
        <Footer />
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-green-600 text-white"
      >
        <Phone size={16} /> Chat on WhatsApp
      </a>
    </div>
  );
}
