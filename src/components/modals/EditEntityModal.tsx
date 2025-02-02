'use client'
import { useState, useCallback, FC } from "react";
import EditVacancyForm from "../app_forms/EditVacancyForm";
import EditButton from "../buttons/EditButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { filterFalsyFields, NonNullableFields } from "@/lib/utils/filterFalsyFields";
import { TVacancy } from "@/shared/types";

type TProps = {
  className?: string
  triggerView?: 'icon' | 'default'
  initialData: unknown
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

const EditEntityModal = (
  { className,
    triggerView = 'default',
    initialData,
    entityType }: TProps

): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => setOpen(false), [])

  let entity;
  switch (entityType) {
    case 'vacancy':
      entity = <EditVacancyForm closeModal={handleClose} initialData={initialData as NonNullableFields<TVacancy>} />
      break;
    case 'company':
      entity = <p>Edift company form</p>
      break;
    case 'resume':
      entity = <p>Edit resume form</p>
      break;
    case 'match':
      entity = <p>edit match form</p>
      break;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton isIconView={triggerView === 'icon'} className={className} />
      </DialogTrigger>

      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">
          {labels[entityType].title}
        </DialogTitle>

        <DialogDescription className="visually-hidden">
          {labels[entityType].descr}
        </DialogDescription>

        {entity}

      </DialogContent>
    </Dialog>
  );
}

export default EditEntityModal;