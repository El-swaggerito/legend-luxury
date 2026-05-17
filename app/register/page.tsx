"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import { LuUser, LuMail, LuLock, LuArrowRight, LuCircleCheck, LuEye, LuEyeOff } from "react-icons/lu";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match", path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    const err = await registerUser(`${data.firstName} ${data.lastName}`, data.email, data.password);
    if (err) setError(err);
  };

  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-accent-900 relative overflow-hidden items-center justify-center">
        <Image src="/images/formimg.jpeg" alt="Register Background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-accent-900/60" />
        <div className="relative z-10 text-center px-12 text-white">
          <h1 className="text-5xl font-serif font-bold mb-6">Join the Legend</h1>
          <p className="text-xl text-accent-100 max-w-md mx-auto leading-relaxed">
            Create an account to unlock exclusive rewards, early access to drops, and personalized recommendations.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6 text-left max-w-sm mx-auto">
            {["Fast Checkout", "Exclusive Deals", "Order Tracking", "Wishlist"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <LuCircleCheck className="h-6 w-6 text-accent-400" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Create an account</h2>
            <p className="mt-2 text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-accent-600 hover:text-accent-500 transition-colors">Sign in</Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input id="firstName" label="First Name" startIcon={<LuUser className="h-5 w-5" />}
                  status={errors.firstName ? "error" : "default"} help={errors.firstName?.message} {...register("firstName")} />
                <Input id="lastName" label="Last Name" startIcon={<LuUser className="h-5 w-5" />}
                  status={errors.lastName ? "error" : "default"} help={errors.lastName?.message} {...register("lastName")} />
              </div>
              <Input id="email" type="email" label="Email address" startIcon={<LuMail className="h-5 w-5" />}
                status={errors.email ? "error" : "default"} help={errors.email?.message} {...register("email")} />
              <Input id="password" type={showPassword ? "text" : "password"} label="Password"
                startIcon={<LuLock className="h-5 w-5" />} status={errors.password ? "error" : "default"}
                help={errors.password?.message}
                endIcon={<button type="button" onClick={() => setShowPassword((v) => !v)} className="text-neutral-400 hover:text-neutral-700">
                  {showPassword ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
                </button>}
                {...register("password")} />
              <Input id="confirmPassword" type={showConfirm ? "text" : "password"} label="Confirm Password"
                startIcon={<LuLock className="h-5 w-5" />} status={errors.confirmPassword ? "error" : "default"}
                help={errors.confirmPassword?.message}
                endIcon={<button type="button" onClick={() => setShowConfirm((v) => !v)} className="text-neutral-400 hover:text-neutral-700">
                  {showConfirm ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
                </button>}
                {...register("confirmPassword")} />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-accent-600 px-4 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-700 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg><span>Creating account...</span></>
              ) : (
                <><span>Create account</span><LuArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}