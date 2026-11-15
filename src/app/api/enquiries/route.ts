import { NextResponse } from "next/server";
import { readDatabase, writeDatabase, ContactEnquiry } from "@/lib/data-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, budgetRange, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const newEnquiry: ContactEnquiry = {
      id: `enq-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: company ? String(company).trim() : undefined,
      projectType: projectType || "General Video Production",
      budgetRange: budgetRange || "$25,000 – $50,000",
      timeline: timeline || "Flexible",
      message: String(message).trim(),
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);
    writeDatabase(db);

    return NextResponse.json(
      { success: true, enquiryId: newEnquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to process enquiry:", error);
    return NextResponse.json(
      { error: "Internal server error saving enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Public listing disabled for security
  return NextResponse.json(
    { error: "Unauthorized access." },
    { status: 401 }
  );
}
