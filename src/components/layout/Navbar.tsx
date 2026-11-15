"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Clock, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Dynamic studio time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/work", badge: "12" },
    { label: "Services", href: "/services", badge: "06" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12 py-3 sm:py-4 ${
          scrolled
            ? "bg-[#E8E9DF]/85 backdrop-blur-md shadow-[0_4px_24px_rgba(46,61,40,0.06)] border-b border-[#D7D9CE]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="cine.arc Home"
          >
            <div className="relative h-7 sm:h-9 w-auto aspect-[1652/300]">
              <Image
                src="/brand/logo-horizontal-olive.png"
                alt="cine.arc"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#E8E9DF]/80 border border-[#D7D9CE] backdrop-blur-sm shadow-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium tracking-wider uppercase transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#E8E9DF] bg-[#2E3D28]"
                      : "text-[#2E3D28] hover:text-[#2E3D28] hover:bg-[#D7D9CE]/60"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-[#A9B887] text-[#172014]"
                          : "bg-[#2E3D28]/10 text-[#2E3D28]"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Studio Status */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Studio Clock & Availability */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#2E3D28]/80 bg-[#E8E9DF]/60 px-3 py-1.5 rounded-full border border-[#D7D9CE]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A9B887] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E3D28]"></span>
                </span>
                <span className="tracking-widest uppercase text-[10px]">
                  Available
                </span>
              </div>
              <span className="text-[#A9B887]">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#2E3D28]" />
                <span className="tabular-nums">
                  {timeString || "00:00:00"}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs uppercase tracking-widest font-semibold hover:bg-[#172014] transition-all duration-200 shadow-sm hover:shadow"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-[11px] uppercase tracking-wider font-semibold"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-[#D7D9CE] text-[#2E3D28] hover:bg-[#D7D9CE]/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#E8E9DF] pt-24 px-6 flex flex-col justify-between pb-10 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#2E3D28]/60 mb-2">
              Menu Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-[#2E3D28] py-2 border-b border-[#D7D9CE] flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs font-mono bg-[#A9B887] text-[#172014] px-2 py-0.5 rounded-full">
                    [{link.badge}]
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-[#2E3D28]/60 pt-4 flex items-center gap-1.5"
            >
              <span>Studio Admin Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#F2F3EC] border border-[#D7D9CE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2E3D28]"></span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#2E3D28]">
                  Open for Q1/Q2 Production
                </span>
              </div>
              <span className="text-xs font-mono text-[#2E3D28]/80">
                {timeString}
              </span>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-center uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Initiate Project Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
