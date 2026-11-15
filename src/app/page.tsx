import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandIntro } from "@/components/home/BrandIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ProductionProcess } from "@/components/home/ProductionProcess";
import { ContactSection } from "@/components/home/ContactSection";
import { readDatabase } from "@/lib/data-store";

export default function HomePage() {
  const db = readDatabase();
  const publishedProjects = db.projects
    .filter((p) => p.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeServices = db.services
    .filter((s) => s.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const { hero, intro } = db.content;

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28] selection:bg-[#A9B887] selection:text-[#172014]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Cinematic Framed Hero Section */}
        <HeroSection
          badge={hero.badge}
          headline={hero.headline}
          subheadline={hero.subheadline}
          ctaPrimary={hero.ctaPrimary}
          ctaSecondary={hero.ctaSecondary}
          videoUrl={hero.showreelVideoUrl}
        />

        {/* Brand Manifesto & Studio Credentials */}
        <BrandIntro
          tagline={intro.tagline}
          manifesto={intro.manifesto}
          metrics={intro.metrics}
        />

        {/* Selected Featured Works Showcase */}
        <FeaturedWork projects={publishedProjects} />

        {/* Production Capabilities & Deliverables */}
        <ServicesOverview services={activeServices} />

        {/* Studio Production Methodology */}
        <ProductionProcess />

        {/* Interactive Production Commission Section */}
        <ContactSection />
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
