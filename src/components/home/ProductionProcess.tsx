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
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#E8E9DF]">
      <div className="max-w-5xl 2xl:max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#D7D9CE]">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#2E3D28] tracking-tight">
              Production Process
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#2E3D28]/70 max-w-sm">
            A transparent, six-phase production pipeline ensuring artistic vision translates seamlessly into technical excellence.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#F2F3EC] border border-[#D7D9CE] flex flex-col justify-between group hover:border-[#A9B887] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-serif font-bold text-[#A9B887] group-hover:text-[#2E3D28] transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#2E3D28]/40">
                    STAGE {step.num}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#2E3D28] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#2E3D28]/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#D7D9CE] flex items-center gap-2 text-[10px] font-mono text-[#2E3D28]/60">
                <CheckCircle2 className="w-3 h-3 text-[#A9B887]" />
                <span>Verified Studio Phase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
