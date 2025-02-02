import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import VacancyForm from "./VacancyForm";
import { updateVacancy } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";
import { TVacancy } from "@/shared/types";
import { NonNullableFields } from "@/lib/utils/filterFalsyFields";

interface IEditVacancyForm {
  closeModal: () => void
  initialData: NonNullableFields<TVacancy>
}

const EditVacancyForm = ({ closeModal, initialData }: IEditVacancyForm) => {
  const { toast } = useToast()
  const actionWithId = updateVacancy.bind(null, initialData.id)

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно обновлена',
    });
  }, [closeModal, toast]);

  return (
    <VacancyForm
      action={actionWithId}
      handleSuccess={handleSuccess}
      initialState={{
        ...mutationInitialState,
        payload: convertToFormData(initialData)
      }}
    />
  );
}

export default EditVacancyForm;