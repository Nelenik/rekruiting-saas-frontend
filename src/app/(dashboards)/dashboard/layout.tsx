import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Sidebar from '@/components/navigation/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/navigation/Header';

import Providers from '../../providers';

import '../../globals.css';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getUser } from '@/actions/getData';

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


export default async function ProfileLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {

  const userData = await getUser()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <Header userData={userData} className="sm:hidden" />

          <main className="w-full flex h-screen overflow-hidden">
            <Sidebar userData={userData} className="hidden sm:flex" />

            <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
              <Suspense>
                <Breadcrumbs />
              </Suspense>

              {children}

              {modals}
            </div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
