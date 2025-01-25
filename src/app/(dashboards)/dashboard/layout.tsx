import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Building2 } from 'lucide-react';

import Sidebar from '@/components/NavBlocks/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import SettingIcon from '@/assets/icons/time-settings.svg?rc';
import HomeIcon from '@/assets/icons/home.svg?rc';
import ReportIcon from '@/assets/icons/file.svg?rc';
import { IDashboardRoute } from '@/types/types';
import Header from '@/components/NavBlocks/Header';

import Providers from '../../providers';

import '../../globals.css';
import { Suspense } from 'react';

const geistSans = localFont({
  src: '../../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'REkrutAI|Дашборд',
};

const adminNavigation: IDashboardRoute[] = [
  {
    routeName: 'Главная',
    href: '/dashboard',
    icon: <HomeIcon className="[&>*]:fill-sidebar-foreground" />,
  },
  {
    routeName: 'Вакансии',
    href: '/dashboard/vacancies',
    icon: <Building2 className="[&>*]:stroke-sidebar-foreground" />,
  },
  {
    routeName: 'Отчеты',
    href: '/dashboard/reports',
    icon: <ReportIcon className="[&>*]:stroke-sidebar-foreground" />,
  },
  {
    routeName: 'Настройки',
    href: '/dashboard/settings',
    icon: <SettingIcon className="[&>*]:fill-sidebar-foreground" />,
  },
];

export default function ProfileLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <Header routes={adminNavigation} className="sm:hidden" />

          <main className="w-full flex h-screen overflow-hidden">
            <Sidebar routes={adminNavigation} className="hidden sm:flex" />

            <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
              <Suspense>
                <Breadcrumbs />
              </Suspense>

              {children}

              {modals}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
