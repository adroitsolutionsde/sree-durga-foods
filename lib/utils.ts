import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ORDER_CONFIG } from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

export function generateOrderNumber(): string {
  const prefix = ORDER_CONFIG.prefix;
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${year}${random}`;
}

export const ORDER_STATUS_FLOW = ORDER_CONFIG.statusFlow;