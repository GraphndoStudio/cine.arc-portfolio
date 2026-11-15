import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Film,
  Camera,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { readDatabase } from "@/lib/data-store";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const db = readDatabase();
  return db.projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const db = readDatabase();
  const projectIndex = db.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = db.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? db.projects[projectIndex - 1] : db.projects[db.projects.length - 1];
  const nextProject =
    projectIndex < db.projects.length - 1 ? db.projects[projectIndex + 1] : db.projects[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#E8E9DF] text-[#2E3D28]">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D7D9CE]">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2E3D28]/70 hover:text-[#2E3D28] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Works Archive</span>
            </Link>

            <div className="flex items-center gap-3 text-xs font-mono text-[#2E3D28]/60">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
          </div>

          {/* Project Title & Client Header */}
          <div className="max-w-4xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#A9B887] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E3D28]"></span>
              <span>COMMISSIONED PRODUCTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#2E3D28] tracking-tight leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-[#2E3D28]/80 font-sans leading-relaxed">
              {project.synopsis}
            </p>
          </div>

          {/* Full Cinematic Video Player / Master Canvas */}
          <div className="relative rounded-3xl overflow-hidden bg-[#172014] border border-[#D7D9CE] shadow-2xl mb-16 aspect-[16/9] sm:aspect-[2.39/1] max-h-[720px] flex items-center justify-center">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                poster={project.posterImage || project.thumbnail}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={project.posterImage || project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Project Details & Production Credits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[#D7D9CE]">
            {/* Narrative Context & Synopsis */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2E3D28]/60">
                Production Narrative
              </h2>
              <div className="text-base sm:text-lg text-[#2E3D28] leading-relaxed space-y-4 font-sans">
                <p>{project.description}</p>
                <p className="text-sm text-[#2E3D28]/80 leading-relaxed">
                  Every lighting setup on this production was shaped to embrace natural contrast and organic textures. From initial visual treatment to the calibrated master grade, cine.arc maintained rigorous fidelity to intentional storytelling and technical precision.
                </p>
              </div>

              {/* Stills Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#2E3D28]/60 mb-4">
                    Production Stills & Cinematography Frames
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((still, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl overflow-hidden bg-[#172014] aspect-[16/10] border border-[#D7D9CE]"
                      >
                        <Image
                          src={still}
                          alt={`${project.title} frame ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Production Credits Card */}
            <div className="lg:col-span-5 bg-[#F2F3EC] p-8 rounded-3xl border border-[#D7D9CE] self-start space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#D7D9CE]">
                <div className="relative h-6 w-6">
                  <Image
                    src="/brand/mark-deep-olive.png"
                    alt="cine.arc"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#2E3D28] font-bold">
                  Production Credits
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono divide-y divide-[#D7D9CE]">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#2E3D28]/60 uppercase">Client</span>
                  <span className="text-[#2E3D28] font-semibold">{project.client}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Category</span>
                  <span className="text-[#2E3D28] font-semibold">{project.category}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Year</span>
                  <span className="text-[#2E3D28] font-semibold">{project.year}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Duration</span>
                  <span className="text-[#2E3D28] font-semibold">{project.duration}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Aspect Ratio</span>
                  <span className="text-[#2E3D28] font-semibold">{project.aspectRatio}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Direction</span>
                  <span className="text-[#2E3D28] font-semibold">{project.director}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Cinematography (DP)</span>
                  <span className="text-[#2E3D28] font-semibold">{project.dp}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[#2E3D28]/60 uppercase">Color Grading</span>
                  <span className="text-[#2E3D28] font-semibold">{project.colorist}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D7D9CE]">
                <Link
                  href="/contact"
                  className="w-full py-3.5 rounded-full bg-[#2E3D28] text-[#E8E9DF] text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#172014] transition-colors"
                >
                  <span>Commission Similar Film</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link
              href={`/work/${prevProject.slug}`}
              className="p-6 rounded-2xl bg-[#F2F3EC] border border-[#D7D9CE] hover:border-[#A9B887] transition-all group"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50 mb-1">
                ← Previous Project
              </div>
              <div className="text-xl font-serif font-bold text-[#2E3D28] group-hover:text-[#3D5035]">
                {prevProject.title}
              </div>
              <div className="text-xs font-mono text-[#2E3D28]/60 mt-1">
                {prevProject.category} • {prevProject.year}
              </div>
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="p-6 rounded-2xl bg-[#F2F3EC] border border-[#D7D9CE] hover:border-[#A9B887] transition-all group sm:text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E3D28]/50 mb-1">
                Next Project →
              </div>
              <div className="text-xl font-serif font-bold text-[#2E3D28] group-hover:text-[#3D5035]">
                {nextProject.title}
              </div>
              <div className="text-xs font-mono text-[#2E3D28]/60 mt-1">
                {nextProject.category} • {nextProject.year}
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
