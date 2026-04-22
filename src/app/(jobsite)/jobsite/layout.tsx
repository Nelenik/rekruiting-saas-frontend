import type { Metadata } from "next";
import { Roboto } from 'next/font/google'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "../../rekru.css";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { Toaster } from "@/shared/ui/shadcn/toaster";
import { Separator } from "@/shared/ui/shadcn/separator";
import { RekruHeader } from "@/widgets/rekru-nav";

import { Analytics } from "@/widgets/analytics";
import QueryProvider from "@/shared/providers/QueryProvider";
import { getTenant } from "@/app/_actions/getTenant";
import { TenantProvider } from "@/shared/providers/TenantProvider";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Vacancies vitrine",
  description: "A new approach to finding jobs. Using advanced AI technologies, we automate the process of finding and selecting vacancies. Now you can find your dream job quickly.",
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
        className={`font-roboto text-base antialiased [scrollbar-gutter:stable] bg-background text-foreground`}
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
            <footer className={cn("py-12 bg-accent2 flex flex-col gap-10")}>
              <div className={cn(
                "rekru-container",
                'grid gap-x-8 gap-y-10 grid-cols-4  px-10',
                'sm:grid-cols-6 px-5',
                'md-lg:grid-cols-12'
              )}>

                {/* about rekru */}
                <div className={cn(
                  'col-span-2 sm:col-span-3'
                )}>
                  <h2 className="heading-footer mb-4">
                    Rekru
                  </h2>
                  <ul className={cn('flex flex-col gap-2',
                    "text-base text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/pages'}>About</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Team</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/vacancies'}>Our Vacancies</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>For Partners</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>For Investors</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href="/pages">News</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href="/pages">Our Bots</Link>
                    </li>
                  </ul>
                </div>

                {/* for employers and candidates */}
                <div className={cn(
                  'col-span-2 sm:col-span-3'
                )}>
                  <h2 className="heading-footer mb-4">
                    For Employers
                  </h2>
                  <ul className={cn('flex flex-col gap-2',
                    "text-base text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Job Posting</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Advertising on the site</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Software Requirements</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Help</Link>
                    </li>
                  </ul>
                </div>
                <div className={cn(
                  'col-span-2 sm:col-span-3'
                )}>
                  <h2 className="heading-footer mb-4">
                    For Candidates
                  </h2>
                  <ul className={cn('flex flex-col gap-2 mb-10',
                    "text-base text-sidebar-foreground")}>
                    <li>
                      <Link className="link-footer" href={'/vacancies'}>Vacancies</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/companies'}>Companies</Link>
                    </li>
                    <li>
                      <Link className="link-footer" href={'/pages'}>Help</Link>
                    </li>

                  </ul>
                </div>

              </div>

              <Separator className="rekru-container h-px bg-[#394d71] hidden sm:block" />

              <div className={cn(
                "rekru-container flex flex-col gap-8 items-center",
                'md:flex-row'
              )}>
                <div className="w-1/2">
                  <h2 className="heading-footer mb-5" >Social Networks and Bots</h2>
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
                  On the information resource rekru.ru <span className="underline">recommendation technologies are applied</span> (information technologies for providing information based on the collection, systematization, and analysis of data related to the preferences of Internet users located in the territory of the Russian Federation)
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
