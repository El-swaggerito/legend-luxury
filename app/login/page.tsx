
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import { LuMail, LuLock, LuArrowRight } from "react-icons/lu";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: "1",
        name: "Demo User",
        email: data.email,
        bio: "Welcome to my profile!",
      };
      
      login(mockUser);
      router.push("/profile");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent-900 relative overflow-hidden items-center justify-center">
        <Image
          src="/images/formimg.jpeg"
          alt="Login Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-accent-900/60" />
        <div className="relative z-10 text-center px-12">
          <h1 className="text-5xl font-serif font-bold text-white mb-6">Legend Luxury</h1>
          <p className="text-xl text-neutral-200 max-w-md mx-auto leading-relaxed">
            Step into a world where comfort meets elegance. Join our exclusive community today.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Welcome back</h2>
            <p className="mt-2 text-neutral-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-accent-600 hover:text-accent-500 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <Input
                id="email"
                type="email"
                label="Email address"
                startIcon={<LuMail className="h-5 w-5" />}
                status={errors.email ? "error" : "default"}
                help={errors.email?.message}
                {...register("email")}
              />

              <div className="space-y-1">
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  startIcon={<LuLock className="h-5 w-5" />}
                  status={errors.password ? "error" : "default"}
                  help={errors.password?.message}
                  {...register("password")}
                />
                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-neutral-500 hover:text-accent-600 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 rounded border-neutral-300 text-accent-600 focus:ring-accent-600 transition-all cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="remember-me" className="font-medium text-neutral-700 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-accent-600 px-4 py-4 text-base font-semibold text-white shadow-lg shadow-accent-600/20 transition-all hover:bg-accent-700 hover:shadow-accent-600/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <LuArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
