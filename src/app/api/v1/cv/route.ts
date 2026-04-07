import { NextRequest } from "next/server";
import {
  loadDb,
  saveDb,
  nextId,
  paginate,
  list,
  ok,
  unauthorized,
} from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  let data = [...db.cvs];
  if (sp.get("name")) {
    const q = sp.get("name")!.toLowerCase();
    data = data.filter(
      (c) =>
        c.candy_name?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q),
    );
  }
  if (sp.get("status"))
    data = data.filter((c) => c.status === sp.get("status"));
  if (sp.get("level")) data = data.filter((c) => c.level === sp.get("level"));
  if (sp.get("schedule"))
    data = data.filter((c) => c.schedule === sp.get("schedule"));
  if (sp.get("position")) {
    const q = sp.get("position")!.toLowerCase();
    data = data.filter((c) => c.name?.toLowerCase().includes(q));
  }
  if (sp.get("location")) {
    const q = sp.get("location")!.toLowerCase();
    data = data.filter((c) => c.candy_location?.toLowerCase().includes(q));
  }
  if (sp.get("salary_from"))
    data = data.filter(
      (c) => (c.salary || 0) >= parseInt(sp.get("salary_from")!),
    );
  if (sp.get("salary_to"))
    data = data.filter(
      (c) => (c.salary || 0) <= parseInt(sp.get("salary_to")!),
    );
  return list(paginate(data, sp.get("page"), sp.get("take") ?? "10", 10));
}

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  const db = loadDb();
  const body = await req.json();
  const cv = {
    external_id: randomUUID(),
    workExperiences: [],
    skills: [],
    experience: null,
    from: "manual",
    candy_photo: "",
    summary: "",
    bio: "",
    ...body,
    id: nextId(db.cvs),
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    salary: parseInt(body.salary) || 0,
    experience_months: parseInt(body.experience_months) || 0,
  };
  db.cvs.push(cv);
  saveDb(db);
  return ok(cv);
}
