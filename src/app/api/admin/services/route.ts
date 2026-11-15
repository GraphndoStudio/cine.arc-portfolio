import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase } from "@/lib/data-store";
import { ServiceItem } from "@/lib/constants";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDatabase();
  const sorted = [...db.services].sort((a, b) => a.sortOrder - b.sortOrder);
  return NextResponse.json({ services: sorted });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, tagline, description, deliverables, icon, isPublished } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const db = readDatabase();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newService: ServiceItem = {
      id: `serv-${Date.now()}`,
      title,
      slug,
      tagline: tagline || "",
      description,
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      icon: icon || "Film",
      sortOrder: db.services.length + 1,
      isPublished: isPublished !== false,
    };

    db.services.push(newService);
    writeDatabase(db);

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create service" }, { status: 500 });
  }
}
