"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle2,
  Trash2,
  Mail,
  Calendar,
  Building,
  DollarSign,
  Clock,
  X,
  Eye,
} from "lucide-react";
import { ContactEnquiry } from "@/lib/data-store";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  const loadEnquiries = () => {
    setLoading(true);
    fetch("/api/admin/enquiries")
      .then((res) => res.json())
      .then((data) => setEnquiries(data.enquiries || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const updateStatus = async (id: string, status: ContactEnquiry["status"]) => {
    await fetch("/api/admin/enquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (confirm("Permanently delete this enquiry?")) {
      await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
      loadEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const filtered = enquiries.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMISSION PIPELINE</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Client Enquiries
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {["all", "unread", "read", "replied", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors ${
                filter === st
                  ? "bg-[#A9B887] text-[#172014] font-bold"
                  : "bg-[#212C1E] border border-[#35462F] text-[#E8E9DF]/70 hover:text-[#E8E9DF]"
              }`}
            >
              {st} ({enquiries.filter((e) => (st === "all" ? true : e.status === st)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#212C1E] rounded-3xl border border-[#35462F] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#35462F] text-[10px] font-mono uppercase tracking-widest text-[#E8E9DF]/60">
                <th className="py-4 px-6">Sender & Company</th>
                <th className="py-4 px-4">Production Type</th>
                <th className="py-4 px-4">Budget</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#35462F] text-xs font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#E8E9DF]/50">
                    No enquiries found in this view.
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr
                    key={e.id}
                    className={`hover:bg-[#172014]/50 transition-colors ${
                      e.status === "unread" ? "bg-[#172014]/40" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-serif font-bold text-sm text-[#E8E9DF]">
                        {e.name}
                      </div>
                      <div className="text-[11px] text-[#A9B887]">
                        {e.email} • {e.company || "Direct Client"}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#E8E9DF]/80">{e.projectType}</td>
                    <td className="py-4 px-4 text-[#E8E9DF]/80">{e.budgetRange}</td>
                    <td className="py-4 px-4 text-[#E8E9DF]/50">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                          e.status === "unread"
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                            : e.status === "replied"
                            ? "bg-emerald-400/20 text-emerald-300"
                            : "bg-[#35462F] text-[#E8E9DF]/70"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(e);
                            if (e.status === "unread") {
                              updateStatus(e.id, "read");
                            }
                          }}
                          className="p-1.5 rounded-lg text-[#E8E9DF]/70 hover:text-[#A9B887] hover:bg-[#35462F]"
                          title="Open Enquiry Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#212C1E] border border-[#35462F] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#35462F] mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A9B887]">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h2 className="text-xl font-serif font-bold text-[#E8E9DF]">
                  {selectedEnquiry.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full hover:bg-[#35462F] text-[#E8E9DF]/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs font-mono">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#172014] border border-[#35462F]">
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Email</div>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-[#A9B887] underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Company</div>
                  <div className="text-[#E8E9DF]">{selectedEnquiry.company || "None"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Project Type</div>
                  <div className="text-[#E8E9DF]">{selectedEnquiry.projectType}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Budget</div>
                  <div className="text-[#E8E9DF]">{selectedEnquiry.budgetRange}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Timeline</div>
                  <div className="text-[#E8E9DF]">{selectedEnquiry.timeline || "Not specified"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#E8E9DF]/50 mb-0.5">Submitted</div>
                  <div className="text-[#E8E9DF]">
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#E8E9DF]/50 mb-2">
                  Project Concept & Message
                </div>
                <div className="p-4 rounded-2xl bg-[#172014] border border-[#35462F] text-sm font-sans text-[#E8E9DF] leading-relaxed whitespace-pre-line">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="pt-4 border-t border-[#35462F] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase text-[#E8E9DF]/60">Update Status:</span>
                  {(["unread", "read", "replied", "archived"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateStatus(selectedEnquiry.id, st)}
                      className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold transition-colors ${
                        selectedEnquiry.status === st
                          ? "bg-[#A9B887] text-[#172014]"
                          : "bg-[#172014] border border-[#35462F] text-[#E8E9DF]/70 hover:text-[#E8E9DF]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <a
                  href={`mailto:${selectedEnquiry.email}?subject=cine.arc%20Production%20Inquiry%20Response`}
                  className="px-5 py-2 rounded-full bg-[#A9B887] text-[#172014] font-bold uppercase tracking-wider text-xs hover:bg-[#BDC9A2] transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
