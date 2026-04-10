import { loadDb, list } from "@/app/api/v1/_lib/db";

export async function GET() {
  const db = loadDb();
  const posMap: Record<string, number> = {};
  db.vacancies.forEach((v) => {
    if (v.position) posMap[v.position] = (posMap[v.position] || 0) + 1;
  });
  const data = Object.entries(posMap).map(([position, count]) => ({
    position,
    count,
  }));
  return list({ data, total: data.length, page: 1, take: data.length });
}
