import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getCurrentAdmin } from "@/lib/auth";
import { readDatabase, writeDatabase, MediaAsset } from "@/lib/data-store";

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File exceeds 50MB size limit." }, { status: 400 });
    }

    // Validate MIME types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file format." }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const ext = path.extname(file.name) || ".jpg";
    const base = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40);
    const fileName = `${base}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);
    const fileUrl = `/uploads/${fileName}`;

    // Record in database
    const db = readDatabase();
    const asset: MediaAsset = {
      id: `media-${Date.now()}`,
      name: file.name,
      url: fileUrl,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };
    db.media.unshift(asset);
    writeDatabase(db);

    return NextResponse.json({ success: true, url: fileUrl, asset });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload file" }, { status: 500 });
  }
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readDatabase();
  return NextResponse.json({ media: db.media });
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
      return NextResponse.json({ error: "Media ID required" }, { status: 400 });
    }

    const db = readDatabase();
    const asset = db.media.find((m) => m.id === id);
    if (asset) {
      const fullPath = path.join(process.cwd(), "public", asset.url.replace(/^\//, ""));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      db.media = db.media.filter((m) => m.id !== id);
      writeDatabase(db);
    }

    return NextResponse.json({ success: true, message: "Asset deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete asset" }, { status: 500 });
  }
}
