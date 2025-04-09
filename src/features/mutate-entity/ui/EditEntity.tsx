'use client'
import { CompanyForm } from "@/entities/company"
import { CvForm } from "@/entities/cv"
import { VacancyForm } from "@/entities/vacancy"
import { TCompany, TResume, TVacancy } from "@/shared/api/types"
import { filterFalsyFields, NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields"
import { EditButton } from "@/shared/ui/custom/buttons/EditButton"
import { SheetModal } from "@/shared/ui/custom/modals/SheetModal"
import { useCallback } from "react"

type TProps = {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: Record<string, unknown>
  entityType: 'vacancy' | 'company' | 'cv'
}
const labels = {
  vacancy: { title: 'Изменить вакансию', descr: 'Форма редактирования ваканси' },
  company: { title: 'Редактировать компанию', descr: 'Форма редактирования компании' },
  cv: { title: 'Редактировать резюме', descr: 'Форма редактирования резюме' },
}

export const EditEntity = <T extends object>({
  className,
  triggerView = 'default',
  initialData,
  entityType
}: TProps) => {

  const filtredInitial = filterFalsyFields<T>(initialData as T)

  const renderContent = useCallback(({ closeSheetModal }: { closeSheetModal: () => void }) => {

    const forms = {
      vacancy: <VacancyForm type="edit" onSuccess={closeSheetModal} onCancel={closeSheetModal} initialData={filtredInitial as NonNullableFields<TVacancy>} />,
      company: <CompanyForm type="edit" onSuccess={closeSheetModal} onCancel={closeSheetModal} initialData={filtredInitial as NonNullableFields<TCompany>} />,
      cv: <CvForm type="edit" onSuccess={closeSheetModal} onCancel={closeSheetModal} initialData={filtredInitial as NonNullableFields<TResume>} />,
    }
    return forms[entityType]
  }, [entityType, filtredInitial])

  return (
    <SheetModal
      key={entityType}
      // render prop for content
      renderContent={renderContent}
    >
      {/* named slots  */}
      {{
        trigger: <EditButton isIconView={triggerView === 'icon'} className={className} />,
        title: labels[entityType].title,
        description: labels[entityType].descr
      }}
    </SheetModal>
  );
}