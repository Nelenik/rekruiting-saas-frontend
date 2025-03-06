'use client'

import { useCompanies } from "@/providers/CompaniesProvider";
import CaseIcon from '@/assets/icons/case.svg?rc';
import { cn } from "@/lib/utils";

const CompanyOverview = ({ className }: { className?: string }) => {
  const { activeCompany } = useCompanies()

  return (
    <div className={cn('py-4 px-6 rounded-md bg-indigo-100', className)}>
      <h3 className="text-lg font-semibold flex items-center gap-3 mb-4">
        <span className="p-3 rounded-full bg-emerald-500 self-start sm:block hidden">
          <CaseIcon width={20} height={20} className="text-white" />
        </span>
        {activeCompany?.name}
      </h3>
      <p className="text-base text-muted-foreground">
        {activeCompany?.description || ''}
      </p>
    </div>
  );
}

export default CompanyOverview;