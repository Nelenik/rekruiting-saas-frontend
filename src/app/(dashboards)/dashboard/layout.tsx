import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import Providers from "../../providers";
import Sidebar from "@/components/Asides/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Building2 } from "lucide-react";
import SettingIcon from '@/assets/icons/time-settings.svg?rc'
import HomeIcon from '@/assets/icons/home.svg?rc'
import ReportIcon from '@/assets/icons/file.svg?rc'

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "REkrutAI|Dashboard",
};

const adminNavigation = [
  { routeName: 'Главная', href: '/dashboard', icon: <HomeIcon className="[&>*]:fill-sidebar-foreground" /> },
  { routeName: 'Вакансии', href: '/dashboard/vacancies', icon: <Building2 className="[&>*]:stroke-sidebar-foreground" /> },
  { routeName: 'Отчеты', href: '/dashboard/reports', icon: <ReportIcon className="[&>*]:stroke-sidebar-foreground" /> },
  { routeName: 'Настройки', href: '/dashboard/settings', icon: <SettingIcon className="[&>*]:fill-sidebar-foreground" /> }
]

export default function ProfileLayout({
  children,
  modals
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <main className="w-full flex h-screen overflow-hidden">
          <Providers>
            <Sidebar routes={adminNavigation} />
            <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
              <Breadcrumbs />

              {children}
              {modals}
            </div>

          </Providers>

        </main>
      </body>
    </html>
  );
}
