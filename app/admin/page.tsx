export default function AdminPage() {
  const stats = [
    { label: "Today\'s Sales", value: "₹12,450", change: "↑ 12%", color: "border-maroon" },
    { label: "Total Orders", value: "24", change: "↑ 5 new", color: "border-gold-dark" },
    { label: "Pending Orders", value: "8", change: "Action required", color: "border-green-700" },
    { label: "Low Stock", value: "5", change: "Restock needed", color: "border-brown" },
  ];

  const orders = [
    { id: "SD202600001", customer: "Ramesh K", total: "₹847", status: "Processing", date: "8 Aug 2026" },
    { id: "SD202600002", customer: "Priya S", total: "₹1,240", status: "Placed", date: "8 Aug 2026" },
    { id: "SD202600003", customer: "Venkatesh R", total: "₹399", status: "Delivered", date: "7 Aug 2026" },
    { id: "SD202600004", customer: "Lakshmi M", total: "₹2,150", status: "Packed", date: "7 Aug 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon font-bold">SD</div>
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <span className="text-sm opacity-70">Welcome, Admin</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-xl border-l-4 bg-white p-5 shadow-sm ${s.color}`}>
              <p className="text-xs font-medium uppercase tracking-wider text-brown-light">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-brown-dark">{s.value}</p>
              <p className="mt-1 text-xs text-green-600">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="font-bold text-brown-dark">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-brown-light">
                <tr>
                  <th className="px-6 py-3">Order #</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-maroon">{o.id}</td>
                    <td className="px-6 py-3 text-brown-dark">{o.customer}</td>
                    <td className="px-6 py-3 text-brown-light">{o.date}</td>
                    <td className="px-6 py-3 font-medium text-brown-dark">{o.total}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          o.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
