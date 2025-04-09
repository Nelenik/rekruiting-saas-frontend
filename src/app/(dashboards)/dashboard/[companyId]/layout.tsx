import { getCompaniesList, getCompany, getStatuses, getUser } from '@/shared/api/getData';
import { AppStatusesProvider } from '@/shared/providers/AppStatusesProvider';
import { CompaniesProvider } from '@/shared/providers/CompaniesProvider';
import { ScrollProvider } from '@/shared/providers/ScrollProvider';
import { Toaster } from '@/shared/ui/shadcn/toaster';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import type { Metadata } from 'next';
import { Suspense } from 'react';


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

  //All available statuses in the application
  const appAllStatuses = await getStatuses()

  return (
    <CompaniesProvider activeCompany={activeCompany} companiesPrefetch={companiesPrefetch}>
      <AppStatusesProvider initialStatuses={appAllStatuses}>
        <Header userData={userData} className="md:hidden" />

        <main className="w-full flex h-screen overflow-hidden">
          <Sidebar userData={userData} className="hidden md:flex" />
          <ScrollProvider className="p-6 w-full  h-full overflow-y-auto relative" data-id='pageContainer'>
            {/* <div className="p-6 w-full  h-full overflow-y-auto relative" data-id='pageContainer'> */}
            <div className='grid auto-rows-max grid-cols-1 gap-6 @container max-w-[min(100%,1400px)] m-auto'>

              <div className="bg-card p-5 rounded-md flex justify-between items-center" id="bcrumbs_container">
                <Suspense>
                  <Breadcrumbs />
                </Suspense>
              </div>
              {children}

              {modals}
            </div>
            {/* </div> */}
          </ScrollProvider>

        </main>
        <Toaster />
      </AppStatusesProvider>
    </CompaniesProvider>
  );
}
