export type TCompany = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  inn: string;
  rate: string;
  rate_at: string;
  created_at: string;
  partner: boolean;
  it_accreditation: boolean;
  logo: string;
  site: string;
  rating: number;
};

export type TShortCompany = {
  id: number;
  name: string;
  full_name: string;
  count: number;
  it_accreditation?: boolean;
  logo?: string;
  rating?: number;
};
