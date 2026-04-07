import { readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Db = Record<string, any[]>;

export const loadDb = (): Db => JSON.parse(readFileSync(DB_PATH, "utf-8"));

export const saveDb = (db: Db): void =>
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nextId = (arr: any[]): number =>
  arr.length ? Math.max(...arr.map((x) => Number(x.id) || 0)) + 1 : 1;

export const paginate = <T>(
  arr: T[],
  page: string | null,
  take: string | null,
  defaultTake = 10,
) => {
  const p = Math.max(1, parseInt(page ?? "1") || 1);
  const t = Math.max(1, parseInt(take ?? String(defaultTake)) || defaultTake);
  return {
    data: arr.slice((p - 1) * t, p * t),
    total: arr.length,
    page: p,
    take: t,
  };
};

export const ok = (data: unknown) => NextResponse.json({ success: true, data });

export const list = (result: Record<string, unknown>) =>
  NextResponse.json({ success: true, ...result });

export const notFound = () =>
  NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

export const unauthorized = () =>
  NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 },
  );

/**
 * This is a helper function to enrich vacancy data with related status and match statuses.
 * It takes a vacancy object and the database as input, and returns the vacancy object with additional fields:
 * - status: the status object related to the vacancy
 * - matchStatuses: an array of match status objects related to the vacancy, sorted by rank
 * - match_count: the total number of matches related to the vacancy
 * - match_hot_count: the number of matches related to the vacancy with a point of 80 or higher
 *
 * @param vacancy The vacancy object to enrich
 * @param db The database object containing all related data
 * @returns The enriched vacancy object with additional fields
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrichVacancy = (vacancy: any, db: Db) => {
  const status = db.statuses.find((s) => s.id === vacancy.status_id) ?? null;
  const matchStatuses = db.match_statuses
    .filter((ms) => ms.vacancy_id === vacancy.id)
    .sort((a, b) => a.rank - b.rank)
    .map((ms) => ({
      ...ms,
      status: db.statuses.find((s) => s.id === ms.status_id) ?? null,
    }));
  const match_count = db.matches.filter(
    (m) => m.vacancy_id === vacancy.id,
  ).length;
  const match_hot_count = db.matches.filter(
    (m) => m.vacancy_id === vacancy.id && (m.point || 0) >= 80,
  ).length;
  return { ...vacancy, status, matchStatuses, match_count, match_hot_count };
};
