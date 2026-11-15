import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase } from "@/lib/data-store";
import { Project } from "@/lib/constants";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDatabase();
  const sorted = [...db.projects].sort((a, b) => a.sortOrder - b.sortOrder);
  return NextResponse.json({ projects: sorted });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      client,
      year,
      category,
      categorySlug,
      synopsis,
      description,
      thumbnail,
      posterImage,
      videoUrl,
      videoType,
      duration,
      aspectRatio,
      director,
      dp,
      colorist,
      isFeatured,
      status,
      gallery,
    } = body;

    if (!title || !client) {
      return NextResponse.json(
        { error: "Title and client are required." },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Ensure unique slug
    let slug = slugBase;
    let count = 1;
    while (db.projects.some((p) => p.slug === slug)) {
      slug = `${slugBase}-${count++}`;
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      slug,
      client,
      year: year || String(new Date().getFullYear()),
      category: category || "Commercials",
      categorySlug: categorySlug || "commercials",
      synopsis: synopsis || "",
      description: description || "",
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1600&auto=format&fit=crop",
      posterImage: posterImage || thumbnail || "",
      videoUrl: videoUrl || "",
      videoType: videoType || "mp4",
      duration: duration || "02:00",
      aspectRatio: aspectRatio || "2.39:1",
      director: director || "cine.arc Studio",
      dp: dp || "Marcus Vance",
      colorist: colorist || "Elena Rostov",
      isFeatured: Boolean(isFeatured),
      status: status || "published",
      sortOrder: db.projects.length + 1,
      gallery: Array.isArray(gallery) ? gallery : [],
    };

    db.projects.unshift(newProject);
    writeDatabase(db);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create project" }, { status: 500 });
  }
}
