import { TStatus } from "@/shared/api/types/statuses"
import { NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields"
import FormItem from "@/shared/ui/FormItem"
import { Button } from "@/shared/ui/shadcn/button"
import { Input } from "@/shared/ui/shadcn/input"
import { FC, useCallback } from "react"
import { TMutationState } from "@/shared/api/common/api"
import { storeStatus, updateStatus } from "@/shared/api/actions"
import { useMutateForm } from "@/shared/model/hooks/useMutateForm"

type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TStatus>
  onSuccess?: (newStatus: TStatus) => void
  onCancel?: () => void
}

export const StatusForm: FC<TProps> = (
  {
    type,
    initialData,
    onSuccess = () => { },
    onCancel = () => { }
  }
) => {

  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateStatus.bind(null, initialData.id)
    : storeStatus


  //define toast message
  const toastMessage = type === 'edit' ? 'Статус успешно обновлен' : 'Новый статус успешно создан'

  //memoize onSuccess callback to avoid calls exceed
  const memoizedOnSuccess = useCallback((state: TMutationState) => {
    onSuccess(state.payload as TStatus)
  }, [onSuccess])

  const { formAction, pending, defaultValues, errors, removeError } =
    useMutateForm({
      mutationAction: action,
      onSuccess: memoizedOnSuccess,
      initialData,
      toastMessage
    });


  return (
    <form action={formAction} className="p-3 flex flex-col gap-6">
      <FormItem
        labelText="Имя статуса"
        error={errors.name}
      >
        <Input
          placeholder="Имя статуса"
          title="Только пробельные символы недопустимы"
          required
          pattern="^(?!\s*$).+"
          name="name"
          defaultValue={defaultValues?.name}
          className={errors?.name && 'ring-2 ring-destructive'}
          onChange={(e) => removeError(e.target.name)}
        />
      </FormItem>

      <FormItem
        labelText="Цвет статуса"
        error={errors.color}
      >
        <Input
          // placeholder="Название"
          type="color"
          name="color"
          defaultValue={defaultValues?.color || '#1f00eb'}
          className={errors?.color && 'ring-2 ring-destructive'}
        />
      </FormItem>
      <input type="hidden" name="rank" defaultValue={defaultValues?.rank || 0} />
      <div className="self-end">
        <Button type="button" variant="ghost" className="mr-2 border border-transparent hover:border-background" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" variant={'outline'} className="bg-transparent border-primary/50 hover:bg-primary/70 hover:text-white">
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}

