import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase } from "@/lib/data-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const db = readDatabase();
    const index = db.projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const existing = db.projects[index];
    db.projects[index] = {
      ...existing,
      ...body,
      id: existing.id, // prevent ID change
      slug: body.slug || existing.slug,
    };

    writeDatabase(db);
    return NextResponse.json({ success: true, project: db.projects[index] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const db = readDatabase();
    const initialLen = db.projects.length;
    db.projects = db.projects.filter((p) => p.id !== id);

    if (db.projects.length === initialLen) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    writeDatabase(db);
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete project" }, { status: 500 });
  }
}
