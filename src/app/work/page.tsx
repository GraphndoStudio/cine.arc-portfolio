"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Play, LayoutGrid, List, Sparkles } from "lucide-react";
import { INITIAL_PROJECTS, Project } from "@/lib/constants";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const categories = [
    { label: "All Works", value: "all", count: INITIAL_PROJECTS.length },
    {
      label: "Brand Films",
      value: "brand-films",
      count: INITIAL_PROJECTS.filter((p) => p.categorySlug === "brand-films").length,
    },
    {
      label: "Commercials",
      value: "commercials",
      count: INITIAL_PROJECTS.filter((p) => p.categorySlug === "commercials").length,
    },
    {
      label: "Music Videos",
      value: "music-videos",
      count: INITIAL_PROJECTS.filter((p) => p.categorySlug === "music-videos").length,
    },
    {
      label: "Cinematography",
      value: "cinematography",
      count: INITIAL_PROJECTS.filter((p) => p.categorySlug === "cinematography").length,
    },
    {
      label: "Product Films",
      value: "product-films",
      count: INITIAL_PROJECTS.filter((p) => p.categorySlug === "product-films").length,
    },
  ];

  const filtered = INITIAL_PROJECTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.categorySlug === activeCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28]">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#D7D9CE]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/70 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
                <span>ARCHIVAL CATALOGUE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#2E3D28] tracking-tight">
                Selected Work
              </h1>
              <p className="text-sm sm:text-base text-[#2E3D28]/80 max-w-xl mt-4 font-sans leading-relaxed">
                A curated body of commercials, brand narratives, and visual poems crafted across worldwide locations.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2E3D28]/60 mr-2">
                Display:
              </span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg border transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#2E3D28] text-[#E8E9DF] border-[#2E3D28]"
                    : "bg-[#F2F3EC] text-[#2E3D28] border-[#D7D9CE] hover:bg-[#D7D9CE]/50"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg border transition-colors ${
                  viewMode === "list"
                    ? "bg-[#2E3D28] text-[#E8E9DF] border-[#2E3D28]"
                    : "bg-[#F2F3EC] text-[#2E3D28] border-[#D7D9CE] hover:bg-[#D7D9CE]/50"
                }`}
                aria-label="Index list view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-8 pb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === cat.value
                    ? "bg-[#2E3D28] text-[#E8E9DF] shadow-sm"
                    : "bg-[#F2F3EC] text-[#2E3D28]/70 hover:text-[#2E3D28] border border-[#D7D9CE]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.value
                      ? "bg-[#A9B887] text-[#172014]"
                      : "bg-[#2E3D28]/10 text-[#2E3D28]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grid View Presentation */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filtered.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col justify-between bg-[#F2F3EC] rounded-3xl overflow-hidden border border-[#D7D9CE] hover:border-[#A9B887] hover:shadow-xl transition-all duration-300"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] bg-[#172014] overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-80"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172014]/80 via-transparent to-transparent z-10" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-[#E8E9DF]">
                      <span className="px-2.5 py-1 rounded-full bg-[#172014]/70 backdrop-blur-md border border-[#E8E9DF]/20 text-[10px] uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#A9B887] text-[#172014] text-[10px] font-semibold">
                        {project.duration}
                      </span>
                    </div>

                    {/* Center Play Icon */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-12 w-12 rounded-full bg-[#E8E9DF] text-[#172014] flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-[#2E3D28]/60 mb-1.5 flex items-center justify-between">
                        <span>Client: {project.client}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#2E3D28] tracking-tight group-hover:text-[#3D5035] transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#2E3D28]/75 line-clamp-2 font-sans leading-relaxed mb-4">
                        {project.synopsis}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D7D9CE] flex items-center justify-between text-xs font-mono text-[#2E3D28]/80">
                      <span>DP: {project.dp}</span>
                      <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List View Presentation (Editorial Index) */}
          {viewMode === "list" && (
            <div className="divide-y divide-[#D7D9CE] border-y border-[#D7D9CE]">
              {filtered.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="py-6 sm:py-8 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#F2F3EC] transition-colors duration-200 rounded-xl"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="text-xs font-mono text-[#2E3D28]/40 w-8">
                      [0{idx + 1}]
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3D28] group-hover:text-[#3D5035] transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs font-mono text-[#2E3D28]/60 mt-1">
                        Client: {project.client} • Category: {project.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono text-[#2E3D28]/80 sm:text-right">
                    <div className="hidden md:block">
                      <div>DIR: {project.director}</div>
                      <div>DP: {project.dp}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#D7D9CE]/50">
                      {project.aspectRatio}
                    </div>
                    <span className="text-sm font-semibold">{project.year}</span>
                    <div className="h-8 w-8 rounded-full bg-[#2E3D28] text-[#E8E9DF] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
