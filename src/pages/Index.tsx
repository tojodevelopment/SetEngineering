import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PartnersSection />
      <CategoriesSection />
      <ServicesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
