"use client";

import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search, ShoppingCart } from "lucide-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { jsPDF } from "jspdf";

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
  { id: "angle-al", category: "Aluminium", name: "Angle Aluminium", price: 120, img: "/products/aluminium-angle.jpg" },
  { id: "prepaint-coil", category: "Aluminium", name: "Pre-Painted Aluminium Coil/Sheet", price: 250, img: "/products/prepainted-coil.jpg" },
  { id: "millfinish", category: "Aluminium", name: "Mill Finish Aluminium Coil/Sheet", price: 210, img: "/products/millfinish.jpg" },
  { id: "ms-square", category: "Mild Steel", name: "MS Square Tube", price: 180, img: "/products/ms-tube.jpg" },
  { id: "ms-pipe", category: "Mild Steel", name: "MS Pipes", price: 170, img: "/products/ms-pipe.jpg" },
  { id: "ms-angle", category: "Mild Steel", name: "MS Angle", price: 160, img: "/products/ms-angle.jpg" },
  { id: "i-beam", category: "Mild Steel", name: "I Beam", price: 300, img: "/products/i-beam.jpg" },
  { id: "h-beam", category: "Mild Steel", name: "H Beam", price: 310, img: "/products/h-beam.jpg" },
  { id: "hr-coil", category: "Mild Steel", name: "HR Coils & Sheets", price: 220, img: "/products/hr-coil.jpg" },
  { id: "galv-sheet", category: "Mild Steel", name: "Galvanized Steel Sheets", price: 240, img: "/products/galv-sheet.jpg" },
  { id: "prepainted-gi", category: "Mild Steel", name: "Pre-Painted GI Steel Coils", price: 260, img: "/products/prepainted-gi.jpg" },
  { id: "cr-coil", category: "Mild Steel", name: "Cold Rolled Coils", price: 230, img: "/products/cr-coil.jpg" },
  { id: "decking", category: "Building", name: "Galvanized Decking Sheet", price: 150, img: "/products/decking-sheet.jpg" },
  { id: "slotted-channel", category: "Building", name: "Slotted Channel", price: 90, img: "/products/slotted-channel.jpg" },
  { id: "non-slotted", category: "Building", name: "Non-Slotted Channel", price: 95, img: "/products/non-slotted.jpg" },
  { id: "u-channel", category: "Building", name: "Galvanized U Channel", price: 110, img: "/products/u-channel.jpg" },
  { id: "galv-profile", category: "Roof Cladding", name: "Galvanized Profile Sheet", price: 220, img: "/products/galv-profile.jpg" },
  { id: "aluzinc", category: "Roof Cladding", name: "Alu-Zinc Profile Sheet", price: 230, img: "/products/aluzinc.jpg" },
  { id: "aluminium-profile", category: "Roof Cladding", name: "Aluminium Profile Sheet", price: 250, img: "/products/aluminium-profile.jpg" },
  { id: "pur-panel", category: "Roof Cladding", name: "PUR Sandwich Panel", price: 400, img: "/products/pur-panel.jpg" },
  { id: "pir-panel", category: "Roof Cladding", name: "PIR Sandwich Panel", price: 420, img: "/products/pir-panel.jpg" },
  { id: "pur-wall", category: "Roof Cladding", name: "PUR Wall Panel", price: 380, img: "/products/pur-wall.jpg" },
  { id: "pir-wall", category: "Roof Cladding", name: "PIR Wall Panel", price: 390, img: "/products/pir-wall.jpg" },
  { id: "tile-sheet", category: "Roof Cladding", name: "Tile Profile Sheet", price: 270, img: "/products/tile-sheet.jpg" },
  { id: "purlin", category: "Roof Cladding", name: "Metal Z & C Purlin", price: 310, img: "/products/purlin.jpg" },
  { id: "accessories", category: "Roof Cladding", name: "Roofing Accessories", price: 90, img: "/products/accessories.jpg" },
  { id: "translucent", category: "Roof Cladding", name: "Translucent Sheet", price: 200, img: "/products/translucent.jpg" },
  // FENCING PRODUCTS
  { id: "temporary-hoarding", category: "Fencing", name: "Temporary Hoarding Panels", price: 100, img: "/products/temporary-hoarding.jpg" },
  { id: "high-security-fence", category: "Fencing", name: "High Security Chain Link Fence", price: 300, img: "/products/high-security-fence.jpg" },
  { id: "chain-link-gate", category: "Fencing", name: "Chain Link Fence Gate", price: 200, img: "/products/chain-link-gate.jpg" },
  { id: "chain-link-fence", category: "Fencing", name: "Chain Link Fence", price: 180, img: "/products/chain-link-fence.jpg" },
  { id: "sand-barrier-fence", category: "Fencing", name: "Sand Barrier Fence", price: 150, img: "/products/sand-barrier-fence.jpg" },
  { id: "fence-wires", category: "Fencing", name: "Fence Wires & Accessories", price: 90, img: "/products/fence-wires.jpg" },
  { id: "playground-fence", category: "Fencing", name: "Playground Chain Link Fence", price: 220, img: "/products/playground-fence.jpg" },
  { id: "wall-mounted-fence", category: "Fencing", name: "Wall Mounted Chain Link Fence", price: 250, img: "/products/wall-mounted-fence.jpg" },
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
          <a href="#products" className="hover:text-slate-900">Products</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
          <button onClick={scrollToOrder} className="relative">
            <ShoppingCart size={20} />
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{orderCount}</span>
            )}
          </button>
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-4 py-2 bg-green-600 text-white rounded-md">WhatsApp</a>
        </nav>

        <button className="md:hidden border rounded-md p-2" onClick={onOpenMenu}><Menu size={20} /></button>
      </div>
    </header>
  );
}

