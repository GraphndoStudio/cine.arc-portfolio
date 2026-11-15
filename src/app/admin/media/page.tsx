"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Film,
  ExternalLink,
} from "lucide-react";
import { MediaAsset } from "@/lib/data-store";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = () => {
    setLoading(true);
    fetch("/api/admin/upload")
      .then((res) => res.json())
      .then((data) => setMedia(data.media || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
      }
      loadMedia();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this asset?")) {
      await fetch(`/api/admin/upload?id=${id}`, { method: "DELETE" });
      loadMedia();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#35462F]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A9B887] mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>ASSET MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#E8E9DF]">
            Media Library
          </h1>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            multiple
            accept="image/*,video/mp4,video/webm"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A9B887] text-[#172014] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#BDC9A2] transition-colors shadow-lg disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Uploading Asset..." : "Upload New Files"}</span>
          </button>
        </div>
      </div>

      {/* Upload Zone / Drop Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 sm:p-12 rounded-3xl bg-[#212C1E] border-2 border-dashed border-[#35462F] hover:border-[#A9B887] cursor-pointer text-center transition-colors flex flex-col items-center justify-center group"
      >
        <div className="h-14 w-14 rounded-2xl bg-[#172014] border border-[#35462F] flex items-center justify-center text-[#A9B887] mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-base font-serif font-bold text-[#E8E9DF] mb-1">
          Click or drop files to upload
        </h3>
        <p className="text-xs font-mono text-[#E8E9DF]/60 max-w-sm">
          Supports PNG, WebP, JPG, SVG images and MP4 / WebM video previews (Max 50MB per file)
        </p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-2xl bg-[#212C1E] border border-[#35462F] flex flex-col justify-between group"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#172014] mb-2 border border-[#35462F]">
              {item.type.startsWith("video/") ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#A9B887]">
                  <Film className="w-8 h-8 mb-1" />
                  <span className="text-[10px] font-mono">MP4 Preview</span>
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="text-[11px] font-mono text-[#E8E9DF] truncate mb-1">
              {item.name}
            </div>
            <div className="text-[9px] font-mono text-[#E8E9DF]/50 mb-3">
              {(item.size / 1024).toFixed(0)} KB • {new Date(item.uploadedAt).toLocaleDateString()}
            </div>

            <div className="pt-2 border-t border-[#35462F] flex items-center justify-between">
              <button
                onClick={() => copyToClipboard(item.url, item.id)}
                className="p-1.5 rounded-lg text-[#E8E9DF]/70 hover:text-[#A9B887] hover:bg-[#35462F] transition-colors"
                title="Copy relative file link"
              >
                {copiedId === item.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
