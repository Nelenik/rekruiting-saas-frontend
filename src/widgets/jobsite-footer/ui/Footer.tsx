import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/shared/ui/shadcn/separator";

import QrSample from '@/assets/qr-sample.png'
import LogoFullImg from '@/assets/logo-short.png'
import LinkedInImg from '@/assets/socials/linkedin.png'
import WhatsAppImg from '@/assets/socials/whatsapp.png'
import TelegramImg from "@/assets/socials/telegram.png"
import GitHubImg from '@/assets/socials/github.png'
import DiscordImg from '@/assets/socials/discord.png'


type TProps = {
  className?: string;
}
export const Footer = ({ className }: TProps) => {
  return (
    <footer className={cn("py-12 bg-sidebar flex flex-col gap-10", className)}>
      <div className={cn("rekru-container", "flex gap-8 ")}>
        <div className="flex flex-col gap-10 w-1/4">
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
            <Image
              src={QrSample}
              alt="QR code"
              width={160}
              height={160}
              className="w-40 aspect-square"
            />
          </div>
        </div>
        {/* about rekru */}
        <div className="w-1/4">
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
        <div className="w-1/4">
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
        {/* profile */}
        <div className="w-1/4">

        </div>
      </div>
      <Separator className="rekru-container h-px bg-[#394d71]" />
      <div className="rekru-container flex gap-8 items-center">
        <div className="w-1/2">
          <h2 className="heading-footer mb-5" >Социальные сети и боты</h2>
          <ul className="flex items-center gap-6">
            <li >
              <a href="!#" aria-label="Linkedin link">
                <Image
                  src={LinkedInImg}
                  alt="LinkedIn icon"
                  width={40}
                  height={40}
                />
              </a>
            </li>
            <li>
              <a href="!#" aria-label="WhatsApp link">
                <Image
                  src={WhatsAppImg}
                  alt="WhatsApp icon"
                  width={40}
                  height={40}
                />
              </a>
            </li>
            <li>
              <a href="!#" aria-label="Telegram link">
                <Image
                  src={TelegramImg}
                  alt="Telegram icon"
                  width={40}
                  height={40}
                />
              </a>
            </li>
            <li>
              <a href="!#" aria-label="Github link">
                <Image
                  src={GitHubImg}
                  alt="Github icon"
                  width={40}
                  height={40}
                />
              </a>
            </li>
            <li>
              <a href="!#" aria-label="Discord link">
                <Image
                  src={DiscordImg}
                  alt="Discord icon"
                  width={40}
                  height={40}
                />
              </a>
            </li>
          </ul>
        </div>
        <p className="w-1/2 text-xs text-sidebar-foreground leading-5">
          На информационном ресурсе rekru.ru <span className="underline">применяются рекомендательные технологии</span> (информационные технологии предоставления информации на основе сбора, систематизации и анализа сведений, относящихся к предпочтениям пользователей сети «Интернет», находящихся на территории Российской Федерации)
        </p>
      </div>
    </footer>
  );
}