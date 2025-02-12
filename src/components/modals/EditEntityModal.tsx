'use client'
import { useState, useCallback, FC } from "react";
import EditButton from "../buttons/EditButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { filterFalsyFields, NonNullableFields } from "@/lib/utils/filterFalsyFields";
import { TVacancy } from "@/shared/types";
import VacancyForm from "../app_forms/VacancyForm";
import { CompanyForm } from "../app_forms/CompanyForm";
import { TCompany } from "@/shared/types/companies";
import ResumeForm from "../app_forms/ResumeForm";
import { TResume } from "@/shared/types/resume";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";

type TProps = {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: Record<string, unknown>
  entityType: 'vacancy' | 'company' | 'resume' | 'match'
}

const labels = {
  vacancy: { title: 'Изменить вакансию', descr: 'Форма редактирования ваканси' },
  company: { title: 'Редактировать компанию', descr: 'Форма редактирования компании' },
  resume: { title: 'Редактировать резюме', descr: 'Форма редактирования резюме' },
  match: { title: 'Изменить мэтч', descr: 'Форма редактирования мэтча' }
}

/**
 * A generic modal component for editing different entity types (vacancy, company, resume, match).
 * The modal includes a customizable trigger button and renders the appropriate edit form based on entity type.
 * 
 * @template T - The type of initialData being passed to the edit form
 * 
 * @param props - Component properties
 * @param props.className - Optional CSS class name to apply to the trigger button
 * @param props.triggerView - Visual style of the trigger button ('default' | 'icon'), defaults to 'default'
 * @param props.initialData - Initial data of type T to populate the edit form
 * @param props.entityType - Type of entity to edit ('vacancy' | 'company' | 'resume' | 'match')
 * 
 * @returns JSX Element containing the modal dialog with appropriate edit form
 * 
 */

const EditEntityModal = <T extends object>(
  { className,
    triggerView = 'default',
    initialData,
    entityType }: TProps

): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  const filtredInitial = filterFalsyFields<T>(initialData as T)

  const entityForm = {
    vacancy: <VacancyForm type="edit" closeModal={handleClose} initialData={filtredInitial as TVacancy} />,
    company: <CompanyForm type="edit" closeModal={handleClose} initialData={filtredInitial as NonNullableFields<TCompany>} />,
    resume: <ResumeForm type="edit" closeModal={handleClose} initialData={filtredInitial as NonNullableFields<TResume>} />,
    match: <p>match form</p>
  }

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //     <EditButton isIconView={triggerView === 'icon'} className={className} />
    //   </DialogTrigger>

    //   <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
    //     <DialogTitle className="text-3xl">
    //       {labels[entityType].title}
    //     </DialogTitle>

    //     <DialogDescription className="visually-hidden">
    //       {labels[entityType].descr}
    //     </DialogDescription>

    //     {entityForm[entityType]}

    //   </DialogContent>
    // </Dialog>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        <EditButton isIconView={triggerView === 'icon'} className={className} />
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

export default EditEntityModal;