import { mutationInitialState } from "@/actions/constants"
import { storeStatus } from "@/actions/postData"
import { updateStatus } from "@/actions/updateData"
import { useFormMutation } from "@/hooks/useFormMutation"
import convertToFormData from "@/lib/utils/convertToFormData"
import { NonNullableFields } from "@/lib/utils/filterFalsyFields"
import { TStatus } from "@/shared/types/statuses"
import { FC, useCallback } from "react"
import { Input } from "../ui/input"
import FormItem from "./form_elmts/FormItem"
import { Button } from "../ui/button"
import { TMutationState } from "@/actions/types"

type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TStatus>
  onSuccess?: (newStatus: TStatus) => void
  onCancel?: () => void
}

const StatusForm: FC<TProps> = (
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


  //define initial state
  const initialState = {
    ...mutationInitialState,
    ...(initialData && { payload: convertToFormData(initialData) })
  }
  //define toast message
  const toastMessage = type === 'edit' ? 'Статус успешно обновлен' : 'Новый статус успешно создан'

  //memoize onSuccess callback to avoid calls exceed
  const memoizedOnSuccess = useCallback((state: TMutationState) => {
    onSuccess(state.payload as TStatus)
  }, [onSuccess])

  const { formAction, pending, defaultValues, errors, onChange } =
    useFormMutation(
      action,
      memoizedOnSuccess,
      initialState,
      toastMessage
    );


  return (
    <form action={formAction} className="p-3 flex flex-col gap-6">
      <FormItem
        labelText="Имя статуса"
        error={errors.name}
      >
        <Input
          placeholder="Имя статуса"
          // required
          pattern="^(?!\s*$).+"
          name="name"
          defaultValue={defaultValues?.name}
          className={errors?.name && 'ring-2 ring-destructive'}
          onChange={onChange}
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
          defaultValue={defaultValues?.color || '#F5F5DC'}
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

export default StatusForm;