// "use client";

// import React, { useState } from "react";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Phone } from "lucide-react";

// // ==============================
// // COMPANY INFO
// // ==============================
// const COMPANY = {
//   name: "Silver Metal Industry LLC",
//   location: "Sharjah, UAE",
//   whatsapp: "971526551620",
//   email: "mdrocktrader@gmail.com",
//   tagline:
//     "Your trusted source for Aluminium, Mild Steel, Roofing & Fencing Materials across UAE.",
// };

// // ==============================
// // PRODUCT LIST
// // ==============================
// const PRODUCTS = [
//   {
//     id: "p1",
//     name: "Pre-Painted Aluminium Coil",
//     img: "/products/aluminium-coil.jpg",
//     short: "Durable pre-painted coil for roofing & cladding.",
//   },
//   {
//     id: "p2",
//     name: "MS Square Tube",
//     img: "/products/ms-tube.jpg",
//     short: "High-strength mild steel square tubes for structure.",
//   },
//   {
//     id: "p3",
//     name: "Galvanized Decking Sheet",
//     img: "/products/decking-sheet.jpg",
//     short: "Galvanized decking for flooring & roofing.",
//   },
//   {
//     id: "p4",
//     name: "PUR/PIR Sandwich Panel",
//     img: "/products/sandwich-panel.jpg",
//     short: "Insulated roof & wall panels with PIR/PUR core.",
//   },
//   {
//     id: "p5",
//     name: "Tile Profile Sheet",
//     img: "/products/tile-sheet.jpg",
//     short: "Elegant metal roof sheets with tile design.",
//   },
//   {
//     id: "p6",
//     name: "Chain Link Fence",
//     img: "/products/chainlink.jpg",
//     short: "High-quality chain link fencing & gates.",
//   },
// ];

// // ==============================
// // SEO
// // ==============================
// function SeoHead() {
//   return (
//     <Head>
//       <title>{COMPANY.name} — Building Materials Supplier UAE</title>
//       <meta
//         name="description"
//         content="Premium aluminium, mild steel, roofing and fencing materials supplier in UAE. Contact Silver Metal Industry for quality and reliability."
//       />
//       <link rel="icon" href="/favicon.ico" />
//     </Head>
//   );
// }

// // ==============================
// // NAVBAR
// // ==============================
// function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
//   return (
//     <header className="w-full bg-white/90 backdrop-blur sticky top-0 z-50 border-b">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//         <a href="#" className="flex items-center gap-3">
//           <img
//             src="/logo.png"
//             alt="Logo"
//             className="w-12 h-12 rounded-md object-contain"
//           />
//           <div>
//             <div className="font-bold text-lg text-slate-900">
//               {COMPANY.name}
//             </div>
//             <div className="text-xs text-slate-600">{COMPANY.location}</div>
//           </div>
//         </a>

//         <nav className="hidden md:flex items-center gap-6 text-sm">
//           <a href="#products" className="hover:text-slate-900">Products</a>
//           <a href="#about" className="hover:text-slate-900">About</a>
//           <a href="#contact" className="hover:text-slate-900">Contact</a>
//           <a
//             href={`https://wa.me/${COMPANY.whatsapp}`}
//             target="_blank"
//             className="px-4 py-2 bg-green-600 text-white rounded-md"
//           >
//             WhatsApp
//           </a>
//         </nav>

//         <button
//           className="md:hidden border rounded-md p-2"
//           onClick={onOpenMenu}
//         >
//           <Menu size={20} />
//         </button>
//       </div>
//     </header>
//   );
// }

