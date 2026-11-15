"use client";

import React, { useState, useEffect } from "react";
import { Edit3, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { SiteContent } from "@/lib/constants";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setContent(data.content))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSuccessMsg("Site copy and editorial content updated live!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="text-xs font-mono text-[#E8E9DF]/60 py-12 text-center">
        Loading site content...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <Edit3 className="w-3.5 h-3.5" />
            <span>COPYWRITING & CMS</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Website Content
          </h1>
        </div>

        {successMsg && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-600/70 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs font-mono">
        {/* HERO SECTION MODULE */}
        <div className="bg-[#212C1E] p-6 sm:p-8 rounded-3xl border border-[#35462F] space-y-5">
          <h2 className="text-sm uppercase tracking-widest text-[#A9B887] font-bold border-b border-[#35462F] pb-3">
            Homepage Hero Section
          </h2>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Top Availability Badge
            </label>
            <input
              type="text"
              value={content.hero.badge}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, badge: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Main Editorial Headline
            </label>
            <input
              type="text"
              value={content.hero.headline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, headline: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none font-serif text-base"
            />
          </div>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Hero Narrative Subtitle
            </label>
            <textarea
              rows={3}
              value={content.hero.subheadline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, subheadline: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Primary Button Label
              </label>
              <input
                type="text"
                value={content.hero.ctaPrimary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, ctaPrimary: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Secondary Button (Showreel)
              </label>
              <input
                type="text"
                value={content.hero.ctaSecondary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, ctaSecondary: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Background Showreel Video URL
            </label>
            <input
              type="text"
              value={content.hero.showreelVideoUrl}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, showreelVideoUrl: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
            />
          </div>
        </div>

        {/* BRAND MANIFESTO MODULE */}
        <div className="bg-[#212C1E] p-6 sm:p-8 rounded-3xl border border-[#35462F] space-y-5">
          <h2 className="text-sm uppercase tracking-widest text-[#A9B887] font-bold border-b border-[#35462F] pb-3">
            Brand Manifesto & Statement
          </h2>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Tagline Title
            </label>
            <input
              type="text"
              value={content.intro.tagline}
              onChange={(e) =>
                setContent({
                  ...content,
                  intro: { ...content.intro, tagline: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#E8E9DF]/70 uppercase mb-1">
              Manifesto Narrative
            </label>
            <textarea
              rows={4}
              value={content.intro.manifesto}
              onChange={(e) =>
                setContent({
                  ...content,
                  intro: { ...content.intro, manifesto: e.target.value },
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none font-serif text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* STUDIO CONTACT & LOCATION MODULE */}
        <div className="bg-[#212C1E] p-6 sm:p-8 rounded-3xl border border-[#35462F] space-y-5">
          <h2 className="text-sm uppercase tracking-widest text-[#A9B887] font-bold border-b border-[#35462F] pb-3">
            Contact & Operations Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Official Studio Email
              </label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={content.contact.phone}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Physical Studio Location
              </label>
              <input
                type="text"
                value={content.contact.location}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, location: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#E8E9DF]/70 uppercase mb-1">
                Studio Hours & Timezone
              </label>
              <input
                type="text"
                value={content.contact.studioHours}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, studioHours: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] focus:border-[#A9B887] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-6 p-4 rounded-2xl bg-[#212C1E]/90 backdrop-blur-md border border-[#35462F] shadow-2xl flex items-center justify-between">
          <span className="text-xs text-[#E8E9DF]/60">
            Unsaved changes will apply across all public routes immediately.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-full bg-[#A9B887] text-[#172014] font-bold text-xs uppercase tracking-widest hover:bg-[#BDC9A2] transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Updates..." : "Save & Update Live Website"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
