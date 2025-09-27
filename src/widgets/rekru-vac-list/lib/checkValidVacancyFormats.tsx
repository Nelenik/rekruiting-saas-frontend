import { experienceAliases, vacancyExperienceDict } from "@/entities/vacancy"
import { EVacancyWorkFormat } from "@/shared/api/types"

//this function checks non-canonical work formats 
export const checkWorkFormat = (workFormat: string | null) => {
  const remoteReg = /удал[ёе]н/i
  const hybridReg = /гибрид/i
  const officeReg = /офис/i
  if (!workFormat) return null
  const isVacancyWorkFormat = Object.values(EVacancyWorkFormat).includes(workFormat as EVacancyWorkFormat)
  if (isVacancyWorkFormat) return workFormat
  if (remoteReg.test(workFormat)) return 'remote'
  if (hybridReg.test(workFormat)) return 'hybrid'
  if (officeReg.test(workFormat)) return 'office'
  return null
}
//this function checks non-canonical experience formats
export function checkExperienceFormat(raw: string | null) {
  if (!raw) return null
  if (raw in vacancyExperienceDict) {
    return raw
  }
  const normalized = experienceAliases[raw.toLowerCase()]
  return normalized || null
}