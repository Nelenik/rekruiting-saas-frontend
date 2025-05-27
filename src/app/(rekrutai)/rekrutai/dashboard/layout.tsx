import type { Metadata } from 'next';
import QueryProvider from '@/shared/providers/QueryProvider';
import { Toaster } from '@/shared/ui/shadcn/toaster';
import { getSession, SessionPovider } from '@/features/auth';
import { TAuthorized } from '@/shared/api/types';
import { UnauthorizedFallback } from '@/features/auth/ui/UnauthorizedFallback';

export const metadata: Metadata = {
  title: 'RekrutAI|Дашборд',
};

// robots: {
//   index: false,
//   follow: false,
// }


export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  if (!session.isAuthorized) {
    return <UnauthorizedFallback />
  }

  return (
    <div
      className={`overflow-x-hidden`}
    >
      <SessionPovider session={session as TAuthorized}>
        <QueryProvider>

          {children}
        </QueryProvider>
      </SessionPovider>
      <Toaster />
    </div>
  );
}
