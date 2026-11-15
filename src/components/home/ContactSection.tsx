"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Send, Clock, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Commercials",
    budgetRange: "$25,000 – $50,000",
    timeline: "Next 1–2 months",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to send enquiry. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Commercials",
        budgetRange: "$25,000 – $50,000",
        timeline: "Next 1–2 months",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F2F3EC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Information & Presence */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
                <span>PROJECT COMMISSION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#2E3D28] tracking-tight leading-tight mb-6">
                Let's craft your next visual story.
              </h2>
              <p className="text-sm sm:text-base text-[#2E3D28]/80 leading-relaxed mb-8 font-sans">
                Whether you have a fully formed script or a nascent concept requiring creative direction, we collaborate with visionary brands and agencies worldwide.
              </p>

              <div className="space-y-6 pt-6 border-t border-[#D7D9CE]">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#E8E9DF] border border-[#D7D9CE] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#2E3D28]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50">
                      Direct Studio Email
                    </div>
                    <a
                      href="mailto:hello@cinearc.com"
                      className="text-base font-serif font-semibold text-[#2E3D28] hover:text-[#A9B887] transition-colors"
                    >
                      hello@cinearc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#E8E9DF] border border-[#D7D9CE] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#2E3D28]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50">
                      Working Hours
                    </div>
                    <div className="text-sm font-sans text-[#2E3D28]">
                      Mon – Fri : 09:00 – 18:00 (GMT+5:30)
                    </div>
                    <div className="text-xs font-mono text-[#A9B887]">
                      Prompt response within 24 hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#E8E9DF] border border-[#D7D9CE] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#2E3D28]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50">
                      Studio Presence
                    </div>
                    <div className="text-sm font-sans text-[#2E3D28]">
                      Studio 04 • Creative District
                    </div>
                    <div className="text-xs font-mono text-[#2E3D28]/60">
                      Available for worldwide production travel
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Brand Mark Emblem */}
            <div className="mt-12 p-6 rounded-2xl bg-[#E8E9DF] border border-[#D7D9CE] flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/brand/mark-deep-olive.png"
                  alt="cine.arc"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs font-mono text-[#2E3D28]/70">
                <div className="font-semibold text-[#2E3D28]">
                  CINE.ARC PRODUCTIONS
                </div>
                <div>GRAPHNDO Creative Studio Partner</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-[#E8E9DF] p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#D7D9CE] shadow-sm">
            {submitted ? (
              <div className="py-16 text-center animate-in fade-in duration-300">
                <div className="h-16 w-16 rounded-full bg-[#A9B887]/30 border border-[#A9B887] text-[#2E3D28] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3D28] mb-3">
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#2E3D28]/80 max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for reaching out to cine.arc. Our production director will review your brief and follow up within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs font-mono uppercase tracking-wider hover:bg-[#172014] transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-[#2E3D28]/60 mb-2">
                  Production Brief Questionnaire
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] placeholder-[#2E3D28]/40 text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. julian@brand.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] placeholder-[#2E3D28]/40 text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ArchiForm Atelier"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] placeholder-[#2E3D28]/40 text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    >
                      <option value="Commercials">Commercial Video Production</option>
                      <option value="Brand Films">Brand Film / Documentary</option>
                      <option value="Music Videos">Music Video Production</option>
                      <option value="Cinematography">Cinematography & DP Only</option>
                      <option value="Product Films">Product & Macro Motion</option>
                      <option value="Post-Production">Color Grading & Post-Production</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    >
                      <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                      <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                      <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                      <option value="$100,000+">$100,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                      Target Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] text-sm focus:outline-none focus:border-[#2E3D28] transition-colors"
                    >
                      <option value="Immediate (Next 2-4 weeks)">
                        Immediate (Next 2–4 weeks)
                      </option>
                      <option value="Next 1–2 months">Next 1–2 months</option>
                      <option value="Q2 / Q3 2026">Q2 / Q3 2026</option>
                      <option value="Flexible / Early Planning">
                        Flexible / Early Planning
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#2E3D28] mb-2">
                    Project Concept & Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your brand, key narrative ideas, distribution channels, and aesthetic references..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] text-[#2E3D28] placeholder-[#2E3D28]/40 text-sm focus:outline-none focus:border-[#2E3D28] transition-colors resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#172014] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
