Crocs Homepage Replica built with Next.js, React, and Tailwind CSS (v4 style).

## Project Status

This project replicates the Crocs homepage experience and extends it with animations, product/charm experiences, and a planned database-backed backend. Below is a clear view of what’s done and what remains.

### Completed Features

- UI/UX and Layout
  - Responsive layout with Header → Hero → Explore/Feature sections → Product grids → Footer.
  - Accessibility-minded structure with semantic landmarks, labeled controls, and focus-visible styles.
  - Image optimization via Next/Image with appropriate sizes, object-fit usage, and placeholders.
- Motion System (Framer Motion)
  - Staggered entrance framework using StaggerContainer and StaggerItem for coordinated reveals.
  - FadeIn component for directional/offset fades with typed Variants.
  - Hero parallax and floating decorative elements using scroll-based transforms and custom variant resolvers.
  - Applied across Hero, FeatureGrid, product grids, vibe/CTA sections for consistent motion.
- Product & Charm Experience
  - Charm Grouping System: similar-named charms are normalized and grouped; product grid shows group leaders.
  - Product view displays variation thumbnails to quickly switch between grouped variations.
  - Client-side search filters product grid by title/category.
- Cart & Wishlist
  - CartContext and WishlistContext with localStorage persistence and basic add/remove/update flows.
  - Mini-cart drawer with subtotal display.
- Tooling & Scripts
  - TypeScript with strict settings; ESLint configured.
  - NPM scripts: dev, build, start, lint, and prisma:seed (ts-node based).
- Data/Backend Scaffolding
  - Prisma schema defined (User, Product, Order, etc.).
  - Seed script authored to import static products and file-system charms.
  - Environment prepared for Supabase PostgreSQL (DATABASE_URL expected).

### Remaining Tasks & Roadmap

- Database Integration
  - Resolve Supabase connectivity (P1001) and ensure SSL/pgbouncer settings are correct.
  - Push schema (e.g., Prisma db push/migrate) and run prisma:seed to populate data.
  - Introduce server actions/route handlers wired to Prisma for products, orders, and users.
- Authentication
  - Implement NextAuth configuration (providers/credentials), secure session handling, and profile management.
  - Replace impure/temporary client-side ID generation with DB-backed IDs.
- Payments & Orders
  - Integrate Stripe or PayPal checkout flow end-to-end.
  - Create orders on payment success and reconcile totals (subtotal + tax + shipping).
  - Validate multi-currency totals and receipt/confirmation UX.
- Quality & Reliability
  - Address outstanding ESLint issues (effects, any types, unescaped entities, unused vars).
  - Add unit/integration tests for cart, wishlist, product grouping, and checkout logic.
- Performance & Accessibility
  - Audit for prefers-reduced-motion fallbacks and tune animation costs.
  - Optimize images/assets and enable code-splitting for heavy sections if needed.
  - Perform an accessibility pass (keyboard navigation, ARIA for menus/dialogs).
- Content & Assets
  - Replace placeholder images with final assets; verify descriptive alts and metadata.
  - Finalize copy, SEO meta tags, and social previews.
- Deployment
  - Document production env requirements and secrets management.
  - Verify production build, image domains, and caching/CDN strategy.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The homepage is implemented in `app/page.tsx` and uses components within `app/components/*`.

## Commands

- Development: `npm run dev`
- Build: `npm run build`
- Start (production): `npm run start`
- Lint: `npm run lint`
- Seed (requires DB): `npm run prisma:seed`

## Environment

- Create a `.env` file with a `DATABASE_URL` pointing to your PostgreSQL instance.
- If using Supabase with PgBouncer, ensure the pooling port and `sslmode=require` are set correctly.
- Never commit secrets. Store environment variables securely in your deployment platform.

## Implementation Decisions

- Stack: Next.js App Router, React, Tailwind CSS (inline theme).
- Mobile-first responsive layout mirroring crocs.com structure: Header → Hero → Explore → Product grid → Footer.
- Accessibility: Semantic HTML landmarks, ARIA for menus, labels for search and cart, alt text on images, focus-visible rings.
- Navigation: Top-level categories with accessible dropdowns on desktop and an accordion-style menu on mobile.
- Search: Global search state filters product grid by title and category.
- Cart: Client-side context with localStorage persistence, add/remove/update quantity, mini-cart drawer with subtotal.
- Images: Next/Image for optimization. Placeholders in `public/images/` with descriptive alts; replace with provided assets keeping file paths.
- Styling: Brand color approximates Crocs green (`#7ac143`) via CSS custom properties and Tailwind color tokens (`brand-600`, etc.).
- Performance: Optimized image sizes, responsive `sizes` attributes, no blocking scripts, sticky header with backdrop blur.
- Cross-browser: Uses modern standards supported by evergreen browsers; no experimental APIs required.

## File Structure

- `app/layout.tsx`: Global providers, header, footer, and mini cart.
- `app/page.tsx`: Homepage sections and composition.
- `app/components/*`: Header, Hero, ProductGrid, Footer, MiniCartDrawer.
- `app/context/*`: Cart and Search contexts.
- `app/lib/*`: Static categories and product data.
- `public/*`: Logo and image placeholders (swap with real assets).

## Integrating Real Assets

- Replace SVG placeholders under `public/images/*` and `public/logo-crocs.svg` with production-ready images.
- Keep file names/paths the same to avoid code changes, or update `app/lib/products.ts` and relevant component `src` props.
- Ensure images are properly compressed (WebP/AVIF preferred) and include descriptive `alt` text.

## Notes on Visual Fidelity

- Spacing, type scale, and layout follow Crocs’ homepage patterns for close visual fidelity.
- Exact brand font is proprietary; the replica uses Geist/system fonts with similar metrics for consistency.
- When final assets are provided, fine-tune paddings, colors, and line-heights to achieve pixel-perfect parity.
