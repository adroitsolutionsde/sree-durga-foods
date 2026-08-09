"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const ORDER_STATUS_FLOW = [
  { status: "Order Placed", date: "8 Aug 2026, 10:30 AM", done: true },
  { status: "Payment Confirmed", date: "8 Aug 2026, 10:32 AM", done: true },
  { status: "Processing", date: "8 Aug 2026, 11:00 AM", done: true },
  { status: "Packed", date: "Pending", done: false },
  { status: "Shipped", date: "Pending", done: false },
  { status: "Out for Delivery", date: "Pending", done: false },
  { status: "Delivered", date: "Expected by 9 Aug 2026", done: false },
];

export default function TrackOrderPage() {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="mx-auto max-w-xl px-4 py-12 md:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brown-dark">Track Your Order</h1>
        <p className="mt-1 text-sm text-brown-light">Enter your order details to check the status</p>
      </div>

      <div className="card mt-6 p-5">
        <div className="flex gap-3">
          <input type="text" placeholder="Order Number (e.g. SD202600001)" className="input flex-1" />
          <input type="tel" placeholder="Mobile" className="input w-32" />
        </div>
        <button className="btn-primary mt-3 w-full">
          <Search className="mr-2 h-4 w-4" />
          Track Order
        </button>
      </div>

      {showDemo && (
        <div className="card mt-8 p-6">
          <h3 className="text-sm font-bold text-brown-dark">
            Order Timeline — <span className="text-maroon">SD202600001</span>
          </h3>
          <div className="relative mt-6 pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
            {ORDER_STATUS_FLOW.map((step, idx) => (
              <div key={step.status} className="relative mb-6 last:mb-0">
                <div
                  className={`absolute -left-5 top-0.5 h-3 w-3 rounded-full border-2 ${
                    step.done
                      ? "border-maroon bg-maroon"
                      : "border-border bg-cream"
                  }`}
                />
                <p className={`text-sm font-semibold ${step.done ? "text-brown-dark" : "text-brown-light"}`}>
                  {step.status}
                </p>
                <p className="text-xs text-brown-light">{step.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
