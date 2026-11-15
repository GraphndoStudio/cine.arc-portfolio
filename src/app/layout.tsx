import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syneDisplay = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "cine.arc — Video Production & Cinematography Studio",
  description: "A premium video production studio crafting cinematic storytelling, commercial films, brand narratives, and visual experiences.",
  icons: {
    icon: "/brand/mark-deep-olive.png",
    apple: "/brand/mark-deep-olive.png",
  },
  openGraph: {
    title: "cine.arc — Video Production & Cinematography Studio",
    description: "A premium video production studio crafting cinematic storytelling, commercial films, brand narratives, and visual experiences.",
    images: ["/brand/logo-vertical-olive.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syneDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#E8E9DF] text-[#2E3D28] selection:bg-[#A9B887] selection:text-[#172014]">
        {children}
      </body>
    </html>
  );
}
