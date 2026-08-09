"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Minus, Plus, ShoppingCart, Truck, Shield, Clock } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/lib/store";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((s) => s.addItem);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <h1 className="text-2xl font-bold text-brown-dark">Product Not Found</h1>
        <Link href="/shop/" className="btn-primary mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants?.[selectedVariant];
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayMrp = currentVariant ? currentVariant.mrp : product.mrp;
  const displayWeight = currentVariant ? currentVariant.name : product.weight;
  const discountPercent = calculateDiscount(displayMrp, displayPrice);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: currentVariant?.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: displayPrice,
      mrp: displayMrp,
      quantity,
      weight: displayWeight,
      variantName: currentVariant?.name,
    });
    toast.success(`${product.name} (${displayWeight}) added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Link href="/shop/" className="text-sm font-medium text-maroon hover:underline">
        ← Back to Shop
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-cream-dark">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    selectedImage === idx ? "border-maroon" : "border-border"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wider text-brown-light">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold text-brown-dark md:text-3xl">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-brown">{product.rating}</span>
            <span className="text-sm text-brown-light">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-maroon">{formatPrice(displayPrice)}</span>
            {displayPrice < displayMrp && (
              <>
                <span className="text-lg text-brown-light line-through">{formatPrice(displayMrp)}</span>
                <span className="rounded bg-maroon/10 px-2 py-0.5 text-xs font-bold text-maroon">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-brown-light">Inclusive of all taxes</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-brown-dark">Select Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(idx)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                      selectedVariant === idx
                        ? "border-maroon bg-maroon/10 font-medium text-maroon"
                        : "border-border bg-white text-brown hover:border-maroon/50"
                    }`}
                  >
                    {variant.name}
                    <span className="ml-1 text-xs text-brown-light">{formatPrice(variant.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-brown-dark">Quantity</p>
            <div className="mt-2 inline-flex items-center rounded-lg border border-border bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-brown hover:text-maroon"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-brown hover:text-maroon"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1 gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
            <Link href="/checkout/" className="btn-secondary flex-1 text-center">
              Buy Now
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border bg-cream-dark p-4">
            <div className="text-center">
              <Truck className="mx-auto h-5 w-5 text-maroon" />
              <p className="mt-1 text-[10px] text-brown-light">Free delivery over ₹999</p>
            </div>
            <div className="text-center">
              <Shield className="mx-auto h-5 w-5 text-maroon" />
              <p className="mt-1 text-[10px] text-brown-light">Secure packaging</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto h-5 w-5 text-maroon" />
              <p className="mt-1 text-[10px] text-brown-light">24h delivery in Chennai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="mt-12">
        <div className="border-b border-border">
          <div className="flex gap-6">
            {["Description", "Ingredients", "Storage"].map((tab) => (
              <button
                key={tab}
                className="border-b-2 border-maroon pb-3 text-sm font-semibold text-maroon"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="py-6">
          <p className="text-sm leading-relaxed text-brown">{product.description}</p>
          {product.ingredients && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-brown-dark">Ingredients</p>
              <p className="mt-1 text-sm text-brown-light">{product.ingredients}</p>
            </div>
          )}
          {product.allergens && (
            <div className="mt-4 rounded-lg bg-red-50 p-3">
              <p className="text-sm font-semibold text-red-700">Allergen Information</p>
              <p className="text-sm text-red-600">{product.allergens}</p>
            </div>
          )}
          {product.storage && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-brown-dark">Storage Instructions</p>
              <p className="mt-1 text-sm text-brown-light">{product.storage}</p>
            </div>
          )}
          {product.shelfLife && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-brown-dark">Shelf Life</p>
              <p className="mt-1 text-sm text-brown-light">{product.shelfLife}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
