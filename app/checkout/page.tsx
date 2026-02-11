"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import OrderSummary from "./components/OrderSummary";
import ShippingForm from "./components/ShippingForm";
import PaymentSection from "./components/PaymentSection";
import PaymentSuccessModal from "./components/PaymentSuccessModal";
import { useCart } from "../context/CartContext";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(10, "Phone number is required"),
});

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "US",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Proceed to payment processing
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    clear(); // Clear cart on success
  };

  if (items.length === 0 && !showSuccess) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold font-serif mb-4">Your cart is empty</h1>
            <Link href="/" className="text-accent-600 hover:underline">Return to Home</Link>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2">
          <Link href="/shop" className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            <LuChevronLeft className="h-4 w-4" /> Back to Shop
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold font-serif text-neutral-900 lg:text-4xl">Checkout</h1>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Form Area */}
          <div className="lg:col-span-7">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-10">
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address</label>
                    <input
                      {...methods.register("email")}
                      id="email"
                      type="email"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                    {methods.formState.errors.email && (
                      <p className="text-xs text-red-500">{methods.formState.errors.email.message as string}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <ShippingForm />

                {/* Payment Section */}
                <PaymentSection total={total * 1.08 + 10} onSuccess={handleSuccess} />
                
              </form>
            </FormProvider>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      
      <PaymentSuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
        amount={total * 1.08 + 10}
      />
    </div>
  );
}
