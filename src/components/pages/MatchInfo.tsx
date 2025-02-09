import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCandidateFull } from "@/actions/getData";
import CandyInfo from "../CandyInfo";
import CandyMatch from "../CandyMatch";
import CandyComments from "../CandyComments";

const tabsDict = [
  { value: 'match', text: 'Мэтч' },
  { value: 'experience', text: 'Опыт' },
  { value: 'screening', text: 'Скрининг' },
  { value: 'interview', text: 'Собеседование' },
  { value: 'raport', text: 'Отчет' },
  { value: 'similar', text: 'Похожие' },

]

const MatchInfo = async ({ matchId }: { matchId: number }) => {
  const match = await getCandidateFull(matchId)
  console.log(match)

  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Иванов Иван Иванович
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
          {/* <Match candidate={candidateMatchInfo} /> */}
          <div className="grid grid-cols-1 auto-rows-auto @3xl:grid-cols-3 gap-x-6 gap-y-10">
            <CandyInfo
              role={match.cv.role}
              work_status={match.cv.status}
              location={match.cv.location}
              phone={match.cv.phone}
              email={match.cv.email}
              link={match.cv.link}
              bio={match.cv.bio}
              total_experience={match.cv.total_experience}
              last_experience={match.cv.last_experience}
              skills={match.cv.skills}
            />
            <CandyMatch
              type={match.type}
              match_status={match.match_status}
              match_point={match.match_point}
              match_summary={match.match_summary}
              cv_summary={match.cv.summary}
            />
            <CandyComments comments={match.comments} />
          </div>
        </TabsContent>

        {/* <TabsContent value="experience">Experience, coming soon...</TabsContent>
        <TabsContent value="screening">Скрининг, coming soon...</TabsContent>
        <TabsContent value="interview">Собеседование, coming soon...</TabsContent>
        <TabsContent value="raport">Отчет, coming soon...</TabsContent>
        <TabsContent value="similar">Похожие, coming soon...</TabsContent> */}
      </Tabs>
    </div>
  );
}

export default MatchInfo;