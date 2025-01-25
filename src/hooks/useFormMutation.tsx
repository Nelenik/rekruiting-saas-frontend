import { mutationInitialState } from "@/actions/constants";
import { TMutationState } from "@/actions/types";
import { convertFormData } from "@/lib/utils/convertFormData";
import { TValidationMappedErrors } from "@/shared/helpers";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

type TFormMutationAction = (_: TMutationState, body: FormData) => Promise<TMutationState>

type TOnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export const useFormMutation = (mutationAction: TFormMutationAction) => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    mutationAction,
    mutationInitialState
  );

  const [errors, setErrors] = useState<TValidationMappedErrors>({})

  useEffect(() => {
    if (state.error?.details) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...state.error?.details,
      }));
    }
  }, [state])

  const defaultValues = state.payload ? convertFormData(state.payload) : undefined;

  const success = state.sent && !state.error

  console.log(state)



  const onChange = (e: TOnChangeEvent) => {
    const nameAtr = e.target.name;
    setErrors((prevState) => {
      const updatedErrors = { ...prevState }
      delete updatedErrors[nameAtr]
      return updatedErrors
    });
  }

  return {
    formAction,
    pending,
    defaultValues,
    errors,
    success,
    onChange
  }
}