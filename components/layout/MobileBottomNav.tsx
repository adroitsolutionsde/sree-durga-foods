"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "@/lib/store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCart((s) => s.getItemCount());

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shop/", icon: ShoppingBag, label: "Shop" },
    { href: "/search/", icon: Search, label: "Search" },
    { href: "/account/", icon: User, label: "Account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white md:hidden">
      <div className="flex justify-around py-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium ${
                isActive ? "text-maroon" : "text-brown-light"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              {link.href === "/cart/" && itemCount > 0 && (
                <span className="absolute right-8 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-maroon text-[8px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
