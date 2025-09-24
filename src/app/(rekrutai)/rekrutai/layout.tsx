import { Inter } from 'next/font/google'
import "../../globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/shared/ui/shadcn/toaster";
import { TenantProvider } from "@/shared/providers/TenantProvider";
import { getTenant } from "@/app/_actions/getTenant";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "RekrutAI - AI рекрутинг",
  description: "Новый подход к подбору персонала. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора кандидатов. Теперь вы можете найти идеального сотрудника всего за несколько часов.",
  robots: {
    index: false,
    follow: false,
  }

};

export default async function RekrutaiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Determine current tenat and pass it to TenatProvider
  const tenant = await getTenant()

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body
        className={`font-inter antialiased text-sm`}
      >
        <TenantProvider tenant={tenant}>

          {children}
        </TenantProvider>
        <Toaster />
      </body>
    </html>
  );
}

