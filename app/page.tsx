"use client";

import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { jsPDF } from "jspdf";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
// At the very top of your file
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaHome, 
  FaInfoCircle, 
  FaBoxOpen 
} from "react-icons/fa";


interface NavLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  orderCount: number;
}

function Nav({ orderCount }: NavbarProps) {
  const [language, setLanguage] = useState("EN");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleLanguage = () => setLanguage(language === "EN" ? "AR" : "EN");

  const scrollToOrder = () => {
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#products" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks: SocialLink[] = [
    { name: "Facebook", url: "https://facebook.com", icon: <span>📘</span> },
    { name: "Instagram", url: "https://instagram.com", icon: <span>📸</span> },
    { name: "LinkedIn", url: "https://linkedin.com", icon: <span>🔗</span> },
    { name: "YouTube", url: "https://youtube.com", icon: <span>▶️</span> },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm py-2 px-6 flex justify-between items-center">
        <div className="flex gap-4">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-transform transform hover:scale-125"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <button
          onClick={toggleLanguage}
          className="border border-white px-2 py-1 rounded hover:bg-white hover:text-gray-900 transition"
        >
          {language}
        </button>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-md object-contain"
            />
            <div>
              <div className="font-bold text-lg text-slate-900">Company Name</div>
              <div className="text-xs text-slate-600">Sharjah, UAE</div>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-green-600 transition relative group"
              >
                <span className="group-hover:underline">{link.name}</span>
              </a>
            ))}

            <button onClick={scrollToOrder} className="relative">
              <ShoppingCart size={20} />
              {orderCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {orderCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/+971526551620"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={scrollToOrder} className="relative">
              <ShoppingCart size={20} />
              {orderCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {orderCount}
                </span>
              )}
            </button>
            <button
              className="border rounded-md p-2"
              onClick={toggleMobileMenu}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-green-600 transition"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}



// ==============================
// COMPANY DATA
// ==============================
export const COMPANY = {
  name: "Silver Metal Industry LLC",
  location: "Sharjah, UAE",
  whatsapp: "+971526551620",
  email: "mdrocktrader@gmail.com",
  tagline: "High-quality building materials",
  vatPercentage: 5,

  // Social Links
  facebook: "https://www.facebook.com/silvermetal",
  instagram: "https://www.instagram.com/silvermetal",
  linkedin: "https://www.linkedin.com/company/silvermetal",
  youtube: "https://www.youtube.com/@silvermetal",
  twitter: "https://twitter.com/silvermetal", // optional
};

// ==============================
// PRODUCTS
// ==============================
const PRODUCTS = [
  // ================= Aluminium =================
  {
    id: "angle-al",
    category: "Aluminium",
    name: "Angle Aluminium",
    price: 120,
    img: "/mild-steel-001.jpeg",
    images: ["/mild-steel-001.jpeg", "/mild-steel-001.jpeg"],
    specs: { Dimensions: "50x50mm", Thickness: "2mm", Certification: "ISO 9001" },
    bulkPricing: [
      { min: 1, max: 10, price: 120 },
      { min: 11, max: 50, price: 115 },
      { min: 51, max: 9999, price: 110 },
    ],
  },
  {
    id: "prepaint-coil",
    category: "Aluminium",
    name: "Pre-Painted Aluminium Coil/Sheet",
    price: 250,
    img: "/products/prepainted-coil.jpg",
    images: ["/products/prepainted-coil.jpg", "/products/prepainted-coil2.jpg"],
    specs: { Width: "1000mm", Thickness: "0.5mm", Coating: "PVDF" },
    bulkPricing: [
      { min: 1, max: 10, price: 250 },
      { min: 11, max: 50, price: 240 },
      { min: 51, max: 9999, price: 230 },
    ],
  },
  {
    id: "millfinish",
    category: "Aluminium",
    name: "Mill Finish Aluminium Coil/Sheet",
    price: 210,
    img: "aluminium-001.jpg",
    images: ["aluminium-001.jpg", "aluminium-001.jpg"],
    specs: { Width: "1000mm", Thickness: "0.6mm", Finish: "Mill" },
    bulkPricing: [
      { min: 1, max: 10, price: 210 },
      { min: 11, max: 50, price: 205 },
      { min: 51, max: 9999, price: 200 },
    ],
  },

  // ================= Mild Steel =================
  {
    id: "ms-square",
    category: "Mild Steel",
    name: "MS Square Tube",
    price: 180,
    img: "/products/ms-tube.jpg",
    images: ["/products/ms-tube.jpg", "/products/ms-tube2.jpg"],
    specs: { Dimensions: "40x40mm", Thickness: "2mm", Material: "Mild Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 180 },
      { min: 11, max: 50, price: 175 },
      { min: 51, max: 9999, price: 170 },
    ],
  },
  {
    id: "ms-pipe",
    category: "Mild Steel",
    name: "MS Pipes",
    price: 170,
    img: "/products/ms-pipe.jpg",
    images: ["/products/ms-pipe.jpg", "/products/ms-pipe2.jpg"],
    specs: { Diameter: "50mm", Thickness: "2mm", Material: "Mild Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 170 },
      { min: 11, max: 50, price: 165 },
      { min: 51, max: 9999, price: 160 },
    ],
  },
  {
    id: "ms-angle",
    category: "Mild Steel",
    name: "MS Angle",
    price: 160,
    img: "/products/ms-angle.jpg",
    images: ["/products/ms-angle.jpg", "/products/ms-angle2.jpg"],
    specs: { Dimensions: "50x50mm", Thickness: "3mm", Material: "Mild Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 160 },
      { min: 11, max: 50, price: 155 },
      { min: 51, max: 9999, price: 150 },
    ],
  },
  {
    id: "i-beam",
    category: "Mild Steel",
    name: "I Beam",
    price: 300,
    img: "/products/i-beam.jpg",
    images: ["/products/i-beam.jpg", "/products/i-beam2.jpg"],
    specs: { Dimensions: "200x100mm", Material: "Mild Steel", Standard: "ASTM A36" },
    bulkPricing: [
      { min: 1, max: 10, price: 300 },
      { min: 11, max: 50, price: 290 },
      { min: 51, max: 9999, price: 280 },
    ],
  },
  {
    id: "h-beam",
    category: "Mild Steel",
    name: "H Beam",
    price: 310,
    img: "/products/h-beam.jpg",
    images: ["/products/h-beam.jpg", "/products/h-beam2.jpg"],
    specs: { Dimensions: "200x150mm", Material: "Mild Steel", Standard: "ASTM A36" },
    bulkPricing: [
      { min: 1, max: 10, price: 310 },
      { min: 11, max: 50, price: 300 },
      { min: 51, max: 9999, price: 290 },
    ],
  },
  {
    id: "hr-coil",
    category: "Mild Steel",
    name: "HR Coils & Sheets",
    price: 220,
    img: "/products/hr-coil.jpg",
    images: ["/products/hr-coil.jpg", "/products/hr-coil2.jpg"],
    specs: { Thickness: "1mm", Material: "Mild Steel", Standard: "HR" },
    bulkPricing: [
      { min: 1, max: 10, price: 220 },
      { min: 11, max: 50, price: 215 },
      { min: 51, max: 9999, price: 210 },
    ],
  },
  {
    id: "galv-sheet",
    category: "Mild Steel",
    name: "Galvanized Steel Sheets",
    price: 240,
    img: "/products/galv-sheet.jpg",
    images: ["/products/galv-sheet.jpg", "/products/galv-sheet2.jpg"],
    specs: { Thickness: "0.8mm", Coating: "Zinc", Standard: "ISO 1461" },
    bulkPricing: [
      { min: 1, max: 10, price: 240 },
      { min: 11, max: 50, price: 235 },
      { min: 51, max: 9999, price: 230 },
    ],
  },
  {
    id: "prepainted-gi",
    category: "Mild Steel",
    name: "Pre-Painted GI Steel Coils",
    price: 260,
    img: "/products/prepainted-gi.jpg",
    images: ["/products/prepainted-gi.jpg", "/products/prepainted-gi2.jpg"],
    specs: { Width: "1000mm", Coating: "Color Coated", Material: "GI Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 260 },
      { min: 11, max: 50, price: 255 },
      { min: 51, max: 9999, price: 250 },
    ],
  },
  {
    id: "cr-coil",
    category: "Mild Steel",
    name: "Cold Rolled Coils",
    price: 230,
    img: "/products/cr-coil.jpg",
    images: ["/products/cr-coil.jpg", "/products/cr-coil2.jpg"],
    specs: { Thickness: "0.6mm", Material: "Mild Steel", Standard: "CR" },
    bulkPricing: [
      { min: 1, max: 10, price: 230 },
      { min: 11, max: 50, price: 225 },
      { min: 51, max: 9999, price: 220 },
    ],
  },

  // ================= Building Materials =================
  {
    id: "decking",
    category: "Building",
    name: "Galvanized Decking Sheet",
    price: 150,
    img: "/products/decking-sheet.jpg",
    images: ["/products/decking-sheet.jpg", "/products/decking-sheet2.jpg"],
    specs: { Length: "3m", Width: "1m", Material: "Galvanized Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 150 },
      { min: 11, max: 50, price: 145 },
      { min: 51, max: 9999, price: 140 },
    ],
  },
  {
    id: "slotted-channel",
    category: "Building",
    name: "Slotted Channel",
    price: 90,
    img: "/products/slotted-channel.jpg",
    images: ["/products/slotted-channel.jpg", "/products/slotted-channel2.jpg"],
    specs: { Length: "3m", Width: "50mm", Material: "Galvanized Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 90 },
      { min: 11, max: 50, price: 85 },
      { min: 51, max: 9999, price: 80 },
    ],
  },
  {
    id: "non-slotted",
    category: "Building",
    name: "Non-Slotted Channel",
    price: 95,
    img: "/products/non-slotted.jpg",
    images: ["/products/non-slotted.jpg", "/products/non-slotted2.jpg"],
    specs: { Length: "3m", Width: "50mm", Material: "Galvanized Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 95 },
      { min: 11, max: 50, price: 90 },
      { min: 51, max: 9999, price: 85 },
    ],
  },
  {
    id: "u-channel",
    category: "Building",
    name: "Galvanized U Channel",
    price: 110,
    img: "aluminium-001.jpg",
    images: ["aluminium-001.jpg", "aluminium-001.jpg"],
    specs: { Length: "3m", Width: "50mm", Material: "Galvanized Steel" },
    bulkPricing: [
      { min: 1, max: 10, price: 110 },
      { min: 11, max: 50, price: 105 },
      { min: 51, max: 9999, price: 100 },
    ],
  },

  // ================= Roof Cladding =================
  {
    id: "galv-profile",
    category: "Roof Cladding",
    name: "Galvanized Profile Sheet",
    price: 220,
    img: "/products/galv-profile.jpg",
    images: ["/products/galv-profile.jpg", "/products/galv-profile2.jpg"],
    specs: { Length: "6m", Material: "Galvanized Steel", Profile: "Corrugated" },
    bulkPricing: [
      { min: 1, max: 10, price: 220 },
      { min: 11, max: 50, price: 215 },
      { min: 51, max: 9999, price: 210 },
    ],
  },
  // ================= Roof Cladding =================
{
  id: "aluzinc",
  category: "Roof Cladding",
  name: "Alu-Zinc Profile Sheet",
  price: 230,
  img: "/products/aluzinc.jpg",
  images: ["/products/aluzinc.jpg", "/products/aluzinc2.jpg"],
  specs: { Length: "6m", Material: "Alu-Zinc Steel", Coating: "Galvalume" },
  bulkPricing: [
    { min: 1, max: 10, price: 230 },
    { min: 11, max: 50, price: 225 },
    { min: 51, max: 9999, price: 220 },
  ],
},
{
  id: "aluminium-profile",
  category: "Roof Cladding",
  name: "Aluminium Profile Sheet",
  price: 250,
  img: "/products/aluminium-profile.jpg",
  images: ["/products/aluminium-profile.jpg", "/products/aluminium-profile2.jpg"],
  specs: { Length: "6m", Material: "Aluminium", Profile: "Corrugated" },
  bulkPricing: [
    { min: 1, max: 10, price: 250 },
    { min: 11, max: 50, price: 245 },
    { min: 51, max: 9999, price: 240 },
  ],
},
{
  id: "pur-panel",
  category: "Roof Cladding",
  name: "PUR Sandwich Panel",
  price: 400,
  img: "/products/pur-panel.jpg",
  images: ["/products/pur-panel.jpg", "/products/pur-panel2.jpg"],
  specs: { Thickness: "50mm", Core: "PUR Foam", Facing: "Galvanized Steel" },
  bulkPricing: [
    { min: 1, max: 10, price: 400 },
    { min: 11, max: 50, price: 390 },
    { min: 51, max: 9999, price: 380 },
  ],
},
{
  id: "pir-panel",
  category: "Roof Cladding",
  name: "PIR Sandwich Panel",
  price: 420,
  img: "/products/pir-panel.jpg",
  images: ["/products/pir-panel.jpg", "/products/pir-panel2.jpg"],
  specs: { Thickness: "50mm", Core: "PIR Foam", Facing: "Aluminium Sheet" },
  bulkPricing: [
    { min: 1, max: 10, price: 420 },
    { min: 11, max: 50, price: 410 },
    { min: 51, max: 9999, price: 400 },
  ],
},
{
  id: "pur-wall",
  category: "Roof Cladding",
  name: "PUR Wall Panel",
  price: 380,
  img: "/products/pur-wall.jpg",
  images: ["/products/pur-wall.jpg", "/products/pur-wall2.jpg"],
  specs: { Thickness: "40mm", Core: "PUR Foam", Facing: "Galvanized Steel" },
  bulkPricing: [
    { min: 1, max: 10, price: 380 },
    { min: 11, max: 50, price: 370 },
    { min: 51, max: 9999, price: 360 },
  ],
},
{
  id: "pir-wall",
  category: "Roof Cladding",
  name: "PIR Wall Panel",
  price: 390,
  img: "/products/pir-wall.jpg",
  images: ["/products/pir-wall.jpg", "/products/pir-wall2.jpg"],
  specs: { Thickness: "40mm", Core: "PIR Foam", Facing: "Aluminium Sheet" },
  bulkPricing: [
    { min: 1, max: 10, price: 390 },
    { min: 11, max: 50, price: 380 },
    { min: 51, max: 9999, price: 370 },
  ],
},
{
  id: "tile-sheet",
  category: "Roof Cladding",
  name: "Tile Profile Sheet",
  price: 270,
  img: "/products/tile-sheet.jpg",
  images: ["/products/tile-sheet.jpg", "/products/tile-sheet2.jpg"],
  specs: { Length: "6m", Material: "Galvanized Steel", Profile: "Tile Shape" },
  bulkPricing: [
    { min: 1, max: 10, price: 270 },
    { min: 11, max: 50, price: 260 },
    { min: 51, max: 9999, price: 250 },
  ],
},
{
  id: "purlin",
  category: "Roof Cladding",
  name: "Metal Z & C Purlin",
  price: 310,
  img: "/products/purlin.jpg",
  images: ["/products/purlin.jpg", "/products/purlin2.jpg"],
  specs: { Length: "6m", Material: "Galvanized Steel", Type: "Z/C Purlin" },
  bulkPricing: [
    { min: 1, max: 10, price: 310 },
    { min: 11, max: 50, price: 300 },
    { min: 51, max: 9999, price: 290 },
  ],
},
{
  id: "accessories",
  category: "Roof Cladding",
  name: "Roofing Accessories",
  price: 90,
  img: "/products/accessories.jpg",
  images: ["/products/accessories.jpg", "/products/accessories2.jpg"],
  specs: { Type: "Fasteners, Clips, Sealants" },
  bulkPricing: [
    { min: 1, max: 10, price: 90 },
    { min: 11, max: 50, price: 85 },
    { min: 51, max: 9999, price: 80 },
  ],
},
{
  id: "translucent",
  category: "Roof Cladding",
  name: "Translucent Sheet",
  price: 200,
  img: "/products/translucent.jpg",
  images: ["/products/translucent.jpg", "/products/translucent2.jpg"],
  specs: { Length: "6m", Material: "Polycarbonate", Thickness: "2mm" },
  bulkPricing: [
    { min: 1, max: 10, price: 200 },
    { min: 11, max: 50, price: 190 },
    { min: 51, max: 9999, price: 180 },
  ],
},

// ================= Fencing =================
{
  id: "temporary-hoarding",
  category: "Fencing",
  name: "Temporary Hoarding Panels",
  price: 100,
  img: "/products/temporary-hoarding.jpg",
  images: ["/products/temporary-hoarding.jpg", "/products/temporary-hoarding2.jpg"],
  specs: { Height: "2m", Material: "Galvanized Steel" },
  bulkPricing: [
    { min: 1, max: 10, price: 100 },
    { min: 11, max: 50, price: 95 },
    { min: 51, max: 9999, price: 90 },
  ],
},
{
  id: "high-security-fence",
  category: "Fencing",
  name: "High Security Chain Link Fence",
  price: 300,
  img: "/products/high-security-fence.jpg",
  images: ["/products/high-security-fence.jpg", "/products/high-security-fence2.jpg"],
  specs: { Height: "2.5m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 300 },
    { min: 11, max: 50, price: 290 },
    { min: 51, max: 9999, price: 280 },
  ],
},
{
  id: "chain-link-gate",
  category: "Fencing",
  name: "Chain Link Fence Gate",
  price: 200,
  img: "/products/chain-link-gate.jpg",
  images: ["/products/chain-link-gate.jpg", "/products/chain-link-gate2.jpg"],
  specs: { Width: "3m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 200 },
    { min: 11, max: 50, price: 190 },
    { min: 51, max: 9999, price: 180 },
  ],
},
{
  id: "chain-link-fence",
  category: "Fencing",
  name: "Chain Link Fence",
  price: 180,
  img: "/products/chain-link-fence.jpg",
  images: ["/products/chain-link-fence.jpg", "/products/chain-link-fence2.jpg"],
  specs: { Height: "2m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 180 },
    { min: 11, max: 50, price: 170 },
    { min: 51, max: 9999, price: 160 },
  ],
},
{
  id: "sand-barrier-fence",
  category: "Fencing",
  name: "Sand Barrier Fence",
  price: 150,
  img: "/products/sand-barrier-fence.jpg",
  images: ["/products/sand-barrier-fence.jpg", "/products/sand-barrier-fence2.jpg"],
  specs: { Height: "1.5m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 150 },
    { min: 11, max: 50, price: 145 },
    { min: 51, max: 9999, price: 140 },
  ],
},
{
  id: "fence-wires",
  category: "Fencing",
  name: "Fence Wires & Accessories",
  price: 90,
  img: "/products/fence-wires.jpg",
  images: ["/products/fence-wires.jpg", "/products/fence-wires2.jpg"],
  specs: { Type: "Wire Rolls, Clips, Fasteners", Material: "Steel" },
  bulkPricing: [
    { min: 1, max: 10, price: 90 },
    { min: 11, max: 50, price: 85 },
    { min: 51, max: 9999, price: 80 },
  ],
},
{
  id: "playground-fence",
  category: "Fencing",
  name: "Playground Chain Link Fence",
  price: 220,
  img: "/products/playground-fence.jpg",
  images: ["/products/playground-fence.jpg", "/products/playground-fence2.jpg"],
  specs: { Height: "2m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 220 },
    { min: 11, max: 50, price: 210 },
    { min: 51, max: 9999, price: 200 },
  ],
},
{
  id: "wall-mounted-fence",
  category: "Fencing",
  name: "Wall Mounted Chain Link Fence",
  price: 250,
  img: "/products/wall-mounted-fence.jpg",
  images: ["/products/wall-mounted-fence.jpg", "/products/wall-mounted-fence2.jpg"],
  specs: { Height: "2m", Material: "Steel", Coating: "Galvanized" },
  bulkPricing: [
    { min: 1, max: 10, price: 250 },
    { min: 11, max: 50, price: 240 },
    { min: 51, max: 9999, price: 230 },
  ],
},

];
const CATEGORIES = ["All", "Aluminium", "Mild Steel", "Building", "Roof Cladding", "Fencing"];

// ==============================
// SEO
// ==============================
function SeoHead() {
  return (
    <Head>
      <title>{COMPANY.name} — Building Materials Supplier UAE</title>
      <meta name="description" content="Premium aluminium, mild steel, roofing and fencing materials supplier in UAE. Contact Silver Metal Industry for quality and reliability." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

function Navbar({ onOpenMenu, orderCount, scrollToOrder }) {
  return (
    <header className="w-full bg-white/90 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-md object-contain" />
          <div>
            <div className="font-bold text-lg text-slate-900">{COMPANY.name}</div>
            <div className="text-xs text-slate-600">{COMPANY.location}</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#products" className="hover:text-slate-900">
            Products
          </a>
          <a href="#order" className="hover:text-slate-900">
            Order
          </a>
          <button onClick={scrollToOrder} className="relative">
            <ShoppingCart size={20} />
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {orderCount}
              </span>
            )}
          </button>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            WhatsApp
          </a>
        </nav>
        <div className="flex md:hidden items-center gap-3">
          <button onClick={scrollToOrder} className="relative">
            <ShoppingCart size={20} />
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {orderCount}
              </span>
            )}
          </button>
          <button className="border rounded-md p-2" onClick={onOpenMenu}>
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ==============================
// MOBILE MENU
// ==============================
function MobileMenu({ open, onClose, orderCount, scrollToOrder }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed inset-0 bg-white z-50 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Menu</h3>
            <div className="flex items-center gap-3">
              <button onClick={scrollToOrder} className="relative">
                <ShoppingCart size={20} />
                {orderCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{orderCount}</span>
                )}
              </button>
              <button onClick={onClose}><X size={20} /></button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#products" onClick={onClose}>Products</a>
            <a href="#order" onClick={onClose}>Order</a>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-4 py-2 mt-4 bg-green-600 text-white rounded-md">WhatsApp</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==============================
// HERO
// ==============================
function Hero() {
  return (
    <section className="relative text-white bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold">{COMPANY.name}</motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">{COMPANY.tagline}</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold">Chat on WhatsApp</a>
          <a href="#products" className="px-6 py-3 border rounded-md text-white">View Products</a>
        </div>
      </div>
    </section>
  );
}

// // ==============================
// // PRODUCT CATALOG
// // ==============================
// function ProductCatalog({ orderItems, setOrderItems }) {
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [specOpen, setSpecOpen] = useState({});

//   const filtered = useMemo(() => {
//     let list = PRODUCTS.filter(
//       (p) =>
//         (category === "All" || p.category === category) &&
//         p.name.toLowerCase().includes(search.toLowerCase())
//     );
//     if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
//     if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
//     return list;
//   }, [category, search, sort]);

//   const handleAddToCart = (product) => {
//     const qty = parseInt(prompt(`Enter quantity for ${product.name}:`, "1") || "0");
//     if (!qty || qty < 1) return;

//     let price = product.price;
//     if (product.bulkPricing) {
//       for (let tier of product.bulkPricing) {
//         if (qty >= tier.min && qty <= tier.max) price = tier.price;
//       }
//       const lastTier = product.bulkPricing[product.bulkPricing.length - 1];
//       if (qty > lastTier.max) price = lastTier.price;
//     }

//     const existing = orderItems.find((item) => item.id === product.id);
//     if (existing) {
//       setOrderItems(orderItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty, price } : item));
//     } else {
//       setOrderItems([...orderItems, { ...product, quantity: qty, price }]);
//     }
//     alert(`${product.name} added to cart`);
//   };

//   return (
//     <section id="products" className="max-w-7xl mx-auto px-6 py-20">
//       <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

//       {/* Filter & Search */}
//       <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
//         <div className="flex flex-wrap gap-2">
//           {CATEGORIES.map((c) => (
//             <button
//               key={c}
//               onClick={() => setCategory(c)}
//               className={`px-4 py-2 rounded-full border transition ${
//                 c === category
//                   ? "bg-green-600 text-white border-green-600"
//                   : "border-slate-300 hover:bg-slate-100"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-3 items-center">
//           <div className="flex items-center border rounded-md px-2">
//             <Search size={16} className="text-slate-500" />
//             <input
//               type="text"
//               placeholder="Search product..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="p-2 outline-none text-sm"
//             />
//           </div>
//           <select
//             className="border rounded-md p-2 text-sm"
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="">Sort by</option>
//             <option value="low">Price: Low → High</option>
//             <option value="high">Price: High → Low</option>
//           </select>
//         </div>
//       </div>

//       <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         <AnimatePresence>
//           {filtered.map((p) => (
//             <motion.div
//               key={p.id}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
//             >
//               <Zoom>
//                 <img src={p.img} alt={p.name} className="h-44 w-full object-cover cursor-zoom-in" />
//               </Zoom>

//               {/* Multiple images */}
//               {p.images && p.images.length > 0 && (
//                 <div className="flex gap-2 mt-2 overflow-x-auto px-2">
//                   {p.images.map((img, idx) => (
//                     <Zoom key={idx}>
//                       <img src={img} alt={`${p.name}-${idx}`} className="h-20 w-20 object-cover rounded cursor-zoom-in" />
//                     </Zoom>
//                   ))}
//                 </div>
//               )}

//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{p.name}</h3>
//                 <p className="text-sm text-slate-500 mt-1">{p.category}</p>
//                 <p className="text-green-600 font-bold mt-2">AED {p.price}</p>

//                 {/* Bulk pricing display */}
//                 {p.bulkPricing && (
//                   <div className="text-sm text-slate-600 mt-2">
//                     <strong>Bulk Pricing:</strong>
//                     <ul>
//                       {p.bulkPricing.map((tier, idx) => (
//                         <li key={idx}>
//                           {tier.min} - {tier.max}: AED {tier.price}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Technical specs */}
//                 {p.specs && (
//                   <div className="text-sm text-slate-600 mt-2">
//                     <button
//                       onClick={() => setSpecOpen({ ...specOpen, [p.id]: !specOpen[p.id] })}
//                       className="underline text-blue-600 text-sm"
//                     >
//                       {specOpen[p.id] ? "Hide Specs" : "Show Specs"}
//                     </button>
//                     {specOpen[p.id] && (
//                       <ul className="mt-1 space-y-1">
//                         {Object.entries(p.specs).map(([key, val]) => (
//                           <li key={key}><strong>{key}:</strong> {val}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 )}

//                 <div className="mt-4 flex flex-col gap-2">
//                   {/* WhatsApp Inquire */}
//                  <a
//   href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
//     `Hello ${COMPANY.name},\nI am interested in this product:\n\nName: ${p.name}\nPrice: AED ${p.price}\nImage: ${typeof window !== "undefined" ? window.location.origin : ""}${p.img}`
//   )}`}
//   target="_blank"
//   className="inline-block w-full text-center bg-green-600 text-white rounded-md py-2 text-sm"
// >
//   Inquire on WhatsApp
// </a>

//                   {/* Email Inquire */}
//                   <a
//                     href={`mailto:${COMPANY.email}?subject=Inquiry about ${encodeURIComponent(
//                       p.name
//                     )}&body=${encodeURIComponent(
//                       `Hello ${COMPANY.name},\n\nI am interested in this product:\n\nName: ${p.name}\nPrice: AED ${p.price}\n\n<img src="${window.location.origin}${p.img}" alt="${p.name}" style="width:300px;"/>`
//                     )}`}
//                     className="inline-block w-full text-center bg-blue-600 text-white rounded-md py-2 text-sm"
//                   >
//                     Inquire via Email
//                   </a>

//                   <button
//                     onClick={() => handleAddToCart(p)}
//                     className="inline-block w-full text-center bg-gray-600 text-white rounded-md py-2 text-sm"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {filtered.length === 0 && (
//         <p className="text-center text-slate-500 mt-20">No products found.</p>
//       )}
//     </section>
//   );
// }

// ==============================
// PRODUCT CATALOG
// ==============================
function ProductCatalog({ orderItems, setOrderItems }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [specOpen, setSpecOpen] = useState({});

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const handleAddToCart = (product) => {
    const qty = parseInt(prompt(`Enter quantity for ${product.name}:`, "1") || "0");
    if (!qty || qty < 1) return;

    let price = product.price;
    if (product.bulkPricing) {
      for (let tier of product.bulkPricing) {
        if (qty >= tier.min && qty <= tier.max) price = tier.price;
      }
      const lastTier = product.bulkPricing[product.bulkPricing.length - 1];
      if (qty > lastTier.max) price = lastTier.price;
    }

    const existing = orderItems.find((item) => item.id === product.id);
    if (existing) {
      setOrderItems(orderItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + qty, price } : item)));
    } else {
      setOrderItems([...orderItems, { ...product, quantity: qty, price }]);
    }
    alert(`${product.name} added to cart`);
  };

  const handleInquireWhatsApp = (product) => {
    const message = `Hello, I want to inquire about ${product.name}.`;
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

      {/* Filter & Search */}
      <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full border transition ${c === category ? "bg-green-600 text-white border-green-600" : "border-slate-300 hover:bg-slate-100"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center border rounded-md px-2">
            <Search size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 outline-none text-sm"
            />
          </div>
          <select className="border rounded-md p-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Zoom>
                <img src={p.img} alt={p.name} className="h-44 w-full object-cover cursor-zoom-in" />
              </Zoom>

              {p.images && p.images.length > 0 && (
                <div className="flex overflow-x-auto gap-1 p-1">
                  {p.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="h-16 w-16 object-cover rounded cursor-pointer" />
                  ))}
                </div>
              )}

              <div className="p-4 flex flex-col gap-2">
                <div className="font-semibold">{p.name}</div>
                <div className="text-green-600 font-bold">AED {p.price}</div>
                {p.specs && (
                  <button
                    onClick={() => setSpecOpen({ ...specOpen, [p.id]: !specOpen[p.id] })}
                    className="text-sm text-blue-600 underline"
                  >
                    {specOpen[p.id] ? "Hide Specs" : "Show Specs"}
                  </button>
                )}
                {specOpen[p.id] && (
                  <ul className="text-xs mt-1 space-y-1">
                    {Object.entries(p.specs).map(([k, v]) => (
                      <li key={k}>
                        <strong>{k}:</strong> {v}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Buttons */}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleInquireWhatsApp(p)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md"
                  >
                  WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ==============================
// ORDER / INVOICE
// ==============================
function OrderInvoice({ orderItems, setOrderItems, orderRef }) {
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "", address: "" });

  const handleClientChange = (e) => setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  const removeItem = (id) => setOrderItems(orderItems.filter(item => item.id !== id));

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = (subtotal * COMPANY.vatPercentage) / 100;
  const total = subtotal + vat;

  const handleDownloadPDF = () => {
    if (!clientInfo.name) return alert("Please enter client name");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${clientInfo.name} Invoice`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Client Name: ${clientInfo.name}`, 14, 28);
    doc.text(`Phone: ${clientInfo.phone}`, 14, 36);
    doc.text(`Address: ${clientInfo.address}`, 14, 44);
    let y = 54;
    orderItems.forEach(item => {
      doc.text(`${item.name} x ${item.quantity} = AED ${item.price * item.quantity}`, 14, y);
      y += 8;
    });
    doc.text(`Subtotal: AED ${subtotal}`, 14, y); y+=6;
    doc.text(`VAT (${COMPANY.vatPercentage}%): AED ${vat}`, 14, y); y+=6;
    doc.text(`Total: AED ${total}`, 14, y);
    doc.save(`${clientInfo.name}_Invoice.pdf`);
  };

  const handleDownloadWord = async () => {
    if (!clientInfo.name) return alert("Please enter client name");
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ children: [new TextRun({ text: `${clientInfo.name} Invoice`, bold: true, size: 28 })] }),
          new Paragraph(`Client Name: ${clientInfo.name}`),
          new Paragraph(`Phone: ${clientInfo.phone}`),
          new Paragraph(`Address: ${clientInfo.address}`),
          ...orderItems.map(item => new Paragraph(`${item.name} x ${item.quantity} = AED ${item.price * item.quantity}`)),
          new Paragraph(`Subtotal: AED ${subtotal}`),
          new Paragraph(`VAT (${COMPANY.vatPercentage}%): AED ${vat}`),
          new Paragraph(`Total: AED ${total}`)
        ]
      }]
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${clientInfo.name}_Invoice.docx`);
  };

  const handleWhatsAppOrder = () => {
    if (!clientInfo.name) return alert("Please enter client name");
    let text = `Hello ${COMPANY.name},\nI want to place an order:\nClient Name: ${clientInfo.name}\nPhone: ${clientInfo.phone}\nAddress: ${clientInfo.address}\n`;
    orderItems.forEach(item => text += `${item.name} x ${item.quantity} = AED ${item.price * item.quantity}\n`);
    text += `Subtotal: AED ${subtotal}\nVAT (${COMPANY.vatPercentage}%): AED ${vat}\nTotal: AED ${total}`;
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

   return (
    <section ref={orderRef} id="order" className="max-w-5xl mx-auto px-6 py-20 bg-gray-50 rounded-2xl shadow-md mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">Place Your Order / Invoice</h2>

      {/* Client Info */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input type="text" name="name" placeholder="Client Name" value={clientInfo.name} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
        <input type="text" name="phone" placeholder="Phone Number" value={clientInfo.phone} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
        <input type="text" name="address" placeholder="Address" value={clientInfo.address} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
      </div>

      {/* Order Table */}
      {orderItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Price (AED)</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total (AED)</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.price * item.quantity}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => removeItem(item.id)} className="text-red-600 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="text-right mt-4 space-y-1">
            <p>Subtotal: AED {subtotal}</p>
            <p>VAT ({COMPANY.vatPercentage}%): AED {vat}</p>
            <p className="font-bold">Total: AED {total}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button onClick={handleWhatsAppOrder} className="bg-green-600 text-white px-6 py-2 rounded-md">Send via WhatsApp</button>
            <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-6 py-2 rounded-md">Download PDF</button>
            <button onClick={handleDownloadWord} className="bg-gray-600 text-white px-6 py-2 rounded-md">Download Word</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in the order yet. Add products from the catalog.</p>
      )}
    </section>
  );
}





// ==============================
// CONTACT
// ==============================

function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Optional: integrate with email API here
    alert("Thank you! Your message has been sent.");

    // Reset form safely
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          className="flex flex-col justify-center gap-4 text-slate-700"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="flex items-center gap-2">
            <span className="font-semibold">Email:</span>
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-green-600 hover:underline transition"
            >
              {COMPANY.email}
            </a>
          </p>

          <p className="flex items-center gap-2">
            <span className="font-semibold">WhatsApp:</span>
            <a
              href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline transition"
            >
              {COMPANY.whatsapp}
            </a>
          </p>

          <p className="flex items-center gap-2">
            <span className="font-semibold">Location:</span> {COMPANY.location}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            {COMPANY.facebook && (
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition text-xl"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {COMPANY.instagram && (
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition text-xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {COMPANY.linkedin && (
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition text-xl"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {COMPANY.youtube && (
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition text-xl"
              >
                <i className="fab fa-youtube"></i>
              </a>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-4 mt-6">
            <motion.a
              href={`mailto:${COMPANY.email}`}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Send Email
            </motion.a>
            <motion.a
              href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              WhatsApp Message
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="bg-white shadow-xl rounded-xl p-8 flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            required
          />
          <textarea
            placeholder="Your Message"
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition resize-none h-32"
            required
          ></textarea>
          <motion.button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-md mt-2 hover:bg-green-700 shadow-md transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      {/* Map Section */}
      <motion.div
        className="mt-16 md:mt-24 max-w-6xl mx-auto px-6 h-64 md:h-96 rounded-xl overflow-hidden shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <iframe
          title="Company Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            COMPANY.location
          )}&output=embed`}
          className="w-full h-full border-0 rounded-xl"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </motion.div>
    </section>
  );
}

