import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="text-2xl font-bold text-brown-dark">My Account</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <div className="card p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-light text-3xl text-white">
              👤
            </div>
            <p className="mt-3 font-semibold text-brown-dark">Guest User</p>
            <p className="text-xs text-brown-light">Login to view your orders</p>
          </div>
          <div className="card mt-4 p-4">
            <div className="flex flex-col gap-1">
              {[
                { icon: "🔑", label: "Login" },
                { icon: "📦", label: "My Orders", href: "/track-order/" },
                { icon: "❤️", label: "Wishlist" },
                { icon: "📍", label: "Addresses" },
                { icon: "🧾", label: "Invoices" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-brown hover:bg-cream-dark"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card p-8 text-center">
            <div className="text-5xl">🍽️</div>
            <h3 className="mt-4 text-lg font-bold text-brown-dark">
              Welcome to Sree Durga Food Industries
            </h3>
            <p className="mt-2 text-sm text-brown-light">
              Create an account to track orders, save addresses, and reorder your favourite traditional foods.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button className="btn-primary">Create Account</button>
              <button className="btn-secondary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
