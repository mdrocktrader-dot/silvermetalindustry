"use client"

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";

/*
  Silver Metal Industry — Full Frontend (Phase 2)
  - Animated product grid
  - Product quick-view modal (animated)
  - Responsive mobile menu
  - SEO Head section
  - Placeholders for: WHATSAPP_NUMBER, CONTACT_EMAIL, LOGO

  Replace placeholders:
  - WHATSAPP_NUMBER -> e.g. 971501234567 (no +)
  - CONTACT_EMAIL -> e.g. info@silvermetal.ae
  - /public/logo.png -> add your logo image or keep the text logo
*/

const WHATSAPP_NUMBER = "971XXXXXXXXX"; // replace with your number (no +)
const CONTACT_EMAIL = "info@silvermetal.ae"; // replace with your email

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
    desc: "Cold-rolled mild steel square tube with consistent dimensions, suitable for frames, fences and general structural use. Available in multiple sizes and surface finishes.",
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
      <title>Silver Metal Industry — Building Materials Supplier (Sharjah, UAE)</title>
      <meta name="description" content="Premium aluminium, mild steel, roofing and fencing materials. Quick quotes and delivery across UAE." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Silver Metal Industry — Building Materials Supplier" />
      <meta property="og:description" content="Premium aluminium, mild steel, roofing and fencing materials. Quick quotes and delivery across UAE." />
      <meta property="og:image" content="/hero-warehouse.jpg" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="w-full bg-white/75 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold">SM</div>
            <div className="hidden sm:block">
              <div className="font-bold">Silver Metal Industry</div>
              <div className="text-xs text-slate-600">Sharjah, UAE</div>
            </div>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#products" className="hover:text-slate-900">Products</a>
          <a href="#about" className="hover:text-slate-900">About</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md">
            <Phone size={16} /> WhatsApp
          </a>
        </nav>

        <button className="md:hidden p-2 rounded-md border" onClick={onOpenMenu} aria-label="Open menu">
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30">
          <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring" }} className="w-72 bg-white h-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold">Menu</div>
              <button onClick={onClose} aria-label="Close menu"><X /></button>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#products" onClick={onClose} className="py-2">Products</a>
              <a href="#about" onClick={onClose} className="py-2">About</a>
              <a href="#contact" onClick={onClose} className="py-2">Contact</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md">
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
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-extrabold">Trusted Building Materials — Supplied in the UAE</h1>
          <p className="mt-4 text-slate-600 max-w-xl">Premium aluminium, mild steel, roofing, cladding and fencing products — tailored to contractors, fabricators and wholesalers. Fast quotes, reliable delivery across UAE.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="px-5 py-3 bg-slate-900 text-white rounded-md font-medium">WhatsApp for Prices</a>
            <a href="#products" className="px-5 py-3 border rounded-md text-slate-900">View Products</a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            <Stat label="Years of Experience" value="15+" />
            <Stat label="Product Lines" value="50+" />
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="flex-1">
          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <img src="/hero-warehouse.jpg" alt="warehouse" className="w-full h-64 object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function ProductsGrid({ onOpenModal }: { onOpenModal: (p: any) => void }) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <a href="#catalog" className="text-sm text-slate-600">Download full catalog</a>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <motion.article key={p.id} whileHover={{ y: -6 }} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => onOpenModal(p)}>
            <img src={p.img} alt={p.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{p.short}</p>
                </div>
                <div className="text-sm font-medium">{p.priceRange}</div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); onOpenModal(p); }} className="px-3 py-2 bg-slate-900 text-white rounded-md text-sm">Quick View</button>
                <a onClick={(e) => e.stopPropagation()} href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Silver Metal Industry, please send latest price and delivery for ${p.name}.`)}`} target="_blank" rel="noreferrer" className="px-3 py-2 border rounded-md text-sm">WhatsApp</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProductModal({ product, onClose }: { product: any | null; onClose: () => void }) {
  if (!product) return null;
  const waText = encodeURIComponent(`Hello Silver Metal Industry, please send latest price and delivery for ${product.name}.`);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: "spring" }} className="bg-white rounded-xl max-w-3xl w-full shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={product.img} alt={product.name} className="w-full h-72 object-cover" />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.short}</p>
                </div>
                <button onClick={onClose} aria-label="Close"> <X /> </button>
              </div>

              <p className="mt-4 text-slate-700">{product.desc}</p>

              <ul className="mt-4 text-sm text-slate-600 space-y-1">
                {product.specs.map((s: string, i: number) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <a href={waLink} target="_blank" rel="noreferrer" className="px-4 py-3 bg-green-600 text-white rounded-md inline-flex items-center gap-2">Order via WhatsApp</a>

                <button onClick={() => alert('Request sent — placeholder action')} className="px-4 py-3 border rounded-md">Request Quote</button>

                <div className="ml-auto text-sm font-medium">{product.priceRange}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function About() {
  return (
    <section id="about" className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">About Silver Metal Industry</h3>
            <p className="mt-4 text-slate-600">Based in Sharjah, we supply durable construction materials across UAE — focusing on quality, timely delivery and technical support to contractors and fabricators.</p>

            <ul className="mt-4 space-y-2 text-slate-600">
              <li>• Wide product range: Aluminium, Mild Steel, Roofing & Fencing</li>
              <li>• Bulk orders & custom sizes</li>
              <li>• Quick quotations & logistics support</li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden shadow">
            <img src="/team.jpg" alt="team" className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-3 text-slate-600">For prices, delivery and custom orders — contact our sales team.</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3"><strong>📍</strong><span>Sharjah, UAE</span></div>
            <div className="flex items-center gap-3"><strong>📞</strong><a href={`tel:+${WHATSAPP_NUMBER}`}>+{WHATSAPP_NUMBER}</a></div>
            <div className="flex items-center gap-3"><strong>✉️</strong><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
            <div className="mt-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="px-5 py-3 bg-green-600 text-white rounded-md">Message on WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold">Quick Inquiry</h4>
          <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Lead saved — placeholder'); }}>
            <input name="name" className="w-full border px-3 py-2 rounded" placeholder="Your name" required />
            <input name="phone" className="w-full border px-3 py-2 rounded" placeholder="Phone or WhatsApp" required />
            <textarea name="message" className="w-full border px-3 py-2 rounded" placeholder="Message / product interest" />
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded">Send Inquiry</button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I want prices and delivery info')}`} className="px-4 py-2 border rounded text-slate-900">Send by WhatsApp</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-8 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm">© {new Date().getFullYear()} Silver Metal Industry LLC — Sharjah, UAE</div>
        <div className="text-sm text-slate-600">Built for lead generation • WhatsApp ordering enabled</div>
      </div>
    </footer>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<any | null>(null);

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      <SeoHead />

      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <ProductsGrid onOpenModal={(p: any) => setModalProduct(p)} />
        <About />
        <Contact />
        <Footer />
      </main>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />

      {/* Floating WhatsApp button */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="fixed right-4 bottom-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-green-600 text-white">
        <Phone size={16} /> Chat on WhatsApp
      </a>
    </div>
  );
}
