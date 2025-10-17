'use client'

import { SheetModal } from "@/shared/ui/modals/SheetModal";
import { useRef } from "react";
import { HhMatchForm } from "./HhMatchForm";
import { Button } from "@/shared/ui/shadcn/button";
import HhSvg from '@/assets/sources/hh.ru.svg?rc'
import { cn } from "@/shared/lib/utils";

type TProps = {
  className?: string
  vacancyId: string | number
  vacancyName: string
}
export const AddHhMatches = ({
  className,
  vacancyId,
  vacancyName
}: TProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <SheetModal
      className="overflow-visible w-[min(100%,700px)]"
      renderContent={({ closeSheetModal }) => (
        <HhMatchForm
          ref={formRef}
          vacancyId={vacancyId}
          vacancyName={vacancyName}
          onSuccess={closeSheetModal}
        />

      )}
    >
      {{
        trigger: <Button
          className={cn('[&_svg]:size-6', className)}
        >
          <HhSvg />
          Мэтчи c hh.ru
        </Button>,
        title: 'Фильтры на hh.ru',
        description: 'Фильтры для поиска резюме на hh.ru'
      }}
    </SheetModal>
  );
}