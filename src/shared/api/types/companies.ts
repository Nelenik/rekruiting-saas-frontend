export type TCompany = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  inn: string;
  rate: string;
  rate_at: string;
  created_at: string;
};

export type TFilterCompanies = {
  id: number;
  name: string;
  full_name: string;
  count: number;
  it_accreditation?: boolean;
};
