import Image from "next/image";
import Link from "next/link";
import CTASection from "../components/CTASection";

export default function AboutPage() {
  return (
    <main>
      <section
        aria-label="About banner"
        className="relative isolate overflow-hidden min-h-[500px] flex items-center justify-center"
      >
        <Image
          src="/images/Header.png"
          alt="About Banner"
          fill
          priority
          className="object-cover z-[-1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[-1]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center z-10">
          <h1
            className="text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="text-[32px] md:text-[44px] font-medium">
              About
            </span>
          </h1>
          <p className="mt-2 typo-base text-white/90">
            <Link href="/" className="underline">
              Home
            </Link>{" "}
            <span aria-hidden="true">›</span> <span>About</span>
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent"
          aria-hidden="true"
        />
      </section>

      <section
        aria-label="Comfort meets style"
        className="w-full bg-white px-4 py-10"
      >
        <div className="mx-auto max-w-7xl grid items-start gap-6 lg:grid-cols-2">
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src="/images/where comfort meets style main.jpg"
              alt="Friends enjoying the day in LegendLuxury Crocs"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 48vw"
              priority
            />
          </figure>
          <article>
            <h2
              className="heading-2 text-neutral-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Where Comfort Meets Style
            </h2>
            <p className="mt-3 typo-base text-neutral-700">
              At LegendLuxury, we believe shoes should do more than just cover
              your feet, they should bring you comfort, confidence, and joy.
              That’s why we are passionate about Crocs, a global footwear icon
              known for its lightweight comfort, bold designs, and endless
              versatility.
            </p>
            <p className="mt-3 typo-base text-neutral-700">
              Whether you’re relaxing at home, heading to school, working long
              shifts, or stepping out with friends, Crocs are designed to fit
              seamlessly into your lifestyle.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                {
                  src: "/images/where comfort meets style small 1.jpg",
                  alt: "Pastel Crocs on city steps",
                },
                {
                  src: "/images/where comfort meets style small 2.jpg",
                  alt: "Close-up detail of Crocs strap",
                },
                {
                  src: "/images/where comfort meets style small 3.jpg",
                  alt: "Charms arranged for customization",
                },
              ].map((i, idx) => (
                <figure
                  key={`${i.src}-${idx}`}
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <Image
                    src={i.src}
                    alt={i.alt}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </figure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        aria-label="Our Story"
        className="w-full bg-white px-4 py-10"
      >
        <div className="mx-auto max-w-7xl grid items-center gap-6 lg:grid-cols-2">
          <article>
            <h2
              className="heading-2 text-neutral-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Our Story
            </h2>
            <p className="mt-3 typo-base text-neutral-700">
              We started LegendLuxury with one goal: make Crocs easy to find and
              even easier to personalize—so everyone can enjoy comfort without
              sacrificing style.
            </p>
            <p className="mt-2 typo-base text-neutral-700">
              What began as a love for playful footwear has grown into a trusted
              space where Crocs lovers of all ages explore the latest designs,
              collections, and accessories.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3">
                <span className="icon-circle">
                  <Image
                    src="/decors/headphones.png"
                    alt="Support 24/7"
                    width={18}
                    height={18}
                  />
                </span>
                <div>
                  <p className="typo-base font-semibold text-neutral-900">
                    Great Support 24/7
                  </p>
                  <p className="typo-small text-neutral-600">
                    Instant access to Contact
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="icon-circle">
                  <Image
                    src="/decors/feedback.png"
                    alt="Customer Feedback"
                    width={18}
                    height={18}
                  />
                </span>
                <div>
                  <p className="typo-base font-semibold text-neutral-900">
                    Customer Feedback
                  </p>
                  <p className="typo-small text-neutral-600">
                    Our happy customer
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="icon-circle">
                  <Image
                    src="/decors/payment.png"
                    alt="100% Secure Payment"
                    width={18}
                    height={18}
                  />
                </span>
                <div>
                  <p className="typo-base font-semibold text-neutral-900">
                    100% Secure Payment
                  </p>
                  <p className="typo-small text-neutral-600">
                    We ensure your money is safe
                  </p>
                </div>
              </li>
            </ul>
          </article>
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src="/images/our story.png"
              alt="Our story: LegendLuxury Crocs, comfort with personality"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 48vw"
            />
          </figure>
        </div>
      </section>

      <section
        aria-label="We Deliver"
        className="w-full bg-white px-4 py-12"
      >
        <div className="mx-auto max-w-7xl grid items-center gap-8 lg:grid-cols-2">
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src="/images/we deliver.png"
              alt="We Deliver: curated charms ready for your order"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 48vw"
              priority
            />
          </figure>
          <div>
            <h2
              className="heading-2 text-neutral-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              We Delivered, You Enjoy Your Order.
            </h2>
            <p className="mt-3 typo-base text-neutral-700">
              When you shop with us, you join a community of Crocs lovers
              worldwide. We keep you updated on trends, collaborations, and tips
              to make the most of your Crocs experience.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  ✓
                </span>
                <span className="typo-base text-neutral-800">
                  Step into comfort
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  ✓
                </span>
                <span className="typo-base text-neutral-800">
                  Step into style
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  ✓
                </span>
                <span className="typo-base text-neutral-800">
                  Step into Crocs
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-2 typo-base font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600"
                aria-label="Shop Now"
              >
                Shop Now <span aria-hidden="true">✓</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
