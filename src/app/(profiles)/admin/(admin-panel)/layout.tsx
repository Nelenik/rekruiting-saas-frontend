import Sidebar from "@/components/Asides/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Building2 } from "lucide-react";
import SettingIcon from '@/assets/icons/time-settings.svg?rc'
import HomeIcon from '@/assets/icons/home.svg?rc'
import React from "react";

const adminNavigation = [
  { routeName: 'Главная', href: '/admin', icon: <HomeIcon className="[&>*]:fill-sidebar-foreground" /> },
  { routeName: 'Компании', href: '/admin/companies', icon: <Building2 className="[&>*]:stroke-sidebar-foreground" /> },
  { routeName: 'Настройки', href: '/admin/settings', icon: <SettingIcon className="[&>*]:fill-sidebar-foreground" /> }
]

const AdmiLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Sidebar routes={adminNavigation} />
      <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
        <Breadcrumbs />
        {children}
      </div>
    </React.Fragment>
  );
}

export default AdmiLayout;