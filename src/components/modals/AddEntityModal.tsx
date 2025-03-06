'use client'
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { useState, useCallback, FC } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetOverlay, SheetTitle, SheetTrigger } from "../ui/sheet";
import VacancyForm from "../app_forms/VacancyForm";
import { CompanyForm } from "../app_forms/CompanyForm";
import ResumeForm from "../app_forms/ResumeForm";

type TProps = {
  className?: string
  entityType: 'vacancy' | 'company' | 'resume'
}

const labels = {
  vacancy: { title: 'Создать вакансию', descr: 'Заполните информацию по новой вакансии', triggerText: 'вакансию' },
  company: { title: 'Создать компанию', descr: 'Заполните информацию по новой компании', triggerText: 'организацию' },
  resume: { title: 'Сoздать резюме', descr: 'Заполните информацию по новому резюме', triggerText: 'резюме' },
}

const AddEntityModal: FC<TProps> = ({
  className,
  entityType
}) => {

  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  const entityForm = {
    vacancy: <VacancyForm type="add" onSuccess={handleClose} onCancel={handleClose} />,
    company: <CompanyForm type="add" onSuccess={handleClose} onCancel={handleClose} />,
    resume: <ResumeForm type="add" onSuccess={handleClose} onCancel={handleClose} />,
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button className={cn('w-max lg:w-full py-6 text-base flex', className)}>
          <CirclePlus />
          Добавить <span className="hidden sm:inline">{labels[entityType].triggerText}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col sm:max-w-none overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <SheetTitle className="text-3xl">
          {labels[entityType].title}
        </SheetTitle>

        <SheetDescription className="visually-hidden">
          {labels[entityType].descr}
        </SheetDescription>

        {entityForm[entityType]}

      </SheetContent>
    </Sheet>
  );
}

export default AddEntityModal;