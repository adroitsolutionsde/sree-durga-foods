import { Suspense } from "react";
import OrderConfirmationContent from "./OrderConfirmationContent";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-brown-light">Loading order details...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}