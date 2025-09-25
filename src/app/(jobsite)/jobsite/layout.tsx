import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../../rekru-globals.css";

import { Toaster } from "@/shared/ui/shadcn/toaster";
import { JobsiteHeader } from "@/widgets/jobsite-nav";
import QueryProvider from "@/shared/providers/QueryProvider";
import { getTenant } from "@/app/_actions/getTenant";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { JobsiteFooter } from "@/widgets/jobsite-footer";

import { cn } from "@/shared/lib/utils";
import { TenantProvider } from "@/shared/providers/TenantProvider";
import { NavigationConfigProvider } from "@/widgets/jobsite-nav/model/NavigationConfigProvider";

import { Analytics } from "@/widgets/analytics";

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Rekru.ru - доска вакансий",
  description: "Новый подход к поиску вакансий. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора вакансий. Теперь вы можете найти работу мечты в короткие сроки.",
};

export default async function JobSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tenant = await getTenant()

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body
        className={`font-inter text-sm antialiased [scrollbar-gutter:stable]`}
      >
        <Analytics />
        <TenantProvider tenant={tenant}>
          <QueryProvider>
            {/* Header */}
            <NavigationConfigProvider>
              <JobsiteHeader
                className="mb-6"
              />
            </NavigationConfigProvider>
            {/* Breadcrumbs */}
            <div className="rekru-container">
              <div className="flex justify-between items-center p-5 rounded-md bg-card">

                <Breadcrumbs
                  className={cn(
                    "[&_li:not(:last-child)]:text-foreground [&_a:hover]:text-muted-foreground transition-colors delay-300"
                  )}
                />
              </div>
            </div>
            {/* Main content */}
            <main className='@container py-12'>
              <div className="rekru-container">
                {children}
              </div>
            </main>
            {/* Footer */}
            <JobsiteFooter />
          </QueryProvider>
        </TenantProvider>
        <Toaster />

      </body>
    </html>
  );
}
