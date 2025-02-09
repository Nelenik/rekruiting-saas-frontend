import InterceptingModal from '@/components/modals/InterceptingModal';
import MatchInfo from '@/components/pages/MatchInfo';
import Resume from '@/components/pages/Resume';

const ResumeModal = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchInfo matchId={Number(candidateId)} />
    </InterceptingModal>
  );
};

export default ResumeModal;
