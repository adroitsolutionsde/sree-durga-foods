"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold text-brown-dark">Search Products</h1>
      <div className="relative mt-4">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brown-light" />
        <input
          type="text"
          placeholder="Search for Murukku, Sweets, Pickles..."
          className="input pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {query.length >= 2 && (
        <div className="mt-6">
          <p className="mb-4 text-sm text-brown-light">
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-brown-light">No products found. Try different keywords.</p>
            </div>
          )}
        </div>
      )}

      {query.length < 2 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-brown-light">Popular Searches</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Murukku", "Adhirasam", "Mango Pickle", "Rasam Powder", "Gift Box"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="rounded-full border border-border bg-white px-4 py-1.5 text-sm text-brown hover:border-maroon"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
