import { Roboto } from 'next/font/google'
import "../../rekrutai.css";
import type { Metadata } from "next";
import { Toaster } from "@/shared/ui/shadcn/toaster";
import { TenantProvider } from "@/shared/providers/TenantProvider";
import { getTenant } from "@/app/_actions/getTenant";

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Tool for recruiters and HR managers",
  description: "A new approach to recruitment. Using advanced AI technologies, we automate the process of finding and selecting candidates. Now you can find the perfect employee in just a few hours.",
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
    <html lang="ru" className={`${roboto.variable}`}>
      <body
        className={`font-roboto antialiased text-sm`}
      >
        <TenantProvider tenant={tenant}>

          {children}
        </TenantProvider>
        <Toaster />
      </body>
    </html>
  );
}

