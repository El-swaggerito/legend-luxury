// import { PrismaClient } from "@prisma/client";
// import { getCharms } from "../app/lib/server-products";
// import { RECOMMENDED_PRODUCTS } from "../app/data/static-products";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Starting seed...");

//   // 1. Seed Recommended Products
//   console.log("Seeding Recommended Products...");
//   for (const p of RECOMMENDED_PRODUCTS) {
//     await prisma.product.upsert({
//       where: { slug: p.id },
//       update: {
//         title: p.title,
//         price: p.price,
//         img: p.img,
//         category: p.category,
//         badge: p.badge || null,
//         rating: p.rating || 0,
//         reviews: p.reviews || 0,
//         description: p.description,
//       },
//       create: {
//         slug: p.id,
//         title: p.title,
//         price: p.price,
//         img: p.img,
//         category: p.category,
//         badge: p.badge || null,
//         rating: p.rating || 0,
//         reviews: p.reviews || 0,
//         description: p.description,
//       },
//     });
//   }

//   // 2. Seed File System Charms
//   console.log("Seeding File System Charms...");
//   const charms = getCharms();
//   for (const c of charms) {
//     await prisma.product.upsert({
//       where: { slug: c.id },
//       update: {
//         title: c.title,
//         price: c.price,
//         img: c.img,
//         category: c.category,
//         badge: c.badge || null,
//         rating: c.rating || 0,
//         reviews: c.reviews || 0,
//         description: c.description,
//         groupId: c.groupId,
//       },
//       create: {
//         slug: c.id,
//         title: c.title,
//         price: c.price,
//         img: c.img,
//         category: c.category,
//         badge: c.badge || null,
//         rating: c.rating || 0,
//         reviews: c.reviews || 0,
//         description: c.description,
//         groupId: c.groupId,
//       },
//     });
//   }

//   console.log("✅ Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
