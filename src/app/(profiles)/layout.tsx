import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "../providers";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";

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
  title: "REkrutAI|Company Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="pl-20">
          <Providers>
            <Sidebar />
            <main className="p-8 flex flex-col gap-5">
              <Breadcrumbs />
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
