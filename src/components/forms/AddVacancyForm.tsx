import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import VacancyForm from "./VacancyForm";
import { storeVacancy } from "@/actions/postData";
import { mutationInitialState } from "@/actions/constants";

interface IAddVacancyProps {
  closeModal: () => void
};
const AddVacancyForm = ({ closeModal }: IAddVacancyProps) => {
  const { toast } = useToast()

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно создана',
    });
  }, [closeModal, toast]);

  return (
    <VacancyForm action={storeVacancy} initialState={mutationInitialState} handleSuccess={handleSuccess} />
  );
}

export default AddVacancyForm;