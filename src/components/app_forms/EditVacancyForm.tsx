import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import VacancyForm from "./VacancyForm";
import { updateVacancy } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";
import { TVacancy } from "@/shared/types";

interface IEditVacancyForm {
  closeModal: () => void
  vacancyData: Pick<TVacancy, "id" |
    "name" |
    "position" |
    "responsibilities" |
    "conditions" |
    "employment" |
    "skills" |
    "work_format" |
    "experience" |
    "description" |
    "location" |
    "salary_from" |
    "salary_to" |
    "salary_candy" |
    "salary_market">
}


const EditVacancyForm = ({ closeModal, vacancyData }: IEditVacancyForm) => {
  const { toast } = useToast()
  const actionWithId = updateVacancy.bind(null, vacancyData.id)

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно обновлена',
    });
  }, [closeModal, toast]);

  return (
    <VacancyForm action={actionWithId} handleSuccess={handleSuccess} initialState={{ ...mutationInitialState, payload: convertToFormData(vacancyData) }} />
  );
}

export default EditVacancyForm;