// // ==============================
// // MOBILE MENU
// // ==============================
// function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ x: -300 }}
//           animate={{ x: 0 }}
//           exit={{ x: -300 }}
//           className="fixed inset-0 bg-white z-50 p-6"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold">Menu</h3>
//             <button onClick={onClose}>
//               <X />
//             </button>
//           </div>
//           <div className="flex flex-col gap-4">
//             <a href="#products" onClick={onClose}>Products</a>
//             <a href="#about" onClick={onClose}>About</a>
//             <a href="#contact" onClick={onClose}>Contact</a>
//             <a
//               href={`https://wa.me/${COMPANY.whatsapp}`}
//               target="_blank"
//               className="px-4 py-2 mt-4 bg-green-600 text-white rounded-md"
//             >
//               WhatsApp
//             </a>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ==============================
// // HERO SECTION
// // ==============================
// function Hero() {
//   return (
//     <section
//       className="relative text-white bg-cover bg-center"
//       style={{ backgroundImage: "url('/hero-bg.jpg')" }}
//     >
//       <div className="absolute inset-0 bg-black/50" />
//       <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-6xl font-extrabold"
//         >
//           {COMPANY.name}
//         </motion.h1>
//         <p className="mt-4 text-lg max-w-2xl mx-auto">{COMPANY.tagline}</p>
//         <div className="mt-6 flex justify-center gap-3">
//           <a
//             href={`https://wa.me/${COMPANY.whatsapp}`}
//             target="_blank"
//             className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold"
//           >
//             Chat on WhatsApp
//           </a>
//           <a href="#products" className="px-6 py-3 border rounded-md text-white">
//             View Products
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ==============================
// // PRODUCTS SECTION
// // ==============================
// function Products() {
//   return (
//     <section id="products" className="max-w-7xl mx-auto px-6 py-20">
//       <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {PRODUCTS.map((p) => (
//           <motion.div
//             key={p.id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
//           >
//             <img
//               src={p.img}
//               alt={p.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5">
//               <h3 className="font-semibold text-lg">{p.name}</h3>
//               <p className="text-sm text-slate-600 mt-2">{p.short}</p>
//               <a
//                 href={`https://wa.me/${COMPANY.whatsapp}?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(
//                   p.name
//                 )}`}
//                 target="_blank"
//                 className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-md text-sm"
//               >
//                 Inquire on WhatsApp
//               </a>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ==============================
// // CONTACT SECTION
// // ==============================
// function Contact() {
//   return (
//     <section id="contact" className="bg-slate-50 py-20">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
//         <p>📍 {COMPANY.location}</p>
//         <p>📞 +{COMPANY.whatsapp}</p>
//         <p>✉️ {COMPANY.email}</p>
//         <a
//           href={`https://wa.me/${COMPANY.whatsapp}`}
//           target="_blank"
//           className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-md"
//         >
//           WhatsApp Now
//         </a>
//       </div>
//     </section>
//   );
// }

// // ==============================
// // FOOTER
// // ==============================
// function Footer() {
//   return (
//     <footer className="border-t py-6 text-center text-sm text-slate-600">
//       © {new Date().getFullYear()} {COMPANY.name} — All rights reserved.
//     </footer>
//   );
// }

// // ==============================
// // MAIN PAGE EXPORT
// // ==============================
// export default function Page() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   return (
//     <div className="font-sans text-slate-900 bg-white">
//       <SeoHead />
//       <Navbar onOpenMenu={() => setMenuOpen(true)} />
//       <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
//       <main>
//         <Hero />
//         <Products />
//         <Contact />
//         <Footer />
//       </main>
//       <a
//         href={`https://wa.me/${COMPANY.whatsapp}`}
//         target="_blank"
//         className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
//       >
//         <Phone size={18} /> Chat
//       </a>
//     </div>
//   );
// }
"use client";

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search } from "lucide-react";
// ==============================
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

// ==============================
// COMPANY INFO
// ==============================
const COMPANY = {
  name: "Silver Metal Industry LLC",
  location: "Sharjah, UAE",
  whatsapp: "971526551620",
  email: "mdrocktrader@gmail.com",
  tagline:
    "Supplier of Aluminium, Mild Steel, Roofing & Building Materials in UAE.",
};

// ==============================
// PRODUCT DATA
// ==============================
const PRODUCTS = [
  // Aluminium
  { category: "Aluminium", name: "Angle Aluminium", price: 120, img: "/products/aluminium-angle.jpg" },
  { category: "Aluminium", name: "Pre-Painted Aluminium Coil/Sheet", price: 250, img: "/products/prepainted-coil.jpg" },
  { category: "Aluminium", name: "Mill Finish Aluminium Coil/Sheet", price: 210, img: "/products/millfinish.jpg" },

  // Mild Steel
  { category: "Mild Steel", name: "MS Square Tube", price: 180, img: "/products/ms-tube.jpg" },
  { category: "Mild Steel", name: "MS Pipes", price: 170, img: "/products/ms-pipe.jpg" },
  { category: "Mild Steel", name: "MS Angle", price: 160, img: "/products/ms-angle.jpg" },
  { category: "Mild Steel", name: "I Beam", price: 300, img: "/products/i-beam.jpg" },
  { category: "Mild Steel", name: "H Beam", price: 310, img: "/products/h-beam.jpg" },
  { category: "Mild Steel", name: "HR Coils & Sheets", price: 220, img: "/products/hr-coil.jpg" },
  { category: "Mild Steel", name: "Galvanized Steel Sheets", price: 240, img: "/products/galv-sheet.jpg" },
  { category: "Mild Steel", name: "Pre-Painted GI Steel Coils", price: 260, img: "/products/prepainted-gi.jpg" },
  { category: "Mild Steel", name: "Cold Rolled Coils", price: 230, img: "/products/cr-coil.jpg" },

  // Building
  { category: "Building", name: "Galvanized Decking Sheet", price: 150, img: "/products/decking-sheet.jpg" },
  { category: "Building", name: "Slotted Channel", price: 90, img: "/products/slotted-channel.jpg" },
  { category: "Building", name: "Non-Slotted Channel", price: 95, img: "/products/non-slotted.jpg" },
  { category: "Building", name: "Galvanized U Channel", price: 110, img: "/products/u-channel.jpg" },

  // Roof Cladding
  { category: "Roof Cladding", name: "Galvanized Profile Sheet", price: 220, img: "/products/galv-profile.jpg" },
  { category: "Roof Cladding", name: "Alu-Zinc Profile Sheet", price: 230, img: "/products/aluzinc.jpg" },
  { category: "Roof Cladding", name: "Aluminium Profile Sheet", price: 250, img: "/products/aluminium-profile.jpg" },
  { category: "Roof Cladding", name: "PUR Sandwich Panel", price: 400, img: "/products/pur-panel.jpg" },
  { category: "Roof Cladding", name: "PIR Sandwich Panel", price: 420, img: "/products/pir-panel.jpg" },
  { category: "Roof Cladding", name: "PUR Wall Panel", price: 380, img: "/products/pur-wall.jpg" },
  { category: "Roof Cladding", name: "PIR Wall Panel", price: 390, img: "/products/pir-wall.jpg" },
  { category: "Roof Cladding", name: "Tile Profile Sheet", price: 270, img: "/products/tile-sheet.jpg" },
  { category: "Roof Cladding", name: "Metal Z & C Purlin", price: 310, img: "/products/purlin.jpg" },
  { category: "Roof Cladding", name: "Roofing Accessories", price: 90, img: "/products/accessories.jpg" },
  { category: "Roof Cladding", name: "Translucent Sheet", price: 200, img: "/products/translucent.jpg" },
];

