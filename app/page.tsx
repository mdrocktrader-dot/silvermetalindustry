"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

/*
  Silver Metal Industry — Frontend (Updated Version)
  ✅ Fixed contact info
  ✅ Tailwind ready
  ✅ SEO improved
  ✅ WhatsApp, Email & Contact working
*/

const WHATSAPP_NUMBER = "971526551620"; // ✅ UAE WhatsApp (no +)
const CONTACT_EMAIL = "mdrocktrader@gmail.com"; // ✅ Email

const PRODUCTS = [
  {
    id: "alu-1",
    name: "Pre-Painted Aluminium Coil",
    short: "Durable pre-painted coil for roofing & cladding.",
    desc: "High-durability pre-painted aluminium coil suitable for roofing, facades and cladding. Available in RAL colors, multiple thicknesses and protective topcoats.",
    specs: ["Width: up to 1250mm", "Thickness: 0.4 - 1.6mm", "Finish: PVDF, Polyester"],
    priceRange: "AED 12 - 30 / m",
    img: "/placeholder-product.jpg",
  },
  {
    id: "ms-1",
    name: "MS Square Tube",
    short: "Cold-rolled mild steel square tube for structure & fencing.",
    desc: "Cold-rolled mild steel square tube suitable for frames, fences, and structural use. Available in multiple sizes and surface finishes.",
    specs: ["Sizes: 20x20 to 200x200mm", "Grade: IS/EN/ASTM options"],
    priceRange: "AED 25 - 120 / piece",
    img: "/placeholder-product.jpg",
  },
  {
    id: "roof-1",
    name: "PUR/PIR Sandwich Panel",
    short: "Insulated panels for roofing and walls.",
    desc: "Thermally efficient sandwich panels with PIR/PUR core. Fire-rated variants available. Ideal for warehouses, cold rooms and commercial roofs.",
    specs: ["Thickness: 40mm - 200mm", "Core: PUR/PIR", "Finish: Color coated steel"],
    priceRange: "AED 45 - 200 / m²",
    img: "/placeholder-product.jpg",
  },
];

function SeoHead() {
  return (
    <Head>
      <title>Silver Metal Industry LLC — Building Materials Supplier (Sharjah, UAE)</title>
      <meta
        name="description"
        content="Premium aluminium, mild steel, roofing and fencing materials. Quick quotes and delivery across UAE."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:title"
        content="Silver Metal Industry — Building Materials Supplier"
      />
      <meta
        property="og:description"
        content="Premium aluminium, mild steel, roofing and fencing materials. Quick quotes and delivery across UAE."
      />
      <meta property="og:image" content="/hero-warehouse.jpg" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold">
              SM
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-slate-900">Silver Metal Industry</div>
              <div className="text-xs text-slate-600">Sharjah, UAE</div>
            </div>
          </a>
        </div>

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
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
              <button onClick={onClose} aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#products" onClick={onClose} className="py-2">
                Products
              </a>
              <a href="#about" onClick={onClose} className="py-2">
                About
              </a>
              <a href="#contact" onClick={onClose} className="py-2">
                Contact
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
          <p className="mt-4 text-slate-600 max-w-xl">
            Premium aluminium, mild steel, roofing, cladding and fencing
            materials — for contractors, fabricators and wholesalers.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="px-5 py-3 bg-slate-900 text-white rounded-md font-medium"
            >
              WhatsApp for Prices
            </a>
            <a
              href="#products"
              className="px-5 py-3 border rounded-md text-slate-900"
            >
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
          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/hero-warehouse.jpg"
              alt="warehouse"
              className="w-full h-64 object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold">About Silver Metal Industry</h3>
          <p className="mt-4 text-slate-600">
            Based in Sharjah, we supply durable construction materials across
            UAE — focusing on quality, timely delivery and technical support for
            contractors and fabricators.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>• Aluminium, Mild Steel, Roofing & Fencing</li>
            <li>• Bulk orders & custom sizes</li>
            <li>• Quick quotations & logistics support</li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden shadow">
          <img src="/team.jpg" alt="team" className="w-full h-64 object-cover" />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-3 text-slate-600">
            For prices, delivery and bulk orders — contact our sales team.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <strong>📍</strong>
              <span>Sharjah, UAE</span>
            </div>
            <div className="flex items-center gap-3">
              <strong>📞</strong>
              <a href={`tel:+${WHATSAPP_NUMBER}`}>+{WHATSAPP_NUMBER}</a>
            </div>
            <div className="flex items-center gap-3">
              <strong>✉️</strong>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className="mt-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-green-600 text-white rounded-md"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-8 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm">
          © {new Date().getFullYear()} Silver Metal Industry LLC — Sharjah, UAE
        </div>
        <div className="text-sm text-slate-600">
          Built for lead generation • WhatsApp ordering enabled
        </div>
      </div>
    </footer>
  );
}

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

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-green-600 text-white"
      >
        <Phone size={16} /> Chat on WhatsApp
      </a>
    </div>
  );
}