// ==============================
// FOOTER
// ==============================


export function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, url: COMPANY.facebook },
    { name: "Instagram", icon: <FaInstagram />, url: COMPANY.instagram },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: COMPANY.linkedin },
    { name: "YouTube", icon: <FaYoutube />, url: COMPANY.youtube },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}` },
  ];

  const quickLinks = [
    { name: "Home", href: "#", icon: <FaHome /> },
    { name: "About Us", href: "#about", icon: <FaInfoCircle /> },
    { name: "Products", href: "#products", icon: <FaBoxOpen /> },
    { name: "Services", href: "#services", icon: <FaBoxOpen /> },
    { name: "Contact", href: "#contact", icon: <FaEnvelope /> },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Company Info */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">{COMPANY.name}</h2>
          <p className="text-gray-400 text-center md:text-left">
            Trusted provider of high-quality building materials with years of experience and loyalty to our clients.
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-2"><FaPhone /> {COMPANY.whatsapp}</p>
          <p className="flex items-center gap-2 text-gray-400"><FaEnvelope /> {COMPANY.email}</p>
          <p className="flex items-center gap-2 text-gray-400"><FaHome /> {COMPANY.location}</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors"
              >
                {link.icon} <span className="text-sm">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            {socialLinks.map((s) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-green-500 transition-colors"
                title={s.name}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-800 text-gray-500 text-sm text-center py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:rotate-6 transition-transform z-50"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <FaWhatsapp size={24} />
      </motion.a>
    </footer>
  );
}







// ==============================
// MAIN PAGE
// ==============================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const orderRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    if (orderRef.current) orderRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SeoHead />
      <Navbar onOpenMenu={() => setMenuOpen(true)} orderCount={orderItems.length} scrollToOrder={scrollToOrder} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} orderCount={orderItems.length} scrollToOrder={scrollToOrder} />
      <Hero />
      <ProductCatalog orderItems={orderItems} setOrderItems={setOrderItems} />
      <OrderInvoice orderItems={orderItems} setOrderItems={setOrderItems} orderRef={orderRef} />
      <Contact />
      <Footer />
    </>
  );
}
