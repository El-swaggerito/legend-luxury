"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LuCreditCard, LuLock } from "react-icons/lu";

// Make sure to replace with your public key from Stripe Dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

function StripeForm({ onSubmit }: { onSubmit: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Mock API call
    try {
        // In a real app, you would fetch the clientSecret from your backend here
        // const { clientSecret } = await fetch('/api/create-payment-intent', ...).then(r => r.json());
        
        // Simulating a delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For now, we just trigger the parent submit handler which will handle the "success" state
        onSubmit();
        
    } catch (err) {
        setError("Payment failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
      <div className="rounded-lg border border-neutral-300 bg-white p-4 transition-all focus-within:border-accent-500 focus-within:ring-1 focus-within:ring-accent-500">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-4 font-bold text-white transition-all hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>Processing...</>
        ) : (
          <>
            <LuLock className="h-4 w-4" /> Pay with Card
          </>
        )}
      </button>
      <p className="text-center text-xs text-neutral-500">
        Your payment is processed securely by Stripe.
      </p>
    </form>
  );
}

export default function PaymentSection({ total }: { total: number }) {
  const [method, setMethod] = useState<"stripe" | "paypal">("stripe");
  const { register, formState: { errors } } = useFormContext();

  const handlePaymentSuccess = () => {
      alert("Payment Successful! (This is a demo)");
      // Redirect to success page
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-serif text-neutral-900">Payment Method</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className={`relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all ${
            method === "stripe"
              ? "border-accent-600 bg-accent-50/50 ring-1 ring-accent-600"
              : "border-neutral-200 bg-white hover:border-neutral-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="stripe"
            checked={method === "stripe"}
            onChange={() => setMethod("stripe")}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900">Credit Card</span>
            <LuCreditCard className={`h-6 w-6 ${method === 'stripe' ? 'text-accent-600' : 'text-neutral-400'}`} />
          </div>
          <span className="text-sm text-neutral-500">Pay securely with Stripe</span>
        </label>

        <label
          className={`relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all ${
            method === "paypal"
              ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
              : "border-neutral-200 bg-white hover:border-neutral-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={method === "paypal"}
            onChange={() => setMethod("paypal")}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900">PayPal</span>
            {/* Simple Text Icon for PayPal */}
            <span className="font-bold italic text-blue-700">PayPal</span>
          </div>
          <span className="text-sm text-neutral-500">Pay with your PayPal account</span>
        </label>
      </div>

      <div className="mt-6">
        {method === "stripe" && (
          <Elements stripe={stripePromise}>
            <StripeForm onSubmit={handlePaymentSuccess} />
          </Elements>
        )}

        {method === "paypal" && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                <PayPalButtons 
                    style={{ layout: "vertical", shape: "rect", borderRadius: 10 }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: total.toFixed(2),
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        if (actions.order) {
                            await actions.order.capture();
                            handlePaymentSuccess();
                        }
                    }}
                />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
}
