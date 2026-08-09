"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getGstAmount, getDeliveryCharge, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center md:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark text-4xl">
          🛒
        </div>
        <h1 className="mt-6 text-2xl font-bold text-brown-dark">Your Cart is Empty</h1>
        <p className="mt-2 text-sm text-brown-light">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop/" className="btn-primary mt-6">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold text-brown-dark">Shopping Cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className="card flex gap-4 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-dark">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/shop/${item.slug}/`} className="text-sm font-semibold text-brown-dark hover:text-maroon">
                    {item.name}
                  </Link>
                  {item.variantName && (
                    <p className="text-xs text-brown-light">{item.variantName}</p>
                  )}
                  <p className="text-xs text-brown-light">{item.weight}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border bg-white">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="px-2 py-1 text-brown"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="px-2 py-1 text-brown"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-maroon">{formatPrice(item.price * item.quantity)}</p>
                    {item.mrp > item.price && (
                      <p className="text-xs text-brown-light line-through">{formatPrice(item.mrp * item.quantity)}</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.productId, item.variantId)}
                className="self-start rounded-lg p-2 text-brown-light hover:bg-red-50 hover:text-red-500"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card h-fit p-6">
          <h2 className="text-lg font-bold text-brown-dark">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-brown-light">
              <span>Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-brown-light">
              <span>GST (5%)</span>
              <span>{formatPrice(getGstAmount())}</span>
            </div>
            <div className="flex justify-between text-brown-light">
              <span>Delivery</span>
              <span>{getDeliveryCharge() === 0 ? "FREE" : formatPrice(getDeliveryCharge())}</span>
            </div>
            {getSubtotal() < 999 && (
              <p className="text-xs text-maroon">
                Add {formatPrice(999 - getSubtotal())} more for free delivery!
              </p>
            )}
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-lg font-bold text-brown-dark">
                <span>Grand Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
          <Link href="/checkout/" className="btn-primary mt-6 block w-full text-center">
            Proceed to Checkout
          </Link>
          <Link href="/shop/" className="mt-2 block text-center text-sm text-maroon hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
