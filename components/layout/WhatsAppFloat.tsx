"use client";

import { BUSINESS_CONFIG } from "@/lib/config";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hi%20Sree%20Durga%20Food%20Industries`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform hover:scale-110 md:bottom-8"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
