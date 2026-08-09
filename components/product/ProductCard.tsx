"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/lib/store";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice! : product.price;
  const discountPercent = hasDiscount
    ? calculateDiscount(product.price, product.discountPrice!)
    : calculateDiscount(product.mrp, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: displayPrice,
      mrp: product.mrp,
      quantity: 1,
      weight: product.weight,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group card flex flex-col overflow-hidden">
      <Link href={`/shop/${product.slug}/`} className="relative block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        {discountPercent > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-maroon px-2 py-0.5 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}
        {product.isBestseller && (
          <span className="absolute right-2 top-2 rounded-lg bg-gold px-2 py-0.5 text-[10px] font-bold text-brown-dark">
            Bestseller
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] uppercase tracking-wider text-brown-light">
          {product.category}
        </p>
        <Link href={`/shop/${product.slug}/`}>
          <h3 className="mt-1 text-sm font-semibold text-brown-dark line-clamp-1 hover:text-maroon">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-xs text-brown">{product.rating}</span>
          <span className="text-xs text-brown-light">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-base font-bold text-maroon">
              {formatPrice(displayPrice)}
            </span>
            {displayPrice < product.mrp && (
              <span className="ml-1 text-xs text-brown-light line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
            <p className="text-[10px] text-brown-light">{product.weight}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon text-white shadow-premium transition-transform hover:scale-105 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
