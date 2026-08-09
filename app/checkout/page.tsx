"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Truck, Building2, Wallet } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getGstAmount, getDeliveryCharge, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [isPlacing, setIsPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <h1 className="text-2xl font-bold text-brown-dark">Your cart is empty</h1>
        <p className="mt-2 text-brown-light">Add some products before checking out.</p>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const orderNumber = generateOrderNumber();
    clearCart();
    router.push(`/order-confirmation/?order=${orderNumber}&total=${getTotal()}`);
  };

  const paymentOptions: { id: PaymentMethod; label: string; desc: string; icon: React.ElementType }[] = [
    { id: "UPI", label: "UPI Payment", desc: "Google Pay, PhonePe, Paytm", icon: Wallet },
    { id: "CARD", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "COD", label: "Cash on Delivery", desc: "Pay when you receive", icon: Truck },
    { id: "BANK_TRANSFER", label: "Bank Transfer", desc: "NEFT / IMPS / UPI Transfer", icon: Building2 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold text-brown-dark">Checkout</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-5">
        {/* Left: Forms */}
        <div className="lg:col-span-3 space-y-6">
          {/* Delivery Address */}
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brown-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">1</span>
              Delivery Address
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input type="text" placeholder="Full Name" className="input" />
              <input type="tel" placeholder="Mobile Number" className="input" />
              <input type="email" placeholder="Email Address" className="input sm:col-span-2" />
              <input type="text" placeholder="House / Flat / Building" className="input sm:col-span-2" />
              <input type="text" placeholder="Street / Area" className="input sm:col-span-2" />
              <input type="text" placeholder="City" defaultValue="Chennai" className="input" />
              <input type="text" placeholder="PIN Code" className="input" />
              <input type="text" placeholder="State" defaultValue="Tamil Nadu" className="input" />
              <input type="text" placeholder="Landmark (Optional)" className="input" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brown-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">2</span>
              Payment Method
            </h2>
            <div className="mt-4 space-y-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    paymentMethod === opt.id
                      ? "border-maroon bg-maroon/5"
                      : "border-border hover:border-maroon/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="h-4 w-4 accent-maroon"
                  />
                  <opt.icon className="h-5 w-5 text-maroon" />
                  <div>
                    <p className="text-sm font-semibold text-brown-dark">{opt.label}</p>
                    <p className="text-xs text-brown-light">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === "BANK_TRANSFER" && (
              <div className="mt-4 rounded-lg bg-cream-dark p-4 text-sm">
                <p className="font-semibold text-brown-dark">Bank Details (To be provided by admin)</p>
                <div className="mt-2 space-y-1 text-brown-light">
                  <p>Bank Name: [To be configured]</p>
                  <p>Account Name: [To be configured]</p>
                  <p>Account Number: [To be configured]</p>
                  <p>IFSC Code: [To be configured]</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-2">
          <div className="card sticky top-24 p-6">
            <h2 className="text-lg font-bold text-brown-dark">Order Summary</h2>
            <div className="mt-4 max-h-48 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-brown-dark line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-brown-light">{item.variantName || item.weight} × {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-maroon">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-brown-dark">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="btn-primary mt-6 w-full disabled:opacity-60"
            >
              {isPlacing ? "Placing Order..." : "Place Order"}
            </button>
            <p className="mt-3 text-center text-xs text-brown-light">🔒 Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
