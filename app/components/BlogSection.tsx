import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: "b1",
    img: "/images/blog1.png",
    author: "Cameron",
    date: "29 Aug, 2025",
    reads: "738",
    title: "Why Crocs Are the Most Comfortable Shoes You’ll Ever Own",
    excerpt:
      "Crocs are no longer just for comfort—they’ve become a style statement. Whether you’re heading to class, the office, or a casual hangout, Crocs can be styled to match your outfit.",
  },
  {
    id: "b2",
    img: "/images/blog2.png",
    author: "Floyd Miles",
    date: "29 Aug, 2025",
    reads: "826",
    title: "Crocs vs Sneakers: Which Is Better for Daily Wear?",
    excerpt:
      "Crocs are no longer just for comfort—they’ve become a style statement. Whether you’re heading to class, the office, or a casual hangout, Crocs can be styled to match your outfit.",
  },
  {
    id: "b3",
    img: "/images/blog3.png",
    author: "Darlene",
    date: "29 Aug, 2025",
    reads: "826",
    title: "Best Crocs for Nurses, Teachers, and Chefs",
    excerpt:
      "Crocs are no longer just for comfort—they’ve become a style statement. Whether you're heading to class, the office, or a casual hangout, Crocs can be styled to match your outfit.",
  },
];

export default function BlogSection() {
  return (
    <section aria-label="Blog Post" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/blogpostbg.png"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          priority
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h2
          className="mb-8 text-center text-neutral-900"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="text-[28px] md:text-[32px] font-medium">Blog Post</span>
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-neutral-200 bg-white p-3 shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, (max-width:1024px) 44vw, 30vw"
                />
              </div>
              <div className="mt-3 flex items-center gap-3 text-neutral-600">
                <span className="inline-flex items-center gap-1 typo-small">
                  <span aria-hidden="true">👤</span>
                  {p.author}
                </span>
                <span className="inline-flex items-center gap-1 typo-small">
                  <span aria-hidden="true">📅</span>
                  {p.date}
                </span>
                <span className="inline-flex items-center gap-1 typo-small">
                  <span aria-hidden="true">👁️</span>
                  {p.reads}
                </span>
              </div>
              <h3 className="mt-2 clamp-2 typo-base font-semibold text-neutral-900">
                {p.title}
              </h3>
              <p className="mt-2 clamp-3 typo-base text-neutral-700">{p.excerpt}</p>
              <div className="mt-4">
                <Link
                  href={`/#blog-${p.id}`}
                  aria-label={`Read more: ${p.title}`}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-4 py-2 typo-small font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  READ MORE <span aria-hidden="true">➜</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
