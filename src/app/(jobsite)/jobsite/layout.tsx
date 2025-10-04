import type { Metadata } from "next";
import { Roboto } from 'next/font/google'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "../../rekru-globals.css";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { Toaster } from "@/shared/ui/shadcn/toaster";
import { Separator } from "@/shared/ui/shadcn/separator";
import { RekruHeader, RekruProfileMenu } from "@/widgets/rekru-nav";

import { Analytics } from "@/widgets/analytics";
import QueryProvider from "@/shared/providers/QueryProvider";
import { getTenant } from "@/app/_actions/getTenant";
import { TenantProvider } from "@/shared/providers/TenantProvider";

import QrSample from '@/assets/qr-sample.png'
import LogoFullImg from '@/assets/logo-short.png'
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { Download } from "lucide-react";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
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
    <html lang="ru" className={`${roboto.variable}`}>
      <body
        className={`font-roboto text-sm antialiased [scrollbar-gutter:stable] bg-background text-foreground`}
      >
        <Analytics />
        <TenantProvider tenant={tenant}>
          <QueryProvider>
            {/* Header */}
            <RekruHeader
            />
            {/* Main content */}
            <main className='@container'>
              {/* <div className="rekru-container"> */}
              {children}
              {/* </div> */}
            </main>
            {/* Footer */}
            <footer className={cn("py-12 bg-sidebar flex flex-col gap-10")}>
              <div className={cn(
                "rekru-container",
                'grid gap-8 grid-cols-4  px-10',
                'sm:grid-cols-6 px-5',
                'md-lg:grid-cols-12'
              )}>
                {/* logo */}
                <div className={cn(
                  "flex flex-col gap-10 ",
                  'col-span-4 px-5',
                  'sm:order-1 sm:col-span-3 sm:px-0',
                  'md-lg:order-1'
                )}>
                  <Link href={'/vacancies'}>
                    <Image
                      src={LogoFullImg}
                      alt="Rekru.ru logo"
                      width={64}
                      height={64}
                      className="w-16 self-center"
                    />
                  </Link>
                  <div className="flex flex-col gap-5 ">
                    <h2 className="heading-footer">Мобильное приложение</h2>
                    <RekruCTA
                      view="dark"
                      className="md:hidden"
                    >
                      <Download />
                      Установить на телефон
                    </RekruCTA>
                    <Image
                      src={QrSample}
                      alt="QR code"
                      width={160}
                      height={160}
                      className="w-40 aspect-square hidden md:block"
                    />
                  </div>
                </div>
                <Separator className={cn(
                  "w-[calc(100%_-_40px)] h-px bg-[#394d71] ",
                  'col-span-4 order-2 justify-self-center',
                  'sm:order-3 sm:col-span-3',
                  'md-lg:hidden'
                )} />

                {/* about rekru */}
                <div className={cn(
                  'col-span-4 order-5 px-5',
                  'sm:order-5 sm:col-span-3 sm:px-0',
                  'md-lg:order-2'
                )}>
                  <h2 className="heading-footer mb-5">
                    Rekru
                  </h2>
                  <ul className={cn('flex flex-col gap-4',
                    "text-sm font-semibold text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/pages/about'}>О компании</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/team'}>Команда</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/vacancies'}>Наши вакансии</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/partners'}>Партнерам</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/investors'}>Инвесторам</Link>
                    </li>
                    <li>
                      <a className="link-footer" href="https://rekrutai.ru/">Rekrutai</a>
                    </li>
                    <li>
                      <Link className="link-footer" href="/pages/news">Новости</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href="/pages/bot">Наши боты</Link>
                    </li>
                  </ul>
                </div>

                {/* for employers and candidates */}
                <div className={cn(
                  'col-span-4 order-7 px-5',
                  'sm:order-6 sm:col-span-3 sm:px-0',
                  'md-lg:order-3'
                )}>
                  <h2 className="heading-footer mb-5">
                    Соискателям
                  </h2>
                  <ul className={cn('flex flex-col gap-4 mb-10',
                    "text-sm font-semibold text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/vacancies'}>Вакансии</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/companies'}>Компании</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/help'}>Помощь</Link>
                    </li>

                  </ul>

                  <h2 className="heading-footer mb-5">
                    Работодателям
                  </h2>
                  <ul className={cn('flex flex-col gap-4',
                    "text-sm font-semibold text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/pages/jobposting'}>Размещение вакансий</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/advertising'}>Реклама на сайте</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/requirements'}>Требования к ПО</Link>
                    </li>
                    <li>
                      <a className="link-footer" href={'!#'}>Rekru API</a>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages/help'}>Помощь</Link>
                    </li>
                  </ul>
                </div>

                <Separator className={cn(
                  "w-[calc(100%_-_40px)] h-px bg-[#394d71] ",
                  'col-span-4 order-8 justify-self-center',
                  'sm:hidden'
                )} />

                {/* profile */}
                <RekruProfileMenu
                  className={cn(
                    " text-sidebar-foreground",
                    'col-span-4 order-3 px-5',
                    'sm:order-2 sm:col-span-3 sm:px-0',
                    'md-lg:order-4'
                  )}
                />
                <Separator className={cn(
                  "w-[calc(100%_-_40px)] h-px bg-[#394d71] ",
                  'col-span-4 order-4 justify-self-center',
                  'sm:order-4 sm:col-span-3',
                  'md-lg:hidden'
                )} />
              </div>
              <Separator className="rekru-container h-px bg-[#394d71] hidden sm:block" />
              <div className={cn(
                "rekru-container flex flex-col gap-8 items-center",
                'md:flex-row'
              )}>
                <div className="w-1/2">
                  <h2 className="heading-footer mb-5" >Социальные сети и боты</h2>
                  <ul className="flex items-center gap-6">
                    <li >
                      <a href="!#" aria-label="Linkedin link">
                        <Image
                          src="/assets/socials/linkedin.webp"
                          alt="LinkedIn icon"
                          width={40}
                          height={40}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="!#" aria-label="WhatsApp link">
                        <Image
                          src='/assets/socials/whatsapp.webp'
                          alt="WhatsApp icon"
                          width={40}
                          height={40}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="!#" aria-label="Telegram link">
                        <Image
                          src='/assets/socials/telegram.webp'
                          alt="Telegram icon"
                          width={40}
                          height={40}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="!#" aria-label="Github link">
                        <Image
                          src='/assets/socials/github.webp'
                          alt="Github icon"
                          width={40}
                          height={40}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="!#" aria-label="Discord link">
                        <Image
                          src='/assets/socials/discord.webp'
                          alt="Discord icon"
                          width={40}
                          height={40}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <Separator className="w-[calc(100%_-_40px)] h-px bg-[#394d71] md:hidden" />
                <p className="w-1/2 text-xs text-sidebar-foreground leading-5">
                  На информационном ресурсе rekru.ru <span className="underline">применяются рекомендательные технологии</span> (информационные технологии предоставления информации на основе сбора, систематизации и анализа сведений, относящихся к предпочтениям пользователей сети «Интернет», находящихся на территории Российской Федерации)
                </p>
              </div>
            </footer>
          </QueryProvider>
        </TenantProvider>
        <Toaster />

      </body>
    </html>
  );
}
