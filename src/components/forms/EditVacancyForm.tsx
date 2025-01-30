import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import VacancyForm from "./VacancyForm";
import { updateVacancy } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";

interface IEditVacancyForm {
  closeModal: () => void
  vacancyData: TVacancyData
}

type TVacancyData = {
  id: number;
  name: string;
  position: string;
  responsibilities: string;
  conditions: string,
  employment: string,
  skills: string,
  work_format: string,
  experience: string,
  description: string,
  location: string,
  salary_from: number;
  salary_to: number;
  salary_candy: number;
  salary_market: number;
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