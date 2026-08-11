"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Truck, Building2, Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { PaymentMethod } from "@/types";
import { PAYMENT_CONFIG } from "@/lib/config";

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  houseFlat: string;
  streetArea: string;
  city: string;
  pincode: string;
  state: string;
  landmark: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  houseFlat?: string;
  streetArea?: string;
  city?: string;
  pincode?: string;
  state?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getGstAmount, getDeliveryCharge, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [isPlacing, setIsPlacing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    houseFlat: "",
    streetArea: "",
    city: "Chennai",
    pincode: "",
    state: "Tamil Nadu",
    landmark: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <h1 className="text-2xl font-bold text-brown-dark">Your cart is empty</h1>
        <p className="mt-2 text-brown-light">Add some products before checking out.</p>
      </div>
    );
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        break;
      case "mobile":
        if (!value.trim()) return "Mobile number is required";
        if (!/^[6-9]\d{9}$/.test(value.trim())) return "Enter a valid 10-digit Indian mobile number";
        break;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address";
        break;
      case "houseFlat":
        if (!value.trim()) return "House/Flat/Building is required";
        break;
      case "streetArea":
        if (!value.trim()) return "Street/Area is required";
        break;
      case "city":
        if (!value.trim()) return "City is required";
        break;
      case "pincode":
        if (!value.trim()) return "PIN code is required";
        if (!/^\d{6}$/.test(value.trim())) return "Enter a valid 6-digit PIN code";
        break;
      case "state":
        if (!value.trim()) return "State is required";
        break;
    }
    return undefined;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (key !== "landmark") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    const allTouched = Object.fromEntries(
      (Object.keys(formData) as Array<keyof FormData>).map((key) => [key, true])
    );
    setTouched(allTouched);
    return isValid;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsPlacing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const orderNumber = generateOrderNumber();
    const total = getTotal();
    clearCart();
    router.push(`/order-confirmation/?order=${orderNumber}&total=${total}`);
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
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  className={`input ${errors.fullName && touched.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.fullName && touched.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName && touched.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && touched.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mobile Number"
                  className={`input ${errors.mobile && touched.mobile ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.mobile && touched.mobile ? "true" : "false"}
                  aria-describedby={errors.mobile && touched.mobile ? "mobile-error" : undefined}
                  maxLength={10}
                />
                {errors.mobile && touched.mobile && (
                  <p id="mobile-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.mobile}
                  </p>
                )}
              </div>
              <div className="relative sm:col-span-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  className={`input ${errors.email && touched.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative sm:col-span-2">
                <input
                  type="text"
                  name="houseFlat"
                  value={formData.houseFlat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="House / Flat / Building"
                  className={`input ${errors.houseFlat && touched.houseFlat ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.houseFlat && touched.houseFlat ? "true" : "false"}
                  aria-describedby={errors.houseFlat && touched.houseFlat ? "houseFlat-error" : undefined}
                />
                {errors.houseFlat && touched.houseFlat && (
                  <p id="houseFlat-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.houseFlat}
                  </p>
                )}
              </div>
              <div className="relative sm:col-span-2">
                <input
                  type="text"
                  name="streetArea"
                  value={formData.streetArea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Street / Area"
                  className={`input ${errors.streetArea && touched.streetArea ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.streetArea && touched.streetArea ? "true" : "false"}
                  aria-describedby={errors.streetArea && touched.streetArea ? "streetArea-error" : undefined}
                />
                {errors.streetArea && touched.streetArea && (
                  <p id="streetArea-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.streetArea}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="City"
                  className={`input ${errors.city && touched.city ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.city && touched.city ? "true" : "false"}
                  aria-describedby={errors.city && touched.city ? "city-error" : undefined}
                />
                {errors.city && touched.city && (
                  <p id="city-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="PIN Code"
                  className={`input ${errors.pincode && touched.pincode ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.pincode && touched.pincode ? "true" : "false"}
                  aria-describedby={errors.pincode && touched.pincode ? "pincode-error" : undefined}
                  maxLength={6}
                />
                {errors.pincode && touched.pincode && (
                  <p id="pincode-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.pincode}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="State"
                  className={`input ${errors.state && touched.state ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  aria-invalid={errors.state && touched.state ? "true" : "false"}
                  aria-describedby={errors.state && touched.state ? "state-error" : undefined}
                />
                {errors.state && touched.state && (
                  <p id="state-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.state}
                  </p>
                )}
              </div>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Landmark (Optional)"
                className="input"
              />
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
                <p className="font-semibold text-brown-dark">Bank Details</p>
                <div className="mt-2 space-y-1 text-brown-light">
                  <p>Bank Name: {PAYMENT_CONFIG.bankDetails.bankName}</p>
                  <p>Account Name: {PAYMENT_CONFIG.bankDetails.accountName}</p>
                  <p>Account Number: {PAYMENT_CONFIG.bankDetails.accountNumber}</p>
                  <p>IFSC Code: {PAYMENT_CONFIG.bankDetails.ifscCode}</p>
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
