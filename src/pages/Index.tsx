import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RecentPrompts } from "@/components/home/RecentPrompts";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <CategoryGrid />
        <RecentPrompts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
