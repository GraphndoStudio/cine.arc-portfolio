import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase } from "@/lib/data-store";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDatabase();
  return NextResponse.json({ enquiries: db.enquiries });
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Enquiry ID and status required." }, { status: 400 });
    }

    const db = readDatabase();
    const enquiry = db.enquiries.find((e) => e.id === id);
    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    enquiry.status = status;
    writeDatabase(db);

    return NextResponse.json({ success: true, enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update enquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Enquiry ID required." }, { status: 400 });
    }

    const db = readDatabase();
    db.enquiries = db.enquiries.filter((e) => e.id !== id);
    writeDatabase(db);

    return NextResponse.json({ success: true, message: "Enquiry removed." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete enquiry" }, { status: 500 });
  }
}
