import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/shared/ui/shadcn/toaster";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "REkrutAI - AI рекрутинг",
  description: "Новый подход к подбору персонала. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора кандидатов. Теперь вы можете найти идеального сотрудника всего за несколько часов.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {children}
        <Toaster />
      </body>
    </html>
  );
}
