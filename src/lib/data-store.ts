import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SITE_CONTENT,
  Project,
  ServiceItem,
  SiteContent,
} from "./constants";

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  timeline?: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "superadmin" | "editor";
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

interface DatabaseSchema {
  users: AdminUser[];
  projects: Project[];
  services: ServiceItem[];
  content: SiteContent;
  enquiries: ContactEnquiry[];
  media: MediaAsset[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

// Default initial state
function getInitialData(): DatabaseSchema {
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "CineArcAdmin2026!";
  const initialEmail = (process.env.ADMIN_INITIAL_EMAIL || "admin@cinearc.com").toLowerCase();
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(initialPassword, salt);

  return {
    users: [
      {
        id: "admin-1",
        email: initialEmail,
        passwordHash,
        name: "Studio Director",
        role: "superadmin",
        createdAt: new Date().toISOString(),
      },
    ],
    projects: INITIAL_PROJECTS,
    services: INITIAL_SERVICES,
    content: INITIAL_SITE_CONTENT,
    enquiries: [
      {
        id: "enq-1",
        name: "Julian H.",
        email: "julian@arcstudio.design",
        company: "ArchiForm Atelier",
        projectType: "Brand Films",
        budgetRange: "$25,000 – $50,000",
        timeline: "Q2 2026",
        message: "We are seeking a high-caliber video production partner to direct our 2026 global architectural film series. Let's schedule a discovery call.",
        status: "unread",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: "enq-2",
        name: "Clara Dupont",
        email: "clara.dupont@parisvogue.fr",
        company: "L'Etoile Fragrance",
        projectType: "Commercials",
        budgetRange: "$50,000+",
        timeline: "Q3 2026",
        message: "Inquiry regarding commercial production for our upcoming fall campaign launch. Loved the high-contrast aesthetic on your previous projects.",
        status: "read",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
    media: [],
  };
}

export function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading database:", error);
    return getInitialData();
  }
}

export function writeDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database:", error);
    throw error;
  }
}
