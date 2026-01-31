import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import FeatureGrid from "./components/FeatureGrid";
import RecommendedGrid from "./components/RecommendedGrid";
import VibeSection from "./components/VibeSection";
import CharmsGrid from "./components/CharmsGrid";
import BlogSection from "./components/BlogSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <RecommendedGrid />
      <VibeSection />
      <CharmsGrid distinctCategories hideFilters limit={8} />
      {/* <BlogSection /> */}
      <CTASection />
    </main>
  );
}
