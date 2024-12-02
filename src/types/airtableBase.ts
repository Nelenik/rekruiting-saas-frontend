export interface ListRecordsParams {
  fields?: string[];
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
  sort?: { field: string; direction: "asc" | "desc" }[];
  view?: string;
  cellFormat?: string;
  timeZone?: string;
  userLocale?: string;
  returnFielsByFieldId?: boolean;
  recordMetadata?: string[];
}
export interface AirtableErrorResponse {
  type: string;
  message: string;
}
