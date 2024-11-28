import CandidateCard from "@/components/Cards/CandidateCard";
import FunnelCard from "@/components/Cards/FunnelCard";
import SummaryCard from "@/components/Cards/SummaryCard";
import Link from "next/link";

const VacancyDetails = () => {
  return (
    <div className="flex gap-6 flex-col">
      <SummaryCard vacancyName="менеджер по продажам" summaryData={
        { daysInProcessing: 15, salaryOffer: 75000, salaryMiddle: 68370, salaryQueries: 80000, candidatesCount: 18, jobReactions: 90 }
      } />

      <div className="flex gap-6 w-full overflow-auto pb-2 shadow-inner">
        <div className="flex gap-6 flex-col">
          <FunnelCard name="Контакты" count={125} />
          <ul className="[&>li:not(:last-child)]:mb-2">
            <li>
              <Link href={`/dashboard/resume/123`}>
                <CandidateCard
                  name="Silvia Rotaru"
                  city="Moskow"
                  salary={120000}
                  rating={8}
                />
              </Link>

            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
          </ul>
        </div>
        <div className="flex gap-6 flex-col">
          <FunnelCard name="Скрининг" count={26} />
          <ul className="[&>li:not(:last-child)]:mb-2">
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
          </ul>
        </div>
        <div className="flex gap-6 flex-col">
          <FunnelCard name="Собеседования" count={8} />
          <ul className="[&>li:not(:last-child)]:mb-2">
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
          </ul>
        </div>
        <div className="flex gap-6 flex-col">
          <FunnelCard name="Финалисты" count={3} />
          <ul className="[&>li:not(:last-child)]:mb-1.5">
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
            <li>
              <CandidateCard
                name="Silvia Rotaru"
                city="Moskow"
                salary={120000}
                rating={8}
              />
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
}

export default VacancyDetails;