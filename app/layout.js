import "./globals.css";

export const metadata = {
  title: "Silver Metal Industry — Aluminium, Steel, Roofing & Fencing Supplier | Sharjah, UAE",
  description: "Your trusted UAE supplier for aluminium, mild steel, roofing, and fencing materials. Quick delivery and quality guaranteed.",
  openGraph: {
    title: "Silver Metal Industry — UAE Building Materials",
    description: "Premium aluminium, steel, roofing and fencing products. Serving contractors across the UAE.",
    images: ["/hero-warehouse.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}
