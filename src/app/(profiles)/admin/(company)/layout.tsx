import Sidebar from "@/components/Asides/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import SettingIcon from '@/assets/icons/time-settings.svg?rc'
import HomeIcon from '@/assets/icons/home.svg?rc'
import VacansyIcon from '@/assets/icons/user-money.svg?rc'
import ReportIcon from '@/assets/icons/file.svg?rc'

const companyNavigation = [
  { routeName: 'В админ панель', href: '/admin', icon: <HomeIcon className="[&>*]:fill-sidebar-foreground" /> },
  { routeName: 'Вакансии', href: '/admin/company/vacancies', icon: <VacansyIcon className="[&>*]:fill-sidebar-foreground" /> },
  { routeName: 'Отчеты', href: '/admin/company/reports', icon: <ReportIcon className="[&>*]:fill-sidebar-foreground" /> },
  { routeName: 'Настройки', href: '/admin/company/settings', icon: <SettingIcon className="[&>*]:fill-sidebar-foreground" /> }
]

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <React.Fragment>
      <Sidebar routes={companyNavigation} />
      <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
        <Breadcrumbs />
        {children}
      </div>
    </React.Fragment>
  );
}

export default CompanyLayout;