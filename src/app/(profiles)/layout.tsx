import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "../providers";

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
  title: "REkrutAI|Admin Panel",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <main className="w-full flex h-screen overflow-hidden">
          <Providers>
            {/* <Sidebar />
            <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
              <Breadcrumbs />

            </div> */}
            {children}

          </Providers>

        </main>
      </body>
    </html>
  );
}
