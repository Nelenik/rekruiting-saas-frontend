import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { mutationInitialState } from "@/shared/api/constants";
import { TValidationMappedErrors } from "@/shared/api/common/errors";
// import { parseFormData } from "@/shared/lib/object_manipulations/parseFormData";
import { TMutationState } from "@/shared/api/common/apiLayer";
// import { TMutationState } from "@/shared/api/common/mutate";

type TFormMutationAction = (_: TMutationState, data: FormData) => Promise<TMutationState>

type TOnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

type TFromMutationOptions = {
  mutationAction: TFormMutationAction,
  onSuccess?: (state: TMutationState) => void,
  initialState?: TMutationState,
  toastMessage?: string | null
}

export const useFormMutation = (
  {
    mutationAction,
    onSuccess = () => { },
    initialState = mutationInitialState,
    toastMessage = null
  }: TFromMutationOptions
) => {

  const { toast } = useToast();

  // define action state
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
      // setIsSuccess(false);
    } else if (state.sent && state.error === null) {
      if (toastMessage) {
        toast({ description: toastMessage });
      }
      setIsSuccess(true);
    }

  }, [state.error, state.sent, toast, toastMessage])

  useEffect(() => {
    if (isSuccess) {
      onSuccess(state)
    }
  }, [state, onSuccess, isSuccess])


  // const defaultValues = state.payload && state.payload instanceof FormData
  //   ? parseFormData<Record<string, string>>(state.payload)
  //   : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultValues = state.payload ? (state.payload as Record<string, any>) : undefined

  //Removes the error from the errors object when the user starts entering data.
  const onChange = (e: TOnChangeEvent) => {
    const nameAtr = e.target.name;
    if (!errors.hasOwnProperty(nameAtr)) {
      return
    }
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
    success: isSuccess,
    onChange
  }
}