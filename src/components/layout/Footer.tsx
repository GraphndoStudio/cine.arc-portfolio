"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2E3D28] text-[#E8E9DF] pt-16 sm:pt-24 pb-12 border-t border-[#35462F] relative overflow-hidden">
      {/* Background Subtle Arc Brand Glow */}
      <div className="absolute -bottom-24 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <Image
          src="/brand/mark-white.png"
          alt=""
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#3F5237]">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <div className="relative h-10 w-44">
                  <Image
                    src="/brand/logo-horizontal-white.png"
                    alt="cine.arc"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <p className="text-sm text-[#E8E9DF]/80 max-w-sm leading-relaxed font-sans">
                An independent cinematic video production studio. We unite deliberate cinematography, natural light sculpting, and authentic human narrative to craft memorable films for forward-thinking brands.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#3F5237] flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-[#A9B887]"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8E9DF]/70">
                Operating Globally • Studio Based
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors flex items-center gap-1.5"
                >
                  <span>Featured Work</span>
                  <span className="text-[10px] font-mono text-[#A9B887]">[12]</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors"
                >
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors"
                >
                  Studio Narrative
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors"
                >
                  Project Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-4">
              Network
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9B887] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Vimeo Channel</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9B887] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Behance</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9B887] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8E9DF]/80 hover:text-[#E8E9DF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9B887] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Action */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-4">
                Studio Enquiries
              </h4>
              <p className="text-xs text-[#E8E9DF]/70 mb-3">
                Have an upcoming film, commercial, or creative concept?
              </p>
              <a
                href="mailto:hello@cinearc.com"
                className="text-base sm:text-lg font-serif underline decoration-[#A9B887] decoration-1 underline-offset-4 hover:text-[#A9B887] transition-colors inline-block mb-4"
              >
                hello@cinearc.com
              </a>
              <div className="text-xs font-mono text-[#E8E9DF]/60 space-y-1">
                <div>Studio 04 • Creative District</div>
                <div>Mon – Fri : 09:00 – 18:00 (GMT+5:30)</div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <Link
                href="/admin/login"
                className="text-xs font-mono text-[#A9B887] hover:text-[#E8E9DF] transition-colors inline-flex items-center gap-1"
              >
                <span>Studio Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8E9DF]/60">
          <div>
            © 2026 CINE.ARC PRODUCTIONS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#A9B887]">DESIGNED BY GRAPHNDO</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3F5237] text-[#E8E9DF] hover:bg-[#3F5237] transition-all duration-200 group"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[#A9B887] transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
