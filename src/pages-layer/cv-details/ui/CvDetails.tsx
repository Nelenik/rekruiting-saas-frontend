import { CvInfoBlock } from "@/entities/cv/ui/CvInfoBlock";
import { WorkExperienceList } from "@/entities/experience";
import { getResumeById } from "@/shared/api/getData";
import { cn } from "@/shared/lib/utils";
import { CollapsibleSummary } from "@/shared/ui/Summary";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

const tabsDict = [
  { value: 'description', text: 'Описание' },
  { value: 'matches', text: 'Мэтчи' },
  { value: 'comments', text: 'Комментарии' },
  { value: 'history', text: 'История' },

]

export const CvDetails = async ({ cvId }: { cvId: number }) => {
  const cv = await getResumeById(cvId)
  return (
    <div>
      <h2 className="typography-h2 first:mt-0 mb-2">
        {cv.candy_name || 'Имя не указано'}
      </h2>
      <h3 className="scroll-m-20 text-lg font-semibold  tracking-tight mb-6 ">
        {cv.name || 'Роль не известна'}
      </h3>
      <Tabs defaultValue="description" className="w-full ">
        <TabsList className="w-full justify-start gap-3.5 bg-transparent p-0 mb-6 flex-wrap min-h-10 h-[unset]">
          {tabsDict.map(({ value, text }) => (
            <TabsTrigger value={value} className="bg-[#e1e8ff]" key={value}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="description" className="m-0">
          <div
            className={cn(
              "flex flex-col gap-6 ",
              "md:grid md:grid-cols-[35%_1fr] md:gap-x-6 md:gap-y-6",)}
          >
            <CollapsibleSummary
              title="Саммори по резюме"
              summary={cv.summary}
              defaultOpen={true}
              className="md:col-span-2 italic  ring-1 rounded-md  p-4"
            />
            <CvInfoBlock
              // role={cv.name}
              work_status={cv.status}
              location={cv.candy_location}
              phone={cv.candy_phone}
              email={cv.candy_email}
              link={cv.link}
              bio={cv.bio}
              experience_duration={cv.experience_months}
              skills={null}
              className="shrink-0"
            />
            <div className="grow @container">
              <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mb-6">
                Опыт работы
              </h2>
              {
                cv.workExperiences
                  ? <WorkExperienceList experience={cv.workExperiences} />
                  : <TextFormatter text={cv.experience_raw || 'Данные об опыте отсутствуют'} />
              }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matches">Мэтчи, coming soon...</TabsContent>
        <TabsContent value="comments">Комментарии, coming soon...</TabsContent>
        <TabsContent value="history">История, coming soon...</TabsContent>
      </Tabs>
    </div>
  );
}
