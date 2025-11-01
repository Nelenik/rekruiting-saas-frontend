"use server";

import { Area, getAreasCached } from "./getAreasCached";

export const getAreas = async (parentId: string | null): Promise<Area[]> => {
  const areasMap = await getAreasCached();
  if (parentId) {
    const parentArea = areasMap.get(parentId);
    return parentArea
      ? (parentArea.areas || []).sort((a, b) => Number(a.id) - Number(b.id))
      : [];
  } else {
    return Array.from(areasMap.values()).filter(
      (area) => area.parent_id === null
    );
  }
};

export const getAreasByIdsList = async (ids: string[]): Promise<Area[]> => {
  const areasMap = await getAreasCached();
  const areasList: Area[] = ids
    .map((id) => areasMap.get(id))
    .filter(Boolean) as Area[];
  return areasList;
};

export const searchAreasByName = async (
  searchText: string
): Promise<Area[]> => {
  const areasMap = await getAreasCached();
  try {
    const params = new URLSearchParams({ text: searchText });
    console.log(params.toString());
    const res = await fetch(
      `https://api.hh.ru/suggests/areas?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch areas from hh.ru api");
    const data = await res.json();

    // Map API response to Area type using cached areasMap
    const searchAreas: Area[] = [];
    data.items.forEach((item: { id: string; text: string }) => {
      const area = areasMap.get(item.id);
      if (area) {
        searchAreas.push(area);
      }
    });
    return searchAreas;
  } catch (error) {
    console.error("Error searching areas:", error);
    return [];
  }
};
