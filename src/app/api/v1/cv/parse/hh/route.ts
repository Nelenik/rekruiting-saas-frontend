import { NextRequest, NextResponse } from "next/server";
import { unauthorized } from "@/app/api/v1/_lib/db";
import { getAuthUserId } from "@/app/api/v1/_lib/auth";

export async function POST(req: NextRequest) {
  if (!getAuthUserId(req)) return unauthorized();
  // Consume the form data (file upload) — return mock parsed CV
  await req.formData();
  return NextResponse.json({
    data: {
      name: "Frontend Разработчик",
      candy_name: "Иван Иванов",
      candy_email: "ivan@example.com",
      candy_phone: "+7 900 000 0000",
      candy_tg: "",
      candy_location: "Москва",
      salary: 120000,
      experience_months: 36,
      experience_raw: "Senior Frontend Developer в МойСклад (2021–2024)",
      bio: "Опытный разработчик React с фокусом на производительность",
      skills: ["React", "TypeScript", "Node.js"],
      schedule: "full",
      level: "middle",
      status: "looking",
      is_remote: true,
      can_relocate: false,
      workExperiences: [],
    },
    filePathPublic: "/assets/cv-template.pdf",
  });
}
