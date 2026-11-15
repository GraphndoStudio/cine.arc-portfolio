"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Sliders,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalServices: 0,
    totalEnquiries: 0,
    unreadEnquiries: 0,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((res) => res.json()),
      fetch("/api/admin/services").then((res) => res.json()),
      fetch("/api/admin/enquiries").then((res) => res.json()),
    ])
      .then(([projData, servData, enqData]) => {
        const projs = projData.projects || [];
        const servs = servData.services || [];
        const enqs = enqData.enquiries || [];

        setRecentProjects(projs.slice(0, 4));
        setRecentEnquiries(enqs.slice(0, 4));

        setStats({
          totalProjects: projs.length,
          publishedProjects: projs.filter((p: any) => p.status === "published").length,
          draftProjects: projs.filter((p: any) => p.status === "draft").length,
          totalServices: servs.length,
          totalEnquiries: enqs.length,
          unreadEnquiries: enqs.filter((e: any) => e.status === "unread").length,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9B887]"></span>
            <span>STUDIO OVERVIEW</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A9B887] text-[#172014] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#BDC9A2] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#212C1E] border border-[#35462F] text-[#E8E9DF] text-xs font-mono uppercase tracking-wider hover:bg-[#35462F] transition-colors"
          >
            <span>Edit Copy</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-[#E8E9DF]/60">
            <span>TOTAL PROJECTS</span>
            <Film className="w-4 h-4 text-[#A9B887]" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-serif font-bold text-[#E8E9DF]">
              {stats.totalProjects}
            </div>
            <div className="text-xs font-mono text-[#A9B887] mt-1">
              {stats.publishedProjects} Published • {stats.draftProjects} Drafts
            </div>
          </div>
          <Link
            href="/admin/projects"
            className="text-[11px] font-mono text-[#E8E9DF]/70 hover:text-[#A9B887] transition-colors flex items-center gap-1"
          >
            <span>Manage Works</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-[#E8E9DF]/60">
            <span>SERVICES</span>
            <Sparkles className="w-4 h-4 text-[#A9B887]" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-serif font-bold text-[#E8E9DF]">
              {stats.totalServices}
            </div>
            <div className="text-xs font-mono text-[#E8E9DF]/60 mt-1">
              Active Production Lines
            </div>
          </div>
          <Link
            href="/admin/services"
            className="text-[11px] font-mono text-[#E8E9DF]/70 hover:text-[#A9B887] transition-colors flex items-center gap-1"
          >
            <span>Edit Services</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-[#E8E9DF]/60">
            <span>CLIENT ENQUIRIES</span>
            <MessageSquare className="w-4 h-4 text-[#A9B887]" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-serif font-bold text-[#E8E9DF]">
              {stats.totalEnquiries}
            </div>
            <div className="text-xs font-mono text-amber-400 mt-1 flex items-center gap-1">
              {stats.unreadEnquiries > 0 ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>{stats.unreadEnquiries} Unread Enquiries</span>
                </>
              ) : (
                <span>All Enquiries Reviewed</span>
              )}
            </div>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-[11px] font-mono text-[#E8E9DF]/70 hover:text-[#A9B887] transition-colors flex items-center gap-1"
          >
            <span>Open Inbox</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-[#E8E9DF]/60">
            <span>STUDIO SYSTEM</span>
            <CheckCircle2 className="w-4 h-4 text-[#A9B887]" />
          </div>
          <div className="my-3">
            <div className="text-sm font-mono text-[#A9B887] font-semibold">
              OPERATIONAL
            </div>
            <div className="text-xs font-mono text-[#E8E9DF]/60 mt-1">
              Local DB • Encrypted Auth
            </div>
          </div>
          <div className="text-[11px] font-mono text-[#E8E9DF]/40">
            Node v24 • Next.js 16
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Projects & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-[#212C1E] p-6 sm:p-8 rounded-3xl border border-[#35462F]">
          <div className="flex items-center justify-between pb-4 border-b border-[#35462F] mb-6">
            <h2 className="text-base font-serif font-bold text-[#E8E9DF]">
              Recent Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#A9B887] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#172014] border border-[#35462F]"
              >
                <div>
                  <div className="text-sm font-serif font-semibold text-[#E8E9DF]">
                    {p.title}
                  </div>
                  <div className="text-xs font-mono text-[#E8E9DF]/50">
                    {p.client} • {p.category} • {p.year}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      p.status === "published"
                        ? "bg-[#A9B887]/20 text-[#A9B887]"
                        : "bg-amber-400/20 text-amber-300"
                    }`}
                  >
                    {p.status}
                  </span>
                  <Link
                    href={`/work/${p.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-[#E8E9DF]/60 hover:text-[#E8E9DF] hover:bg-[#35462F]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-[#212C1E] p-6 sm:p-8 rounded-3xl border border-[#35462F]">
          <div className="flex items-center justify-between pb-4 border-b border-[#35462F] mb-6">
            <h2 className="text-base font-serif font-bold text-[#E8E9DF]">
              Latest Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-[#A9B887] hover:underline"
            >
              View Inbox
            </Link>
          </div>

          <div className="space-y-4">
            {recentEnquiries.length === 0 ? (
              <div className="text-xs font-mono text-[#E8E9DF]/50 py-6 text-center">
                No client enquiries yet.
              </div>
            ) : (
              recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="p-3.5 rounded-xl bg-[#172014] border border-[#35462F] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-semibold text-[#E8E9DF]">
                      {e.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                        e.status === "unread"
                          ? "bg-amber-400/20 text-amber-300"
                          : "bg-[#35462F] text-[#E8E9DF]/70"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#E8E9DF]/60">
                    {e.company || "Independent Client"} • {e.projectType} • {e.budgetRange}
                  </div>
                  <p className="text-xs font-sans text-[#E8E9DF]/80 line-clamp-1">
                    "{e.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
