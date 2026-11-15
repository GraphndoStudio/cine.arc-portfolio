import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Camera, Film, Sliders, Volume2, Shield } from "lucide-react";

export default function AboutPage() {
  const technicalStandards = [
    {
      category: "Cinema Cameras",
      items: ["ARRI Alexa Mini LF (Large Format)", "RED V-Raptor 8K VV", "Sony FX9 / FX6 High-Speed"],
    },
    {
      category: "Optics & Glass",
      items: ["Cooke Anamorphic /i Full Frame Plus", "Atlas Orion 2x Anamorphic Primes", "Leitz Prime Vintage Set"],
    },
    {
      category: "Movement & Grip",
      items: ["DJI Ronin 2 3-Axis Gimbal", "Dana Dolly & Motorized Kessler Sliders", "Russian Arm Rigging Compatibility"],
    },
    {
      category: "Post & Color Science",
      items: ["DaVinci Resolve Studio Calibration", "Flanders Scientific DCI-P3 Mastering", "32-bit Float Audio Field Recording"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28]">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="pb-16 border-b border-[#D7D9CE] max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
              <span>STUDIO IDENTITY & PHILOSOPHY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#2E3D28] tracking-tight mb-6">
              About cine.arc
            </h1>
            <p className="text-base sm:text-xl text-[#2E3D28]/80 leading-relaxed font-sans">
              We are an independent creative video production studio operating under GRAPHNDO. We unite disciplined cinematography, sculptured natural illumination, and raw human truth.
            </p>
          </div>

          {/* Editorial Philosophy & Visual Section */}
          <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#D7D9CE]">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/60">
                The Creative Approach
              </h2>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#2E3D28] tracking-tight leading-tight">
                Organic Cinematic Minimalism
              </h3>
              <div className="text-base sm:text-lg text-[#2E3D28]/85 space-y-4 font-sans leading-relaxed">
                <p>
                  In a digital world saturated with kinetic noise and ephemeral video edits, cine.arc champions intentional pacing. We believe that true cinematic visual storytelling begins with listening—to the subject, the space, and the emotional core of the brand.
                </p>
                <p className="text-sm text-[#2E3D28]/75">
                  Our cinematography emphasizes anamorphic textures, organic skin tones, and honest atmospheric depth. Rather than over-manipulating pixels, we build the scene physically on location with sculpted tungsten and natural daylight.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs font-mono text-[#2E3D28]/70">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2E3D28]"></span>
                  <span>STUDIO PRODUCTION</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#A9B887]"></span>
                  <span>GRAPHNDO PARTNER</span>
                </div>
              </div>
            </div>

            {/* Official Studio Emblem Showcase Card */}
            <div className="lg:col-span-6 bg-[#F2F3EC] p-8 sm:p-12 rounded-3xl border border-[#D7D9CE] relative flex flex-col items-center justify-center text-center">
              <div className="relative h-48 w-48 mb-6">
                <Image
                  src="/brand/mark-deep-olive.png"
                  alt="cine.arc"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#2E3D28]">
                cine.arc PRODUCTIONS
              </h4>
              <p className="text-xs font-mono text-[#2E3D28]/60 mt-1 uppercase tracking-widest">
                Video Production • Cinematography • Visual Storytelling
              </p>
            </div>
          </div>

          {/* Technical Hardware & Production Standards */}
          <div className="py-16">
            <div className="pb-10">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/60 mb-2">
                PRODUCTION INFRASTRUCTURE
              </h2>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3D28]">
                Technical Standards & Optical Character
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalStandards.map((std, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F2F3EC] border border-[#D7D9CE] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50">
                      [0{idx + 1}] STANDARD
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#2E3D28] mt-2 mb-4">
                      {std.category}
                    </h4>
                    <ul className="space-y-2 text-xs font-sans text-[#2E3D28]/80">
                      {std.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <span className="text-[#A9B887]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D7D9CE] text-[10px] font-mono text-[#2E3D28]/50">
                    MASTER CALIBRATED
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Commission Banner */}
          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#2E3D28] text-[#E8E9DF] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                Ready to collaborate with cine.arc?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8E9DF]/80 mt-1 font-sans">
                Tell us about your upcoming project or brand film.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-[#E8E9DF] text-[#172014] text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Initiate Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
