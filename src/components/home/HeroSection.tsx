"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Maximize2,
  X,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  videoUrl?: string;
}

export function HeroSection({
  badge = "AVAILABLE FOR PRODUCTION • Q1 / Q2 2026",
  headline = "ORGANIC CINEMATIC MINIMALISM",
  subheadline = "An independent film and video production studio crafting authentic visual narratives with deliberate camera movement, sculpted natural light, and refined editorial rhythm.",
  ctaPrimary = "Explore Selected Works",
  ctaSecondary = "Watch Showreel [2:14]",
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
}: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative pt-18 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Framed Cinema Viewport Container */}
      <div className="max-w-5xl 2xl:max-w-[1100px] mx-auto rounded-3xl sm:rounded-[32px] bg-[#172014] text-[#E8E9DF] border border-[#2E3D28]/40 shadow-[0_20px_60px_rgba(23,32,20,0.18)] overflow-hidden relative min-h-[460px] sm:min-h-[500px] lg:min-h-[530px] flex flex-col justify-between p-5 sm:p-8 lg:p-9">
        {/* Background Video Player */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Cinema Vignette Overlay & Frosted Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172014] via-[#172014]/60 to-[#172014]/40 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#172014]/30 to-[#172014]/90 z-10 pointer-events-none" />
        </div>

        {/* Viewfinder Top HUD Elements */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E9DF]/15 pb-3">
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E9DF]/10 backdrop-blur-md border border-[#E8E9DF]/20 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#E8E9DF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887] animate-pulse"></span>
            <span>{badge}</span>
          </div>

          {/* Technical Viewfinder Brackets */}
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#E8E9DF]/70">
            <span className="px-2 py-0.5 rounded border border-[#E8E9DF]/20 bg-[#E8E9DF]/5">
              4K DCI 2.39:1
            </span>
            <span className="text-[#A9B887]">RAW CINEMA</span>
            <span className="flex items-center gap-1 text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
              REC 24.00 FPS
            </span>
          </div>

          {/* Sound Control Toggle */}
          <button
            onClick={toggleMute}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8E9DF]/10 hover:bg-[#E8E9DF]/20 backdrop-blur-md border border-[#E8E9DF]/20 text-[10px] font-mono tracking-wider transition-all duration-200"
            aria-label={isMuted ? "Unmute showreel" : "Mute showreel"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3 h-3 text-[#E8E9DF]/80" />
                <span className="uppercase">Audio Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 text-[#A9B887]" />
                <span className="uppercase text-[#A9B887]">
                  Audio Live
                </span>
              </>
            )}
          </button>
        </div>

        {/* Central Editorial Cinema Headline */}
        <div className="relative z-20 my-auto py-6 sm:py-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3 text-[10px] font-mono tracking-[0.25em] uppercase text-[#A9B887]">
            <Sparkles className="w-3 h-3 text-[#A9B887]" />
            <span>VIDEO PRODUCTION & CINEMATOGRAPHY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.08] text-[#E8E9DF] mb-4 drop-shadow-sm font-semibold">
            {headline}
          </h1>

          <p className="text-xs sm:text-sm text-[#E8E9DF]/80 max-w-lg leading-relaxed font-sans font-normal">
            {subheadline}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-7">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#E8E9DF] text-[#172014] text-[11px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <span>{ctaPrimary}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              onClick={() => setLightboxOpen(true)}
              className="group inline-flex items-center gap-2 px-5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#E8E9DF]/10 hover:bg-[#E8E9DF]/20 backdrop-blur-md border border-[#E8E9DF]/25 text-[#E8E9DF] text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="h-5 w-5 rounded-full bg-[#A9B887] text-[#172014] flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>{ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* Viewfinder Bottom HUD Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E9DF]/15 pt-3 text-[10px] font-mono text-[#E8E9DF]/70">
          <div className="flex items-center gap-2.5">
            <div className="relative h-4 w-4">
              <Image
                src="/brand/mark-white.png"
                alt="cine.arc"
                fill
                className="object-contain"
              />
            </div>
            <span className="uppercase tracking-widest text-[10px]">
              CINE.ARC ARCHIVAL SHOWREEL
            </span>
          </div>

          {/* Production Categories List Pill */}
          <div className="hidden md:flex items-center gap-2.5 text-[10px] font-mono text-[#E8E9DF]/60">
            <span>[01] Commercials</span>
            <span>•</span>
            <span>[02] Brand Films</span>
            <span>•</span>
            <span>[03] Music Videos</span>
            <span>•</span>
            <span>[04] Cinematography</span>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 hover:text-[#A9B887] transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-wider">Expand Cinema</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Cinema Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-[#2E3D28] shadow-2xl">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-[#E8E9DF] border border-white/20 transition-all hover:scale-110"
              aria-label="Close cinema preview"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
