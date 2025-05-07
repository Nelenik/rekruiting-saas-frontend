import { getCandidateFull } from "@/shared/api/getData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";
import { MatchTab } from "./MatchTab";
import { ExperienceTab } from "./ExperienceTab";

const tabsDict = [
  { value: 'match', text: 'Мэтч' },
  { value: 'experience', text: 'Опыт' },
  { value: 'screening', text: 'Скрининг' },
  { value: 'interview', text: 'Собеседование' },
  { value: 'raport', text: 'Отчет' },
  { value: 'similar', text: 'Похожие' },

]

export const MatchDetails = async ({ matchId }: { matchId: number }) => {

  const candidate = await getCandidateFull(matchId)

  return (
    <div>
      <h2 className="typography-h2 first:mt-0 mb-6">
        {candidate.cv.candy_name || 'Имя не указано'}
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
          <MatchTab candidate={candidate} matchId={matchId} />
        </TabsContent>

        <TabsContent value="experience" className="@container">
          <ExperienceTab
            workExperiences={candidate.cv.workExperiences}
            experience_raw={candidate.cv.experience_raw}
          />
        </TabsContent>

        <TabsContent value="screening">Скрининг, coming soon...</TabsContent>
        <TabsContent value="interview">Собеседование, coming soon...</TabsContent>
        <TabsContent value="raport">Отчет, coming soon...</TabsContent>
        <TabsContent value="similar">Похожие, coming soon...</TabsContent>
      </Tabs>
    </div>
  );
}
