"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const PRODUCTS = {
  "alu-1": {
    name: "Pre-Painted Aluminium Coil",
    desc: "High-durability pre-painted aluminium coil suitable for roofing, facades and cladding.",
    specs: ["Width: 1250mm", "Thickness: 0.4-1.6mm", "Finish: PVDF / Polyester"],
    price: "AED 12 - 30 / m",
    img: "/placeholder-product.jpg",
  },
  "ms-1": {
    name: "MS Square Tube",
    desc: "Cold-rolled mild steel square tube with consistent dimensions for structure & fencing.",
    specs: ["Size: 20x20 - 200x200mm", "Grade: IS / EN / ASTM"],
    price: "AED 25 - 120 / piece",
    img: "/placeholder-product.jpg",
  },
  "roof-1": {
    name: "PUR/PIR Sandwich Panel",
    desc: "Thermally efficient sandwich panels for roofing & walls.",
    specs: ["Thickness: 40mm - 200mm", "Core: PUR/PIR", "Finish: Color coated steel"],
    price: "AED 45 - 200 / m²",
    img: "/placeholder-product.jpg",
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS[id as keyof typeof PRODUCTS];

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/products" className="text-primary-accent text-sm mb-4 inline-block">← Back to Products</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.img} alt={product.name} className="rounded-xl shadow-lg w-full h-72 object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-slate-600">{product.desc}</p>
          <ul className="mt-4 space-y-1 text-sm text-slate-600">
            {product.specs.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
          <div className="mt-6 text-lg font-medium">Price: {product.price}</div>
          <a
            href={`https://wa.me/971XXXXXXXXX?text=${encodeURIComponent(`Hello Silver Metal Industry, I want details and price for ${product.name}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block px-5 py-3 bg-green-600 text-white rounded-md"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
