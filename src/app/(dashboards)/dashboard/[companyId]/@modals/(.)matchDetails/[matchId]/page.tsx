import { MatchDetails } from '@/pages-layer/match-details';
import InterceptingModal from '@/shared/ui/modals/InterceptingModal';

const MatchDetailsModal = async ({ params }: { params: Promise<{ matchId: string }> }) => {
  const { matchId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о кандидате"
    >
      <MatchDetails matchId={Number(matchId)} />
    </InterceptingModal>
  );
};

export default MatchDetailsModal;
