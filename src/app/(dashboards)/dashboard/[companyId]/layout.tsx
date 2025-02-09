import type { Metadata } from 'next';

import Sidebar from '@/components/navigation/Sidebar';
import Header from '@/components/navigation/Header';

import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getCompaniesList, getUser } from '@/actions/getData';
import React from 'react';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { CompaniesProvider } from '@/providers/CompaniesProvider';

export const metadata: Metadata = {
  title: 'REkrutAI|Дашборд',
};


export default async function DashboardLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  const userData = await getUser()

  const companies = await getCompaniesList({})
  return (
    <CompaniesProvider companiesList={companies}>
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
    </CompaniesProvider>
  );
}
