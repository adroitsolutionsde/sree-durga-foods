'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Heart, Sparkles, RefreshCw } from "lucide-react";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getBestsellerProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellerProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-brown-dark to-brown md:h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80"
            alt="Traditional Tamil food"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
          <span className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Chennai&apos;s Traditional Favourites
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Taste the Tradition of Chennai
          </h1>
          <p className="mt-4 max-w-lg text-base opacity-90 md:text-lg">
            Authentic traditional foods made with care and delivered to your doorstep across Chennai.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/shop/" className="btn-primary">
              Shop Now
            </Link>
            <button
              onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
            >
              Explore Our Foods
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6">
          {[
            { icon: Sparkles, title: "Authentic Recipes", desc: "Traditional Tamil methods" },
            { icon: Truck, title: "Chennai Delivery", desc: "Fast delivery across city" },
            { icon: Heart, title: "Made with Care", desc: "Quality & hygiene assured" },
            { icon: RefreshCw, title: "Fresh Preparation", desc: "Small batches daily" },
          ].map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-maroon">
                <badge.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-brown-dark">{badge.title}</h3>
              <p className="text-xs text-brown-light">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="section-title mb-10">
            <p className="section-title-label">Browse Collection</p>
            <h2 className="section-title-heading">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-shadow group-hover:shadow-card-hover">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-brown-dark group-hover:text-maroon">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div className="section-title text-left">
              <p className="section-title-label">Customer Favourites</p>
              <h2 className="section-title-heading mt-2">Best Sellers</h2>
            </div>
            <Link href="/shop/" className="text-sm font-semibold text-maroon hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="section-title mb-10">
            <p className="section-title-label">Handpicked For You</p>
            <h2 className="section-title-heading">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Festival Banner */}
      <section className="bg-gradient-to-br from-maroon to-maroon-dark py-14 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:px-6">
          <div>
            <span className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Festival Special
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">Diwali Traditional Gift Boxes</h2>
            <p className="mt-4 text-base opacity-90">
              Curated collections of sweets, savouries and traditional treats — perfect for gifting your loved ones this festive season.
            </p>
            <Link href="/shop/?category=gift-boxes" className="btn-primary mt-6 inline-flex bg-gold text-brown-dark hover:bg-gold-dark">
              Shop Gift Boxes
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=600&q=80"
              alt="Traditional Indian sweets"
              width={600}
              height={400}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="section-title mb-12">
            <p className="section-title-label">Our Promise</p>
            <h2 className="section-title-heading">Why Choose Sree Durga Food Industries</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "அ",
                color: "from-maroon to-maroon-light",
                title: "Authentic Taste",
                desc: "Every recipe follows traditional Tamil methods passed down through generations, bringing you the true taste of Chennai.",
              },
              {
                icon: "✦",
                color: "from-green-800 to-green-600",
                title: "Quality Ingredients",
                desc: "We source the finest ingredients and maintain strict quality control to ensure every bite meets our high standards.",
              },
              {
                icon: "♥",
                color: "from-gold-dark to-gold",
                title: "Made with Care",
                desc: "Each product is prepared in small batches with attention to detail, hygiene and the love that only traditional cooking can bring.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 md:p-8">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-lg text-white`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-brown-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-cream-dark py-14">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-card">
            🚚
          </div>
          <h2 className="mt-4 text-2xl font-bold text-brown-dark">Chennai Delivery, Made Simple</h2>
          <p className="mt-2 text-sm text-brown-light">
            Based in Sholinganallur, we deliver authentic traditional foods across Chennai. Free delivery on orders above ₹999.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-maroon">24h</div>
              <div className="text-xs text-brown-light">Delivery Time</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-maroon">₹999</div>
              <div className="text-xs text-brown-light">Free Delivery</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-maroon">COD</div>
              <div className="text-xs text-brown-light">Available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}