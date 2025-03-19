import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCandidateFull } from "@/actions/getData";
import CandyInfo from "./elmts/CandyInfo";
import CandyMatch from "./elmts/CandyMatch";
import CandyComments from "./elmts/CandyComments";
import CandyExperience from "./elmts/CandyExperience";
import { TStatus } from "@/shared/types/statuses";
import TextFormatter from "@/components/shared/TextFormatter";

const tabsDict = [
  { value: 'match', text: 'Мэтч' },
  { value: 'experience', text: 'Опыт' },
  { value: 'screening', text: 'Скрининг' },
  { value: 'interview', text: 'Собеседование' },
  { value: 'raport', text: 'Отчет' },
  { value: 'similar', text: 'Похожие' },

]

const MatchInfo = async ({ matchId }: { matchId: number }) => {
  // const { type, point, status_id, summary, cv } = await getCandidateFull(matchId)
  const { type, point, status, summary, cv, vacancy } = await getCandidateFull(matchId)

  const matchStatuses: Pick<TStatus, 'id' | 'name'>[] = (vacancy.matchStatuses).map(({ status }) => ({ id: status.id, name: status.name }))

  console.log(cv)
  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        {cv.candy_name || 'Имя не указано'}
      </h2>
      <Tabs defaultValue="match" className="w-full ">
        <TabsList className="w-full justify-start gap-3.5 bg-transparent p-0 mb-6 flex-wrap min-h-10 h-[unset]">
          {tabsDict.map(({ value, text }) => (
            <TabsTrigger value={value} className="bg-[#e1e8ff]" key={value}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="match" className="m-0 @container">
          <div className="grid grid-cols-1 auto-rows-auto @3xl:grid-cols-[35%_30%_1fr] gap-x-6 gap-y-10">
            <CandyInfo
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
            <CandyMatch
              matchId={matchId}
              type={type}
              match_statuses={matchStatuses}
              statusData={status}
              match_point={point}
              match_summary={summary}
              cv_summary={cv.summary}
            />
            <CandyComments comments={[]} />
          </div>
        </TabsContent>

        <TabsContent value="experience">
          {
            cv.experience
              ? <CandyExperience experience={cv.experience} />
              : <TextFormatter text={cv.experience_raw} />
          }
        </TabsContent>

        <TabsContent value="screening">Скрининг, coming soon...</TabsContent>
        <TabsContent value="interview">Собеседование, coming soon...</TabsContent>
        <TabsContent value="raport">Отчет, coming soon...</TabsContent>
        <TabsContent value="similar">Похожие, coming soon...</TabsContent>
      </Tabs>
    </div>
  );
}

export default MatchInfo;