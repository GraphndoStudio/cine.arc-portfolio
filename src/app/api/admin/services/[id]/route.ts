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
    const index = db.services.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const existing = db.services[index];
    db.services[index] = {
      ...existing,
      ...body,
      id: existing.id,
    };

    writeDatabase(db);
    return NextResponse.json({ success: true, service: db.services[index] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update service" }, { status: 500 });
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
    const initialLen = db.services.length;
    db.services = db.services.filter((s) => s.id !== id);

    if (db.services.length === initialLen) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    writeDatabase(db);
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete service" }, { status: 500 });
  }
}
