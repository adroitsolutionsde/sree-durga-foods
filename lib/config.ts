export const BUSINESS_CONFIG = {
  legalName: "Suganya K",
  tradeName: "Sree Durga Food Industries",
  businessType: "Proprietorship",
  gstNumber: "33FHSPS6377C1ZR",
  address: {
    line1: "No. 135, Village High Road",
    area: "Sholinganallur",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600119",
    country: "India",
  },
  phone: "+91 93812 22324",
  email: "info@sreedurgafoodindustries.com",
  whatsappNumber: "919381222324",
} as const;

export const DELIVERY_CONFIG = {
  freeThreshold: 999,
  charge: 60,
} as const;

export const GST_CONFIG = {
  rate: 0.05,
} as const;

export const PAYMENT_CONFIG = {
  bankDetails: {
    bankName: "[To be configured]",
    accountName: "[To be configured]",
    accountNumber: "[To be configured]",
    ifscCode: "[To be configured]",
  },
} as const;

export const ORDER_CONFIG = {
  prefix: "SD",
  statusFlow: [
    "PLACED",
    "PAYMENT_CONFIRMED",
    "PROCESSING",
    "PACKED",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ] as const,
} as const;

export const APP_CONFIG = {
  name: "Sree Durga Food Industries",
  description: "Authentic traditional Tamil foods made with care and delivered to your doorstep across Chennai.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.sreedurgafoodindustries.com",
} as const;