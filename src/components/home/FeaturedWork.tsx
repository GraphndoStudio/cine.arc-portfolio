"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Eye, Clapperboard } from "lucide-react";
import { Project } from "@/lib/constants";

interface FeaturedWorkProps {
  projects: Project[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Brand Films", value: "brand-films" },
    { label: "Commercials", value: "commercials" },
    { label: "Music Videos", value: "music-videos" },
    { label: "Cinematography", value: "cinematography" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.categorySlug === activeCategory;
  });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#E8E9DF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D7D9CE]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
              <Clapperboard className="w-3.5 h-3.5 text-[#A9B887]" />
              <span>SELECTED PRODUCTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#2E3D28] tracking-tight">
              Featured Works
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-[#2E3D28] text-[#E8E9DF] shadow-sm"
                    : "bg-[#F2F3EC] text-[#2E3D28]/70 hover:text-[#2E3D28] border border-[#D7D9CE]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              {/* Media Card Container */}
              <Link
                href={`/work/${project.slug}`}
                className="relative block rounded-3xl overflow-hidden bg-[#172014] border border-[#D7D9CE] aspect-[16/10] sm:aspect-[16/9] mb-5 shadow-sm group-hover:shadow-xl transition-all duration-300"
              >
                {/* Poster Image */}
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-75"
                />

                {/* Optional Hover Video Preview */}
                {hoveredProjectId === project.id && project.videoUrl && (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172014]/90 via-[#172014]/20 to-transparent z-20 pointer-events-none" />

                {/* Top Corner HUD Badges */}
                <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-xs font-mono text-[#E8E9DF]">
                  <span className="px-3 py-1 rounded-full bg-[#172014]/70 backdrop-blur-md border border-[#E8E9DF]/20 uppercase tracking-widest text-[10px]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#172014]/70 backdrop-blur-md border border-[#E8E9DF]/20 text-[10px]">
                      {project.aspectRatio}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#A9B887] text-[#172014] font-semibold text-[10px]">
                      {project.duration}
                    </span>
                  </div>
                </div>

                {/* Center Hover Action Icon */}
                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="h-14 w-14 rounded-full bg-[#E8E9DF] text-[#172014] flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Card Title & Synopsis */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-30">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#A9B887] mb-1">
                    Client: {project.client} • {project.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#E8E9DF] tracking-tight group-hover:text-[#A9B887] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>

              {/* Project Metadata Footer */}
              <div className="flex items-center justify-between px-2 text-xs font-mono text-[#2E3D28]/80">
                <div className="flex items-center gap-2">
                  <span>DIR: {project.director}</span>
                  <span className="text-[#A9B887]">•</span>
                  <span>DP: {project.dp}</span>
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 hover:text-[#2E3D28] font-semibold transition-colors"
                >
                  <span>View Case Film</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs uppercase tracking-widest font-semibold hover:bg-[#172014] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>Browse Complete Portfolio [12 Projects]</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
