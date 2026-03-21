"use client";

import { 
  LuArrowLeft, 
  LuCheck,
  LuCircleCheck,
  LuFileText, 
  LuMapPin,
  LuPackage, 
  LuTruck, 
  LuUser
} from "react-icons/lu";

type OrderDetailsProps = {
  onBack: () => void;
};

export default function OrderDetails({ onBack }: OrderDetailsProps) {
  // Mock Data matching the screenshot
  const order = {
    id: "#96459761",
    itemCount: 4,
    placedDate: "17 FEB, 2026 at 7:32 PM",
    total: 1199.00,
    expectedArrival: "23 Feb, 2026",
    status: "Delivered",
    steps: [
      { label: "Order Placed", date: "17 Feb, 2026", icon: LuFileText, completed: true },
      { label: "Packaging", date: "18 Feb, 2026", icon: LuPackage, completed: true },
      { label: "On The Road", date: "19 Feb, 2026", icon: LuTruck, completed: true },
      { label: "Delivered", date: "23 Feb, 2026", icon: LuCircleCheck, completed: true },
    ],
    activity: [
      {
        title: "Your order has been delivered. Thank you for shopping at Clicon!",
        date: "23 Feb, 2026 at 7:32 PM",
        icon: LuCheck,
        type: "success"
      },
      {
        title: "Our delivery man (John Wick) Has picked-up your order for delivery.",
        date: "23 Feb, 2026 at 2:00 PM",
        icon: LuUser,
        type: "info"
      },
      {
        title: "Your order has reached at last mile hub.",
        date: "22 Feb, 2026 at 8:00 AM",
        icon: LuMapPin,
        type: "info"
      },
      {
        title: "Your order on the way to (last mile) hub.",
        date: "21 Feb, 2026 at 5:32 AM",
        icon: LuTruck,
        type: "info"
      },
      {
        title: "Your order is successfully verified.",
        date: "20 Feb, 2026 at 7:32 PM",
        icon: LuCircleCheck,
        type: "success"
      },
      {
        title: "Your order has been confirmed.",
        date: "19 Feb, 2026 at 2:61 PM",
        icon: LuFileText,
        type: "info"
      }
    ],
    products: [
      {
        id: 1,
        name: "Black & Chain Crocs",
        price: 100.00,
        qty: 2,
        image: "/images/products/black&chaincrocs.JPG"
      },
      {
        id: 2,
        name: "Dark Pink Crocs",
        price: 100.00,
        qty: 1,
        image: "/images/products/darkpinkcrocs.JPG"
      }
    ],
    billingAddress: {
      name: "Kevin Gilbert",
      address: "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
      phone: "+1-202-555-0118",
      email: "kevin.gilbert@gmail.com"
    },
    shippingAddress: {
      name: "Kevin Gilbert",
      address: "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
      phone: "+1-202-555-0118",
      email: "kevin.gilbert@gmail.com"
    },
    notes: "Donec ac vehicula turpis. Aenean sagittis est eu arcu ornare, eget venenatis purus lobortis. Aliquam erat volutpat. Aliquam magna odio."
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50 transition-colors"
          >
            <LuArrowLeft className="h-5 w-5 text-neutral-900" />
          </button>
          <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-900">Order Details</h2>
        </div>
        <button className="text-sm font-medium text-accent-600 hover:underline">
          Leave a Rating
        </button>
      </div>

      {/* Top Card */}
      <div className="mb-8 rounded-xl bg-[#FFFBF0] p-6 border border-[#F7E9C3]">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900">{order.id}</h3>
            <div className="mt-1 flex flex-wrap gap-2 text-sm text-neutral-600">
              <span>{order.itemCount} Products</span>
              <span className="text-neutral-400">•</span>
              <span>Order Placed in {order.placedDate}</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-indigo-600">
            ${order.total.toFixed(2)}
          </div>
        </div>
        <p className="mt-6 text-sm text-neutral-900">
          Order expected arrival <span className="font-bold">{order.expectedArrival}</span>
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-12 relative px-4">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1.5 bg-neutral-100 rounded-full mx-12 hidden md:block">
          <div className="h-full bg-indigo-600 rounded-full w-full"></div>
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          {order.steps.map((step, idx) => (
            <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-indigo-600 text-indigo-600 shadow-sm">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="md:text-center">
                <p className="font-semibold text-neutral-900">{step.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Activity */}
      <div className="mb-12">
        <h3 className="mb-6 text-lg font-bold text-neutral-900">Order Activity</h3>
        <div className="space-y-6 pl-4 border-l-2 border-neutral-100 ml-3">
          {order.activity.map((activity, idx) => (
            <div key={idx} className="relative flex gap-4">
              <div className={`absolute -left-[25px] flex h-10 w-10 items-center justify-center rounded-md border ${
                activity.type === 'success' ? 'bg-green-50 border-green-100 text-green-600' : 
                activity.type === 'info' ? 'bg-blue-50 border-blue-100 text-blue-500' : 'bg-neutral-50 border-neutral-200 text-neutral-500'
              }`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="pt-1">
                <p className="text-sm font-medium text-neutral-900">{activity.title}</p>
                <p className="mt-1 text-xs text-neutral-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="mb-12">
        <h3 className="mb-4 text-lg font-bold text-neutral-900">Product ({order.products.length.toString().padStart(2, '0')})</h3>
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <div className="grid grid-cols-12 bg-neutral-50 px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <div className="col-span-6">Products</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2 text-right">Sub-Total</div>
          </div>
          <div className="divide-y divide-neutral-100">
            {order.products.map((product) => (
              <div key={product.id} className="grid grid-cols-12 items-center px-6 py-4">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="h-12 w-12 flex-shrink-0 rounded bg-neutral-100 overflow-hidden relative">
                    {/* Placeholder image logic */}
                    <div className="absolute inset-0 bg-neutral-200" />
                  </div>
                  <span className="font-medium text-neutral-900">{product.name}</span>
                </div>
                <div className="col-span-2 text-sm text-neutral-600">${product.price.toFixed(2)}</div>
                <div className="col-span-2 text-sm text-neutral-600">x{product.qty}</div>
                <div className="col-span-2 text-right text-sm font-bold text-neutral-900">
                  ${(product.price * product.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Addresses Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-bold text-neutral-900">Billing Address</h3>
          <div className="text-sm text-neutral-600 space-y-2">
            <p className="font-semibold text-neutral-900">{order.billingAddress.name}</p>
            <p className="leading-relaxed">{order.billingAddress.address}</p>
            <p><span className="font-medium text-neutral-900">Phone Number:</span> {order.billingAddress.phone}</p>
            <p><span className="font-medium text-neutral-900">Email:</span> {order.billingAddress.email}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-neutral-900">Shipping Address</h3>
          <div className="text-sm text-neutral-600 space-y-2">
            <p className="font-semibold text-neutral-900">{order.shippingAddress.name}</p>
            <p className="leading-relaxed">{order.shippingAddress.address}</p>
            <p><span className="font-medium text-neutral-900">Phone Number:</span> {order.shippingAddress.phone}</p>
            <p><span className="font-medium text-neutral-900">Email:</span> {order.shippingAddress.email}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-neutral-900">Order Notes</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {order.notes}
          </p>
        </div>
      </div>
    </div>
  );
}
