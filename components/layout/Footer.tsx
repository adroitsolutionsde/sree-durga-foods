import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-light text-sm font-bold text-gold">
                ஸ்
              </div>
              <div>
                <div className="text-base font-bold text-maroon">Sree Durga</div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-brown-light">
                  Food Industries
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brown-light">
              Authentic traditional foods from Chennai, made with care and delivered to your doorstep.
            </p>
            <div className="mt-4 text-xs text-brown-light">
              <p className="font-semibold text-brown">Legal Name: Suganya K</p>
              <p>GST: 33FHSPS6377C1ZR</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-brown-dark">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-brown-light">
              <li><Link href="/shop/" className="hover:text-maroon">Shop All</Link></li>
              <li><Link href="/about/" className="hover:text-maroon">About Us</Link></li>
              <li><Link href="/contact/" className="hover:text-maroon">Contact</Link></li>
              <li><Link href="/track-order/" className="hover:text-maroon">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold text-brown-dark">Policies</h4>
            <ul className="mt-3 space-y-2 text-sm text-brown-light">
              <li><Link href="#" className="hover:text-maroon">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-maroon">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-maroon">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-maroon">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-maroon">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-brown-dark">Contact Us</h4>
            <address className="mt-3 not-italic text-sm leading-relaxed text-brown-light">
              <p className="font-medium text-brown">Sree Durga Food Industries</p>
              <p>No. 135, Village High Road</p>
              <p>Sholinganallur, Chennai</p>
              <p>Tamil Nadu 600119, India</p>
              <p className="mt-2">Phone: [To be configured]</p>
              <p>Email: [To be configured]</p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-brown-light">
          <p>
            © {new Date().getFullYear()} Sree Durga Food Industries. All rights reserved.
          </p>
          <p className="mt-1">
            Trade Name: Sree Durga Food Industries | Legal Name: Suganya K | GST: 33FHSPS6377C1ZR
          </p>
        </div>
      </div>
    </footer>
  );
}
