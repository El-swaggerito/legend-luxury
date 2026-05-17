
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { LuMapPin, LuPackage, LuCreditCard, LuSettings, LuLogOut, LuChevronLeft, LuFileText } from "react-icons/lu";
import OrderDetails from "./components/OrderDetails";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!authLoading) {
      // Simulate fetching user data
      const timer = setTimeout(() => {
        setLoading(false);
      fetch("/api/orders").then(r=>r.json()).then(d=>setOrders(d.orders??[]));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (!user) return null;

  // Helper component for icons to avoid "cannot be used as a JSX component" error
  const UserIcon = (props: any) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const menuItems = [
    { id: "overview", label: "Overview", icon: UserIcon },
    { id: "orders", label: "Order History", icon: LuPackage },
    { id: "order-details", label: "Order Details", icon: LuFileText },
    { id: "addresses", label: "Addresses", icon: LuMapPin },
    { id: "payment", label: "Payment Methods", icon: LuCreditCard },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 pb-20 pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <LuChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-100 bg-neutral-50">
                {/* Using a generic placeholder if the specific image doesn't work well as avatar, 
                    but using the one defined in user object for now. */}
                <div className="flex h-full w-full items-center justify-center bg-accent-100 text-accent-600 text-2xl font-bold">
                  {user.name?.charAt(0) || "U"}
                </div>
              </div>
              <h1 className="mt-4 text-xl font-bold text-neutral-900">{user.name}</h1>
              <p className="text-sm text-neutral-500">{user.email}</p>
              <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-sm text-neutral-600 italic">
                "{user.bio || "No bio yet"}"
              </div>
              <p className="mt-4 text-xs text-neutral-400 uppercase tracking-wider font-semibold">Member</p>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="hidden lg:block rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-medium transition-colors border-l-4 ${
                    activeTab === item.id
                      ? "border-accent-600 bg-accent-50 text-black"
                      : "border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-neutral-100">
                <button 
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent"
                >
                  <LuLogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Mobile Navigation Tabs */}
            <div className="lg:hidden mb-6 flex overflow-x-auto pb-2 scrollbar-hide gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-none rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? "bg-neutral-200 text-black"
                      : "bg-white border border-neutral-200 text-neutral-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Content Panels */}
              <div className="space-y-6">
                <div className="border-t border-neutral-100 lg:hidden">
                  <button 
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LuLogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-neutral-900">Recent Orders</h3>
                        <button 
                          onClick={() => setActiveTab("orders")}
                          className="text-sm text-accent-600 hover:underline"
                        >
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        {orders.length === 0 ? (
                          <p className="text-sm text-neutral-400 text-center py-2">No orders yet.</p>
                        ) : orders.slice(0, 2).map((o) => (
                          <div key={o.id} onClick={() => { setSelectedOrder(o); setActiveTab("order-details"); }}
                            className="flex gap-4 items-center p-3 rounded-lg bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="h-12 w-12 rounded bg-accent-100 flex-shrink-0 flex items-center justify-center text-accent-600 font-bold text-xs">
                              #{o.id.slice(0,4).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-900">Order #{o.id.slice(0,8).toUpperCase()}</p>
                              <p className="text-xs text-neutral-500">{o.status} • {new Date(o.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-neutral-900">Default Address</h3>
                        <button 
                          onClick={() => setActiveTab("addresses")}
                          className="text-sm text-accent-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-sm text-neutral-600 leading-relaxed">
                        <p className="font-medium text-neutral-900">{user.name}</p>
                        <p>123 Croc Avenue</p>
                        <p>Suite 404</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
                      <h3 className="font-bold text-neutral-900">Order History</h3>
                    </div>
                    <div className="divide-y divide-neutral-100">
                      {orders.length===0?(<div className="p-8 text-center text-sm text-neutral-400">No orders yet.</div>):orders.map((o)=>(<div key={o.id} onClick={()=>{setSelectedOrder(o);setActiveTab("order-details");}} className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer group"><div className="flex justify-between items-start mb-2"><div><p className="font-semibold text-neutral-900 group-hover:text-accent-600 transition-colors">Order #{o.id.slice(0,8).toUpperCase()}</p><p className="text-sm text-neutral-500">Placed on {new Date(o.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p></div><span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{o.status}</span></div><div className="flex justify-between items-center"><p className="text-sm text-neutral-600">{o.OrderItem?.length??0} item(s)</p><p className="font-bold text-neutral-900">${o.total?.toFixed(2)}</p></div></div>))}
                    </div>
                  </div>
                )}

                {activeTab === "order-details" && (
                  <OrderDetails onBack={() => setActiveTab("orders")} order={selectedOrder} />
                )}

                {activeTab !== "overview" && activeTab !== "orders" && activeTab !== "order-details" && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm text-center py-20">
                    <div className="mx-auto h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                      <LuSettings className="h-8 w-8 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Coming Soon</h3>
                    <p className="text-neutral-500 max-w-md mx-auto mt-2">
                      The {menuItems.find(i => i.id === activeTab)?.label} section is currently under development. Check back later!
                    </p>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}