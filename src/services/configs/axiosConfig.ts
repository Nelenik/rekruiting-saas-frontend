import { ListRecordsParams } from "@/types/airtableBase";
import axios from "axios";

const baseKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const baseUrl = `${process.env.NEXT_PUBLIC_AIRTABLE_ENDPOINT_URL}/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}`;
console.log(baseUrl);
//инициализация инстанса axios с общими для всех запросов настройками.
export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${baseKey}`,
  },
});

/**
 * Fetches a list of records from a specified table using an API request.
 *
 * @template T The expected type of the response data.
 * @param {string} tableNameOrId - The id or name of the airtable table
 * @param {ListRecordsParams} params - The query params for filtering, sorting, format
 * @returns {Promise<T>} A promise that resolves to the fetched records.
 */
export const getListRecords = async <T>(
  tableNameOrId: string,
  params: ListRecordsParams = {}
): Promise<T> => {
  try {
    const response = await Axios.post(`/${tableNameOrId}/listRecords`, params);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch records: ${err}`);
  }
};
