import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Providers from '../../providers';

import '../../globals.css';
import { getCompaniesList, getUser } from '@/actions/getData';
import { redirect } from 'next/navigation';

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


export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
