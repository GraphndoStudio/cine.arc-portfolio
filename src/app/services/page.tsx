import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Film,
  Sparkles,
  Camera,
  Music,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Video,
} from "lucide-react";
import { readDatabase } from "@/lib/data-store";

export default function ServicesPage() {
  const db = readDatabase();
  const services = db.services.filter((s) => s.isPublished);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Film":
        return <Film className="w-6 h-6 text-[#2E3D28]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#2E3D28]" />;
      case "Camera":
        return <Camera className="w-6 h-6 text-[#2E3D28]" />;
      case "Music":
        return <Music className="w-6 h-6 text-[#2E3D28]" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#2E3D28]" />;
      case "Sliders":
        return <Sliders className="w-6 h-6 text-[#2E3D28]" />;
      default:
        return <Video className="w-6 h-6 text-[#2E3D28]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28]">
      <Navbar />

      <main className="flex-grow pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl 2xl:max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="pb-10 border-b border-[#D7D9CE] max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>STUDIO CAPABILITIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2E3D28] tracking-tight mb-4">
              Production Services
            </h1>
            <p className="text-sm sm:text-base text-[#2E3D28]/80 leading-relaxed font-sans">
              From creative concept and script treatment to master cinematography and calibrated color finishing, we provide comprehensive high-end video production services.
            </p>
          </div>

          {/* Detailed Services Breakdown */}
          <div className="divide-y divide-[#D7D9CE]">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
              >
                {/* Service Title & Indicator */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#A9B887]/30 border border-[#A9B887]/40 flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-xs font-mono text-[#2E3D28]/50">
                      [0{idx + 1}] SERVICE
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3D28] tracking-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#2E3D28]/60">
                    {service.tagline}
                  </p>
                </div>

                {/* Service Narrative & Deliverables */}
                <div className="lg:col-span-8 bg-[#F2F3EC] p-8 sm:p-10 rounded-3xl border border-[#D7D9CE]">
                  <p className="text-base sm:text-lg text-[#2E3D28]/90 font-sans leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="pt-6 border-t border-[#D7D9CE]">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#2E3D28]/60 mb-4">
                      Complete Production Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((deliv, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2E3D28] font-sans"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2E3D28] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#D7D9CE] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono text-[#2E3D28]/60">
                      Typical Turnaround: 2–6 Weeks
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#172014] transition-colors"
                    >
                      <span>Commission Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
