'use server'
import { getFilterCompanies } from "@/shared/api/actions"
import { normalizeVacanciesFilterPath } from "./normalizeVacanciesFilterPath"
import { decodeSegment } from "@/shared/lib/encodeSegments"
import { getPubVacancyPositions } from "@/shared/api/actions/public-vacancy"
import { TShortCompany, TVacancyPosition } from "@/shared/api/types"

export type TRekruVacanciesCtx = {
  companyId: string,
  companiesList: TShortCompany[]
  positionsList: TVacancyPosition[]
  position: string
}

export const resolveRekruVacanciesCtx = async (pathFilters: string[]): Promise<TRekruVacanciesCtx> => {
  const { company, position } = normalizeVacanciesFilterPath(pathFilters)
  const companies = await getFilterCompanies()
  const positions = await getPubVacancyPositions()

  const companyData = companies.find((item) => decodeSegment(company || '').toLowerCase() === item.name.toLowerCase());
  const companyId = companyData ? String(companyData.id) : ''

  return {
    companyId, companiesList: companies, position, positionsList: positions
  }
}