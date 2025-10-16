"use client";

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search } from "lucide-react";
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
function Navbar({ onOpenMenu }) {
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
          <a href="#order" className="hover:text-slate-900">Order</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
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
            <a href="#order" onClick={onClose}>Order</a>
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
function ProductCatalog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

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
                <a href={`https://wa.me/${COMPANY.whatsapp}?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" className="mt-4 inline-block w-full text-center bg-green-600 text-white rounded-md py-2 text-sm">Inquire on WhatsApp</a>
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
// ORDER / INVOICE GENERATOR (UPDATED)
// ==============================
function OrderInvoice() {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  // New client info fields
  const [clientInfo, setClientInfo] = useState({ name: "", phone: "", address: "" });

  const handleClientChange = (e) => setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });

  const addItem = () => {
    if (!selectedProduct) return;
    const product = PRODUCTS.find(p => p.id === selectedProduct);
    const existing = orderItems.find(item => item.id === product.id);
    if (existing) {
      setOrderItems(orderItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setOrderItems([...orderItems, { ...product, quantity }]);
    }
    setSelectedProduct("");
    setQuantity(1);
  };

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
    <section id="order" className="max-w-5xl mx-auto px-6 py-20 bg-gray-50 rounded-2xl shadow-md mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">Place Your Order / Invoice</h2>

      {/* Client Info */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input type="text" name="name" placeholder="Client Name" value={clientInfo.name} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
        <input type="text" name="phone" placeholder="Phone Number" value={clientInfo.phone} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
        <input type="text" name="address" placeholder="Address" value={clientInfo.address} onChange={handleClientChange} className="border rounded-md p-2 flex-1" />
      </div>

      {/* Select Product */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
        <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="border rounded-md p-2">
          <option value="">Select Product</option>
          {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} - AED {p.price}</option>)}
        </select>
        <input type="number" min={1} value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} className="border rounded-md p-2 w-20" />
        <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded-md">Add Item</button>
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
        <p className="text-center text-gray-500">No items in the order yet.</p>
      )}
    </section>
  );
}


// ==============================
// CONTACT
// ==============================
function Contact() {
  const [formData,setFormData] = useState({name:"",email:"",company:"",message:""});
  const handleChange = (e)=>setFormData({...formData,[e.target.name]:e.target.value});
  const handleWhatsApp = ()=>window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hello Silver Metal Industry,%0A%0AHere are my details:%0AName:${formData.name}%0ACompany:${formData.company}%0AEmail:${formData.email}%0AMessage:${formData.message}`)}`,"_blank");
  const handleEmail = ()=>window.location.href=`mailto:${COMPANY.email}?subject=${encodeURIComponent("Inquiry from Silver Metal Industry Website")}&body=${encodeURIComponent(`Hello Silver Metal Team,%0A%0AHere are my details:%0AName:${formData.name}%0ACompany:${formData.company}%0AEmail:${formData.email}%0AMessage:${formData.message}`)}`;
  const handleDownloadWord = async ()=>{

  const doc = new Document({sections:[{children:[
      new Paragraph({children:[new TextRun({text:"Silver Metal Industry Inquiry",bold:true,size:28})]}),
      new Paragraph(""),
      new Paragraph(`Name: ${formData.name}`),
      new Paragraph(`Company: ${formData.company}`),
      new Paragraph(`Email: ${formData.email}`),
      new Paragraph(`Message: ${formData.message}`)
    ]}]});
    const blob = await Packer.toBlob(doc);
    saveAs(blob,"SilverMetalInquiry.docx");
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2 className="text-4xl font-bold mb-10 text-gray-800" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}}>Contact Us</motion.h2>
        <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5}} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
          <form className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea name="message" rows={4} placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button type="button" onClick={handleWhatsApp} className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all">📱 WhatsApp Now</button>
              <button type="button" onClick={handleEmail} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">✉️ Send Email</button>
              <button type="button" onClick={handleDownloadWord} className="w-full sm:w-auto bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all">💾 Save as Word</button>
            </div>
          </form>
          <div className="mt-10 text-gray-600">
            <p>📍 {COMPANY.location}</p>
            <p>📞 +{COMPANY.whatsapp}</p>
            <p>✉️ {COMPANY.email}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// FOOTER
// ==============================
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  );
}

// ==============================
// PAGE
// ==============================
export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);

  return (
    <>
      <SeoHead />
      <Navbar onOpenMenu={()=>setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={()=>setMenuOpen(false)} />
      <Hero />
      <ProductCatalog />
      <OrderInvoice />
      <Contact />
      <Footer />
    </>
  );
}
