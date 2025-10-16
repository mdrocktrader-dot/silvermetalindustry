"use client";

import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { jsPDF } from "jspdf";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// ==============================
// COMPANY INFO
// ==============================
const COMPANY = {
  name: "Silver Metal Industry LLC",
  location: "Sharjah, UAE",
  whatsapp: "971526551620",
  email: "mdrocktrader@gmail.com",
  tagline: "Supplier of Aluminium, Mild Steel, Roofing & Building Materials in UAE.",
  vatPercentage: 5,
};

// ==============================
// PRODUCTS
// ==============================
const PRODUCTS = [
  {
    id: "angle-al",
    category: "Aluminium",
    name: "Angle Aluminium",
    price: 120,
    img: "/products/aluminium-angle.jpg",
    images: ["/products/aluminium-angle.jpg", "/products/aluminium-angle2.jpg"],
    specs: { Dimensions: "50x50mm", Thickness: "2mm", Certification: "ISO 9001" },
    bulkPricing: [
      { min: 1, max: 10, price: 120 },
      { min: 11, max: 50, price: 115 },
      { min: 51, max: 9999, price: 110 },
    ],
  },
  // ... Add all your other products here
];

const CATEGORIES = ["All", "Aluminium", "Mild Steel", "Building", "Roof Cladding", "Fencing"];

// ==============================
// SEO
// ==============================
function SeoHead() {
  return (
    <Head>
      <title>{COMPANY.name} — Building Materials Supplier UAE</title>
      <meta
        name="description"
        content="Premium aluminium, mild steel, roofing and fencing materials supplier in UAE. Contact Silver Metal Industry for quality and reliability."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

// ==============================
// NAVBAR
// ==============================
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
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {orderCount}
                  </span>
                )}
              </button>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#products" onClick={onClose}>
              Products
            </a>
            <a href="#order" onClick={onClose}>
              Order
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 mt-4 bg-green-600 text-white rounded-md"
            >
              WhatsApp
            </a>
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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          {COMPANY.name}
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">{COMPANY.tagline}</p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold"
          >
            Chat on WhatsApp
          </a>
          <a href="#products" className="px-6 py-3 border rounded-md text-white">
            View Products
          </a>
        </div>
      </div>
    </section>
  );
}

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
                <button onClick={() => handleAddToCart(p)} className="mt-2 bg-green-600 text-white py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ==============================
// ORDER INVOICE
// ==============================
function OrderInvoice({ orderItems, setOrderItems, orderRef }) {
  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = (total * COMPANY.vatPercentage) / 100;
  const grandTotal = total + vat;

  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;
    const doc = new jsPDF();
    doc.text("Invoice - " + COMPANY.name, 10, 10);
    orderItems.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.name} x${item.quantity} = AED ${item.price * item.quantity}`, 10, 20 + i * 10);
    });
    doc.text(`Total: AED ${total}`, 10, 30 + orderItems.length * 10);
    doc.text(`VAT (${COMPANY.vatPercentage}%): AED ${vat}`, 10, 40 + orderItems.length * 10);
    doc.text(`Grand Total: AED ${grandTotal}`, 10, 50 + orderItems.length * 10);
    doc.save("invoice.pdf");
  };

  return (
    <section id="order" ref={orderRef} className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Your Order</h2>
      {orderItems.length === 0 && <p className="text-center text-slate-500">No items in your cart</p>}
      {orderItems.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, i) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">AED {item.price}</td>
                  <td className="border p-2">AED {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right space-y-1">
            <div>Total: AED {total}</div>
            <div>VAT ({COMPANY.vatPercentage}%): AED {vat}</div>
            <div className="font-bold">Grand Total: AED {grandTotal}</div>
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Download PDF
            </button>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hello, I want to order AED ${grandTotal} worth of items.`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

// ==============================
// CONTACT
// ==============================
function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-600">{COMPANY.email}</a></p>
      <p>WhatsApp: <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="text-green-600">{COMPANY.whatsapp}</a></p>
    </section>
  );
}

// ==============================
// FOOTER
// ==============================
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 text-center">
      &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
    </footer>
  );
}

// ==============================
// MAIN PAGE
// ==============================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const orderRef = useRef(null);

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
