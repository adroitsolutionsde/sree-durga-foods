"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function StickyCartBar() {
  const itemCount = useCart((s) => s.getItemCount());
  const total = useCart((s) => s.getTotal());

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-r from-maroon to-maroon-light px-4 py-3 text-white shadow-lg md:hidden">
      <div className="flex items-center gap-2 text-sm">
        <span>🛒</span>
        <span className="font-medium">{itemCount} items</span>
        <span className="opacity-70">|</span>
        <span className="font-bold">{formatPrice(total)}</span>
      </div>
      <Link
        href="/cart/"
        className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-maroon"
      >
        View Cart
      </Link>
    </div>
  );
}
