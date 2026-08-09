import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import StickyCartBar from "@/components/cart/StickyCartBar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://sreedurgafoods.com"),
  title: {
    template: "%s | Sree Durga Food Industries",
    default: "Sree Durga Food Industries - Authentic Traditional Foods from Chennai",
  },
  description:
    "Authentic traditional Tamil foods made with care and delivered to your doorstep across Chennai. Shop snacks, sweets, pickles, spice powders and gift boxes.",
  keywords: [
    "traditional food chennai",
    "tamil snacks online",
    "murukku online chennai",
    "homemade pickles chennai",
    "traditional sweets chennai",
    "sree durga food industries",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sree Durga Food Industries",
    title: "Sree Durga Food Industries - Authentic Traditional Foods from Chennai",
    description: "Authentic traditional Tamil foods made with care and delivered to your doorstep.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <MobileBottomNav />
        <WhatsAppFloat />
        <StickyCartBar />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#8B1538",
              color: "#fff",
              borderRadius: "12px",
              fontFamily: "system-ui",
            },
          }}
        />
      </body>
    </html>
  );
}
