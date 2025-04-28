'use client'
import { CompanyForm } from "@/entities/company"
import { CvForm } from "@/entities/cv"
import { VacancyForm } from "@/entities/vacancy"
import { TCompany, TResume, TVacancy } from "@/shared/api/types"
import { filterFalsyFields, NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields"
import { EditButton } from "@/shared/ui/buttons/EditButton"
import { SheetModal } from "@/shared/ui/modals/SheetModal"
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

/**
 * `EditEntity` is a client-side component that provides a button to trigger a modal sheet for editing
 * an existing entity (vacancy, company, or CV). The form inside the modal allows the user to edit details
 * of the selected entity, with pre-filled initial data.
 *
 * ### Features:
 * - Renders a specific form (`VacancyForm`, `CompanyForm`, `CvForm`) for editing based on the selected `entityType`.
 * - Accepts initial data for pre-filling the form, ensuring the user can modify existing entries.
 * - Uses a `SheetModal` to display the editable form in a modal.
 * - The button view is customizable (`icon` or `default`).
 * - Closes the modal automatically after successful form submission or cancellation.
 *
 * @param className - Optional custom className for styling the trigger button.
 * @param triggerView - Defines the button view: `'icon'` for icon-only or `'default'` for full button text (default: `'default'`).
 * @param initialData - The initial data to populate the form fields, which will be filtered to remove falsy values.
 * @param entityType - Defines which form to render: `'vacancy'`, `'company'`, or `'cv'`.
 *
 * @example
 * ```tsx
 * <EditEntity entityType="vacancy" initialData={vacancyData} />
 * <EditEntity entityType="company" triggerView="icon" initialData={companyData} />
 * ```
 */

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