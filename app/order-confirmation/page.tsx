"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "SD202600001";
  const total = parseFloat(searchParams.get("total") || "0");

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center md:px-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
        <CheckCircle className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-brown-dark">Order Placed Successfully!</h1>
      <p className="mt-2 text-brown-light">
        Thank you for choosing Sree Durga Food Industries. Your order has been received and is being processed.
      </p>

      <div className="card mt-8 p-6 text-left">
        <div className="flex justify-between border-b border-border pb-3">
          <span className="text-sm text-brown-light">Order Number</span>
          <span className="text-sm font-bold text-maroon">{orderNumber}</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-sm text-brown-light">Order Date</span>
          <span className="text-sm font-semibold text-brown-dark">
            {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-brown-light">Total Amount</span>
          <span className="text-sm font-bold text-brown-dark">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="card mt-6 bg-cream-dark p-5 text-left">
        <h3 className="text-sm font-bold text-brown-dark">What happens next?</h3>
        <div className="mt-3 space-y-3">
          {[
            { num: 1, active: true, text: "You will receive an order confirmation email shortly" },
            { num: 2, active: false, text: "We will prepare and pack your order fresh" },
            { num: 3, active: false, text: "Delivery within 24 hours across Chennai" },
          ].map((step) => (
            <div key={step.num} className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step.active ? "bg-maroon text-white" : "bg-border text-brown-light"
                }`}
              >
                {step.num}
              </div>
              <span className={`text-sm ${step.active ? "text-brown-dark" : "text-brown-light"}`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/shop/" className="btn-primary flex-1">
          Continue Shopping
        </Link>
        <Link href="/track-order/" className="btn-secondary flex-1">
          Track Order
        </Link>
      </div>
    </div>
  );
}
