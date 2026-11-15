import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function ProductionProcess() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Narrative Strategy",
      description: "We align on brand objectives, core emotional intent, target distribution platforms, and visual references to establish a clear creative brief.",
    },
    {
      num: "02",
      title: "Concept Development & Treatment",
      description: "Our creative directors draft detailed visual treatments, narrative moodboards, script drafts, and shot lists that define tone and pacing.",
    },
    {
      num: "03",
      title: "Pre-Production & Logistics",
      description: "Location scouting, casting, camera package selection (ARRI/RED/Cooke), production scheduling, and art department coordination.",
    },
    {
      num: "04",
      title: "Principal Photography",
      description: "On-set production led by experienced DPs and directors, executing disciplined lighting setups, intentional camera moves, and raw 4K/8K capture.",
    },
    {
      num: "05",
      title: "Post-Production & Sound Design",
      description: "Editorial assembly, pacing refinement, bespoke sound effects, dialogue mastering, and original atmospheric scoring.",
    },
    {
      num: "06",
      title: "Master Grading & Delivery",
      description: "DaVinci Resolve color grading to DCI-P3 standards, film grain finishing, multi-aspect exports, and final archive master handover.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#E8E9DF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D7D9CE]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#2E3D28] tracking-tight">
              Production Process
            </h2>
          </div>
          <p className="text-sm font-sans text-[#2E3D28]/70 max-w-md">
            A transparent, six-phase production pipeline ensuring artistic vision translates seamlessly into technical excellence.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#F2F3EC] border border-[#D7D9CE] flex flex-col justify-between group hover:border-[#A9B887] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif font-bold text-[#A9B887] group-hover:text-[#2E3D28] transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/40">
                    STAGE {step.num}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2E3D28] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2E3D28]/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D7D9CE] flex items-center gap-2 text-[11px] font-mono text-[#2E3D28]/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A9B887]" />
                <span>Verified Studio Phase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
