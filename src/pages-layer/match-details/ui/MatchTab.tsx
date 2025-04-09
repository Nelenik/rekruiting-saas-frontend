import { CvInfoBlock } from "@/entities/cv/ui/CvInfoBlock";
import { EditableMatchView } from "@/features/editable-matchview/ui/EditableMatchView";
import { TCandidateFull } from "@/shared/api/types";
import { Summary } from "@/shared/ui/custom/Summary";
import { MatchComments } from "@/widgets/match-comments";

type Props = {
  matchId: number
  candidate: TCandidateFull
}
export const MatchTab = ({
  matchId,
  candidate
}: Props) => {
  const { cv, vacancy, type, point, summary, status } = candidate

  const matchStatuses: Pick<TCandidateFull["status"], 'id' | 'name'>[] = (vacancy.matchStatuses).map(({ status }) => ({ id: status.id, name: status.name }))

  return (
    <div className="grid grid-cols-1 auto-rows-auto @3xl:grid-cols-[35%_30%_1fr] gap-x-6 gap-y-10">
      <CvInfoBlock
        role={cv.name}
        work_status={cv.status}
        location={cv.candy_location}
        phone={cv.candy_phone}
        email={cv.candy_email}
        link={cv.link}
        bio={cv.bio}
        experience_duration={cv.experience_months}
        skills={null}
      />

      <div className=" flex flex-col gap-6">
        <EditableMatchView
          matchId={matchId}
          type={type}
          statusData={status}
          match_statuses={matchStatuses}
          match_point={point}
        />
        <Summary
          title="Саммори по мэтчу"
          className="min-h-40"
          summary={summary}
        />

        <Summary
          title="Саммори по резюме"
          className="min-h-40"
          summary={cv.summary}
        />
      </div>
      <MatchComments matchId={matchId} />
    </div>

  );
}