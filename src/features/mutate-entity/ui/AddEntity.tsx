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