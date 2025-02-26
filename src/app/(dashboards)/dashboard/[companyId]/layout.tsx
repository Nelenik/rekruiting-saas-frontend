import type { Metadata } from 'next';

import Sidebar from '@/components/navigation/Sidebar';
import Header from '@/components/navigation/Header';

import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getCompaniesList, getCompany, getMatchStatuses, getUser } from '@/actions/getData';
import React from 'react';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { CompaniesProvider } from '@/providers/CompaniesProvider';
import { MatchStatusProvider } from '@/providers/MatchStatusProvider';

export const metadata: Metadata = {
  title: 'REkrutAI|Дашборд',
};


export default async function DashboardLayout({
  children,
  modals,
  params
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
  params: Promise<{ companyId: string }>

}>) {
  const userData = await getUser()
  const { companyId } = await params

  const result = await Promise.allSettled([
    await getCompany(companyId),
    await getCompaniesList({})
  ])

  const activeCompany = result[0].status === 'fulfilled' ? result[0].value : null
  const companiesPrefetch = result[1].status === 'fulfilled' ? result[1].value : { data: [], total: 0, currentPage: 1 }

  const matchStatusesPrefetch = await getMatchStatuses()

  return (
    <CompaniesProvider activeCompany={activeCompany} companiesPrefetch={companiesPrefetch}>
      <MatchStatusProvider initialStatuses={matchStatusesPrefetch}>
        <Header userData={userData} className="md:hidden" />

        <main className="w-full flex h-screen overflow-hidden">
          <Sidebar userData={userData} className="hidden md:flex" />

          <div className="p-6 w-full  h-full overflow-y-auto ">
            <div className='grid auto-rows-max grid-cols-1 gap-6 @container max-w-[min(100%,1400px)] m-auto'>

              <div className="bg-card p-5 rounded-md flex justify-between items-center" id="bcrumbs_container">
                <Suspense>
                  <Breadcrumbs />
                </Suspense>
              </div>
              {children}

              {modals}
            </div>
          </div>
        </main>
        <Toaster />
      </MatchStatusProvider>
    </CompaniesProvider>
  );
}
