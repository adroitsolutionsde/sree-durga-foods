"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop/", label: "Shop" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCart((s) => s.getItemCount());

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-light text-lg font-bold text-gold shadow-premium">
              ஸ்
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold leading-tight tracking-wide text-maroon">
                Sree Durga
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brown-light">
                Food Industries
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-maroon"
                    : "text-brown hover:text-maroon"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-brown transition-colors hover:bg-cream-dark hover:text-maroon"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/account/"
              className="hidden rounded-lg p-2 text-brown transition-colors hover:bg-cream-dark hover:text-maroon md:block"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/cart/"
              className="relative rounded-lg p-2 text-brown transition-colors hover:bg-cream-dark hover:text-maroon"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-maroon text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-brown md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-cream/98 md:hidden">
          <div className="flex h-full flex-col p-6">
            <div className="flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X className="h-6 w-6 text-brown" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold text-brown-dark"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account/"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-brown-dark"
              >
                Account
              </Link>
              <Link
                href="/track-order/"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-brown-dark"
              >
                Track Order
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; slug: string }[]>([]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      return;
    }
    // Dynamic import to avoid SSR issues
    import("@/data/products").then(({ searchProducts }) => {
      setResults(
        searchProducts(val).map((p) => ({ name: p.name, slug: p.slug }))
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[70] bg-cream/98 p-6">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brown-dark">Search</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <input
          autoFocus
          type="text"
          placeholder="Search for Murukku, Sweets, Pickles..."
          className="input mt-4"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            {results.map((r) => (
              <Link
                key={r.slug}
                href={`/shop/${r.slug}/`}
                onClick={onClose}
                className="block rounded-lg border border-border bg-white p-3 text-sm text-brown-dark hover:border-maroon"
              >
                {r.name}
              </Link>
            ))}
          </div>
        )}
        {query.length >= 2 && results.length === 0 && (
          <p className="mt-4 text-center text-sm text-brown-light">
            No products found. Try &quot;Murukku&quot;, &quot;Pickle&quot;, or &quot;Powder&quot;.
          </p>
        )}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-brown-light">
            Popular Searches
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Murukku", "Adhirasam", "Mango Pickle", "Rasam Powder", "Gift Box"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs text-brown hover:border-maroon"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
