"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LuCheck, LuX } from "react-icons/lu";
import confetti from "canvas-confetti";
import { useCurrency } from "../../context/CurrencyContext";

type PaymentSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  transactionId?: string;
};

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  amount,
  transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
}: PaymentSuccessModalProps) {
  const { formatPrice } = useCurrency();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
      
      // Trigger Confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 101 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Safety cleanup in case component unmounts while open
      return () => {
        document.body.style.overflow = "unset";
        clearInterval(interval);
      };
    } else {
      const timer = setTimeout(() => setShow(false), 300); // Wait for animation
      document.body.style.overflow = "unset";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!show && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {/* Success Icon Animation */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30 transition-all duration-700 ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
             <svg 
               className="h-10 w-10 text-white" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor" 
               strokeWidth="3"
             >
               <path 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 d="M5 13l4 4L19 7" 
                 className={`path-check ${isOpen ? 'animate-check' : ''}`}
               />
             </svg>
          </div>
        </div>
        
        <style jsx>{`
          .path-check {
            stroke-dasharray: 24;
            stroke-dashoffset: 24;
          }
          .animate-check {
            animation: drawCheck 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.3s;
          }
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>

        <h2 
          id="modal-title" 
          className="mb-2 text-2xl font-bold text-neutral-900 font-serif"
        >
          Payment Successful!
        </h2>
        
        <p className="mb-8 text-neutral-500">
          Thank you for your purchase. Your order has been processed successfully.
        </p>

        <div className="mb-8 rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
          <div className="mb-2 flex justify-between border-b border-neutral-200 pb-2 text-sm text-neutral-500">
            <span>Transaction ID</span>
            <span className="font-mono text-neutral-900">{transactionId}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-medium text-neutral-500">Amount Paid</span>
            <span className="text-xl font-bold text-neutral-900">{formatPrice(amount)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            onClick={onClose}
            className="w-full rounded-full bg-neutral-900 px-6 py-4 font-bold text-white shadow-lg shadow-neutral-900/20 transition-transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
