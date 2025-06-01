import { TMutationState } from "@/shared/api/common/api"
import { useToast } from "./use-toast";
import { ChangeEvent, useActionState, useCallback, useEffect, useState } from "react";
import { mutationInitialState } from "@/shared/api/constants";
import { TValidationMappedErrors } from "@/shared/api/common/errors";

type TMutateFormOptions<TPayload> = {
  mutationAction: (_: TMutationState, data: FormData) => Promise<TMutationState>,
  onSuccess?: (state: TMutationState) => void,
  initialData?: TPayload,
  toastMessage?: string | null
}

type TOnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export const useMutateForm = <TPayload,>(
  {
    mutationAction,
    onSuccess = () => { },
    initialData,
    toastMessage = null
  }: TMutateFormOptions<TPayload>
) => {
  const { toast } = useToast();

  const [defaultValues, setDefaultValues] = useState<TPayload | undefined>(initialData)
  useEffect(() => setDefaultValues(initialData), [initialData])

  // define action state
  const initialState: TMutationState<TPayload> = {
    ...mutationInitialState,
    payload: initialData
  };

  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    mutationAction,
    initialState
  );

  //handle errors
  const [errors, setErrors] = useState<TValidationMappedErrors>({})
  const [isSuccess, setIsSuccess] = useState(false)

  //Handle whether the submission is successful or not.
  useEffect(() => {
    if (state.sent && state.error) {
      if (state.error.details) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...state.error?.details,
        }));
      } else {
        toast({ variant: "destructive", description: state.error?.message });
      }
      setIsSuccess(false);
    } else if (state.sent && state.error === null) {
      if (toastMessage) {
        toast({ description: toastMessage });
      }
      setIsSuccess(true);
    }

  }, [state.error, state.sent, toast, toastMessage])

  useEffect(() => {
    if (isSuccess) {
      setDefaultValues(state.payload as TPayload | undefined)
      onSuccess(state)
    }
  }, [state, onSuccess, isSuccess])

  //Removes the error from the errors object when the user starts entering data.
  const onChange = useCallback((e: TOnChangeEvent) => {
    const nameAtr = e.target.name;
    if (!errors.hasOwnProperty(nameAtr)) {
      return
    }
    setErrors((prevState) => {
      const updatedErrors = { ...prevState }
      delete updatedErrors[nameAtr]
      return updatedErrors
    });
  }, [errors])

  return {
    formAction,
    pending,
    defaultValues,
    errors,
    success: isSuccess,
    onChange
  }

}