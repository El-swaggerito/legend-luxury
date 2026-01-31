Crocs Homepage Replica built with Next.js, React, and Tailwind CSS (v4 style).

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The homepage is implemented in `app/page.tsx` and uses components within `app/components/*`.

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
