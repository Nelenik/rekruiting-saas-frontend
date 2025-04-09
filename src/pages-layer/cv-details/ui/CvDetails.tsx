import { CvInfoBlock } from "@/entities/cv/ui/CvInfoBlock";
import { getResumeById } from "@/shared/api/getData";
import { TextFormatter } from "@/shared/ui/custom/TextFormatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";
import { WorkExperienceList } from "@/widgets/experience-list";

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
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        {cv.candy_name || 'Имя не указано'}
      </h2>
      <Tabs defaultValue="description" className="w-full ">
        <TabsList className="w-full justify-start gap-3.5 bg-transparent p-0 mb-6 flex-wrap min-h-10 h-[unset]">
          {tabsDict.map(({ value, text }) => (
            <TabsTrigger value={value} className="bg-[#e1e8ff]" key={value}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="description" className="m-0">
          <div className="flex flex-col gap-6 md:flex-row">
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
              className="lg:w-1/3 shrink-0"
            />
            <div className="grow @container">
              <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mb-6">
                Опыт работы
              </h2>
              {
                cv.experience
                  ? <WorkExperienceList experience={cv.experience} />
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
