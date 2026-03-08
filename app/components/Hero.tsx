"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./animations/FadeIn";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Floating animations configuration
  const floatingVariants: Variants = {
    float: (custom: number) => ({
      y: [0, -15, 0],
      x: [0, custom % 2 === 0 ? 10 : -10, 0],
      rotate: [0, custom % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 4 + (custom % 3),
        repeat: Infinity,
        ease: [0.25, 0.25, 0.25, 0.75],
        delay: custom * 0.5,
      },
    }),
  };

  const scrollToVibe = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("vibe-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("play-showreel"));
    }
  };

  return (
    <section ref={containerRef} aria-label="Promotions" className="relative isolate overflow-hidden bg-white">
      {/* Decorative Floating Elements */}
      <motion.div 
        style={{ y: y1 }} 
        custom={1}
        variants={floatingVariants}
        animate="float"
        className="pointer-events-none absolute left-2 top-10 h-20 w-20 md:left-6 md:top-16 md:h-28 md:w-28 z-10"
      >
        <Image src="/decors/herodeco1.png" alt="" fill className="object-contain" sizes="112px" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }} 
        custom={2}
        variants={floatingVariants}
        animate="float"
        className="pointer-events-none absolute left-24 top-48 h-12 w-12 md:left-40 md:top-56 z-10"
      >
        <Image src="/decors/herodeco2.png" alt="" fill className="object-contain" sizes="48px" />
      </motion.div>

      <motion.div 
        style={{ y: y3 }} 
        custom={3}
        variants={floatingVariants}
        animate="float"
        className="pointer-events-none absolute left-10 top-40 h-8 w-8 md:left-20 md:top-44 z-10"
      >
        <Image src="/decors/herodeco2.png" alt="Heart sticker" fill className="object-contain" sizes="32px" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }} 
        custom={4}
        variants={floatingVariants}
        animate="float"
        className="pointer-events-none absolute right-10 top-20 h-16 w-16 md:right-20 md:top-24 z-10"
      >
        <Image src="/decors/herodeco3.png" alt="" fill className="object-contain" sizes="64px" />
      </motion.div>

      <motion.div 
        style={{ y: y1 }} 
        custom={5}
        variants={floatingVariants}
        animate="float"
        className="pointer-events-none absolute right-10 top-30 h-16 w-16 md:right-20 md:top-44 z-10"
      >
        <Image src="/decors/herodeco4.png" alt="" fill className="object-contain" sizes="56px" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h1 className="heading-1 text-neutral-900 font-bold leading-[1.1] md:text-[56px] md:leading-[1.05]">
              <span className="block">
                Express <span className="brush-underline">Yourself</span> with Custom-
              </span>
              <span className="block mt-6">
                <span className="highlight-blob highlight-green">Designed</span> Crocs and{" "}
                <span className="highlight-blob highlight-pink">Charms!</span>
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 typo-small text-neutral-500">
              Custom Crocs with 1000s of charms — because your vibe changes, and so can your shoes.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/shop" className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-2 typo-base font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600">
                Buy Now <span aria-hidden="true">▾</span>
              </Link>
              <button
                onClick={scrollToVibe}
                className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-2 typo-base font-semibold text-neutral-800 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                Watch showreel
              </button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6} direction="up" duration={0.8}>
          <div className="mt-10 overflow-hidden relative">
            <div className="flex gap-4 animate-scroll hover:pause-animation w-max">
              {[
                { id: "card1", title: "summer festivals", img: "/images/ind blocks (1).png" },
                { id: "card2", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
                { id: "card3", title: "summer festivals", img: "/images/ind blocks (3).png" },
                { id: "card4", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
                { id: "card5", title: "summer festivals", img: "/images/ind blocks (1).png" },
                // Duplicates for seamless loop
                { id: "card1-dup", title: "summer festivals", img: "/images/ind blocks (1).png" },
                { id: "card2-dup", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
                { id: "card3-dup", title: "summer festivals", img: "/images/ind blocks (3).png" },
                { id: "card4-dup", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
                { id: "card5-dup", title: "summer festivals", img: "/images/ind blocks (1).png" }
              ].map((c) => (
                <div key={c.id} className="relative w-64 flex-none overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform hover:scale-[1.02]">
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-neutral-900/80 px-2 py-1 typo-small text-white">
                    {c.title}
                  </div>
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={c.img} alt={c.title} fill className="object-cover" sizes="256px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
