"use client";
import { LuArrowLeft, LuCheck, LuCircleCheck, LuFileText, LuMapPin, LuPackage, LuTruck, LuShoppingBag } from "react-icons/lu";

type OrderItem = { id: string; title: string; price: number; quantity: number; image: string; };
type Order = { id: string; status: string; total: number; email: string; name: string; address: string; apartment?: string; city: string; state: string; zip: string; country: string; phone: string; createdAt: string; OrderItem: OrderItem[]; };
type Props = { onBack: () => void; order?: Order | null; };

const steps = [
  { label: "Order Placed", icon: LuFileText },
  { label: "Packaging", icon: LuPackage },
  { label: "On The Road", icon: LuTruck },
  { label: "Delivered", icon: LuCircleCheck },
];

export default function OrderDetails({ onBack, order }: Props) {
  if (!order) return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-12 shadow-sm text-center">
      <LuShoppingBag className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
      <p className="text-neutral-500 font-medium">Select an order from Order History to view details.</p>
      <button onClick={onBack} className="mt-4 text-sm text-accent-600 hover:underline">Go to Order History</button>
    </div>
  );

  const statusStep = order.status === "SHIPPED" ? 2 : order.status === "DELIVERED" ? 3 : 1;
  const placedDate = new Date(order.createdAt).toLocaleDateString("en-US", { day:"2-digit", month:"short", year:"numeric" });
  const placedTime = new Date(order.createdAt).toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50 transition-colors">
            <LuArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">Order Details</h2>
        </div>
      </div>

      {/* Order Card */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Order ID</p>
            <h3 className="text-lg font-bold text-neutral-900">#{order.id.slice(0,8).toUpperCase()}</h3>
            <p className="mt-1 text-sm text-neutral-600">{order.OrderItem?.length ?? 0} item(s) • Placed {placedDate} at {placedTime}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Total</p>
            <p className="text-3xl font-bold text-indigo-600">${order.total.toFixed(2)}</p>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 mt-2">{order.status}</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-neutral-900 mb-6">Order Tracking</h3>
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-5 left-5 right-5 h-1 bg-neutral-100 rounded-full hidden sm:block" />
          {/* Progress line */}
          <div className="absolute top-5 left-5 h-1 bg-indigo-600 rounded-full hidden sm:block transition-all"
            style={{ width: `${(statusStep / 3) * 100}%`, right: "auto" }}
          />
          <div className="relative flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
            {steps.map((step, idx) => {
              const done = idx <= statusStep;
              return (
                <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-2 z-10">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${done ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-neutral-200 text-neutral-300"}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className={`text-sm font-medium sm:text-center ${done ? "text-neutral-900" : "text-neutral-400"}`}>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900">Items ({order.OrderItem?.length ?? 0})</h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {order.OrderItem?.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-6 py-4">
              <div className="h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-50 border border-neutral-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 text-sm truncate">{item.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <p className="font-bold text-neutral-900 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex justify-between">
          <span className="font-semibold text-neutral-900">Total</span>
          <span className="font-bold text-indigo-600">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Address */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <LuMapPin className="h-4 w-4 text-accent-600" /> Shipping Address
          </h3>
          <div className="text-sm text-neutral-600 space-y-1">
            <p className="font-semibold text-neutral-900">{order.name}</p>
            <p>{order.address}{order.apartment ? `, ${order.apartment}` : ""}</p>
            <p>{order.city}, {order.state} {order.zip}</p>
            <p>{order.country}</p>
            <p className="mt-2 text-neutral-500">{order.phone}</p>
            <p className="text-neutral-500">{order.email}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <LuFileText className="h-4 w-4 text-accent-600" /> Order Activity
          </h3>
          <div className="space-y-3">
            {[
              { label: "Order confirmed & payment received", done: true },
              { label: "Order verified and being packaged", done: statusStep >= 1 },
              { label: "Order picked up for delivery", done: statusStep >= 2 },
              { label: "Order delivered", done: statusStep >= 3 },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${a.done ? "bg-green-500" : "bg-neutral-200"}`}>
                  {a.done && <LuCheck className="h-3 w-3 text-white" />}
                </div>
                <p className={`text-sm ${a.done ? "text-neutral-900" : "text-neutral-400"}`}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}