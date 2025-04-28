'use client'
import { VacancyForm } from "@/entities/vacancy";
import { CvForm } from "@/entities/cv";
import { CompanyForm } from "@/entities/company";
import { SheetModal } from "@/shared/ui/modals/SheetModal";
import { Button } from "@/shared/ui/shadcn/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useCallback } from "react";

type TProps = {
  entityType: 'vacancy' | 'company' | 'cv',
  className?: string
}

const labels = {
  vacancy: { title: 'Создать вакансию', descr: 'Заполните информацию по новой вакансии', triggerText: 'вакансию' },
  company: { title: 'Создать компанию', descr: 'Заполните информацию по новой компании', triggerText: 'организацию' },
  cv: { title: 'Сoздать резюме', descr: 'Заполните информацию по новому резюме', triggerText: 'резюме' },
}

/**
 * `AddEntity` is a reusable client-side component that provides a button
 * to trigger a modal form for creating a new entity (vacancy, company, or CV).
 * 
 * Based on the `entityType` prop, it dynamically renders the corresponding form inside a modal sheet.
 * 
 * ### Features:
 * - Renders a specific form (`VacancyForm`, `CompanyForm`, `CvForm`) depending on the selected entity.
 * - Uses a `SheetModal` for displaying forms.
 * - Customizes button text, modal title, and description based on the entity type.
 * - Closes the modal automatically after successful form submission or cancellation.
 *
 * @param entityType - Defines which form to display: `'vacancy'`, `'company'`, or `'cv'`.
 * @param className - Optional custom className for styling the trigger button.
 *
 * @example
 * ```tsx
 * <AddEntity entityType="vacancy" />
 * <AddEntity entityType="company" className="w-full" />
 * ```
 */

export const AddEntity = ({
  entityType,
  className
}: TProps) => {

  const renderContent = useCallback(({ closeSheetModal }: { closeSheetModal: () => void }) => {

    const forms = {
      vacancy: <VacancyForm type="add" onSuccess={closeSheetModal} onCancel={closeSheetModal} />,
      company: <CompanyForm type="add" onSuccess={closeSheetModal} onCancel={closeSheetModal} />,
      cv: <CvForm type="add" onSuccess={closeSheetModal} onCancel={closeSheetModal} />,
    }
    return forms[entityType]
  }, [entityType])

  return (
    <SheetModal
      key={entityType}
      // render prop for content
      renderContent={renderContent}
    >
      {/* named slots  */}
      {{
        trigger: <Button className={cn('w-max lg:w-full py-6 text-base flex', className)}>
          <CirclePlus />
          Добавить <span className="hidden sm:inline">{labels[entityType].triggerText}</span>
        </Button>,
        title: labels[entityType].title,
        description: labels[entityType].descr
      }}
    </SheetModal>
  );
}