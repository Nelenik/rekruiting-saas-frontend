import InterceptingModal from '@/components/modals/InterceptingModal';
import Resume from '@/components/pages/Resume';

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