// ==============================
// MOBILE MENU
// ==============================
function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed inset-0 bg-white z-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Menu</h3>
            <button onClick={onClose}><X /></button>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#products" onClick={onClose}>Products</a>
            <a href="#contact" onClick={onClose}>Contact</a>
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

// ==============================
// PRODUCT CATALOG
// ==============================
function ProductCatalog({ orderItems, setOrderItems }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const handleAddToCart = (product) => {
    const qty = parseInt(prompt(`Enter quantity for ${product.name}:`, 1));
    if (!qty || qty < 1) return;
    const existing = orderItems.find(item => item.id === product.id);
    if (existing) {
      setOrderItems(orderItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      setOrderItems([...orderItems, { ...product, quantity: qty }]);
    }
    alert(`${product.name} added to cart`);
  };

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

      {/* Filter & Search */}
      <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full border transition ${c===category ? "bg-green-600 text-white border-green-600":"border-slate-300 hover:bg-slate-100"}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center border rounded-md px-2">
            <Search size={16} className="text-slate-500" />
            <input type="text" placeholder="Search product..." value={search} onChange={e=>setSearch(e.target.value)} className="p-2 outline-none text-sm" />
          </div>
          <select className="border rounded-md p-2 text-sm" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map(p => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={p.img} alt={p.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{p.category}</p>
                <p className="text-green-600 font-bold mt-2">AED {p.price}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={`https://wa.me/${COMPANY.whatsapp}?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" className="inline-block w-full text-center bg-green-600 text-white rounded-md py-2 text-sm">Inquire on WhatsApp</a>
                  <a href={`mailto:${COMPANY.email}?subject=Inquiry about ${encodeURIComponent(p.name)}`} className="inline-block w-full text-center bg-blue-600 text-white rounded-md py-2 text-sm">Inquire via Email</a>
                  <button onClick={()=>handleAddToCart(p)} className="inline-block w-full text-center bg-gray-600 text-white rounded-md py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <p className="text-center text-slate-500 mt-20">No products found.</p>}
    </section>
  );
}

// ==============================
// ORDER / INVOICE GENERATOR
// ==============================
function OrderInvoice({ orderItems, setOrderItems }) {
  const orderRef = useRef();
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
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
      <div className="text-center text-slate-700">
        <p>Email: {COMPANY.email}</p>
        <p>WhatsApp: {COMPANY.whatsapp}</p>
        <p>Location: {COMPANY.location}</p>
      </div>
    </section>
  );
}

// ==============================
// FOOTER
// ==============================
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 text-center">
      <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
    </footer>
  );
}

// ==============================
// MAIN PAGE
// ==============================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const orderRef = useRef();

  const scrollToOrder = () => {
    if (orderRef.current) orderRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SeoHead />
      <Navbar onOpenMenu={() => setMenuOpen(true)} orderCount={orderItems.length} scrollToOrder={scrollToOrder} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Hero />
      <ProductCatalog orderItems={orderItems} setOrderItems={setOrderItems} />
      <div ref={orderRef}>
        <OrderInvoice orderItems={orderItems} setOrderItems={setOrderItems} />
      </div>
      <Contact />
      <Footer />
    </>
  );
}
