"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Sparkles,
  Edit3,
  MessageSquare,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If on login page, render clean without sidebar
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Verify session
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.authenticated) {
          setAdminUser(data.user);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#172014] text-[#E8E9DF] flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#A9B887] animate-ping"></span>
          <span>Validating Studio Credentials...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Film },
    { label: "Services", href: "/admin/services", icon: Sparkles },
    { label: "Site Content", href: "/admin/content", icon: Edit3 },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#172014] text-[#E8E9DF] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#212C1E] border-b border-[#35462F] z-30">
        <div className="relative h-7 w-32">
          <Image
            src="/brand/logo-horizontal-white.png"
            alt="cine.arc"
            fill
            className="object-contain"
          />
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg bg-[#172014] text-[#E8E9DF] border border-[#35462F]"
          aria-label="Toggle admin menu"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-[#212C1E] border-r border-[#35462F] flex flex-col justify-between p-6 transition-transform duration-300 md:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="mb-8 pb-6 border-b border-[#35462F]">
            <Link href="/admin" className="block mb-2">
              <div className="relative h-8 w-36">
                <Image
                  src="/brand/logo-horizontal-white.png"
                  alt="cine.arc"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#A9B887]">
              Studio Control System
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#A9B887] text-[#172014] font-bold shadow-sm"
                      : "text-[#E8E9DF]/70 hover:text-[#E8E9DF] hover:bg-[#172014]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Actions */}
        <div className="pt-6 border-t border-[#35462F] space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-[#172014] border border-[#35462F] flex items-center justify-center text-[#A9B887]">
              <User className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono overflow-hidden">
              <div className="font-semibold truncate text-[#E8E9DF]">
                {adminUser?.name || "Studio Admin"}
              </div>
              <div className="text-[10px] text-[#A9B887] truncate">
                {adminUser?.email || "admin@cinearc.com"}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-mono text-[#E8E9DF]/70 hover:text-[#E8E9DF] hover:bg-[#172014] transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A9B887]" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-950/40 transition-colors"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
