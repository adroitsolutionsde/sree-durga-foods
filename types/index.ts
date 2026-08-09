export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  category: string;
  categorySlug: string;
  mrp: number;
  price: number;
  discountPrice?: number;
  gstRate: number;
  weight: string;
  stock: number;
  sku: string;
  ingredients?: string;
  allergens?: string;
  shelfLife?: string;
  storage?: string;
  images: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  mrp: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  mrp: number;
  quantity: number;
  weight: string;
  variantName?: string;
}

export interface Address {
  id?: string;
  label?: string;
  name: string;
  phone: string;
  email: string;
  house: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gstAmount: number;
  deliveryCharge: number;
  total: number;
  shippingAddress: Address;
  createdAt: string;
}

export type OrderStatus = 
  | "PLACED" 
  | "PAYMENT_CONFIRMED" 
  | "PROCESSING" 
  | "PACKED" 
  | "SHIPPED" 
  | "OUT_FOR_DELIVERY" 
  | "DELIVERED" 
  | "CANCELLED";

export type PaymentStatus = 
  | "PENDING" 
  | "PAID" 
  | "FAILED" 
  | "COD" 
  | "BANK_TRANSFER_PENDING";

export type PaymentMethod = "UPI" | "CARD" | "COD" | "BANK_TRANSFER";