const CATEGORIES = ["All", "Aluminium", "Mild Steel", "Building", "Roof Cladding"];

// ==============================
// SEO HEAD
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
function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
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
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-4 py-2 bg-green-600 text-white rounded-md">
            WhatsApp
          </a>
        </nav>

        <button className="md:hidden border rounded-md p-2" onClick={onOpenMenu}>
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

// ==============================
// MOBILE MENU
// ==============================
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            <button onClick={onClose}><X /></button>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#products" onClick={onClose}>Products</a>
            <a href="#contact" onClick={onClose}>Contact</a>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-4 py-2 mt-4 bg-green-600 text-white rounded-md">
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
    <section
      className="relative text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
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
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold">
            Chat on WhatsApp
          </a>
          <a href="#products" className="px-6 py-3 border rounded-md text-white">View Products</a>
        </div>
      </div>
    </section>
  );
}

// ==============================
// PRODUCT CATALOG WITH FILTERS
// ==============================
function ProductCatalog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"low" | "high" | "">("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap justify-between gap-4 items-center mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full border transition ${
                c === category
                  ? "bg-green-600 text-white border-green-600"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
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
          <select
            className="border rounded-md p-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as "low" | "high" | "")}
          >
            <option value="">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={p.img} alt={p.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{p.category}</p>
                <p className="text-green-600 font-bold mt-2">AED {p.price}</p>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(p.name)}`}
                  target="_blank"
                  className="mt-4 inline-block w-full text-center bg-green-600 text-white rounded-md py-2 text-sm"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 mt-20">No products found.</p>
      )}
    </section>
  );
}

// ==============================
// CONTACT
// ==============================
// ==============================
// CONTACT (Full Animated + Functional)

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const msg = `Hello Silver Metal Industry,%0A%0AHere are my details:%0A%0A🧑 Name: ${formData.name}%0A🏢 Company: ${formData.company}%0A📧 Email: ${formData.email}%0A💬 Message: ${formData.message}`;
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${msg}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Inquiry from Silver Metal Industry Website");
    const body = encodeURIComponent(
      `Hello Silver Metal Team,%0A%0AHere are my details:%0A%0AName: ${formData.name}%0ACompany: ${formData.company}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  };

  const handleDownloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "Silver Metal Industry Inquiry", bold: true, size: 28 })] }),
            new Paragraph(" "),
            new Paragraph(`Name: ${formData.name}`),
            new Paragraph(`Company: ${formData.company}`),
            new Paragraph(`Email: ${formData.email}`),
            new Paragraph(`Message: ${formData.message}`),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "SilverMetalInquiry.docx");
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-lg mx-auto"
        >
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
              >
                📱 WhatsApp Now
              </button>
              <button
                type="button"
                onClick={handleEmail}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                ✉️ Send Email
              </button>
              <button
                type="button"
                onClick={handleDownloadWord}
                className="w-full sm:w-auto bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all"
              >
                💾 Save as Word
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-10 text-gray-600">
          <p>📍 {COMPANY.location}</p>
          <p>📞 +{COMPANY.whatsapp}</p>
          <p>✉️ {COMPANY.email}</p>
        </div>
      </div>
    </section>
  );
}


// ==============================
// FOOTER
// ==============================
function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-slate-600">
      © {new Date().getFullYear()} {COMPANY.name} — All rights reserved.
    </footer>
  );
}

// ==============================
// MAIN PAGE EXPORT
// ==============================
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans text-slate-900 bg-white">
      <SeoHead />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <ProductCatalog />
        <Contact />
        <Footer />
      </main>
      <a
        href={`https://wa.me/${COMPANY.whatsapp}`}
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <Phone size={18} /> Chat
      </a>
    </div>
  );
}
