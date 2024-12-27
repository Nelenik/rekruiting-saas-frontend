import { getVacancyRecordById } from "@/actions/getData";
import SummaryCard from "@/components/Cards/SummaryCard";
import MatchStatusCol from "@/components/MatchStatusCol";
import { getDaysSinceCreated } from "@/lib/utils/getDaysSinceCreated";
import { ISummaryData, VacancyFull } from "@/types/vacancyTypes";
// import { Suspense } from "react";

const VacancyDetails = async ({ params }: { params: { [key: string]: string } }) => {
  const { vacancyDetails } = params
  const vacancyId = vacancyDetails.split('-')[1]

  //get vacancy record by id
  const vacancy: VacancyFull = await getVacancyRecordById(vacancyId)
  //prepare data for SummaryCard
  const summaryData: ISummaryData = {
    daysInProcessing: getDaysSinceCreated(vacancy.VacCrD),
    salaryOfferFrom: vacancy.VacSalaryFrom,
    salaryOfferTo: vacancy.VacSalaryTo,
    salaryMiddle: vacancy.VacSalaryMarket,
    salaryCandidate: vacancy.VacSalaryCandy,
    candidatesCount: vacancy.MatchCount,
    jobReactions: vacancy.MatchHotCount
  }

  return (
    <div className="flex gap-6 flex-col">
      <SummaryCard vacancyName={vacancy.VacName} summaryData={summaryData} />

      <div className="flex gap-6 w-full overflow-auto pb-2 shadow-inner">
        <div className="flex gap-6 flex-col">
          <MatchStatusCol vacId={vacancy.VacID} status="Контакт" />

        </div>
        <div className="flex gap-6 flex-col">
          <MatchStatusCol vacId={vacancy.VacID} status="Скрининг" />
        </div>
        <div className="flex gap-6 flex-col">
          <MatchStatusCol vacId={vacancy.VacID} status="Собеседование" />
        </div>
        <div className="flex gap-6 flex-col">
          <MatchStatusCol vacId={vacancy.VacID} status="Финал" />
        </div>



      </div>


    </div >
  );
}

export default VacancyDetails;