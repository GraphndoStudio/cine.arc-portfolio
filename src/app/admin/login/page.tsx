"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@cinearc.com");
  const [password, setPassword] = useState("CineArcAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#172014] text-[#E8E9DF] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Vignette & Emblem */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-10 pointer-events-none">
        <Image
          src="/brand/mark-white.png"
          alt=""
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8E9DF]/70 hover:text-[#E8E9DF] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-[#A9B887]">
          <ShieldCheck className="w-4 h-4" />
          <span>AUTHENTICATED STUDIO PORTAL</span>
        </div>
      </div>

      {/* Center Login Box */}
      <div className="w-full max-w-md mx-auto my-auto z-10 py-10">
        <div className="bg-[#212C1E] p-8 sm:p-10 rounded-3xl border border-[#35462F] shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative h-10 w-44 mx-auto mb-4">
              <Image
                src="/brand/logo-horizontal-white.png"
                alt="cine.arc"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#A9B887]">
              Studio Content Management
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/70 border border-red-700/60 text-red-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#E8E9DF]/80 mb-2">
                Studio Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A9B887] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] text-sm focus:outline-none focus:border-[#A9B887] transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#E8E9DF]/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A9B887] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#172014] border border-[#35462F] text-[#E8E9DF] text-sm focus:outline-none focus:border-[#A9B887] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Default credentials note for review */}
            <div className="p-3 rounded-xl bg-[#172014]/60 border border-[#35462F] text-[11px] font-mono text-[#E8E9DF]/60">
              <span className="text-[#A9B887] font-semibold">Initial Access:</span>{" "}
              admin@cinearc.com / CineArcAdmin2026!
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#A9B887] text-[#172014] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#BDC9A2] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Enter Studio Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs font-mono text-[#E8E9DF]/40 z-10">
        cine.arc Studio CMS • Protected Route Architecture
      </div>
    </div>
  );
}
