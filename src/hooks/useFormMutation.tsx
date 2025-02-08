import { mutationInitialState } from "@/actions/constants";
import { TMutationState } from "@/actions/types";
import { convertFormData } from "@/lib/utils/convertFormData";
import { TValidationMappedErrors } from "@/shared/helpers";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { useToast } from "./use-toast";

type TFormMutationAction = (_: TMutationState, body: FormData) => Promise<TMutationState>

type TOnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

export const useFormMutation = (mutationAction: TFormMutationAction, onSucces: () => void = () => { }, initialState: TMutationState = mutationInitialState, toastMessage: string) => {

  const { toast } = useToast();

  // define action state
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    mutationAction,
    initialState
  );

  //handle errors
  const [errors, setErrors] = useState<TValidationMappedErrors>({})
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (state.error?.details) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...state.error?.details,
      }));
    }

  }, [state.error])

  //handle successful or not submit
  useEffect(() => {
    if (state.sent && !state.error) {
      onSucces()
      toast({
        description: toastMessage,
      });
      setIsSuccess(true);
    } else if (state.sent && state.error) {
      toast({
        variant: 'destructive',
        description: state.error?.message
      })
    }
    return () => setIsSuccess(false)
  }, [state.sent, state.error, toastMessage, onSucces])

  const defaultValues = state.payload ? convertFormData(state.payload) : undefined;

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