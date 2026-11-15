import React from "react";
import Link from "next/link";
import {
  Film,
  Sparkles,
  Camera,
  Music,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { ServiceItem } from "@/lib/constants";

interface ServicesOverviewProps {
  services: ServiceItem[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Film":
        return <Film className="w-5 h-5 text-[#2E3D28]" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-[#2E3D28]" />;
      case "Camera":
        return <Camera className="w-5 h-5 text-[#2E3D28]" />;
      case "Music":
        return <Music className="w-5 h-5 text-[#2E3D28]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#2E3D28]" />;
      case "Sliders":
        return <Sliders className="w-5 h-5 text-[#2E3D28]" />;
      default:
        return <Film className="w-5 h-5 text-[#2E3D28]" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F2F3EC] border-y border-[#D7D9CE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D7D9CE]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>STUDIO CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#2E3D28] tracking-tight">
              Production Services
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#2E3D28] hover:text-[#A9B887] transition-colors group"
          >
            <span>View Full Service Scope</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-[#E8E9DF] border border-[#D7D9CE] flex flex-col justify-between group hover:border-[#A9B887] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-[#A9B887]/30 border border-[#A9B887]/40 flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-[#2E3D28]/40">
                    [0{idx + 1}]
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#2E3D28] mb-2 tracking-tight group-hover:text-[#3D5035] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-mono uppercase tracking-wider text-[#2E3D28]/60 mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm text-[#2E3D28]/80 leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-4 border-t border-[#D7D9CE]/70">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/60 mb-2">
                    Key Deliverables
                  </div>
                  {service.deliverables.slice(0, 4).map((deliv, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2 text-xs text-[#2E3D28]/85 font-sans"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E3D28] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D7D9CE]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#2E3D28] group-hover:text-[#172014] font-semibold transition-colors"
                >
                  <span>Commission Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
