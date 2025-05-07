'use client'

import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { addMatches } from "../api/addMatches";
import { cn } from "@/shared/lib/utils";
import { useFormMutation } from "@/shared/model/hooks/useFormMutation";
import { RefreshCw } from "lucide-react";

type TProps = {
  className?: string,
  buttonProps?: ButtonProps
  vacancyId: number | string
}
export const AddMatchesForm = ({
  className,
  buttonProps,
  vacancyId
}: TProps) => {
  const { className: btnClassName, ...restProps } = buttonProps || {}

  const action = addMatches.bind(null, vacancyId)
  const { formAction, pending } = useFormMutation({ mutationAction: action, toastMessage: 'Создание новых мэтчей запущено' })

  return (
    <form
      action={formAction}
      className={cn(className)}
    >
      <Button
        className={btnClassName}
        {...restProps}
      >
        <RefreshCw className={cn(pending && "animate-spin")} />
        {pending ? 'Обработка...' : 'Добавить мэтчи'}
      </Button>
    </form>
  );
}