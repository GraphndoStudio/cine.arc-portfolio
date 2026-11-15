"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  Check,
  X,
  Upload,
  Film,
  Search,
} from "lucide-react";
import { Project } from "@/lib/constants";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    year: "2026",
    category: "Commercials",
    categorySlug: "commercials",
    synopsis: "",
    description: "",
    thumbnail: "",
    posterImage: "",
    videoUrl: "",
    videoType: "mp4",
    duration: "02:00",
    aspectRatio: "2.39:1",
    director: "cine.arc Studio",
    dp: "Marcus Vance",
    colorist: "Elena Rostov",
    isFeatured: false,
    status: "published",
  });

  const loadProjects = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      client: "",
      year: "2026",
      category: "Commercials",
      categorySlug: "commercials",
      synopsis: "",
      description: "",
      thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1600&auto=format&fit=crop",
      posterImage: "",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoType: "mp4",
      duration: "02:00",
      aspectRatio: "2.39:1",
      director: "cine.arc Studio",
      dp: "Marcus Vance",
      colorist: "Elena Rostov",
      isFeatured: false,
      status: "published",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      client: p.client,
      year: p.year,
      category: p.category,
      categorySlug: p.categorySlug,
      synopsis: p.synopsis,
      description: p.description,
      thumbnail: p.thumbnail,
      posterImage: p.posterImage,
      videoUrl: p.videoUrl,
      videoType: p.videoType,
      duration: p.duration,
      aspectRatio: p.aspectRatio,
      director: p.director,
      dp: p.dp,
      colorist: p.colorist,
      isFeatured: p.isFeatured,
      status: p.status,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      // Update
      const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setModalOpen(false);
        loadProjects();
      }
    } else {
      // Create
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setModalOpen(false);
        loadProjects();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this project?")) {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      loadProjects();
    }
  };

  const togglePublish = async (p: Project) => {
    const newStatus = p.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    loadProjects();
  };

  const toggleFeatured = async (p: Project) => {
    await fetch(`/api/admin/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !p.isFeatured }),
    });
    loadProjects();
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <Film className="w-3.5 h-3.5" />
            <span>PORTFOLIO MANAGER</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Projects Catalog
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A9B887] text-[#172014] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#BDC9A2] transition-colors shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-[#E8E9DF]/50 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search projects by title, client, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#212C1E] border border-[#35462F] text-xs font-mono text-[#E8E9DF] focus:outline-none focus:border-[#A9B887]"
          />
        </div>
        <div className="text-xs font-mono text-[#E8E9DF]/60">
          Total: {projects.length} Works ({projects.filter((p) => p.status === "published").length} Published)
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#212C1E] rounded-3xl border border-[#35462F] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#35462F] text-[10px] font-mono uppercase tracking-widest text-[#E8E9DF]/60">
                <th className="py-4 px-6">Work</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Year</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#35462F] text-xs font-mono">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#172014]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-[#172014] shrink-0 border border-[#35462F]">
                        {p.thumbnail && (
                          <Image
                            src={p.thumbnail}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-[#E8E9DF]">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-[#E8E9DF]/50">{p.aspectRatio} • {p.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#E8E9DF]/80">{p.client}</td>
                  <td className="py-4 px-4 text-[#A9B887]">{p.category}</td>
                  <td className="py-4 px-4 text-[#E8E9DF]/70">{p.year}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(p)}
                      className={`p-1 rounded-full transition-colors ${
                        p.isFeatured ? "text-amber-400" : "text-[#E8E9DF]/30 hover:text-[#E8E9DF]/70"
                      }`}
                      title={p.isFeatured ? "Featured on Home" : "Click to feature"}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold transition-colors ${
                        p.status === "published"
                          ? "bg-[#A9B887]/20 text-[#A9B887] hover:bg-[#A9B887]/30"
                          : "bg-amber-400/20 text-amber-300 hover:bg-amber-400/30"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-[#E8E9DF]/70 hover:text-[#E8E9DF] hover:bg-[#35462F]"
                        title="View Public Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-[#E8E9DF]/70 hover:text-[#A9B887] hover:bg-[#35462F]"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#212C1E] border border-[#35462F] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#35462F] mb-6">
              <h2 className="text-xl font-serif font-bold text-[#E8E9DF]">
                {editingProject ? `Edit: ${editingProject.title}` : "New Project Film"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#35462F] text-[#E8E9DF]/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      setFormData({ ...formData, category: val, categorySlug: slug });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  >
                    <option value="Commercials">Commercials</option>
                    <option value="Brand Films">Brand Films</option>
                    <option value="Music Videos">Music Videos</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Product Films">Product Films</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="02:30"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Video URL (Direct MP4, Vimeo, or YouTube)
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Short Synopsis
                </label>
                <textarea
                  rows={2}
                  value={formData.synopsis}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Full Description & Director's Note
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Cinematography (DP)
                  </label>
                  <input
                    type="text"
                    value={formData.dp}
                    onChange={(e) => setFormData({ ...formData, dp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                    Colorist
                  </label>
                  <input
                    type="text"
                    value={formData.colorist}
                    onChange={(e) => setFormData({ ...formData, colorist: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#A9B887]"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === "published"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.checked ? "published" : "draft",
                      })
                    }
                    className="rounded text-[#A9B887]"
                  />
                  <span>Published Live</span>
                </label>
              </div>

              <div className="pt-6 border-t border-[#35462F] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#172014] border border-[#35462F] text-[#E8E9DF] hover:bg-[#35462F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A9B887] text-[#172014] font-bold hover:bg-[#BDC9A2]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
