"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/product/ProductCard";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brown-dark to-brown py-14 text-center text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Our Shop</h1>
        <p className="mt-2 opacity-80">Discover authentic traditional foods from Chennai</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:flex md:gap-8 md:px-6">
        {/* Sidebar Filters */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="card p-5">
            <h3 className="text-base font-bold text-brown-dark">Filters</h3>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brown">
                Categories
              </p>
              <div className="mt-2 space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedCategory === "" ? "bg-maroon/10 font-medium text-maroon" : "text-brown-light hover:bg-cream-dark"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-maroon/10 font-medium text-maroon"
                        : "text-brown-light hover:bg-cream-dark"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <p className="text-sm text-brown-light">
            Showing <span className="font-semibold text-brown-dark">{filteredProducts.length}</span> products
          </p>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-brown"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {mobileFiltersOpen && (
          <div className="mb-4 card p-4 md:hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-brown">Categories</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedCategory(""); setMobileFiltersOpen(false); }}
                className={`rounded-full px-3 py-1 text-xs ${selectedCategory === "" ? "bg-maroon text-white" : "border border-border bg-white text-brown"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.slug); setMobileFiltersOpen(false); }}
                  className={`rounded-full px-3 py-1 text-xs ${selectedCategory === cat.slug ? "bg-maroon text-white" : "border border-border bg-white text-brown"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 hidden items-center justify-between md:flex">
            <p className="text-sm text-brown-light">
              Showing <span className="font-semibold text-brown-dark">{filteredProducts.length}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bestseller">Best Selling</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-brown-light">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory("")}
                className="btn-primary mt-4"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
