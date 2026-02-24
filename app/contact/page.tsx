"use client";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section aria-label="Contact banner" className="relative isolate overflow-hidden min-h-[500px] flex items-center justify-center">
        <Image
          src="/images/Header.png"
          alt="Contact Banner"
          fill
          priority
          className="object-cover z-[-1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[-1]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center z-10">
          <h1 className="text-white" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[32px] md:text-[44px] font-medium">Contact Us</span>
          </h1>
          <p className="mt-2 typo-base text-white/90">
            <Link href="/" className="underline">Home</Link> <span aria-hidden="true">›</span> <span>Contact</span>
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:col-span-4 lg:pr-8">
            <div className="space-y-12 py-8">
              {/* Address */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-600 text-accent-600">
                  <LuMapPin className="h-8 w-8" />
                </div>
                <p className="max-w-[200px] text-neutral-600">
                  2715 Ash Dr. San Jose, South Dakota 83475
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-600 text-accent-600">
                  <LuMail className="h-8 w-8" />
                </div>
                <div className="flex flex-col text-neutral-600">
                  <a href="mailto:crocs@gmail.com" className="hover:text-accent-600 transition-colors">crocs@gmail.com</a>
                  <a href="mailto:Help.crocs@gmail.com" className="hover:text-accent-600 transition-colors">Help.crocs@gmail.com</a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-600 text-accent-600">
                  <LuPhone className="h-8 w-8" />
                </div>
                <div className="flex flex-col text-neutral-600">
                  <a href="tel:2195550114" className="hover:text-accent-600 transition-colors">(219) 555-0114</a>
                  <a href="tel:1643330487" className="hover:text-accent-600 transition-colors">(164) 333-0487</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="lg:col-span-8 lg:border-l lg:border-neutral-200 lg:pl-12">
            <div className="py-8">
              <h1 className="mb-4 text-3xl font-bold font-serif text-neutral-900">Just Say Hello!</h1>
              <p className="mb-8 max-w-lg text-neutral-500">
                Do you fancy saying hi to me or you want to get started with your project and you need my help? Feel free to contact me.
              </p>

              <form className="space-y-6 max-w-2xl">
                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Template Cookie"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-accent-600 focus:ring-1 focus:ring-accent-600 outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="zakirsoft@gmail.com"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-accent-600 focus:ring-1 focus:ring-accent-600 outline-none transition-all"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Hello"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-accent-600 focus:ring-1 focus:ring-accent-600 outline-none transition-all"
                />

                <textarea
                  placeholder="Subjects"
                  rows={4}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-accent-600 focus:ring-1 focus:ring-accent-600 outline-none transition-all resize-none"
                />

                <button
                  type="submit"
                  className="rounded-full bg-accent-600 px-8 py-3 font-semibold text-white transition-all hover:bg-accent-700 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
