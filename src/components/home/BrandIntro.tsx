import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Film, Sparkles } from "lucide-react";

interface BrandIntroProps {
  tagline?: string;
  manifesto?: string;
  metrics?: { label: string; value: string; note: string }[];
}

export function BrandIntro({
  tagline = "THE CINE.ARC MANIFESTO",
  manifesto = "We believe cinematic storytelling is not defined by excess, but by intentional restraint. Every frame is composed to evoke genuine emotion, every cut serves narrative truth, and every project is an organic collaboration between artistic vision and technical mastery.",
  metrics = [
    { label: "120+", value: "Productions Delivered", note: "Commercials, Brand & Music Films" },
    { label: "09y+", value: "Production Experience", note: "Crafting visual excellence" },
    { label: "4K/8K", value: "DCI Master Workflow", note: "Anamorphic & Large Format Glass" },
    { label: "100%", value: "Direct Studio Ownership", note: "From treatment to delivery" },
  ],
}: BrandIntroProps) {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#E8E9DF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D7D9CE]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>{tagline}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#2E3D28] tracking-tight leading-tight max-w-2xl">
              Authentic emotion through disciplined cinematography.
            </h2>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#2E3D28] hover:text-[#A9B887] transition-colors group"
          >
            <span>Read Studio Philosophy</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento Grid: Manifesto + Metrics + Visual Artboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-stretch">
          {/* Main Manifesto Card */}
          <div className="lg:col-span-7 bg-[#F2F3EC] p-8 sm:p-12 rounded-3xl border border-[#D7D9CE] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="relative h-8 w-8">
                  <Image
                    src="/brand/mark-deep-olive.png"
                    alt="cine.arc mark"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#2E3D28]/60">
                  CINE.ARC PHILOSOPHY
                </span>
              </div>
              <p className="text-lg sm:text-2xl md:text-3xl font-serif text-[#2E3D28] leading-relaxed">
                "{manifesto}"
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#D7D9CE] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#2E3D28]/70">
                DIRECTOR OF PHOTOGRAPHY & DIRECTION
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#2E3D28]">
                <span>ARRI ALEXA MINI LF</span>
                <span className="text-[#A9B887]">•</span>
                <span>COOKE ANAMORPHIC/i</span>
              </div>
            </div>
          </div>

          {/* Metrics Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F2F3EC] border border-[#D7D9CE] flex flex-col justify-between group hover:border-[#A9B887] transition-colors duration-200"
              >
                <div className="text-[10px] font-mono text-[#2E3D28]/50 uppercase tracking-widest">
                  [0{idx + 1}] METRIC
                </div>
                <div className="my-4">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2E3D28]">
                    {m.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#2E3D28] mt-1">
                    {m.value}
                  </div>
                </div>
                <div className="text-[11px] font-sans text-[#2E3D28]/60 leading-tight">
                  {m.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
