import InterceptingModal from '@/components/Modals/InterceptingModal';
import Resume from '@/components/Pages/Resume';

const ResumeModal = () => {
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <Resume />
    </InterceptingModal>
  );
};

export default ResumeModal;
