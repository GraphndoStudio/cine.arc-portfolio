import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase } from "@/lib/data-store";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDatabase();
  return NextResponse.json({ content: db.content });
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const db = readDatabase();

    db.content = {
      ...db.content,
      ...body,
    };

    writeDatabase(db);
    return NextResponse.json({ success: true, content: db.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update content" }, { status: 500 });
  }
}
