import { getCompaniesList, getCompany } from '@/shared/api/actions';
import { cn } from '@/shared/lib/utils';
import { CompaniesProvider } from '@/features/company-switcher/model/CompaniesProvider';
import { ScrollProvider } from '@/shared/providers/ScrollProvider';
// import { Toaster } from '@/shared/ui/shadcn/toaster';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { RekrutaiHeader, RekrutaiSidebar } from '@/widgets/rekrutai-nav';
import type { Metadata } from 'next';
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: 'RekrutAI|Дашборд',
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
  const { companyId } = await params

  const result = await Promise.allSettled([
    await getCompany(companyId),
    await getCompaniesList({})
  ])

  const activeCompany = result[0].status === 'fulfilled' ? result[0].value : null
  const companiesPrefetch = result[1].status === 'fulfilled' ? result[1].value : { data: [], total: 0, currentPage: 1 }

  return (
    <CompaniesProvider activeCompany={activeCompany} companiesPrefetch={companiesPrefetch}>

      <RekrutaiHeader className="md:hidden" />

      <main className="w-full flex h-screen overflow-hidden ">

        <RekrutaiSidebar className="hidden md:flex" />

        <ScrollProvider className="p-6 w-full  h-dvh overflow-y-auto relative bg-secondary " data-id='pageContainer'>
          {/* <div className="p-6 w-full  h-full overflow-y-auto relative" data-id='pageContainer'> */}
          <div className='grid auto-rows-max grid-cols-1 gap-6 @container max-w-[min(100%,1400px)] m-auto pt-[60px] md:pt-0'>

            <div className="bg-card p-5 rounded-md flex justify-between items-center" id="bcrumbs_container">
              <Suspense>
                <Breadcrumbs
                  className={cn(
                    '[&_a:hover]:text-foreground [&_li:last-child]:text-foreground transition-colors duration-300'
                  )}
                />
              </Suspense>
            </div>
            {children}

            {modals}
          </div>
          {/* </div> */}
        </ScrollProvider>

      </main>
      {/* <Toaster /> */}
    </CompaniesProvider>
  );
}
