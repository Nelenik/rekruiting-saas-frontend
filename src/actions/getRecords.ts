"use server";

import { AirtableError } from "@/lib/customErrors";
import { ListRecordsParams } from "@/types/airtableBase";
import { VacancyFull } from "@/types/vacancyTypes";

const baseKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const baseUrl = `${process.env.NEXT_PUBLIC_AIRTABLE_ENDPOINT_URL}/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}`;
console.log(baseUrl);

/**
 * Fetches a list of records from a specified table using an API request.
 *
 * @template T The expected type of the response data.
 * @param {string} tableNameOrId - The id or name of the airtable table
 * @param {Record<string, string>} params - The query params for filtering, sorting, format
 * @returns {Promise<T>} A promise that resolves to the fetched records.
 * @throws {AirtableError} If the API returns an error.
 */
export const getListRecords = async <T>(
  tableNameOrId: string,
  params: ListRecordsParams = {}
): Promise<T> => {
  // Make a POST request to the Airtable API to get records, details https://support.airtable.com/docs/enforcement-of-url-length-limit-for-web-api-requests
  const response = await fetch(`${baseUrl}/${tableNameOrId}/listRecords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${baseKey}`,
    },
    body: JSON.stringify(params),
  });

  const { records = [], error } = await response.json();

  // If the API returned an error, throw a custom AirtableError
  if (error) throw new AirtableError(error.type, error.message);

  // Process and return the records with the desired structure
  return records.map(
    (el: {
      id: string;
      createdTime: string;
      fields: Record<string, unknown>;
    }) => ({
      id: el.id, // The record ID
      createdTime: el.createdTime, // The record creation timestamp
      ...el.fields, // The fields of the record
    })
  );
};

export const getRecordById = async (
  tableNameOrId: string,
  recordId: string
): Promise<VacancyFull> => {
  const response = await fetch(`${baseUrl}/${tableNameOrId}/${recordId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${baseKey}`,
    },
  });

  const res = await response.json();
  return res;
};
