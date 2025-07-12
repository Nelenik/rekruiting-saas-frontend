// import type { Metadata } from "next";
// import "../globals.css";
// import { Toaster } from "@/shared/ui/shadcn/toaster";

// export const metadata: Metadata = {
//   title: "RekrutAI - AI рекрутинг",
//   description: "Новый подход к подбору персонала. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора кандидатов. Теперь вы можете найти идеального сотрудника всего за несколько часов.",
// };

// export default async function RekrutaiLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <>
//       {children}
//       <Toaster />
//     </>
//   );
// }

import localFont from "next/font/local";
import "../../globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/shared/ui/shadcn/toaster";
import { TenantProvider } from "@/shared/providers/TenantProvider";
import { getTenant } from "@/app/_actions/getTenant";

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
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TenantProvider tenant={tenant}>

          {children}
        </TenantProvider>
        <Toaster />
      </body>
    </html>
  );
}

