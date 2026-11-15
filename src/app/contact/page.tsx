import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/home/ContactSection";
import { HelpCircle } from "lucide-react";

export default function ContactPage() {
  const faqs = [
    {
      q: "Where is cine.arc based, and do you travel for productions?",
      a: "Our core studio and camera department are based in the Creative District, but we travel globally for location shoots. Over 60% of our productions are shot on location internationally.",
    },
    {
      q: "What is your typical project timeline?",
      a: "Commercials and brand films typically require 2 to 6 weeks from initial treatment approval to final master delivery. Urgent or accelerated turnarounds can be accommodated depending on crew availability.",
    },
    {
      q: "What camera systems and formats do you deliver?",
      a: "We shoot primarily on ARRI Alexa Mini LF and RED V-Raptor large format systems with anamorphic glass. Deliverables include 4K DCI master ProRes 4444 XQ, web-optimized MP4s, and formatted cuts for 16:9, 9:16 vertical, and 4:5 social channels.",
    },
    {
      q: "Can we hire cine.arc solely for cinematography or color grading?",
      a: "Yes. While we often direct and produce complete turnkey films, our Directors of Photography and master colorists frequently collaborate as dedicated specialists on third-party commercial productions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28]">
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20">
        {/* Contact Form Section */}
        <ContactSection />

        {/* Studio FAQ Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#E8E9DF] border-t border-[#D7D9CE]">
          <div className="max-w-5xl 2xl:max-w-[1100px] mx-auto">
            <div className="pb-10 border-b border-[#D7D9CE] mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#A9B887]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#2E3D28]">
                Production Enquiries & Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F2F3EC] border border-[#D7D9CE]"
                >
                  <h3 className="text-base font-serif font-bold text-[#2E3D28] mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2E3D28]/80 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
