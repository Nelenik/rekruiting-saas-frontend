'use client'

import { PositionSelect } from "@/entities/vacancy";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import FormItem from "@/shared/ui/FormItem";
import { useParams, useRouter } from "next/navigation";

export const PathSegmentFilters = () => {
  const router = useRouter()
  const params = useParams()
  const { filters = [] } = params
  const [urlPosition, urlCompany] = filters

  const positionFromUrl = urlPosition === 'all' ? '' : urlPosition || ''
  // const companyFromUrl = urlCompany || ''

  const handleChangePosition = (value: string) => {
    router.push(`/vacancies/${value}`)
  }
  const handleResetPosition = () => {
    router.push('/vacancies')
  }

  return (

    <FormItem labelText="Специализация" className="grow min-w-[250px]">
      <CancelButton
        onClick={handleResetPosition}
        className="absolute right-0 top-0 z-10"
      />
      <PositionSelect
        value={positionFromUrl}
        onValueChange={handleChangePosition}
        className="bg-white"
      />
    </FormItem>
  );
}