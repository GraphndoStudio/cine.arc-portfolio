"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Sparkles, CheckCircle2, X } from "lucide-react";
import { ServiceItem } from "@/lib/constants";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    deliverablesText: "",
    icon: "Film",
    isPublished: true,
  });

  const loadServices = () => {
    setLoading(true);
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      tagline: "",
      description: "",
      deliverablesText: "High-end Camera Package\nDirector of Photography\nMaster Color Grading",
      icon: "Film",
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      deliverablesText: s.deliverables.join("\n"),
      icon: s.icon,
      isPublished: s.isPublished,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const deliverables = formData.deliverablesText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      tagline: formData.tagline,
      description: formData.description,
      deliverables,
      icon: formData.icon,
      isPublished: formData.isPublished,
    };

    if (editingService) {
      const res = await fetch(`/api/admin/services/${editingService.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setModalOpen(false);
        loadServices();
      }
    } else {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setModalOpen(false);
        loadServices();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      loadServices();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAPABILITIES MANAGER</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Production Services
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A9B887] text-[#172014] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#BDC9A2] transition-colors shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, idx) => (
          <div
            key={s.id}
            className="p-6 rounded-3xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#A9B887]">
                  [0{idx + 1}] {s.icon}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      s.isPublished
                        ? "bg-[#A9B887]/20 text-[#A9B887]"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {s.isPublished ? "Active" : "Hidden"}
                  </span>
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1.5 rounded-lg text-[#E8E9DF]/70 hover:text-[#A9B887] hover:bg-[#35462F]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#E8E9DF] mb-1">
                {s.title}
              </h3>
              <p className="text-xs font-mono text-[#E8E9DF]/60 mb-3">
                {s.tagline}
              </p>
              <p className="text-xs font-sans text-[#E8E9DF]/80 leading-relaxed mb-4">
                {s.description}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#35462F]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8E9DF]/50 mb-2">
                  Deliverables ({s.deliverables.length})
                </div>
                {s.deliverables.slice(0, 3).map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2 text-xs font-mono text-[#E8E9DF]/70"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#A9B887]" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#212C1E] border border-[#35462F] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#35462F] mb-6">
              <h2 className="text-xl font-serif font-bold text-[#E8E9DF]">
                {editingService ? "Edit Service" : "New Service"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#35462F] text-[#E8E9DF]/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Service Title *
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
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Icon Identifier
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                >
                  <option value="Film">Film</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Camera">Camera</option>
                  <option value="Music">Music</option>
                  <option value="Layers">Layers</option>
                  <option value="Sliders">Sliders</option>
                </select>
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                  Deliverables (One item per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.deliverablesText}
                  onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-[#A9B887]"
                  />
                  <span>Published Live on Public Site</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#35462F] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#172014] border border-[#35462F] text-[#E8E9DF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A9B887] text-[#172014] font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
