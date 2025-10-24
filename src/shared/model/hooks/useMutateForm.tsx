import { TMutationState } from "@/shared/api/common/api"
import { useToast } from "./use-toast";
import { useActionState, useCallback, useEffect, useState } from "react";
import { mutationInitialState } from "@/shared/api/constants";
import { TValidationMappedErrors } from "@/shared/api/common/errors";

type TMutateFormOptions<TPayload> = {
  mutationAction: (_: TMutationState, data: FormData) => Promise<TMutationState>,
  onSuccess?: (state: TMutationState) => void,
  initialData?: TPayload,
  toastMessage?: string | null
}

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
    } else if (!state.sent && state.error?.details) {
      setErrors((prevErrors) => ({ ...prevErrors, ...state.error?.details }))
      setIsSuccess(false)
    }

  }, [state, toast, toastMessage])

  useEffect(() => {
    if (isSuccess) {
      onSuccess(state)
    } else {
      setDefaultValues(state.payload as TPayload | undefined)

    }
  }, [state, onSuccess, isSuccess])

  /**
 * Removes a specific validation error from the `errors` state object.
 * 
 * Typically used to clear the error for a form field when the user starts modifying its value.
 *
 * @param errorName - The key of the error to remove, usually matching the `name` attribute of the form field.
 *
 */
  const removeError = useCallback((errorName: string) => {
    // const nameAtr = e.target.name;
    if (!errors.hasOwnProperty(errorName)) {
      return
    }
    setErrors((prevState) => {
      const updatedErrors = { ...prevState }
      delete updatedErrors[errorName]
      return updatedErrors
    });
  }, [errors])

  return {
    formAction,
    pending,
    defaultValues,
    errors,
    success: isSuccess,
    removeError
  }

}