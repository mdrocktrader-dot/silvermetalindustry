"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        For inquiries, pricing, or bulk orders — fill out the form below or message us directly on WhatsApp.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-card p-6 rounded-lg">
          <input type="text" required placeholder="Your Name" className="border w-full px-4 py-2 rounded" />
          <input type="email" required placeholder="Email or WhatsApp" className="border w-full px-4 py-2 rounded" />
          <textarea placeholder="Message" required className="border w-full px-4 py-2 rounded h-28" />
          <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded">Send Message</button>
        </form>
      ) : (
        <div className="text-center bg-green-50 text-green-700 p-6 rounded-lg">
          ✅ Thank you! Your inquiry has been submitted successfully.
        </div>
      )}
    </div>
  );
}
