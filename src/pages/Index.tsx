
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <PromoSection />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
