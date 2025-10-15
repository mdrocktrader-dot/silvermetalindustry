"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: "alu-1",
    name: "Pre-Painted Aluminium Coil",
    short: "Durable pre-painted coil for roofing & cladding.",
    priceRange: "AED 12 - 30 / m",
    img: "/placeholder-product.jpg",
  },
  {
    id: "ms-1",
    name: "MS Square Tube",
    short: "Cold-rolled mild steel square tube for structure & fencing.",
    priceRange: "AED 25 - 120 / piece",
    img: "/placeholder-product.jpg",
  },
  {
    id: "roof-1",
    name: "PUR/PIR Sandwich Panel",
    short: "Insulated panels for roofing and walls.",
    priceRange: "AED 45 - 200 / m²",
    img: "/placeholder-product.jpg",
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -6 }}
            className="bg-white shadow-card rounded-xl overflow-hidden"
          >
            <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{p.short}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">{p.priceRange}</span>
                <Link
                  href={`/products/${p.id}`}
                  className="text-primary-accent text-sm font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
