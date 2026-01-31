// import Image from "next/image";
// import Link from "next/link";
// import PromoCard from "../components/PromoCard";
// import FilterPanel from "../components/FilterPanel";

// const posts = [
//   { src: "/images/blog1.png", title: "Crocs Are the Most Comfortable Shoes You'll Ever Own", author: "Cameron", reads: 738, date: "29 Aug, 2025" },
//   { src: "/images/blog2.png", title: "Crocs vs Sneakers: Which Is Better for Daily Wear?", author: "Floyd Miles", reads: 826, date: "29 Aug, 2025" },
//   { src: "/images/blog3.png", title: "Best Crocs for Nurses, Teachers, and Chefs", author: "Darlene", reads: 826, date: "29 Aug, 2025" },
//   { src: "/images/blog4.png", title: "Customize Your Crocs: Trends and Tips", author: "Leslie", reads: 502, date: "04 Sep, 2025" },
//   { src: "/images/blog5.png", title: "Charms Guide: Make Your Pair Yours", author: "Devon", reads: 411, date: "07 Sep, 2025" },
//   { src: "/images/blog6.png", title: "Fall Colors: Crocs You’ll Love", author: "Alex", reads: 396, date: "10 Sep, 2025" },
//   { src: "/images/blog7.png", title: "Kids Crocs: Fun, Durable, Easy", author: "Taylor", reads: 560, date: "12 Sep, 2025" },
//   { src: "/images/blog8.png", title: "Weekend Styles: Street to Cozy", author: "Jordan", reads: 322, date: "14 Sep, 2025" },
// ];

// export default function BlogPage() {
//   return (
//     <main>
//       <section aria-label="Blog banner" className="relative isolate overflow-hidden bg-gradient-to-b from-accent-600 to-accent-100">
//         <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
//           <h1 className="text-white" style={{ fontFamily: "var(--font-serif)" }}>
//             <span className="text-[32px] md:text-[44px] font-medium">Blog & Articles</span>
//           </h1>
//           <p className="mt-2 typo-base text-white/90">
//             <Link href="/" className="underline">Home</Link> <span aria-hidden="true">›</span> <span>Blog</span>
//           </p>
//         </div>
//         <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
//       </section>

//       <section aria-label="Blog list" className="mx-auto max-w-7xl bg-white px-4 py-10">
//         <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
//           <FilterPanel
//             searchable
//             sections={[
//               { title: "Availability", name: "avail", type: "radio", options: [
//                 { label: "Latest", value: "latest", checked: true },
//                 { label: "Most Popular", value: "popular" },
//               ]},
//               { title: "Category", name: "cat", type: "radio", options: [
//                 { label: "All", value: "all", checked: true },
//                 { label: "Guides", value: "guides" },
//                 { label: "Culture", value: "culture" },
//                 { label: "Stories", value: "stories" },
//               ]},
//             ]}
//           />
//           <div>
//             <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {posts.map((p, idx) => (
//                 <li key={p.src} className="rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
//                   <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
//                     <Image
//                       src={p.src}
//                       alt={p.title}
//                       fill
//                       className="object-cover transition-transform hover:scale-[1.03]"
//                       sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
//                       priority={idx < 3}
//                     />
//                   </figure>
//                   <div className="px-3 py-3">
//                     <div className="flex items-center gap-3 typo-small text-neutral-600">
//                       <span className="inline-flex items-center gap-1"><span aria-hidden="true">👤</span>{p.author}</span>
//                       <span className="inline-flex items-center gap-1"><span aria-hidden="true">📅</span>{p.date}</span>
//                       <span className="inline-flex items-center gap-1"><span aria-hidden="true">👁️</span>{p.reads}</span>
//                       <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 typo-small text-accent-600">Guides</span>
//                     </div>
//                     <h3 className="mt-2 clamp-2 typo-base font-semibold text-neutral-900">{p.title}</h3>
//                     <p className="mt-2 clamp-3 typo-base text-neutral-700">Crocs are no longer just for comfort—they’ve become a style statement. Whether you’re heading to class, the office, or a casual hangout, Crocs can be styled to match your outfit.</p>
//                     <div className="mt-3 flex items-center justify-between">
//                       <Link href={`/#read-${idx}`} className="rounded-full border border-neutral-300 px-3 py-1 typo-small text-neutral-800 hover:bg-neutral-50">Read more</Link>
//                       <div className="typo-small text-neutral-600">★★★★★ <span className="font-bold text-[#d6b36c]">5.0</span></div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section aria-label="Blog promo" className="mx-auto max-w-7xl bg-white px-4 pb-12">
//         <PromoCard />
//       </section>
//     </main>
//   );
// }
