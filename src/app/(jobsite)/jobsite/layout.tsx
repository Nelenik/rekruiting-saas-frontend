import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import { Toaster } from "@/shared/ui/shadcn/toaster";
import { JobsiteHeader } from "@/widgets/jobsite-nav";
import QueryProvider from "@/shared/providers/QueryProvider";
import { getTenant } from "@/app/_actions/getTenant";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { cn } from "@/shared/lib/utils";
import { TenantProvider } from "@/shared/providers/TenantProvider";
import { NavigationConfigProvider } from "@/widgets/jobsite-nav/model/NavigationConfigProvider";

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
  title: "Rekru.ru - доска вакансий",
  description: "Новый подход к поиску вакансий. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора вакансий. Теперь вы можете найти работу мечты в короткие сроки.",
  robots: {
    index: false,
    follow: false,
  }

};

export default async function JobSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tenant = await getTenant()

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TenantProvider tenant={tenant}>
          <QueryProvider>
            {/* Header */}
            <NavigationConfigProvider>
              <JobsiteHeader
                className="mb-6"
              />
            </NavigationConfigProvider>
            {/* Breadcrumbs */}
            <div className="jobsite-container">
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
              <div className="jobsite-container">
                {children}
              </div>
            </main>
          </QueryProvider>
        </TenantProvider>
        <Toaster />
      </body>
    </html>
  );
}
